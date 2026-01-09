import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from './generated/prisma-client'

/**
 * ============================================
 * Admin 管理数据库 Prisma Client (Prisma 7 + Driver Adapter)
 * ============================================
 */

const globalForPrismaAdmin = globalThis as unknown as {
  prismaAdmin: PrismaClient | undefined
}

const prismaAdminClientSingleton = () => {
  // 建立物理连接池
  const pool = new Pool({
    connectionString: process.env.CACHE_DATABASE_URL,
    // 配置库并发较低，连接池可以设小一点
    max: 5,
    idleTimeoutMillis: 30000,
  })

  // 创建 Prisma 适配器
  const adapter = new PrismaPg(pool)

  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })
}

/**
 * 导出管理数据库 Prisma Client 实例
 *
 * - 生产环境：每次都创建新实例
 * - 开发环境：使用全局单例，避免热重载时重复创建
 */
export const prismaAdmin = globalForPrismaAdmin.prismaAdmin ?? prismaAdminClientSingleton()

if (process.env.NODE_ENV !== 'production') globalForPrismaAdmin.prismaAdmin = prismaAdmin
