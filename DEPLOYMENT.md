# RunGame 管理端部署方案

完整的 Docker 容器化部署方案，支持 1Panel 面板管理和 GitHub Actions 自动部署。

## 📦 部署文件清单

### 核心配置文件
| 文件 | 说明 |
|------|------|
| [Dockerfile.admin](./Dockerfile.admin) | 管理端 Docker 镜像构建配置 |
| [docker-compose.admin.yml](./docker-compose.admin.yml) | Docker Compose 编排配置 |
| [.dockerignore](./.dockerignore) | Docker 构建排除文件 |
| [.env.admin.example](./.env.admin.example) | 环境变量配置模板 |
| [deploy-admin.sh](./deploy-admin.sh) | 自动化部署脚本 |

### GitHub Actions
| 文件 | 说明 |
|------|------|
| [.github/workflows/deploy-admin.yml](./.github/workflows/deploy-admin.yml) | 自动部署工作流 |

### 健康检查
| 文件 | 说明 |
|------|------|
| [apps/admin/app/api/health/route.ts](./apps/admin/app/api/health/route.ts) | 健康检查 API 端点 |

### 文档
| 文件 | 说明 |
|------|------|
| [docs/DEPLOY-QUICKSTART.md](./docs/DEPLOY-QUICKSTART.md) | ⚡ **快速开始**（5 分钟部署） |
| [docs/DEPLOY-ADMIN.md](./docs/DEPLOY-ADMIN.md) | 📖 完整部署指南 |
| [docs/DEPLOY-CHECKLIST.md](./docs/DEPLOY-CHECKLIST.md) | ✅ 部署检查清单 |

---

## 🚀 快速开始

### 选择你的部署方式

#### 方式 1: 使用 1Panel + 部署脚本（推荐）

**适合**: 有 1Panel 面板的用户，最简单快捷

```bash
# 1. 克隆代码
cd /opt/1panel/docker/compose/rungame-admin
git clone https://github.com/yourusername/rungame-nextjs.git .

# 2. 配置环境
cp .env.admin.example .env
nano .env  # 修改配置

# 3. 一键部署
chmod +x deploy-admin.sh
./deploy-admin.sh
```

**详细步骤**: 👉 [docs/DEPLOY-QUICKSTART.md](./docs/DEPLOY-QUICKSTART.md)

---

#### 方式 2: GitHub Actions 自动部署

**适合**: 需要 CI/CD 流程的团队

1. 在 VPS 上初始部署（使用方式 1）
2. 配置 GitHub Secrets（SSH 密钥）
3. 提交代码到 `main` 分支自动部署

**详细步骤**: 👉 [docs/DEPLOY-ADMIN.md#6-配置-github-actions-自动部署](./docs/DEPLOY-ADMIN.md#6-配置-github-actions-自动部署)

---

#### 方式 3: 手动 Docker Compose

**适合**: 熟悉 Docker 的开发者

```bash
# 1. 配置环境变量
cp .env.admin.example .env
nano .env

# 2. 构建并启动
docker-compose -f docker-compose.admin.yml up -d --build

# 3. 初始化数据库
docker exec -it rungame-admin sh
npm run db:push && npm run db:seed
```

---

## 📋 部署前准备

### 最低要求
- ✅ VPS（2GB+ 内存，20GB+ 磁盘）
- ✅ 1Panel 面板（可选但推荐）
- ✅ PostgreSQL 数据库
- ✅ 域名（用于 HTTPS 访问）

### 需要准备的信息
- 📝 数据库连接信息（主机、端口、用户名、密码）
- 📝 域名（如 admin.yourdomain.com）
- 📝 VPS IP 地址
- 📝 SSH 访问凭证

---

## 🎯 部署流程

### 标准部署流程（15-20 分钟）

```
1. VPS 环境准备
   ├── 安装 1Panel
   ├── 安装 PostgreSQL
   └── 配置防火墙

2. 项目部署
   ├── 创建项目目录
   ├── 克隆代码
   ├── 配置环境变量
   └── 执行部署脚本

3. 数据库初始化
   ├── 推送 schema
   └── 填充初始数据

4. 域名配置
   ├── 配置 DNS
   ├── 设置反向代理
   └── 申请 SSL 证书

5. 自动部署配置（可选）
   ├── 生成 SSH 密钥
   ├── 配置 GitHub Secrets
   └── 测试自动部署
```

使用清单跟踪进度：👉 [docs/DEPLOY-CHECKLIST.md](./docs/DEPLOY-CHECKLIST.md)

---

## 🔧 核心功能说明

### 1. 多阶段 Docker 构建

[Dockerfile.admin](./Dockerfile.admin) 使用多阶段构建优化镜像大小：

- **Stage 1 (deps)**: 安装依赖
- **Stage 2 (builder)**: 构建应用
- **Stage 3 (runner)**: 生产运行时

**优势**:
- ✅ 镜像体积小（仅包含运行时必需文件）
- ✅ 构建速度快（利用 Docker 缓存层）
- ✅ 安全性高（非 root 用户运行）

### 2. 健康检查

[apps/admin/app/api/health/route.ts](./apps/admin/app/api/health/route.ts) 提供：

```bash
# 检查服务状态
curl http://localhost:3001/api/health

# 返回示例
{
  "status": "ok",
  "timestamp": "2025-01-14T10:30:00.000Z",
  "service": "rungame-admin",
  "database": "connected",
  "version": "1.0.0"
}
```

**用途**:
- ✅ Docker 容器健康检查
- ✅ 负载均衡器健康探测
- ✅ 监控告警系统

### 3. 自动化部署脚本

[deploy-admin.sh](./deploy-admin.sh) 自动执行：

1. ✅ 环境检查
2. ✅ 代码更新
3. ✅ 容器备份
4. ✅ 镜像构建
5. ✅ 服务重启
6. ✅ 健康检查
7. ✅ 清理旧备份

**特性**:
- 🔄 自动备份最近 5 个版本
- 🚨 失败时提供详细错误信息
- 📊 彩色日志输出

### 4. GitHub Actions 自动部署

[.github/workflows/deploy-admin.yml](./.github/workflows/deploy-admin.yml) 实现：

- 🎯 监听 `main` 分支推送
- 🎯 监听管理端相关文件变更
- 🎯 支持手动触发
- 🎯 SSH 连接 VPS 执行部署

**触发条件**:
```yaml
paths:
  - 'apps/admin/**'
  - 'packages/database/**'
  - 'Dockerfile.admin'
  - 'docker-compose.admin.yml'
```

---

## 🏗️ 架构说明

### Docker 网络架构

```
Internet
    ↓
┌─────────────────────────────┐
│  Nginx (1Panel)             │
│  - 反向代理                  │
│  - SSL 终止                  │
│  - 443 → 3001               │
└─────────────────────────────┘
    ↓
┌─────────────────────────────┐
│  rungame-admin (容器)        │
│  - Next.js App (3001)       │
│  - Node.js 20               │
│  - 非 root 用户运行          │
└─────────────────────────────┘
    ↓
┌─────────────────────────────┐
│  PostgreSQL                  │
│  - 172.17.0.1:5432          │
│  - 或独立服务器              │
└─────────────────────────────┘
```

### Monorepo 结构

```
rungame-nextjs/
├── apps/
│   ├── admin/          # 管理端（3001）
│   └── website/        # 用户端（3000）
├── packages/
│   └── database/       # 共享 Prisma 客户端
├── Dockerfile.admin    # 管理端镜像
├── docker-compose.admin.yml
└── deploy-admin.sh
```

---

## 🔐 安全最佳实践

### 环境变量安全
- ❌ **不要**将 `.env` 提交到 Git
- ✅ 使用 `.env.admin.example` 作为模板
- ✅ 定期轮换 `NEXTAUTH_SECRET`
- ✅ 使用强密码（数据库、管理员账户）

### 容器安全
- ✅ 非 root 用户运行（nextjs:nodejs）
- ✅ 最小化镜像（Alpine Linux）
- ✅ 只暴露必要端口（3001）
- ✅ 定期更新基础镜像

### 网络安全
- ✅ 启用防火墙（UFW）
- ✅ 使用 HTTPS（Let's Encrypt）
- ✅ 配置 Nginx 安全头
- ✅ SSH 密钥认证（禁用密码登录）

### 数据库安全
- ✅ 使用连接池（限制连接数）
- ✅ 定期备份数据库
- ✅ 限制数据库网络访问
- ✅ 使用强密码

---

## 📊 运维管理

### 日常操作

```bash
# 查看服务状态
docker ps --filter name=rungame-admin

# 查看日志
docker logs -f rungame-admin

# 重启服务
docker restart rungame-admin

# 进入容器
docker exec -it rungame-admin sh

# 查看资源使用
docker stats rungame-admin
```

### 更新流程

**方式 1: 自动更新（推荐）**
```bash
# 只需提交代码到 main 分支
git push origin main
# GitHub Actions 自动部署
```

**方式 2: 手动更新**
```bash
cd /opt/1panel/docker/compose/rungame-admin
git pull origin main
./deploy-admin.sh
```

### 备份与恢复

**数据库备份**:
```bash
# 备份
docker exec rungame-postgres pg_dump -U game rungame > backup_$(date +%Y%m%d).sql

# 恢复
docker exec -i rungame-postgres psql -U game rungame < backup.sql
```

**容器镜像备份**:
```bash
# 自动备份（deploy-admin.sh 自动执行）
docker commit rungame-admin rungame-admin:backup-$(date +%Y%m%d)

# 保存到文件
docker save -o admin-backup.tar rungame-admin:backup-20250114
```

---

## 🐛 故障排查

### 常见问题

| 问题 | 排查步骤 | 解决方案 |
|------|----------|----------|
| 容器无法启动 | `docker logs rungame-admin` | 检查环境变量配置 |
| 数据库连接失败 | 测试 `nc -zv 172.17.0.1 5432` | 使用正确的数据库主机 |
| 502 Bad Gateway | `curl http://localhost:3001/api/health` | 确保容器正在运行 |
| GitHub Actions 失败 | 查看 Actions 日志 | 检查 SSH 密钥和 Secrets |

**详细故障排查**: 👉 [docs/DEPLOY-ADMIN.md#故障排查](./docs/DEPLOY-ADMIN.md#故障排查)

---

## 📚 相关文档

### 部署相关
- [DEPLOY-QUICKSTART.md](./docs/DEPLOY-QUICKSTART.md) - 5 分钟快速部署
- [DEPLOY-ADMIN.md](./docs/DEPLOY-ADMIN.md) - 完整部署指南
- [DEPLOY-CHECKLIST.md](./docs/DEPLOY-CHECKLIST.md) - 部署检查清单

### 项目文档
- [README.md](./README.md) - 项目概述
- [CLAUDE.md](./CLAUDE.md) - 开发指南
- [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) - 架构文档
- [docs/DATABASE.md](./docs/DATABASE.md) - 数据库文档

---

## 🎓 学习资源

- [1Panel 官方文档](https://1panel.cn/docs/)
- [Docker 最佳实践](https://docs.docker.com/develop/dev-best-practices/)
- [Next.js 部署](https://nextjs.org/docs/deployment)
- [GitHub Actions](https://docs.github.com/en/actions)

---

## 💡 提示

- 💾 **备份**: 部署前务必备份数据库
- 🔑 **密钥**: 首次登录后立即修改默认密码
- 📊 **监控**: 使用 1Panel 监控容器状态
- 🔄 **更新**: 定期更新依赖和系统补丁
- 📖 **日志**: 定期检查应用日志

---

## 🆘 获取帮助

- 📖 查看完整文档
- 🐛 [提交 Issue](https://github.com/yourusername/rungame-nextjs/issues)
- 💬 联系技术支持

---

**部署方案版本**: v1.0
**最后更新**: 2025-01-14
**维护者**: RunGame Team
