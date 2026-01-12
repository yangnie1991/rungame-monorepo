#!/bin/bash
# 生产环境 VPS 诊断脚本
# 在 VPS 上运行此脚本

set -e

echo "=========================================="
echo "🔍 RunGame 生产环境诊断 (VPS)"
echo "=========================================="
echo ""

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# 1. 检查 PM2 应用状态
echo "1️⃣  PM2 应用状态"
echo "=========================================="
if command -v pm2 &> /dev/null; then
    pm2 status
    echo ""
    echo "PM2 进程详情："
    pm2 jlist
else
    echo -e "${RED}❌ PM2 未安装${NC}"
fi
echo ""

# 2. 检查应用日志（最近 50 行）
echo "2️⃣  应用日志（最近 50 行）"
echo "=========================================="
if command -v pm2 &> /dev/null; then
    pm2 logs rungame-admin --lines 50 --nostream
fi
echo ""

# 3. 检查环境变量
echo "3️⃣  环境变量检查"
echo "=========================================="
cd /opt/1panel/docker/compose/rungame-admin 2>/dev/null || cd ~/rungame-admin

if [ -f ".env" ]; then
    echo -e "${GREEN}✅ .env 文件存在${NC}"
    echo ""
    echo "关键环境变量："
    echo "----------------------------------------"
    grep "CACHE_DATABASE_URL" .env | sed 's/=.*/=****/' || echo -e "${RED}❌ CACHE_DATABASE_URL 未设置${NC}"
    grep "DATABASE_URL" .env | sed 's/=.*/=****/' || echo -e "${RED}❌ DATABASE_URL 未设置${NC}"
    grep "BETTER_AUTH_SECRET" .env | sed 's/=.*/=****/' || echo -e "${YELLOW}⚠️  BETTER_AUTH_SECRET 未设置${NC}"
    grep "BETTER_AUTH_URL" .env || echo -e "${YELLOW}⚠️  BETTER_AUTH_URL 未设置${NC}"
    echo "----------------------------------------"
else
    echo -e "${RED}❌ .env 文件不存在${NC}"
fi
echo ""

# 4. 测试数据库连接
echo "4️⃣  测试数据库连接"
echo "=========================================="
if [ -f ".env" ]; then
    source .env

    if [ -n "$CACHE_DATABASE_URL" ]; then
        echo "测试管理数据库连接..."
        if command -v psql &> /dev/null; then
            PGPASSWORD=$(echo "$CACHE_DATABASE_URL" | sed 's/.*:\([^:]*\)@.*/\1/') \
            psql "$CACHE_DATABASE_URL" -c "SELECT version();" > /dev/null 2>&1 && \
            echo -e "${GREEN}✅ 管理数据库连接成功${NC}" || \
            echo -e "${RED}❌ 管理数据库连接失败${NC}"
        else
            echo -e "${YELLOW}⚠️  psql 未安装，跳过数据库测试${NC}"
        fi
    else
        echo -e "${RED}❌ CACHE_DATABASE_URL 未设置，无法测试${NC}"
    fi
fi
echo ""

# 5. 检查端口监听
echo "5️⃣  检查端口监听"
echo "=========================================="
echo "检查 4000 端口（Admin）："
if command -v netstat &> /dev/null; then
    netstat -tuln | grep :4000 && echo -e "${GREEN}✅ 4000 端口正在监听${NC}" || echo -e "${RED}❌ 4000 端口未监听${NC}"
elif command -v ss &> /dev/null; then
    ss -tuln | grep :4000 && echo -e "${GREEN}✅ 4000 端口正在监听${NC}" || echo -e "${RED}❌ 4000 端口未监听${NC}"
fi
echo ""

# 6. 检查磁盘空间
echo "6️⃣  磁盘空间"
echo "=========================================="
df -h | grep -E "Filesystem|/$"
echo ""

# 7. 检查内存使用
echo "7️⃣  内存使用"
echo "=========================================="
free -h
echo ""

# 8. 诊断建议
echo "=========================================="
echo "💡 常见问题解决方案"
echo "=========================================="
echo ""
echo "如果看到数据库连接错误："
echo "  1. 检查 CACHE_DATABASE_URL 格式是否正确"
echo "  2. 确认数据库服务器可访问"
echo "  3. 检查 IP 白名单设置"
echo ""
echo "如果应用未运行："
echo "  pm2 restart rungame-admin"
echo ""
echo "如果需要重新部署："
echo "  git pull origin main"
echo "  pnpm install"
echo "  pnpm db:generate"
echo "  pnpm build:admin"
echo "  pm2 restart rungame-admin"
echo ""
echo "查看实时日志："
echo "  pm2 logs rungame-admin"
echo ""
echo "=========================================="
echo "✅ 诊断完成"
echo "=========================================="
