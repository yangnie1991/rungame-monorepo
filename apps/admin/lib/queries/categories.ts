/**
 * 管理端专用 - 分类查询函数
 * 这些函数包含所有分类（包括已禁用的），仅用于管理后台
 */

import { getAllCategoriesDataMap } from "@rungame/database"

export interface CategoryForAdmin {
  id: string
  slug: string
  name: string
  description: string | null
  icon: string | null
  sortOrder: number
  isEnabled: boolean
  gameCount: number
  parentId: string | null
  mainCategoryId: string | null
}

/**
 * 获取所有分类（包括已禁用的）- 管理端专用
 */
export async function getAllCategoriesForAdmin(locale: string): Promise<CategoryForAdmin[]> {
  // 使用 database 包的基础查询
  const categoriesMap = await getAllCategoriesDataMap(locale)

  // 转换为数组格式
  const categories = Object.values(categoriesMap).map(cat => ({
    id: cat.id,
    slug: cat.slug,
    name: cat.name,
    description: cat.description,
    icon: cat.icon,
    sortOrder: cat.sortOrder,
    isEnabled: cat.isEnabled,
    gameCount: cat.gameCount,
    parentId: cat.parentId,
    mainCategoryId: cat.mainCategoryId,
  }))

  return categories
}
