#!/bin/bash
# RunGame Admin - Docker Compose 部署脚本

set -e

echo "=========================================="
echo "🚀 RunGame Admin 部署脚本"
echo "=========================================="
echo ""

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# 检查 .env 文件
if [ ! -f ".env" ]; then
    echo -e "${RED}❌ .env 文件不存在${NC}"
    echo ""
    echo "请先创建 .env 文件："
    echo "  cp .env.admin.example .env"
    echo "  vi .env  # 填入实际的环境变量"
    exit 1
fi

echo -e "${BLUE}📋 使用方法：${NC}"
echo "  $0 up      # 启动服务"
echo "  $0 down    # 停止服务"
echo "  $0 restart # 重启服务"
echo "  $0 logs    # 查看日志"
echo "  $0 pull    # 拉取最新镜像"
echo ""

case "${1:-up}" in
  up)
    echo -e "${BLUE}🚀 启动服务...${NC}"
    docker-compose -f docker-compose.admin.yml up -d
    echo ""
    echo -e "${GREEN}✅ 服务启动成功！${NC}"
    echo ""
    echo "查看状态:"
    docker-compose -f docker-compose.admin.yml ps
    echo ""
    echo "查看日志:"
    echo "  $0 logs"
    ;;

  down)
    echo -e "${YELLOW}🛑 停止服务...${NC}"
    docker-compose -f docker-compose.admin.yml down
    echo -e "${GREEN}✅ 服务已停止${NC}"
    ;;

  restart)
    echo -e "${BLUE}🔄 重启服务...${NC}"
    docker-compose -f docker-compose.admin.yml restart
    echo -e "${GREEN}✅ 服务已重启${NC}"
    echo ""
    echo "查看日志:"
    echo "  $0 logs"
    ;;

  logs)
    echo -e "${BLUE}📋 查看日志（Ctrl+C 退出）...${NC}"
    docker-compose -f docker-compose.admin.yml logs -f
    ;;

  pull)
    echo -e "${BLUE}📥 拉取最新镜像...${NC}"
    docker-compose -f docker-compose.admin.yml pull
    echo -e "${GREEN}✅ 镜像拉取完成${NC}"
    echo ""
    echo "重启服务以使用新镜像:"
    echo "  $0 restart"
    ;;

  update)
    echo -e "${BLUE}🔄 更新并重启...${NC}"
    docker-compose -f docker-compose.admin.yml pull
    docker-compose -f docker-compose.admin.yml up -d
    echo -e "${GREEN}✅ 更新完成！${NC}"
    echo ""
    echo "查看日志:"
    echo "  $0 logs"
    ;;

  status)
    echo -e "${BLUE}📊 服务状态${NC}"
    docker-compose -f docker-compose.admin.yml ps
    echo ""
    docker ps --filter name=rungame-admin --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
    ;;

  *)
    echo -e "${RED}❌ 未知命令: $1${NC}"
    echo ""
    echo "可用命令:"
    echo "  up      - 启动服务"
    echo "  down    - 停止服务"
    echo "  restart - 重启服务"
    echo "  logs    - 查看日志"
    echo "  pull    - 拉取最新镜像"
    echo "  update  - 更新并重启"
    echo "  status  - 查看状态"
    exit 1
    ;;
esac

echo ""
echo "=========================================="
