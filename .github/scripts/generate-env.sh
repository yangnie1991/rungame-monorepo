#!/bin/bash

# ============================================================
# 生成 Admin 应用和 Docker Compose 环境变量文件
# 由 GitHub Actions 调用
# ============================================================

set -e

echo "📝 生成 Admin 应用配置文件..."
mkdir -p apps/admin

# 生成 apps/admin/.env.local
cat > apps/admin/.env.local << EOF
# ============================================================
# Admin 应用环境变量（Admin 部署专用）
# 由 GitHub Actions 自动生成 - 请勿手动编辑
# ============================================================

# ============================================
# 数据库配置
# ============================================
# 业务数据库连接（展示端和管理端共用）
DATABASE_URL=${DATABASE_URL}

# 管理数据库连接（仅管理端使用）
CACHE_DATABASE_URL=${CACHE_DATABASE_URL}

# ============================================
# NextAuth.js 配置（管理员认证）
# ============================================
NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
NEXTAUTH_URL=${NEXTAUTH_URL}

# ============================================
# AI 配置加密密钥
# ============================================
ENCRYPTION_KEY=${ENCRYPTION_KEY}

# ============================================
# 应用配置
# ============================================
NODE_ENV=${NODE_ENV}
NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL}

# Google Analytics（可选）
NEXT_PUBLIC_GA_ID=${NEXT_PUBLIC_GA_ID:-}

# Google AdSense（可选）
NEXT_PUBLIC_ADSENSE_ID=${NEXT_PUBLIC_ADSENSE_ID:-}

# ============================================
# Cloudflare R2 配置（可选）
# ============================================
R2_ACCOUNT_ID=${R2_ACCOUNT_ID:-}
R2_ACCESS_KEY_ID=${R2_ACCESS_KEY_ID:-}
R2_SECRET_ACCESS_KEY=${R2_SECRET_ACCESS_KEY:-}
R2_BUCKET_NAME=${R2_BUCKET_NAME:-}
R2_PUBLIC_URL=${R2_PUBLIC_URL:-}

# ============================================
# Google Custom Search API 配置（可选）
# ============================================
GOOGLE_SEARCH_API_KEY=${GOOGLE_SEARCH_API_KEY:-}
GOOGLE_SEARCH_ENGINE_ID=${GOOGLE_SEARCH_ENGINE_ID:-}
EOF

echo "✅ Admin .env.local 文件已生成"

# 生成根目录 .env（用于 docker-compose 读取）
echo "📝 生成 Docker Compose 配置文件..."

cat > .env << EOF
# Docker Compose 环境变量（由 GitHub Actions 自动生成）
DATABASE_URL=${DATABASE_URL}
CACHE_DATABASE_URL=${CACHE_DATABASE_URL}
NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
NEXTAUTH_URL=${NEXTAUTH_URL}
NODE_ENV=${NODE_ENV}
EOF

echo "✅ Docker Compose .env 文件已生成"

# 显示生成的配置文件（隐藏敏感信息）
echo ""
echo "📋 生成的配置文件概览:"
echo "  - .env (Docker Compose): $(grep -c '^[A-Z]' .env || echo 0) 个变量"
echo "  - apps/admin/.env.local (Admin App): $(grep -c '^[A-Z]' apps/admin/.env.local || echo 0) 个变量"
echo ""
