# 数据库综合指南

## 概述
RunGame 使用 PostgreSQL 数据库，通过 Prisma ORM 进行管理。本组件文档涵盖架构设计、操作指南、故障排查及性能优化。

## 1. 连接与配置

### 环境变量
```env
# 主数据库 (Supabase)
DATABASE_URL="postgresql://user:password@host:port/database?schema=public"

# 生产环境 (PgBouncer)
DATABASE_URL="postgresql://user:password@host:6432/database?pgbouncer=true&connection_limit=10"
```

### 连接池建议
- **总连接数** = 应用实例数 × connection_limit
- 建议每个实例 5-10 个连接。

---

## 2. 核心数据模型

### 翻译架构模式 (Translation Separation)
所有多语言实体遵循：
- **主表**: 不可翻译数据 + 英文内容 (fallback)
- **翻译表**: 其他语言内容
- **关系**: 一对多 (主表 → 翻译表)

### 主要实体
- **Game**: 核心游戏数据，包含 JSON 结构的 `gameInfo` 和 `dimensions`。
- **Category / Tag**: 组织结构，均支持多语言。
- **UrlSubmission**: SEO 相关提交记录（Google/Bing 分离状态）。

*(详细字段定义请参考 `prisma/schema.prisma`)*

---

## 3. 数据库操作

### 常用命令
```bash
# 推送 Schema
npm run db:push

# 生成 Client
npx prisma generate

# 可视化管理
npx prisma studio
```

### 数据初始化 (Seeding)

我们提供两种方式初始化数据：

#### 方式 A: 使用 SQL 文件 (推荐 - 极速)
适合快速重置或初次部署。
```bash
# 使用脚本
./prisma/import-seed-data.sh

# 或手动 psql
psql -h <host> -U <user> -d <db> < prisma/seed-data.sql
```

#### 方式 B: 使用 TypeScript 脚本 (慢 - 完整逻辑)
适合开发环境测试完整创建流程。
```bash
npm run db:seed
```
*注意：由于需创建大量分类和游戏，耗时可能较长。*

**初始化内容**:
- 管理员账号 (`admin@rungame.online` / `admin123`)
- 150+ 游戏分类 (GamePix)
- 4 种语言配置 (en, zh, es, fr)

---

## 4. 故障排查 (Troubleshooting)

### 常见问题

#### 1. 平台/架构不兼容 (Binary Target Error)
**错误**: `Prisma Client was generated for "debian-openssl-1.1.x", but deployment required "rhel-openssl-1.1.x"`.
**原因**: 本地环境 (Mac/Debian) 与 部署环境 (CentOS/RHEL) 的系统库不同。
**解决**:
1.  **检查 VPS 信息**:
    ```bash
    cat /etc/os-release
    openssl version
    ```
2.  **强制指定 Binary Target**:
    在 `schema.prisma` 中添加：
    ```prisma
    binaryTargets = ["native", "rhel-openssl-1.0.x"]
    ```
3.  **重新生成**: `npx prisma generate`

#### 2. 连接池耗尽
**症状**: `Timeout waiting for connection`.
**解决**:
- 检查 `pool_timeout` 设置。
- 生产环境务必使用 PgBouncer (端口 6432)。
- 确保 Prisma Client 单例模式 (参考 `lib/prisma.ts`)。

---

## 5. 高级优化：CI/CD 二进制文件瘦身

为了减少 Docker 镜像大小和加快构建，我们在 GitHub Actions 中实现了动态 Binary Target 注入：

1.  **检测平台**: CI 流程通过 SSH 预先检测目标 VPS 的 OS 和 OpenSSL 版本。
2.  **动态生成**: 修改 `schema.prisma` 仅生成目标平台所需的单一二进制文件 (而不是全平台)。
3.  **效果**: Client 大小从 ~180MB 降至 ~30MB，部署包体积减少 60% 以上。

*(详情参考 `.github/workflows/deploy-admin-pm2.yml`)*

---

## 6. 查询最佳实践

1.  **Select 优于 Include**: 仅查询所需字段，避免 `select *`。
2.  **条件加载翻译**:
    ```typescript
    translations: locale === 'en' ? false : { where: { locale } }
    ```
3.  **使用 JSON 结构**: 游戏详情内容存储为 JSON (`gameInfo`)，避免大量关联表查询。
