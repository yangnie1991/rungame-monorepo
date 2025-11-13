# Monorepo 分离方案（最终确认版）

> **状态**: ✅ 分析完成 - 待执行
> **创建时间**: 2025-11-14
> **最后更新**: 2025-11-14
> **分析结论**: 已完成所有代码分析和用户确认

## 🎯 目标

将现有的 Next.js 项目重构为 Monorepo 架构，实现：
1. **Admin 管理后台**和**Website 用户网站**完全分离
2. 最小化共享代码（只共享真正需要的）
3. 支持独立部署和独立开发
4. 使用 pnpm workspace + Turborepo 管理

## ✅ 分析结论和用户确认

| 项目 | 分析结果 | 归属 | 备注 |
|------|---------|------|------|
| **Theme 组件** | 只在 `app/(site)/[locale]/layout.tsx` 使用 | ✅ Website only | 管理后台强制浅色模式 |
| **Analytics 组件** | 只在 `app/(site)/[locale]/layout.tsx` 使用 | ✅ Website only | Google Analytics + Adsense |
| **OG 图片 API** | 在前端页面 metadata 中引用 | ✅ Website only | 用于社交分享图片生成 |
| **Lib/Data 目录** | 两端都大量使用 | ✅ 共享到 packages/database/ | Admin 专用函数保留在 apps/admin |
| **Public 资源** | Logo 两端都用，其他前端为主 | ✅ Logo 共享，其他分离 | ads.txt, manifest.json 等前端专用 |
| **Scripts 脚本** | SEO 检查、配置维护等工具 | ✅ Admin only | 保留在 apps/admin/scripts/ |
| **Middleware** | 不同逻辑（auth vs i18n） | ✅ 各自独立 | 不能共享 |

## 📊 详细代码分析结果

### 1. Components 分析

```
components/
├── ui/ (31个文件)           → packages/ui/
│   ├── button.tsx
│   ├── input.tsx
│   ├── card.tsx
│   └── ...
│
├── admin/                   → apps/admin/components/admin/
│   ├── ai-config/
│   ├── categories/
│   ├── games/
│   ├── languages/
│   ├── page-types/
│   ├── site-config/
│   └── tags/
│
├── site/                    → apps/website/components/site/
│   ├── game-card.tsx
│   ├── game-section.tsx
│   ├── header.tsx
│   ├── footer.tsx
│   └── sidebar.tsx
│
├── theme/                   → apps/website/components/theme/
│   ├── theme-provider.tsx   ✅ 只在 Website 使用
│   └── theme-toggle.tsx     ✅ 只在 Website 使用
│
└── analytics/               → apps/website/components/analytics/
    ├── GoogleAnalytics.tsx  ✅ 只在 Website 使用
    └── GoogleAdsense.tsx    ✅ 只在 Website 使用
```

### 2. Lib 目录分析

#### 🟢 共享文件 → packages/database/src/

```typescript
// 数据库客户端
lib/prisma.ts
lib/db.ts

// 数据查询层（两端都使用）
lib/data/
├── categories/
│   ├── cache.ts              // getAllCategoriesFullData (site)
│   │                         // getAllCategoriesForAdmin (admin)
│   └── index.ts              // getMainCategories, getSubCategories
├── games/
│   ├── browse.ts             // getGamesByCategory, getGamesByTag
│   ├── detail.ts             // getGameBySlug, incrementPlayCount
│   ├── featured.ts           // getFeaturedGames, getMostPlayedGames
│   ├── search.ts             // searchGames
│   └── stats.ts              // getTotalGamesCount
├── tags/
│   ├── cache.ts              // getAllTags, getAllTagsFullData
│   └── index.ts
├── languages/
│   ├── cache.ts              // getEnabledLanguages
│   └── index.ts
├── page-types/
│   ├── games.ts              // getPageTypeGames
│   └── info.ts               // getPageTypeInfo
└── stats/
    └── cache.ts              // getDashboardStats (admin only)

// 辅助工具（两端都使用）
lib/i18n-helpers.ts           // getTranslationWithFallback, buildLocaleCondition
lib/cache-helpers.ts          // CACHE_TAGS, REVALIDATE_TIME
lib/seo-helpers.ts            // generateGameMetadata, generateCategoryMetadata
lib/og-image-helpers.ts       // 生成 OG 图片的辅助函数（website 使用）
```

**引用统计**：
- **Admin 使用**：4 个导入（languages, tags, stats, categories 中的管理函数）
- **Website 使用**：17 个导入（几乎所有数据查询函数）

**分离策略**：
- ✅ 大部分放在 `packages/database/src/data/`
- ✅ Admin 专用函数（如 `getAllCategoriesForAdmin`, `getDashboardStats`）也放在 packages，但只被 admin 调用

#### 🔴 Admin Only → apps/admin/lib/

```typescript
// 认证
lib/auth.ts                   // NextAuth 配置（只管理端需要）

// AI 功能（8个文件）
lib/ai-chat-history.ts        // AI 对话历史
lib/ai-config.ts              // AI 配置管理
lib/ai-json-parser.ts         // AI JSON 解析
lib/ai-prompt-templates.ts    // AI 提示模板
lib/ai-providers.ts           // AI 提供商（OpenAI, OpenRouter 等）
lib/ai-seo-optimizer.ts       // AI SEO 优化
lib/ai-tools.ts               // AI 工具调用

// 加密和安全
lib/crypto.ts                 // API Key 加密

// 第三方服务集成
lib/gamepix-image-upload.ts   // GamePix 图片上传
lib/gamepix-importer.ts       // GamePix 游戏导入
lib/r2-upload.ts              // Cloudflare R2 上传
lib/google-search.ts          // Google 搜索 API

// SEO 功能
lib/seo-submissions/          // SEO 提交功能
    ├── bing-index-check.ts
    ├── check-url-submission-status.ts
    └── retry-failed-submissions.ts

// 网站配置
lib/site-config.ts            // 网站配置管理

// 其他工具
lib/schema-generators.ts      // Schema 生成
lib/tiptap-renderer.ts        // TipTap 编辑器渲染
lib/jina-reader.ts            // Jina Reader
lib/character-count-helpers.ts // 字符计数
lib/env.ts                    // 环境变量验证（可能需要分开）
```

#### 🔵 Website Only → apps/website/lib/

```typescript
lib/recommendation-engine.ts  // 游戏推荐引擎
lib/static-files.ts           // 静态文件处理（middleware 使用）
```

### 3. API 路由分析

```
app/api/
├── auth/                     → apps/admin/app/api/auth/
│   └── [...nextauth]/        ✅ NextAuth（只管理端）
│
├── admin/                    → apps/admin/app/api/admin/
│   ├── upload-gamepix-image/
│   ├── import-game-with-progress/
│   ├── batch-upload-gamepix-images/
│   ├── check-encryption-key/
│   ├── test-ai-config/
│   └── test-ai-connection/
│
├── ai/                       → apps/admin/app/api/ai/
│   ├── chat/
│   ├── chat-with-context/
│   ├── chat-with-tools/
│   ├── generate-seo-stream/
│   ├── generate-game-content-stream/
│   ├── batch-generate-seo/
│   ├── match-category/
│   └── execute-tool/
│
├── gamepix/                  → apps/admin/app/api/gamepix/
│   └── sync-stream/
│
└── og/                       → apps/website/app/api/og/
    ├── game/route.tsx        ✅ 用于社交分享（只前端）
    ├── category/route.tsx
    ├── tag/route.tsx
    └── pagetype/route.tsx
```

**验证结果**：
- OG API 只在 `app/(site)` 的页面 metadata 中通过 `openGraph.images` 引用
- 用于生成 Twitter Cards 和 Facebook Open Graph 图片
- 管理后台不需要分享功能

### 4. Public 资源分析

```
public/
├── logo/                     → packages/ui/public/logo/ (共享)
│   ├── logo-rungame.svg
│   ├── logo-rungame-white.svg
│   ├── logo-rungame-*.png    (多尺寸)
│   └── ...
│
├── ads.txt                   → apps/website/public/
├── manifest.json             → apps/website/public/
├── apple-touch-icon.png      → apps/website/public/
├── assets/                   → apps/website/public/assets/
├── file.svg                  → apps/website/public/
├── globe.svg                 → apps/website/public/
├── llms.txt                  → apps/website/public/
├── next.svg                  → 可删除（未使用）
├── vercel.svg                → 可删除（未使用）
└── *.txt (搜索引擎验证)      → apps/website/public/
```

**分离策略**：
- Logo：放在 `packages/ui/public/logo/`，admin 和 website 都引用
- 其他资源：大部分是前端专用（SEO、PWA、广告等）

### 5. Scripts 脚本分析

```
scripts/
├── README.md
├── assets/                   # 图标生成脚本
├── seo/                      # SEO 相关脚本
├── utils/                    # 工具脚本
├── validation/               # 验证脚本
├── examples/                 # 示例脚本
├── check-bing-domain.ts      # Bing 域名检查
├── check-indexnow-config.ts  # IndexNow 配置检查
├── check-url-submission-status.ts  # URL 提交状态检查
├── fix-indexnow-config.ts    # 修复 IndexNow 配置
├── init-search-engines.ts    # 初始化搜索引擎配置
├── reset-failed-submissions.ts  # 重置失败的提交
├── retry-failed-submissions.ts  # 重试失败的提交
├── update-bing-domain.ts     # 更新 Bing 域名
└── ...
```

**归属**：
- ✅ **所有脚本都是管理维护工具** → `apps/admin/scripts/`
- 这些脚本用于：数据库维护、SEO 配置、图标生成、数据验证等
- 前端网站不需要这些脚本

### 6. Middleware 分析

**当前 middleware.ts**：
```typescript
// 1. 部署模式路由控制（admin/site/full）
// 2. 国际化（next-intl）
// 3. 认证检查（间接通过 shouldExcludeFromI18n）
```

**分离后**：

**apps/admin/middleware.ts**：
```typescript
import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 排除登录页面
  if (pathname === "/login") {
    return NextResponse.next()
  }

  // 检查认证
  const session = await auth()
  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // 检查权限
  if (!["ADMIN", "SUPER_ADMIN"].includes(session.user.role)) {
    return new NextResponse("Forbidden", { status: 403 })
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/admin/:path*",
    "/api/ai/:path*"
  ]
}
```

**apps/website/middleware.ts**：
```typescript
import createMiddleware from "next-intl/middleware"
import { routing } from "./i18n/routing"

// 只需要 next-intl 中间件
export default createMiddleware(routing)

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"
  ]
}
```

**结论**：
- ✅ Middleware 完全独立，不能共享
- Admin：只需要认证和权限检查
- Website：只需要 next-intl 国际化

## 📐 最终 Monorepo 结构

```
rungame-monorepo/
├── apps/
│   ├── admin/                      # 🔴 管理后台应用
│   │   ├── app/
│   │   │   ├── (admin)/            # 管理路由
│   │   │   │   └── admin/
│   │   │   │       ├── ai-config/
│   │   │   │       ├── categories/
│   │   │   │       ├── games/
│   │   │   │       ├── languages/
│   │   │   │       ├── page-types/
│   │   │   │       ├── tags/
│   │   │   │       ├── site-config/
│   │   │   │       ├── seo-submissions/
│   │   │   │       └── import-games/
│   │   │   ├── api/
│   │   │   │   ├── auth/           # NextAuth
│   │   │   │   ├── admin/          # 管理 API
│   │   │   │   ├── ai/             # AI API
│   │   │   │   └── gamepix/        # GamePix 导入
│   │   │   └── login/              # 登录页面
│   │   │
│   │   ├── components/
│   │   │   └── admin/              # 管理后台组件
│   │   │
│   │   ├── lib/
│   │   │   ├── auth.ts             # NextAuth 配置
│   │   │   ├── ai-*.ts             # AI 功能（8个文件）
│   │   │   ├── crypto.ts           # 加密
│   │   │   ├── gamepix-*.ts        # GamePix 导入
│   │   │   ├── r2-upload.ts        # R2 上传
│   │   │   ├── google-search.ts    # Google API
│   │   │   ├── seo-submissions/    # SEO 提交
│   │   │   ├── site-config.ts      # 网站配置
│   │   │   ├── schema-generators.ts
│   │   │   ├── tiptap-renderer.ts
│   │   │   ├── jina-reader.ts
│   │   │   └── character-count-helpers.ts
│   │   │
│   │   ├── types/
│   │   │   ├── ai-config.ts
│   │   │   └── next-auth.d.ts
│   │   │
│   │   ├── scripts/                # 维护脚本
│   │   │   ├── assets/
│   │   │   ├── seo/
│   │   │   ├── utils/
│   │   │   ├── validation/
│   │   │   └── ...
│   │   │
│   │   ├── middleware.ts           # 只认证检查
│   │   ├── package.json
│   │   ├── next.config.ts
│   │   ├── tsconfig.json
│   │   └── .env.example
│   │
│   └── website/                    # 🔵 用户网站应用
│       ├── app/
│       │   ├── [locale]/           # 国际化路由
│       │   │   ├── page.tsx        # 首页
│       │   │   ├── games/          # 游戏列表
│       │   │   ├── play/[slug]/    # 游戏详情
│       │   │   ├── category/       # 分类页面
│       │   │   ├── tag/            # 标签页面
│       │   │   ├── search/         # 搜索
│       │   │   ├── collection/     # 集合页面
│       │   │   ├── about/          # 关于
│       │   │   ├── contact/        # 联系
│       │   │   ├── privacy/        # 隐私政策
│       │   │   └── terms/          # 服务条款
│       │   └── api/
│       │       └── og/             # OG 图片生成 API
│       │           ├── game/
│       │           ├── category/
│       │           ├── tag/
│       │           └── pagetype/
│       │
│       ├── components/
│       │   ├── site/               # 网站组件
│       │   ├── theme/              # 主题切换
│       │   └── analytics/          # 分析组件
│       │
│       ├── lib/
│       │   ├── recommendation-engine.ts
│       │   └── static-files.ts
│       │
│       ├── i18n/                   # 国际化配置
│       │   ├── messages/
│       │   │   ├── en.json
│       │   │   └── zh.json
│       │   ├── routing.ts
│       │   └── config.ts
│       │
│       ├── hooks/
│       │   └── useEnabledLanguages.ts
│       │
│       ├── public/                 # 网站专用资源
│       │   ├── ads.txt
│       │   ├── manifest.json
│       │   ├── apple-touch-icon.png
│       │   ├── assets/
│       │   └── *.txt (搜索引擎验证)
│       │
│       ├── middleware.ts           # next-intl 中间件
│       ├── package.json
│       ├── next.config.ts
│       ├── tsconfig.json
│       └── .env.example
│
├── packages/
│   ├── database/                   # 🟢 共享数据库包
│   │   ├── prisma/
│   │   │   ├── schema.prisma
│   │   │   └── seed.ts
│   │   ├── src/
│   │   │   ├── index.ts            # 导出 PrismaClient
│   │   │   ├── client.ts           # prisma.ts / db.ts
│   │   │   ├── data/               # 所有数据查询函数
│   │   │   │   ├── categories/
│   │   │   │   │   ├── cache.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── games/
│   │   │   │   │   ├── browse.ts
│   │   │   │   │   ├── detail.ts
│   │   │   │   │   ├── featured.ts
│   │   │   │   │   ├── search.ts
│   │   │   │   │   ├── stats.ts
│   │   │   │   │   ├── utils.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── tags/
│   │   │   │   ├── languages/
│   │   │   │   ├── page-types/
│   │   │   │   ├── stats/
│   │   │   │   └── index.ts
│   │   │   ├── helpers/
│   │   │   │   ├── i18n-helpers.ts
│   │   │   │   ├── cache-helpers.ts
│   │   │   │   ├── seo-helpers.ts
│   │   │   │   └── og-image-helpers.ts
│   │   │   └── types.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── ui/                         # 🟢 共享 UI 组件包
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   └── ui/             # shadcn/ui 组件（31个）
│   │   │   │       ├── button.tsx
│   │   │   │       ├── input.tsx
│   │   │   │       ├── card.tsx
│   │   │   │       └── ...
│   │   │   ├── lib/
│   │   │   │   └── utils.ts        # cn() 工具
│   │   │   └── index.ts            # 统一导出
│   │   ├── public/
│   │   │   └── logo/               # 共享 Logo
│   │   │       ├── logo-rungame.svg
│   │   │       ├── logo-rungame-white.svg
│   │   │       └── *.png
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── tailwind.config.ts
│   │
│   └── tsconfig/                   # 🟢 共享 TypeScript 配置
│       ├── base.json               # 基础配置
│       ├── nextjs.json             # Next.js 配置
│       ├── react-library.json      # React 库配置
│       └── package.json
│
├── docs/                           # 📚 文档
│   └── ...
│
├── package.json                    # 根 package.json
├── pnpm-workspace.yaml             # pnpm 工作区配置
├── turbo.json                      # Turborepo 配置
├── tsconfig.json                   # 根 TypeScript 配置
├── .gitignore
└── README.md
```

## 📦 Package 依赖关系

```
apps/admin/
├── @rungame/database  (workspace:*)
├── @rungame/ui        (workspace:*)
├── next               (15.5.4)
├── next-auth          (^5.0.0-beta.29)
├── react-hook-form    (^7.65.0)
├── @aws-sdk/client-s3 (^3.908.0)
├── googleapis         (^166.0.0)
└── @tiptap/*          (^3.7.2)

apps/website/
├── @rungame/database  (workspace:*)
├── @rungame/ui        (workspace:*)
├── next               (15.5.4)
├── next-intl          (^4.3.12)
├── next-themes        (^0.4.6)
└── @vercel/analytics  (^1.5.0)

packages/database/
├── @prisma/client     (^6.17.1)
├── prisma             (^6.17.1)
└── zod                (^4.1.12)

packages/ui/
├── @radix-ui/*
├── lucide-react
├── tailwindcss
└── class-variance-authority
```

## 📋 Package.json 配置

### 根目录 package.json

```json
{
  "name": "rungame-monorepo",
  "version": "0.0.0",
  "private": true,
  "workspaces": [
    "apps/*",
    "packages/*"
  ],
  "scripts": {
    "dev": "turbo run dev",
    "dev:admin": "turbo run dev --filter=@rungame/admin",
    "dev:website": "turbo run dev --filter=@rungame/website",
    "build": "turbo run build",
    "build:admin": "turbo run build --filter=@rungame/admin",
    "build:website": "turbo run build --filter=@rungame/website",
    "lint": "turbo run lint",
    "db:push": "turbo run db:push --filter=@rungame/database",
    "db:generate": "turbo run db:generate --filter=@rungame/database",
    "db:seed": "turbo run db:seed --filter=@rungame/database"
  },
  "devDependencies": {
    "turbo": "^2.0.0",
    "typescript": "^5"
  },
  "packageManager": "pnpm@9.0.0",
  "engines": {
    "node": ">=20.0.0",
    "pnpm": ">=9.0.0"
  }
}
```

### pnpm-workspace.yaml

```yaml
packages:
  - "apps/*"
  - "packages/*"
```

### turbo.json

```json
{
  "$schema": "https://turbo.build/schema.json",
  "globalDependencies": ["**/.env"],
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "!.next/cache/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {
      "dependsOn": ["^lint"]
    },
    "db:push": {
      "cache": false
    },
    "db:generate": {
      "cache": false
    }
  }
}
```

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
    "./client": "./src/client.ts",
    "./data/*": "./src/data/*/index.ts",
    "./helpers/*": "./src/helpers/*.ts"
  },
  "scripts": {
    "db:push": "prisma db push",
    "db:seed": "tsx prisma/seed.ts",
    "db:generate": "prisma generate",
    "db:studio": "prisma studio"
  },
  "dependencies": {
    "@prisma/client": "^6.17.1",
    "zod": "^4.1.12"
  },
  "devDependencies": {
    "@types/node": "^20",
    "prisma": "^6.17.1",
    "tsx": "^4.20.6",
    "typescript": "^5"
  }
}
```

### packages/ui/package.json

```json
{
  "name": "@rungame/ui",
  "version": "0.0.0",
  "private": true,
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "exports": {
    ".": "./src/index.ts",
    "./components/*": "./src/components/ui/*.tsx",
    "./lib/*": "./src/lib/*.ts"
  },
  "dependencies": {
    "@radix-ui/react-alert-dialog": "^1.1.15",
    "@radix-ui/react-avatar": "^1.1.10",
    "@radix-ui/react-checkbox": "^1.3.3",
    "@radix-ui/react-dialog": "^1.1.15",
    "@radix-ui/react-dropdown-menu": "^2.1.16",
    "@radix-ui/react-label": "^2.1.7",
    "@radix-ui/react-popover": "^1.1.15",
    "@radix-ui/react-select": "^2.2.6",
    "@radix-ui/react-slot": "^1.2.4",
    "@radix-ui/react-switch": "^1.2.6",
    "@radix-ui/react-tabs": "^1.1.13",
    "@radix-ui/react-tooltip": "^1.2.8",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "lucide-react": "^0.545.0",
    "tailwind-merge": "^3.3.1",
    "tailwindcss-animate": "^1.0.7",
    "react": "19.1.0"
  },
  "devDependencies": {
    "@types/react": "^19",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
}
```

### apps/admin/package.json

```json
{
  "name": "@rungame/admin",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev --turbopack --port 3001",
    "build": "next build --turbopack",
    "start": "next start --port 3001",
    "lint": "eslint"
  },
  "dependencies": {
    "@rungame/database": "workspace:*",
    "@rungame/ui": "workspace:*",
    "next": "15.5.4",
    "react": "19.1.0",
    "react-dom": "19.1.0",
    "next-auth": "^5.0.0-beta.29",
    "react-hook-form": "^7.65.0",
    "zod": "^4.1.12",
    "@hookform/resolvers": "^5.2.2",
    "@aws-sdk/client-s3": "^3.908.0",
    "@tanstack/react-table": "^8.21.3",
    "bcryptjs": "^3.0.2",
    "cheerio": "^1.1.2",
    "googleapis": "^166.0.0",
    "@tiptap/react": "^3.7.2",
    "@tiptap/starter-kit": "^3.7.2",
    "@tiptap/extension-*": "^3.7.2",
    "sonner": "^2.0.7"
  },
  "devDependencies": {
    "@types/bcryptjs": "^2.4.6",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "15.5.4",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
}
```

### apps/website/package.json

```json
{
  "name": "@rungame/website",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev --turbopack --port 3000",
    "build": "next build --turbopack",
    "start": "next start --port 3000",
    "lint": "eslint"
  },
  "dependencies": {
    "@rungame/database": "workspace:*",
    "@rungame/ui": "workspace:*",
    "next": "15.5.4",
    "react": "19.1.0",
    "react-dom": "19.1.0",
    "next-intl": "^4.3.12",
    "next-themes": "^0.4.6",
    "@vercel/analytics": "^1.5.0",
    "@vercel/og": "^0.8.5",
    "embla-carousel-react": "^8.6.0",
    "sonner": "^2.0.7"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "15.5.4",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
}
```

## 🚀 迁移步骤（详细）

### 阶段 1：创建 Monorepo 骨架（1-2小时）

1. **创建新目录结构**
   ```bash
   mkdir rungame-monorepo
   cd rungame-monorepo
   mkdir -p apps/admin apps/website packages/database packages/ui packages/tsconfig docs
   ```

2. **初始化 pnpm workspace**
   ```bash
   # 创建根 package.json
   pnpm init

   # 创建 pnpm-workspace.yaml
   cat > pnpm-workspace.yaml << 'EOF'
   packages:
     - "apps/*"
     - "packages/*"
   EOF
   ```

3. **配置 Turborepo**
   ```bash
   pnpm add -Dw turbo

   # 创建 turbo.json（参考上面的配置）
   ```

4. **配置 TypeScript**
   ```bash
   # 创建根 tsconfig.json
   # 创建 packages/tsconfig/base.json
   # 创建 packages/tsconfig/nextjs.json
   ```

### 阶段 2：创建共享 Packages（2-3小时）

1. **创建 packages/database/**
   ```bash
   cd packages/database
   pnpm init
   mkdir -p src/data src/helpers prisma

   # 复制 Prisma schema
   cp ../../rungame-nextjs/prisma/schema.prisma ./prisma/

   # 复制数据查询函数
   cp -r ../../rungame-nextjs/lib/data/* ./src/data/

   # 复制辅助函数
   cp ../../rungame-nextjs/lib/i18n-helpers.ts ./src/helpers/
   cp ../../rungame-nextjs/lib/cache-helpers.ts ./src/helpers/
   cp ../../rungame-nextjs/lib/seo-helpers.ts ./src/helpers/
   cp ../../rungame-nextjs/lib/og-image-helpers.ts ./src/helpers/

   # 复制数据库客户端
   cp ../../rungame-nextjs/lib/prisma.ts ./src/client.ts

   # 创建 index.ts 统一导出
   # 安装依赖
   pnpm install
   ```

2. **创建 packages/ui/**
   ```bash
   cd packages/ui
   pnpm init
   mkdir -p src/components/ui src/lib public/logo

   # 复制 shadcn/ui 组件
   cp -r ../../rungame-nextjs/components/ui/* ./src/components/ui/

   # 复制 utils.ts
   cp ../../rungame-nextjs/lib/utils.ts ./src/lib/

   # 复制 Logo
   cp -r ../../rungame-nextjs/public/logo/* ./public/logo/

   # 创建 index.ts 统一导出
   # 安装依赖
   pnpm install
   ```

3. **创建 packages/tsconfig/**
   ```bash
   cd packages/tsconfig
   pnpm init

   # 创建 base.json, nextjs.json, react-library.json
   ```

### 阶段 3：迁移 Admin 应用（3-4小时）

1. **创建基础结构**
   ```bash
   cd apps/admin
   pnpm init
   mkdir -p app lib components types scripts
   ```

2. **复制 Admin 路由**
   ```bash
   # 复制 app/(admin)/
   cp -r ../../rungame-nextjs/app/(admin)/* ./app/

   # 复制 app/api/auth, api/admin, api/ai, api/gamepix
   mkdir -p app/api
   cp -r ../../rungame-nextjs/app/api/auth ./app/api/
   cp -r ../../rungame-nextjs/app/api/admin ./app/api/
   cp -r ../../rungame-nextjs/app/api/ai ./app/api/
   cp -r ../../rungame-nextjs/app/api/gamepix ./app/api/

   # 复制登录页面
   cp -r ../../rungame-nextjs/app/(auth)/admin/login ./app/
   ```

3. **复制 Admin 专用代码**
   ```bash
   # 复制 components/admin/
   cp -r ../../rungame-nextjs/components/admin ./components/

   # 复制 Admin 专用 lib 文件
   cp ../../rungame-nextjs/lib/auth.ts ./lib/
   cp ../../rungame-nextjs/lib/ai-*.ts ./lib/
   cp ../../rungame-nextjs/lib/crypto.ts ./lib/
   cp ../../rungame-nextjs/lib/gamepix-*.ts ./lib/
   cp ../../rungame-nextjs/lib/r2-upload.ts ./lib/
   cp ../../rungame-nextjs/lib/google-search.ts ./lib/
   cp -r ../../rungame-nextjs/lib/seo-submissions ./lib/
   cp ../../rungame-nextjs/lib/site-config.ts ./lib/
   cp ../../rungame-nextjs/lib/schema-generators.ts ./lib/
   cp ../../rungame-nextjs/lib/tiptap-renderer.ts ./lib/
   cp ../../rungame-nextjs/lib/jina-reader.ts ./lib/
   cp ../../rungame-nextjs/lib/character-count-helpers.ts ./lib/

   # 复制 types
   cp ../../rungame-nextjs/types/ai-config.ts ./types/
   cp ../../rungame-nextjs/types/next-auth.d.ts ./types/

   # 复制 scripts
   cp -r ../../rungame-nextjs/scripts/* ./scripts/
   ```

4. **创建 middleware.ts**（认证专用）

5. **更新导入路径**
   ```bash
   # 将所有 @/lib/data 改为 @rungame/database
   # 将所有 @/components/ui 改为 @rungame/ui
   # 使用 find + sed 批量替换
   ```

6. **配置文件**
   ```bash
   # 创建 package.json（参考上面的配置）
   # 创建 next.config.ts
   # 创建 tsconfig.json
   # 创建 .env.example
   ```

7. **安装依赖并测试**
   ```bash
   pnpm install
   pnpm run dev
   ```

### 阶段 4：迁移 Website 应用（3-4小时）

1. **创建基础结构**
   ```bash
   cd apps/website
   pnpm init
   mkdir -p app lib components i18n hooks public
   ```

2. **复制 Website 路由**
   ```bash
   # 复制 app/(site)/[locale]/
   cp -r ../../rungame-nextjs/app/(site)/[locale]/* ./app/

   # 复制 OG API
   mkdir -p app/api
   cp -r ../../rungame-nextjs/app/api/og ./app/api/
   ```

3. **复制 Website 专用代码**
   ```bash
   # 复制 components/site, theme, analytics
   cp -r ../../rungame-nextjs/components/site ./components/
   cp -r ../../rungame-nextjs/components/theme ./components/
   cp -r ../../rungame-nextjs/components/analytics ./components/

   # 复制 Website 专用 lib 文件
   cp ../../rungame-nextjs/lib/recommendation-engine.ts ./lib/
   cp ../../rungame-nextjs/lib/static-files.ts ./lib/

   # 复制 i18n 配置
   cp -r ../../rungame-nextjs/i18n/* ./i18n/

   # 复制 hooks
   cp ../../rungame-nextjs/hooks/useEnabledLanguages.ts ./hooks/

   # 复制 public 资源（除了 Logo）
   cp -r ../../rungame-nextjs/public/* ./public/
   rm -rf ./public/logo  # Logo 使用 packages/ui 的
   ```

4. **创建 middleware.ts**（next-intl 专用）

5. **更新导入路径**
   ```bash
   # 将所有 @/lib/data 改为 @rungame/database
   # 将所有 @/components/ui 改为 @rungame/ui
   # 更新 Logo 路径为 @rungame/ui/public/logo
   ```

6. **配置文件**
   ```bash
   # 创建 package.json（参考上面的配置）
   # 创建 next.config.ts
   # 创建 tsconfig.json
   # 创建 .env.example
   ```

7. **安装依赖并测试**
   ```bash
   pnpm install
   pnpm run dev
   ```

### 阶段 5：测试和验证（2-3小时）

1. **测试 packages/database**
   ```bash
   cd packages/database
   pnpm run db:push
   pnpm run db:seed
   ```

2. **测试 Admin 应用**
   ```bash
   cd apps/admin
   pnpm run dev
   # 访问 http://localhost:3001/login
   # 测试登录、游戏管理、分类管理等功能
   ```

3. **测试 Website 应用**
   ```bash
   cd apps/website
   pnpm run dev
   # 访问 http://localhost:3000
   # 测试首页、游戏列表、游戏详情、搜索等功能
   # 测试语言切换
   ```

4. **测试构建**
   ```bash
   cd rungame-monorepo
   pnpm run build
   # 检查是否有构建错误
   ```

5. **验证导入**
   ```bash
   # 检查是否所有 @rungame/database 和 @rungame/ui 的导入都正常工作
   # 检查类型推导是否正确
   ```

### 阶段 6：部署配置（1-2小时）

1. **配置 Vercel 部署（Website）**
   ```bash
   # 在 Vercel 项目设置中：
   # Root Directory: apps/website
   # Build Command: cd ../.. && pnpm run build --filter=@rungame/website
   # Output Directory: apps/website/.next
   # Install Command: pnpm install
   ```

2. **配置 VPS 部署（Admin）**
   ```bash
   # 更新 VPS 上的部署脚本
   # 修改 build 命令为 Monorepo 方式
   ```

3. **更新环境变量**
   ```bash
   # Vercel: 添加 Website 需要的环境变量
   # VPS: 添加 Admin 需要的环境变量
   ```

4. **测试生产构建和部署**

## ⚠️ 风险和注意事项

### 1. 路径别名变化

**问题**：
- 现在：`@/lib/utils`
- Monorepo：`@rungame/ui` 或 `@rungame/database`

**影响**：需要更新所有导入语句

**解决方案**：
```bash
# 使用批量替换（在迁移阶段 3 和 4 执行）
find apps/admin -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i '' 's|@/lib/data|@rungame/database|g' {} +
find apps/admin -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i '' 's|@/components/ui|@rungame/ui|g' {} +

find apps/website -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i '' 's|@/lib/data|@rungame/database|g' {} +
find apps/website -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i '' 's|@/components/ui|@rungame/ui|g' {} +
```

### 2. 环境变量分离

**Admin 需要**：
```env
# 数据库
DATABASE_URL=

# 认证
NEXTAUTH_URL=https://admin.rungame.online
NEXTAUTH_SECRET=

# AI API
OPENAI_API_KEY=
OPENROUTER_API_KEY=

# 存储
R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=
R2_BUCKET_NAME=
R2_PUBLIC_URL=

# 第三方服务
GOOGLE_API_KEY=
GOOGLE_SEARCH_ENGINE_ID=
BING_INDEXNOW_API_KEY=
```

**Website 需要**：
```env
# 数据库（只读）
DATABASE_URL=

# 分析
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_ADSENSE_ID=

# Vercel
NEXT_PUBLIC_URL=https://rungame.online
```

### 3. 构建时间

**预期**：
- 首次构建：5-10 分钟（需要构建所有 packages）
- 增量构建：1-3 分钟（Turborepo 缓存）
- 只构建一个 app：1-2 分钟

**优化**：
- 配置 Vercel Remote Cache
- 使用 `--filter` 只构建需要的 app

### 4. 依赖管理

**注意事项**：
- pnpm workspace 会提升共同依赖到根目录
- 版本冲突需要手动解决
- 保持 React、Next.js 等核心依赖版本一致

**最佳实践**：
```bash
# 在根目录安装共同依赖
pnpm add -w <package>

# 在特定 app 安装依赖
pnpm --filter @rungame/admin add <package>
```

### 5. 类型系统

**packages/database/tsconfig.json**：
```json
{
  "extends": "@rungame/tsconfig/base.json",
  "compilerOptions": {
    "rootDir": ".",
    "outDir": "./dist"
  },
  "include": ["src/**/*", "prisma/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

**apps/admin/tsconfig.json**：
```json
{
  "extends": "@rungame/tsconfig/nextjs.json",
  "compilerOptions": {
    "paths": {
      "@/*": ["./"],
      "@rungame/database": ["../../packages/database/src"],
      "@rungame/ui": ["../../packages/ui/src"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```

### 6. 数据库迁移

**问题**：Prisma 现在在 packages/database，如何处理迁移？

**解决方案**：
```bash
# 在根目录运行
pnpm run db:push   # 推送 schema 变更
pnpm run db:seed   # 填充数据

# 或在 packages/database 中运行
cd packages/database
pnpm run db:push
```

### 7. 开发体验

**多应用并行开发**：
```bash
# 同时启动 admin 和 website
pnpm run dev

# 只启动 admin
pnpm run dev:admin

# 只启动 website
pnpm run dev:website
```

**热重载**：
- packages 的变更会自动触发 apps 的重新编译
- 得益于 Turborepo 和 pnpm workspace 的监听机制

## 📝 迁移检查清单

在开始迁移之前：

- [ ] 备份当前代码（git tag v1.0-before-monorepo）
- [ ] 创建新分支（git checkout -b monorepo-migration）
- [ ] 确认部署环境配置
- [ ] 准备测试计划
- [ ] 团队成员了解 Monorepo 结构

阶段 1: 骨架创建
- [ ] 创建目录结构
- [ ] 配置 pnpm workspace
- [ ] 配置 Turborepo
- [ ] 配置 TypeScript

阶段 2: 共享 Packages
- [ ] 创建 packages/database/
- [ ] 创建 packages/ui/
- [ ] 创建 packages/tsconfig/
- [ ] 测试 packages 独立工作

阶段 3: Admin 应用
- [ ] 迁移路由
- [ ] 迁移组件
- [ ] 迁移 lib 文件
- [ ] 更新导入路径
- [ ] 配置 middleware
- [ ] 测试功能完整性

阶段 4: Website 应用
- [ ] 迁移路由
- [ ] 迁移组件
- [ ] 迁移 i18n
- [ ] 更新导入路径
- [ ] 配置 middleware
- [ ] 测试功能完整性

阶段 5: 测试验证
- [ ] 数据库连接测试
- [ ] Admin 功能测试
- [ ] Website 功能测试
- [ ] 构建测试
- [ ] 类型检查

阶段 6: 部署
- [ ] 配置 Vercel
- [ ] 配置 VPS
- [ ] 环境变量设置
- [ ] 生产部署测试

## 🎯 预期成果

完成迁移后：

✅ **代码组织**：
- Admin 和 Website 完全分离
- 共享代码最小化且清晰
- 依赖关系明确

✅ **开发体验**：
- 独立开发和测试
- 更快的构建时间（增量构建）
- 更好的类型推导

✅ **部署灵活性**：
- 独立部署 Admin 和 Website
- Vercel 和 VPS 各司其职
- 无超时限制（Admin）

✅ **可维护性**：
- 清晰的代码边界
- 更容易扩展
- 减少相互影响

## 📚 参考资源

- [Turborepo 文档](https://turbo.build/repo/docs)
- [pnpm Workspace 文档](https://pnpm.io/workspaces)
- [Next.js Monorepo 最佳实践](https://nextjs.org/docs/advanced-features/multi-zones)
- [Vercel Monorepo 部署](https://vercel.com/docs/monorepos)

---

**准备就绪**：方案已完成分析和确认，可以开始执行迁移。

**预计总时间**：12-18 小时
- 阶段 1-2：3-5 小时
- 阶段 3-4：6-8 小时
- 阶段 5-6：3-5 小时

**建议执行方式**：
1. 先完成阶段 1-2（骨架和 packages）
2. 暂停，测试 packages 是否正常工作
3. 继续阶段 3-4（迁移两个 apps）
4. 逐个测试功能
5. 最后部署到生产环境
