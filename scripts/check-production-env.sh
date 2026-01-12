#!/bin/bash
# 生产环境诊断脚本

echo "=========================================="
echo "🔍 RunGame 生产环境诊断"
echo "=========================================="

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo ""
echo "1️⃣ 检查最近的 Git 提交..."
echo "----------------------------------------"
git log --oneline -3
echo ""

echo "2️⃣ 检查 GitHub Secrets 配置..."
echo "----------------------------------------"
echo "必需的环境变量："
echo "  • DATABASE_URL"
echo "  • CACHE_DATABASE_URL"
echo "  • BETTER_AUTH_SECRET"
echo "  • BETTER_AUTH_URL"
echo "  • NEXT_PUBLIC_APP_URL"
echo "  • ENCRYPTION_KEY"
echo ""

echo "3️⃣ 诊断建议："
echo "----------------------------------------"
echo -e "${YELLOW}⚠️  如果看到 '无法连接到服务器' 错误，可能是：${NC}"
echo ""
echo "A. GitHub Actions 部署未完成"
echo "   访问：https://github.com/yangnie1991/rungame-monorepo/actions"
echo "   等待 'Deploy Admin to VPS (PM2)' 工作流完成"
echo ""
echo "B. 生产环境应用未重启"
echo "   需要在 VPS 上手动重启 PM2 应用："
echo "   ssh root@your-vps"
echo "   cd /opt/1panel/docker/compose/rungame-admin"
echo "   pm2 restart rungame-admin"
echo ""
echo "C. 环境变量未正确设置"
echo "   检查 VPS 上的 .env 文件："
echo "   cat .env | grep CACHE_DATABASE_URL"
echo ""
echo "D. 数据库连接问题"
echo "   运行数据库测试："
echo "   CACHE_DATABASE_URL=\"\$CACHE_DATABASE_URL\" \\"
echo "   pnpm tsx scripts/utils/quick-check-db.ts"
echo ""

echo "4️⃣ 快速修复方案："
echo "----------------------------------------"
echo "如果部署已完成，请在 VPS 上执行："
echo ""
echo "  # SSH 登录到 VPS"
echo "  ssh root@your-vps"
echo ""
echo "  # 进入项目目录"
echo "  cd /opt/1panel/docker/compose/rungame-admin"
echo ""
echo "  # 拉取最新代码"
echo "  git pull origin main"
echo ""
echo "  # 重启 PM2 应用"
echo "  pm2 restart rungame-admin"
echo ""
echo "  # 查看日志"
echo "  pm2 logs rungame-admin --lines 50"
echo ""

echo "=========================================="
echo "✅ 诊断完成"
echo "=========================================="
