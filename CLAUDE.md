# CLAUDE.md

本文档为 Claude Code (claude.ai/code) 提供在此代码库中工作的指导。

## 项目概述

RunGame 是一个多语言在线游戏平台，采用 **Turborepo Monorepo** 架构构建。

### Monorepo 结构

- **apps/admin** - 管理后台应用 (Next.js 16, 端口 4000)
- **apps/website** - 用户端网站 (Next.js 16, 端口 3000)
- **packages/database** - 业务数据库层 (Prisma 7 + PostgreSQL)
- **packages/database-admin** - 管理数据库层 (Prisma 7 + PostgreSQL)

### 双界面架构

- **用户端网站** (apps/website): 国际化游戏门户，包含动态内容
- **管理后台** (apps/admin): 内容管理系统，用于管理游戏、分类、标签、语言、页面类型、AI 配置和 SEO 提交

**技术栈**: Turborepo, Next.js 16, React 19, TypeScript, Prisma 7 (PostgreSQL), Better Auth, next-intl, TailwindCSS 4, shadcn/ui, pnpm

## 开发命令

```bash
# 开发（Monorepo）
pnpm dev                       # 同时启动 admin (4000) 和 website (3000)
pnpm dev:admin                 # 仅启动管理后台（端口 4000）
pnpm dev:website               # 仅启动用户端网站（端口 3000）

# 构建
pnpm build                     # 构建所有应用
pnpm build:admin               # 仅构建管理后台
pnpm build:website             # 仅构建用户端网站
pnpm build:database            # 构建数据库包

# 生产运行
pnpm start                     # 启动 website 生产服务器（端口 3000）
pnpm start:admin               # 启动 admin 生产服务器（端口 4000）
pnpm start:website             # 启动 website 生产服务器（端口 3000）

# 数据库（通过 @rungame/database workspace）
pnpm db:push                   # 将 Prisma schema 推送到数据库
pnpm db:seed                   # 填充数据库初始数据（管理员、分类、游戏）
pnpm db:generate               # 生成 Prisma 客户端（两个数据库）
pnpm db:studio                 # 打开 Prisma Studio

# 代码质量
pnpm lint                      # 运行所有应用的 ESLint

# Docker 数据库（本地开发）
docker-compose -f docker-compose.db.yml up -d    # 启动 PostgreSQL
docker-compose -f docker-compose.db.yml down     # 停止 PostgreSQL
```

**管理员登录**（填充数据后）:
- Admin URL: http://localhost:4000/login
- Website URL: http://localhost:3000
- 邮箱: admin@rungame.online
- 密码: admin123

## 架构概览

### Monorepo 项目结构

```
rungame-monorepo/
├── apps/
│   ├── admin/                 # 管理后台应用（端口 4000）
│   │   ├── app/               # Next.js App Router
│   │   │   ├── (dashboard)/   # 管理后台路由组（认证保护）
│   │   │   ├── api/           # API 路由
│   │   │   └── login/         # 登录页面
│   │   ├── components/        # 管理后台组件
│   │   ├── lib/               # 工具函数和配置
│   │   ├── middleware.ts      # 身份验证中间件
│   │   └── package.json
│   │
│   └── website/               # 用户端网站（端口 3000）
│       ├── app/               # Next.js App Router
│       │   └── [locale]/      # 完全国际化路由
│       ├── components/        # 网站组件
│       ├── lib/               # 工具函数
│       ├── i18n/              # 国际化配置
│       ├── middleware.ts      # 语言路由中间件
│       └── package.json
│
├── packages/
│   ├── database/              # 业务数据库层（共享）
│   │   ├── prisma/
│   │   │   ├── schema.prisma  # 业务数据模型
│   │   │   └── seed.ts        # 数据填充脚本
│   │   ├── generated/         # Prisma 7 生成的客户端
│   │   ├── src/               # 导出的数据库工具
│   │   └── package.json
│   │
│   └── database-admin/        # 管理数据库层（仅 Admin）
│       ├── prisma/
│       │   ├── schema.prisma  # 管理配置数据模型
│       │   └── seed.ts        # 管理数据填充
│       ├── generated/         # Prisma 7 生成的客户端
│       ├── src/               # 导出的数据库工具
│       └── package.json
│
├── docs/                      # 项目文档
├── scripts/                   # 维护脚本
├── docker-compose.db.yml      # 本地数据库容器
├── turbo.json                 # Turborepo 配置
└── package.json               # 根 workspace 配置
```

### Admin 应用路由结构 (apps/admin/app/)

应用使用 Next.js 路由组实现完全分离：

```
app/
├── layout.tsx                 # 根布局（html, body, Toaster）
├── login/
│   └── page.tsx              # 登录页面（/login）
├── (dashboard)/               # Dashboard 路由组（认证保护）
│   ├── layout.tsx            # Dashboard 布局（侧边栏 + 头部）
│   ├── page.tsx              # 首页（/）
│   ├── games/                # 游戏管理
│   │   ├── page.tsx          # 列表（/games）
│   │   ├── new/page.tsx      # 新建（/games/new）
│   │   └── [id]/page.tsx     # 编辑（/games/[id]）
│   ├── categories/           # 分类管理
│   ├── tags/                 # 标签管理
│   ├── languages/            # 语言管理
│   ├── page-types/           # PageType 管理
│   ├── ai-config/            # AI 配置管理
│   ├── external-apis/        # 外部 API 配置
│   ├── import-games/         # 游戏导入
│   │   ├── page.tsx          # 导入平台列表
│   │   └── gamepix/page.tsx  # GamePix 导入
│   ├── seo-submissions/      # SEO 提交管理
│   │   ├── page.tsx          # 概览
│   │   ├── submit/page.tsx   # 提交 URL
│   │   ├── google/page.tsx   # Google 状态
│   │   └── bing/page.tsx     # Bing 状态
│   ├── site-config/          # 网站配置
│   └── site-settings/        # 网站设置
│       └── r2-config/        # R2 CDN 配置
│
└── api/                      # API 路由
    ├── auth/[...all]/        # Better Auth 处理程序
    ├── admin/                # 管理 API
    ├── ai/                   # AI 相关 API
    └── gamepix/              # GamePix 同步 API
```

### Website 应用路由结构 (apps/website/app/)

```
app/
└── [locale]/                 # 完全国际化
    ├── layout.tsx           # 根 HTML + next-intl provider
    ├── page.tsx             # 首页
    ├── games/               # 游戏列表页 (/games)
    ├── play/[slug]/         # 游戏详情页 (/play/{slug})
    ├── category/            # 分类页面
    ├── tag/                 # 标签页面
    ├── collection/          # 收藏页面
    ├── search/              # 搜索页面
    ├── about/               # 关于页面
    ├── contact/             # 联系页面
    ├── privacy/             # 隐私政策
    ├── terms/               # 服务条款
    └── [slug]/              # 动态 PageType 路由
```

### 国际化 (next-intl)

**配置文件** (仅 Website 应用):
- [apps/website/i18n/routing.ts](apps/website/i18n/routing.ts) - 定义语言、默认语言，并导出类型安全的导航 API
- [apps/website/i18n/config.ts](apps/website/i18n/config.ts) - 请求配置，加载翻译消息
- [apps/website/i18n/messages/](apps/website/i18n/messages/) - JSON 翻译文件 (en.json, zh.json)
- [apps/website/middleware.ts](apps/website/middleware.ts) - 处理语言路由

**支持的语言**: en (默认), zh
- 默认语言 (en) 无 URL 前缀: `/games`
- 其他语言有前缀: `/zh/games`

**导航规则**:
- 始终从 `@/i18n/routing` 导入: `import { Link, useRouter, usePathname } from "@/i18n/routing"`
- 用户端页面**禁止**使用 Next.js 原生 `next/link`
- **禁止**手动构造带语言前缀的 URL
- 语言切换: `<Link href={pathname} locale="zh">中文</Link>`

**翻译回退系统**:
- `getTranslationWithFallback()` - 返回请求语言的翻译，回退到默认语言 (en)，然后是第一个可用的翻译
- `buildLocaleCondition()` - 构建 Prisma 查询以获取当前语言和回退语言
- 在整个应用中用于游戏标题、分类名称等
- 实现位置: [apps/website/lib/i18n-helpers.ts](apps/website/lib/i18n-helpers.ts) 和 [apps/admin/lib/i18n-helpers.ts](apps/admin/lib/i18n-helpers.ts)

### 双数据库架构

项目采用**双数据库分离**架构，提高安全性和性能：

| 数据库 | 环境变量 | 包 | 用途 |
|--------|----------|-----|------|
| 业务数据库 | `DATABASE_URL` | `@rungame/database` | 游戏、分类、标签、语言等业务数据（Admin + Website 共享） |
| 管理数据库 | `CACHE_DATABASE_URL` | `@rungame/database-admin` | 认证、AI 配置、缓存、SEO 提交等管理数据（仅 Admin） |

**业务数据库模型** (`packages/database/prisma/schema.prisma`):
- `Game` + `GameTranslation` - 游戏（每个语言的标题、描述、说明）
- `Category` + `CategoryTranslation` - 游戏分类（支持层级）
- `Tag` + `TagTranslation` - 游戏标签
- `Language` + `LanguageTranslation` - 系统语言
- `PageType` + `PageTypeTranslation` - 动态页面类型
- `SiteConfig` + `SiteConfigTranslation` - 网站配置
- `GameVote` - 用户投票记录
- `AITask` - AI 任务状态

**管理数据库模型** (`packages/database-admin/prisma/schema.prisma`):
- `User` / `Session` / `Account` / `Verification` - Better Auth 认证表
- `AiConfig` - AI 模型配置（provider、apiKey、modelConfig JSON）
- `ExternalApiConfig` - 外部 API 配置（Google Search、Jina Reader）
- `ImportPlatform` - 导入平台配置（GamePix、CrazyGames）
- `SearchEngineConfig` - 搜索引擎配置（Bing、Google、百度）
- `UrlSubmission` - URL 提交记录
- `SubmissionBatch` - 批量提交任务
- `GamePixGameCache` - GamePix 游戏缓存
- `SyncLog` - 同步日志
- `AiChatHistory` - AI 对话历史

**使用方法**:
```typescript
// 在 Admin 应用中导入
import { prisma, prismaAdmin } from "@/lib/prisma"

// 业务数据操作
const games = await prisma.game.findMany()

// 管理数据操作
const aiConfig = await prismaAdmin.aiConfig.findFirst({ where: { isActive: true } })
```

**重要索引**:
- 所有翻译表都有 `@@unique([entityId, locale])` 和 `@@index([locale])`
- 游戏索引: `slug`, `status`, `isFeatured`, `playCount`
- 分类和标签索引: `slug` 和 `isEnabled`

**数据填充**:
- 运行 `pnpm db:seed` 填充初始数据
- 创建超级管理员、25个游戏分类（中英文翻译）、30个示例游戏和所有标签
- 在 [packages/database/prisma/seed.ts](packages/database/prisma/seed.ts) 中设置 `RESET_DATABASE = true` 可清除并重建数据（危险操作！）

### 身份验证与授权

**Better Auth v1** 配置在 [apps/admin/lib/auth.ts](apps/admin/lib/auth.ts):

```typescript
import { betterAuth } from "better-auth"
import { prismaAdapter } from "better-auth/adapters/prisma"
import { prismaAdmin } from "@/lib/prisma"

export const auth = betterAuth({
  database: prismaAdapter(prismaAdmin, { provider: "postgresql" }),
  emailAndPassword: { enabled: true },
  secret: process.env.BETTER_AUTH_SECRET,
  user: {
    modelName: "User", // Maps to 'admins' table
    additionalFields: {
      role: { type: "string", defaultValue: "ADMIN" },
      isActive: { type: "boolean", defaultValue: true }
    }
  },
  session: {
    cookieCache: { enabled: true, maxAge: 5 * 60 } // 5分钟缓存
  }
})
```

**环境变量**:
```env
BETTER_AUTH_SECRET="openssl rand -base64 32"
BETTER_AUTH_URL="http://localhost:4000"
NEXT_PUBLIC_APP_URL="http://localhost:4000"
AUTH_TRUST_HOST=true
```

**API 端点** (`/api/auth/[...all]`):
- `POST /api/auth/sign-in/email` - 登录
- `POST /api/auth/sign-out` - 登出
- `GET /api/auth/session` - 获取会话

**会话检查**:
```typescript
import { auth } from "@/lib/auth"
import { headers } from "next/headers"

// Server Components / API Routes
const session = await auth.api.getSession({ headers: await headers() })
if (!session) redirect("/login")
```

**客户端使用** ([apps/admin/lib/auth-client.ts](apps/admin/lib/auth-client.ts)):
```typescript
import { createAuthClient } from "better-auth/react"

export const { signIn, signOut, useSession } = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL
})
```

**Dashboard 布局保护** ([apps/admin/app/(dashboard)/layout.tsx](apps/admin/app/(dashboard)/layout.tsx)):
- 所有 `(dashboard)` 路由组下的页面自动受认证保护
- 未认证用户重定向到 `/login`
- 使用 `force-dynamic` 避免构建时数据库查询

### PageType 系统

**三种 PageType 模式** (详见 [docs/PAGE-STRUCTURE.md](docs/PAGE-STRUCTURE.md)):

1. **GAME_LIST**: 根据配置筛选/排序的动态游戏列表
   - 示例: 最多游玩、热门、新游戏
   - 配置: `pageInfo.gameList` JSON
   - URL: `/{locale}/most-played`, `/{locale}/new-games`

2. **DISPLAY_PAGE**: 纯内容展示页面
   - 示例: 关于我们、隐私政策、条款
   - 配置: `pageInfo.displayPage` JSON

3. **OTHER_PAGE**: 其他自定义页面
   - 示例: 自定义功能页面
   - 配置: `pageInfo.otherPage` JSON

**关键字段**:
- `slug` - URL 标识符（如 "most-played"）
- `type` - GAME_LIST, DISPLAY_PAGE 或 OTHER_PAGE（枚举）
- `pageInfo` - JSON 页面配置

### 组件组织

**管理后台组件** ([apps/admin/components/](apps/admin/components/)):
- 使用 react-hook-form + zod 验证的复杂表单
- 多语言输入的语言标签（如 CategoryForm, GameForm）
- 用于变更的 Server Actions（如分类 actions、游戏 actions）
- 可重用的删除/切换状态按钮

**网站组件** ([apps/website/components/](apps/website/components/)):
- GameCard, GameSection - 显示游戏列表
- GameEmbed - 嵌入游戏的 iframe 包装器
- Header, Sidebar, Footer - 网站框架，带语言切换

**UI 组件** (各应用的 [components/ui/](apps/admin/components/ui/)):
- shadcn/ui 基础组件（button, input, card, dialog 等）
- 符合 shadcn 约定（cn 工具函数，cva 用于变体）
- 每个应用独立维护自己的 UI 组件

### 样式

**TailwindCSS 4** 带自定义动画:
- 各应用独立的 Tailwind 配置（根目录有共享配置）
- 使用各应用 `@/lib/utils` 中的 `cn()` 进行类合并
- 管理后台强制浅色模式: `className="light"` + `style={{ colorScheme: 'light' }}`
- 用户网站支持 `next-themes` 的深色模式

## 重要模式

### Server Actions 与数据验证

**重要规范：所有涉及数据库的增、改操作都必须使用 zod 进行数据验证**

管理后台变更使用 Server Actions，并遵循以下模式：

```typescript
"use server"
import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

// 1. 定义 zod 验证 Schema
const categorySchema = z.object({
  slug: z.string().min(1, "标识符不能为空").regex(/^[a-z0-9-]+$/, "标识符只能包含小写字母、数字和连字符"),
  name: z.string().min(1, "名称不能为空"),
  description: z.string().optional(),
  sortOrder: z.number().int().min(0, "排序值不能为负数").default(0),
  translations: z.array(
    z.object({
      locale: z.enum(["en", "zh"]),
      name: z.string().min(1, "名称不能为空"),
      description: z.string().optional(),
    })
  ).default([])
})

// 2. 导出类型
export type CategoryFormData = z.infer<typeof categorySchema>

// 3. Server Action 中进行验证
export async function createCategory(data: CategoryFormData) {
  try {
    // 验证数据（如果数据不符合 schema 会抛出错误）
    const validated = categorySchema.parse(data)

    // 执行数据库操作
    const category = await prisma.category.create({
      data: {
        slug: validated.slug,
        name: validated.name,
        description: validated.description || null,
        sortOrder: validated.sortOrder,
        translations: {
          create: validated.translations
        }
      }
    })

    // 重新验证缓存
    revalidatePath("/categories")
    revalidatePath("/[locale]", "layout")

    return { success: true, data: category }
  } catch (error) {
    if (error instanceof z.ZodError) {
      // 返回验证错误
      return {
        success: false,
        error: error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ')
      }
    }
    return { success: false, error: "操作失败" }
  }
}
```

**验证规范**:
- 必须为所有增、改操作定义 zod schema
- 使用 `schema.parse()` 在数据库操作前验证数据
- 处理 `ZodError` 并返回清晰的错误消息
- 字符串字段使用 `.trim()` 清理空白字符
- 可选字段使用 `.optional()` 标记
- 数字字段使用 `.int()`, `.min()`, `.max()` 等约束
- 使用 `z.infer<typeof schema>` 导出类型供前端使用

### 翻译查询

始终获取当前语言和回退语言：

```typescript
import { prisma } from "@/lib/prisma"
import { buildLocaleCondition, getTranslationWithFallback } from "@/lib/i18n-helpers"

const game = await prisma.game.findUnique({
  where: { slug },
  include: {
    translations: {
      where: buildLocaleCondition(locale), // 获取当前语言 + en 回退
    },
  },
})

const translation = getTranslationWithFallback(game.translations, locale)
const title = translation?.title || game.title // 回退到主表英文
```

**重要**: 在 Monorepo 中，所有数据库操作必须从 `@/lib/prisma` 导入，该文件代理到对应的包。

### 多语言表单

管理后台表单使用动态语言标签：

```typescript
const [activeLocale, setActiveLocale] = useState("en")
const locales = ["en", "zh", "es", "fr"]

return (
  <Tabs value={activeLocale} onValueChange={setActiveLocale}>
    <TabsList>
      {locales.map(locale => (
        <TabsTrigger key={locale} value={locale}>
          {locale.toUpperCase()}
        </TabsTrigger>
      ))}
    </TabsList>
    {locales.map(locale => (
      <TabsContent key={locale} value={locale}>
        <Input {...register(`translations.${locale}.title`)} />
      </TabsContent>
    ))}
  </Tabs>
)
```

## Monorepo 工作流

### Turborepo 任务依赖

[turbo.json](turbo.json) 定义了任务执行顺序:
- `build` 任务依赖于依赖包的 build 和 db:generate
- `dev` 任务依赖于 db:generate
- `db:generate` 输出到 `packages/database/generated/**` 和 `packages/database-admin/generated/**`
- `dev`、`db:*` 任务不使用缓存，每次都执行

### 共享数据库包

**@rungame/database** 和 **@rungame/database-admin** 包的使用:

```typescript
// packages/database/src/client.ts - 业务数据库
import { PrismaClient } from "../generated/client"
export const prisma = new PrismaClient()

// packages/database-admin/src/client.ts - 管理数据库
import { PrismaClient } from "../generated/client"
export const prismaAdmin = new PrismaClient()

// apps/admin/lib/prisma.ts - 代理导出
export { prisma } from "@rungame/database"
export { prismaAdmin } from "@rungame/database-admin"
```

**重要**: 修改 Prisma schema 后需要:
1. `pnpm db:generate` - 重新生成两个 Prisma 客户端
2. 重启开发服务器

### Prisma 7 驱动适配器

项目使用 Prisma 7 的 `@prisma/adapter-pg` 驱动适配器：

```typescript
import { Pool } from "pg"
import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient } from "../generated/client"

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 10,
  idleTimeoutMillis: 30000
})

const adapter = new PrismaPg(pool)
export const prisma = new PrismaClient({ adapter })
```

### 添加新依赖

```bash
# 为特定应用添加依赖
pnpm add <package> --filter @rungame/admin
pnpm add <package> --filter @rungame/website
pnpm add <package> --filter @rungame/database

# 为根 workspace 添加依赖 (如 turbo, 共享开发工具)
pnpm add <package> -w
```

### 开发最佳实践

1. **并行开发**: 使用 `pnpm dev` 同时运行两个应用
2. **独立开发**: 使用 `pnpm dev:admin` 或 `pnpm dev:website` 单独开发某个应用
3. **数据库修改**:
   - 业务模型修改 `packages/database/prisma/schema.prisma`
   - 管理模型修改 `packages/database-admin/prisma/schema.prisma`
4. **共享代码**: 考虑在 `packages/` 下创建新的共享包

## 配置说明

- **Monorepo 管理**: Turborepo + pnpm workspaces
- **路径别名**: 每个应用中 `@/*` 映射到各自的根目录（见各应用的 [tsconfig.json](apps/admin/tsconfig.json)）
- **共享数据库**: `@rungame/database` 和 `@rungame/database-admin` 包
- **图片域名**: 在各应用的 [next.config.ts](apps/admin/next.config.ts) 中配置游戏缩略图
- **Turbopack**: 所有应用构建和开发使用 `--turbopack` 标志
- **端口分配**:
  - Website: 3000 (默认)
  - Admin: 4000
- **数据库**: 双库分离架构
  - 业务数据库: `DATABASE_URL` (共享，Admin + Website)
  - 管理数据库: `CACHE_DATABASE_URL` (仅 Admin)
  - 外部托管（生产环境推荐使用云数据库服务）

## 环境变量配置

### Admin 应用 (.env)

```env
# 数据库
DATABASE_URL="postgresql://user:password@host:port/db_name?schema=public"
CACHE_DATABASE_URL="postgresql://user:password@host:port/db_name_admin?schema=public"

# Better Auth 认证
BETTER_AUTH_SECRET="openssl rand -base64 32"
BETTER_AUTH_URL="http://localhost:4000"
NEXT_PUBLIC_APP_URL="http://localhost:4000"
AUTH_TRUST_HOST=true

# 加密密钥（用于 API Key 加密）
ENCRYPTION_KEY="openssl rand -base64 48"

# Cloudflare R2 存储
R2_ACCOUNT_ID=""
R2_ACCESS_KEY_ID=""
R2_SECRET_ACCESS_KEY=""
R2_BUCKET_NAME=""
R2_PUBLIC_URL=""

# Google 搜索 API
GOOGLE_SEARCH_API_KEY=""
GOOGLE_SEARCH_ENGINE_ID=""

# Jina Reader API
JINA_API_KEY=""
```

### Website 应用 (.env)

```env
# 数据库
DATABASE_URL="postgresql://user:password@host:port/db_name?schema=public"

# 网站 URL
NEXT_PUBLIC_SITE_URL="https://rungame.online"

# 分析和广告
NEXT_PUBLIC_GA_ID=""
NEXT_PUBLIC_ADSENSE_ID=""
```

## 关键约束

1. **禁止直接修改翻译** - 始终通过翻译表操作
2. **管理后台路由仅英文** - Admin 应用无国际化
3. **Website 路由必须使用 next-intl 导航** - 从 `@/i18n/routing` 导入，而非 `next/navigation`
4. **PageType slug 是 URL slug** - 必须是 URL 安全且唯一的
5. **游戏 embedUrl 必须是 HTTPS** - iframe 的安全要求
6. **Language.code 必须匹配 next-intl locales** - 同步 [apps/website/i18n/routing.ts](apps/website/i18n/routing.ts) 和 Language 表
7. **业务数据库修改必须在 packages/database** - 不要在各应用中单独配置 Prisma
8. **管理数据库修改必须在 packages/database-admin** - 认证、AI 配置等管理数据
9. **使用正确的 Prisma 实例** - 业务数据用 `prisma`，管理数据用 `prismaAdmin`

## 常见任务

**添加新语言**:
1. 添加到 [apps/website/i18n/routing.ts](apps/website/i18n/routing.ts) 的 `locales` 数组
2. 创建 [apps/website/i18n/messages/{locale}.json](apps/website/i18n/messages/)
3. 运行 seed 或手动插入到 Language 表
4. 为所有分类、标签和游戏添加翻译

**创建新 PageType**:
1. 管理后台 → 页面类型 → 创建
2. 选择类型（GAME_LIST, DISPLAY_PAGE 或 OTHER_PAGE）
3. 如适用，配置 pageInfo JSON
4. 为所有启用的语言添加翻译

**添加游戏**:
1. 确保分类存在
2. 管理后台 → 游戏 → 创建
3. 填写 slug、embedUrl、缩略图、尺寸
4. 为所有语言添加翻译
5. 分配分类和标签
6. 切换 `status` 为 PUBLISHED 以在网站上显示

**配置 AI 功能**:
1. 管理后台 → AI 配置 → 添加提供商
2. 配置 API Key、Base URL 和模型
3. 设置默认激活的配置
4. 在 External APIs 中配置 Jina Reader 等辅助服务

## 数据库连接最佳实践

**使用连接池**（必需）：

```env
# 开发环境
DATABASE_URL="postgresql://game:password@localhost:5432/game?schema=public&connection_limit=5&pool_timeout=10"

# 生产环境（使用 PgBouncer）
DATABASE_URL="postgresql://game:password@host:6432/game?schema=public&pgbouncer=true&connection_limit=10&pool_timeout=20"
```

**连接池大小计算**：
```
总连接数 = 应用实例数 × connection_limit
```

更多详情见 [docs/DATABASE.md](docs/DATABASE.md)

## 文件引用格式

在 Monorepo 中引用代码位置时，包含应用路径：

- Admin 文件: [admin/app/page.tsx](apps/admin/app/page.tsx)
- Website 文件: [website/app/[locale]/page.tsx](apps/website/app/[locale]/page.tsx)
- Database 文件: [database/prisma/schema.prisma](packages/database/prisma/schema.prisma)
- Database-Admin 文件: [database-admin/prisma/schema.prisma](packages/database-admin/prisma/schema.prisma)
- 特定行: [admin/lib/auth.ts:42](apps/admin/lib/auth.ts#L42)
- 行范围: [website/lib/utils.ts:10-20](apps/website/lib/utils.ts#L10-L20)

示例：
- 管理后台认证配置在 [apps/admin/lib/auth.ts](apps/admin/lib/auth.ts)
- 认证客户端在 [apps/admin/lib/auth-client.ts](apps/admin/lib/auth-client.ts)
- 网站国际化路由在 [apps/website/i18n/routing.ts](apps/website/i18n/routing.ts)
- 业务数据库模型在 [packages/database/prisma/schema.prisma](packages/database/prisma/schema.prisma)
- 管理数据库模型在 [packages/database-admin/prisma/schema.prisma](packages/database-admin/prisma/schema.prisma)
- 翻译辅助函数在 [apps/website/lib/i18n-helpers.ts](apps/website/lib/i18n-helpers.ts)

## 相关文档

### 核心架构（4 个）
- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) - 项目架构和技术栈详解
- [docs/DATABASE.md](docs/DATABASE.md) - 数据库架构、双库分离、查询优化
- [docs/I18N.md](docs/I18N.md) - next-intl 多语言实现指南
- [docs/PAGE-STRUCTURE.md](docs/PAGE-STRUCTURE.md) - PageType 动态页面系统

### 部署指南（2 个）
- [docs/1PANEL-DEPLOYMENT.md](docs/1PANEL-DEPLOYMENT.md) - 1Panel 面板部署指南（推荐）
- [docs/GITHUB-SECRETS-SETUP.md](docs/GITHUB-SECRETS-SETUP.md) - GitHub Actions 环境变量配置

### 功能模块（3 个）
- [docs/AI-FEATURES.md](docs/AI-FEATURES.md) - AI 功能完整实现指南
- [docs/GAMEPIX-IMPORT.md](docs/GAMEPIX-IMPORT.md) - GamePix 游戏导入指南
- [docs/SEO.md](docs/SEO.md) - 搜索引擎优化完整指南

### 扩展功能（1 个）
- [docs/R2-CDN-SETUP.md](docs/R2-CDN-SETUP.md) - R2 CDN 配置和迁移指南

### 工具脚本
- [scripts/README.md](scripts/README.md) - 维护脚本使用指南
- scripts/utils/ - 工具脚本（查询、检查、导入等）
- scripts/validation/ - 验证脚本（数据完整性检查）
- scripts/seo/ - SEO 相关脚本
- scripts/assets/ - 资源生成脚本（图标、Logo等）

---
## 强制性限制
- 所有的内容回复使用中文进行回复
- 对于UI组件的使用，必须遵循官方的最实践，UI组件的官方文档利用shadcn MCP服务进行获取
- 对于涉及的框架、css框架、框架插件的使用和代码书写必须遵循官方的最佳实践指导，相关的官方技术文档使用Context7mcp工具进行获取
- 对于页面功能的调试、测试必须优先使用browsermcp进行，如果该工具未连接，提示用户进行mcp工具连接后，再进行功能调试、测试工作
- 在修改完功能且测试通过之后提交到git，但是不进行远程推送，只有当用户明确说明推送到远程的时候才进行推送操作
- 在测试时，不要随意启动开服务器，一般在项目开始时我会启在终端中启动开发服务器，如需使用直接调用终端的开发服务器，如果开发服务器没有启动，提示用户启动开发服务器，启动后告知到你，你继续执行工作

**最后更新**: 2026-01-12
**项目版本**: v2.0 (Monorepo + Better Auth + 双数据库)

---

## 更新日志

### 2026-01-12
- **重大更新**: 认证系统从 NextAuth.js v5 迁移到 Better Auth v1
- 新增双数据库架构：`@rungame/database` + `@rungame/database-admin`
- 路由结构从 `(admin)` 迁移到 `(dashboard)` 路由组
- Prisma 升级到 7.2.0，使用 `@prisma/adapter-pg` 驱动适配器
- 包管理器从 npm 迁移到 pnpm
- Next.js 升级到 16.1.1
- 新增管理功能：AI Config、External APIs、SEO Submissions
- 新增 `docker-compose.db.yml` 用于本地数据库开发
- 更新所有环境变量配置文档

### 2025-11-15
- 完整重写文档以反映 Monorepo 架构
- 迁移到 Turborepo + npm workspaces 结构
- 更新所有开发命令以支持 monorepo
- 重组项目结构：apps/admin (4000), apps/website (3000), packages/database
- 添加 Monorepo 工作流章节
- 更新所有文件路径引用以包含应用路径
- 优化配置说明，明确端口分配和共享包使用

### 2025-11-01
- 第三轮项目清理：删除 34 个临时分析文档
- 文档清理：保留 14 个核心和扩展文档
- 脚本清理：保留 16 个有用的工具脚本
