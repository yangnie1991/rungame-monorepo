# Monorepo 分离方案（待确认）

> **状态**: 🔄 分析阶段 - 等待用户确认
> **创建时间**: 2025-11-14
> **最后更新**: 2025-11-14

## 🎯 目标

将现有的 Next.js 项目重构为 Monorepo 架构，实现：
1. **Admin 管理后台**和**Website 用户网站**完全分离
2. 最小化共享代码（只共享真正需要的）
3. 支持独立部署和独立开发
4. 使用 pnpm workspace + Turborepo 管理

## 📊 代码分析结果

### 当前项目结构分析

```
rungame-nextjs/
├── app/
│   ├── (admin)/          # 管理后台路由
│   ├── (site)/           # 用户网站路由（带 [locale] 国际化）
│   ├── api/              # API 路由
│   │   ├── auth/         # NextAuth（只 admin）
│   │   ├── admin/        # 管理 API（只 admin）
│   │   ├── ai/           # AI API（只 admin）
│   │   ├── gamepix/      # GamePix 导入（只 admin）
│   │   └── og/           # OG 图片生成（❓ 待确认）
│   └── (auth)/admin/login # 登录页面
│
├── components/
│   ├── ui/               # ✅ 共享：shadcn/ui（31个组件）
│   ├── admin/            # ❌ Admin only
│   ├── site/             # ❌ Website only
│   ├── theme/            # ❓ 待确认
│   └── analytics/        # ❓ 待确认
│
├── lib/
│   ├── 🟢 共享文件（两端都使用）:
│   │   ├── utils.ts              # cn() 工具
│   │   ├── prisma.ts / db.ts     # 数据库客户端
│   │   ├── i18n-helpers.ts       # 翻译辅助
│   │   ├── data/                 # 数据查询函数
│   │   ├── cache-helpers.ts      # 缓存辅助
│   │   ├── seo-helpers.ts        # SEO 辅助
│   │   └── og-image-helpers.ts   # OG 图片辅助
│   │
│   ├── 🔴 Admin only:
│   │   ├── auth.ts               # NextAuth 配置
│   │   ├── ai-*.ts               # 所有 AI 功能（8个文件）
│   │   ├── crypto.ts             # 加密（API key）
│   │   ├── gamepix-*.ts          # GamePix 导入
│   │   ├── r2-upload.ts          # R2 上传
│   │   ├── google-search.ts      # Google 搜索 API
│   │   ├── seo-submissions/      # SEO 提交
│   │   ├── site-config.ts        # 网站配置管理
│   │   └── schema-generators.ts  # Schema 生成
│   │
│   └── 🔵 Website only:
│       ├── recommendation-engine.ts # 推荐引擎
│       └── static-files.ts          # 静态文件处理
│
├── i18n/                 # ❌ Website only（国际化）
│   ├── messages/         # 翻译文件
│   ├── routing.ts        # 路由配置
│   └── config.ts         # i18n 配置
│
├── hooks/
│   └── useEnabledLanguages.ts  # ✅ 共享
│
├── types/
│   ├── ai-config.ts      # ❌ Admin only
│   └── next-auth.d.ts    # ❌ Admin only
│
├── prisma/               # ✅ 共享（数据库 schema）
├── public/               # ❓ 待确认（资源文件）
└── scripts/              # ❓ 待确认（维护脚本）
```

## 🤔 待确认问题

### 问题 1：Theme 组件归属
`components/theme/` 主题切换器：
- 管理后台：强制浅色模式
- 用户网站：支持深色/浅色切换

**选项**：
- [ ] A. 只放在 Website（推荐）
- [ ] B. 共享但管理后台不使用
- [ ] C. 其他方案

**您的决定**：_____________

---

### 问题 2：Analytics 组件归属
`components/analytics/` 分析组件：

**问题**：分析组件用于哪里？
- [ ] A. 只用户网站（追踪用户行为）
- [ ] B. 两端都使用（不同分析目的）

**您的决定**：_____________

---

### 问题 3：OG 图片生成 API
`app/api/og/` 目前用于生成 Open Graph 图片。

**问题**：
- [ ] A. 只在管理后台使用（管理员生成后存储）
- [ ] B. 两端都使用（动态生成）
- [ ] C. 只在 Website 使用

**您的决定**：_____________

---

### 问题 4：Lib/Data 目录放置
`lib/data/` 包含所有数据查询函数，目前两端都在使用。

**问题**：这些函数应该：
- [ ] A. 放在 `packages/database/` 作为数据访问层（推荐）
- [ ] B. 保持在各自的 app 中，只共享 Prisma client
- [ ] C. 其他方案

**您的决定**：_____________

---

### 问题 5：Public 资源目录
`public/` 包含所有静态资源（图标、Logo、资源文件）。

**问题**：
- [ ] A. 完全分离（各自维护自己的资源）
- [ ] B. 部分共享（共同的 Logo、图标）
- [ ] C. 完全共享（所有资源）

**您的决定**：_____________

---

### 问题 6：Scripts 维护脚本
`scripts/` 包含维护脚本（数据库、SEO、导入等）。

**问题**：
- [ ] A. 只放在根目录，供两个 app 共同使用
- [ ] B. 分离到各自的 app（admin 的脚本、website 的脚本）
- [ ] C. 放在 packages/database/ 作为数据库工具

**您的决定**：_____________

---

## 📐 提议的 Monorepo 结构

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
│   │   │   │   ├── gamepix/        # GamePix 导入
│   │   │   │   └── og/             # [根据问题3决定]
│   │   │   └── login/              # 登录页面
│   │   │
│   │   ├── components/
│   │   │   └── admin/              # 管理后台组件
│   │   │
│   │   ├── lib/
│   │   │   ├── auth.ts             # NextAuth 配置
│   │   │   ├── ai-*.ts             # AI 功能
│   │   │   ├── crypto.ts           # 加密
│   │   │   ├── gamepix-*.ts        # GamePix 导入
│   │   │   ├── r2-upload.ts        # R2 上传
│   │   │   ├── google-search.ts    # Google API
│   │   │   ├── seo-submissions/    # SEO 提交
│   │   │   ├── site-config.ts      # 网站配置
│   │   │   └── schema-generators.ts
│   │   │
│   │   ├── types/
│   │   │   ├── ai-config.ts
│   │   │   └── next-auth.d.ts
│   │   │
│   │   ├── middleware.ts           # 只认证检查
│   │   ├── package.json
│   │   ├── next.config.ts
│   │   ├── tsconfig.json
│   │   └── .env.example
│   │
│   └── website/                    # 🔵 用户网站应用
│       ├── app/
│       │   └── [locale]/           # 国际化路由
│       │       ├── page.tsx        # 首页
│       │       ├── games/          # 游戏列表
│       │       ├── play/[slug]/    # 游戏详情
│       │       ├── category/       # 分类页面
│       │       ├── tag/            # 标签页面
│       │       ├── search/         # 搜索
│       │       ├── about/          # 关于
│       │       ├── contact/        # 联系
│       │       ├── privacy/        # 隐私政策
│       │       └── terms/          # 服务条款
│       │
│       ├── components/
│       │   ├── site/               # 网站组件
│       │   └── [theme/]            # [根据问题1决定]
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
│       │   └── [共享的 hooks 可能移到 packages/]
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
│   │   │   ├── data/               # [根据问题4：可能包含 lib/data/]
│   │   │   │   ├── games/
│   │   │   │   ├── categories/
│   │   │   │   ├── tags/
│   │   │   │   ├── languages/
│   │   │   │   └── page-types/
│   │   │   ├── helpers/
│   │   │   │   ├── i18n-helpers.ts
│   │   │   │   ├── cache-helpers.ts
│   │   │   │   └── seo-helpers.ts
│   │   │   └── types.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── ui/                         # 🟢 共享 UI 组件包
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── ui/             # shadcn/ui 组件（31个）
│   │   │   │   │   ├── button.tsx
│   │   │   │   │   ├── input.tsx
│   │   │   │   │   ├── card.tsx
│   │   │   │   │   └── ...
│   │   │   │   └── index.ts        # 统一导出
│   │   │   ├── lib/
│   │   │   │   └── utils.ts        # cn() 工具
│   │   │   └── index.ts
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── tailwind.config.ts      # UI 组件的 Tailwind 配置
│   │
│   └── tsconfig/                   # 🟢 共享 TypeScript 配置
│       ├── base.json               # 基础配置
│       ├── nextjs.json             # Next.js 配置
│       ├── react-library.json      # React 库配置
│       └── package.json
│
├── scripts/                        # [根据问题6决定位置]
│   └── ...
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

## 📦 Package.json 依赖分配

### packages/database/package.json
```json
{
  "name": "@rungame/database",
  "version": "0.0.0",
  "private": true,
  "main": "./src/index.ts",
  "types": "./src/index.ts",
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
  "dependencies": {
    "@radix-ui/react-*": "^xxx",
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
    "bcryptjs": "^3.0.2",
    "googleapis": "^166.0.0",
    "@tiptap/react": "^3.7.2",
    "@tiptap/starter-kit": "^3.7.2"
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

## 🔧 配置文件

### 根目录 pnpm-workspace.yaml
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

## 🚀 迁移步骤（待确认后执行）

### 阶段 1：创建 Monorepo 骨架
1. 创建新目录结构
2. 配置 pnpm workspace
3. 配置 Turborepo
4. 创建共享 packages

### 阶段 2：迁移共享代码
1. 迁移 Prisma schema 到 packages/database/
2. 迁移 shadcn/ui 组件到 packages/ui/
3. 迁移 lib/data/ 到 packages/database/（如果问题4选A）
4. 迁移共享工具函数

### 阶段 3：分离 Admin 应用
1. 迁移 app/(admin)/ 路由
2. 迁移 components/admin/
3. 迁移 admin 专用的 lib/ 文件
4. 配置 admin 的 package.json 和 next.config.ts
5. 配置 admin 的 middleware.ts（只认证）

### 阶段 4：分离 Website 应用
1. 迁移 app/(site)/ 路由
2. 迁移 components/site/
3. 迁移 i18n/ 配置
4. 迁移 website 专用的 lib/ 文件
5. 配置 website 的 package.json 和 next.config.ts
6. 配置 website 的 middleware.ts（只 next-intl）

### 阶段 5：测试和验证
1. 测试 database package 导入
2. 测试 ui package 导入
3. 测试 admin 应用启动和功能
4. 测试 website 应用启动和功能
5. 测试构建流程

### 阶段 6：部署配置
1. 配置 Vercel 部署（website）
2. 配置 VPS 部署（admin）
3. 更新 CI/CD 配置
4. 测试生产构建

## ⚠️ 风险和注意事项

### 1. 路径别名变化
- 现在：`@/lib/utils`
- Monorepo：`@rungame/ui` 或 `@rungame/database`
- **影响**：需要更新所有导入语句

### 2. 环境变量分离
- Admin 需要：数据库、AI API keys、R2、Google API
- Website 需要：数据库（只读）、Analytics
- **注意**：两个 .env 文件独立管理

### 3. 构建时间
- Turborepo 会缓存构建结果
- 首次构建较慢，后续增量构建很快
- **优化**：配置 Vercel Remote Cache

### 4. 依赖管理
- pnpm workspace 会提升共同依赖
- 版本冲突需要手动解决
- **建议**：保持依赖版本一致

### 5. 类型系统
- packages 需要正确配置 TypeScript
- 路径映射需要在各个 tsconfig.json 中配置
- **测试**：确保类型推导正常工作

## 📝 待办清单

在开始迁移之前，请完成：

- [ ] 回答上述 6 个确认问题
- [ ] 备份当前代码（git tag 或分支）
- [ ] 确认部署环境配置
- [ ] 准备测试计划
- [ ] 团队成员了解 Monorepo 结构

## 📚 参考资源

- [Turborepo 文档](https://turbo.build/repo/docs)
- [pnpm Workspace 文档](https://pnpm.io/workspaces)
- [Next.js Monorepo 最佳实践](https://nextjs.org/docs/advanced-features/multi-zones)
- [Vercel Monorepo 部署](https://vercel.com/docs/monorepos)

---

**下一步**：请回答上述 6 个问题，确认方案后我们开始执行分离操作。
