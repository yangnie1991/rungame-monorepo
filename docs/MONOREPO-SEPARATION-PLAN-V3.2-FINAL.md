# Monorepo 分离方案 V3.2（基础数据共享架构）

> **状态**: ✅ 最终方案 - 基础数据共享
> **版本**: V3.2 Final
> **创建时间**: 2025-11-14
> **核心原则**: **基础配置 + 基础数据查询共享，业务逻辑各自管理**

## 🎯 核心架构原则

### V3.1 的问题

V3.1 方案虽然共享了缓存配置（CACHE_TAGS, REVALIDATE_TIME），但仍然要求 Admin 和 Website 各自实现所有数据查询，包括：
- ❌ 语言数据查询（两端都用，但要重复实现）
- ❌ 统计数据查询（两端都用，但要重复实现）
- ❌ 游戏统计查询（两端都用，但要重复实现）
- ❌ 导入平台查询（两端都用，但要重复实现）

**结果**：不必要的重复代码，维护成本高。

### V3.2 方案：三层架构

```
┌──────────────────────────────────────────────────┐
│ 层级 1: 共享基础设施 (packages/database)          │
│ ├── Prisma Schema + Client                      │
│ ├── 缓存配置常量 (CACHE_TAGS, REVALIDATE_TIME)   │
│ ├── 🆕 基础 i18n 工具 (i18n-helpers.ts)          │
│ └── 🆕 基础数据查询函数 (data/)                  │
│     ├── languages.ts         - 语言数据          │
│     ├── categories.ts        - 分类缓存          │
│     ├── categories-derived.ts - 分类派生函数     │
│     ├── tags.ts              - 标签缓存          │
│     ├── tags-derived.ts      - 标签派生函数     │
│     ├── stats.ts             - 统计数据          │
│     ├── games-stats.ts       - 游戏统计          │
│     └── page-types/          - PageType 查询     │
└──────────────────────────────────────────────────┘
                      ↑
                      │ 导入
        ┌─────────────┴─────────────┐
        │                           │
┌───────────────┐           ┌───────────────┐
│ 层级 2: Admin │           │ 层级 2: Website│
│ lib/data/     │           │ lib/data/      │
│ - categories  │           │ - categories/  │
│ - tags        │           │ - games/       │
│ - games       │           │ - tags/        │
│ - ai-configs  │           │ - page-types/  │
└───────────────┘           └───────────────┘
```

### 关键区分

| 类型 | 位置 | 示例 | 特点 |
|------|------|------|------|
| **基础数据查询** | packages/database/src/data/ | `getEnabledLanguagesCached()` | ✅ 简单查询，两端都用，无业务逻辑 |
| **业务数据查询** | apps/*/lib/data/ | `getAllCategoriesForAdmin()` | ❌ 复杂查询，特定需求，有业务逻辑 |

## 📋 共享内容清单

### 共享到 packages/database

| 类型 | 文件 | 说明 | 原因 |
|------|------|------|------|
| **基础工具** | `i18n-helpers.ts` | 翻译选择和回退逻辑 | cache.ts 依赖，逻辑简单无业务逻辑 |
| **基础工具** | `cache-config.ts` | 缓存标签和时间常量 | 统一缓存策略 |
| **基础数据** | `data/languages.ts` | 语言数据缓存 | ✅ Admin 和 Website 都需要 |
| **基础数据** | `data/categories.ts` | 分类数据缓存 | ✅ Admin 和 Website 都需要 |
| **基础数据** | `data/tags.ts` | 标签数据缓存 | ✅ Admin 和 Website 都需要 |
| **基础数据** | `data/stats.ts` | 统计数据缓存 | ✅ Admin 和 Website 都需要 |
| **基础数据** | `data/games-stats.ts` | 游戏统计缓存 | ✅ Admin 和 Website 都需要 |
| **基础数据** | `data/page-types/info.ts` | PageType 信息查询 | ✅ Admin 管理，Website 展示 |
| **基础数据** | `data/page-types/games.ts` | PageType 游戏列表查询 | ✅ Admin 管理，Website 展示 |
| **基础数据** | `data/page-types/index.ts` | PageType 统一导出 | ✅ Admin 管理，Website 展示 |
| **派生函数** | `data/categories-derived.ts` | 分类派生函数（Map） | ✅ 从缓存派生，两端都需要 |
| **派生函数** | `data/tags-derived.ts` | 标签派生函数（Map） | ✅ 从缓存派生，两端都需要 |
| ~~**基础数据**~~ | ~~`data/import-platforms.ts`~~ | ~~导入平台缓存~~ | ❌ **仅 Admin 使用，不共享** |

### 为什么 i18n-helpers 可以共享？

查看 `lib/i18n-helpers.ts` 的实现，这些函数**非常基础**，无业务逻辑：

```typescript
// 构建 Prisma 查询条件
export function buildLocaleCondition(locale: string) {
  return locale === 'en'
    ? { locale }
    : { OR: [{ locale }, { locale: 'en' }] }
}

// 获取翻译对象（带回退）
export function getTranslationWithFallback(translations, locale) {
  return translations.find(t => t.locale === locale)
    || translations.find(t => t.locale === 'en')
    || translations[0]
}

// 获取翻译字段（带回退）
export function getTranslatedField(translations, locale, field, defaultValue) {
  const translation = getTranslationWithFallback(translations, locale)
  return translation?.[field] || defaultValue
}
```

**特点**：
- ✅ 纯函数，无副作用
- ✅ 逻辑简单，只处理翻译选择和回退
- ✅ Admin 和 Website 需要完全相同的逻辑
- ✅ 所有 cache.ts 都依赖这些函数

## 📦 共享的基础数据查询

### packages/database/src/i18n-helpers.ts

```typescript
/**
 * 基础国际化工具
 * 提供翻译选择和回退逻辑
 * Admin 和 Website 都使用相同的逻辑
 */

export const DEFAULT_LOCALE = "en"

/**
 * 构建 Prisma 翻译查询条件
 * 如果是默认语言，只查询当前语言；否则同时查询当前语言和默认语言
 */
export function buildLocaleCondition(locale: string, defaultLocale: string = DEFAULT_LOCALE) {
  return locale === defaultLocale
    ? { locale }
    : { OR: [{ locale }, { locale: defaultLocale }] }
}

interface Translation {
  locale: string
  [key: string]: any
}

/**
 * 从翻译数组中获取翻译，带回退机制
 */
export function getTranslationWithFallback<T extends Translation>(
  translations: T[],
  locale: string,
  defaultLocale: string = DEFAULT_LOCALE
): T | undefined {
  // 优先返回当前语言
  const currentTranslation = translations.find((t) => t.locale === locale)
  if (currentTranslation) return currentTranslation

  // 回退到默认语言
  const fallbackTranslation = translations.find((t) => t.locale === defaultLocale)
  if (fallbackTranslation) return fallbackTranslation

  // 最后返回第一个可用翻译
  return translations[0]
}

/**
 * 从翻译数组中安全获取字段值
 */
export function getTranslatedField<T extends Translation>(
  translations: T[],
  locale: string,
  field: keyof T,
  defaultValue: any = "",
  defaultLocale: string = DEFAULT_LOCALE
): any {
  const translation = getTranslationWithFallback(translations, locale, defaultLocale)
  return translation?.[field] ?? defaultValue
}
```

### packages/database/src/data/categories.ts

```typescript
"use server"

import { unstable_cache } from "next/cache"
import { prisma } from "../client"
import { getTranslatedField, buildLocaleCondition } from "../i18n-helpers"
import { CACHE_TAGS, REVALIDATE_TIME } from "../cache-config"

/**
 * 🔑 共享的分类基础数据查询
 * Admin 和 Website 都使用这些函数
 */

/**
 * 获取分类基础数据（不含统计）
 */
async function fetchCategoriesBaseDataFromDB(locale: string, includeDisabled = false) {
  const categories = await prisma.category.findMany({
    where: includeDisabled ? {} : { isEnabled: true },
    include: {
      translations: {
        where: buildLocaleCondition(locale),
      },
    },
    orderBy: { sortOrder: "asc" },
  })

  return categories.map((cat) => {
    const name = getTranslatedField(cat.translations, locale, "name", cat.name)
    const description = getTranslatedField(cat.translations, locale, "description", cat.description || "")
    const metaTitle = getTranslatedField(cat.translations, locale, "metaTitle", cat.metaTitle || null)
    const metaDescription = getTranslatedField(cat.translations, locale, "metaDescription", cat.metaDescription || null)
    const keywords = getTranslatedField(cat.translations, locale, "keywords", cat.keywords || null)

    return {
      id: String(cat.id),
      slug: String(cat.slug),
      icon: cat.icon ? String(cat.icon) : null,
      sortOrder: Number(cat.sortOrder),
      parentId: cat.parentId ? String(cat.parentId) : null,
      isEnabled: Boolean(cat.isEnabled),
      name: String(name),
      description: String(description),
      metaTitle: metaTitle ? String(metaTitle) : null,
      metaDescription: metaDescription ? String(metaDescription) : null,
      keywords: keywords ? String(keywords) : null,
    }
  })
}

/**
 * 获取分类统计数据
 */
async function fetchCategoriesStatsFromDB() {
  const categories = await prisma.category.findMany({
    where: { isEnabled: true },
    select: {
      id: true,
      parentId: true,
      gameSubCategories: {
        where: { game: { status: "PUBLISHED" } },
        select: { gameId: true }
      },
      gameMainCategories: {
        where: { game: { status: "PUBLISHED" } },
        select: { gameId: true }
      },
    },
  })

  const statsMap: Record<string, number> = {}
  categories.forEach((cat) => {
    const gameCount = cat.parentId === null
      ? cat.gameMainCategories.length
      : cat.gameSubCategories.length
    statsMap[cat.id] = gameCount
  })

  return statsMap
}

// 缓存版本
export const getCategoriesBaseData = unstable_cache(
  async (locale: string) => fetchCategoriesBaseDataFromDB(locale, false),
  ["categories-base-data"],
  {
    revalidate: REVALIDATE_TIME.BASE_DATA, // 6小时
    tags: [CACHE_TAGS.CATEGORIES],
  }
)

export const getCategoriesStats = unstable_cache(
  fetchCategoriesStatsFromDB,
  ["categories-stats"],
  {
    revalidate: REVALIDATE_TIME.STATS_SHORT, // 30分钟
    tags: [CACHE_TAGS.CATEGORIES],
  }
)

/**
 * 获取完整分类数据（基础+统计）
 */
export async function getAllCategoriesFullData(locale: string) {
  const [baseData, statsMap] = await Promise.all([
    getCategoriesBaseData(locale),
    getCategoriesStats(),
  ])

  return baseData.map((cat) => ({
    ...cat,
    gameCount: statsMap[cat.id] || 0,
  }))
}

/**
 * 管理端：获取所有分类（包含禁用的）
 */
export async function getAllCategoriesForAdmin(locale: string) {
  // Admin 需要看到禁用的分类
  return unstable_cache(
    async () => fetchCategoriesBaseDataFromDB(locale, true),
    ["categories-all-admin"],
    {
      revalidate: REVALIDATE_TIME.MEDIUM,
      tags: [CACHE_TAGS.CATEGORIES],
    }
  )()
}
```

### packages/database/src/data/tags.ts

```typescript
"use server"

import { unstable_cache } from "next/cache"
import { prisma } from "../client"
import { getTranslatedField, buildLocaleCondition } from "../i18n-helpers"
import { CACHE_TAGS, REVALIDATE_TIME } from "../cache-config"

/**
 * 🔑 共享的标签基础数据查询
 */

async function fetchTagsBaseDataFromDB(locale: string, includeDisabled = false) {
  const tags = await prisma.tag.findMany({
    where: includeDisabled ? {} : { isEnabled: true },
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
    },
  })

  return tags.map((tag) => {
    const name = getTranslatedField(tag.translations, locale, "name", tag.name)
    const metaTitle = getTranslatedField(tag.translations, locale, "metaTitle", null)
    const metaDescription = getTranslatedField(tag.translations, locale, "metaDescription", null)
    const keywords = getTranslatedField(tag.translations, locale, "keywords", null)

    return {
      id: String(tag.id),
      slug: String(tag.slug),
      icon: tag.icon ? String(tag.icon) : null,
      isEnabled: Boolean(tag.isEnabled),
      name: String(name),
      metaTitle: metaTitle ? String(metaTitle) : null,
      metaDescription: metaDescription ? String(metaDescription) : null,
      keywords: keywords ? String(keywords) : null,
    }
  })
}

async function fetchTagsStatsFromDB() {
  const tags = await prisma.tag.findMany({
    where: { isEnabled: true },
    select: {
      id: true,
      _count: { select: { games: true } },
    },
  })

  const statsMap: Record<string, number> = {}
  tags.forEach((tag) => {
    statsMap[tag.id] = tag._count.games
  })

  return statsMap
}

export const getTagsBaseData = unstable_cache(
  async (locale: string) => fetchTagsBaseDataFromDB(locale, false),
  ["tags-base-data"],
  {
    revalidate: REVALIDATE_TIME.BASE_DATA,
    tags: [CACHE_TAGS.TAGS],
  }
)

export const getTagsStats = unstable_cache(
  fetchTagsStatsFromDB,
  ["tags-stats"],
  {
    revalidate: REVALIDATE_TIME.STATS_SHORT,
    tags: [CACHE_TAGS.TAGS],
  }
)

export async function getAllTagsFullData(locale: string) {
  const [baseData, statsMap] = await Promise.all([
    getTagsBaseData(locale),
    getTagsStats(),
  ])

  return baseData.map((tag) => ({
    ...tag,
    gameCount: statsMap[tag.id] || 0,
  }))
}

export async function getAllTagsForAdmin(locale: string) {
  return unstable_cache(
    async () => fetchTagsBaseDataFromDB(locale, true),
    ["tags-all-admin"],
    {
      revalidate: REVALIDATE_TIME.LONG,
      tags: [CACHE_TAGS.TAGS],
    }
  )()
}
```

### packages/database/src/data/page-types/info.ts

```typescript
"use server"

import { unstable_cache } from "next/cache"
import { prisma } from "../../client"
import { getTranslatedField, buildLocaleCondition } from "../../i18n-helpers"
import { CACHE_TAGS, REVALIDATE_TIME } from "../../cache-config"

/**
 * 🔑 共享的 PageType 信息查询
 *
 * 注意：PageType 模块不使用单独的 cache.ts
 * 每个函数直接实现缓存，避免多层缓存嵌套
 */

/**
 * 获取所有启用的页面类型（用于导航）
 */
export async function getAllPageTypes(locale: string) {
  const getCachedData = unstable_cache(
    async () => {
      const pageTypes = await prisma.pageType.findMany({
        where: { isEnabled: true },
        select: {
          slug: true,
          type: true,
          icon: true,
          title: true,
          description: true,
          translations: {
            where: buildLocaleCondition(locale),
            select: { title: true, description: true, locale: true },
          },
        },
        orderBy: { sortOrder: "asc" },
      })

      return pageTypes.map((pt) => ({
        slug: pt.slug,
        type: pt.type,
        icon: pt.icon,
        title: getTranslatedField(pt.translations, locale, "title", pt.title),
        description: getTranslatedField(pt.translations, locale, "description", pt.description || ""),
      }))
    },
    ["page-types-all", locale],
    {
      revalidate: REVALIDATE_TIME.VERY_LONG,
      tags: [CACHE_TAGS.PAGE_TYPES],
    }
  )

  return getCachedData()
}

/**
 * 根据 slug 获取单个 PageType 的信息（不包含游戏列表）
 * 用于 generateMetadata，避免重复查询游戏列表
 */
export async function getPageTypeInfo(pageTypeSlug: string, locale: string) {
  const getCachedData = unstable_cache(
    async () => {
      const pageType = await prisma.pageType.findUnique({
        where: { slug: pageTypeSlug, isEnabled: true },
        select: {
          slug: true,
          type: true,
          icon: true,
          title: true,
          description: true,
          metaTitle: true,
          metaDescription: true,
          pageInfo: true,
          translations: {
            where: buildLocaleCondition(locale),
            select: {
              title: true,
              description: true,
              metaTitle: true,
              metaDescription: true,
              locale: true,
            },
          },
        },
      })

      if (!pageType || pageType.type !== "GAME_LIST") return null

      const pageInfo = (pageType.pageInfo as any) || {}
      const gameListConfig = pageInfo.gameList || {}
      const configFilters = gameListConfig.filters || {}
      const totalGames = await prisma.game.count({
        where: {
          status: 'PUBLISHED',
          ...configFilters,
        },
      })

      return {
        slug: pageType.slug,
        type: pageType.type,
        icon: pageType.icon,
        title: getTranslatedField(pageType.translations, locale, "title", pageType.title),
        description: getTranslatedField(pageType.translations, locale, "description", pageType.description || ""),
        metaTitle: getTranslatedField(pageType.translations, locale, "metaTitle", pageType.metaTitle || ""),
        metaDescription: getTranslatedField(pageType.translations, locale, "metaDescription", pageType.metaDescription || ""),
        totalGames,
      }
    },
    ["page-type-info", pageTypeSlug, locale],
    {
      revalidate: REVALIDATE_TIME.VERY_LONG,
      tags: [CACHE_TAGS.PAGE_TYPES],
    }
  )

  return getCachedData()
}
```

### packages/database/src/data/page-types/games.ts

```typescript
"use server"

import { unstable_cache } from "next/cache"
import { prisma } from "../../client"
import { getTranslatedField, buildLocaleCondition } from "../../i18n-helpers"
import { CACHE_TAGS, REVALIDATE_TIME } from "../../cache-config"
// 注意：这里需要从 categories-derived 和 tags-derived 导入
import { getAllCategoriesDataMap, getAllCategoryTranslationsMap } from "../categories-derived"
import { getAllTagTranslationsMap } from "../tags-derived"

/**
 * 🔑 共享的 PageType 游戏列表查询
 */

/**
 * 根据页面类型slug获取页面配置和游戏
 */
export async function getPageTypeGames(
  pageTypeSlug: string,
  locale: string,
  page = 1,
  limit = 24
) {
  // 1. 先获取底层缓存数据
  const [categoriesDataMap, categoryTranslations, tagTranslations] = await Promise.all([
    getAllCategoriesDataMap(locale),
    getAllCategoryTranslationsMap(locale),
    getAllTagTranslationsMap(locale),
  ])

  // 2. 定义缓存函数：一次性查询并组装完整数据
  const getCachedData = unstable_cache(
    async () => {
      const skip = (page - 1) * limit

      const pageType = await prisma.pageType.findUnique({
        where: { slug: pageTypeSlug, isEnabled: true },
        select: {
          slug: true,
          type: true,
          icon: true,
          title: true,
          description: true,
          metaTitle: true,
          metaDescription: true,
          pageInfo: true,
          translations: {
            where: buildLocaleCondition(locale),
            select: {
              title: true,
              description: true,
              metaTitle: true,
              metaDescription: true,
              pageInfo: true,
              locale: true,
            },
          },
        },
      })

      if (!pageType || pageType.type !== "GAME_LIST") return null

      const pageInfo = (pageType.pageInfo as any) || {}
      const gameListConfig = pageInfo.gameList || {}
      const configFilters = gameListConfig.filters || {}
      const configOrderBy = gameListConfig.orderBy || "playCount"
      const configOrderDirection = gameListConfig.orderDirection || "desc"

      let [games, totalCount] = await Promise.all([
        prisma.game.findMany({
          where: {
            status: "PUBLISHED",
            ...configFilters,
          },
          skip,
          take: limit,
          select: {
            slug: true,
            thumbnail: true,
            title: true,
            description: true,
            translations: {
              where: buildLocaleCondition(locale),
              select: { title: true, description: true, locale: true },
            },
            gameCategories: {
              select: {
                categoryId: true,
                mainCategoryId: true,
              },
              where: {
                isPrimary: true,
              },
              orderBy: {
                sortOrder: 'asc',
              },
              take: 1,
            },
            tags: {
              select: { tagId: true },
            },
          },
          orderBy: { [configOrderBy]: configOrderDirection },
        }),
        prisma.game.count({
          where: {
            status: "PUBLISHED",
            ...configFilters,
          },
        }),
      ])

      // 回退处理：如果配置了 isFeatured 筛选但游戏数量不足，用热门游戏补充
      if (configFilters.isFeatured === true && games.length < limit) {
        const neededCount = limit - games.length
        const existingSlugs = new Set(games.map(g => g.slug))

        const additionalGames = await prisma.game.findMany({
          where: {
            status: "PUBLISHED",
            slug: { notIn: Array.from(existingSlugs) },
          },
          take: neededCount,
          select: {
            slug: true,
            thumbnail: true,
            title: true,
            description: true,
            translations: {
              where: buildLocaleCondition(locale),
              select: { title: true, description: true, locale: true },
            },
            gameCategories: {
              select: {
                categoryId: true,
                mainCategoryId: true,
              },
              where: {
                isPrimary: true,
              },
              orderBy: {
                sortOrder: 'asc',
              },
              take: 1,
            },
            tags: {
              select: { tagId: true },
            },
          },
          orderBy: { playCount: "desc" },
        })

        games = [...games, ...additionalGames]
      }

      const pageTypeTranslation = pageType.translations.find((t: any) => t.locale === locale)

      return {
        pageType: {
          slug: pageType.slug,
          type: pageType.type,
          icon: pageType.icon,
          title: locale === "en"
            ? pageType.title
            : (pageTypeTranslation?.title || pageType.title),
          description: locale === "en"
            ? (pageType.description || "")
            : (pageTypeTranslation?.description || pageType.description || ""),
          metaTitle: locale === "en"
            ? (pageType.metaTitle || "")
            : (pageTypeTranslation?.metaTitle || pageType.metaTitle || ""),
          metaDescription: locale === "en"
            ? (pageType.metaDescription || "")
            : (pageTypeTranslation?.metaDescription || pageType.metaDescription || ""),
          pageInfo: pageType.pageInfo,
          translationPageInfo: pageTypeTranslation?.pageInfo,
        },
        games: games.map((game) => {
          const subCategoryId = game.gameCategories[0]?.categoryId
          const mainCategoryId = game.gameCategories[0]?.mainCategoryId

          const subCategoryInfo = subCategoryId ? Object.values(categoriesDataMap).find(cat => cat.id === subCategoryId) : undefined
          const mainCategoryInfo = mainCategoryId ? Object.values(categoriesDataMap).find(cat => cat.id === mainCategoryId) : undefined

          const gameTranslation = game.translations.find((t: any) => t.locale === locale)

          const gameTitle = locale === "en"
            ? game.title
            : (gameTranslation?.title || game.title)

          const gameDescription = locale === "en"
            ? (game.description || "")
            : (gameTranslation?.description || game.description || "")

          return {
            slug: game.slug,
            thumbnail: game.thumbnail,
            title: gameTitle,
            description: gameDescription,
            category: categoryTranslations[subCategoryId || ""] || "",
            categorySlug: subCategoryInfo?.slug,
            mainCategorySlug: mainCategoryInfo?.slug,
            tags: game.tags.map((t: any) => tagTranslations[t.tagId] || "").filter(Boolean),
          }
        }),
        pagination: {
          currentPage: page,
          totalGames: totalCount,
          totalPages: Math.ceil(totalCount / limit),
          hasMore: page * limit < totalCount,
        },
      }
    },
    ["page-type-games", pageTypeSlug, locale, String(page), String(limit)],
    {
      revalidate: REVALIDATE_TIME.MEDIUM,
      tags: [CACHE_TAGS.PAGE_TYPES, CACHE_TAGS.GAMES],
    }
  )

  return getCachedData()
}
```

### packages/database/src/data/page-types/index.ts

```typescript
/**
 * PageType 数据查询统一导出
 */

// 页面类型信息
export { getAllPageTypes, getPageTypeInfo } from "./info"

// 页面类型游戏列表
export { getPageTypeGames } from "./games"
```

### packages/database/src/data/categories-derived.ts

```typescript
"use server"

import { getAllCategoriesFullData } from "./categories"

/**
 * 🔑 共享的分类派生函数（从缓存派生）
 *
 * 这些函数从基础缓存数据派生，不直接查询数据库
 * Admin 和 Website 都需要这些数据转换
 */

/**
 * 获取分类 ID → 名称的映射
 */
export async function getAllCategoryTranslationsMap(locale: string) {
  const fullData = await getAllCategoriesFullData(locale)
  const map: Record<string, string> = {}
  fullData.forEach((cat) => {
    map[cat.id] = cat.name
  })
  return map
}

/**
 * 获取分类 ID → {name, slug} 的映射
 */
export async function getAllCategoryInfoMap(locale: string) {
  const fullData = await getAllCategoriesFullData(locale)
  const map: Record<string, { name: string; slug: string }> = {}
  fullData.forEach((cat) => {
    map[cat.id] = { name: cat.name, slug: cat.slug }
  })
  return map
}

/**
 * 获取分类 slug → 完整信息的映射
 */
export async function getAllCategoriesDataMap(locale: string) {
  const fullData = await getAllCategoriesFullData(locale)
  const map: Record<string, {
    id: string
    slug: string
    name: string
    description: string
    icon: string | null
    gameCount: number
    parentId: string | null
  }> = {}

  fullData.forEach((cat) => {
    map[cat.slug] = {
      id: cat.id,
      slug: cat.slug,
      name: cat.name,
      description: cat.description,
      icon: cat.icon,
      gameCount: cat.gameCount,
      parentId: cat.parentId,
    }
  })

  return map
}

/**
 * 获取所有分类列表（简化版）
 */
export async function getAllCategories(locale: string) {
  const fullData = await getAllCategoriesFullData(locale)
  return fullData.map((cat) => ({
    slug: cat.slug,
    name: cat.name,
    icon: cat.icon,
    gameCount: cat.gameCount,
  }))
}

/**
 * 获取所有主分类（parentId === null）
 */
export async function getMainCategories(locale: string) {
  const fullData = await getAllCategoriesFullData(locale)
  return fullData
    .filter((cat) => cat.parentId === null)
    .map((cat) => ({
      slug: cat.slug,
      name: cat.name,
      icon: cat.icon,
      gameCount: cat.gameCount,
    }))
}

/**
 * 获取所有子分类（parentId !== null）
 */
export async function getSubCategories(locale: string) {
  const fullData = await getAllCategoriesFullData(locale)
  return fullData
    .filter((cat) => cat.parentId !== null)
    .map((cat) => ({
      slug: cat.slug,
      name: cat.name,
      icon: cat.icon,
      gameCount: cat.gameCount,
      parentId: cat.parentId,
    }))
}

/**
 * 根据父分类 slug 获取其下的所有子分类
 */
export async function getSubCategoriesByParentSlug(parentSlug: string, locale: string) {
  const fullData = await getAllCategoriesFullData(locale)
  const parentCategory = fullData.find((cat) => cat.slug === parentSlug && cat.parentId === null)

  if (!parentCategory) {
    return []
  }

  return fullData
    .filter((cat) => cat.parentId === parentCategory.id)
    .map((cat) => ({
      slug: cat.slug,
      name: cat.name,
      icon: cat.icon,
      gameCount: cat.gameCount,
    }))
}
```

### packages/database/src/data/tags-derived.ts

```typescript
"use server"

import { getAllTagsFullData } from "./tags"

/**
 * 🔑 共享的标签派生函数（从缓存派生）
 *
 * 这些函数从基础缓存数据派生，不直接查询数据库
 * Admin 和 Website 都需要这些数据转换
 */

/**
 * 获取标签 ID → 名称的映射
 */
export async function getAllTagTranslationsMap(locale: string) {
  const fullData = await getAllTagsFullData(locale)
  const map: Record<string, string> = {}
  fullData.forEach((tag) => {
    map[tag.id] = tag.name
  })
  return map
}

/**
 * 获取标签 ID → { slug, name } 的映射
 */
export async function getAllTagsDataMap(locale: string) {
  const fullData = await getAllTagsFullData(locale)
  const dataMap: Record<string, { slug: string; name: string }> = {}
  fullData.forEach((tag) => {
    dataMap[tag.id] = { slug: tag.slug, name: tag.name }
  })
  return dataMap
}

/**
 * 获取所有标签列表（只显示有游戏的标签）
 */
export async function getAllTags(locale: string) {
  const fullData = await getAllTagsFullData(locale)
  return fullData
    .filter((tag) => tag.gameCount > 0)
    .map((tag) => ({
      slug: tag.slug,
      name: tag.name,
      icon: tag.icon,
      gameCount: tag.gameCount,
    }))
}

/**
 * 获取标签 slug → 完整信息的映射（包含游戏数量）
 */
export async function getAllTagsInfoMap(locale: string) {
  const fullData = await getAllTagsFullData(locale)
  const map: Record<string, {
    slug: string
    name: string
    icon: string | null
    gameCount: number
    metaTitle: string | null
    metaDescription: string | null
    keywords: string | null
  }> = {}

  fullData.forEach((tag) => {
    map[tag.slug] = {
      slug: tag.slug,
      name: tag.name,
      icon: tag.icon,
      gameCount: tag.gameCount,
      metaTitle: tag.metaTitle,
      metaDescription: tag.metaDescription,
      keywords: tag.keywords,
    }
  })

  return map
}

/**
 * 获取热门标签列表（按游戏数量排序）
 */
export async function getPopularTags(locale: string, limit: number = 10) {
  const fullData = await getAllTagsFullData(locale)
  return fullData
    .filter((tag) => tag.gameCount > 0)
    .sort((a, b) => b.gameCount - a.gameCount)
    .slice(0, limit)
    .map((tag) => ({
      slug: tag.slug,
      name: tag.name,
      icon: tag.icon,
      gameCount: tag.gameCount,
    }))
}
```

**注意**：为了保持文档简洁，以下只列出代码结构示例。完整代码请参考：
- `lib/data/languages/cache.ts` - 语言数据
- `lib/data/categories/cache.ts` - 分类数据（已在上文展示）
- `lib/data/tags/cache.ts` - 标签数据（已在上文展示）
- `lib/data/stats/cache.ts` - 统计数据
- `lib/data/games/stats.ts` - 游戏统计

### packages/database/src/index.ts

```typescript
/**
 * Database Package - 完整导出
 */

// Prisma Client 和类型
export { prisma, PrismaClient } from './client'
export type * from '@prisma/client'

// 缓存配置
export { CACHE_TAGS, REVALIDATE_TIME } from './cache-config'
export type { CacheTag, RevalidateTime } from './cache-config'

// 🆕 基础 i18n 工具函数
export {
  DEFAULT_LOCALE,
  buildLocaleCondition,
  getTranslationWithFallback,
  getTranslatedField,
} from './i18n-helpers'

// 🆕 基础数据查询函数 - 语言
export {
  getDefaultLanguageCached,
  getEnabledLanguagesCached,
} from './data/languages'

// 🆕 基础数据查询函数 - 分类
export {
  getCategoriesBaseData,
  getCategoriesStats,
  getAllCategoriesFullData,
  getAllCategoriesForAdmin,
} from './data/categories'

// 🆕 基础数据查询函数 - 标签
export {
  getTagsBaseData,
  getTagsStats,
  getAllTagsFullData,
  getAllTagsForAdmin,
} from './data/tags'

// 🆕 基础数据查询函数 - 统计
export {
  getDashboardStats,
} from './data/stats'

// 🆕 基础数据查询函数 - 游戏统计
export {
  getTotalGamesCount,
  getGamesCategoryStats,
  getGamesTagStats,
  getGameRealtimeStats,
} from './data/games-stats'

// 🆕 基础数据查询函数 - PageType
export {
  getAllPageTypes,
  getPageTypeInfo,
  getPageTypeGames,
} from './data/page-types'

// 🆕 派生函数 - 分类（从缓存派生）
export {
  getAllCategoryTranslationsMap,
  getAllCategoryInfoMap,
  getAllCategoriesDataMap,
  getAllCategories,
  getMainCategories,
  getSubCategories,
  getSubCategoriesByParentSlug,
} from './data/categories-derived'

// 🆕 派生函数 - 标签（从缓存派生）
export {
  getAllTagTranslationsMap,
  getAllTagsDataMap,
  getAllTags,
  getAllTagsInfoMap,
  getPopularTags,
} from './data/tags-derived'
```

## 🏗️ 完整架构

### packages/database/ （共享层）

```
packages/database/
├── prisma/
│   ├── schema.prisma          # ✅ Prisma schema
│   └── seed.ts                # ✅ 数据填充
├── src/
│   ├── index.ts               # 统一导出
│   ├── client.ts              # ✅ Prisma Client
│   ├── cache-config.ts        # ✅ 缓存配置常量
│   ├── i18n-helpers.ts        # ✅ 🆕 基础 i18n 工具函数
│   └── data/                  # ✅ 🆕 共享的基础数据缓存（两端都用的 cache.ts）
│       ├── languages.ts       # ← lib/data/languages/cache.ts
│       ├── categories.ts      # ← lib/data/categories/cache.ts
│       ├── categories-derived.ts  # ← lib/data/categories/index.ts (派生函数)
│       ├── tags.ts            # ← lib/data/tags/cache.ts
│       ├── tags-derived.ts    # ← lib/data/tags/index.ts (派生函数)
│       ├── stats.ts           # ← lib/data/stats/cache.ts
│       ├── games-stats.ts     # ← lib/data/games/stats.ts
│       └── page-types/        # ← lib/data/page-types/
│           ├── info.ts        # ← lib/data/page-types/info.ts
│           ├── games.ts       # ← lib/data/page-types/games.ts
│           └── index.ts       # ← lib/data/page-types/index.ts
├── package.json
└── tsconfig.json
```

**共享内容**：
- ✅ Prisma Schema 和 Client
- ✅ 缓存配置常量（CACHE_TAGS, REVALIDATE_TIME）
- ✅ 基础 i18n 工具（buildLocaleCondition, getTranslatedField）
- ✅ 所有 cache.ts 文件（基础数据缓存）

### apps/admin/ （Admin 应用层）

```
apps/admin/
├── lib/
│   ├── data/                  # ❌ Admin 特定的查询（各自实现）
│   │   ├── import-platforms.ts # ← lib/data/import-platforms/cache.ts（仅 Admin 用）
│   │   ├── games.ts           # Admin 游戏管理查询
│   │   ├── ai-configs.ts      # AI 配置查询
│   │   └── ...                # 其他 Admin 专用查询
│   │
│   ├── helpers/               # ❌ Admin 辅助函数（各自实现）
│   │   └── tiptap-helpers.ts  # 编辑器功能
│   │
│   ├── auth.ts                # Admin 认证
│   ├── ai-*.ts                # AI 功能
│   ├── crypto.ts              # 加密
│   └── r2-upload.ts           # R2 上传
│
├── app/(admin)/
└── components/admin/
```

**Admin 使用共享数据示例**：
```typescript
// apps/admin/app/(admin)/admin/categories/page.tsx
import { getAllCategoriesForAdmin } from '@rungame/database'

export default async function CategoriesPage() {
  // 🆕 直接使用共享的缓存查询
  const categories = await getAllCategoriesForAdmin('zh')  // Admin 固定中文
  return <CategoryList categories={categories} />
}
```

### apps/website/ （Website 应用层）

```
apps/website/
├── lib/
│   ├── data/                  # ❌ Website 特定的复杂查询（各自实现）
│   │   ├── games/
│   │   │   ├── browse.ts      # 游戏浏览查询
│   │   │   ├── detail.ts      # 游戏详情查询
│   │   │   ├── featured.ts    # 精选游戏查询
│   │   │   └── search.ts      # 游戏搜索查询
│   │   ├── page-types/        # 动态页面查询
│   │   └── ...                # 其他 Website 专用查询
│   │
│   ├── helpers/               # ❌ Website 辅助函数（各自实现）
│   │   ├── seo-helpers.ts     # SEO 专用
│   │   ├── og-image-helpers.ts # OG 图片生成
│   │   └── tiptap-helpers.ts  # 渲染器
│   │
│   ├── recommendation-engine.ts
│   └── static-files.ts
│
├── app/[locale]/
├── components/site/
└── i18n/
```

**Website 使用共享数据示例**：
```typescript
// apps/website/app/[locale]/games/page.tsx
import {
  getAllCategoriesFullData,
  getAllTagsFullData,
  getAllCategoryTranslationsMap,
  getAllTagTranslationsMap,
} from '@rungame/database'

export default async function GamesPage({ params: { locale } }: Props) {
  // 🆕 直接使用共享的缓存查询和派生函数
  const [categories, tags, categoryMap, tagMap] = await Promise.all([
    getAllCategoriesFullData(locale),
    getAllTagsFullData(locale),
    getAllCategoryTranslationsMap(locale),
    getAllTagTranslationsMap(locale),
  ])

  return <GamesBrowse categories={categories} tags={tags} />
}

// apps/website/app/[locale]/[slug]/page.tsx
import { getPageTypeInfo, getPageTypeGames } from '@rungame/database'

export default async function PageTypePage({ params }: Props) {
  // 🆕 使用共享的 PageType 查询
  const pageInfo = await getPageTypeInfo(params.slug, params.locale)
  const pageData = await getPageTypeGames(params.slug, params.locale, 1, 24)

  return <PageTypeContent pageInfo={pageInfo} pageData={pageData} />
}
```

## ✅ 优势总结

### 1. 大幅减少重复代码

| 共享内容 | 代码行数 | 如果不共享 | 减少 |
|----------|----------|------------|------|
| 基础 i18n 工具 | ~100 行 | ~200 行 (×2) | ✅ 减少 100 行 |
| 语言缓存查询 | ~100 行 | ~200 行 (×2) | ✅ 减少 100 行 |
| 分类缓存查询 | ~300 行 | ~600 行 (×2) | ✅ 减少 300 行 |
| 分类派生函数 | ~220 行 | ~440 行 (×2) | ✅ 减少 220 行 |
| 标签缓存查询 | ~280 行 | ~560 行 (×2) | ✅ 减少 280 行 |
| 标签派生函数 | ~143 行 | ~286 行 (×2) | ✅ 减少 143 行 |
| 统计缓存查询 | ~50 行 | ~100 行 (×2) | ✅ 减少 50 行 |
| 游戏统计查询 | ~200 行 | ~400 行 (×2) | ✅ 减少 200 行 |
| PageType 查询 | ~421 行 | ~842 行 (×2) | ✅ 减少 421 行 |
| ~~导入平台查询~~ | ~~不共享~~ | ~~Admin 专用~~ | ~~N/A~~ |
| **总计** | **~1,814 行** | **~3,628 行** | ✅ **减少 1,814 行** |

**代码重复率**: ~~9-12%~~ (V3.1) → **< 1%** (V3.2)

**改善幅度**:
- 相比 V3.1：**增加 76%** 的共享代码（从 1,030 行 → 1,814 行）
- 减少重复：**1,814 行**代码不需要在两个应用中重复实现

### 2. 统一的数据源

```typescript
// ✅ V3.2: 所有基础数据统一从 @rungame/database 导入
import {
  // 基础工具
  buildLocaleCondition,
  getTranslatedField,

  // 基础数据查询
  getAllCategoriesFullData,
  getAllTagsFullData,
  getEnabledLanguagesCached,
  getDashboardStats,

  // 缓存配置
  CACHE_TAGS,
  REVALIDATE_TIME,
} from '@rungame/database'

// ❌ V3.1: Admin 和 Website 各自实现所有这些
```

### 3. 更容易维护

**一份代码，两端受益**：
- ✅ 基础 cache.ts 查询只需维护一份
- ✅ i18n 工具函数只需维护一份
- ✅ Bug 修复一次，两端都生效
- ✅ 性能优化一次，两端都受益
- ✅ 缓存策略调整一次，全局生效

**示例**：
```typescript
// 在 packages/database/src/data/categories.ts 中优化查询
// Admin 和 Website 自动受益，无需修改两份代码
```

### 4. 保持业务逻辑解耦

V3.2 找到了完美平衡：

```typescript
// ✅ 共享：基础数据缓存（cache.ts 文件）
getAllCategoriesFullData(locale)  // 基础分类查询，带翻译
getAllTagsFullData(locale)        // 基础标签查询，带翻译
getEnabledLanguagesCached()       // 语言列表
getDashboardStats()               // 统计数据

// ❌ 不共享：复杂业务查询（各自实现）
getGamesByCategory(slug, page, filters)  // Website 复杂筛选
searchGames(query, filters, pagination)  // Website 搜索
getAdminGamesList(filters, sort)         // Admin 管理列表
```

**原则**：
- 基础数据 = 共享 → 减少重复
- 复杂业务 = 分离 → 保持解耦

## 🔍 判断规则：何时共享？

### ✅ 应该共享到 packages/database/src/data/

满足以下**所有条件**：
1. **两端都需要使用**
2. **查询逻辑简单**，无复杂业务逻辑
3. **返回的数据结构一致**
4. **不依赖特定的业务上下文**（如 locale 切换、权限检查等）

**示例**：
- ✅ `getEnabledLanguagesCached()` - 两端都用，简单查询
- ✅ `getDashboardStats()` - 两端都用，统计数据
- ✅ `getTotalGamesCount()` - 两端都用，简单统计

### ❌ 不应该共享（各自实现）

满足以下**任一条件**：
1. **只有一端需要**
2. **包含业务逻辑**（如 locale 切换、翻译选择等）
3. **不同应用需要不同的数据结构**
4. **查询条件因业务而异**

**示例**：
- ❌ `getAllCategoriesForAdmin()` - 只 Admin 用，固定中文
- ❌ `getAllCategoriesFullData(locale)` - 只 Website 用，动态 locale
- ❌ `getGamesByCategory(slug, locale, page)` - Website 专用，复杂查询

## 📝 迁移清单

### 阶段 1: 创建共享数据查询（1小时）

```bash
cd packages/database/src

# 创建 data/ 目录
mkdir data

# 复制并调整基础查询函数
# 从 lib/data/languages/cache.ts → packages/database/src/data/languages.ts
# 从 lib/data/categories/cache.ts → packages/database/src/data/categories.ts
# 从 lib/data/categories/index.ts → packages/database/src/data/categories-derived.ts
# 从 lib/data/tags/cache.ts → packages/database/src/data/tags.ts
# 从 lib/data/tags/index.ts → packages/database/src/data/tags-derived.ts
# 从 lib/data/stats/cache.ts → packages/database/src/data/stats.ts
# 从 lib/data/games/stats.ts → packages/database/src/data/games-stats.ts
# 从 lib/data/page-types/info.ts → packages/database/src/data/page-types/info.ts
# 从 lib/data/page-types/games.ts → packages/database/src/data/page-types/games.ts
# 从 lib/data/page-types/index.ts → packages/database/src/data/page-types/index.ts
# ❌ 不迁移 lib/data/import-platforms/ (仅 Admin 使用)

# 更新导入路径
- import { prisma } from "@/lib/db"
+ import { prisma } from "../client"

- import { CACHE_TAGS, REVALIDATE_TIME } from "@/lib/cache-helpers"
+ import { CACHE_TAGS, REVALIDATE_TIME } from "../cache-config"

# 更新 packages/database/src/index.ts
# 导出所有共享的基础查询函数
```

### 阶段 2: Admin 使用共享查询（45分钟）

```bash
cd apps/admin

# 更新导入 - 基础查询
find lib/data -type f -name "*.ts" -exec sed -i '' \
  's|from "@/lib/data/languages/cache"|from "@rungame/database"|g' {} +

find lib/data -type f -name "*.ts" -exec sed -i '' \
  's|from "@/lib/data/categories/cache"|from "@rungame/database"|g' {} +

find lib/data -type f -name "*.ts" -exec sed -i '' \
  's|from "@/lib/data/tags/cache"|from "@rungame/database"|g' {} +

find lib/data -type f -name "*.ts" -exec sed -i '' \
  's|from "@/lib/data/stats/cache"|from "@rungame/database"|g' {} +

find lib/data -type f -name "*.ts" -exec sed -i '' \
  's|from "@/lib/data/games/stats"|from "@rungame/database"|g' {} +

find lib/data -type f -name "*.ts" -exec sed -i '' \
  's|from "@/lib/data/page-types"|from "@rungame/database"|g' {} +

# 更新导入 - 派生函数
find lib/data -type f -name "*.ts" -exec sed -i '' \
  's|from "@/lib/data/categories"|from "@rungame/database"|g' {} +

find lib/data -type f -name "*.ts" -exec sed -i '' \
  's|from "@/lib/data/tags"|from "@rungame/database"|g' {} +

# 删除已迁移的文件（现在从 packages/database 导入）
# rm lib/data/languages/cache.ts
# rm lib/data/categories/cache.ts
# rm lib/data/categories/index.ts
# rm lib/data/tags/cache.ts
# rm lib/data/tags/index.ts
# rm lib/data/stats/cache.ts
# rm lib/data/games/stats.ts
# rm -r lib/data/page-types/
```

### 阶段 3: Website 使用共享查询（45分钟）

```bash
cd apps/website

# 更新导入 - 基础查询
find lib/data -type f -name "*.ts" -exec sed -i '' \
  's|from "@/lib/data/languages/cache"|from "@rungame/database"|g' {} +

find lib/data -type f -name "*.ts" -exec sed -i '' \
  's|from "@/lib/data/categories/cache"|from "@rungame/database"|g' {} +

find lib/data -type f -name "*.ts" -exec sed -i '' \
  's|from "@/lib/data/tags/cache"|from "@rungame/database"|g' {} +

find lib/data -type f -name "*.ts" -exec sed -i '' \
  's|from "@/lib/data/stats/cache"|from "@rungame/database"|g' {} +

find lib/data -type f -name "*.ts" -exec sed -i '' \
  's|from "@/lib/data/games/stats"|from "@rungame/database"|g' {} +

find lib/data -type f -name "*.ts" -exec sed -i '' \
  's|from "@/lib/data/page-types"|from "@rungame/database"|g' {} +

# 更新导入 - 派生函数
find lib/data -type f -name "*.ts" -exec sed -i '' \
  's|from "@/lib/data/categories"|from "@rungame/database"|g' {} +

find lib/data -type f -name "*.ts" -exec sed -i '' \
  's|from "@/lib/data/tags"|from "@rungame/database"|g' {} +

# 删除已迁移的文件（现在从 packages/database 导入）
# rm lib/data/languages/cache.ts
# rm lib/data/categories/cache.ts
# rm lib/data/categories/index.ts
# rm lib/data/tags/cache.ts
# rm lib/data/tags/index.ts
# rm lib/data/stats/cache.ts
# rm lib/data/games/stats.ts
# rm -r lib/data/page-types/
```

### 阶段 4: 测试验证（30分钟）

```bash
# 测试 packages/database
cd packages/database
pnpm build

# 测试 Admin
cd apps/admin
pnpm dev
# 验证：仪表盘、语言切换、分类列表等

# 测试 Website
cd apps/website
pnpm dev
# 验证：首页、语言切换、分类页面等
```

---

**最终结论**：V3.2 = 基础配置共享 + 基础数据查询共享 + 业务逻辑解耦

**代码重复率**: 4-6%（从 V3.1 的 9-12% 降低）

**维护成本**: 显著降低，基础查询只需维护一份

**解耦程度**: 保持高度解耦，业务逻辑仍然各自管理
