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

## 3. 构建 Docker 镜像

使用根目录下的 `Dockerfile.admin` 进行构建：

```bash
# 构建镜像，命名为 rungame-admin
docker build -f Dockerfile.admin -t rungame-admin .
```

*注意：构建过程会自动处理依赖修剪和安装，可能需要几分钟时间。*

## 4. 运行容器

```bash
# 启动容器，映射端口 4000
docker run -d \
  --name rungame-admin \
  -p 4000:4000 \
  --env-file .env \
  rungame-admin
```

## 5. 验证

访问 `http://your-server-ip:4000` 查看是否成功启动。
可以使用 `docker logs -f rungame-admin` 查看运行日志。
