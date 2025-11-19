#!/bin/bash

# ============================================
# Nginx 反向代理部署脚本
# 用于配置 RunGame Admin 的域名绑定
# ============================================

set -e

echo "=========================================="
echo "🚀 配置 Nginx 反向代理"
echo "=========================================="

# 检查是否已安装 Nginx
if ! command -v nginx &> /dev/null; then
    echo "❌ Nginx 未安装，请先安装："
    echo "Ubuntu/Debian: sudo apt install nginx"
    echo "CentOS/RHEL: sudo yum install nginx"
    exit 1
fi

# 检查是否已安装 Certbot
if ! command -v certbot &> /dev/null; then
    echo "❌ Certbot 未安装，请先安装："
    echo "Ubuntu/Debian: sudo apt install certbot python3-certbot-nginx"
    echo "CentOS/RHEL: sudo yum install certbot python3-certbot-nginx"
    exit 1
fi

# 域名配置
DOMAIN="${1:-admin.rungame.online}"
APP_PORT="${2:-4000}"
EMAIL="${3:-admin@rungame.online}"

echo "📋 配置信息："
echo "   域名: $DOMAIN"
echo "   应用端口: $APP_PORT"
echo "   邮箱: $EMAIL"
echo ""

# 创建 Nginx 配置
echo "📝 创建 Nginx 配置文件..."
sudo tee /etc/nginx/sites-available/$DOMAIN > /dev/null <<EOF
# HTTP 服务器 - 临时配置（用于申请证书）
server {
    listen 80;
    listen [::]:80;
    server_name $DOMAIN;

    # Rate Limiting
    limit_req zone=general_limit burst=20 nodelay;

    # 日志配置
    access_log /var/log/nginx/${DOMAIN}.access.log;
    error_log /var/log/nginx/${DOMAIN}.error.log;

    location / {
        proxy_pass http://localhost:$APP_PORT;
        proxy_http_version 1.1;

        # WebSocket 支持
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';

        # 请求头转发
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;

        # 超时设置
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;

        # 缓冲区设置
        proxy_buffering on;
        proxy_buffer_size 4k;
        proxy_buffers 8 4k;
    }

    # 静态资源缓存
    location /_next/static {
        proxy_pass http://localhost:$APP_PORT;
        expires 365d;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    # 文件上传大小限制
    client_max_body_size 50M;
}
EOF

# 创建 sites-enabled 目录（如果不存在）
sudo mkdir -p /etc/nginx/sites-enabled

# 启用站点
echo "🔗 启用站点配置..."
sudo ln -sf /etc/nginx/sites-available/$DOMAIN /etc/nginx/sites-enabled/

# 测试配置
echo "🔍 测试 Nginx 配置..."
sudo nginx -t

# 重载 Nginx
echo "🔄 重载 Nginx..."
sudo systemctl reload nginx

# 申请 SSL 证书
echo "🔐 申请 SSL 证书（Let's Encrypt）..."
sudo certbot --nginx -d $DOMAIN --non-interactive --agree-tos --email $EMAIL

echo ""
echo "=========================================="
echo "✅ 配置完成！"
echo "🌐 HTTP 访问: http://$DOMAIN"
echo "🔒 HTTPS 访问: https://$DOMAIN"
echo ""
echo "📝 配置文件位置: /etc/nginx/sites-available/$DOMAIN"
echo "📊 日志位置: /var/log/nginx/${DOMAIN}.*.log"
echo ""
echo "常用命令："
echo "  查看日志: sudo tail -f /var/log/nginx/${DOMAIN}.access.log"
echo "  重载配置: sudo nginx -t && sudo systemctl reload nginx"
echo "  续期证书: sudo certbot renew --dry-run"
echo "=========================================="
