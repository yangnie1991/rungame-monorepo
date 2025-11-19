# PM2 自动部署指南

本文档说明如何使用 **GitHub Actions + PM2** 自动部署 RunGame 应用到 VPS。

## 📋 目录

- [部署架构](#部署架构)
- [前提条件](#前提条件)
- [首次配置](#首次配置)
- [使用方法](#使用方法)
- [故障排查](#故障排查)
- [性能优化](#性能优化)

---

## 🏗️ 部署架构

### 新的部署流程

```
代码推送 → GitHub Actions 构建 → 传输到 VPS → PM2 启动/重启
   ↓              ↓                    ↓              ↓
 main 分支    Linux 环境构建        SCP 传输      自动化管理
```

### 与 Docker 部署的区别

| 特性 | PM2 部署 | Docker 部署 |
|------|---------|------------|
| **触发方式** | 自动（推送到 main） | 手动（workflow_dispatch） |
| **构建环境** | GitHub Actions (Ubuntu 22.04) | GitHub Actions (Ubuntu Latest) |
| **运行方式** | PM2 进程管理 | Docker 容器 |
| **内存占用** | ~180-220 MB | ~250-320 MB |
| **启动速度** | 2-3 秒 | 6-8 秒 |
| **资源效率** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |

---

## ✅ 前提条件

### 1. VPS 服务器要求

- ✅ **操作系统**: Ubuntu 20.04/22.04、Debian 11+、CentOS 8+
- ✅ **内存**: 最低 1GB，推荐 2GB+
- ✅ **磁盘**: 至少 10GB 可用空间
- ✅ **SSH**: 可通过 SSH 密钥登录

### 2. 服务器软件要求

```bash
# SSH 登录服务器后检查

# 1. Node.js (必须 18+ 版本)
node -v  # 应显示 v18.x.x 或 v20.x.x

# 如果未安装，执行：
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# 2. pnpm (包管理器)
pnpm -v  # 应显示 8.x.x

# 如果未安装，执行：
npm install -g pnpm

# 3. PM2 (进程管理器)
pm2 -v  # 应显示 5.x.x

# 如果未安装，执行：
npm install -g pm2

# 4. curl (用于健康检查)
curl --version

# 如果未安装，执行：
sudo apt-get install -y curl
```

### 3. GitHub 仓库配置

确保仓库已配置以下 **Secrets**：

**操作路径**: GitHub 仓库 → Settings → Secrets and variables → Actions

| Secret 名称 | 说明 | 示例值 |
|------------|------|--------|
| `VPS_HOST` | VPS IP 地址 | `203.0.113.45` |
| `VPS_USERNAME` | SSH 用户名 | `root` |
| `VPS_SSH_KEY` | SSH 私钥（完整内容） | `-----BEGIN OPENSSH PRIVATE KEY-----...` |
| `VPS_PORT` | SSH 端口（可选） | `22` |
| `DATABASE_URL` | 业务数据库连接 | `postgresql://user:pass@host:5432/db` |
| `CACHE_DATABASE_URL` | 管理数据库连接 | `postgresql://user:pass@host:5432/cache` |
| `NEXTAUTH_SECRET` | NextAuth 密钥 | `openssl rand -base64 32` 生成 |
| `NEXTAUTH_URL` | Admin 域名 | `https://admin.yourdomain.com` |
| `ENCRYPTION_KEY` | 加密密钥 | `openssl rand -hex 32` 生成 |

**可选 Secrets (R2 存储)**：
- `R2_ACCOUNT_ID`
- `R2_ACCESS_KEY_ID`
- `R2_SECRET_ACCESS_KEY`
- `R2_BUCKET_NAME`
- `R2_PUBLIC_URL`

---

## 🚀 首次配置

### 第 1 步：生成 SSH 密钥（如果没有）

```bash
# 在本地电脑执行
ssh-keygen -t ed25519 -C "github-actions-deploy" -f ~/.ssh/rungame-deploy

# 复制公钥到 VPS
ssh-copy-id -i ~/.ssh/rungame-deploy.pub root@your-vps-ip

# 测试 SSH 连接
ssh -i ~/.ssh/rungame-deploy root@your-vps-ip
```

### 第 2 步：配置 GitHub Secrets

```bash
# 读取私钥内容并复制
cat ~/.ssh/rungame-deploy

# 输出类似：
# -----BEGIN OPENSSH PRIVATE KEY-----
# b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAAAMwAAAAtzc2gtZW
# ...
# -----END OPENSSH PRIVATE KEY-----

# 将完整内容（包括开始和结束标记）粘贴到 GitHub Secrets 的 VPS_SSH_KEY
```

前往 GitHub 配置所有必需的 Secrets。

### 第 3 步：VPS 初始化（仅首次）

```bash
# SSH 登录 VPS
ssh root@your-vps-ip

# 1. 安装必要软件
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs curl

npm install -g pnpm pm2

# 2. 创建部署目录
mkdir -p /www/wwwroot/rungame

# 3. 配置 PM2 开机自启（仅首次）
pm2 startup
# 按提示执行输出的命令，类似：
# sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u root --hp /root

# 4. 配置防火墙（如果使用）
sudo ufw allow 4000/tcp  # Admin 端口
sudo ufw allow 3000/tcp  # Website 端口（如果部署）
```

### 第 4 步：推送代码触发部署

```bash
# 在本地项目目录

# 1. 提交所有更改
git add .
git commit -m "feat: 配置 PM2 自动部署"

# 2. 推送到 main 分支（自动触发部署）
git push origin main
```

### 第 5 步：查看部署进度

1. 打开 GitHub 仓库页面
2. 点击 **Actions** 标签
3. 查看 **Deploy Admin to VPS (PM2 - Auto)** workflow 运行状态

**预计部署时间**: 5-8 分钟

---

## 📖 使用方法

### 自动部署（推荐）

每次推送到 `main` 分支且修改了以下文件时，自动触发部署：

```
apps/admin/**
packages/database/**
ecosystem.config.js
pnpm-lock.yaml
等...
```

**操作**：

```bash
# 修改代码
git add .
git commit -m "fix: 修复某个问题"
git push origin main  # ← 自动触发部署
```

### 手动部署

如果需要手动触发部署：

1. GitHub 仓库 → **Actions**
2. 左侧选择 **Deploy Admin to VPS (PM2 - Auto)**
3. 点击 **Run workflow**
4. 选择分支（默认 main）
5. 点击绿色的 **Run workflow** 按钮

### 查看服务器上的应用状态

```bash
# SSH 登录 VPS
ssh root@your-vps-ip

# 查看 PM2 进程列表
pm2 list

# 查看详细信息
pm2 describe rungame-admin

# 查看实时日志
pm2 logs rungame-admin

# 查看最近 100 行日志
pm2 logs rungame-admin --lines 100

# 实时监控（CPU、内存）
pm2 monit
```

### 手动重启应用

```bash
# SSH 登录 VPS
cd /www/wwwroot/rungame

# 重启 Admin 应用
pm2 restart rungame-admin

# 重启所有应用
pm2 restart all

# 重载配置（零停机重启）
pm2 reload rungame-admin
```

### 查看日志

```bash
# 日志文件位置
cd /www/wwwroot/rungame/logs

# 查看错误日志
tail -f admin-error.log

# 查看访问日志
tail -f admin-out.log
```

---

## 🔍 故障排查

### 1. 部署失败：SSH 连接超时

**错误信息**：
```
Failed to connect to VPS: Connection timeout
```

**解决方法**：

```bash
# 1. 检查 VPS IP 是否正确
ping your-vps-ip

# 2. 检查 SSH 端口是否正确（默认 22）
ssh -p 22 root@your-vps-ip

# 3. 检查防火墙是否开放 SSH 端口
sudo ufw status
sudo ufw allow 22/tcp

# 4. 验证 SSH 密钥
ssh -i ~/.ssh/rungame-deploy root@your-vps-ip
```

### 2. 健康检查失败

**错误信息**：
```
❌ 健康检查失败，查看日志
```

**排查步骤**：

```bash
# SSH 登录 VPS
cd /www/wwwroot/rungame

# 1. 检查应用是否启动
pm2 list
# 如果状态是 errored，查看日志

# 2. 查看详细错误
pm2 logs rungame-admin --lines 50

# 3. 手动测试健康检查接口
curl http://localhost:4000/api/health

# 4. 检查端口是否被占用
sudo netstat -tlnp | grep 4000

# 5. 检查环境变量
cat .env
```

### 3. Prisma 数据库连接失败

**错误信息**：
```
PrismaClientInitializationError: Can't reach database server
```

**解决方法**：

```bash
# 1. 检查环境变量
cd /www/wwwroot/rungame
cat .env | grep DATABASE_URL

# 2. 测试数据库连接
npm install -g @prisma/cli
prisma db pull --schema=packages/database/prisma/schema.prisma

# 3. 检查数据库防火墙
# 确保 VPS IP 在数据库白名单中

# 4. 检查 Prisma Client 是否正确生成
ls packages/database/node_modules/.prisma/client/*.node
```

### 4. 内存不足导致重启

**错误信息**：
```
Process rungame-admin restarted due to memory limit
```

**解决方法**：

```bash
# 1. 查看内存使用
free -h
pm2 describe rungame-admin

# 2. 增加内存限制（临时）
pm2 restart rungame-admin --max-memory-restart 800M

# 3. 永久修改配置
# 编辑 ecosystem.config.js
nano ecosystem.config.js
# 修改 max_memory_restart: '800M'

# 4. 重启应用
pm2 restart ecosystem.config.js
```

### 5. PM2 进程消失（服务器重启后）

**问题**：服务器重启后 PM2 进程没有自动启动

**解决方法**：

```bash
# 1. 设置 PM2 开机自启（如果未设置）
pm2 startup
# 执行输出的命令

# 2. 保存当前进程列表
pm2 save

# 3. 重启服务器测试
sudo reboot

# 4. 重新登录后检查
pm2 list  # 应该能看到 rungame-admin
```

---

## ⚡ 性能优化

### 1. 启用 PM2 集群模式（Website）

如果部署 Website 应用且服务器有多核 CPU：

```javascript
// ecosystem.config.js - Website 配置
{
  name: 'rungame-website',
  instances: 'max',      // 使用所有 CPU 核心
  exec_mode: 'cluster',  // 集群模式
  // ...
}
```

**性能提升**：4 核 CPU ≈ 4 倍并发处理能力

### 2. 配置日志轮换

防止日志文件无限增长：

```bash
# 安装 PM2 日志轮换模块
pm2 install pm2-logrotate

# 配置
pm2 set pm2-logrotate:max_size 10M      # 单文件最大 10MB
pm2 set pm2-logrotate:retain 7          # 保留 7 天
pm2 set pm2-logrotate:compress true     # 压缩旧日志
```

### 3. 启用 PM2 监控（可选）

```bash
# 在线监控（需要注册 PM2.io 账号）
pm2 link <secret_key> <public_key>

# 本地监控
pm2 monit  # 实时 CPU、内存监控
```

### 4. 优化 Next.js 构建

在 `next.config.ts` 中启用优化：

```typescript
const config = {
  // 生产环境优化
  swcMinify: true,              // 使用 SWC 压缩（更快）
  compress: true,               // 启用 gzip 压缩
  poweredByHeader: false,       // 隐藏 X-Powered-By 头

  // 图片优化
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },
};
```

### 5. 数据库连接池优化

在 `.env` 中配置：

```env
# 业务数据库（Admin + Website 共享）
DATABASE_URL="postgresql://user:pass@host:5432/db?connection_limit=10&pool_timeout=20"

# 管理数据库（仅 Admin）
CACHE_DATABASE_URL="postgresql://user:pass@host:5432/cache?connection_limit=5&pool_timeout=20"
```

**连接数计算**：
```
总连接数 = PM2 实例数 × connection_limit
Admin (1 实例) = 1 × 10 = 10 个连接
```

---

## 📊 部署流程对比

### Docker 部署 vs PM2 部署

| 阶段 | Docker (手动) | PM2 (自动) |
|------|--------------|-----------|
| **触发** | 手动点击 | 推送代码自动触发 |
| **构建** | GitHub Actions | GitHub Actions |
| **产物** | Docker 镜像 (~1.2GB) | 压缩包 (~150MB) |
| **传输** | 2-3 分钟 | 30-60 秒 |
| **启动** | Docker 容器 | PM2 进程 |
| **内存** | 250-320 MB | 180-220 MB |
| **总耗时** | 8-12 分钟 | 5-8 分钟 |

---

## 🔐 安全建议

### 1. 保护 SSH 密钥

```bash
# 限制私钥权限
chmod 600 ~/.ssh/rungame-deploy

# 定期更换 SSH 密钥（每 3-6 个月）
ssh-keygen -t ed25519 -C "github-actions-$(date +%Y%m)" -f ~/.ssh/rungame-deploy-new
```

### 2. 限制 GitHub Actions IP（可选）

如果 VPS 支持，只允许 GitHub Actions 的 IP 访问 SSH：

```bash
# GitHub Actions IP 范围（定期更新）
# https://api.github.com/meta

sudo ufw allow from 140.82.112.0/20 to any port 22
```

### 3. 环境变量保护

- ❌ 不要在代码中硬编码密钥
- ✅ 所有敏感信息使用 GitHub Secrets
- ✅ 定期更换 `NEXTAUTH_SECRET` 和 `ENCRYPTION_KEY`

### 4. 数据库访问控制

```bash
# 数据库服务商（如 Supabase、PlanetScale）
# 仅允许 VPS IP 访问，禁止公网访问
```

---

## 📚 相关文档

- [CLAUDE.md](../CLAUDE.md) - 项目总体说明
- [1PANEL-DEPLOYMENT.md](./1PANEL-DEPLOYMENT.md) - 1Panel 面板部署（Docker）
- [DATABASE.md](./DATABASE.md) - 数据库架构和配置
- [ecosystem.config.js](../ecosystem.config.js) - PM2 配置文件

---

## ✅ 部署检查清单

- [ ] VPS 已安装 Node.js 20+、pnpm、PM2
- [ ] GitHub 已配置所有必需的 Secrets
- [ ] SSH 密钥可正常连接 VPS
- [ ] `/www/wwwroot/rungame` 目录已创建
- [ ] PM2 开机自启已设置（`pm2 startup`）
- [ ] 数据库连接字符串正确
- [ ] 推送代码后 GitHub Actions 成功运行
- [ ] VPS 上 `pm2 list` 可看到 `rungame-admin`
- [ ] `curl http://localhost:4000/api/health` 返回成功
- [ ] 通过域名可访问管理后台

---

**最后更新**: 2025-01-19
**版本**: v1.0
