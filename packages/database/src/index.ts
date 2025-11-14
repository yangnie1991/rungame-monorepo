/**
 * ============================================
 * @rungame/database - 共享数据库包
 * ============================================
 *
 * 提供 Admin 和 Website 应用共享的数据库访问层
 * 包含：Prisma Client、缓存配置、i18n 工具和数据查询函数
 */

// ============================================
// Prisma Client
// ============================================
export { prisma } from "./client"
export type { PrismaClient } from "./client"

// ============================================
// 缓存配置
// ============================================
export { CACHE_TAGS, REVALIDATE_TIME } from "./cache-config"

// ============================================
// i18n 工具函数
// ============================================
export {
  DEFAULT_LOCALE,
  buildLocaleCondition,
  getTranslationWithFallback,
  getTranslatedField,
  getTranslatedFields,
} from "./i18n-helpers"

// ============================================
// 语言数据查询
// ============================================
export { getDefaultLanguage, getEnabledLanguages } from "./data/languages"

// ============================================
// 分类数据查询
// ============================================
export {
  // 缓存层函数
  getAllCategoriesFullData,
  getCategoriesBaseData,
  getCategoriesStats,
  getSubCategoriesCount,
  // 业务层函数
  getAllCategoryTranslationsMap,
  getAllCategoryInfoMap,
  getAllCategoriesDataMap,
  getAllCategories,
  getMainCategories,
  getSubCategories,
  getSubCategoriesByParentId,
  getSubCategoriesByParentSlug,
} from "./data/categories"

// ============================================
// 标签数据查询
// ============================================
export {
  // 缓存层函数
  getAllTagsFullData,
  getTagsBaseData,
  getTagsStats,
  // 业务层函数
  getAllTagTranslationsMap,
  getAllTagsDataMap,
  getAllTags,
  getAllTagsInfoMap,
  getPopularTags,
} from "./data/tags"

// ============================================
// 统计数据查询
// ============================================
export { getDashboardStats } from "./data/stats"

// ============================================
// PageType 数据查询
// ============================================
export { getAllPageTypes, getPageTypeInfo, getPageTypeGames } from "./data/page-types"

// ============================================
// 游戏数据查询
// ============================================
export {
  // 特色游戏
  getFeaturedGames,
  getMostPlayedGames,
  getTrendingGames,
  getNewestGames,
  // 浏览游戏
  getGamesByCategory,
  getGamesByTag,
  getGamesByTagSlug,
  getGamesByTagWithPagination,
  getAllGames,
  // 搜索游戏
  searchGames,
  // 游戏详情
  getGameBySlug,
  getRecommendedGames,
  getMixedRecommendedGames,
  getPublishedGames,
  // 游戏统计
  getTotalGamesCount,
  getGamesCategoryStats,
  getGamesTagStats,
  getGameRealtimeStats,
  // 工具函数
  incrementPlayCount,
} from "./data/games"
