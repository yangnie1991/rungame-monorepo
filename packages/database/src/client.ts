import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from './generated/client'

/**
 * ============================================
 * Prisma Client 单例实例 (Prisma 7 + Driver Adapter)
 * ============================================
 */

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof prismaClientSingleton> | undefined
}

const prismaClientSingleton = () => {
  // 建立物理连接池
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    // 适配小内存环境的连接池配置
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  })

  // 创建 Prisma 适配器
  const adapter = new PrismaPg(pool)

  // 实例化 Client (注入适配器)
  const baseClient = new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })

  /**
   * Prisma Client Extension: mainCategoryId 自动填充
   *
   * 用途：GameCategory 表在创建/更新时自动维护 mainCategoryId
   * - 如果 Category 有 parentId，则 mainCategoryId = parentId
   * - 如果 Category 是主分类（parentId === null），则 mainCategoryId = categoryId
   */
  const client = baseClient.$extends({
    name: 'mainCategoryIdAutoFill',
    query: {
      gameCategory: {
        async create({ args, query }) {
          // 创建 GameCategory 时自动填充 mainCategoryId
          if (args.data.categoryId) {
            const category = await baseClient.category.findUnique({
              where: { id: args.data.categoryId },
              select: { id: true, parentId: true },
            })

            if (category) {
              args.data.mainCategoryId = category.parentId || category.id
            }
          }

          return query(args)
        },

        async update({ args, query }) {
          // 更新 GameCategory 时，如果 categoryId 改变，同步更新 mainCategoryId
          if (args.data.categoryId) {
            const categoryId =
              typeof args.data.categoryId === 'string'
                ? args.data.categoryId
                : args.data.categoryId.set

            if (categoryId) {
              const category = await baseClient.category.findUnique({
                where: { id: categoryId },
                select: { id: true, parentId: true },
              })

              if (category) {
                args.data.mainCategoryId = category.parentId || category.id
              }
            }
          }

          return query(args)
        },
      },
    },
  })

  return client
}

/**
 * 导出 Prisma Client 实例
 *
 * - 生产环境：每次都创建新实例
 * - 开发环境：使用全局单例，避免热重载时重复创建
 */
export const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

/**
 * 导出 Prisma Client 类型（供外部使用）
 */
export type { PrismaClient }
