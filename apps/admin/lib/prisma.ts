import { PrismaClient } from './generated/prisma-client'

/**
 * ============================================
 * Admin 管理数据库 Prisma Client 单例实例
 * ============================================
 *
 * 功能：
 * - 全局单例模式，避免开发环境热重载时创建多个连接
 * - 连接到管理数据库（CACHE_DATABASE_URL）
 * - 包含：管理配置表 + 缓存数据表
 * - 开发环境启用查询日志，生产环境仅记录错误
 */

const globalForPrismaAdmin = globalThis as unknown as {
  prismaAdmin: PrismaClient | undefined
}

const prismaAdminClientSingleton = () => {
  return new PrismaClient({
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
