import 'server-only'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../generated/client'

/**
 * ============================================
 * Prisma Admin Client Singleton (Prisma 7 + Driver Adapter)
 * ============================================
 */

const globalForPrismaAdmin = globalThis as unknown as {
    prismaAdmin: any
}

const prismaAdminSingleton = () => {
    // 更加健壮的连接字符串清理逻辑
    const rawUrl = process.env.CACHE_DATABASE_URL || process.env.DATABASE_URL || ''

    // 如果没有数据库 URL（例如在构建期间），则不进行处理
    if (!rawUrl) {
        console.warn('[Prisma Admin] CACHE_DATABASE_URL and DATABASE_URL are not defined')
        // 返回一个 dummy PrismaClient 或者让 Pool 稍后报错（但在构建时不会报错）
        // 这里我们只要保证 new URL 不抛错即可
        // 但如果 new Pool 接收空字符串也会抛错，所以如果为空，我们可能需要 mock 一个
    }

    let connectionString = rawUrl
    let sslConfig: { rejectUnauthorized: boolean } | boolean = false

    try {
        if (rawUrl) {
            const urlObj = new URL(rawUrl.replace('postgres://', 'http://').replace('postgresql://', 'http://'))

            // 检查 SSL 参数
            const sslmode = urlObj.searchParams.get('sslmode')
            if (sslmode === 'require' || sslmode === 'prefer') {
                sslConfig = { rejectUnauthorized: false }
            }

            // 删除 SSL 相关参数（pg 库通过 ssl 配置项处理）
            urlObj.searchParams.delete('sslmode')
            urlObj.searchParams.delete('sslaccept')
            urlObj.searchParams.delete('pgbouncer') // 移除 pgbouncer 参数

            // 构造最终字符串
            connectionString = rawUrl.split('?')[0] + (urlObj.search ? urlObj.search : '')
        }
    } catch (e) {
        console.error('[Prisma Admin] Failed to parse database URL:', e)
        // 保持原始 URL，不做处理
    }

    // 建立物理连接池 (使用 CACHE_DATABASE_URL)
    const pool = new Pool({
        connectionString,
        ssl: sslConfig,
        max: 10,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 10000, // 增加到 10 秒
    })

    // 创建 Prisma 适配器
    const adapter = new PrismaPg(pool)

    // 实例化具有扩展功能的 Client
    const client = new PrismaClient({ adapter })

    return client
}

export const prismaAdmin = globalForPrismaAdmin.prismaAdmin ?? prismaAdminSingleton()

if (process.env.NODE_ENV !== 'production') globalForPrismaAdmin.prismaAdmin = prismaAdmin
