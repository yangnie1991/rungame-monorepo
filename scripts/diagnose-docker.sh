#!/bin/bash
# Docker 容器诊断脚本
# 在 VPS 上运行此脚本

set -e

echo "=========================================="
echo "🐳 RunGame Admin Docker 诊断"
echo "=========================================="
echo ""

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# 1. 容器状态
echo -e "${BLUE}1️⃣  容器状态${NC}"
echo "=========================================="
docker ps -a | grep rungame-admin || echo -e "${RED}❌ 容器不存在${NC}"
echo ""

# 2. 容器详细信息
echo -e "${BLUE}2️⃣  容器详细信息${NC}"
echo "=========================================="
CONTAINER_ID=$(docker ps -q -f name=rungame-admin)
if [ -n "$CONTAINER_ID" ]; then
    echo "容器 ID: $CONTAINER_ID"
    echo "镜像: $(docker inspect rungame-admin | jq -r '.[0].Config.Image')"
    echo "创建时间: $(docker inspect rungame-admin | jq -r '.[0].Created')"
    echo "状态: $(docker inspect rungame-admin | jq -r '.[0].State.Status')"
    echo "重启次数: $(docker inspect rungame-admin | jq -r '.[0].RestartCount')"
else
    echo -e "${RED}❌ 容器未运行${NC}"
fi
echo ""

# 3. 端口映射
echo -e "${BLUE}3️⃣  端口映射${NC}"
echo "=========================================="
docker port rungame-admin
echo ""

# 4. 环境变量检查
echo -e "${BLUE}4️⃣  环境变量检查${NC}"
echo "=========================================="
if [ -n "$CONTAINER_ID" ]; then
    echo "关键环境变量："
    docker exec rungame-admin sh -c 'echo "DATABASE_URL: ${DATABASE_URL:+已设置}"'
    docker exec rungame-admin sh -c 'echo "CACHE_DATABASE_URL: ${CACHE_DATABASE_URL:+已设置}"'
    docker exec rungame-admin sh -c 'echo "BETTER_AUTH_SECRET: ${BETTER_AUTH_SECRET:+已设置}"'
    docker exec rungame-admin sh -c 'echo "BETTER_AUTH_URL: $BETTER_AUTH_URL"'
    docker exec rungame-admin sh -c 'echo "NEXT_PUBLIC_APP_URL: $NEXT_PUBLIC_APP_URL"'
    docker exec rungame-admin sh -c 'echo "ENCRYPTION_KEY: ${ENCRYPTION_KEY:+已设置}"'
else
    echo -e "${YELLOW}⚠️  容器未运行，无法检查环境变量${NC}"
fi
echo ""

# 5. 容器内文件检查
echo -e "${BLUE}5️⃣  容器内文件检查${NC}"
echo "=========================================="
if [ -n "$CONTAINER_ID" ]; then
    echo "检查 standalone 文件："
    docker exec rungame-admin ls -la /app/apps/admin/ | grep -E "server.js|\.next|node_modules"
    echo ""
    echo "检查数据库包："
    docker exec rungame-admin ls -la /app/packages/ 2>/dev/null || echo -e "${RED}❌ packages 目录不存在${NC}"
else
    echo -e "${YELLOW}⚠️  容器未运行，无法检查文件${NC}"
fi
echo ""

# 6. 容器日志（最近 50 行）
echo -e "${BLUE}6️⃣  容器日志（最近 50 行）${NC}"
echo "=========================================="
docker logs rungame-admin --tail 50 2>&1
echo ""

# 7. 错误日志
echo -e "${BLUE}7️⃣  错误日志筛选${NC}"
echo "=========================================="
docker logs rungame-admin 2>&1 | grep -iE "error|fail|exception|cannot" | tail -20 || echo "✅ 未发现错误"
echo ""

# 8. 健康检查
echo -e "${BLUE}8️⃣  健康检查${NC}"
echo "=========================================="
HEALTH_CHECK=$(docker inspect --format='{{.State.Health.Status}}' rungame-admin 2>/dev/null || echo "无健康检查")
echo "健康状态: $HEALTH_CHECK"
echo ""

# 9. 测试 API 端点
echo -e "${BLUE}9️⃣  API 端点测试${NC}"
echo "=========================================="
echo "测试 /api/health:"
curl -s -o /dev/null -w "  HTTP 状态码: %{http_code}\n  总时间: %{time_total}s\n" http://localhost:4000/api/health || echo -e "${RED}❌ 请求失败${NC}"
echo ""

echo "测试根路径:"
curl -s -o /dev/null -w "  HTTP 状态码: %{http_code}\n  总时间: %{time_total}s\n" http://localhost:4000/ || echo -e "${RED}❌ 请求失败${NC}"
echo ""

# 10. 端口监听检查
echo -e "${BLUE}🔟 端口监听检查${NC}"
echo "=========================================="
if command -v netstat &> /dev/null; then
    netstat -tuln | grep :4000 && echo -e "${GREEN}✅ 4000 端口正在监听${NC}" || echo -e "${RED}❌ 4000 端口未监听${NC}"
elif command -v ss &> /dev/null; then
    ss -tuln | grep :4000 && echo -e "${GREEN}✅ 4000 端口正在监听${NC}" || echo -e "${RED}❌ 4000 端口未监听${NC}"
fi
echo ""

# 11. 防火墙检查
echo -e "${BLUE}1️⃣1️⃣  防火墙检查${NC}"
echo "=========================================="
if command -v ufw &> /dev/null; then
    ufw status | grep 4000 && echo -e "${GREEN}✅ 4000 端口已允许${NC}" || echo -e "${YELLOW}⚠️  4000 端口未在防火墙规则中${NC}"
elif command -v firewall-cmd &> /dev/null; then
    firewall-cmd --list-ports | grep 4000 && echo -e "${GREEN}✅ 4000 端口已开放${NC}" || echo -e "${YELLOW}⚠️  4000 端口未开放${NC}"
fi
echo ""

# 12. 数据库连接测试（从容器内）
echo -e "${BLUE}1️⃣2️⃣  数据库连接测试${NC}"
echo "=========================================="
if [ -n "$CONTAINER_ID" ]; then
    echo "测试 CACHE_DATABASE_URL 连接..."
    # 检查环境变量是否设置
    HAS_DB_URL=$(docker exec rungame-admin sh -c 'echo ${CACHE_DATABASE_URL:-未设置}')
    if [ "$HAS_DB_URL" = "未设置" ]; then
        echo -e "${RED}❌ CACHE_DATABASE_URL 未设置${NC}"
    else
        echo -e "${GREEN}✅ CACHE_DATABASE_URL 已设置${NC}"
        # 显示安全版本
        SAFE_URL=$(docker exec rungame-admin sh -c 'echo $CACHE_DATABASE_URL' | sed 's/:[^:@]*@/:****@/')
        echo "  连接字符串: $SAFE_URL"
    fi
else
    echo -e "${YELLOW}⚠️  容器未运行，无法测试数据库连接${NC}"
fi
echo ""

# 13. 常见问题诊断
echo -e "${BLUE}1️⃣3️⃣  常见问题诊断${NC}"
echo "=========================================="

# 检查内存使用
MEMORY=$(docker stats rungame-admin --no-stream --format "{{.MemUsage}}" 2>/dev/null || echo "N/A")
echo "内存使用: $MEMORY"

# 检查 CPU 使用
CPU=$(docker stats rungame-admin --no-stream --format "{{.CPUPerc}}" 2>/dev/null || echo "N/A")
echo "CPU 使用: $CPU"
echo ""

# 14. 建议和解决方案
echo -e "${BLUE}💡 建议和解决方案${NC}"
echo "=========================================="
echo ""
echo "如果看到 'Ready in 134ms' 但无法访问："
echo ""
echo "A. 前端页面无法打开"
echo "   1. 检查 Nginx 反向代理配置（如果使用）"
echo "   2. 测试直接访问: curl http://localhost:4000"
echo "   3. 检查防火墙: sudo ufw status"
echo ""
echo "B. 登录功能失败"
echo "   1. 检查数据库连接日志: docker logs rungame-admin 2>&1 | grep -i database"
echo "   2. 验证环境变量: docker exec rungame-admin env | grep CACHE"
echo "   3. 测试数据库: 见上方数据库连接测试"
echo ""
echo "C. 容器频繁重启"
echo "   1. 查看完整日志: docker logs rungame-admin --tail 100"
echo "   2. 检查健康状态: docker inspect rungame-admin | jq '.[0].State.Health'"
echo "   3. 重启容器: docker restart rungame-admin"
echo ""
echo "D. 需要进入容器调试"
echo "   docker exec -it rungame-admin sh"
echo "   cd /app"
echo "   ls -la"
echo "   cat apps/admin/package.json | grep better-auth"
echo ""
echo "=========================================="
echo "✅ 诊断完成"
echo "=========================================="
