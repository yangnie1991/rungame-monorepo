import 'server-only'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from './generated/client'

/**
 * ============================================
 * Prisma Client Singleton (Prisma 7 + Driver Adapter)
 * ============================================
 */

const globalForPrisma = globalThis as unknown as {
  prisma: any
}

const prismaClientSingleton = () => {
  // 更加健壮的连接字符串清理逻辑
  // 移除 sslmode, sslaccept 等可能导致 TLS 强制校验的查询参数
  // 确保处理后如果不带参数，则移除末尾的 ?；如果带参数，则以 ? 开头
  const rawUrl = process.env.DATABASE_URL || ''
  const urlObj = new URL(rawUrl.replace('postgres://', 'http://').replace('postgresql://', 'http://'))

  // 删除 SSL 相关参数
  urlObj.searchParams.delete('sslmode')
  urlObj.searchParams.delete('sslaccept')

  // 恢复协议并构造最终字符串
  const protocol = rawUrl.startsWith('postgres://') ? 'postgres://' : 'postgresql://'
  const connectionString = rawUrl.split('?')[0] + (urlObj.search ? urlObj.search : '')

  // 建立物理连接池
  const pool = new Pool({
    connectionString,
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
    ssl: {
      rejectUnauthorized: false
    }
  })

  // 创建 Prisma 适配器
  const adapter = new PrismaPg(pool)

  // 实例化具有扩展功能的 Client
  const client = new PrismaClient({ adapter })

  // 扩展功能：mainCategoryId 自动填充（如果传入了 mainCategorySlug）
  return client.$extends({
    query: {
      game: {
        async create({ args, query }) {
          const { data } = args as any
          if (data?.mainCategorySlug && !data?.mainCategoryId) {
            const category = await (client as any).category.findUnique({
              where: { slug: data.mainCategorySlug },
              select: { id: true },
            })
            if (category) {
              data.mainCategoryId = category.id
            }
          }
          return query(args)
        },
        async update({ args, query }) {
          const { data } = args as any
          if (data?.mainCategorySlug && !data?.mainCategoryId) {
            const category = await (client as any).category.findUnique({
              where: { slug: data.mainCategorySlug },
              select: { id: true },
            })
            if (category) {
              data.mainCategoryId = category.id
            }
          }
          return query(args)
        },
      },
    },
  })
}

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
