#!/bin/bash
# VPS Prisma 引擎快速修复脚本
# 直接在 VPS 上重新生成正确平台的 Prisma 客户端

set -e

echo "=========================================="
echo "🔧 VPS Prisma 引擎快速修复"
echo "=========================================="
echo ""

# 检测 VPS 平台
echo "🔍 检测 VPS 平台..."
if [ -f /etc/os-release ]; then
  . /etc/os-release
  echo "操作系统: $NAME $VERSION"
  OS_ID="$ID"
elif [ -f /etc/redhat-release ]; then
  echo "操作系统: $(cat /etc/redhat-release)"
  OS_ID="rhel"
else
  echo "⚠️  无法识别系统，假定为 RHEL"
  OS_ID="rhel"
fi

OPENSSL_VERSION=$(openssl version | grep -oP 'OpenSSL \K[0-9]+\.[0-9]+' || echo "1.1")
echo "OpenSSL 版本: $OPENSSL_VERSION"

# 确定平台
if [[ "$OS_ID" == "centos" || "$OS_ID" == "rhel" || "$OS_ID" == "rocky" || "$OS_ID" == "almalinux" ]]; then
  BASE_PLATFORM="rhel-openssl"
elif [[ "$OS_ID" == "debian" || "$OS_ID" == "ubuntu" ]]; then
  BASE_PLATFORM="debian-openssl"
else
  BASE_PLATFORM="rhel-openssl"  # 默认
fi

if [[ "$OPENSSL_VERSION" == "1.1"* ]]; then
  OPENSSL_SUFFIX="1.1.x"
elif [[ "$OPENSSL_VERSION" == "3.0"* ]]; then
  OPENSSL_SUFFIX="3.0.x"
else
  OPENSSL_SUFFIX="1.1.x"  # 默认
fi

BINARY_TARGET="${BASE_PLATFORM}-${OPENSSL_SUFFIX}"

echo ""
echo "✅ 检测结果: $BINARY_TARGET"
echo ""

# 进入部署目录
DEPLOY_DIR="/www/wwwroot/rungame"

if [ ! -d "$DEPLOY_DIR" ]; then
  echo "❌ 错误: 部署目录不存在: $DEPLOY_DIR"
  exit 1
fi

cd $DEPLOY_DIR

# 检查 packages/database 是否存在
if [ ! -d "packages/database" ]; then
  echo "⚠️  packages/database 目录不存在"
  echo "尝试从 standalone 目录恢复..."

  # 检查 standalone 目录中是否有 node_modules
  STANDALONE_NM="apps/admin/.next/standalone/node_modules"
  if [ -d "$STANDALONE_NM/@rungame/database" ]; then
    echo "✅ 找到 standalone 中的 database 包"
    cd "$STANDALONE_NM/@rungame/database"
  else
    echo "❌ 无法找到 database 包"
    exit 1
  fi
else
  cd packages/database
fi

echo "=========================================="
echo "📝 修改 Prisma schema"
echo "=========================================="

# 备份原始文件
if [ -f prisma/schema.prisma ]; then
  cp prisma/schema.prisma prisma/schema.prisma.vps-backup || true
fi

if [ -f prisma/schema-admin.prisma ]; then
  cp prisma/schema-admin.prisma prisma/schema-admin.prisma.vps-backup || true
fi

# 修改 binaryTargets
if [ -f prisma/schema.prisma ]; then
  echo "修改 schema.prisma..."
  sed -i.bak "s/binaryTargets = \[.*\]/binaryTargets = [\"native\", \"$BINARY_TARGET\"]/" prisma/schema.prisma
  echo "✅ schema.prisma 已修改"
  grep "binaryTargets" prisma/schema.prisma
fi

if [ -f prisma/schema-admin.prisma ]; then
  echo ""
  echo "修改 schema-admin.prisma..."
  sed -i.bak "s/binaryTargets = \[.*\]/binaryTargets = [\"native\", \"$BINARY_TARGET\"]/" prisma/schema-admin.prisma
  echo "✅ schema-admin.prisma 已修改"
  grep "binaryTargets" prisma/schema-admin.prisma
fi

echo ""
echo "=========================================="
echo "🔧 重新生成 Prisma 客户端"
echo "=========================================="

# 删除旧的生成文件
rm -rf src/generated/client
rm -rf src/generated/prisma-admin

# 重新生成
if [ -f prisma/schema.prisma ]; then
  echo "生成 client..."
  npx prisma generate --schema=prisma/schema.prisma
fi

if [ -f prisma/schema-admin.prisma ]; then
  echo ""
  echo "生成 prisma-admin..."
  npx prisma generate --schema=prisma/schema-admin.prisma
fi

echo ""
echo "=========================================="
echo "✅ 验证生成的文件"
echo "=========================================="

if [ -d "src/generated/client" ]; then
  echo "📦 Client 目录:"
  ls -lh src/generated/client/*.node 2>/dev/null || echo "⚠️  未找到 client .node 文件"
fi

if [ -d "src/generated/prisma-admin" ]; then
  echo ""
  echo "📦 Prisma-admin 目录:"
  ls -lh src/generated/prisma-admin/*.node 2>/dev/null || echo "⚠️  未找到 prisma-admin .node 文件"
fi

echo ""
echo "=========================================="
echo "📋 复制到 standalone 目录"
echo "=========================================="

cd $DEPLOY_DIR

STANDALONE_DIR="apps/admin/.next/standalone/apps/admin"

# 创建目标目录
mkdir -p $STANDALONE_DIR/src/generated/client
mkdir -p $STANDALONE_DIR/src/generated/prisma-admin

# 复制生成的文件
if [ -d "packages/database/src/generated/client" ]; then
  cp -r packages/database/src/generated/client/* $STANDALONE_DIR/src/generated/client/
  echo "✅ Client 已复制"
elif [ -d "apps/admin/.next/standalone/node_modules/@rungame/database/src/generated/client" ]; then
  cp -r apps/admin/.next/standalone/node_modules/@rungame/database/src/generated/client/* $STANDALONE_DIR/src/generated/client/
  echo "✅ Client 已从 node_modules 复制"
fi

if [ -d "packages/database/src/generated/prisma-admin" ]; then
  cp -r packages/database/src/generated/prisma-admin/* $STANDALONE_DIR/src/generated/prisma-admin/
  echo "✅ Prisma-admin 已复制"
elif [ -d "apps/admin/.next/standalone/node_modules/@rungame/database/src/generated/prisma-admin" ]; then
  cp -r apps/admin/.next/standalone/node_modules/@rungame/database/src/generated/prisma-admin/* $STANDALONE_DIR/src/generated/prisma-admin/
  echo "✅ Prisma-admin 已从 node_modules 复制"
fi

echo ""
echo "=========================================="
echo "🚀 重启 PM2 应用"
echo "=========================================="

pm2 restart rungame-admin

echo ""
echo "⏳ 等待服务启动..."
sleep 5

echo ""
echo "🔍 健康检查..."
if curl -f http://localhost:4000/api/health > /dev/null 2>&1; then
  echo "✅ 健康检查通过！"
else
  echo "⚠️  健康检查失败，请查看日志:"
  echo "pm2 logs rungame-admin --lines 50"
fi

echo ""
echo "=========================================="
echo "✅ 修复完成！"
echo "=========================================="
echo ""
echo "验证部署的二进制文件:"
ls -lh $STANDALONE_DIR/src/generated/*/libquery_engine*.node 2>/dev/null || echo "⚠️  未找到引擎文件"
