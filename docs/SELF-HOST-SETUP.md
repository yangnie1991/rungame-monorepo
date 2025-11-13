# 自建服务器部署指南

## 📋 准备工作

### 1. 购买 VPS 服务器

推荐 **Hetzner** (性价比最高):
1. 访问 https://www.hetzner.com/cloud
2. 选择 CPX41 (4核 8GB) - €15.30/月
3. 选择位置: 德国 Falkenstein (欧洲最佳) 或 美国 Ashburn
4. 操作系统: Ubuntu 22.04 LTS

### 2. 连接服务器

```bash
# 使用 SSH 连接（替换为您的服务器 IP）
ssh root@your-server-ip
```

## 🛠️ 服务器初始化

### 一键安装脚本

将以下脚本保存为 `setup-server.sh`:

```bash
#!/bin/bash
set -e

echo "🚀 开始配置 RunGame 生产服务器..."

# 1. 更新系统
echo "📦 更新系统包..."
apt update && apt upgrade -y

# 2. 安装必要工具
echo "🔧 安装基础工具..."
apt install -y curl git build-essential ufw fail2ban

# 3. 配置防火墙
echo "🔒 配置防火墙..."
ufw allow 22/tcp
ufw allow 80/tcp
ufw allow 443/tcp
ufw --force enable

# 4. 安装 Node.js 20
echo "📗 安装 Node.js 20..."
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# 5. 安装 PostgreSQL
echo "🐘 安装 PostgreSQL..."
apt install -y postgresql postgresql-contrib

# 6. 安装 PM2（进程管理）
echo "⚙️ 安装 PM2..."
npm install -g pm2

# 7. 安装 Caddy（自动 HTTPS）
echo "🌐 安装 Caddy..."
apt install -y debian-keyring debian-archive-keyring apt-transport-https
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | tee /etc/apt/sources.list.d/caddy-stable.list
apt update
apt install -y caddy

# 8. 创建应用用户
echo "👤 创建应用用户..."
useradd -m -s /bin/bash rungame
usermod -aG sudo rungame

# 9. 配置 PostgreSQL
echo "🗄️ 配置数据库..."
sudo -u postgres psql <<EOF
CREATE DATABASE rungame_production;
CREATE USER rungame WITH PASSWORD 'your_secure_password_here';
GRANT ALL PRIVILEGES ON DATABASE rungame_production TO rungame;
\q
EOF

echo "✅ 服务器配置完成！"
echo ""
echo "下一步:"
echo "1. 切换到 rungame 用户: su - rungame"
echo "2. 克隆项目代码"
echo "3. 配置环境变量"
echo "4. 部署应用"
```

运行脚本:

```bash
chmod +x setup-server.sh
./setup-server.sh
```

## 📂 部署应用

### 1. 切换用户并克隆代码

```bash
# 切换到应用用户
su - rungame

# 克隆代码
cd ~
git clone https://github.com/yourusername/rungame-nextjs.git
cd rungame-nextjs
```

### 2. 配置环境变量

```bash
# 创建 .env.production 文件
cat > .env.production << 'EOF'
# 数据库连接（本地，无连接池限制）
DATABASE_URL="postgresql://rungame:your_secure_password_here@localhost:5432/rungame_production?schema=public"

# NextAuth
NEXTAUTH_URL="https://your-domain.com"
NEXTAUTH_SECRET="$(openssl rand -base64 32)"

# API Keys（从原有配置复制）
OPENAI_API_KEY="your_openai_key"
GOOGLE_API_KEY="your_google_key"
GOOGLE_SEARCH_ENGINE_ID="your_search_engine_id"

# Cloudflare R2（如果使用）
R2_ACCESS_KEY_ID="your_r2_key"
R2_SECRET_ACCESS_KEY="your_r2_secret"
R2_BUCKET_NAME="your_bucket"
R2_PUBLIC_URL="https://your-cdn.com"

# 搜索引擎
BING_INDEXNOW_API_KEY="your_bing_key"
EOF

# 生成安全的密钥
sed -i "s/\$(openssl rand -base64 32)/$(openssl rand -base64 32)/" .env.production
```

### 3. 安装依赖并构建

```bash
# 安装依赖
npm install --production=false

# 推送数据库 schema
npm run db:push

# 填充初始数据（如果需要）
npm run db:seed

# 构建生产版本
npm run build
```

### 4. 使用 PM2 启动应用

```bash
# 创建 PM2 配置文件
cat > ecosystem.config.js << 'EOF'
module.exports = {
  apps: [{
    name: 'rungame',
    script: 'npm',
    args: 'start',
    cwd: '/home/rungame/rungame-nextjs',
    instances: 2,  // 使用 2 个进程
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,
    autorestart: true,
    max_memory_restart: '1G'
  }]
}
EOF

# 创建日志目录
mkdir -p logs

# 启动应用
pm2 start ecosystem.config.js

# 查看状态
pm2 status

# 查看日志
pm2 logs rungame

# 设置开机自启
pm2 startup
pm2 save
```

### 5. 配置 Caddy 反向代理

```bash
# 退出到 root 用户
exit

# 配置 Caddy
cat > /etc/caddy/Caddyfile << 'EOF'
# 替换为您的域名
your-domain.com, www.your-domain.com {
    # 自动 HTTPS
    encode gzip zstd

    # 反向代理到 Next.js
    reverse_proxy localhost:3000

    # 日志
    log {
        output file /var/log/caddy/access.log
    }

    # 安全头
    header {
        # 启用 HSTS
        Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"
        # XSS 保护
        X-Content-Type-Options "nosniff"
        X-Frame-Options "SAMEORIGIN"
        X-XSS-Protection "1; mode=block"
        # CSP（根据需要调整）
        Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';"
    }
}
EOF

# 重启 Caddy
systemctl restart caddy
systemctl enable caddy

# 检查状态
systemctl status caddy
```

## 🔄 部署更新流程

创建更新脚本 `/home/rungame/update.sh`:

```bash
#!/bin/bash
set -e

echo "🔄 开始更新应用..."

cd /home/rungame/rungame-nextjs

# 1. 拉取最新代码
echo "📥 拉取代码..."
git pull origin main

# 2. 安装依赖
echo "📦 安装依赖..."
npm install --production=false

# 3. 更新数据库
echo "🗄️ 更新数据库..."
npm run db:push

# 4. 构建
echo "🔨 构建应用..."
npm run build

# 5. 重启 PM2
echo "🔄 重启应用..."
pm2 restart rungame

# 6. 查看状态
pm2 status

echo "✅ 更新完成！"
```

使用:

```bash
chmod +x /home/rungame/update.sh
su - rungame
./update.sh
```

## 📊 监控和维护

### 查看应用状态

```bash
# PM2 状态
pm2 status

# 实时日志
pm2 logs rungame --lines 100

# CPU 和内存使用
pm2 monit

# 重启应用
pm2 restart rungame

# 停止应用
pm2 stop rungame
```

### 数据库备份

创建每日备份脚本 `/home/rungame/backup-db.sh`:

```bash
#!/bin/bash

# 备份目录
BACKUP_DIR="/home/rungame/backups"
mkdir -p $BACKUP_DIR

# 备份文件名（带时间戳）
BACKUP_FILE="$BACKUP_DIR/rungame_$(date +%Y%m%d_%H%M%S).sql"

# 执行备份
pg_dump -U rungame -d rungame_production > $BACKUP_FILE

# 压缩
gzip $BACKUP_FILE

# 删除 7 天前的备份
find $BACKUP_DIR -name "*.sql.gz" -mtime +7 -delete

echo "✅ 数据库备份完成: ${BACKUP_FILE}.gz"
```

设置定时备份:

```bash
# 添加到 crontab
crontab -e

# 每天凌晨 3 点备份
0 3 * * * /home/rungame/backup-db.sh
```

### 系统监控

安装 Netdata（可选）:

```bash
# 一键安装监控面板
bash <(curl -Ss https://my-netdata.io/kickstart.sh)

# 访问监控面板
# http://your-server-ip:19999
```

## 🔧 性能优化

### PostgreSQL 优化

编辑 `/etc/postgresql/14/main/postgresql.conf`:

```ini
# 根据 8GB 内存的服务器优化
shared_buffers = 2GB
effective_cache_size = 6GB
maintenance_work_mem = 512MB
work_mem = 32MB

# 连接池
max_connections = 200

# 日志
log_min_duration_statement = 1000  # 记录超过 1 秒的查询
```

重启 PostgreSQL:

```bash
systemctl restart postgresql
```

### Next.js 优化

在 `ecosystem.config.js` 中调整 PM2 配置:

```javascript
{
  instances: 'max',  // 使用所有 CPU 核心
  max_memory_restart: '1G',  // 内存超过 1GB 自动重启
}
```

## 🆘 故障排查

### 应用无法访问

```bash
# 检查 Next.js 是否运行
pm2 status

# 检查 Caddy 是否运行
systemctl status caddy

# 检查端口
netstat -tlnp | grep 3000
netstat -tlnp | grep 80

# 检查日志
pm2 logs rungame --lines 50
journalctl -u caddy -f
```

### 数据库连接失败

```bash
# 检查 PostgreSQL 状态
systemctl status postgresql

# 测试连接
psql -U rungame -d rungame_production

# 查看连接数
sudo -u postgres psql -c "SELECT count(*) FROM pg_stat_activity;"
```

### 内存不足

```bash
# 查看内存使用
free -h

# 查看进程内存
pm2 monit

# 如果需要，减少 PM2 实例数
pm2 scale rungame 1
```

## 📈 成本估算

### Hetzner CPX41 (推荐)
- 服务器: €15.30/月 (~$17)
- 域名: $12/年
- 备份存储: €5/月（可选）
- **总计**: ~$20-25/月

### 对比云服务

| 方案 | 月成本 | 超时限制 | 灵活性 |
|------|--------|----------|--------|
| Vercel Free + Upstash | $0-5 | 10秒 | ⭐⭐ |
| Vercel Pro | $20 | 60秒 | ⭐⭐⭐ |
| Railway | $5-15 | 无 | ⭐⭐⭐⭐ |
| **自建 VPS** | **$17-25** | **无** | **⭐⭐⭐⭐⭐** |

## ✅ 自建服务器的优势

1. **无超时限制** - SEO 批量操作可以运行任意长时间
2. **完全控制** - 可以安装任何软件，自由配置
3. **性价比高** - 固定成本，不按请求计费
4. **数据隐私** - 数据完全掌控在自己手中
5. **易于扩展** - 随时升级服务器配置

## 📚 相关资源

- Hetzner 文档: https://docs.hetzner.com/cloud/
- PM2 文档: https://pm2.keymetrics.io/docs/usage/quick-start/
- Caddy 文档: https://caddyserver.com/docs/
- PostgreSQL 优化: https://pgtune.leopard.in.ua/

---

**最后更新**: 2025-11-14
