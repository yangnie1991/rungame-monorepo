#!/bin/bash
# 修复生产环境 Admin 数据库表结构
# 创建缺失的 Account, Session, Verification 表

set -e

echo "=========================================="
echo "🔧 修复生产 Admin 数据库"
echo "=========================================="

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 检查环境变量
if [ -z "$CACHE_DATABASE_URL" ]; then
  echo -e "${RED}❌ CACHE_DATABASE_URL 环境变量未设置${NC}"
  echo ""
  echo "请设置生产数据库连接字符串:"
  echo "  export CACHE_DATABASE_URL=\"postgresql://user:pass@host/db?sslmode=require\""
  exit 1
fi

echo -e "${GREEN}✅ 环境变量已设置${NC}"
SAFE_URL=$(echo "$CACHE_DATABASE_URL" | sed 's/:[^:@]*@/:****@/')
echo "📡 数据库: $SAFE_URL"
echo ""

# 检查必要的工具
if ! command -v pnpm &> /dev/null; then
  echo -e "${RED}❌ pnpm 未安装${NC}"
  exit 1
fi

echo "=========================================="
echo "📋 步骤 1: 生成 Prisma Client"
echo "=========================================="
pnpm db:generate
echo -e "${GREEN}✅ Prisma Client 生成完成${NC}"
echo ""

echo "=========================================="
echo "📋 步骤 2: 推送数据库 Schema"
echo "=========================================="
echo "创建缺失的表: account, session, verification"
pnpm db:push --schema=packages/database-admin/prisma/schema.prisma
echo -e "${GREEN}✅ 数据库 Schema 推送完成${NC}"
echo ""

echo "=========================================="
echo "📋 步骤 3: 填充初始数据"
echo "=========================================="
echo "创建管理员账户和关联记录..."
CACHE_DATABASE_URL="$CACHE_DATABASE_URL" pnpm --filter @rungame/database-admin db:seed
echo -e "${GREEN}✅ 数据填充完成${NC}"
echo ""

echo "=========================================="
echo "✅ 修复完成！"
echo "=========================================="
echo ""
echo "🔐 登录信息:"
echo "   邮箱: admin@rungame.online"
echo "   密码: admin123"
echo "   地址: https://admin.rungame.online/login"
echo ""
echo "📝 注意:"
echo "   - 如果你已有管理员账户 (yangnie2017@gmail.com)"
echo "   - Seed 会更新密码为 admin123"
echo "   - 并创建关联的 Account 记录"
echo ""
