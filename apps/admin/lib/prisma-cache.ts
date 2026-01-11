import { prismaAdmin } from '@/lib/prisma'

/**
 * GamePix 缓存数据库 Client
 * 实际上是 prismaAdmin 的别名，因为缓存表都在 Admin 数据库中
 */
export const prismaCache = prismaAdmin
