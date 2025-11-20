# 1Panel 部署指南

本文档说明如何在 **1Panel** 面板中部署 RunGame Admin 应用。

## 📋 前提条件

- ✅ 1Panel 面板已安装并运行
- ✅ Docker 已安装（1Panel 自带）
- ✅ 域名已解析到 VPS IP（`admin.rungame.online`）
- ✅ 防火墙已开放 80、443 端口

---

## 🚀 方案一：使用 1Panel Web 界面（最简单）

### 第 1 步：登录 1Panel

访问：`http://your-vps-ip:面板端口`（默认端口如 `9999`）

### 第 2 步：创建反向代理网站

**操作路径**：网站 → 网站 → 创建网站

**配置参数**：

| 配置项 | 值 |
|-------|-----|
| **类型** | 反向代理 |
| **域名** | `admin.rungame.online` |
| **代理地址** | `http://127.0.0.1:4000` |
| **启用 HTTPS** | 稍后配置 |

**高级配置**（展开后填写）：

```nginx
# 添加到"自定义配置"框中

# WebSocket 支持
proxy_http_version 1.1;
proxy_set_header Upgrade $http_upgrade;
proxy_set_header Connection 'upgrade';
proxy_cache_bypass $http_upgrade;

# 转发真实客户端信息
proxy_set_header X-Real-IP $remote_addr;
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
proxy_set_header X-Forwarded-Proto $scheme;

# 安全头
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;

# Gzip 压缩
gzip on;
gzip_types text/plain text/css application/json application/javascript;

# 上传文件大小限制
client_max_body_size 50M;
```

点击**确定**创建。

### 第 3 步：申请 SSL 证书

**操作路径**：网站 → 选择刚创建的站点 → SSL

**步骤**：

1. 选择 **Let's Encrypt**
2. 填写邮箱（用于证书过期通知）
3. 勾选**自动续期**
4. 点击**申请**

**等待 30-60 秒**，1Panel 会自动：
- 申请 SSL 证书
- 配置 HTTPS
- 设置 HTTP → HTTPS 重定向
- 启用证书自动续期

### 第 4 步：优化静态资源缓存

**操作路径**：网站 → 选择站点 → 配置 → 自定义配置

在配置文件的 `server` 块中添加：

```nginx
# Next.js 静态资源缓存
location /_next/static/ {
    proxy_pass http://127.0.0.1:4000;
    expires 365d;
    add_header Cache-Control "public, max-age=31536000, immutable";
}

location /static/ {
    proxy_pass http://127.0.0.1:4000;
    expires 7d;
    add_header Cache-Control "public, max-age=604800";
}

# 健康检查端点（不记录日志）
location /api/health {
    proxy_pass http://127.0.0.1:4000;
    access_log off;
}
```

点击**保存**，1Panel 会自动重载 nginx。

### 第 5 步：验证部署

访问 `https://admin.rungame.online`，应该能看到：
- ✅ 绿色锁图标（HTTPS）
- ✅ Admin 登录页面
- ✅ 正常登录和使用

---

## 🛠️ 方案二：手动配置 1Panel Nginx

如果您更喜欢命令行操作或需要高级配置：

### 第 1 步：确认 1Panel Nginx 运行方式

```bash
# 检查 nginx 是否在 Docker 容器中运行
docker ps | grep nginx

# 如果有输出类似 "1panel-nginx"，说明在容器中
# 如果没有，说明是系统服务
```

### 第 2 步：复制配置文件

#### 如果 nginx 在 Docker 容器中：

```bash
# 1. 进入项目目录
cd /opt/1panel/docker/compose/rungame-admin

# 2. 复制配置文件
sudo cp nginx/admin-1panel.conf /opt/1panel/nginx/vhost/admin.rungame.online.conf

# 3. 重载 nginx
docker exec 1panel-nginx nginx -s reload
```

#### 如果 nginx 是系统服务：

```bash
# 1. 复制配置文件
sudo cp nginx/admin-1panel.conf /opt/1panel/nginx/sites-available/admin.rungame.online

# 2. 创建软链接
sudo ln -s /opt/1panel/nginx/sites-available/admin.rungame.online \
           /opt/1panel/nginx/sites-enabled/

# 3. 测试并重载
sudo nginx -t && sudo systemctl reload nginx
```

### 第 3 步：申请 SSL 证书

#### 通过 1Panel Web 界面（推荐）：

1. 网站 → SSL → Let's Encrypt
2. 填写邮箱，点击申请

#### 通过命令行：

```bash
# 如果 nginx 在容器中
docker exec -it 1panel-nginx certbot --nginx -d admin.rungame.online

# 如果是系统服务
sudo certbot --nginx -d admin.rungame.online
```

---

## 🔧 配置文件详解

### 关键配置说明

#### 1. 反向代理地址

```nginx
# 如果 nginx 在 Docker 容器中运行
proxy_pass http://host.docker.internal:4000;

# 如果 nginx 是系统服务
proxy_pass http://127.0.0.1:4000;
```

**如何选择**：
- 查看 `docker ps | grep nginx`
- 有输出 → 使用 `host.docker.internal:4000`
- 无输出 → 使用 `127.0.0.1:4000`

#### 2. SSL 证书路径

1Panel 申请的证书通常在：
```
/etc/letsencrypt/live/admin.rungame.online/fullchain.pem
/etc/letsencrypt/live/admin.rungame.online/privkey.pem
```

#### 3. 日志文件位置

```
/var/log/nginx/admin.rungame.online.access.log
/var/log/nginx/admin.rungame.online.error.log
```

---

## 🔍 故障排查

### 1. 502 Bad Gateway

**原因**：nginx 无法连接到 Docker 容器

**检查步骤**：

```bash
# 1. 检查 Docker 容器是否运行
docker ps | grep rungame-admin

# 2. 检查容器端口是否暴露
docker port rungame-admin

# 3. 测试容器健康检查
curl http://localhost:4000/api/health

# 4. 检查 nginx 配置中的代理地址
# 如果 nginx 在容器中，必须使用 host.docker.internal
# 如果 nginx 是系统服务，使用 127.0.0.1
```

**解决方法**：

修改 nginx 配置中的 `proxy_pass`：

```nginx
# 方法 1：nginx 在容器中
proxy_pass http://host.docker.internal:4000;

# 方法 2：nginx 是系统服务
proxy_pass http://127.0.0.1:4000;

# 方法 3：使用宿主机 IP（最兼容）
proxy_pass http://172.17.0.1:4000;  # Docker 默认网关
```

### 2. SSL 证书申请失败

**原因**：域名未正确解析或 80 端口未开放

**检查步骤**：

```bash
# 1. 检查域名解析
nslookup admin.rungame.online

# 2. 检查防火墙
sudo ufw status | grep 80
sudo ufw status | grep 443

# 3. 检查端口是否被占用
sudo netstat -tlnp | grep :80
sudo netstat -tlnp | grep :443
```

**解决方法**：

```bash
# 开放端口
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# 确保域名 A 记录指向 VPS IP
# 在域名服务商处配置
```

### 3. 1Panel 面板无法访问

**原因**：面板端口被防火墙阻止

```bash
# 检查 1Panel 端口（默认可能是 9999）
docker ps | grep 1panel

# 开放端口（假设是 9999）
sudo ufw allow 9999/tcp
```

### 4. NextAuth 登录失败

**原因**：转发头配置不正确

**确保 nginx 配置包含**：

```nginx
proxy_set_header X-Forwarded-Proto $scheme;
proxy_set_header X-Forwarded-Host $host;
proxy_set_header Host $host;
```

**检查环境变量**：

```bash
# 进入 Docker 容器
docker exec -it rungame-admin env | grep NEXTAUTH

# 应该看到：
# NEXTAUTH_URL=https://admin.rungame.online
# NEXTAUTH_SECRET=your-secret
```

---

## 📊 性能优化

### 1. 启用 HTTP/2

在 1Panel Web 界面或配置文件中确认：

```nginx
listen 443 ssl http2;  # ← 确保有 http2
```

### 2. 调整 nginx 缓存

在 1Panel 面板 → 网站 → 配置 → 自定义配置：

```nginx
# 添加到 http 块（需要修改主配置）
proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=static:10m max_size=1g;

# 在 location 块中使用
location /_next/static/ {
    proxy_cache static;
    proxy_cache_valid 200 365d;
    # ...
}
```

### 3. 连接池优化

```nginx
# 添加到 http 块
upstream admin_backend {
    server 127.0.0.1:4000;
    keepalive 32;
}

# 修改 location 中的 proxy_pass
location / {
    proxy_pass http://admin_backend;
    # ...
}
```

---

## 🔒 安全加固

### 1. 限制请求速率（防暴力破解）

在 1Panel 配置中添加：

```nginx
# 在 http 块中定义限流区域（需要修改主配置）
limit_req_zone $binary_remote_addr zone=login_limit:10m rate=10r/m;

# 在 server 块中应用
location /login {
    limit_req zone=login_limit burst=5 nodelay;
    proxy_pass http://127.0.0.1:4000;
}
```

### 2. 隐藏 nginx 版本号

1Panel 面板 → nginx 主配置 → 添加：

```nginx
http {
    server_tokens off;  # 隐藏版本号
    # ...
}
```

### 3. IP 白名单（可选）

```nginx
# 仅允许特定 IP 访问管理后台
location /admin {
    allow 192.168.1.0/24;   # 允许内网
    allow 203.0.113.5;       # 允许特定 IP
    deny all;                # 拒绝其他所有

    proxy_pass http://127.0.0.1:4000;
}
```

---

## 📝 日志管理

### 查看访问日志

**通过 1Panel 界面**：
- 网站 → 选择站点 → 日志

**通过命令行**：

```bash
# 实时查看访问日志
tail -f /var/log/nginx/admin.rungame.online.access.log

# 查看错误日志
tail -f /var/log/nginx/admin.rungame.online.error.log
```

### 日志轮换

1Panel 通常已配置日志轮换，检查：

```bash
cat /etc/logrotate.d/nginx
```

---

## 🔑 外部 API 配置管理

### 概述

从 v1.1 版本开始，**Google Search API** 和 **Jina Reader API** 的密钥已从环境变量迁移到数据库存储，提供以下优势：

- ✅ **集中管理**：通过管理后台 Web 界面配置，无需修改环境变量
- ✅ **加密存储**：API Key 使用 AES-256-GCM 加密存储在数据库中
- ✅ **使用统计**：自动记录 API 调用次数和成功率
- ✅ **向后兼容**：仍支持从环境变量读取（回退机制）
- ✅ **热更新**：配置修改后立即生效，无需重启应用

### 配置方式

#### 方式一：通过管理后台配置（推荐）

1. **登录管理后台**：`https://admin.rungame.online/login`

2. **进入外部 API 配置页面**：导航到 `/admin/external-apis`

3. **添加 Google Search API 配置**：

   点击"添加配置"按钮，填写以下信息：

   ```json
   {
     "配置名称": "google_search",
     "显示名称": "Google Search API",
     "提供商": "google",
     "描述": "用于 GamePix 游戏导入时的 SEO 关键词搜索",
     "API 配置": {
       "apiKey": "your-google-api-key",
       "engineId": "your-search-engine-id",
       "endpoint": "https://www.googleapis.com/customsearch/v1"
     }
   }
   ```

4. **添加 Jina Reader API 配置**：

   ```json
   {
     "配置名称": "jina_reader",
     "显示名称": "Jina Reader API",
     "提供商": "jina",
     "描述": "用于将网页转换为 LLM 友好的 Markdown 格式",
     "API 配置": {
       "apiKey": "your-jina-api-key",
       "endpoint": "https://r.jina.ai",
       "timeout": 20,
       "options": {
         "withGeneratedAlt": true,
         "withImagesSummary": true,
         "withLinksSummary": false
       }
     }
   }
   ```

   **注意**：Jina Reader API Key 是可选的，不配置则使用免费模式。

5. **启用并激活配置**：
   - 勾选"启用配置"开关
   - 勾选"激活配置"开关（系统只会使用激活的配置）

#### 方式二：通过环境变量配置（向后兼容）

如果管理后台未配置，系统会自动回退到环境变量：

**在 `.env.local` 或 Docker 环境变量中添加**：

```bash
# Google Search API（可选，用于 GamePix 导入优化）
GOOGLE_SEARCH_API_KEY="your-google-api-key"
GOOGLE_SEARCH_ENGINE_ID="your-search-engine-id"

# Jina Reader API（可选，用于网页内容提取）
JINA_API_KEY="your-jina-api-key"
```

**Docker Compose 配置示例**：

```yaml
services:
  admin:
    environment:
      - GOOGLE_SEARCH_API_KEY=your-google-api-key
      - GOOGLE_SEARCH_ENGINE_ID=your-search-engine-id
      - JINA_API_KEY=your-jina-api-key
```

### 优先级说明

系统按以下顺序读取配置：

1. **数据库配置**（优先）- 从 `ExternalApiConfig` 表读取
2. **环境变量配置**（回退）- 从 `process.env` 读取
3. **默认配置/跳过**（最后）- 使用默认值或跳过该功能

### 查看使用统计

在管理后台 `/admin/external-apis` 页面，可以查看每个 API 的：

- 总调用次数
- 成功调用次数
- 失败调用次数
- 成功率百分比
- 最后使用时间

点击"统计"按钮可查看详细信息，点击"重置统计"可清零计数。

### 安全注意事项

1. **加密密钥**：确保 `ENCRYPTION_KEY` 环境变量已设置且足够复杂

   ```bash
   # 生成强加密密钥（32字节随机字符串）
   openssl rand -base64 32
   ```

2. **数据库访问**：`ExternalApiConfig` 表仅管理员可访问

3. **API Key 显示**：管理后台列表页显示掩码版本（`AIza****C5Y`），编辑页显示完整密钥

4. **缓存机制**：配置缓存 5 分钟，修改后自动失效

### 常见问题

**Q: 修改配置后需要重启应用吗？**
A: 不需要。配置使用 Next.js 缓存机制，修改后最多 5 分钟生效，或立即清除缓存。

**Q: 可以同时使用数据库和环境变量配置吗？**
A: 可以。数据库配置优先，如果数据库中没有或读取失败，会自动回退到环境变量。

**Q: Jina Reader 不配置 API Key 能用吗？**
A: 可以。Jina Reader 提供免费模式，不配置 API Key 时使用免费速率限制。

**Q: Google Search API 配额用完了怎么办？**
A: 免费版每天 100 次，付费版 $5/1000 次。可以在 [Google Cloud Console](https://console.cloud.google.com/apis/api/customsearch.googleapis.com/quotas) 查看配额。

**Q: 如何从环境变量迁移到数据库配置？**
A:
1. 登录管理后台，进入 `/admin/external-apis`
2. 添加新配置，填写环境变量中的 API Key
3. 启用并激活配置
4. 验证功能正常后，可以移除环境变量中的配置

---

## ✅ 部署检查清单

- [ ] 1Panel 面板正常运行
- [ ] 域名已解析到 VPS IP
- [ ] 防火墙已开放 80、443 端口
- [ ] 反向代理已创建（`admin.rungame.online` → `http://127.0.0.1:4000`）
- [ ] SSL 证书已申请并启用
- [ ] HTTP 自动重定向到 HTTPS
- [ ] `https://admin.rungame.online` 可正常访问
- [ ] 登录功能正常
- [ ] 静态资源加载正常
- [ ] 健康检查接口可访问：`https://admin.rungame.online/api/health`

---

## 🎯 总结

### 推荐部署流程

**对于 1Panel 用户，最简单的部署流程**：

1. **在 1Panel Web 界面创建反向代理网站**（2 分钟）
2. **申请 Let's Encrypt SSL 证书**（1 分钟）
3. **添加自定义配置优化**（可选，2 分钟）

**总耗时：3-5 分钟** ⚡

---

## 📚 相关资源

- [1Panel 官方文档](https://1panel.cn/docs/)
- [nginx 反向代理配置](https://nginx.org/en/docs/http/ngx_http_proxy_module.html)
- [Let's Encrypt 证书](https://letsencrypt.org/)

---

**最后更新**: 2025-11-17
