# GitHub Secrets 配置指南

本文档说明如何配置 GitHub Secrets 以实现自动化部署。

## 为什么使用 GitHub Secrets？

✅ **安全性**：敏感信息不会暴露在代码仓库中
✅ **自动化**：每次部署时自动生成 .env 文件
✅ **易于管理**：集中管理所有环境变量
✅ **多环境支持**：不同环境可以使用不同的 Secrets

## 必需的 Secrets 配置

访问：https://github.com/YOUR_USERNAME/rungame-monorepo/settings/secrets/actions

### 1. VPS 连接配置

| Secret 名称 | 说明 | 示例 | 必需 |
|------------|------|------|------|
| `VPS_HOST` | VPS 服务器 IP 或域名 | `123.45.67.89` | ✅ |
| `VPS_USERNAME` | SSH 登录用户名 | `root` | ✅ |
| `VPS_SSH_KEY` | SSH 私钥（完整内容） | `-----BEGIN OPENSSH...` | ✅ |
| `VPS_PORT` | SSH 端口 | `22`（默认可不配置） | ⚪ |

### 2. 数据库配置

本项目使用**双数据库架构**：

| Secret 名称 | 说明 | 示例 | 必需 |
|------------|------|------|------|
| `DATABASE_URL` | 主数据库连接字符串 | `postgresql://user:pass@host:5432/main_db` | ✅ |
| `CACHE_DATABASE_URL` | 缓存数据库连接字符串 | `postgresql://cache:pass@host:5432/cache_db` | ⚠️ 推荐 |
| `CACHE_DB_PASSWORD` | 本地缓存数据库密码 | 自动生成的强密码 | ⚠️ 本地模式必需 |

**DATABASE_URL 格式**：
```
postgresql://用户名:密码@主机:端口/数据库名?schema=public
```

**架构说明**：
- **主数据库** (DATABASE_URL)：存储业务核心数据
  - 游戏、分类、标签、翻译
  - 管理员账号、权限配置
  - SEO 配置、网站设置

- **缓存数据库** (CACHE_DATABASE_URL)：存储临时和缓存数据
  - GamePix 游戏列表缓存
  - 游戏导入同步日志
  - AI 对话历史（7天自动清理）

**配置模式**：

#### 方案 A：远程缓存数据库（推荐生产环境）
只需配置 `CACHE_DATABASE_URL`，指向云数据库：
```bash
CACHE_DATABASE_URL=postgresql://cache:pass@rds.example.com:5432/cache_db
```

#### 方案 B：本地 Docker 缓存数据库（推荐开发环境）
只需配置 `CACHE_DB_PASSWORD`，自动使用本地容器：
```bash
CACHE_DB_PASSWORD=your-strong-password
```
docker-compose 会自动启动 `rungame-cache-db` 容器

### 3. NextAuth 配置

| Secret 名称 | 说明 | 如何生成 | 必需 |
|------------|------|----------|------|
| `NEXTAUTH_SECRET` | NextAuth 加密密钥 | `openssl rand -base64 32` | ✅ |
| `NEXTAUTH_URL` | 应用访问地址 | `https://admin.example.com` | ✅ |

### 4. R2 存储配置（可选）

| Secret 名称 | 说明 | 必需 |
|------------|------|------|
| `R2_ACCOUNT_ID` | Cloudflare R2 账户 ID | ⚪ |
| `R2_ACCESS_KEY_ID` | R2 访问密钥 ID | ⚪ |
| `R2_SECRET_ACCESS_KEY` | R2 访问密钥 Secret | ⚪ |
| `R2_BUCKET_NAME` | R2 存储桶名称 | ⚪ |
| `R2_PUBLIC_URL` | R2 公开访问 URL | ⚪ |

## 配置步骤

### 步骤 1：生成 SSH 密钥对

**在本地电脑或 VPS 上**：

```bash
# 生成新的 SSH 密钥对
ssh-keygen -t rsa -b 4096 -C "github-actions@rungame" -f ~/.ssh/github_actions

# 查看私钥（复制完整内容到 VPS_SSH_KEY）
cat ~/.ssh/github_actions

# 查看公钥
cat ~/.ssh/github_actions.pub

# 将公钥添加到 VPS
ssh-copy-id -i ~/.ssh/github_actions.pub root@YOUR_VPS_IP
```

### 步骤 2：生成 NEXTAUTH_SECRET

```bash
# 生成随机密钥
openssl rand -base64 32
```

### 步骤 3：添加 Secrets 到 GitHub

1. 打开仓库设置：https://github.com/YOUR_USERNAME/rungame-monorepo/settings/secrets/actions
2. 点击 **"New repository secret"**
3. 依次添加上述所有必需的 Secrets

**示例：添加 DATABASE_URL**

- **Name**: `DATABASE_URL`
- **Secret**: `postgresql://game:mypassword@localhost:5432/rungame?schema=public`
- 点击 **"Add secret"**

### 步骤 4：验证配置

配置完成后，触发部署：

**方法 1：推送代码**
```bash
git commit --allow-empty -m "chore: 测试部署配置"
git push origin main
```

**方法 2：手动触发**
1. 访问：https://github.com/YOUR_USERNAME/rungame-monorepo/actions
2. 选择 "Deploy Admin to VPS"
3. 点击 **"Run workflow"**

## 工作原理

### 部署流程

```mermaid
graph LR
    A[推送代码到 main] --> B[GitHub Actions 触发]
    B --> C[SSH 连接到 VPS]
    C --> D[拉取最新代码]
    D --> E[从 Secrets 生成 .env]
    E --> F[Docker 构建镜像]
    F --> G[启动容器]
    G --> H[健康检查]
    H --> I[部署完成]
```

### .env 文件生成

在每次部署时，工作流会：

1. 从 GitHub Secrets 读取环境变量
2. 通过 SSH 传递到 VPS
3. 在 VPS 上动态生成 `.env` 文件
4. Docker Compose 读取 `.env` 并注入到容器

**生成的 .env 示例**：
```env
# 数据库配置
DATABASE_URL=postgresql://user:pass@host:5432/db

# NextAuth 配置
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=https://admin.example.com

# R2 存储配置
R2_ACCOUNT_ID=
R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=
R2_BUCKET_NAME=
R2_PUBLIC_URL=
```

## 安全最佳实践

### ✅ 应该做的

1. **定期轮换密钥**：每 3-6 个月更新 SSH 密钥和 NEXTAUTH_SECRET
2. **最小权限原则**：VPS 用户只授予必要的权限
3. **使用强密码**：数据库密码至少 16 位，包含大小写字母、数字、符号
4. **限制 SSH 访问**：配置防火墙规则，只允许必要的 IP 访问
5. **启用 2FA**：为 GitHub 账户启用两步验证

### ❌ 不应该做的

1. **不要**将 Secrets 提交到代码仓库
2. **不要**在日志中打印敏感信息
3. **不要**使用弱密码或默认密码
4. **不要**将生产环境的 Secrets 用于开发环境
5. **不要**与他人共享 SSH 私钥

## 故障排查

### 问题 1：部署失败，提示 "missing server host"

**原因**：未配置 `VPS_HOST` Secret

**解决**：
```bash
# 在 GitHub Secrets 中添加
Name: VPS_HOST
Secret: YOUR_VPS_IP_OR_DOMAIN
```

### 问题 2：SSH 连接失败

**原因**：SSH 密钥配置错误

**解决**：
1. 检查 `VPS_SSH_KEY` 是否包含完整的私钥（包括开头和结尾的标记）
2. 确认公钥已添加到 VPS 的 `~/.ssh/authorized_keys`
3. 测试手动 SSH 连接：`ssh -i ~/.ssh/github_actions root@YOUR_VPS_IP`

### 问题 3：容器启动失败

**原因**：环境变量配置错误

**解决**：
1. 检查 GitHub Secrets 中的变量是否正确
2. SSH 到 VPS，查看生成的 `.env` 文件：
   ```bash
   cd /opt/1panel/docker/compose/rungame-admin
   cat .env
   ```
3. 查看容器日志：
   ```bash
   docker logs rungame-admin
   ```

### 问题 4：数据库连接失败

**原因**：DATABASE_URL 格式错误

**解决**：
确认格式正确：
```
postgresql://username:password@hostname:5432/database?schema=public
```

注意事项：
- 密码中的特殊字符需要 URL 编码
- 端口号默认是 5432
- schema 通常是 public

## 环境变量参考

### DATABASE_URL 示例

```bash
# 本地数据库
postgresql://postgres:password@localhost:5432/rungame?schema=public

# 远程数据库
postgresql://user:pass@db.example.com:5432/prod_db?schema=public

# 使用 SSL 连接
postgresql://user:pass@host:5432/db?schema=public&sslmode=require

# 连接池配置
postgresql://user:pass@host:5432/db?schema=public&connection_limit=10&pool_timeout=20
```

### NEXTAUTH_URL 示例

```bash
# 生产环境（HTTPS）
https://admin.example.com

# 开发环境（HTTP + 端口）
http://localhost:3001

# VPS IP 访问
http://123.45.67.89:3001
```

### CACHE_DATABASE_URL 示例

```bash
# 本地 Docker PostgreSQL（默认，无需配置 CACHE_DATABASE_URL）
# 只需配置 CACHE_DB_PASSWORD
postgresql://cache:password@cache-db:5432/rungame_cache

# 阿里云 RDS（可以与主库在同一实例，节省成本）
postgresql://cache:pass@rds-xxx.aliyuncs.com:5432/cache_db

# 腾讯云 PostgreSQL
postgresql://cache:pass@10.x.x.x:5432/cache_db

# AWS RDS
postgresql://cache:pass@db.xxxxx.us-east-1.rds.amazonaws.com:5432/cache_db

# Neon（推荐：免费层足够，低延迟）
postgresql://user:pass@ep-xxx-xxx.us-east-2.aws.neon.tech/cache_db

# Supabase
postgresql://postgres:pass@db.xxx.supabase.co:5432/postgres?schema=cache
```

## 多环境配置

如果需要支持多个部署环境（staging, production），可以：

1. **创建环境专用的 Secrets**：
   - `PROD_DATABASE_URL`
   - `STAGING_DATABASE_URL`

2. **在工作流中根据环境选择**：
   ```yaml
   env:
     DATABASE_URL: ${{ github.event.inputs.environment == 'production' && secrets.PROD_DATABASE_URL || secrets.STAGING_DATABASE_URL }}
   ```

3. **或使用 GitHub Environments**：
   - 在仓库设置中创建 "production" 和 "staging" 环境
   - 为每个环境配置独立的 Secrets
   - 工作流中指定环境：`environment: production`

## 相关文档

- [DOCKER.md](DOCKER.md) - Docker 部署完整指南
- [DEPLOY-ADMIN.md](DEPLOY-ADMIN.md) - 管理端部署文档
- [.github/workflows/deploy-admin.yml](../.github/workflows/deploy-admin.yml) - 部署工作流源码

---

**最后更新**：2025-11-16
**维护者**：RunGame 开发团队
