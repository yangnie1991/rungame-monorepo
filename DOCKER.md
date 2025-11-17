# Docker 部署指南

本文档说明如何使用 Docker 部署 RunGame Monorepo 项目。

## 📋 目录

- [快速开始](#快速开始)
- [配置文件说明](#配置文件说明)
- [构建镜像](#构建镜像)
- [运行容器](#运行容器)
- [生产部署](#生产部署)
- [故障排查](#故障排查)

---

## 🚀 快速开始

### 1. 准备环境变量

```bash
# 复制示例配置
cp .env.example .env

# 编辑 .env 文件，设置必要的环境变量
# DATABASE_URL=postgresql://...
# NEXTAUTH_SECRET=...
# NEXTAUTH_URL=http://localhost:3001
```

### 2. 使用 Makefile（推荐）

```bash
# 查看所有可用命令
make help

# 构建并启动 Admin 应用
make build-admin
make start-admin

# 构建并启动 Website 应用
make build-website
make start-website

# 或者一次性启动所有应用
make build-all
make start-all
```

### 3. 访问应用

- **Admin**: http://localhost:3001
- **Website**: http://localhost:3000

---

## 📁 配置文件说明

### Docker 相关文件

```
rungame-monorepo/
├── Dockerfile.admin           # Admin 应用 Dockerfile
├── Dockerfile.website         # Website 应用 Dockerfile
├── .dockerignore             # Admin 专用（排除 website）
├── .dockerignore.website     # Website 专用（排除 admin）
├── Makefile                  # Docker 管理命令
└── DOCKER.md                 # 本文档
```

### Dockerfile 架构

两个 Dockerfile 都采用 **4 阶段构建**，基于 Next.js 官方最佳实践：

1. **base** - 基础镜像 (`node:20-alpine`)
2. **deps** - 安装依赖
3. **builder** - 构建应用（生成 standalone 输出）
4. **runner** - 最小化运行时镜像

### 关键优化

✅ **Standalone 输出**: `output: 'standalone'` in next.config.ts
✅ **最小化镜像**: 仅复制必要文件 (~100MB vs ~500MB)
✅ **非 root 用户**: 安全性最佳实践
✅ **健康检查**: 自动容器健康监控
✅ **Monorepo 支持**: 正确处理 workspace 依赖

---

## 🔨 构建镜像

### 方式 1: 使用 Makefile（推荐）

```bash
# 构建 Admin
make build-admin

# 构建 Website
make build-website

# 构建所有应用
make build-all
```

### 方式 2: 直接使用 Docker 命令

#### 构建 Admin

```bash
docker build \
  --file Dockerfile.admin \
  --build-arg DATABASE_URL="${DATABASE_URL}" \
  --build-arg NEXTAUTH_SECRET="${NEXTAUTH_SECRET}" \
  --build-arg NEXTAUTH_URL="http://localhost:3001" \
  --tag rungame-admin:latest \
  .
```

#### 构建 Website

```bash
docker build \
  --file Dockerfile.website \
  --build-arg DATABASE_URL="${DATABASE_URL}" \
  --tag rungame-website:latest \
  .
```

### 构建参数说明

| 参数 | 说明 | 必需 |
|------|------|------|
| `DATABASE_URL` | PostgreSQL 连接字符串 | ✅ |
| `NEXTAUTH_SECRET` | NextAuth 密钥（仅 Admin） | ✅ |
| `NEXTAUTH_URL` | NextAuth 回调 URL（仅 Admin） | ✅ |
| `NODE_ENV` | 环境模式（默认 production） | ❌ |

---

## 🚢 运行容器

### 方式 1: 使用 Makefile（推荐）

```bash
# 启动 Admin（端口 3001）
make start-admin

# 启动 Website（端口 3000）
make start-website

# 启动所有应用
make start-all

# 查看日志
make logs-admin
make logs-website

# 停止容器
make stop-admin
make stop-website
make stop-all
```

### 方式 2: 直接使用 Docker 命令

#### 运行 Admin

```bash
docker run -d \
  --name rungame-admin \
  --restart unless-stopped \
  -p 3001:3001 \
  --env-file .env \
  -e PORT=3001 \
  rungame-admin:latest
```

#### 运行 Website

```bash
docker run -d \
  --name rungame-website \
  --restart unless-stopped \
  -p 3000:3000 \
  --env-file .env \
  -e PORT=3000 \
  rungame-website:latest
```

### 容器管理命令

```bash
# 查看运行中的容器
docker ps

# 查看容器日志
docker logs -f rungame-admin
docker logs -f rungame-website

# 停止容器
docker stop rungame-admin rungame-website

# 删除容器
docker rm rungame-admin rungame-website

# 查看容器健康状态
docker inspect --format='{{.State.Health.Status}}' rungame-admin
```

---

## 🌐 生产部署

### 环境变量配置

生产环境建议使用 **secrets** 管理敏感信息：

```bash
# 不要在 .env 文件中存储生产密钥
# 使用环境变量或 Docker secrets

docker run -d \
  --name rungame-admin \
  -p 3001:3001 \
  -e DATABASE_URL="postgresql://..." \
  -e NEXTAUTH_SECRET="$(cat /run/secrets/nextauth_secret)" \
  -e NEXTAUTH_URL="https://admin.yourdomain.com" \
  rungame-admin:latest
```

### 使用 Docker Compose（生产推荐）

创建 `docker-compose.prod.yml`:

```yaml
version: '3.8'

services:
  admin:
    image: rungame-admin:latest
    container_name: rungame-admin
    restart: unless-stopped
    ports:
      - "3001:3001"
    environment:
      - NODE_ENV=production
      - PORT=3001
      - DATABASE_URL=${DATABASE_URL}
      - NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
      - NEXTAUTH_URL=${NEXTAUTH_URL}
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3001/api/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
    networks:
      - rungame-network

  website:
    image: rungame-website:latest
    container_name: rungame-website
    restart: unless-stopped
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - PORT=3000
      - DATABASE_URL=${DATABASE_URL}
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
    networks:
      - rungame-network

  db:
    image: postgres:16-alpine
    container_name: rungame-db
    restart: unless-stopped
    environment:
      - POSTGRES_DB=game
      - POSTGRES_USER=${DB_USER}
      - POSTGRES_PASSWORD=${DB_PASSWORD}
    volumes:
      - postgres-data:/var/lib/postgresql/data
    networks:
      - rungame-network

networks:
  rungame-network:
    driver: bridge

volumes:
  postgres-data:
```

启动：

```bash
docker-compose -f docker-compose.prod.yml up -d
```

### Nginx 反向代理

```nginx
# /etc/nginx/sites-available/rungame

# Admin
server {
    listen 80;
    server_name admin.yourdomain.com;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

# Website
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

---

## 🔍 故障排查

### 常见问题

#### 1. 构建失败

```bash
# 查看详细构建日志
docker build --no-cache --progress=plain -f Dockerfile.admin -t rungame-admin:latest .

# 检查 .env 文件
cat .env

# 验证数据库连接
docker run --rm -it \
  -e DATABASE_URL="${DATABASE_URL}" \
  node:20-alpine \
  sh -c "npm install -g prisma && prisma db pull"
```

#### 2. 容器无法启动

```bash
# 查看容器日志
docker logs rungame-admin

# 进入容器调试
docker exec -it rungame-admin sh

# 检查健康状态
docker inspect rungame-admin | grep -A 10 Health
```

#### 3. 端口已被占用

```bash
# 查找占用端口的进程
lsof -i :3001
lsof -i :3000

# 或使用不同端口
docker run -p 4001:3001 rungame-admin:latest
```

#### 4. 数据库连接失败

```bash
# 检查数据库是否可访问
docker run --rm -it \
  postgres:16-alpine \
  psql "${DATABASE_URL}"

# 检查容器网络
docker network inspect bridge
```

### 性能优化

#### 查看镜像大小

```bash
docker images | grep rungame

# 预期大小:
# rungame-admin:latest    ~100-120MB
# rungame-website:latest  ~100-120MB
```

#### 监控资源使用

```bash
# 实时监控
docker stats rungame-admin rungame-website

# 预期资源占用:
# CPU: 0-5%（空闲时）
# 内存: ~120MB（每个容器）
```

---

## 📊 性能对比

| 指标 | 优化前 | 优化后 | 改进 |
|------|--------|--------|------|
| 镜像大小 | ~450MB | ~120MB | -73% |
| 启动时间 | ~3-4s | ~1-2s | -50% |
| 内存占用 | ~200MB | ~120MB | -40% |
| 构建时间 | ~10min | ~8min | -20% |

---

## 🔗 相关文档

- [Next.js Docker 部署指南](https://nextjs.org/docs/app/building-your-application/deploying#docker-image)
- [Next.js with-docker 示例](https://github.com/vercel/next.js/tree/canary/examples/with-docker)
- [Next.js with-docker-multi-env 示例](https://github.com/vercel/next.js/tree/canary/examples/with-docker-multi-env)
- [Docker 最佳实践](https://docs.docker.com/develop/dev-best-practices/)

---

## 📝 更新日志

### 2025-11-15

- 🔥 启用 Standalone 输出模式
- 🔥 使用 `node server.js` 替代 `npm start`
- ✅ 简化系统依赖（移除 python3 make g++）
- ✅ 优化镜像大小（减少 73%）
- ✅ 添加完整的 Makefile 支持
- ✅ 创建 Website Dockerfile
- ✅ 完善健康检查配置

---

**Made with ❤️ based on Next.js official Docker examples**
