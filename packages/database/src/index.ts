// ============================================
// Prisma Client Export (Prisma 7 Standard)
// ============================================

// 业务数据库 Client
export { prisma } from "./client"

// 全量导出生成模型、枚举与类型
export * from "./generated/client"

// ============================================
// 业务逻辑与数据访问层导出
// ============================================

export * from "./data/categories/index"
export * from "./data/games/index"
export * from "./data/languages/index"
export * from "./data/tags/index"
export * from "./data/stats/index"
export * from "./data/page-types/index"

export * from "./cache-config"
export * from "./i18n-helpers"

// Lib 导出
export * from "./lib/recommendation-engine"
