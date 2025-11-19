#!/bin/bash
# Prisma 引擎文件检查脚本
# 用于在 VPS 上检查实际部署的 Prisma 二进制文件

set -e

echo "=========================================="
echo "🔍 检查 VPS 上的 Prisma 引擎文件"
echo "=========================================="
echo ""

DEPLOY_DIR="/www/wwwroot/rungame"

if [ ! -d "$DEPLOY_DIR" ]; then
  echo "❌ 错误: 部署目录不存在: $DEPLOY_DIR"
  exit 1
fi

cd $DEPLOY_DIR

echo "📂 部署目录: $DEPLOY_DIR"
echo ""

# 1. 检查 client 目录
echo "=========================================="
echo "📦 检查 client 目录"
echo "=========================================="

CLIENT_DIR="apps/admin/.next/standalone/apps/admin/src/generated/client"

if [ -d "$CLIENT_DIR" ]; then
  echo "✅ Client 目录存在"
  echo ""
  echo "🔍 二进制文件列表:"
  find "$CLIENT_DIR" -name "*.node" -o -name "*.dylib.node" 2>/dev/null | while read -r file; do
    filename=$(basename "$file")
    filesize=$(du -h "$file" | cut -f1)
    echo "  📄 $filename ($filesize)"
  done

  echo ""
  echo "📊 目录大小:"
  du -sh "$CLIENT_DIR"
else
  echo "❌ Client 目录不存在: $CLIENT_DIR"
fi

echo ""

# 2. 检查 prisma-admin 目录
echo "=========================================="
echo "📦 检查 prisma-admin 目录"
echo "=========================================="

ADMIN_DIR="apps/admin/.next/standalone/apps/admin/src/generated/prisma-admin"

if [ -d "$ADMIN_DIR" ]; then
  echo "✅ Prisma-admin 目录存在"
  echo ""
  echo "🔍 二进制文件列表:"
  find "$ADMIN_DIR" -name "*.node" -o -name "*.dylib.node" 2>/dev/null | while read -r file; do
    filename=$(basename "$file")
    filesize=$(du -h "$file" | cut -f1)
    echo "  📄 $filename ($filesize)"
  done

  echo ""
  echo "📊 目录大小:"
  du -sh "$ADMIN_DIR"
else
  echo "❌ Prisma-admin 目录不存在: $ADMIN_DIR"
fi

echo ""

# 3. 搜索所有 Prisma 引擎文件
echo "=========================================="
echo "🔎 搜索所有 Prisma 引擎文件"
echo "=========================================="

echo "搜索范围: $DEPLOY_DIR"
echo ""

ALL_ENGINES=$(find "$DEPLOY_DIR" -name "libquery_engine*.node" -o -name "libquery_engine*.dylib.node" 2>/dev/null)

if [ -n "$ALL_ENGINES" ]; then
  echo "$ALL_ENGINES" | while read -r file; do
    filename=$(basename "$file")
    filepath=$(dirname "$file" | sed "s|$DEPLOY_DIR/||")
    filesize=$(du -h "$file" | cut -f1)
    echo "  📄 $filename"
    echo "     位置: $filepath"
    echo "     大小: $filesize"
    echo ""
  done
else
  echo "⚠️  未找到任何 Prisma 引擎文件"
fi

# 4. 检查系统信息
echo "=========================================="
echo "🖥️  系统信息"
echo "=========================================="

if [ -f /etc/os-release ]; then
  echo "操作系统:"
  grep "^PRETTY_NAME=" /etc/os-release | cut -d'"' -f2
fi

echo ""
echo "OpenSSL 版本:"
openssl version

echo ""
echo "内核版本:"
uname -r

echo ""
echo "=========================================="
echo "✅ 检查完成"
echo "=========================================="
