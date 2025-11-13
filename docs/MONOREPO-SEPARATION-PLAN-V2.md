# Monorepo 分离方案 V2（深度分析版）

> **状态**: ✅ 深度分析完成 - 待执行
> **版本**: V2
> **创建时间**: 2025-11-14
> **最后更新**: 2025-11-14

## 🔍 重要发现和澄清

### 1. Helper 文件使用情况分析

#### i18n-helpers.ts
**原判断**：共享到 packages/database/
**重新分析**：
- ✅ Admin 通过 lib/data 间接使用（如 `getAllCategoriesForAdmin('zh')`）
- ✅ Admin 需要显示中文翻译（硬编码 locale='zh'）
- ✅ Website 需要动态切换语言
- **结论**：必须共享到 packages/database/，因为 lib/data 依赖它

#### seo-helpers.ts
**原判断**：共享到 packages/database/
**重新分析**：
```bash
# Admin 中没有直接使用
grep -r "seo-helpers" "app/(admin)" → 0 结果
# Website 中使用
grep -r "seo-helpers" "app/(site)" → 用于生成 metadata
```
- ❌ Admin 完全不使用
- ✅ Website 用于生成页面 SEO metadata
- **结论**：应该只属于 Website

#### og-image-helpers.ts
**原判断**：共享到 packages/database/
**重新分析**：
```bash
# Admin 中没有使用
grep -r "og-image-helpers" "app/(admin)" → 0 结果
# Website 中使用
grep -r "og-image-helpers" "app/(site)" → 用于 OG API
```
- ❌ Admin 完全不使用（admin 不需要分享功能）
- ✅ Website 的 OG API 使用
- **结论**：应该只属于 Website

### 2. tiptap-renderer.ts 使用情况

**原判断**：Admin only
**重新分析**：
```typescript
// components/site/ContentRenderer.tsx
import { renderTiptapToHTML, parseTiptapContent } from "@/lib/tiptap-renderer"
```
- ✅ Admin 使用（编辑器）
- ✅ Website 使用（渲染 PageType 内容）
- **结论**：必须共享！应放在 packages/database/ 或 packages/ui/

### 3. env.ts 分离需求

**当前实现**：
```typescript
// lib/env.ts - 验证以下环境变量
validateRequiredEnvVars() {
  const required = [
    'DATABASE_URL',      // 两端都需要
    'NEXTAUTH_SECRET',   // 只 Admin
    'NEXTAUTH_URL',      // 只 Admin
    'ENCRYPTION_KEY',    // 只 Admin
  ]
}
```

**问题**：
- Website 不需要 NEXTAUTH_SECRET, NEXTAUTH_URL, ENCRYPTION_KEY
- Admin 的某些敏感配置应该存储在数据库中（加密），而不是环境变量

**解决方案**：
```
apps/admin/lib/env.ts  → 验证 Admin 专用环境变量
apps/website/lib/env.ts → 验证 Website 专用环境变量（或不需要）
```

### 4. 静态文件存储策略

**当前状态**：
```
public/
├── logo/          → 两端都需要
├── ads.txt        → Website only (Google Adsense)
├── manifest.json  → Website only (PWA)
├── apple-touch-icon.png → Website only
├── assets/images/ → Website only (OG 图片)
├── *.txt          → Website only (搜索引擎验证)
└── *.svg          → Website only
```

**R2 vs 本地存储**：

| 文件类型 | 当前位置 | 推荐策略 | 原因 |
|---------|---------|---------|------|
| **Logo** | public/logo/ | 📦 packages/ui/public/logo/ | 两端共享，很少变化 |
| **OG 图片** | public/assets/images/ | 💾 本地 (Website) | 动态生成，不需要 CDN |
| **SEO 验证文件** | public/*.txt | 💾 本地 (Website) | 静态文件，必须在根目录 |
| **PWA 资源** | public/manifest.json | 💾 本地 (Website) | PWA 必需文件 |
| **GamePix 图片** | R2 存储 | ☁️ R2 (Admin 上传) | 大量图片，需要 CDN |
| **用户上传** | R2 存储 | ☁️ R2 (Admin 上传) | 大文件，需要 CDN |

**结论**：
- ✅ 保持 Logo 在 packages/ui/
- ✅ Website 的 public/ 文件保持本地存储
- ✅ Admin 上传的游戏图片继续使用 R2
- ❌ 不需要把现有的静态文件迁移到 R2

### 5. Scripts 必要性分析

```
scripts/
├── assets/              → ❓ 图标生成（可能不常用）
│   ├── generate-icons.py
│   ├── generate-icons-gamepad.py
│   └── generate-white-logo.py
│
├── seo/                 → ✅ SEO 维护工具（Admin 需要）
│   └── ...
│
├── utils/               → ✅ 数据库工具（Admin 需要）
│   └── ...
│
├── validation/          → ✅ 数据验证（Admin 需要）
│   └── ...
│
├── check-bing-domain.ts → ✅ Bing 配置（Admin 需要）
├── init-search-engines.ts → ✅ 初始化配置（Admin 需要）
└── ...                  → ✅ 其他维护脚本（Admin 需要）
```

**分析**：
- ✅ **SEO 相关脚本**：Admin 部署时需要，用于配置检查和修复
- ✅ **数据库工具脚本**：Admin 维护数据库时需要
- ✅ **验证脚本**：Admin 检查数据完整性时需要
- ❓ **assets/ 图标生成脚本**：
  - 只在项目初期生成 Logo 时使用
  - 现在基本不用，可以移到单独的 tools/ 目录或删除

**结论**：
- ✅ 保留所有 SEO、utils、validation 脚本在 apps/admin/scripts/
- ❓ scripts/assets/ 可以单独处理：
  - 选项 A：移到根目录 tools/ 或 design/（不随 app 部署）
  - 选项 B：保留在 apps/admin/scripts/assets/（但注释说明很少使用）
  - 选项 C：完全删除（已有生成的图标）

## 📊 修正后的文件归属

### Lib 目录重新分配

#### 🟢 共享到 packages/database/src/helpers/

```typescript
// 必须共享（两端都用）
lib/i18n-helpers.ts           ✅ Admin 通过 lib/data 间接使用
lib/cache-helpers.ts          ✅ 缓存配置常量

// 必须共享（两端都用）
lib/tiptap-renderer.ts        ✅ Admin 编辑 + Website 渲染
```

#### 🔵 只属于 Website (apps/website/lib/)

```typescript
lib/seo-helpers.ts            ❌ Admin 不使用
lib/og-image-helpers.ts       ❌ Admin 不使用
lib/recommendation-engine.ts  ❌ Admin 不使用
lib/static-files.ts           ❌ Admin 不使用
```

#### 🔴 只属于 Admin (apps/admin/lib/)

```typescript
lib/auth.ts                   ✅ NextAuth 配置
lib/ai-*.ts                   ✅ AI 功能（8个文件）
lib/crypto.ts                 ✅ API Key 加密
lib/gamepix-*.ts              ✅ GamePix 导入
lib/r2-upload.ts              ✅ R2 上传
lib/google-search.ts          ✅ Google API
lib/seo-submissions/          ✅ SEO 提交
lib/site-config.ts            ✅ 网站配置管理
lib/schema-generators.ts      ✅ Schema 生成
lib/jina-reader.ts            ✅ Jina Reader
lib/character-count-helpers.ts ✅ 字符计数
lib/env.ts                    ✅ 环境变量验证（Admin 版本）
```

#### 🟡 需要分离 (各有各的版本)

```typescript
// apps/admin/lib/env.ts
export function validateRequiredEnvVars() {
  const required = [
    'DATABASE_URL',
    'NEXTAUTH_SECRET',
    'NEXTAUTH_URL',
    'ENCRYPTION_KEY',
  ]
  // ... 验证逻辑
}

// apps/website/lib/env.ts (可选)
export function validateRequiredEnvVars() {
  const required = [
    'DATABASE_URL',
    // 不需要其他环境变量验证
  ]
  // ... 验证逻辑
}
```

### Admin 使用的数据查询函数分析

**Admin 实际使用的函数**：
```typescript
// app/(admin)/admin/categories/page.tsx
getAllCategoriesForAdmin('zh')  // 固定使用中文

// app/(admin)/admin/tags/page.tsx
getAllTagsForAdmin('zh')        // 固定使用中文

// app/(admin)/admin/page.tsx
getDashboardStats()             // 不需要 locale

// app/(admin)/admin/languages/actions.ts
getEnabledLanguagesCached()     // 不需要 locale
```

**关键发现**：
- ✅ Admin 需要翻译功能，但**固定使用中文** (locale='zh')
- ✅ Admin 通过 lib/data 间接使用 i18n-helpers
- ✅ 这是合理的设计，因为 admin 界面本身是中文的

**优化建议**：
```typescript
// packages/database/src/data/categories/cache.ts
// 为 Admin 添加专用函数（可选优化）
export async function getAllCategoriesForAdminZh() {
  return getAllCategoriesForAdmin('zh')
}

// 或者在 Admin 创建包装函数
// apps/admin/lib/data-helpers.ts
export async function getAdminCategories() {
  return getAllCategoriesForAdmin('zh')
}
```

## 📐 修正后的 Monorepo 结构

```
rungame-monorepo/
├── apps/
│   ├── admin/
│   │   ├── app/
│   │   │   ├── (admin)/
│   │   │   ├── api/
│   │   │   │   ├── auth/
│   │   │   │   ├── admin/
│   │   │   │   ├── ai/
│   │   │   │   ├── gamepix/
│   │   │   │   └── upload/       # R2 上传 API
│   │   │   └── login/
│   │   │
│   │   ├── components/
│   │   │   └── admin/
│   │   │
│   │   ├── lib/
│   │   │   ├── auth.ts
│   │   │   ├── env.ts            # Admin 专用环境验证
│   │   │   ├── ai-*.ts
│   │   │   ├── crypto.ts
│   │   │   ├── gamepix-*.ts
│   │   │   ├── r2-upload.ts
│   │   │   ├── google-search.ts
│   │   │   ├── seo-submissions/
│   │   │   ├── site-config.ts
│   │   │   ├── schema-generators.ts
│   │   │   ├── jina-reader.ts
│   │   │   └── character-count-helpers.ts
│   │   │
│   │   ├── scripts/              # 维护脚本
│   │   │   ├── seo/
│   │   │   ├── utils/
│   │   │   ├── validation/
│   │   │   ├── examples/
│   │   │   └── ...
│   │   │
│   │   ├── types/
│   │   │   ├── ai-config.ts
│   │   │   └── next-auth.d.ts
│   │   │
│   │   ├── middleware.ts         # 只认证
│   │   └── package.json
│   │
│   └── website/
│       ├── app/
│       │   ├── [locale]/
│       │   └── api/
│       │       └── og/           # OG 图片生成
│       │
│       ├── components/
│       │   ├── site/
│       │   ├── theme/
│       │   └── analytics/
│       │
│       ├── lib/
│       │   ├── seo-helpers.ts    # ✅ 从共享移到这里
│       │   ├── og-image-helpers.ts # ✅ 从共享移到这里
│       │   ├── recommendation-engine.ts
│       │   ├── static-files.ts
│       │   └── env.ts            # Website 专用（可选）
│       │
│       ├── i18n/
│       ├── hooks/
│       ├── public/               # Website 专用静态文件
│       │   ├── ads.txt
│       │   ├── manifest.json
│       │   ├── apple-touch-icon.png
│       │   ├── assets/
│       │   └── *.txt
│       │
│       ├── middleware.ts         # 只 next-intl
│       └── package.json
│
├── packages/
│   ├── database/
│   │   ├── prisma/
│   │   ├── src/
│   │   │   ├── index.ts
│   │   │   ├── client.ts         # prisma.ts / db.ts
│   │   │   ├── data/             # 所有数据查询函数
│   │   │   │   ├── categories/
│   │   │   │   ├── games/
│   │   │   │   ├── tags/
│   │   │   │   ├── languages/
│   │   │   │   ├── page-types/
│   │   │   │   └── stats/
│   │   │   ├── helpers/
│   │   │   │   ├── i18n-helpers.ts    # ✅ 保留（lib/data 需要）
│   │   │   │   ├── cache-helpers.ts   # ✅ 保留
│   │   │   │   └── tiptap-renderer.ts # ✅ 从 admin 移到这里
│   │   │   └── types.ts
│   │   └── package.json
│   │
│   ├── ui/
│   │   ├── src/
│   │   │   ├── components/ui/    # shadcn/ui 组件
│   │   │   ├── lib/utils.ts      # cn() 工具
│   │   │   └── index.ts
│   │   ├── public/
│   │   │   └── logo/             # 共享 Logo
│   │   └── package.json
│   │
│   └── tsconfig/
│       └── ...
│
├── tools/                        # 🆕 设计和生成工具（不部署）
│   └── assets/                   # 图标生成脚本
│       ├── generate-icons.py
│       ├── generate-icons-gamepad.py
│       └── generate-white-logo.py
│
├── docs/
├── package.json
├── pnpm-workspace.yaml
├── turbo.json
└── tsconfig.json
```

## 🔄 变更总结

### 从共享移到 Website

| 文件 | 原方案 | 新方案 | 原因 |
|------|--------|--------|------|
| `lib/seo-helpers.ts` | packages/database/ | apps/website/lib/ | Admin 不使用 SEO |
| `lib/og-image-helpers.ts` | packages/database/ | apps/website/lib/ | Admin 不需要分享图片 |

### 从 Admin 移到共享

| 文件 | 原方案 | 新方案 | 原因 |
|------|--------|--------|------|
| `lib/tiptap-renderer.ts` | apps/admin/lib/ | packages/database/src/helpers/ | Website 也需要渲染 |

### 新增分离

| 文件 | 原方案 | 新方案 | 原因 |
|------|--------|--------|------|
| `lib/env.ts` | 共享或 Admin | 各自独立 | 环境变量需求不同 |

### 新增目录

| 目录 | 位置 | 说明 |
|------|------|------|
| `tools/` | 根目录 | 图标生成等设计工具（不随应用部署） |

## 📋 环境变量配置

### apps/admin/.env.example

```env
# ========================================
# 数据库
# ========================================
DATABASE_URL="postgresql://user:password@host:5432/database"

# ========================================
# 认证
# ========================================
NEXTAUTH_URL="https://admin.rungame.online"
NEXTAUTH_SECRET="生成命令: openssl rand -base64 32"

# ========================================
# 加密
# ========================================
# 用于加密 API Keys 存储在数据库中
ENCRYPTION_KEY="生成命令: openssl rand -base64 48"

# ========================================
# AI 服务
# ========================================
OPENAI_API_KEY="sk-..."
OPENROUTER_API_KEY="sk-or-v1-..."

# ========================================
# 存储 (Cloudflare R2)
# ========================================
R2_ACCESS_KEY_ID="..."
R2_SECRET_ACCESS_KEY="..."
R2_BUCKET_NAME="rungame-assets"
R2_PUBLIC_URL="https://cdn.rungame.online"

# ========================================
# 第三方服务
# ========================================
GOOGLE_API_KEY="..."
GOOGLE_SEARCH_ENGINE_ID="..."
BING_INDEXNOW_API_KEY="..."

# ========================================
# 部署配置
# ========================================
NODE_ENV="production"
NEXT_PUBLIC_DEPLOYMENT_MODE="admin"
```

### apps/website/.env.example

```env
# ========================================
# 数据库（只读）
# ========================================
DATABASE_URL="postgresql://user:password@host:5432/database"

# ========================================
# 分析和广告
# ========================================
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"
NEXT_PUBLIC_ADSENSE_ID="ca-pub-XXXXXXXXXX"

# ========================================
# 网站配置
# ========================================
NEXT_PUBLIC_URL="https://rungame.online"

# ========================================
# 部署配置
# ========================================
NODE_ENV="production"
NEXT_PUBLIC_DEPLOYMENT_MODE="site"
```

## 🔐 敏感配置存储策略

### 当前问题
```typescript
// 所有 API Keys 都在环境变量中
OPENAI_API_KEY="sk-..."
OPENROUTER_API_KEY="sk-or-v1-..."
GOOGLE_API_KEY="..."
```

### 优化方案（推荐）

**步骤 1：加密存储在数据库**
```typescript
// Admin 启动时从环境变量读取并加密存储
// apps/admin/lib/config-initialization.ts

import { encryptApiKey } from './crypto'
import { prisma } from '@rungame/database'

export async function initializeApiKeys() {
  // 从环境变量读取
  const openaiKey = process.env.OPENAI_API_KEY
  const openrouterKey = process.env.OPENROUTER_API_KEY

  if (openaiKey) {
    // 加密并存储到数据库
    await prisma.apiKey.upsert({
      where: { provider: 'openai' },
      update: {
        encryptedKey: encryptApiKey(openaiKey),
        updatedAt: new Date()
      },
      create: {
        provider: 'openai',
        encryptedKey: encryptApiKey(openaiKey)
      }
    })
  }

  // ... 其他 API Keys
}
```

**步骤 2：运行时从数据库读取**
```typescript
// apps/admin/lib/api-key-manager.ts

export async function getApiKey(provider: string) {
  const config = await prisma.apiKey.findUnique({
    where: { provider }
  })

  if (!config) {
    throw new Error(`API Key for ${provider} not found`)
  }

  return decryptApiKey(config.encryptedKey)
}

// 使用
const openaiKey = await getApiKey('openai')
```

**步骤 3：更新 env 验证**
```typescript
// apps/admin/lib/env.ts
export function validateRequiredEnvVars() {
  const required = [
    'DATABASE_URL',
    'NEXTAUTH_SECRET',
    'NEXTAUTH_URL',
    'ENCRYPTION_KEY',  // 必需，用于加密
    // ❌ 不再验证 API Keys（从数据库读取）
  ]
  // ...
}
```

**优势**：
- ✅ API Keys 不出现在环境变量中（更安全）
- ✅ 可以在管理界面修改 API Keys
- ✅ 支持多个 API Keys 配置
- ✅ 可以记录 API Keys 使用日志

## 🚀 修正后的迁移步骤

### 阶段 2：创建共享 Packages（修正）

```bash
cd packages/database

# 复制辅助函数（修正）
cp ../../rungame-nextjs/lib/i18n-helpers.ts ./src/helpers/
cp ../../rungame-nextjs/lib/cache-helpers.ts ./src/helpers/
cp ../../rungame-nextjs/lib/tiptap-renderer.ts ./src/helpers/  # ✅ 添加

# ❌ 不复制这两个（Website 专用）
# cp ../../rungame-nextjs/lib/seo-helpers.ts
# cp ../../rungame-nextjs/lib/og-image-helpers.ts
```

### 阶段 3：迁移 Admin（修正）

```bash
cd apps/admin

# 复制 Admin 专用 lib（修正）
cp ../../rungame-nextjs/lib/env.ts ./lib/  # ✅ 独立版本
# ... 其他 admin 文件

# ❌ 不复制 tiptap-renderer.ts（已在 packages/database）
```

### 阶段 4：迁移 Website（修正）

```bash
cd apps/website

# 复制 Website 专用 lib（修正）
cp ../../rungame-nextjs/lib/seo-helpers.ts ./lib/        # ✅ Website 专用
cp ../../rungame-nextjs/lib/og-image-helpers.ts ./lib/   # ✅ Website 专用
cp ../../rungame-nextjs/lib/recommendation-engine.ts ./lib/
cp ../../rungame-nextjs/lib/static-files.ts ./lib/

# 可选：创建 env.ts
cat > lib/env.ts << 'EOF'
export function validateRequiredEnvVars() {
  // Website 可能不需要严格验证
  // 或只验证 DATABASE_URL
}
EOF
```

### 阶段 5：处理 Scripts 和 Tools

```bash
# 创建 tools 目录
mkdir -p tools/assets

# 移动图标生成脚本
mv rungame-nextjs/scripts/assets/* tools/assets/

# 其他 scripts 保留在 apps/admin/scripts/
cp -r rungame-nextjs/scripts/* apps/admin/scripts/
rm -rf apps/admin/scripts/assets  # 已移到 tools/
```

## 📝 新增检查清单

阶段 2: 共享 Packages（修正）
- [ ] 创建 packages/database/
- [ ] ✅ 复制 i18n-helpers.ts（保留）
- [ ] ✅ 复制 cache-helpers.ts（保留）
- [ ] ✅ 复制 tiptap-renderer.ts（新增）
- [ ] ❌ 不复制 seo-helpers.ts（移到 Website）
- [ ] ❌ 不复制 og-image-helpers.ts（移到 Website）
- [ ] 创建 packages/ui/
- [ ] 创建 packages/tsconfig/

阶段 3: Admin 应用（修正）
- [ ] 创建独立的 lib/env.ts
- [ ] ❌ 不复制 tiptap-renderer.ts（已在 packages）
- [ ] 复制所有 AI 相关文件
- [ ] 复制 scripts/（除了 assets/）

阶段 4: Website 应用（修正）
- [ ] ✅ 复制 seo-helpers.ts 到 lib/
- [ ] ✅ 复制 og-image-helpers.ts 到 lib/
- [ ] 复制其他 Website 文件
- [ ] 配置 middleware（只 next-intl）

阶段 5: Tools 和清理
- [ ] 创建 tools/assets/
- [ ] 移动图标生成脚本
- [ ] 清理不需要的文件

## 💡 额外建议

### 1. Admin 数据查询优化（可选）

创建 Admin 专用的数据包装函数：

```typescript
// apps/admin/lib/data-helpers.ts

import {
  getAllCategoriesForAdmin,
  getAllTagsForAdmin,
  getDashboardStats,
  getEnabledLanguagesCached
} from '@rungame/database'

// 固定使用中文
export async function getAdminCategories() {
  return getAllCategoriesForAdmin('zh')
}

export async function getAdminTags() {
  return getAllTagsForAdmin('zh')
}

// 直接导出无需 locale 的函数
export { getDashboardStats, getEnabledLanguagesCached }
```

### 2. 环境变量迁移路径

**Phase 1（当前）**：环境变量
```env
OPENAI_API_KEY="sk-..."
```

**Phase 2（迁移后）**：数据库 + 环境变量
```env
ENCRYPTION_KEY="..."  # 只需要这个
# API Keys 从数据库读取
```

**Phase 3（最终）**：数据库 + 管理界面
- 在 Admin 界面管理所有 API Keys
- 加密存储在数据库
- 支持多配置、版本控制、审计日志

### 3. R2 存储使用建议

**当前使用**：
```typescript
// apps/admin/lib/r2-upload.ts
// 用于上传 GamePix 游戏图片
```

**未来优化**：
```typescript
// 可以考虑上传更多资源到 R2
- 游戏缩略图
- OG 图片（如果量大）
- 用户上传的资源

// 但不需要迁移现有的静态文件
- public/logo/ → 保持在 packages/ui/
- public/*.txt → 保持在 Website
```

---

**准备就绪**：修正后的方案已完成，等待执行。

**主要变更**：
1. ✅ seo-helpers.ts → Website only
2. ✅ og-image-helpers.ts → Website only
3. ✅ tiptap-renderer.ts → 共享（两端都用）
4. ✅ env.ts → 各自独立
5. ✅ scripts/assets/ → tools/assets/
