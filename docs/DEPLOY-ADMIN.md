# RunGame 管理端部署指南

本指南将帮助你在使用 **1Panel** 管理的 VPS 上部署 RunGame 管理端，并配置 GitHub Actions 实现自动更新。

## 📋 目录

- [前置要求](#前置要求)
- [快速开始](#快速开始)
- [详细步骤](#详细步骤)
  - [1. VPS 环境准备](#1-vps-环境准备)
  - [2. 在 1Panel 中配置项目](#2-在-1panel-中配置项目)
  - [3. 配置环境变量](#3-配置环境变量)
  - [4. 首次部署](#4-首次部署)
  - [5. 配置反向代理](#5-配置反向代理)
  - [6. 配置 GitHub Actions 自动部署](#6-配置-github-actions-自动部署)
- [运维管理](#运维管理)
- [故障排查](#故障排查)

---

## 前置要求

### VPS 要求
- **操作系统**: Ubuntu 20.04+ / Debian 11+ / CentOS 8+
- **内存**: 最低 2GB，推荐 4GB+
- **存储**: 最低 20GB 可用空间
- **1Panel**: 已安装并运行（版本 1.10.0+）

### 服务要求
- **Docker**: 20.10+（1Panel 会自动安装）
- **PostgreSQL**: 数据库服务（可在 1Panel 应用商店安装）
- **Git**: 用于代码拉取

### 本地要求
- GitHub 账户和仓库访问权限
- SSH 密钥对（用于 GitHub Actions 部署）

---

## 快速开始

如果你已经熟悉 1Panel 和 Docker，可以快速开始：

```bash
# 1. 在 1Panel 中创建项目目录
/opt/1panel/docker/compose/rungame-admin

# 2. 克隆代码
git clone https://github.com/yourusername/rungame-nextjs.git .

# 3. 配置环境变量
cp .env.admin.example .env
nano .env  # 修改配置

# 4. 部署
chmod +x deploy-admin.sh
./deploy-admin.sh
```

---

## 详细步骤

### 1. VPS 环境准备

#### 1.1 安装 1Panel

如果还没有安装 1Panel：

```bash
# 官方安装脚本
curl -sSL https://resource.fit2cloud.com/1panel/package/quick_start.sh -o quick_start.sh
sudo bash quick_start.sh

# 安装完成后，访问 1Panel
# 默认端口: https://your-vps-ip:9999
```

#### 1.2 安装 PostgreSQL

在 1Panel 应用商店中：
1. 进入 **应用商店**
2. 搜索 **PostgreSQL**
3. 点击安装，选择版本（推荐 15 或 16）
4. 设置数据库名称、用户名和密码
5. 记录连接信息

或使用 Docker 命令安装：

```bash
docker run -d \
  --name rungame-postgres \
  -e POSTGRES_DB=rungame \
  -e POSTGRES_USER=game \
  -e POSTGRES_PASSWORD=your_password \
  -p 5432:5432 \
  -v /opt/1panel/data/postgres:/var/lib/postgresql/data \
  --restart unless-stopped \
  postgres:16-alpine
```

---

### 2. 在 1Panel 中配置项目

#### 2.1 创建项目

1. 登录 1Panel 管理面板
2. 进入 **容器 → 编排**
3. 点击 **创建**，填写：
   - **名称**: `rungame-admin`
   - **路径**: `/opt/1panel/docker/compose/rungame-admin`
   - 点击创建

#### 2.2 克隆代码

通过 1Panel 终端或 SSH 连接到 VPS：

```bash
# 进入项目目录
cd /opt/1panel/docker/compose/rungame-admin

# 克隆代码（替换为你的仓库地址）
git clone https://github.com/yourusername/rungame-nextjs.git .

# 或者如果是私有仓库，使用 SSH
git clone git@github.com:yourusername/rungame-nextjs.git .
```

---

### 3. 配置环境变量

#### 3.1 创建 .env 文件

```bash
# 复制示例文件
cp .env.admin.example .env

# 编辑环境变量
nano .env
```

#### 3.2 必需的环境变量

```env
# 数据库连接（使用 1Panel 中 PostgreSQL 的连接信息）
DATABASE_URL="postgresql://game:your_password@172.17.0.1:5432/rungame?schema=public&connection_limit=10"

# NextAuth 密钥（生成新密钥）
NEXTAUTH_SECRET="your-generated-secret-key"

# 管理端 URL（替换为你的域名）
NEXTAUTH_URL="https://admin.yourdomain.com"

# 信任代理（必需）
NEXTAUTH_TRUST_HOST=true
```

#### 3.3 生成 NEXTAUTH_SECRET

```bash
# 使用 openssl 生成随机密钥
openssl rand -base64 32
```

#### 3.4 数据库主机说明

- 如果 PostgreSQL 在同一服务器：使用 `172.17.0.1`（Docker 默认网关）
- 如果在外部服务器：使用实际 IP 地址
- 在 1Panel 中安装的 PostgreSQL：使用 `172.17.0.1` 或容器名称

---

### 4. 首次部署

#### 4.1 使用部署脚本（推荐）

```bash
# 给脚本添加执行权限
chmod +x deploy-admin.sh

# 执行部署
./deploy-admin.sh
```

部署脚本会自动：
- ✅ 检查环境
- ✅ 拉取最新代码
- ✅ 备份现有容器
- ✅ 构建 Docker 镜像
- ✅ 启动容器
- ✅ 执行健康检查

#### 4.2 手动部署

如果不使用脚本，手动执行：

```bash
# 构建并启动
docker-compose -f docker-compose.admin.yml up -d --build

# 查看日志
docker logs -f rungame-admin

# 检查健康状态
curl http://localhost:3001/api/health
```

#### 4.3 初始化数据库

首次部署需要初始化数据库：

```bash
# 进入容器
docker exec -it rungame-admin sh

# 推送数据库 schema
npm run db:push

# 填充初始数据
npm run db:seed

# 退出容器
exit
```

#### 4.4 验证部署

```bash
# 检查容器状态
docker ps --filter name=rungame-admin

# 访问健康检查
curl http://localhost:3001/api/health

# 查看日志
docker logs -f rungame-admin
```

---

### 5. 配置反向代理

#### 5.1 在 1Panel 中配置 Nginx

1. 在 1Panel 中进入 **网站**
2. 点击 **创建网站**
3. 选择 **反向代理**
4. 填写配置：

**基本设置**:
- **域名**: `admin.yourdomain.com`
- **代理地址**: `http://127.0.0.1:3001`

**高级设置** (点击编辑配置文件):

```nginx
server {
    listen 80;
    server_name admin.yourdomain.com;

    # 如果启用了 SSL，将 HTTP 重定向到 HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name admin.yourdomain.com;

    # SSL 证书（1Panel 可自动申请 Let's Encrypt）
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    # SSL 配置
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    # 日志
    access_log /var/log/nginx/admin.yourdomain.com.access.log;
    error_log /var/log/nginx/admin.yourdomain.com.error.log;

    # 反向代理配置
    location / {
        proxy_pass http://127.0.0.1:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;

        # 超时设置
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # 健康检查端点
    location /api/health {
        proxy_pass http://127.0.0.1:3001;
        access_log off;
    }

    # 安全头
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
```

#### 5.2 申请 SSL 证书

在 1Panel 中：
1. 进入 **网站 → SSL 证书**
2. 点击 **申请证书**
3. 选择 **Let's Encrypt**
4. 填写域名和邮箱
5. 自动验证并申请

#### 5.3 配置域名 DNS

在你的域名服务商处添加 A 记录：
```
admin.yourdomain.com → VPS_IP_ADDRESS
```

---

### 6. 配置 GitHub Actions 自动部署

#### 6.1 生成 SSH 密钥

在 VPS 上生成专用于部署的 SSH 密钥：

```bash
# 生成密钥对
ssh-keygen -t ed25519 -C "deploy-key" -f ~/.ssh/deploy_key

# 将公钥添加到 authorized_keys
cat ~/.ssh/deploy_key.pub >> ~/.ssh/authorized_keys

# 复制私钥内容（用于 GitHub Secrets）
cat ~/.ssh/deploy_key
```

#### 6.2 配置 GitHub Secrets

在 GitHub 仓库中：
1. 进入 **Settings → Secrets and variables → Actions**
2. 点击 **New repository secret**
3. 添加以下 secrets：

| 名称 | 值 | 说明 |
|------|-----|------|
| `VPS_HOST` | `your-vps-ip` | VPS IP 地址 |
| `VPS_USERNAME` | `root` | SSH 用户名（或其他用户） |
| `VPS_SSH_KEY` | `私钥内容` | 上一步生成的私钥 |
| `VPS_PORT` | `22` | SSH 端口（可选） |

#### 6.3 测试自动部署

```bash
# 提交代码到 main 分支
git add .
git commit -m "test: trigger auto deployment"
git push origin main
```

在 GitHub 仓库中查看：
1. 进入 **Actions** 标签
2. 查看 **Deploy Admin to VPS** 工作流
3. 检查部署日志

#### 6.4 手动触发部署

在 GitHub Actions 页面：
1. 选择 **Deploy Admin to VPS** 工作流
2. 点击 **Run workflow**
3. 选择分支后点击 **Run workflow**

---

## 运维管理

### 查看日志

```bash
# 实时查看日志
docker logs -f rungame-admin

# 查看最近 100 行
docker logs --tail 100 rungame-admin

# 查看错误日志
docker logs rungame-admin 2>&1 | grep -i error
```

### 重启服务

```bash
# 方式 1: 重启容器
docker restart rungame-admin

# 方式 2: 重新启动
docker-compose -f docker-compose.admin.yml restart

# 方式 3: 完全重建
./deploy-admin.sh
```

### 更新代码

```bash
# 手动更新
cd /opt/1panel/docker/compose/rungame-admin
git pull origin main
./deploy-admin.sh

# 自动更新（通过 GitHub Actions）
# 只需提交代码到 main 分支即可
```

### 数据库管理

```bash
# 备份数据库
docker exec rungame-postgres pg_dump -U game rungame > backup_$(date +%Y%m%d).sql

# 恢复数据库
docker exec -i rungame-postgres psql -U game rungame < backup.sql

# 查看数据库连接
docker exec -it rungame-admin sh
npm run db:studio
```

### 资源监控

```bash
# 查看容器资源使用
docker stats rungame-admin

# 查看磁盘使用
du -sh /opt/1panel/docker/compose/rungame-admin

# 清理未使用的镜像
docker image prune -a
```

---

## 故障排查

### 1. 容器无法启动

**症状**: `docker ps` 中看不到 rungame-admin

**排查步骤**:

```bash
# 查看容器状态
docker ps -a --filter name=rungame-admin

# 查看启动日志
docker logs rungame-admin

# 检查配置
docker-compose -f docker-compose.admin.yml config
```

**常见原因**:
- ❌ 环境变量配置错误
- ❌ 数据库连接失败
- ❌ 端口被占用

### 2. 健康检查失败

**症状**: `curl http://localhost:3001/api/health` 返回错误

**排查步骤**:

```bash
# 检查端口是否监听
netstat -tuln | grep 3001
ss -tuln | grep 3001

# 进入容器检查
docker exec -it rungame-admin sh
curl http://localhost:3001/api/health

# 查看应用日志
docker logs -f rungame-admin
```

**常见原因**:
- ❌ 数据库连接失败（检查 DATABASE_URL）
- ❌ 应用启动失败（查看日志）
- ❌ 端口配置错误

### 3. 数据库连接失败

**症状**: 日志中出现 "Can't reach database server"

**排查步骤**:

```bash
# 测试数据库连接
docker exec -it rungame-postgres psql -U game -d rungame

# 检查网络
docker network inspect bridge

# 从容器内测试
docker exec -it rungame-admin sh
nc -zv 172.17.0.1 5432
```

**解决方案**:
- 使用 `172.17.0.1` 作为数据库主机（Docker 默认网关）
- 或使用 PostgreSQL 容器名称（如果在同一网络）
- 检查数据库是否启动：`docker ps --filter name=postgres`

### 4. GitHub Actions 部署失败

**症状**: Actions 工作流显示失败

**排查步骤**:

1. 检查 GitHub Secrets 是否正确配置
2. 测试 SSH 连接：
   ```bash
   ssh -i ~/.ssh/deploy_key root@your-vps-ip
   ```
3. 查看 Actions 日志中的错误信息
4. 在 VPS 上手动执行部署脚本

**常见原因**:
- ❌ SSH 密钥配置错误
- ❌ VPS 防火墙阻止 SSH
- ❌ 项目目录不存在
- ❌ Git 仓库访问权限问题

### 5. 反向代理 502 错误

**症状**: 访问域名返回 502 Bad Gateway

**排查步骤**:

```bash
# 检查容器是否运行
docker ps --filter name=rungame-admin

# 检查端口是否监听
curl http://localhost:3001/api/health

# 检查 Nginx 配置
nginx -t

# 查看 Nginx 错误日志
tail -f /var/log/nginx/error.log
```

**解决方案**:
- 确保容器正在运行
- 确保端口 3001 可访问
- 检查 Nginx proxy_pass 配置是否正确

### 6. 内存不足

**症状**: 容器频繁重启，日志显示 OOM

**排查步骤**:

```bash
# 查看系统内存
free -h

# 查看容器内存限制
docker inspect rungame-admin | grep -i memory

# 添加内存限制
docker-compose -f docker-compose.admin.yml down
# 编辑 docker-compose.admin.yml，添加:
# mem_limit: 1g
docker-compose -f docker-compose.admin.yml up -d
```

---

## 安全建议

### 1. 防火墙配置

```bash
# 仅允许必要端口
ufw allow 22/tcp    # SSH
ufw allow 80/tcp    # HTTP
ufw allow 443/tcp   # HTTPS
ufw allow 9999/tcp  # 1Panel（如需远程访问）
ufw enable
```

### 2. 定期更新

```bash
# 系统更新
apt update && apt upgrade -y

# Docker 更新
apt install docker-ce docker-ce-cli containerd.io

# 应用更新（通过 GitHub Actions 自动）
```

### 3. 备份策略

- **数据库**: 每日自动备份
- **代码**: GitHub 仓库托管
- **配置**: 版本控制 `.env` 文件（不提交到 Git）
- **镜像**: 保留最近 5 个版本

### 4. 监控告警

- 使用 1Panel 内置监控
- 配置磁盘空间告警
- 配置容器状态监控
- 配置 SSL 证书过期提醒

---

## 相关资源

- [1Panel 官方文档](https://1panel.cn/docs/)
- [Docker 文档](https://docs.docker.com/)
- [Next.js 部署指南](https://nextjs.org/docs/deployment)
- [GitHub Actions 文档](https://docs.github.com/en/actions)

---

## 获取帮助

如遇到问题：
1. 查看本文档的[故障排查](#故障排查)部分
2. 查看应用日志：`docker logs -f rungame-admin`
3. 在 GitHub Issues 提交问题

---

**文档版本**: v1.0
**最后更新**: 2025-01-14
