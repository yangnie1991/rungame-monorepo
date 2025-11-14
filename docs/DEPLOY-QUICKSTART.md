# 管理端部署 - 快速开始

> 这是一个简化的快速开始指南。完整文档请参考 [DEPLOY-ADMIN.md](./DEPLOY-ADMIN.md)

## ⚡ 5 分钟快速部署

### 前提条件
- ✅ VPS 已安装 1Panel
- ✅ 已安装 PostgreSQL 数据库
- ✅ 有 GitHub 仓库访问权限

---

## 📝 步骤 1: 在 1Panel 中创建项目

1. 登录 1Panel 面板
2. **容器 → 编排 → 创建**
3. 填写：
   - 名称: `rungame-admin`
   - 路径: `/opt/1panel/docker/compose/rungame-admin`

---

## 📦 步骤 2: 克隆代码

SSH 连接到 VPS：

```bash
cd /opt/1panel/docker/compose/rungame-admin
git clone https://github.com/yourusername/rungame-nextjs.git .
```

---

## ⚙️ 步骤 3: 配置环境变量

```bash
# 复制示例文件
cp .env.admin.example .env

# 编辑配置
nano .env
```

**必需修改的配置**:

```env
# 1. 数据库连接（使用你的实际配置）
DATABASE_URL="postgresql://game:密码@172.17.0.1:5432/rungame?schema=public"

# 2. 生成密钥（执行: openssl rand -base64 32）
NEXTAUTH_SECRET="你生成的密钥"

# 3. 管理端 URL（使用你的域名）
NEXTAUTH_URL="https://admin.yourdomain.com"

# 4. 信任代理（必需）
NEXTAUTH_TRUST_HOST=true
```

---

## 🚀 步骤 4: 首次部署

```bash
# 给脚本添加执行权限
chmod +x deploy-admin.sh

# 执行部署
./deploy-admin.sh
```

等待 2-3 分钟，脚本会自动：
- ✅ 构建 Docker 镜像
- ✅ 启动容器
- ✅ 执行健康检查

---

## 🗄️ 步骤 5: 初始化数据库

```bash
# 进入容器
docker exec -it rungame-admin sh

# 推送数据库结构
npm run db:push

# 填充初始数据（创建管理员账户）
npm run db:seed

# 退出
exit
```

**默认管理员账户**:
- 邮箱: `admin@rungame.online`
- 密码: `admin123`
- ⚠️ 登录后请立即修改密码！

---

## 🌐 步骤 6: 配置域名访问

### 在 1Panel 中配置反向代理

1. **网站 → 创建网站 → 反向代理**
2. 填写：
   - 域名: `admin.yourdomain.com`
   - 代理地址: `http://127.0.0.1:3001`
3. **SSL 证书 → 申请 Let's Encrypt**

### 配置 DNS

在域名服务商添加 A 记录：
```
admin.yourdomain.com → 你的VPS_IP
```

等待 DNS 生效（通常 5-10 分钟）

---

## 🔄 步骤 7: 配置自动部署（可选）

### 7.1 生成 SSH 密钥

在 VPS 上：

```bash
ssh-keygen -t ed25519 -C "deploy-key" -f ~/.ssh/deploy_key
cat ~/.ssh/deploy_key.pub >> ~/.ssh/authorized_keys
cat ~/.ssh/deploy_key  # 复制私钥内容
```

### 7.2 配置 GitHub Secrets

在 GitHub 仓库中：
**Settings → Secrets and variables → Actions → New repository secret**

添加 4 个 secrets：

| 名称 | 值 |
|------|-----|
| `VPS_HOST` | VPS IP 地址 |
| `VPS_USERNAME` | `root` |
| `VPS_SSH_KEY` | 上面复制的私钥内容 |
| `VPS_PORT` | `22` |

### 7.3 测试自动部署

```bash
git add .
git commit -m "test: auto deploy"
git push origin main
```

在 GitHub **Actions** 标签查看部署进度。

---

## ✅ 验证部署

### 检查服务状态

```bash
# 查看容器
docker ps --filter name=rungame-admin

# 健康检查
curl http://localhost:3001/api/health

# 查看日志
docker logs -f rungame-admin
```

### 访问管理端

1. 浏览器打开: `https://admin.yourdomain.com`
2. 使用默认账户登录
3. 修改管理员密码

---

## 🎯 日常使用

### 重启服务
```bash
docker restart rungame-admin
```

### 查看日志
```bash
docker logs -f rungame-admin
```

### 手动更新
```bash
cd /opt/1panel/docker/compose/rungame-admin
git pull origin main
./deploy-admin.sh
```

### 自动更新
提交代码到 `main` 分支即可自动部署！

---

## 🆘 遇到问题？

### 容器无法启动
```bash
# 查看错误日志
docker logs rungame-admin

# 检查配置
docker-compose -f docker-compose.admin.yml config
```

### 数据库连接失败
- 检查 `.env` 中的 `DATABASE_URL` 是否正确
- 确认 PostgreSQL 容器正在运行：`docker ps | grep postgres`
- 使用 `172.17.0.1` 作为数据库主机

### 502 Bad Gateway
- 确认容器正在运行：`docker ps`
- 测试本地访问：`curl http://localhost:3001/api/health`
- 检查 Nginx 配置

### 更多帮助
查看完整文档：[DEPLOY-ADMIN.md](./DEPLOY-ADMIN.md)

---

## 📚 相关文档

- [完整部署指南](./DEPLOY-ADMIN.md) - 详细的部署文档
- [数据库配置](./DATABASE.md) - 数据库架构和配置
- [项目架构](./ARCHITECTURE.md) - 技术架构说明

---

**恭喜！🎉 你的管理端已成功部署！**

现在可以开始管理你的游戏内容了。记得定期备份数据库！
