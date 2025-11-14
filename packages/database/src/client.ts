import { PrismaClient } from '@prisma/client'

/**
 * ============================================
 * Prisma Client 单例实例
 * ============================================
 *
 * 功能：
 * - 全局单例模式，避免开发环境热重载时创建多个连接
 * - Prisma Client Extensions：自动维护 GameCategory.mainCategoryId
 * - 开发环境启用查询日志，生产环境仅记录错误
 */

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof prismaClientSingleton> | undefined
}

const prismaClientSingleton = () => {
  const baseClient = new PrismaClient({
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
