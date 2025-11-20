/**
 * 管理端专用 - 标签查询函数
 * 这些函数包含所有标签（包括已禁用的），仅用于管理后台
 */

import { prisma, buildLocaleCondition, getTranslatedField } from "@rungame/database"

export interface TagForAdmin {
  id: string
  slug: string
  name: string
  icon: string | null
  isEnabled: boolean
  gameCount: number
  metaTitle: string | null
  metaDescription: string | null
  keywords: string | null
}

/**
 * 获取所有标签（包括已禁用的）- 管理端专用
 *
 * 直接查询管理数据库，包含所有标签
 */
export async function getAllTagsForAdmin(locale: string): Promise<TagForAdmin[]> {
  const tags = await prisma.tag.findMany({
    select: {
      id: true,
      slug: true,
      icon: true,
      isEnabled: true,
      name: true,
      translations: {
        where: buildLocaleCondition(locale),
        select: {
          name: true,
          locale: true,
          metaTitle: true,
          metaDescription: true,
          keywords: true,
        },
      },
      _count: {
        select: { games: true },
      },
    },
  })

  return tags.map((tag) => {
    const name = getTranslatedField(tag.translations, locale, "name", tag.name)
    const metaTitle = getTranslatedField(tag.translations, locale, "metaTitle", "")
    const metaDescription = getTranslatedField(tag.translations, locale, "metaDescription", "")
    const keywords = getTranslatedField(tag.translations, locale, "keywords", "")

    return {
      id: tag.id,
      slug: tag.slug,
      icon: tag.icon,
      isEnabled: tag.isEnabled,
      name,
      gameCount: tag._count.games,
      metaTitle: metaTitle || null,
      metaDescription: metaDescription || null,
      keywords: keywords || null,
    }
  })
}
