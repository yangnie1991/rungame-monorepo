import 'server-only'
/**
 * 管理端专用 - 分类查询函数
 * 这些函数包含所有分类（包括已禁用的），仅用于管理后台
 */

import { prisma, buildLocaleCondition, getTranslatedField } from "@rungame/database"

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
  metaTitle: string | null
  metaDescription: string | null
  keywords: string | null
}

/**
 * 获取所有分类（包括已禁用的）- 管理端专用
 *
 * 直接查询业务数据库，包含所有分类
 */
export async function getAllCategoriesForAdmin(locale: string): Promise<CategoryForAdmin[]> {
  const categories = await prisma.category.findMany({
    select: {
      id: true,
      slug: true,
      icon: true,
      sortOrder: true,
      parentId: true,
      isEnabled: true,
      name: true,
      description: true,
      metaTitle: true,
      metaDescription: true,
      keywords: true,
      translations: {
        where: buildLocaleCondition(locale),
        select: {
          name: true,
          description: true,
          locale: true,
          metaTitle: true,
          metaDescription: true,
          keywords: true,
        },
      },
      gameSubCategories: {
        where: {
          game: { status: "PUBLISHED" }
        },
        select: {
          gameId: true
        }
      },
      gameMainCategories: {
        where: {
          game: { status: "PUBLISHED" }
        },
        select: {
          gameId: true
        }
      },
    },
    orderBy: { sortOrder: "asc" },
  })

  // 调试日志：打印前3个分类的原始数据
  if (process.env.NODE_ENV === "development" && categories.length > 0) {
    console.log("\n=== 分类原始数据（前3个）===")
    categories.slice(0, 3).forEach((cat, index) => {
      console.log(`\n[${index + 1}] ${cat.slug}:`)
      console.log(`  id: ${cat.id}`)
      console.log(`  name: ${cat.name}`)
      console.log(`  isEnabled: ${cat.isEnabled} (类型: ${typeof cat.isEnabled})`)
      console.log(`  parentId: ${cat.parentId}`)
      console.log(`  sortOrder: ${cat.sortOrder}`)
      console.log(`  gameSubCategories: ${cat.gameSubCategories.length}`)
      console.log(`  gameMainCategories: ${cat.gameMainCategories.length}`)
      console.log(`  translations: ${JSON.stringify(cat.translations)}`)
    })
  }

  const result = categories.map((cat) => {
    const name = getTranslatedField(cat.translations, locale, "name", cat.name)
    const description = getTranslatedField(cat.translations, locale, "description", cat.description || "")
    const metaTitle = getTranslatedField(cat.translations, locale, "metaTitle", cat.metaTitle || "")
    const metaDescription = getTranslatedField(cat.translations, locale, "metaDescription", cat.metaDescription || "")
    const keywords = getTranslatedField(cat.translations, locale, "keywords", cat.keywords || "")

    // 根据是否为主分类，统计不同的游戏数
    // 主分类（parentId === null）：统计 gameMainCategories
    // 子分类（parentId !== null）：统计 gameSubCategories
    const gameCount = cat.parentId === null
      ? cat.gameMainCategories.length
      : cat.gameSubCategories.length

    return {
      id: cat.id,
      slug: cat.slug,
      icon: cat.icon,
      sortOrder: cat.sortOrder,
      parentId: cat.parentId,
      isEnabled: cat.isEnabled,
      name,
      description: description || null,
      gameCount,
      metaTitle: metaTitle || null,
      metaDescription: metaDescription || null,
      keywords: keywords || null,
    }
  })

  // 调试日志：打印处理后的前3个分类数据
  if (process.env.NODE_ENV === "development" && result.length > 0) {
    console.log("\n=== 分类处理后数据（前3个）===")
    result.slice(0, 3).forEach((cat, index) => {
      console.log(`\n[${index + 1}] ${cat.slug}:`)
      console.log(`  id: ${cat.id}`)
      console.log(`  name: ${cat.name}`)
      console.log(`  isEnabled: ${cat.isEnabled} (类型: ${typeof cat.isEnabled})`)
      console.log(`  parentId: ${cat.parentId}`)
      console.log(`  sortOrder: ${cat.sortOrder}`)
      console.log(`  gameCount: ${cat.gameCount}`)
    })
    console.log("\n")
  }

  return result
}
