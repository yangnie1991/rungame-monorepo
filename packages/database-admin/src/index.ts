// ============================================
// Prisma Client Export (Prisma 7 Standard)
// ============================================

// 管理数据库 Client
export { prismaAdmin } from "./client"

// 全量导出生成模型、枚举与类型
export * from "./generated/client"

// ============================================
// 管理端特有业务逻辑导出
// ============================================

export * from "./ai-history"
