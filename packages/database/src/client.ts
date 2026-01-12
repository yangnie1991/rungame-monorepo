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
  const rawUrl = process.env.DATABASE_URL || ''

  // 预先处理 postgres:// 和 postgresql:// 协议头，确保 URL 构造器能正确解析
  const cleanProtocolUrl = rawUrl.replace(/^postgres:\/\//, 'http://').replace(/^postgresql:\/\//, 'http://')

  let urlObj: URL
  try {
    urlObj = new URL(cleanProtocolUrl)
  } catch (e) {
    // 如果 URL 解析失败（例如空字符串），则创建一个空的 URL 对象避免崩溃
    // 这种情况通常发生在构建阶段没有环境变量时
    console.warn('⚠️ [Prisma Client] Failed to parse DATABASE_URL, using fallback empty URL.')
    urlObj = new URL('http://localhost')
  }

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
