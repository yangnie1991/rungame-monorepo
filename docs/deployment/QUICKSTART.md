# 🚀 管理端快速部署卡片

> 5 分钟快速部署指南 - 适合有 1Panel 的用户

## 📝 准备工作

### 需要准备的信息
```
✅ VPS IP: _________________
✅ PostgreSQL 主机: 172.17.0.1（或其他）
✅ 数据库名: _________________
✅ 数据库用户: _________________
✅ 数据库密码: _________________
✅ 管理域名: admin.yourdomain.com
```

---

## ⚡ 5 个步骤部署

### 1️⃣ 创建项目（在 1Panel 中）
```
容器 → 编排 → 创建
名称: rungame-admin
路径: /opt/1panel/docker/compose/rungame-admin
```

### 2️⃣ 克隆代码（SSH 到 VPS）
```bash
cd /opt/1panel/docker/compose/rungame-admin
git clone https://github.com/你的用户名/rungame-nextjs.git .
```

### 3️⃣ 配置环境
```bash
cp .env.admin.example .env
nano .env
```

修改这 4 项：
```env
DATABASE_URL="postgresql://用户:密码@172.17.0.1:5432/数据库?schema=public"
NEXTAUTH_SECRET="$(openssl rand -base64 32)"  # 生成密钥
NEXTAUTH_URL="https://admin.yourdomain.com"
NEXTAUTH_TRUST_HOST=true
```

### 4️⃣ 一键部署
```bash
chmod +x deploy-admin.sh
./deploy-admin.sh
```

等待 2-3 分钟... ☕

### 5️⃣ 初始化数据库
```bash
docker exec -it rungame-admin sh
npm run db:push && npm run db:seed
exit
```

---

## 🌐 配置域名（在 1Panel 中）

```
网站 → 创建网站 → 反向代理
域名: admin.yourdomain.com
代理: http://127.0.0.1:3001

SSL 证书 → 申请 Let's Encrypt
```

在域名服务商添加 DNS：
```
A 记录: admin.yourdomain.com → VPS_IP
```

---

## ✅ 验证部署

```bash
# 检查容器
docker ps --filter name=rungame-admin

# 健康检查
curl http://localhost:3001/api/health

# 访问管理端
https://admin.yourdomain.com
```

**默认账户**:
- 邮箱: `admin@rungame.online`
- 密码: `admin123`
- ⚠️ 登录后立即修改！

---

## 🔄 配置自动部署（可选）

### 生成 SSH 密钥
```bash
ssh-keygen -t ed25519 -C "deploy-key" -f ~/.ssh/deploy_key
cat ~/.ssh/deploy_key.pub >> ~/.ssh/authorized_keys
cat ~/.ssh/deploy_key  # 复制私钥
```

### GitHub Secrets
```
Settings → Secrets → Actions → New secret

VPS_HOST: VPS_IP
VPS_USERNAME: root
VPS_SSH_KEY: 上面复制的私钥
VPS_PORT: 22
```

### 测试
```bash
git push origin main
# 在 GitHub Actions 查看部署进度
```

---

## 📋 常用命令

```bash
# 查看日志
docker logs -f rungame-admin

# 重启服务
docker restart rungame-admin

# 手动更新
cd /opt/1panel/docker/compose/rungame-admin
git pull && ./deploy-admin.sh

# 备份数据库
docker exec rungame-postgres pg_dump -U game rungame > backup.sql
```

---

## 🆘 遇到问题？

| 问题 | 解决方法 |
|------|----------|
| 容器启动失败 | `docker logs rungame-admin` 查看错误 |
| 数据库连接失败 | 检查 `.env` 中 DATABASE_URL |
| 502 错误 | 确认容器运行：`docker ps` |
| 自动部署失败 | 检查 GitHub Secrets 配置 |

**详细文档**:
- [DEPLOY-QUICKSTART.md](./docs/DEPLOY-QUICKSTART.md)
- [DEPLOY-ADMIN.md](./docs/DEPLOY-ADMIN.md)

---

## 📌 重要提示

- ✅ 部署前备份数据库
- ✅ 首次登录后修改密码
- ✅ 定期更新系统和依赖
- ✅ 配置定时数据库备份
- ✅ 监控磁盘空间

---

**打印此卡片放在手边，随时参考！** 📄

部署愉快！🎉
