# Monorepo 分离方案 V3（完全解耦架构）

> **状态**: ✅ 最终方案 - 完全解耦
> **版本**: V3.1 Final (优化基础配置共享)
> **创建时间**: 2025-11-14
> **更新时间**: 2025-11-14
> **核心原则**: **基础配置共享，业务逻辑各自管各自**

## 🎯 核心架构原则

### 之前方案的问题

**V1/V2 方案**：试图共享 helper 和 lib/data
```
packages/database/
├── src/
│   ├── data/              # 共享所有查询函数
│   └── helpers/           # 共享所有 helper
│       ├── i18n-helpers.ts
│       ├── cache-helpers.ts
│       └── tiptap-renderer.ts
```

**问题**：
- ❌ packages/database 包含太多非数据库逻辑
- ❌ Admin 和 Website 需求不同，但被迫使用相同实现
- ❌ 修改一边会影响另一边
- ❌ 耦合度太高，不符合 Monorepo 独立应用原则

### 新方案：基础配置共享 + 业务逻辑解耦

```
packages/database/
├── prisma/
│   └── schema.prisma      # ✅ 共享 schema
└── src/
    ├── client.ts          # ✅ 导出 PrismaClient
    ├── cache-config.ts    # ✅ 🆕 共享基础缓存配置
    └── index.ts

apps/admin/
└── lib/
    ├── data/              # ✅ Admin 自己的查询层（精简版）
    └── helpers/           # ✅ Admin 自己的 helper
        ├── i18n-helpers.ts    # Admin 版本（简化）
        └── tiptap-helpers.ts  # Admin 版本（编辑器功能）

apps/website/
└── lib/
    ├── data/              # ✅ Website 自己的查询层（完整版）
    └── helpers/           # ✅ Website 自己的 helper
        ├── i18n-helpers.ts    # Website 版本（动态切换）
        ├── tiptap-helpers.ts  # Website 版本（只渲染）
        ├── seo-helpers.ts
        └── og-image-helpers.ts
```

## 📊 数据验证

### Admin 的实际需求

```bash
# Admin 对 lib/data 的导入：只有 4 处
grep -r "from.*@/lib/data" "app/(admin)" → 4 处

# 具体使用：
1. app/(admin)/admin/categories/page.tsx
   → getAllCategoriesForAdmin('zh')

2. app/(admin)/admin/tags/page.tsx
   → getAllTagsForAdmin('zh')

3. app/(admin)/admin/page.tsx
   → getDashboardStats()

4. app/(admin)/admin/languages/actions.ts
   → getEnabledLanguagesCached()
```

**结论**：Admin 只需要约 4-5 个数据查询函数，大约 500-800 行代码。

### Website 的实际需求

```bash
# Website 对 lib/data 的导入：17 处
grep -r "from.*@/lib/data" "app/(site)" → 17 处

# 使用几乎所有查询函数：
- getAllCategoriesFullData
- getMainCategories, getSubCategories
- getGamesByCategory, getGamesByTag
- getFeaturedGames, getMostPlayedGames
- searchGames, getGameBySlug
- getAllTags, getAllPageTypes
- ... 等等
```

**结论**：Website 需要几乎所有查询函数，大约 3000+ 行代码。

## 🏗️ 完全解耦架构

### Packages 层：共享基础设施和配置

```
packages/
├── database/                   # 🟢 数据库层 + 基础配置
│   ├── prisma/
│   │   ├── schema.prisma      # ✅ Prisma schema（必须共享）
│   │   └── seed.ts            # ✅ 数据填充脚本
│   ├── src/
│   │   ├── index.ts           # 统一导出
│   │   ├── client.ts          # ✅ 导出 PrismaClient
│   │   └── cache-config.ts    # ✅ 🆕 基础缓存配置（新增）
│   ├── package.json
│   └── tsconfig.json
│
├── ui/                        # 🟢 UI 组件
│   ├── src/
│   │   ├── components/ui/     # shadcn/ui 组件
│   │   ├── lib/utils.ts       # cn() 工具
│   │   └── index.ts
│   ├── public/logo/           # 共享 Logo
│   └── package.json
│
└── tsconfig/                  # 🟢 TypeScript 配置
    └── ...
```

**packages/database 负责**：
- ✅ 定义 Prisma schema
- ✅ 导出 PrismaClient
- ✅ 导出类型定义
- ✅ 🆕 **提供基础缓存配置常量**（两个应用统一使用）
- ❌ 不包含任何查询逻辑
- ❌ 不包含业务 helper

#### 🆕 共享的基础缓存配置

**packages/database/src/cache-config.ts**:
```typescript
/**
 * 基础缓存配置
 * 提供标准化的缓存标签和重新验证时间选项
 * Admin 和 Website 都使用这些配置，但可以选择不同的时间策略
 */

/**
 * 缓存标签常量
 * 用于失效特定类型的缓存
 *
 * 🔑 为什么共享？
 * - Admin 更新数据后需要失效 Website 的缓存
 * - Website 和 Admin 必须使用相同的标签名才能互相失效
 */
export const CACHE_TAGS = {
  LANGUAGES: "languages",
  CATEGORIES: "categories",
  TAGS: "tags",
  PAGE_TYPES: "page-types",
  GAMES: "games",
  FEATURED_GAMES: "featured-games",
  AI_CONFIGS: "ai-configs",
  IMPORT_PLATFORMS: "import-platforms",
  DASHBOARD_STATS: "dashboard-stats",
} as const

/**
 * 重新验证时间选项（秒）
 *
 * 🔑 为什么共享？
 * - 提供统一的时间档位选项
 * - Admin 可以选择更短的时间（如 SHORT: 60s）
 * - Website 可以选择更长的时间（如 LONG: 3600s）
 * - 避免重复定义相同的常量
 *
 * 缓存策略说明：
 * - STATIC: 永不过期（需要手动失效）
 * - SHORT: 1分钟，适合需要快速更新的数据
 * - MEDIUM: 5分钟，适合包含统计数据的内容
 * - STATS_SHORT: 30分钟，适合统计数据
 * - LONG: 1小时，适合相对稳定的配置数据
 * - BASE_DATA: 6小时，适合基础数据（名称、描述等）
 * - VERY_LONG: 24小时，适合几乎不变的基础数据
 */
export const REVALIDATE_TIME = {
  STATIC: false,      // 永不过期
  SHORT: 60,          // 1分钟 - Admin 常用
  MEDIUM: 300,        // 5分钟 - Admin/Website 都可用
  STATS_SHORT: 1800,  // 30分钟 - 统计数据
  LONG: 3600,         // 1小时 - Website 常用
  BASE_DATA: 21600,   // 6小时 - Website 基础数据
  VERY_LONG: 86400,   // 24小时 - 慎用
} as const

/**
 * 缓存标签类型
 */
export type CacheTag = typeof CACHE_TAGS[keyof typeof CACHE_TAGS]

/**
 * 重新验证时间类型
 */
export type RevalidateTime = typeof REVALIDATE_TIME[keyof typeof REVALIDATE_TIME]
```

**packages/database/src/index.ts**:
```typescript
// 导出 Prisma Client 和类型
export { prisma, PrismaClient } from './client'
export type * from '@prisma/client'

// 🆕 导出基础缓存配置
export { CACHE_TAGS, REVALIDATE_TIME } from './cache-config'
export type { CacheTag, RevalidateTime } from './cache-config'
```

### Apps 层：各自完整实现

#### Admin 应用（精简版）

```
apps/admin/
├── app/
│   ├── (admin)/
│   ├── api/
│   └── login/
│
├── components/
│   └── admin/
│
├── lib/
│   ├── data/                  # 🔴 Admin 数据查询层（精简）
│   │   ├── categories.ts      # 只 getAllCategoriesForAdmin
│   │   ├── tags.ts            # 只 getAllTagsForAdmin
│   │   ├── languages.ts       # 只 getEnabledLanguages
│   │   ├── stats.ts           # 只 getDashboardStats
│   │   └── index.ts           # 统一导出
│   │
│   ├── helpers/               # 🔴 Admin 辅助函数
│   │   ├── i18n-helpers.ts    # 简化版（固定中文）
│   │   ├── cache-helpers.ts   # Admin 缓存策略
│   │   └── tiptap-helpers.ts  # 编辑器功能
│   │
│   ├── auth.ts
│   ├── env.ts
│   ├── ai-*.ts
│   ├── crypto.ts
│   ├── r2-upload.ts
│   └── ...
│
├── scripts/
└── package.json
```

**Admin 的 lib/data 特点**：
- ✅ 只包含 4-5 个实际使用的函数
- ✅ 固定使用中文 locale='zh'
- ✅ 可以针对管理后台优化查询
- ✅ 包含启用/禁用状态的查询

**Admin 的 helpers 特点**：
```typescript
// apps/admin/lib/helpers/i18n-helpers.ts
// 简化版：固定中文
export function getTranslatedField(
  translations: any[],
  fallback: string
) {
  // Admin 固定使用中文
  const translation = translations.find(t => t.locale === 'zh')
  return translation?.name || fallback
}

export function buildLocaleCondition() {
  // Admin 固定返回中文条件
  return { locale: { in: ['zh', 'en'] } }
}
```

**注意**：Admin **不需要**单独的 `cache-helpers.ts`，直接从 `@rungame/database` 导入基础配置：
```typescript
// apps/admin/lib/data/categories.ts
import { CACHE_TAGS, REVALIDATE_TIME } from '@rungame/database'

// Admin 选择使用更短的缓存时间
export const getAllCategoriesForAdmin = unstable_cache(
  fetchCategoriesForAdmin,
  ['admin-categories'],
  {
    revalidate: REVALIDATE_TIME.SHORT,  // 使用 1 分钟
    tags: [CACHE_TAGS.CATEGORIES],       // 使用统一标签
  }
)
```

#### Website 应用（完整版）

```
apps/website/
├── app/
│   ├── [locale]/
│   └── api/og/
│
├── components/
│   ├── site/
│   ├── theme/
│   └── analytics/
│
├── lib/
│   ├── data/                  # 🔵 Website 数据查询层（完整）
│   │   ├── categories/
│   │   │   ├── cache.ts       # 完整的缓存实现
│   │   │   └── index.ts       # 所有分类查询
│   │   ├── games/
│   │   │   ├── browse.ts
│   │   │   ├── detail.ts
│   │   │   ├── featured.ts
│   │   │   ├── search.ts
│   │   │   └── stats.ts
│   │   ├── tags/
│   │   ├── languages/
│   │   ├── page-types/
│   │   ├── stats/
│   │   └── index.ts           # 统一导出所有查询
│   │
│   ├── helpers/               # 🔵 Website 辅助函数
│   │   ├── i18n-helpers.ts    # 完整版（动态切换语言）
│   │   ├── cache-helpers.ts   # Website 缓存策略
│   │   ├── tiptap-helpers.ts  # 只渲染 HTML
│   │   ├── seo-helpers.ts     # SEO 元数据生成
│   │   └── og-image-helpers.ts # OG 图片生成
│   │
│   ├── recommendation-engine.ts
│   ├── static-files.ts
│   └── env.ts
│
├── i18n/
├── hooks/
├── public/
└── package.json
```

**Website 的 lib/data 特点**：
- ✅ 包含所有查询函数（17+ 个）
- ✅ 支持动态 locale 切换
- ✅ 针对前端用户体验优化
- ✅ 更复杂的查询（分页、搜索、推荐等）

**Website 的 helpers 特点**：
```typescript
// apps/website/lib/helpers/i18n-helpers.ts
// 完整版：动态切换语言
export function getTranslatedField(
  translations: any[],
  locale: string,
  fieldName: string,
  fallback: any
) {
  // 支持多语言动态切换
  const translation = translations.find(t => t.locale === locale)
  if (translation?.[fieldName]) {
    return translation[fieldName]
  }

  // 回退到英文
  const enTranslation = translations.find(t => t.locale === 'en')
  if (enTranslation?.[fieldName]) {
    return enTranslation[fieldName]
  }

  return fallback
}

export function buildLocaleCondition(locale: string) {
  // 动态构建语言条件
  return {
    locale: {
      in: locale === 'en' ? ['en'] : [locale, 'en']
    }
  }
}
```

**注意**：Website 也**不需要**单独的 `cache-helpers.ts`，直接从 `@rungame/database` 导入：
```typescript
// apps/website/lib/data/categories/cache.ts
import { CACHE_TAGS, REVALIDATE_TIME } from '@rungame/database'

// Website 选择使用更长的缓存时间
export const getCategoriesBaseData = unstable_cache(
  fetchCategoriesBaseData,
  ['website-categories-base'],
  {
    revalidate: REVALIDATE_TIME.BASE_DATA,  // 使用 6 小时
    tags: [CACHE_TAGS.CATEGORIES],          // 使用统一标签
  }
)

export const getCategoriesStats = unstable_cache(
  fetchCategoriesStats,
  ['website-categories-stats'],
  {
    revalidate: REVALIDATE_TIME.STATS_SHORT,  // 使用 30 分钟
    tags: [CACHE_TAGS.CATEGORIES],
  }
)
```

## 🎨 示例代码对比

### 示例 1：i18n-helpers.ts

**Admin 版本（简化）**：
```typescript
// apps/admin/lib/helpers/i18n-helpers.ts

/**
 * Admin 专用 i18n 辅助函数
 * 简化版：固定使用中文
 */

export function getAdminTranslation(translations: any[]) {
  // Admin 界面固定中文
  return translations.find(t => t.locale === 'zh') || translations[0]
}

export function buildAdminLocaleCondition() {
  // 获取中文翻译，回退到英文
  return { locale: { in: ['zh', 'en'] } }
}

export function getTranslatedField(
  translations: any[],
  fieldName: string,
  fallback: any
) {
  const translation = getAdminTranslation(translations)
  return translation?.[fieldName] || fallback
}
```

**Website 版本（完整）**：
```typescript
// apps/website/lib/helpers/i18n-helpers.ts

/**
 * Website 专用 i18n 辅助函数
 * 完整版：支持动态语言切换
 */

export function getTranslationWithFallback<T>(
  translations: T[],
  locale: string
): T | undefined {
  // 优先返回请求的语言
  const translation = translations.find((t: any) => t.locale === locale)
  if (translation) return translation

  // 回退到默认语言（英文）
  const defaultTranslation = translations.find((t: any) => t.locale === 'en')
  if (defaultTranslation) return defaultTranslation

  // 最后返回第一个可用的翻译
  return translations[0]
}

export function buildLocaleCondition(locale: string) {
  // 如果是英文，只查询英文
  if (locale === 'en') {
    return { locale: { in: ['en'] } }
  }

  // 其他语言：查询当前语言和英文作为回退
  return {
    locale: {
      in: [locale, 'en']
    }
  }
}

export function getTranslatedField<T>(
  translations: any[],
  locale: string,
  fieldName: keyof T,
  fallback: any
): any {
  const translation = getTranslationWithFallback(translations, locale)
  return translation?.[fieldName] || fallback
}
```

### 示例 2：使用共享缓存配置

**Admin 和 Website 都从 `@rungame/database` 导入基础配置**：

```typescript
// 两个应用都使用相同的导入
import { CACHE_TAGS, REVALIDATE_TIME } from '@rungame/database'

// Admin 选择短时间：
revalidate: REVALIDATE_TIME.SHORT  // 60s

// Website 选择长时间：
revalidate: REVALIDATE_TIME.BASE_DATA  // 21600s (6小时)

// 两者使用相同的标签名：
tags: [CACHE_TAGS.CATEGORIES]  // Admin 更新后可以失效 Website 缓存
```

**优势**：
1. ✅ 统一的缓存标签名，Admin 更新数据可以失效 Website 缓存
2. ✅ 提供统一的时间档位，避免各自定义不一致的常量
3. ✅ 减少重复代码，只维护一份配置
4. ✅ 各应用可以根据需求选择不同的时间策略

### 示例 3：数据查询层

**Admin 版本（精简）**：
```typescript
// apps/admin/lib/data/categories.ts

import { prisma, CACHE_TAGS, REVALIDATE_TIME } from '@rungame/database'  // 🆕 从 database 导入
import { getTranslatedField, buildAdminLocaleCondition } from '../helpers/i18n-helpers'
import { unstable_cache } from 'next/cache'

/**
 * Admin 数据查询：精简版
 * 只包含管理后台实际使用的函数
 */

async function fetchCategoriesForAdmin() {
  const categories = await prisma.category.findMany({
    include: {
      translations: {
        where: buildAdminLocaleCondition(), // 固定中文
      },
      gameSubCategories: {
        where: { game: { status: 'PUBLISHED' } },
        select: { gameId: true }
      },
      gameMainCategories: {
        where: { game: { status: 'PUBLISHED' } },
        select: { gameId: true }
      },
    },
    orderBy: { sortOrder: 'asc' },
  })

  return categories.map(cat => ({
    id: String(cat.id),
    slug: String(cat.slug),
    icon: cat.icon,
    sortOrder: cat.sortOrder,
    parentId: cat.parentId ? String(cat.parentId) : null,
    isEnabled: cat.isEnabled,
    name: getTranslatedField(cat.translations, 'name', cat.name),
    description: getTranslatedField(cat.translations, 'description', cat.description || ''),
    gameCount: cat.parentId === null
      ? cat.gameMainCategories.length
      : cat.gameSubCategories.length,
  }))
}

// 缓存版本
export const getAllCategoriesForAdmin = unstable_cache(
  fetchCategoriesForAdmin,
  ['admin-categories'],
  {
    revalidate: REVALIDATE_TIME.MEDIUM,
    tags: [CACHE_TAGS.CATEGORIES],
  }
)
```

**Website 版本（完整）**：
```typescript
// apps/website/lib/data/categories/cache.ts

import { prisma, CACHE_TAGS, REVALIDATE_TIME } from '@rungame/database'  // 🆕 从 database 导入
import { getTranslatedField, buildLocaleCondition } from '../../helpers/i18n-helpers'
import { unstable_cache } from 'next/cache'

/**
 * Website 数据查询：完整版
 * 包含前端展示需要的所有函数
 */

// 基础数据查询（长缓存）
async function fetchCategoriesBaseData(locale: string) {
  const categories = await prisma.category.findMany({
    where: { isEnabled: true },
    include: {
      translations: {
        where: buildLocaleCondition(locale), // 动态语言
      },
    },
    orderBy: { sortOrder: 'asc' },
  })

  return categories.map(cat => ({
    id: String(cat.id),
    slug: String(cat.slug),
    icon: cat.icon,
    sortOrder: cat.sortOrder,
    parentId: cat.parentId ? String(cat.parentId) : null,
    name: getTranslatedField(cat.translations, locale, 'name', cat.name),
    description: getTranslatedField(cat.translations, locale, 'description', cat.description || ''),
    metaTitle: getTranslatedField(cat.translations, locale, 'metaTitle', null),
    metaDescription: getTranslatedField(cat.translations, locale, 'metaDescription', null),
    keywords: getTranslatedField(cat.translations, locale, 'keywords', null),
  }))
}

// 统计数据查询（短缓存）
async function fetchCategoriesStats() {
  const categories = await prisma.category.findMany({
    where: { isEnabled: true },
    select: {
      id: true,
      parentId: true,
      gameSubCategories: {
        where: { game: { status: 'PUBLISHED' } },
        select: { gameId: true }
      },
      gameMainCategories: {
        where: { game: { status: 'PUBLISHED' } },
        select: { gameId: true }
      },
    },
  })

  const statsMap: Record<string, number> = {}
  categories.forEach(cat => {
    statsMap[cat.id] = cat.parentId === null
      ? cat.gameMainCategories.length
      : cat.gameSubCategories.length
  })

  return statsMap
}

// 导出缓存版本
export const getCategoriesBaseData = unstable_cache(
  fetchCategoriesBaseData,
  ['website-categories-base'],
  {
    revalidate: REVALIDATE_TIME.BASE_DATA, // 6 小时
    tags: [CACHE_TAGS.CATEGORIES],
  }
)

export const getCategoriesStats = unstable_cache(
  fetchCategoriesStats,
  ['website-categories-stats'],
  {
    revalidate: REVALIDATE_TIME.STATS_SHORT, // 30 分钟
    tags: [CACHE_TAGS.CATEGORIES],
  }
)

// 组合函数
export async function getAllCategoriesFullData(locale: string) {
  const [baseData, statsMap] = await Promise.all([
    getCategoriesBaseData(locale),
    getCategoriesStats(),
  ])

  return baseData.map(cat => ({
    ...cat,
    gameCount: statsMap[cat.id] || 0,
  }))
}

// ... 更多 Website 专用查询函数
export async function getMainCategories(locale: string) { /* ... */ }
export async function getSubCategories(locale: string) { /* ... */ }
export async function getSubCategoriesByParentSlug(slug: string, locale: string) { /* ... */ }
```

## 📦 Package.json 依赖

### packages/database/package.json

```json
{
  "name": "@rungame/database",
  "version": "0.0.0",
  "private": true,
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "exports": {
    ".": "./src/index.ts",
    "./client": "./src/client.ts"
  },
  "scripts": {
    "db:push": "prisma db push",
    "db:seed": "tsx prisma/seed.ts",
    "db:generate": "prisma generate",
    "db:studio": "prisma studio"
  },
  "dependencies": {
    "@prisma/client": "^6.17.1"
  },
  "devDependencies": {
    "@types/node": "^20",
    "prisma": "^6.17.1",
    "tsx": "^4.20.6",
    "typescript": "^5"
  }
}
```

**关键变化**：
- ❌ 移除 zod（各 app 自己管理验证）
- ❌ 不导出 data/ 或 helpers/
- ✅ 只导出 PrismaClient 和类型
- ✅ 🆕 导出基础缓存配置（新增）

### packages/database/src/index.ts

```typescript
// packages/database/src/index.ts

/**
 * Database Package
 * 导出 Prisma Client、类型和基础缓存配置
 */

// Prisma Client 和类型
export { prisma, PrismaClient } from './client'

// 导出 Prisma 生成的类型
export type {
  Game,
  GameTranslation,
  Category,
  CategoryTranslation,
  Tag,
  TagTranslation,
  Language,
  PageType,
  PageTypeTranslation,
  Admin,
  // ... 其他类型
} from '@prisma/client'

// 🆕 导出基础缓存配置
export { CACHE_TAGS, REVALIDATE_TIME } from './cache-config'
export type { CacheTag, RevalidateTime } from './cache-config'
```

### apps/admin/package.json

```json
{
  "name": "@rungame/admin",
  "dependencies": {
    "@rungame/database": "workspace:*",
    "@rungame/ui": "workspace:*",
    "next": "15.5.4",
    "react": "19.1.0",
    "react-dom": "19.1.0",
    "next-auth": "^5.0.0-beta.29",
    "zod": "^4.1.12",
    "@aws-sdk/client-s3": "^3.908.0",
    // ... 其他 admin 专用依赖
  }
}
```

**关键点**：
- ✅ 依赖 @rungame/database（获取 PrismaClient + 基础缓存配置）
- ✅ 依赖 @rungame/ui
- ✅ 自己的 zod 验证
- ✅ 自己的 i18n 和 tiptap helpers

### apps/website/package.json

```json
{
  "name": "@rungame/website",
  "dependencies": {
    "@rungame/database": "workspace:*",
    "@rungame/ui": "workspace:*",
    "next": "15.5.4",
    "react": "19.1.0",
    "react-dom": "19.1.0",
    "next-intl": "^4.3.12",
    "next-themes": "^0.4.6",
    // ... 其他 website 专用依赖
  }
}
```

## 🔄 代码复用策略

### 问题：代码重复怎么办？

**观点 1（传统）**：避免代码重复 → 共享库
- ✅ 减少代码量
- ❌ 增加耦合度
- ❌ 修改影响面大

**观点 2（Monorepo 最佳实践）**：可控的重复 > 危险的耦合
- ✅ 完全独立，互不影响
- ✅ 各自优化
- ✅ 更容易理解和维护
- ⚠️ 有代码重复（但这是有意的）

### 重复的代码量分析（V3.1 优化后）

| 文件 | Admin | Website | 重复？ | 说明 |
|------|-------|---------|--------|------|
| **i18n-helpers.ts** | ~50 行 | ~150 行 | ⚠️ 部分重复 | Admin 简化版，Website 完整版 |
| **~~cache-helpers.ts~~** | ~~0 行~~ | ~~0 行~~ | ✅ **不重复** | 🆕 **已共享到 packages/database** |
| **tiptap-helpers.ts** | ~100 行 | ~50 行 | ⚠️ 功能不同 | Admin 编辑，Website 渲染 |
| **lib/data/** | ~800 行 | ~3000 行 | ⚠️ 部分重复 | Admin 4-5 个函数，Website 全部 |

**总重复代码量**：约 ~~1000-1500~~ **900-1200 行**（在 10000+ 行总代码中占比 ~~10-15%~~ **9-12%**）

**V3.1 优化**：
- ✅ 移除了 cache-helpers 的重复（~80 行）
- ✅ 统一的缓存标签，Admin 可以失效 Website 缓存
- ✅ 统一的缓存时间选项，避免不一致
- ✅ 重复代码量降低约 6%

**结论**：
- ✅ 更低的重复率（9-12%）
- ✅ 基础配置共享，业务逻辑解耦
- ✅ 换来的是完全解耦和独立优化
- ✅ 符合 Monorepo "独立应用"原则

### 何时考虑提取共享？

**规则**：区分"基础配置"和"业务逻辑"

```typescript
// ✅ 可以共享：纯配置常量（无业务逻辑）
export const CACHE_TAGS = {
  CATEGORIES: 'categories',
  GAMES: 'games',
}

export const REVALIDATE_TIME = {
  SHORT: 60,
  LONG: 3600,
}
```

```typescript
// ✅ 可以共享：纯工具函数（无业务逻辑）
function slugify(text: string) {
  return text.toLowerCase().replace(/\s+/g, '-')
}
```

```typescript
// ❌ 不共享：包含业务逻辑
function getTranslatedField(translations, locale, fallback) {
  // 业务逻辑：如何选择翻译、回退策略等
  // Admin 和 Website 的需求不同
}

// ❌ 不共享：具体的查询函数
async function getAllCategories(locale: string) {
  // 业务逻辑：查询条件、数据转换等
  // Admin 和 Website 的需求不同
}
```

**V3.1 的平衡**：
- ✅ 共享基础配置（CACHE_TAGS, REVALIDATE_TIME）
- ❌ 不共享业务逻辑（helpers, lib/data）
- ✅ 减少不必要的重复，同时保持解耦

## 🚀 迁移步骤（修正）

### 阶段 1：创建最小 Packages（30分钟）

```bash
cd packages/database
pnpm init

# 只复制 Prisma
cp -r ../../rungame-nextjs/prisma ./

# 创建 client.ts
cat > src/client.ts << 'EOF'
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

export { PrismaClient }
EOF

# 创建 index.ts
cat > src/index.ts << 'EOF'
export { prisma, PrismaClient } from './client'
export type * from '@prisma/client'
EOF

# 安装依赖
pnpm install
```

### 阶段 2：迁移 Admin（2-3小时）

```bash
cd apps/admin

# 1. 复制 Admin 路由和组件
cp -r ../../rungame-nextjs/app/(admin) ./app/
cp -r ../../rungame-nextjs/components/admin ./components/

# 2. 复制并精简 lib/data（只需要 4-5 个函数）
mkdir -p lib/data

# 创建 Admin 专用的查询函数
cat > lib/data/categories.ts << 'EOF'
import { prisma } from '@rungame/database'
import { unstable_cache } from 'next/cache'
// ... Admin 版本的 getAllCategoriesForAdmin
EOF

cat > lib/data/tags.ts << 'EOF'
// ... Admin 版本的 getAllTagsForAdmin
EOF

cat > lib/data/stats.ts << 'EOF'
// ... Admin 版本的 getDashboardStats
EOF

cat > lib/data/languages.ts << 'EOF'
// ... Admin 版本的 getEnabledLanguagesCached
EOF

# 3. 复制并简化 helpers
mkdir -p lib/helpers

# Admin 版本的 i18n-helpers（简化）
cat > lib/helpers/i18n-helpers.ts << 'EOF'
// Admin 专用：固定中文
export function getTranslatedField(translations, fieldName, fallback) {
  const translation = translations.find(t => t.locale === 'zh')
  return translation?.[fieldName] || fallback
}
EOF

# Admin 版本的 cache-helpers
cat > lib/helpers/cache-helpers.ts << 'EOF'
// Admin 专用：更短的缓存时间
export const REVALIDATE_TIME = {
  SHORT: 60,
  MEDIUM: 180,
  LONG: 600,
}
EOF

# Admin 版本的 tiptap-helpers（编辑器功能）
cp ../../rungame-nextjs/lib/tiptap-renderer.ts lib/helpers/tiptap-helpers.ts

# 4. 复制 Admin 专用文件
cp ../../rungame-nextjs/lib/auth.ts lib/
cp ../../rungame-nextjs/lib/env.ts lib/
cp ../../rungame-nextjs/lib/ai-*.ts lib/
# ... 其他 admin 文件

# 5. 更新导入路径
find . -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i '' 's|@/lib/db|@rungame/database|g' {} +
find . -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i '' 's|@/components/ui|@rungame/ui|g' {} +
# data/ 和 helpers/ 改为本地导入
find . -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i '' 's|@/lib/data|@/lib/data|g' {} +
```

### 阶段 3：迁移 Website（3-4小时）

```bash
cd apps/website

# 1. 复制 Website 路由和组件
cp -r ../../rungame-nextjs/app/(site)/[locale] ./app/
cp -r ../../rungame-nextjs/components/site ./components/
cp -r ../../rungame-nextjs/components/theme ./components/
cp -r ../../rungame-nextjs/components/analytics ./components/

# 2. 完整复制 lib/data（所有函数）
cp -r ../../rungame-nextjs/lib/data ./lib/

# 3. 复制完整 helpers
mkdir -p lib/helpers
cp ../../rungame-nextjs/lib/i18n-helpers.ts lib/helpers/
cp ../../rungame-nextjs/lib/cache-helpers.ts lib/helpers/
cp ../../rungame-nextjs/lib/tiptap-renderer.ts lib/helpers/tiptap-helpers.ts
cp ../../rungame-nextjs/lib/seo-helpers.ts lib/helpers/
cp ../../rungame-nextjs/lib/og-image-helpers.ts lib/helpers/

# 4. 复制 Website 专用文件
cp ../../rungame-nextjs/lib/recommendation-engine.ts lib/
cp ../../rungame-nextjs/lib/static-files.ts lib/
cp -r ../../rungame-nextjs/i18n ./
cp -r ../../rungame-nextjs/hooks ./
cp -r ../../rungame-nextjs/public ./
rm -rf ./public/logo  # Logo 使用 packages/ui 的

# 5. 更新导入路径
find . -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i '' 's|@/lib/prisma|@rungame/database|g' {} +
find . -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i '' 's|@/components/ui|@rungame/ui|g' {} +
```

## ✅ 优势总结

### 1. 完全解耦

```
Admin 修改 ──✗──> Website  # 互不影响
Website 修改 ──✗──> Admin  # 互不影响
```

- ✅ Admin 可以独立优化查询（简化、性能提升）
- ✅ Website 可以独立优化查询（复杂查询、分页等）
- ✅ 修改一边不会破坏另一边

### 2. 各自优化

**Admin**：
- ✅ 固定中文，代码更简单
- ✅ 更短的缓存时间（看到及时变化）
- ✅ 只包含需要的 4-5 个查询函数

**Website**：
- ✅ 动态多语言支持
- ✅ 更长的缓存时间（减少数据库压力）
- ✅ 包含所有前端需要的查询函数
- ✅ 复杂的分页、搜索、推荐逻辑

### 3. 更容易理解

```
开发者看 apps/admin/lib/data/
→ 只看到 4 个文件，清晰明了

开发者看 apps/website/lib/data/
→ 看到完整的查询层，结构清晰
```

### 4. 更容易测试

- ✅ Admin 测试只需要测试 4-5 个函数
- ✅ Website 测试可以独立进行
- ✅ 不会因为 Admin 的修改破坏 Website 的测试

### 5. 符合 Monorepo 原则

**Monorepo 的本质**：
- ✅ 多个独立应用在一个仓库
- ✅ 只共享基础设施（database schema, UI components）
- ✅ 业务逻辑各自管理

**而不是**：
- ❌ 把所有代码共享到 packages
- ❌ 创建一个"大杂烩"的 common 包
- ❌ 为了避免重复而强行共享

## 📝 最终检查清单

阶段 1: 最小 Packages
- [ ] packages/database 只包含 Prisma
- [ ] packages/ui 只包含 UI 组件
- [ ] packages/tsconfig 只包含 TS 配置
- [ ] ✅ 没有 data/ 目录
- [ ] ✅ 没有 helpers/ 目录

阶段 2: Admin 应用
- [ ] 创建 lib/data/（4-5 个文件）
- [ ] 创建 lib/helpers/（简化版）
- [ ] 复制 Admin 专用文件
- [ ] 更新所有导入路径
- [ ] 测试 Admin 功能

阶段 3: Website 应用
- [ ] 完整复制 lib/data/（19 个文件）
- [ ] 完整复制 lib/helpers/（5 个文件）
- [ ] 复制 Website 专用文件
- [ ] 更新所有导入路径
- [ ] 测试 Website 功能

验证
- [ ] Admin 启动正常
- [ ] Website 启动正常
- [ ] 数据查询正常
- [ ] 缓存工作正常
- [ ] 构建成功

---

**最终方案已确定**：完全解耦架构，各自管各自。

**核心改变**：
- ❌ V1/V2: 共享 helpers 和 lib/data
- ✅ V3: 只共享 Prisma schema，其他各自实现

**代码重复**：10-15%，换来完全解耦和独立优化。
