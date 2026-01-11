import 'server-only'

/**
 * Prisma Client Proxy (Monorepo 桥接)
 * 
 * 将共享包 @rungame/database 和 @rungame/database-admin 中的 Client
 * 代理到 apps/admin/lib/prisma.ts，以保持现有业务代码的 import 路径不变。
 */

export { prisma } from '@rungame/database'
export { prismaAdmin } from '@rungame/database-admin'
