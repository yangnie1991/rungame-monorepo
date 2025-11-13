# 管理后台独立部署方案

## 🎯 方案说明

**目标**: 解决管理后台的超时问题（特别是 AI 生成功能）

**架构**:
- 🌐 **用户网站**: 继续在 Vercel/Cloudflare（无需改动）
- 👑 **管理后台**: 自建 VPS（无超时限制）
- 🗄️ **数据库**: 继续使用 Supabase（免费）

**优势**:
- ✅ 最小配置，成本最低（$6/月）
- ✅ AI 生成、批量 SEO 操作无超时
- ✅ 前端网站无影响，CDN 继续用
- ✅ 数据库继续免费

## 💰 成本对比

| 项目 | 原方案 | 新方案 |
|------|--------|--------|
| 前端网站 | Vercel Free | Vercel Free (不变) |
| 管理后台 | Vercel Free (超时) | VPS $6/月 ✅ |
| 数据库 | Supabase Free | Supabase Free (不变) |
| **总成本** | **$0** | **$6/月** |

## 🖥️ 推荐服务器

### Hetzner CX22 - 美国机房 (最推荐)

**规格**:
- CPU: 2 vCPU (AMD EPYC)
- 内存: 4GB RAM
- 存储: 40GB SSD
- 带宽: 20TB/月
- **价格: €5.83/月 (~$6.5)**

**⚠️ 重要: 选择美国 Ashburn 机房**

由于您的 Supabase 数据库在美国东部（us-east-1），**必须**选择美国机房以减少延迟：

**机房选择**:
- ✅ **Ashburn, VA (美国东部)** - 离 Supabase 最近，延迟 < 10ms
- ❌ Falkenstein (德国) - 延迟 100-150ms，不推荐
- ❌ Helsinki (芬兰) - 延迟 120-180ms，不推荐

**购买链接**: https://www.hetzner.com/cloud

**为什么选 Hetzner 美国机房**:
- 💰 性价比最高（$6.5/月）
- 🚀 性能强劲（AMD EPYC CPU）
- 🌍 Ashburn 机房离 Supabase 很近
- 📊 20TB 流量足够用
- ⚡ 数据库延迟 < 10ms（关键优势）

### 备选方案

#### 选项 A: 美国机房（数据库延迟最低）

| 提供商 | 规格 | 价格 | 机房位置 | 到 Supabase 延迟 | 管理员访问速度 |
|--------|------|------|----------|------------------|----------------|
| **Hetzner CX22** | 2核 4GB | **$6.5/月** | 🇺🇸 Ashburn, VA | ⚡ < 10ms ⭐ | 🇨🇳 150-200ms |
| Vultr | 2核 4GB | $12/月 | 🇺🇸 New York | ⚡ 10-20ms | 🇨🇳 150-200ms |
| DigitalOcean | 2核 4GB | $24/月 | 🇺🇸 New York | ⚡ 10-20ms | 🇨🇳 150-200ms |

**适合**:
- ✅ 数据库操作频繁（AI 生成、批量查询）
- ✅ 管理员分布全球
- ✅ 追求最佳性能

#### 选项 B: 阿里云轻量服务器（管理员访问快）

| 机房 | 规格 | 价格 | 到 Supabase 延迟 | 管理员访问速度 |
|------|------|------|------------------|----------------|
| **香港** | 2核 4GB | **¥40/月** (~$6) | ⚡ 80-120ms | 🇨🇳 10-30ms ⭐ |
| 新加坡 | 2核 4GB | ¥40/月 | ⚡ 100-150ms | 🇨🇳 50-80ms |
| 上海/北京 | 2核 4GB | ¥30/月 | ⚡ 150-200ms | 🇨🇳 < 5ms ⭐⭐ |

**阿里云轻量服务器配置推荐**:
- 实例规格: 2核 4GB
- 带宽: 5Mbps (足够)
- 流量: 200GB/月 (轻量应用服务器包含)
- 系统: Ubuntu 22.04

**购买链接**: https://www.aliyun.com/product/swas

**适合**:
- ✅ 管理员主要在中国
- ✅ 更看重管理后台访问速度
- ✅ 支持支付宝/微信支付

#### 如何选择？

```
如果您是 → 推荐方案
────────────────────────────────────────
主要在中国管理 → 阿里云香港 (¥40/月)
   ├─ 管理后台: 10-30ms (快)
   └─ 数据库: 80-120ms (可接受)

全球团队 → Hetzner 美国 ($6.5/月)
   ├─ 管理后台: 150-200ms (一般)
   └─ 数据库: < 10ms (极快)

只有几个管理员，不在意后台速度 → Hetzner 美国
只有中国管理员，经常操作 → 阿里云香港
```

**延迟对比表**:

| 操作场景 | 美国 VPS | 阿里云香港 | 差异 |
|---------|----------|------------|------|
| 打开管理后台页面 | 1-2秒 | 0.3-0.5秒 | 香港快 70% |
| AI 生成 50 个描述 | 2-3 分钟 | 2-4 分钟 | 差异不大 |
| 批量推送 100 个 URL | 3-5 分钟 | 3-6 分钟 | 差异不大 |
| 数据库查询 | 10ms | 100ms | 美国快 90% |

**我的建议**:
- 💰 预算有限 → **阿里云香港** ¥40/月 (~$6)
- 🚀 追求性能 → **Hetzner 美国** $6.5/月
- 👥 团队在中国 → **阿里云香港**
- 🌍 全球团队 → **Hetzner 美国**

## 🚀 部署步骤

根据您选择的服务器提供商，选择对应的步骤：

### 第一步A：购买 Hetzner 服务器（美国机房）

1. 访问 [Hetzner Cloud](https://www.hetzner.com/cloud)
2. 选择 **CX22** (2核 4GB)
3. **⚠️ 位置必须选择美国机房**:
   - ✅ **Ashburn, VA (美国)** ← 选这个！
   - ❌ ~~Falkenstein (德国)~~ - 不要选
   - ❌ ~~Helsinki (芬兰)~~ - 不要选
   - **原因**: Supabase 数据库在美国东部，选择美国机房延迟最低
4. 系统选择: **Ubuntu 22.04 LTS**
5. 添加 SSH Key (推荐) 或使用密码

**购买后会得到**:
- IP 地址: `xxx.xxx.xxx.xxx`
- Root 密码（通过邮件发送）

---

### 第一步B：购买阿里云轻量服务器（推荐中国用户）

1. 访问 [阿里云轻量应用服务器](https://www.aliyun.com/product/swas)

2. **选择配置**:
   - 实例规格: **2核 4GB**
   - **地域选择**（重要！）:
     - ✅ **香港** ← 推荐！平衡延迟和访问速度
     - ⚠️ 新加坡 - 备选
     - ❌ 上海/北京 - 需要备案，且到美国延迟高
   - 镜像: **Ubuntu 22.04**
   - 带宽: 5Mbps（足够）
   - 流量: 200GB/月（包含在套餐内）

3. **为什么选香港？**
   ```
   香港机房优势:
   ├─ 到中国大陆: 10-30ms（访问管理后台快）
   ├─ 到美国 Supabase: 80-120ms（可接受）
   ├─ 不需要备案（重要！）
   └─ 支持国际网络（OpenAI API 可用）
   ```

4. **购买并配置**:
   - 支付方式: 支付宝/微信支付
   - 时长: 建议先买 1 个月测试
   - 购买后进入控制台

5. **获取连接信息**:
   - 控制台 → 轻量应用服务器
   - 查看实例详情
   - 记录 **公网 IP**
   - 重置密码（设置 root 密码）

6. **配置安全组**:
   ```
   控制台 → 安全组规则 → 添加规则:

   22/22    TCP  0.0.0.0/0  允许  # SSH
   80/80    TCP  0.0.0.0/0  允许  # HTTP
   443/443  TCP  0.0.0.0/0  允许  # HTTPS
   ```

**购买后会得到**:
- IP 地址: `xxx.xxx.xxx.xxx`
- Root 密码: 您设置的密码

### 第二步：初始化服务器

SSH 连接到服务器:

```bash
ssh root@your-server-ip
```

运行自动化脚本:

```bash
# 下载并运行初始化脚本
curl -fsSL https://raw.githubusercontent.com/yourusername/rungame-nextjs/main/scripts/setup-admin-server.sh | bash
```

或手动执行:

```bash
# 1. 更新系统
apt update && apt upgrade -y

# 2. 安装必要工具
apt install -y curl git build-essential ufw

# 3. 配置防火墙
ufw allow 22/tcp   # SSH
ufw allow 80/tcp   # HTTP
ufw allow 443/tcp  # HTTPS
ufw --force enable

# 4. 安装 Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# 5. 安装 PM2（进程管理）
npm install -g pm2

# 6. 安装 Caddy（自动 HTTPS）
apt install -y debian-keyring debian-archive-keyring apt-transport-https
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | tee /etc/apt/sources.list.d/caddy-stable.list
apt update && apt install -y caddy
```

### 第三步：部署应用

```bash
# 1. 克隆代码
cd /opt
git clone https://github.com/yourusername/rungame-nextjs.git
cd rungame-nextjs

# 2. 配置环境变量
cat > .env.production << 'EOF'
# 数据库连接（使用 Supabase）
DATABASE_URL="你的_SUPABASE_DATABASE_URL"

# NextAuth
NEXTAUTH_URL="https://admin.rungame.online"
NEXTAUTH_SECRET="$(openssl rand -base64 32)"

# OpenAI / OpenRouter（AI 生成）
OPENAI_API_KEY="你的_OPENAI_KEY"
OPENROUTER_API_KEY="你的_OPENROUTER_KEY"

# Google Search API（SEO 检查）
GOOGLE_API_KEY="你的_GOOGLE_KEY"
GOOGLE_SEARCH_ENGINE_ID="你的_SEARCH_ENGINE_ID"

# Cloudflare R2（图片存储）
R2_ACCESS_KEY_ID="你的_R2_KEY"
R2_SECRET_ACCESS_KEY="你的_R2_SECRET"
R2_BUCKET_NAME="你的_BUCKET"
R2_PUBLIC_URL="https://你的CDN域名"

# Bing IndexNow
BING_INDEXNOW_API_KEY="你的_BING_KEY"

# 🔥 重要：只启用管理后台路由
NEXT_PUBLIC_ADMIN_ONLY="true"
EOF

# 3. 安装依赖
npm install --production=false

# 4. 构建项目
npm run build

# 5. 配置 PM2
cat > ecosystem.config.js << 'EOF'
module.exports = {
  apps: [{
    name: 'rungame-admin',
    script: 'npm',
    args: 'start',
    cwd: '/opt/rungame-nextjs',
    instances: 1,  // 单实例足够
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss',
    merge_logs: true,
    autorestart: true,
    max_memory_restart: '2G'
  }]
}
EOF

# 6. 启动应用
mkdir -p logs
pm2 start ecosystem.config.js
pm2 startup
pm2 save

# 7. 查看状态
pm2 status
pm2 logs rungame-admin
```

### 第四步：配置域名和 HTTPS

#### 4.1 DNS 配置

在您的域名提供商（如 Cloudflare）添加 A 记录:

```
类型: A
名称: admin
内容: 你的_VPS_IP
代理: 关闭（灰色云朵）❗ 重要
TTL: Auto
```

等待 DNS 生效（1-5 分钟）:

```bash
# 测试 DNS
nslookup admin.rungame.online
```

#### 4.2 配置 Caddy（自动 HTTPS）

```bash
# 创建 Caddy 配置
cat > /etc/caddy/Caddyfile << 'EOF'
admin.rungame.online {
    # 自动 HTTPS（Let's Encrypt）
    encode gzip zstd

    # 反向代理到 Next.js
    reverse_proxy localhost:3000

    # 日志
    log {
        output file /var/log/caddy/access.log
        format json
    }

    # 安全头
    header {
        Strict-Transport-Security "max-age=31536000;"
        X-Content-Type-Options "nosniff"
        X-Frame-Options "DENY"
        X-XSS-Protection "1; mode=block"
    }

    # 限制只允许管理后台路由
    @site {
        not path /admin*
        not path /api*
        not path /login*
        not path /_next*
    }
    respond @site "请访问 https://rungame.online" 302
}
EOF

# 重启 Caddy
systemctl restart caddy
systemctl status caddy

# 查看 Caddy 日志（如果有问题）
journalctl -u caddy -f
```

#### 4.3 测试访问

浏览器访问:
```
https://admin.rungame.online/login
```

应该看到登录页面，HTTPS 证书自动配置好！

### 第五步：修改原项目配置

在 Vercel 的环境变量中添加:

```env
# 告诉前端网站，管理后台在独立域名
NEXT_PUBLIC_ADMIN_URL=https://admin.rungame.online
```

## 🔄 更新部署

创建更新脚本 `/opt/rungame-nextjs/update.sh`:

```bash
#!/bin/bash
set -e

echo "🔄 更新管理后台..."

cd /opt/rungame-nextjs

# 1. 拉取代码
git pull origin main

# 2. 安装依赖
npm install --production=false

# 3. 构建
npm run build

# 4. 重启
pm2 restart rungame-admin

# 5. 查看状态
pm2 logs rungame-admin --lines 20

echo "✅ 更新完成！"
```

使用:

```bash
chmod +x /opt/rungame-nextjs/update.sh
/opt/rungame-nextjs/update.sh
```

## 🧪 验证部署

### 1. 测试数据库连接延迟

部署完成后，验证数据库延迟:

```bash
# SSH 到服务器
ssh root@your-server-ip

# 测试到 Supabase 的延迟
cd /opt/rungame-nextjs

# 安装测试脚本依赖
npm install

# 创建测试脚本
cat > test-db-latency.js << 'EOF'
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function testLatency() {
  console.log('🔍 测试数据库连接延迟...\n')

  const tests = 10
  const latencies = []

  for (let i = 1; i <= tests; i++) {
    const start = Date.now()
    await prisma.$queryRaw`SELECT 1`
    const latency = Date.now() - start
    latencies.push(latency)
    console.log(`测试 ${i}/${tests}: ${latency}ms`)
  }

  const avg = latencies.reduce((a, b) => a + b) / latencies.length
  const min = Math.min(...latencies)
  const max = Math.max(...latencies)

  console.log('\n📊 统计结果:')
  console.log(`平均延迟: ${avg.toFixed(2)}ms`)
  console.log(`最小延迟: ${min}ms`)
  console.log(`最大延迟: ${max}ms`)

  if (avg < 20) {
    console.log('\n✅ 延迟优秀！机房选择正确')
  } else if (avg < 50) {
    console.log('\n⚠️ 延迟一般，建议检查机房位置')
  } else {
    console.log('\n❌ 延迟过高！请检查:')
    console.log('1. 服务器是否在美国东部机房')
    console.log('2. Supabase 是否在 us-east-1')
  }

  await prisma.$disconnect()
}

testLatency().catch(console.error)
EOF

# 运行测试
node test-db-latency.js
```

**预期结果**:
- ✅ 平均延迟 < 20ms: 优秀（Ashburn 机房）
- ⚠️ 平均延迟 20-50ms: 一般（New York/Newark 机房）
- ❌ 平均延迟 > 100ms: 有问题（可能选错机房）

### 2. 测试 AI 生成（无超时）

1. 访问 https://admin.rungame.online/login
2. 登录管理后台
3. 进入 **SEO 管理 → 内容生成**
4. 选择 50 个游戏，批量生成 SEO 描述
5. 观察：
   - ✅ 不会超时
   - ✅ 可以看到实时进度
   - ✅ 生成完成后返回结果

**原因**: 自建服务器无超时限制，AI 生成可以运行任意长时间！

### 3. 测试批量 Bing 推送

1. 进入 **SEO 管理 → Bing URL 推送**
2. 选择 **100 个 URL** (在 Vercel 上会超时)
3. 点击 **批量推送**
4. 观察：
   - ✅ 不会超时
   - ✅ 实时显示推送进度
   - ✅ 全部推送完成

**对比**:
- Vercel: 最多 5 个一批，10 秒超时
- VPS: 一次 100 个，无超时限制

## 📊 监控和日志

### 查看应用状态

```bash
# PM2 状态
pm2 status

# 实时日志（查看 AI 生成进度）
pm2 logs rungame-admin

# 内存和 CPU 监控
pm2 monit

# 重启应用
pm2 restart rungame-admin
```

### 系统资源监控

```bash
# CPU 和内存使用
htop

# 磁盘使用
df -h

# 网络流量
vnstat
```

### 安装 Netdata（可视化监控）

```bash
# 一键安装
bash <(curl -Ss https://my-netdata.io/kickstart.sh)

# 访问监控面板
# http://your-server-ip:19999
```

**安全提示**: 建议通过 Caddy 反向代理 Netdata，添加密码保护:

```
monitor.rungame.online {
    reverse_proxy localhost:19999
    basicauth {
        admin JDJhJDEwJEVxSTR...  # 使用 caddy hash-password 生成
    }
}
```

## 🔒 安全加固

### 1. 禁用 root SSH 登录

```bash
# 创建管理员用户
adduser deployer
usermod -aG sudo deployer

# 配置 SSH Key
su - deployer
mkdir -p ~/.ssh
# 复制您的公钥到 ~/.ssh/authorized_keys

# 编辑 SSH 配置
sudo nano /etc/ssh/sshd_config

# 修改以下内容:
PermitRootLogin no
PasswordAuthentication no

# 重启 SSH
sudo systemctl restart sshd
```

### 2. 安装 Fail2Ban（防暴力破解）

```bash
apt install -y fail2ban

# 启用并启动
systemctl enable fail2ban
systemctl start fail2ban

# 查看状态
fail2ban-client status sshd
```

### 3. 自动更新安全补丁

```bash
apt install -y unattended-upgrades

# 配置自动更新
dpkg-reconfigure -plow unattended-upgrades
```

## 🐛 常见问题

### 问题 1: Caddy 无法获取 HTTPS 证书

**原因**: DNS 未生效或端口未开放

**解决**:
```bash
# 1. 检查 DNS
nslookup admin.rungame.online

# 2. 检查端口
netstat -tlnp | grep 80
netstat -tlnp | grep 443

# 3. 检查防火墙
ufw status

# 4. 查看 Caddy 日志
journalctl -u caddy -f
```

### 问题 2: 应用无法启动

**检查步骤**:
```bash
# 1. 查看 PM2 日志
pm2 logs rungame-admin --lines 50

# 2. 检查环境变量
cat /opt/rungame-nextjs/.env.production

# 3. 检查数据库连接
# 在应用目录运行
node -e "const { PrismaClient } = require('@prisma/client'); const prisma = new PrismaClient(); prisma.$connect().then(() => console.log('✅ 数据库连接成功')).catch(e => console.error('❌ 数据库连接失败:', e))"

# 4. 手动启动测试
cd /opt/rungame-nextjs
npm start
```

### 问题 3: AI 生成还是很慢

**可能原因**:
1. OpenAI API 本身慢（网络问题）
2. API Key 额度不足

**解决**:
```bash
# 1. 测试 API 连接速度
curl -w "\nTime: %{time_total}s\n" -X POST https://api.openai.com/v1/chat/completions \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"gpt-3.5-turbo","messages":[{"role":"user","content":"test"}]}'

# 2. 如果 OpenAI 慢，可以换用国内代理或 OpenRouter
# 在 .env.production 中配置
OPENROUTER_API_KEY="..."
```

### 问题 4: 内存不足

**症状**: PM2 显示应用频繁重启

**解决**:
```bash
# 1. 查看内存使用
free -h
pm2 monit

# 2. 增加 swap（临时方案）
fallocate -l 2G /swapfile
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile
echo '/swapfile none swap sw 0 0' >> /etc/fstab

# 3. 升级服务器（长期方案）
# Hetzner CX32: 4核 8GB - €11.90/月
```

## 💡 进一步优化

### 1. 使用 Redis 缓存（可选）

如果后续需要性能优化:

```bash
# 安装 Redis
apt install -y redis-server

# 在 .env.production 添加
REDIS_URL="redis://localhost:6379"
```

### 2. 配置 CDN 加速管理后台静态资源

如果管理后台访问慢:

在 Cloudflare 添加 CNAME:
```
admin.rungame.online → 你的VPS IP
代理: 开启（橙色云朵）✅
```

这样静态资源会通过 CDN 加速。

### 3. 多区域部署（高级）

如果需要全球访问:
- 美国用户 → 美国服务器
- 欧洲用户 → 欧洲服务器

使用 GeoDNS（如 Cloudflare Load Balancing）实现智能路由。

## 📈 成本总结

| 项目 | 月成本 | 说明 |
|------|--------|------|
| Hetzner CX22 | $6.5 | 2核 4GB，足够用 |
| 域名 | $1 | 已有，无额外成本 |
| 流量 | $0 | 20TB 包含在内 |
| **总计** | **$6.5/月** | **= 一杯咖啡** ☕ |

**投资回报**:
- ✅ 解决超时问题（无价）
- ✅ AI 生成速度快 10 倍
- ✅ 批量 SEO 操作无压力
- ✅ 提升工作效率

## 🎯 总结

通过部署独立的管理后台服务器:

| 对比项 | 原方案 (Vercel) | 新方案 (VPS) |
|--------|-----------------|-------------|
| AI 生成 100 个游戏描述 | ❌ 超时失败 | ✅ 5-10 分钟完成 |
| 批量检查 Bing 收录 (200 个) | ❌ 超时失败 | ✅ 3-5 分钟完成 |
| 批量生成 SEO 元数据 | ❌ 只能 5 个一批 | ✅ 一次 100 个 |
| 月成本 | $0 | $6.5 |

**建议**:
1. 立即部署管理后台到 VPS（$6.5/月）
2. 前端网站继续用 Vercel（$0）
3. 数据库继续用 Supabase（$0）

**总成本**: $6.5/月，彻底解决超时问题！

---

**需要帮助?**
- 查看部署脚本: [scripts/setup-admin-server.sh](scripts/setup-admin-server.sh)
- 更新文档: [DEPLOYMENT-OPTIONS.md](DEPLOYMENT-OPTIONS.md)

**最后更新**: 2025-11-14
