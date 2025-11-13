# 展示端和管理端分离部署指南

## 🎯 部署架构

```
用户访问流程:

rungame.online (用户网站)
    ↓
  Vercel
    ↓
  Supabase 数据库
    ↑
admin.rungame.online (管理后台)
    ↓
  VPS (您的服务器)
```

## 📋 部署步骤

### 第一步：在 VPS 上部署完整应用

按照 [ADMIN-ONLY-DEPLOYMENT.md](ADMIN-ONLY-DEPLOYMENT.md) 的步骤 2-3 完成基础部署：

```bash
# SSH 连接到 VPS
ssh root@your-server-ip

# 克隆代码
cd /opt
git clone https://github.com/yourusername/rungame-nextjs.git
cd rungame-nextjs

# 配置环境变量
nano .env.production
# 填入数据库连接、API Key 等

# 安装依赖并构建
npm install --production=false
npm run build

# 启动应用
pm2 start ecosystem.config.js
```

### 第二步：配置 Caddy 路由分离

创建 Caddy 配置文件，只允许管理后台路由：

```bash
cat > /etc/caddy/Caddyfile << 'EOF'
# 管理后台域名
admin.rungame.online {
    encode gzip zstd

    # 反向代理到 Next.js
    reverse_proxy localhost:3000 {
        # 传递原始 Host 头
        header_up Host {host}
        header_up X-Real-IP {remote_host}
        header_up X-Forwarded-For {remote_host}
        header_up X-Forwarded-Proto {scheme}
    }

    # 只允许管理后台相关路由
    @not_admin {
        not path /admin*
        not path /api*
        not path /login*
        not path /_next*
        not path /favicon.ico
        not path /assets*
    }

    # 非管理路由重定向到 Vercel
    handle @not_admin {
        redir https://rungame.online{uri} permanent
    }

    # 日志
    log {
        output file /var/log/caddy/admin.log
        format json
    }

    # 安全头
    header {
        Strict-Transport-Security "max-age=31536000;"
        X-Content-Type-Options "nosniff"
        X-Frame-Options "DENY"
        X-XSS-Protection "1; mode=block"
    }
}

# 如果有人直接访问 VPS IP，重定向到管理后台
:80, :443 {
    redir https://admin.rungame.online{uri} permanent
}
EOF

# 重启 Caddy
systemctl restart caddy

# 查看状态
systemctl status caddy
```

### 第三步：配置 DNS

在您的 DNS 提供商（如 Cloudflare）添加记录：

#### 方案 A: Cloudflare DNS（如果使用 Cloudflare）

```
类型: A
名称: admin
内容: 你的_VPS_IP
代理: 关闭（灰色云朵）❗ 重要
TTL: Auto
```

**⚠️ 重要**: 必须**关闭代理**（灰色云朵），否则会被 Cloudflare 的超时限制影响。

#### 方案 B: 其他 DNS 提供商

添加 A 记录：
```
主机记录: admin
记录类型: A
记录值: 你的_VPS_IP
TTL: 600
```

#### 验证 DNS 生效

```bash
# 在本地测试
nslookup admin.rungame.online

# 应该返回您的 VPS IP
```

### 第四步：测试访问

#### 测试管理后台（VPS）

访问以下 URL，应该正常工作：
```
https://admin.rungame.online/login
https://admin.rungame.online/admin/games
https://admin.rungame.online/api/auth/session
```

#### 测试重定向（VPS）

访问以下 URL，应该重定向到 Vercel：
```
https://admin.rungame.online/         → https://rungame.online/
https://admin.rungame.online/games    → https://rungame.online/games
https://admin.rungame.online/play/xxx → https://rungame.online/play/xxx
```

#### 测试用户网站（Vercel）

访问以下 URL，应该正常工作（继续在 Vercel）：
```
https://rungame.online/
https://rungame.online/games
https://rungame.online/play/some-game
```

### 第五步：更新环境变量

#### VPS 环境变量 (.env.production)

```env
# 管理后台 URL
NEXTAUTH_URL=https://admin.rungame.online

# 数据库（Supabase）
DATABASE_URL=你的_SUPABASE_URL

# API Keys
OPENAI_API_KEY=你的_KEY
OPENROUTER_API_KEY=你的_KEY
GOOGLE_API_KEY=你的_KEY
GOOGLE_SEARCH_ENGINE_ID=你的_ID

# Cloudflare R2
R2_ACCESS_KEY_ID=你的_KEY
R2_SECRET_ACCESS_KEY=你的_SECRET
R2_BUCKET_NAME=你的_BUCKET
R2_PUBLIC_URL=https://你的CDN域名

# Bing
BING_INDEXNOW_API_KEY=你的_KEY

# NextAuth Secret
NEXTAUTH_SECRET=$(openssl rand -base64 32)
```

#### Vercel 环境变量（无需修改）

保持原有配置，继续使用：
```env
NEXTAUTH_URL=https://rungame.online
DATABASE_URL=你的_SUPABASE_URL
# 其他配置...
```

## ✅ 验证部署

### 1. 测试管理后台超时问题是否解决

```bash
# SSH 到 VPS
ssh root@your-server-ip

# 进入项目目录
cd /opt/rungame-nextjs

# 测试数据库延迟
node test-db-latency.js

# 查看应用日志
pm2 logs rungame-admin
```

访问管理后台：
1. https://admin.rungame.online/login
2. 登录后台
3. 尝试 AI 生成 50 个游戏描述
4. 观察：应该不会超时

### 2. 测试用户网站是否正常

访问 https://rungame.online：
- 首页加载正常
- 游戏列表正常
- 游戏详情正常
- 搜索功能正常

### 3. 测试路由分离是否正确

```bash
# 测试管理路由（应该在 VPS）
curl -I https://admin.rungame.online/login
# 应该返回 200，Server: Caddy

# 测试用户路由重定向（应该重定向到 Vercel）
curl -I https://admin.rungame.online/games
# 应该返回 301，Location: https://rungame.online/games

# 测试用户网站（应该在 Vercel）
curl -I https://rungame.online/games
# 应该返回 200，Server: Vercel
```

## 🔄 工作流程

### 开发流程（无变化）

```bash
# 本地开发
npm run dev

# 访问 http://localhost:3000
# 管理后台和用户网站都可以访问
```

### 部署流程

#### 更新用户网站（Vercel）

```bash
# 推送到 GitHub
git push origin main

# Vercel 自动部署
# 或手动触发: vercel deploy --prod
```

#### 更新管理后台（VPS）

```bash
# SSH 到 VPS
ssh root@your-server-ip

# 运行更新脚本
/opt/rungame-nextjs/update.sh

# 或手动更新
cd /opt/rungame-nextjs
git pull origin main
npm install --production=false
npm run build
pm2 restart rungame-admin
```

## 📊 成本对比

| 项目 | 部署位置 | 月成本 | 超时限制 |
|------|---------|--------|----------|
| 用户网站 | Vercel | $0 | 10秒（够用）|
| 管理后台 | VPS | $5-6 | 无限制 ✅ |
| 数据库 | Supabase | $0 | - |
| **总计** | - | **$5-6** | - |

## 🔧 故障排查

### 问题 1: admin.rungame.online 无法访问

**检查步骤**:
```bash
# 1. 检查 DNS
nslookup admin.rungame.online

# 2. 检查 Caddy
systemctl status caddy
journalctl -u caddy -f

# 3. 检查应用
pm2 status
pm2 logs rungame-admin

# 4. 检查端口
netstat -tlnp | grep 3000
netstat -tlnp | grep 443
```

### 问题 2: 管理后台还是超时

**可能原因**:
1. Cloudflare 代理未关闭（必须是灰色云朵）
2. 应用未正确启动
3. 内存不足

**解决**:
```bash
# 检查 Cloudflare DNS 设置
# 确保代理是关闭的（灰色云朵）

# 检查内存
free -h

# 重启应用
pm2 restart rungame-admin
```

### 问题 3: 用户网站无法访问

**检查**:
- Vercel 部署是否成功
- rungame.online DNS 是否指向 Vercel

```bash
# 检查 DNS
nslookup rungame.online

# 应该指向 Vercel IP（如 76.76.21.21）
```

### 问题 4: 数据不同步

**说明**: 不应该发生，因为两边连接同一个 Supabase 数据库。

**检查**:
```bash
# VPS 检查数据库连接
cd /opt/rungame-nextjs
node -e "const { PrismaClient } = require('@prisma/client'); const prisma = new PrismaClient(); prisma.$connect().then(() => console.log('连接成功')).catch(e => console.error(e))"

# 检查环境变量
cat .env.production | grep DATABASE_URL
```

## 💡 优化建议

### 1. 添加监控

在 VPS 上安装 Uptime Kuma 监控管理后台：

```bash
docker run -d \
  --name uptime-kuma \
  -p 3001:3001 \
  -v /opt/uptime-kuma:/app/data \
  --restart=always \
  louislam/uptime-kuma:1
```

访问 http://your-vps-ip:3001 配置监控。

### 2. 配置备份

自动备份 PM2 配置和环境变量：

```bash
# 创建备份脚本
cat > /opt/backup-config.sh << 'EOF'
#!/bin/bash
BACKUP_DIR="/opt/backups"
mkdir -p $BACKUP_DIR

# 备份环境变量
cp /opt/rungame-nextjs/.env.production $BACKUP_DIR/env.$(date +%Y%m%d).backup

# 备份 PM2 配置
pm2 save

# 删除 7 天前的备份
find $BACKUP_DIR -name "env.*.backup" -mtime +7 -delete

echo "✅ 配置备份完成"
EOF

chmod +x /opt/backup-config.sh

# 添加到定时任务
crontab -e
# 添加: 0 2 * * * /opt/backup-config.sh
```

### 3. 性能优化

如果管理后台访问慢，可以在 Cloudflare 添加额外的 DNS 记录，启用 CDN：

```
类型: CNAME
名称: admin-cdn
内容: admin.rungame.online
代理: 开启（橙色云朵）✅
```

然后访问 https://admin-cdn.rungame.online 获得 CDN 加速的静态资源。

## 🎯 总结

通过这个方案：

✅ **解决了超时问题**：
- AI 生成可以运行任意长时间
- 批量操作不会超时

✅ **保持了用户体验**：
- 用户网站继续在 Vercel（全球 CDN）
- 无需修改代码

✅ **成本最低**：
- 只需 $5-6/月 VPS
- Vercel 和 Supabase 继续免费

✅ **易于维护**：
- 代码统一管理
- 部署独立进行

---

**最后更新**: 2025-11-14
