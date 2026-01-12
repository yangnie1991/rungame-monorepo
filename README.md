# RunGame - 多语言在线游戏平台

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16-black)
![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Prisma](https://img.shields.io/badge/Prisma-7-2D3748)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4-38bdf8)
![Better Auth](https://img.shields.io/badge/Better_Auth-1.4-green)

</div>

RunGame 是一个现代化的多语言在线游戏平台，提供游戏门户网站和完整的内容管理系统。

## ✨ 核心功能

### 用户端
- 🌍 **多语言支持** - 支持英文、中文、西班牙语、法语等多种语言
- 🎮 **游戏浏览** - 按分类、标签浏览数千款在线游戏
- 🔍 **智能搜索** - 快速找到你喜欢的游戏
- 📱 **响应式设计** - 完美支持桌面和移动设备
- 🎨 **深色模式** - 支持深色/浅色主题切换
- ⚡ **即时游玩** - 无需下载，即开即玩

### 管理后台
- 🎯 **游戏管理** - 完整的游戏 CRUD 操作
- 📂 **分类管理** - 灵活的分类系统
- 🏷️ **标签管理** - 多维度标签体系
- 🌐 **语言管理** - 动态管理支持的语言
- 📄 **页面类型** - 动态页面配置系统
- 🔐 **安全认证** - 基于角色的访问控制

## 🚀 快速开始

### 环境要求

- **Node.js** 20.x 或更高版本
- **PostgreSQL** 14+ 数据库
- **npm** 或其他包管理器

### 安装步骤

1. **克隆仓库**

```bash
git clone https://github.com/yourusername/rungame-nextjs.git
cd rungame-nextjs
```

2. **安装依赖**

```bash
pnpm install
```

3. **配置环境变量**

复制示例环境变量文件：

```bash
cp apps/admin/.env.example apps/admin/.env.local
cp apps/website/.env.example apps/website/.env.local
```

主要环境变量：

```env
# 数据库连接（业务数据库）
DATABASE_URL="postgresql://user:password@host:port/db_name?schema=public"

# 管理数据库（Admin 专用）
CACHE_DATABASE_URL="postgresql://user:password@host:port/db_admin?schema=public"

# Better Auth 配置
BETTER_AUTH_SECRET="your-random-secret-key-min-32-chars"
BETTER_AUTH_URL="http://localhost:4000"
NEXT_PUBLIC_APP_URL="http://localhost:4000"
```

生成 `BETTER_AUTH_SECRET`:
```bash
openssl rand -base64 32
```

> 📝 详细配置请参考 [架构文档](docs/ARCHITECTURE.md) 和 [CLAUDE.md](CLAUDE.md)

4. **初始化数据库**

启动本地数据库：
```bash
make start-db
```

初始化schema：
```bash
# 推送数据库架构
pnpm db:push

# 填充初始数据
pnpm db:seed
```

5. **启动开发服务器**

```bash
# 同时启动管理端和网站端
pnpm dev

# 或分别启动
pnpm dev:admin    # 管理端: http://localhost:4000
pnpm dev:website  # 网站端: http://localhost:3000
```

访问应用：
- **网站端**: http://localhost:3000
- **管理后台**: http://localhost:4000/login

### 管理后台登录

- **URL**: http://localhost:4000/login
- **邮箱**: admin@rungame.online
- **密码**: admin123

> ⚠️ **重要**: 部署到生产环境后，请立即修改默认密码！

## 📖 文档

### 📚 完整文档目录
请查看 **[docs/README.md](docs/README.md)** 获取完整的文档导航和索引。

### 核心文档
- [**CLAUDE.md**](CLAUDE.md) - 开发者指南（给 AI 助手的完整架构文档）
- [**架构文档**](docs/ARCHITECTURE.md) - 项目架构和技术栈详解
- [**数据库文档**](docs/DATABASE.md) - 数据库架构和查询模式
- [**国际化文档**](docs/I18N.md) - next-intl 多语言实现
- [**页面结构文档**](docs/PAGE-STRUCTURE.md) - PageType 动态页面系统
- [**SEO 文档**](docs/SEO.md) - 搜索引擎优化完整指南

### 工具脚本
项目包含丰富的维护脚本，详见 **[scripts/README.md](scripts/README.md)**

### 清理记录
- [**清理总结**](CLEANUP-SUMMARY.md) - 2025-01-20 项目清理详细记录

## 🛠️ 技术栈

### 前端
- **框架**: Next.js 15 (App Router)
- **UI 库**: React 19
- **语言**: TypeScript 5
- **样式**: TailwindCSS 4, shadcn/ui
- **国际化**: next-intl
- **表单**: react-hook-form + zod
- **主题**: next-themes

### 后端
- **数据库**: PostgreSQL (双数据库架构)
- **ORM**: Prisma 7 + Driver Adapter
- **认证**: Better Auth v1
- **密码加密**: bcryptjs

### 开发工具
- **Monorepo**: Turborepo
- **构建工具**: Turbopack
- **代码规范**: ESLint
- **包管理器**: pnpm

## 📁 项目结构

```
rungame-monorepo/
├── apps/
│   ├── admin/                 # 管理后台 (端口 4000)
│   │   ├── app/
│   │   │   ├── (dashboard)/   # 管理面板路由组
│   │   │   ├── api/           # API 路由
│   │   │   └── login/         # 登录页面
│   │   ├── components/        # 管理后台组件
│   │   └── lib/               # 工具函数
│   │
│   └── website/               # 用户端网站 (端口 3000)
│       ├── app/[locale]/      # 完全国际化路由
│       ├── components/        # 网站组件
│       └── i18n/              # 国际化配置
│
├── packages/
│   ├── database/              # 业务数据库 (共享)
│   │   └── prisma/schema.prisma
│   ├── database-admin/        # 管理数据库 (Admin 专用)
│   │   └── prisma/schema.prisma
│   ├── typescript-config/     # 共享 TS 配置
│   └── tailwind-config/       # 共享 Tailwind 配置
│
├── docs/                      # 项目文档
├── scripts/                   # 维护脚本
├── turbo.json                 # Turborepo 配置
└── README.md                  # 本文件
```

## 🎯 核心概念

### 双界面架构

RunGame 使用 Next.js 路由组实现完全独立的双界面：

1. **用户端** (`/` 路由)
   - 完全国际化
   - 支持 4 种语言
   - SEO 优化
   - 响应式设计

2. **管理后台** (`/admin` 路由)
   - 仅英文
   - 需要认证
   - 基于角色的访问控制
   - 完整的内容管理功能

### 翻译系统

采用主表 + 翻译表的分离架构：

- **主表**: 存储不可翻译的数据（ID、slug、配置等）
- **翻译表**: 存储多语言内容（名称、描述、元数据等）
- **智能回退**: 自动回退到默认语言（英文）

### PageType 系统

强大的动态页面配置系统，支持三种模式：

1. **GAME_LIST** - 动态游戏列表（如"最受欢迎"、"新游戏"）
2. **STATIC_CONTENT** - 静态内容页（如"关于我们"、"隐私政策"）
3. **MIXED** - 混合模式（静态内容 + 游戏列表）

详见 [页面结构文档](docs/PAGE-STRUCTURE.md)

## 🔧 常用命令

```bash
# 开发
pnpm dev                 # 同时启动 Admin (4000) 和 Website (3000)
pnpm dev:admin           # 仅启动管理后台
pnpm dev:website         # 仅启动用户端网站

# 数据库
pnpm db:push             # 推送 schema 到数据库
pnpm db:seed             # 填充初始数据
pnpm db:generate         # 生成 Prisma 客户端

# 生产
pnpm build               # 构建所有应用
pnpm start               # 启动生产服务器

# 代码质量
pnpm lint                # 运行 ESLint
```

## 🚢 部署

### Vercel（推荐）

1. 连接 GitHub 仓库到 Vercel
2. 配置环境变量
3. 点击 Deploy

详细步骤见 [架构文档](docs/ARCHITECTURE.md) 中的部署章节

### Docker

```bash
# 构建镜像
docker build -t rungame:latest .

# 运行容器
docker run -d -p 3000:3000 \
  -e DATABASE_URL="..." \
  -e BETTER_AUTH_SECRET="..." \
  -e BETTER_AUTH_URL="..." \
  rungame:latest
```

详细配置见 [架构文档](docs/ARCHITECTURE.md)

### 传统服务器

使用 PM2 + Nginx，详见 [架构文档](docs/ARCHITECTURE.md)

## 🔐 安全

- ✅ Better Auth v1 认证
- ✅ 基于角色的访问控制（RBAC）
- ✅ bcrypt 密码加密
- ✅ HTTPS 强制（生产环境）
- ✅ CSRF 保护
- ✅ SQL 注入防护（Prisma）

## 🌍 国际化

当前支持的语言：

- 🇬🇧 English (默认)
- 🇨🇳 简体中文
- 🇪🇸 Español
- 🇫🇷 Français

添加新语言：

1. 更新 `i18n/routing.ts`
2. 创建翻译文件 `i18n/messages/{locale}.json`
3. 在 Language 表中添加记录
4. 为内容添加翻译

详见 [国际化文档](docs/I18N.md)

## 📊 性能

- ⚡ Turbopack 极速构建
- 🚀 Next.js App Router（RSC）
- 💾 智能数据缓存
- 🖼️ 自动图片优化
- 📦 代码分割
- 🌐 CDN 友好

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

### 开发流程

1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交 Pull Request

### 代码规范

- 使用 TypeScript
- 遵循 ESLint 规则
- 编写有意义的提交信息
- 添加必要的注释和文档

## 📝 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件

## 🙏 致谢

- [Next.js](https://nextjs.org/) - React 框架
- [Prisma](https://www.prisma.io/) - 数据库 ORM
- [Better Auth](https://www.better-auth.com/) - 认证解决方案
- [next-intl](https://next-intl-docs.vercel.app/) - 国际化库
- [shadcn/ui](https://ui.shadcn.com/) - UI 组件
- [TailwindCSS](https://tailwindcss.com/) - CSS 框架
- [Turborepo](https://turbo.build/) - Monorepo 构建工具

## 📧 联系方式

- **项目主页**: https://github.com/yourusername/rungame-nextjs
- **问题反馈**: https://github.com/yourusername/rungame-nextjs/issues
- **邮箱**: your.email@example.com

## 🗺️ 路线图

- [ ] 用户系统（注册、登录、个人中心）
- [ ] 游戏评分和评论
- [ ] 收藏夹功能
- [ ] 游戏推荐算法
- [ ] 社交分享
- [ ] 游戏统计分析
- [ ] API 接口文档
- [ ] 移动端 APP

---

**Made with ❤️ using Next.js + Turborepo**

**最后更新**: 2026-01-12
**项目版本**: v2.0 (Monorepo + Better Auth + 双数据库)
