import 'server-only'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from './generated/client'

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
    const rawUrl = process.env.CACHE_DATABASE_URL || ''
    const urlObj = new URL(rawUrl.replace('postgres://', 'http://').replace('postgresql://', 'http://'))

    // 删除 SSL 相关参数
    urlObj.searchParams.delete('sslmode')
    urlObj.searchParams.delete('sslaccept')

    // 构造最终字符串
    const connectionString = rawUrl.split('?')[0] + (urlObj.search ? urlObj.search : '')

    // 建立物理连接池 (使用 CACHE_DATABASE_URL)
    const pool = new Pool({
        connectionString,
        max: 10,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 10000, // 增加到 10 秒
        ssl: {
            rejectUnauthorized: false
        }
    })

    // 创建 Prisma 适配器
    const adapter = new PrismaPg(pool)

    // 实例化具有扩展功能的 Client
    const client = new PrismaClient({ adapter })

    return client
}

export const prismaAdmin = globalForPrismaAdmin.prismaAdmin ?? prismaAdminSingleton()

if (process.env.NODE_ENV !== 'production') globalForPrismaAdmin.prismaAdmin = prismaAdmin
