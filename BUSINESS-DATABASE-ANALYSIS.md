# 业务数据库 Schema 对比分析

## 📋 分析概览

本文档对比**旧主表schema**和**新业务数据库schema**（Supabase）的字段差异。

---

## 🔍 详细字段对比

### 1. Category 表（分类）

#### ⚠️ 关键差异

**新增字段**：
- `parentId` - 父分类ID，支持层级分类（旧schema是扁平结构）

**关系变化**：
- 旧：隐式多对多（`_GameToCategory` Prisma自动表）
- 新：显式多对多（`GameCategory` 自定义关联表）

**影响评估**：
- ⚠️ **中等影响** - 如果旧数据库已有游戏分类关联数据，需要迁移到新的 `GameCategory` 表
- ⚠️ 新的层级分类功能（`parentId`）是可选的，不影响数据迁移

---

### 2. CategoryTranslation 表（分类翻译）

#### ✅ 状态

**字段完全一致** - 无需处理

---

### 3. Tag 表（标签）

#### ⚠️ 关键差异

**关系变化**：
- 旧：隐式多对多（`_GameToTag` Prisma自动表）
- 新：显式多对多（`GameTag` 自定义关联表）

**影响评估**：
- ⚠️ **中等影响** - 需要迁移 `_GameToTag` 数据到 `GameTag` 表

---

### 4. TagTranslation 表（标签翻译）

#### ✅ 状态

**字段完全一致** - 无需处理

---

### 5. Game 表（游戏主表）⚠️ 重大差异

#### ❌ 旧schema有但新schema没有的字段

| 旧字段 | 数据类型 | 新schema对应 | 迁移方案 |
|--------|----------|-------------|----------|
| `width` | Int | `dimensions.width` (JSON) | 需要转换：提取到JSON |
| `height` | Int | `dimensions.height` (JSON) | 需要转换：提取到JSON |
| `categoryId` | String | `gameCategories` (多对多) | 需要转换：创建关联记录 |
| `isPublished` | Boolean | `status` (枚举) | 需要转换：true→PUBLISHED, false→DRAFT |

#### ✅ 新schema新增的字段（可设置默认值）

| 新字段 | 数据类型 | 默认值策略 |
|--------|----------|-----------|
| `banner` | String? | null（可选） |
| `screenshots` | String[] | [] |
| `videos` | String[] | [] |
| `gameUrl` | String? | null（可选） |
| `dimensions` | Json | 从 width/height 构建 |
| `status` | GameStatus | 从 isPublished 转换 |
| `viewCount` | Int | 0 |
| `likes` | Int | 0 |
| `dislikes` | Int | 0 |
| `rating` | Float | 0 |
| `ratingCount` | Int | 0 |
| `qualityScore` | Float? | null |
| `sourcePlatform` | String? | null |
| `sourcePlatformId` | String? | null |
| `developer` | String? | null |
| `developerUrl` | String? | null |
| `gameInfo` | Json? | null |
| `releaseDate` | DateTime? | null |
| `sourceUpdatedAt` | DateTime? | null |
| `importedAt` | DateTime? | createdAt |

#### 🔧 必需的数据转换逻辑

```javascript
// 转换示例
const convertGameData = (oldGame) => ({
  // 1. 基础字段（直接复制）
  id: oldGame.id,
  slug: oldGame.slug,
  title: oldGame.title,
  description: oldGame.description,
  thumbnail: oldGame.thumbnail,
  embedUrl: oldGame.embed_url,
  isFeatured: oldGame.is_featured,
  playCount: oldGame.play_count,
  keywords: oldGame.keywords,
  metaTitle: oldGame.meta_title,
  metaDescription: oldGame.meta_description,
  createdAt: oldGame.created_at,
  updatedAt: oldGame.updated_at,

  // 2. 尺寸转换（width/height → dimensions JSON）
  dimensions: {
    width: oldGame.width || 800,
    height: oldGame.height || 600,
    aspectRatio: calculateAspectRatio(oldGame.width, oldGame.height),
    orientation: oldGame.width > oldGame.height ? 'landscape' : 'portrait'
  },

  // 3. 状态转换（isPublished → status 枚举）
  status: oldGame.is_published ? 'PUBLISHED' : 'DRAFT',

  // 4. 新增字段（默认值）
  banner: null,
  screenshots: [],
  videos: [],
  gameUrl: null,
  viewCount: 0,
  likes: 0,
  dislikes: 0,
  rating: 0,
  ratingCount: 0,
  qualityScore: null,
  sourcePlatform: null,
  sourcePlatformId: null,
  developer: null,
  developerUrl: null,
  gameInfo: null,
  releaseDate: null,
  sourceUpdatedAt: null,
  importedAt: oldGame.created_at
})

// 5. 分类关系转换（单一 categoryId → 多对多 gameCategories）
// 需要在 GameCategory 表中创建记录
await prisma.gameCategory.create({
  data: {
    gameId: oldGame.id,
    categoryId: oldGame.category_id,
    mainCategoryId: oldGame.category_id,  // 假设旧的分类都是主分类
    isPrimary: true,
    sortOrder: 0
  }
})
```

---

### 6. GameTranslation 表（游戏翻译）

#### ⚠️ 小差异

**新增字段**：
- `translationInfo` (Json?) - 翻译版的详细内容

**影响评估**：
- ✅ **低影响** - 新字段可为空，不影响现有数据迁移

---

### 7. PageType 表（页面类型）⚠️ 中等差异

#### ⚠️ 字段变化

| 变化类型 | 旧字段 | 新字段 | 转换方案 |
|---------|--------|--------|----------|
| 重命名 | `name` | `title` | 直接重命名 |
| 类型变化 | `type: String` | `type: PageTypeEnum` | 验证值是否在枚举范围内 |
| 配置合并 | `gameListConfig`, `layoutConfig`, `cacheConfig` | `pageInfo` (JSON) | 合并三个JSON为一个 |

#### 🔧 数据转换逻辑

```javascript
const convertPageType = (oldPageType) => ({
  id: oldPageType.id,
  slug: oldPageType.slug,
  title: oldPageType.name,  // ⚠️ 重命名
  description: oldPageType.description,
  icon: oldPageType.icon,

  // ⚠️ 类型转换（确保值在枚举范围内）
  type: validatePageTypeEnum(oldPageType.type),  // GAME_LIST, DISPLAY_PAGE, OTHER_PAGE

  sortOrder: oldPageType.sort_order,
  isEnabled: oldPageType.is_enabled,

  // SEO字段
  metaTitle: oldPageType.meta_title,
  metaDescription: oldPageType.meta_description,
  keywords: oldPageType.keywords,

  // ⚠️ 配置合并（三个JSON → 一个JSON）
  pageInfo: {
    gameList: oldPageType.game_list_config || null,
    layout: oldPageType.layout_config || null,
    cache: oldPageType.cache_config || null
  },

  createdAt: oldPageType.created_at,
  updatedAt: oldPageType.updated_at
})

// 枚举验证函数
function validatePageTypeEnum(type) {
  const validTypes = ['GAME_LIST', 'DISPLAY_PAGE', 'OTHER_PAGE']

  // 旧schema可能使用的值
  const typeMapping = {
    'GAME_LIST': 'GAME_LIST',
    'STATIC_CONTENT': 'DISPLAY_PAGE',  // 映射
    'MIXED': 'DISPLAY_PAGE',           // 映射
    'OTHER_PAGE': 'OTHER_PAGE'
  }

  return typeMapping[type] || 'OTHER_PAGE'
}
```

#### ❌ 潜在问题

**PageContentBlock 表被移除**：
- 旧schema：`PageType` 有 `contentBlocks` 关系，指向 `PageContentBlock` 表
- 新schema：没有 `PageContentBlock` 表

**影响**：
- ❌ **高影响** - 如果旧数据库有页面内容块数据，这些数据将**无法迁移**到新schema
- 🔧 **解决方案**：
  1. 如果内容块功能不再使用，可以放弃这部分数据
  2. 如果需要保留，可以将内容块数据转换为 `pageInfo` JSON的一部分
  3. 或者在新schema中重新添加 `PageContentBlock` 表

---

### 8. PageTypeTranslation 表（页面类型翻译）

#### ⚠️ 小差异

**字段变化**：
- 旧：可能没有 `pageInfo` 字段
- 新：新增 `pageInfo` (Json?) - 翻译版的页面配置

**影响评估**：
- ✅ **低影响** - 新字段可为空，不影响迁移

---

### 9. Language 表（语言）

#### ⚠️ 小差异

**字段变化**：
- 旧：`nameCn` (中文名称)
- 新：`nativeName` (原生语言名称，更通用)

**新增字段**：
- `localeCode` - 完整区域代码（如 en-US, zh-CN）
- `direction` - 文字方向（LTR/RTL）

**影响评估**：
- ⚠️ **低影响** - 字段重命名简单，新增字段可设置默认值

#### 🔧 数据转换逻辑

```javascript
const convertLanguage = (oldLanguage) => ({
  id: oldLanguage.id,
  code: oldLanguage.code,
  name: oldLanguage.name,
  nativeName: oldLanguage.name_cn,  // ⚠️ 重命名
  flag: oldLanguage.flag,

  // 新增字段
  localeCode: generateLocaleCode(oldLanguage.code),  // en→en-US, zh→zh-CN
  direction: 'LTR',  // 默认值，如果有阿拉伯语需要设置为RTL

  isDefault: oldLanguage.is_default,
  isEnabled: oldLanguage.is_enabled,
  sortOrder: oldLanguage.sort_order,
  createdAt: oldLanguage.created_at,
  updatedAt: oldLanguage.updated_at
})

function generateLocaleCode(code) {
  const mapping = {
    'en': 'en-US',
    'zh': 'zh-CN',
    'es': 'es-ES',
    'fr': 'fr-FR',
    'de': 'de-DE',
    'ja': 'ja-JP',
    'ko': 'ko-KR',
    'ar': 'ar-SA'
  }
  return mapping[code] || `${code}-${code.toUpperCase()}`
}
```

---

### 10. LanguageTranslation 表（语言翻译）

#### ✅ 状态

**字段完全一致** - 无需处理

---

### 11. SiteConfig 表（网站配置）⚠️ 大量新增字段

#### ✅ 旧字段保留（直接复制）

- `siteName`
- `siteDescription`
- `logoUrl`
- `faviconUrl`
- `contactEmail`

#### ✅ 新增字段（可设置默认值）

| 新字段 | 数据类型 | 默认值 |
|--------|----------|--------|
| `siteUrl` | String | "https://rungame.online" |
| `ogImageUrl` | String? | null |
| `supportEmail` | String? | null |
| `socialLinks` | Json | {} |
| `defaultKeywords` | String[] | [] |
| `twitterHandle` | String? | null |
| `googleAnalyticsId` | String? | null |
| `googleAdsenseId` | String? | null |
| `customScripts` | Json | {} |
| `maintenanceMode` | Boolean | false |
| `enableComments` | Boolean | false |
| `enableRatings` | Boolean | true |
| `extraConfig` | Json | {} |

**影响评估**：
- ✅ **低影响** - 所有新字段都有默认值或可为空

---

### 12. SiteConfigTranslation 表（网站配置翻译）

#### ⚠️ 状态

**可能不存在于旧schema** - 需要检查

如果旧数据库没有这个表，无需迁移数据（新功能）

---

### 13. GameVote 表（游戏投票）

#### ✅ 状态

**字段完全一致** - 无需处理

---

### 14. 关联表变化 ⚠️ 重要

#### 旧schema（隐式多对多）

Prisma自动创建的关联表：
- `_GameToCategory` - 游戏和分类的关联
- `_GameToTag` - 游戏和标签的关联

#### 新schema（显式多对多）

自定义关联表：
- `GameCategory` - 替代 `_GameToCategory`，支持更多字段
- `GameTag` - 替代 `_GameToTag`

#### 🔧 数据迁移逻辑

```javascript
// 1. 迁移 _GameToCategory → GameCategory
const gameCategories = await oldPrisma.$queryRaw`
  SELECT "A" as game_id, "B" as category_id FROM "_GameToCategory"
`

for (const gc of gameCategories) {
  await newPrisma.gameCategory.create({
    data: {
      gameId: gc.game_id,
      categoryId: gc.category_id,
      mainCategoryId: gc.category_id,  // 假设旧的分类都是主分类
      isPrimary: true,  // 第一个关联设为主分类
      sortOrder: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  })
}

// 2. 迁移 _GameToTag → GameTag
const gameTags = await oldPrisma.$queryRaw`
  SELECT "A" as game_id, "B" as tag_id FROM "_GameToTag"
`

for (const gt of gameTags) {
  await newPrisma.gameTag.create({
    data: {
      gameId: gt.game_id,
      tagId: gt.tag_id
    }
  })
}
```

---

## 📊 迁移优先级总结

### 🔴 高优先级（必须处理）

1. **Game 表字段转换**
   - `width/height` → `dimensions` (JSON)
   - `categoryId` → `gameCategories` (多对多)
   - `isPublished` → `status` (枚举)

2. **关联表迁移**
   - `_GameToCategory` → `GameCategory`
   - `_GameToTag` → `GameTag`

3. **PageType 配置合并**
   - `gameListConfig`, `layoutConfig`, `cacheConfig` → `pageInfo`
   - `name` → `title`
   - 类型枚举验证

### 🟡 中优先级（建议处理）

4. **Language 表字段重命名**
   - `nameCn` → `nativeName`
   - 新增 `localeCode`, `direction`

5. **Category 层级关系**
   - 决定是否使用 `parentId` 功能

### 🟢 低优先级（可选）

6. **新增字段默认值**
   - Game 表的统计字段（viewCount, likes, rating等）
   - SiteConfig 的新配置字段

7. **PageContentBlock 处理**
   - 决定是否保留/转换内容块数据

---

## 🎯 推荐迁移方案

### 方案 A：修改新schema匹配旧（不推荐❌）

**为什么不推荐**：
- 业务数据库的新schema包含大量**功能增强**（评分、统计、多分类等）
- 这些新功能是项目发展的重要部分，不应该回退
- 只有部分字段不兼容，可以通过数据转换解决

### 方案 B：编写数据转换脚本（推荐✅）

**为什么推荐**：
- 保留所有新功能
- 通过脚本自动转换不兼容的字段
- 一次性迁移后，新旧数据结构统一

**实施步骤**：

1. **准备工作** (10分钟)
   - 备份旧数据库
   - 在新数据库运行 `prisma db push`

2. **编写转换脚本** (30分钟)
   - Game表字段转换（重点）
   - 关联表迁移
   - PageType配置合并
   - Language字段重命名

3. **执行迁移** (20分钟)
   - 先迁移主表（Category, Tag, Language, SiteConfig）
   - 再迁移Game表（含字段转换）
   - 最后迁移关联表和翻译表

4. **验证数据** (10分钟)
   - 检查记录数是否一致
   - 抽样检查转换后的数据
   - 测试Admin应用功能

**预计总时间**：1-1.5小时

---

## 🔧 迁移脚本框架

```javascript
// migrate-business-data.js
const { PrismaClient: PrismaOld } = require('./旧客户端路径')
const { PrismaClient: PrismaNew } = require('./packages/database/src/generated/client')

const prismaOld = new PrismaOld({...})
const prismaNew = new PrismaNew({...})

async function migrateBusinessData() {
  console.log('🚀 开始迁移业务数据...\n')

  // 1. 迁移 Category（无需转换）
  console.log('1️⃣  迁移 Category...')
  const categories = await prismaOld.category.findMany()
  for (const cat of categories) {
    await prismaNew.category.create({ data: cat })
  }

  // 2. 迁移 CategoryTranslation（无需转换）
  console.log('2️⃣  迁移 CategoryTranslation...')
  // ...

  // 3. 迁移 Tag（无需转换）
  console.log('3️⃣  迁移 Tag...')
  // ...

  // 4. 迁移 TagTranslation（无需转换）
  console.log('4️⃣  迁移 TagTranslation...')
  // ...

  // 5. 迁移 Language（字段重命名）
  console.log('5️⃣  迁移 Language...')
  const languages = await prismaOld.language.findMany()
  for (const lang of languages) {
    await prismaNew.language.create({
      data: {
        ...lang,
        nativeName: lang.nameCn,  // 重命名
        localeCode: generateLocaleCode(lang.code),
        direction: 'LTR'
      }
    })
  }

  // 6. 迁移 PageType（配置合并）
  console.log('6️⃣  迁移 PageType...')
  const pageTypes = await prismaOld.pageType.findMany()
  for (const pt of pageTypes) {
    await prismaNew.pageType.create({
      data: {
        ...pt,
        title: pt.name,  // 重命名
        pageInfo: {
          gameList: pt.gameListConfig,
          layout: pt.layoutConfig,
          cache: pt.cacheConfig
        }
      }
    })
  }

  // 7. 迁移 Game（复杂转换）⚠️
  console.log('7️⃣  迁移 Game（含字段转换）...')
  const games = await prismaOld.game.findMany()
  for (const game of games) {
    await prismaNew.game.create({
      data: {
        ...convertGameData(game)
      }
    })
  }

  // 8. 迁移关联表（_GameToCategory → GameCategory）⚠️
  console.log('8️⃣  迁移游戏-分类关联...')
  const gameCategories = await prismaOld.$queryRaw`
    SELECT "A" as game_id, "B" as category_id FROM "_GameToCategory"
  `
  for (const gc of gameCategories) {
    await prismaNew.gameCategory.create({
      data: {
        gameId: gc.game_id,
        categoryId: gc.category_id,
        mainCategoryId: gc.category_id,
        isPrimary: true,
        sortOrder: 0
      }
    })
  }

  // 9. 迁移关联表（_GameToTag → GameTag）⚠️
  console.log('9️⃣  迁移游戏-标签关联...')
  const gameTags = await prismaOld.$queryRaw`
    SELECT "A" as game_id, "B" as tag_id FROM "_GameToTag"
  `
  for (const gt of gameTags) {
    await prismaNew.gameTag.create({
      data: {
        gameId: gt.game_id,
        tagId: gt.tag_id
      }
    })
  }

  // 10. 其他表...

  console.log('\n✅ 业务数据迁移完成！')
}

migrateBusinessData()
```

---

## ⚠️ 关键决策点

### 决策 1: PageContentBlock 表处理

**问题**：旧schema有 `PageContentBlock` 表，新schema没有

**选项**：
1. **放弃数据** - 如果这个功能不再使用
2. **转换为JSON** - 将内容块数据存入 `PageType.pageInfo`
3. **恢复表结构** - 在新schema中重新添加这个表

**建议**：先检查旧数据库是否有内容块数据，如果没有则忽略

### 决策 2: Category 层级关系

**问题**：新schema支持层级分类（parentId），旧schema是扁平结构

**选项**：
1. **保持扁平** - 所有分类的 `parentId` 设为 null
2. **手动分级** - 迁移后手动设置主分类和子分类关系

**建议**：迁移时保持扁平（parentId=null），后续根据需要调整

---

**文档创建时间**: 2025-11-20
**分析人**: Claude Code
**目的**: 明确业务数据库schema差异，制定数据转换策略
