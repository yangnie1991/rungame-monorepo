#!/bin/bash
# Docker 网络和 iptables 修复脚本
# 用于解决 "Chain 'DOCKER' does not exist" 错误

set -e

echo "========================================="
echo "Docker 网络和 iptables 修复脚本"
echo "========================================="

# 检查是否为 root 用户
if [ "$EUID" -ne 0 ]; then
  echo "❌ 错误: 请使用 root 用户或 sudo 运行此脚本"
  echo "使用方法: sudo bash .github/fix-docker-network.sh"
  exit 1
fi

echo ""
echo "步骤 1: 停止所有运行中的容器..."
docker ps -q | xargs -r docker stop || true

echo ""
echo "步骤 2: 清理旧的 Docker 网络..."
docker network prune -f || true

echo ""
echo "步骤 3: 重启 Docker 服务（重建 iptables 规则）..."
systemctl restart docker

echo ""
echo "步骤 4: 等待 Docker 服务完全启动..."
sleep 5

echo ""
echo "步骤 5: 验证 Docker 服务状态..."
systemctl status docker --no-pager || true

echo ""
echo "步骤 6: 检查 iptables DOCKER 链..."
if iptables -L DOCKER -n &>/dev/null; then
    echo "✅ iptables DOCKER 链已成功创建"
else
    echo "⚠️  警告: iptables DOCKER 链仍不存在，尝试手动创建..."

    # 手动创建 DOCKER 链
    iptables -t filter -N DOCKER 2>/dev/null || true
    iptables -t filter -N DOCKER-ISOLATION-STAGE-1 2>/dev/null || true
    iptables -t filter -N DOCKER-ISOLATION-STAGE-2 2>/dev/null || true
    iptables -t nat -N DOCKER 2>/dev/null || true

    echo "再次重启 Docker 服务..."
    systemctl restart docker
    sleep 5
fi

echo ""
echo "步骤 7: 列出现有网络..."
docker network ls

echo ""
echo "========================================="
echo "✅ 修复完成！"
echo "========================================="
echo ""
echo "下一步操作："
echo "1. 重新部署容器: cd /opt/1panel/docker/compose/rungame-admin && docker compose up -d"
echo "2. 查看容器状态: docker ps"
echo "3. 查看容器日志: docker logs rungame-admin"
echo ""
