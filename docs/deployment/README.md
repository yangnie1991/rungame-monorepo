# Admin 端 Docker 部署指南

此压缩包包含构建 RunGame Admin 管理端所需的所有源文件。由于本项目采用 Monorepo 架构（Turborepo），构建 Admin 端需要根目录下的共享配置和依赖包。

## 1. 解压文件

上传 `admin-source.tar.gz` 到服务器，然后直接解压：

```bash
# 解压 (会自动创建一个 rungame-admin-source 目录)
tar -xzf admin-source.tar.gz

# 进入目录
# 进入目录
# 进入目录
cd rungame-admin-source
```

## 🚨 低配置服务器特别说明 (2GB 内存)

您的服务器只有 2GB 内存，这对于 **运行** 应用是足够的，但对于 **构建** (Build) 应用往往是不够的（Node.js 编译非常耗内存）。

如果遇到构建卡死，请务必选择以下 **两种方案之一**：

### 方案 1: 开启 Swap (推荐 - 最简单)

通过使用硬盘作为虚拟内存，让 2GB 内存也能完成构建。

```bash
# 1. 创建 2GB Swap 分区
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile

# 2. 验证 (确保 Swap 行显示 2.0G)
free -h

# 3. 然后正常执行部署命令
docker-compose -f docker-compose.admin.yml up -d --build
```

### 方案 2: 本地构建 + 上传镜像 (彻底解决)

利用您本地电脑的强大性能进行构建，只把结果上传到服务器。

**第一步：本地构建 (在您的 Mac/PC 上)**
```bash
# 1. 确保安装了 Docker Desktop
# 2. 构建 Linux 镜像 (注意 --platform linux/amd64)
docker buildx build --platform linux/amd64 -f Dockerfile.admin -t rungame-admin:latest .

# 3. 导出为压缩文件
docker save rungame-admin:latest | gzip > admin-image.tar.gz
```

**第二步：上传 & 加载 (在服务器上)**
```bash
# 1. 上传 admin-image.tar.gz 到服务器

# 2. 加载镜像
docker load < admin-image.tar.gz

# 3. 启动 (修改 docker-compose.admin.yml 注释掉 build 部分)
# 或者直接运行:
docker-compose -f docker-compose.admin.yml up -d
```

---

## 2. 准备环境变量

## 2. 准备环境变量

在服务器上创建一个 `.env` 文件，填入必要的环境变量。你可以参考 `.env.example`。

```bash
cp .env.example .env
vi .env
```

确保包含以下关键变量（根据你的实际配置修改）：

```env
DATABASE_URL="postgresql://user:password@host:5432/rungame?schema=public"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://your-server-ip:4000"
ENCRYPTION_KEY="your-encryption-key"
```

## 3. 启动服务 (推荐使用 Docker Compose)

项目已内置 `docker-compose.admin.yml`，可一键构建并启动。

### 方式 A: 新版 Docker (推荐)

```bash
# 构建并启动 (后台运行)
docker compose -f docker-compose.admin.yml up -d --build
```

### 方式 B: 旧版 Docker (如果不识别 `docker compose`)

旧版 `docker-compose` 命令不支持 `up` 时直接带 `--no-cache` 参数，需要分两步走：

```bash
# 1. 强制无缓存构建 (确保获取最新代码和配置)
docker-compose -f docker-compose.admin.yml build --no-cache

# 2. 启动服务
docker-compose -f docker-compose.admin.yml up -d
```

### 常用管理命令

```bash
# 查看日志
docker compose -f docker-compose.admin.yml logs -f
# 或
docker-compose -f docker-compose.admin.yml logs -f

# 重启服务
docker compose -f docker-compose.admin.yml restart
# 或
docker-compose -f docker-compose.admin.yml restart

# 停止服务
docker compose -f docker-compose.admin.yml down
# 或
docker-compose -f docker-compose.admin.yml down
```

## 4. 验证

访问 `http://your-server-ip:4000/admin` 查看是否成功启动。
*默认账号/密码请查看数据库 seed 数据或自行注册。*

---

### (可选) 传统 Docker 方式

如果你不使用 docker-compose，可以使用以下命令手动构建和运行：

```bash
# 1. 构建镜像
docker build -f Dockerfile.admin -t rungame-admin .

# 2. 运行容器
docker run -d \
  --name rungame-admin \
  --restart always \
  -p 4000:4000 \
  --env-file .env \
  rungame-admin
```

