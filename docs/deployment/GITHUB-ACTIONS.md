# GitHub Secrets 配置指南

本文档说明如何为 RunGame Admin 部署配置 GitHub Secrets。

## 📋 必需的 Secrets 清单

在 GitHub 仓库设置中（Settings → Secrets and variables → Actions），需要配置以下 Secrets：

### 🔐 VPS 服务器连接

| Secret 名称 | 说明 | 示例值 | 必需 |
|------------|------|--------|------|
| `VPS_HOST` | VPS 服务器 IP 或域名 | `192.168.1.100` | ✅ |
| `VPS_USERNAME` | SSH 登录用户名 | `root` | ✅ |
| `VPS_SSH_KEY` | SSH 私钥（完整内容） | `-----BEGIN RSA PRIVATE KEY-----...` | ✅ |
| `VPS_PORT` | SSH 端口 | `22` | ❌ (默认 22) |

### 🗄️ 数据库配置（外部托管）

| Secret 名称 | 说明 | 示例值 | 必需 |
|------------|------|--------|------|
| `DATABASE_URL` | 业务数据库连接字符串（外部托管） | `postgresql://game:pass@your-db-host:5432/game` | ✅ |
| `CACHE_DATABASE_URL` | 管理数据库连接字符串（外部托管） | `postgresql://admin:pass@your-db-host:5433/rungame_admin` | ✅ |

> **注意**：数据库必须是外部托管的（云数据库服务或独立服务器），Docker 部署**不包含**本地数据库容器。

### 🔑 认证配置

| Secret 名称 | 说明 | 生成方法 | 必需 |
|------------|------|----------|------|
| `NEXTAUTH_SECRET` | NextAuth 加密密钥 | `openssl rand -base64 32` | ✅ |
| `NEXTAUTH_URL` | Admin 应用 URL | `https://admin.rungame.online` | ✅ |
| `ENCRYPTION_KEY` | AI 配置加密密钥 | `openssl rand -base64 48` | ✅ |

### 🌐 公共配置

| Secret 名称 | 说明 | 示例值 | 必需 |
|------------|------|--------|------|
| `NODE_ENV` | 环境标识 | `production` | ❌ (默认 production) |
| `NEXT_PUBLIC_SITE_URL` | 网站 URL | `https://rungame.online` | ✅ |
| `NEXT_PUBLIC_GA_ID` | Google Analytics ID | `G-XXXXXXXXXX` | ❌ |
| `NEXT_PUBLIC_ADSENSE_ID` | Google AdSense ID | `ca-pub-XXXXXXXXXXXXXXXX` | ❌ |

### ☁️ Cloudflare R2 配置（可选）

| Secret 名称 | 说明 | 必需 |
|------------|------|------|
| `R2_ACCOUNT_ID` | Cloudflare Account ID | ❌ |
| `R2_ACCESS_KEY_ID` | R2 Access Key ID | ❌ |
| `R2_SECRET_ACCESS_KEY` | R2 Secret Access Key | ❌ |
| `R2_BUCKET_NAME` | R2 Bucket 名称 | ❌ |
| `R2_PUBLIC_URL` | R2 公共访问 URL | ❌ |

### 🔍 Google Search API 配置（可选）

| Secret 名称 | 说明 | 必需 |
|------------|------|------|
| `GOOGLE_SEARCH_API_KEY` | Google Custom Search API Key | ❌ |
| `GOOGLE_SEARCH_ENGINE_ID` | Google Search Engine ID | ❌ |

---

## 🚀 配置步骤

### 1. 访问 GitHub Secrets 设置

```
https://github.com/你的用户名/你的仓库名/settings/secrets/actions
```

### 2. 添加 Secret

1. 点击 **"New repository secret"**
2. 输入 **Name**（如 `DATABASE_URL`）
3. 输入 **Value**（如 `postgresql://...`）
4. 点击 **"Add secret"**

### 3. 生成加密密钥

```bash
# 生成 NEXTAUTH_SECRET（32 字节）
openssl rand -base64 32

# 生成 ENCRYPTION_KEY（48 字节）
openssl rand -base64 48
```

### 4. 获取 SSH 私钥

```bash
# 在本地生成 SSH 密钥对（如果还没有）
ssh-keygen -t rsa -b 4096 -C "deploy@rungame"

# 复制私钥内容（完整内容，包括 BEGIN 和 END 行）
cat ~/.ssh/id_rsa
```

将**完整的私钥内容**（包括 `-----BEGIN RSA PRIVATE KEY-----` 和 `-----END RSA PRIVATE KEY-----`）粘贴到 `VPS_SSH_KEY` Secret 中。

---

## 📝 配置模板

### 最小配置（仅必需项）

```bash
# VPS 连接
VPS_HOST=192.168.1.100
VPS_USERNAME=root
VPS_SSH_KEY=-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEA...
-----END RSA PRIVATE KEY-----

# 数据库（外部托管，替换为实际的数据库地址）
DATABASE_URL=postgresql://game:password@your-db-host:5432/game?schema=public
CACHE_DATABASE_URL=postgresql://admin:password@your-db-host:5433/rungame_admin?schema=public

# 认证
NEXTAUTH_SECRET=your-32-char-secret-here
NEXTAUTH_URL=https://admin.rungame.online
ENCRYPTION_KEY=your-48-char-encryption-key-here

# 公共配置
NEXT_PUBLIC_SITE_URL=https://rungame.online
```

### 完整配置（包含可选项）

在最小配置的基础上，添加：

```bash
# Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Google AdSense
NEXT_PUBLIC_ADSENSE_ID=ca-pub-XXXXXXXXXXXXXXXX

# Cloudflare R2
R2_ACCOUNT_ID=your-account-id
R2_ACCESS_KEY_ID=your-access-key
R2_SECRET_ACCESS_KEY=your-secret-key
R2_BUCKET_NAME=rungame-assets
R2_PUBLIC_URL=https://pub-xxxxxxxxxxxxx.r2.dev

# Google Search API
GOOGLE_SEARCH_API_KEY=AIzaSyBXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
GOOGLE_SEARCH_ENGINE_ID=a1b2c3d4e5f6g7h8i
```

---

## ✅ 验证配置

### 检查 Secrets 是否完整

在 GitHub Actions 运行时，查看日志中的环境变量生成部分：

```
📝 生成根目录 .env 配置文件...
✅ 根目录 .env 文件已生成
📝 生成 Admin .env.local 配置文件...
✅ Admin .env.local 文件已生成

📋 生成的配置文件概览:
  - .env (共享): 5 个变量
  - apps/admin/.env.local (Admin): 11 个变量
```

如果变量数量不符合预期，检查是否有 Secret 未配置。

### 手动触发部署测试

1. 进入 Actions 标签页
2. 选择 "Deploy Admin to VPS" workflow
3. 点击 "Run workflow"
4. 选择分支和环境
5. 点击 "Run workflow" 开始部署

---

## 🔒 安全最佳实践

1. **定期轮换密钥**
   - NEXTAUTH_SECRET 至少每 6 个月更换一次
   - ENCRYPTION_KEY 更换时需要重新加密现有数据

2. **使用强密钥**
   - 所有密钥至少 32 个字符
   - 包含大小写字母、数字和特殊字符

3. **限制访问权限**
   - GitHub Secrets 只有仓库管理员可以访问
   - VPS 使用专用的部署用户，不要用 root

4. **监控 Secret 使用**
   - 定期检查 GitHub Actions 日志
   - 启用 GitHub 的安全警报

---

## 🛠️ 故障排查

### 部署失败：环境变量缺失

**错误信息**：
```
❌ 缺少必需的环境变量
```

**解决方法**：
1. 检查 GitHub Secrets 是否配置完整
2. 确保 Secret 名称大小写完全匹配
3. 验证 Secret 值中没有多余的空格或换行

### 数据库连接失败

**错误信息**：
```
Error: P1001: Can't reach database server
```

**解决方法**：
1. 检查 `DATABASE_URL` 和 `CACHE_DATABASE_URL` 是否正确
2. 确认 VPS 可以访问数据库服务器
3. 检查数据库防火墙规则

### SSH 连接失败

**错误信息**：
```
Permission denied (publickey)
```

**解决方法**：
1. 确保 `VPS_SSH_KEY` 包含完整的私钥（包括 BEGIN 和 END 行）
2. 验证公钥已添加到 VPS 的 `~/.ssh/authorized_keys`
3. 检查 VPS 的 SSH 配置允许密钥认证

---

## 📚 相关文档

- [GitHub Actions Secrets 文档](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [环境变量配置指南](./ENVIRONMENT-VARIABLES.md)
- [部署流程说明](./DEPLOY.md)

---

**最后更新**: 2025-01-17
