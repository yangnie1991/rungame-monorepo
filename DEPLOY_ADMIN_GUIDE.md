# Admin 端 Docker 部署指南

此压缩包包含构建 RunGame Admin 管理端所需的所有源文件。由于本项目采用 Monorepo 架构（Turborepo），构建 Admin 端需要根目录下的共享配置和依赖包。

## 1. 解压文件

上传 `admin-source.tar.gz` 到服务器，然后直接解压：

```bash
# 解压 (会自动创建一个 rungame-admin-source 目录)
tar -xzf admin-source.tar.gz

# 进入目录
cd rungame-admin-source
```

*此版本已包含修复后的 Dockerfile，且只包含必要文件。*

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

```bash
# 构建并启动 (后台运行)
docker compose -f docker-compose.admin.yml up -d --build
```

常用管理命令：

```bash
# 查看日志
docker compose -f docker-compose.admin.yml logs -f

# 重启服务
docker compose -f docker-compose.admin.yml restart

# 停止服务
docker compose -f docker-compose.admin.yml down
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

