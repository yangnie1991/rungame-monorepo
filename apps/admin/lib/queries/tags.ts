/**
 * 管理端专用 - 标签查询函数
 * 这些函数包含所有标签（包括已禁用的），仅用于管理后台
 */

import { getAllTagsDataMap } from "@rungame/database"

export interface TagForAdmin {
  id: string
  slug: string
  name: string
  description: string | null
  icon: string | null
  sortOrder: number
  isEnabled: boolean
  gameCount: number
}

/**
 * 获取所有标签（包括已禁用的）- 管理端专用
 */
export async function getAllTagsForAdmin(locale: string): Promise<TagForAdmin[]> {
  // 使用 database 包的基础查询
  const tagsMap = await getAllTagsDataMap(locale)

  // 转换为数组格式
  const tags = Object.values(tagsMap).map(tag => ({
    id: tag.id,
    slug: tag.slug,
    name: tag.name,
    description: tag.description,
    icon: tag.icon,
    sortOrder: tag.sortOrder,
    isEnabled: tag.isEnabled,
    gameCount: tag.gameCount,
  }))

  return tags
}
