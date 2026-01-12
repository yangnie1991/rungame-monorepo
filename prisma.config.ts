import { defineConfig } from '@prisma/config'

/**
 * Prisma 7 根配置文件
 *
 * 本项目采用双数据库架构，每个数据库包有独立的 schema：
 * - packages/database/prisma/schema.prisma - 业务数据库 (Website + Admin 共享)
 * - packages/database-admin/prisma/schema.prisma - 管理数据库 (Admin 专用)
 *
 * 各包的 Prisma 操作：
 * - pnpm --filter @rungame/database db:generate - 生成业务数据库客户端
 * - pnpm --filter @rungame/database-admin db:generate - 生成管理数据库客户端
 *
 * 此根配置文件保留用于未来可能的全局 Prisma 配置需求。
 */
export default defineConfig({
    // 当前使用默认配置，各包独立管理自己的 schema
})
