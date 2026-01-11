#!/bin/bash

# ==============================================
# RunGame 管理端自动部署脚本
# 适用于 1Panel Docker 环境
# ==============================================

set -e  # 遇到错误立即退出

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 日志函数
log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 配置
PROJECT_NAME="rungame-admin"
DOCKER_COMPOSE_FILE="docker-compose.deploy.yml"
BACKUP_DIR="/opt/1panel/docker/compose/${PROJECT_NAME}/backups"
MAX_BACKUPS=5

# ==============================================
# 1. 检查前置条件
# ==============================================
log_info "检查部署环境..."

# 检查 Docker
if ! command -v docker &> /dev/null; then
    log_error "Docker 未安装，请先安装 Docker"
    exit 1
fi

# 检查 Docker Compose
if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
    log_error "Docker Compose 未安装"
    exit 1
fi

# 检查环境变量文件
if [ ! -f ".env" ]; then
    log_error ".env 文件不存在，请先创建环境变量文件"
    log_info "参考 .env.admin.example 创建 .env 文件"
    exit 1
fi

# ==============================================
# 2. 拉取最新代码（如果在 Git 仓库中）
# ==============================================
if [ -d ".git" ]; then
    log_info "拉取最新代码..."
    git pull origin main || {
        log_warn "代码拉取失败，使用现有代码继续部署"
    }
else
    log_warn "不是 Git 仓库，跳过代码更新"
fi

# ==============================================
# 3. 备份当前容器（如果存在）
# ==============================================
if docker ps -a --format '{{.Names}}' | grep -q "^${PROJECT_NAME}$"; then
    log_info "备份当前容器..."

    # 创建备份目录
    mkdir -p "${BACKUP_DIR}"

    # 备份时间戳
    BACKUP_TIME=$(date +%Y%m%d_%H%M%S)
    BACKUP_FILE="${BACKUP_DIR}/backup_${BACKUP_TIME}.tar"

    # 导出容器镜像
    docker commit ${PROJECT_NAME} ${PROJECT_NAME}:backup-${BACKUP_TIME} || log_warn "容器备份失败"
    docker save -o ${BACKUP_FILE} ${PROJECT_NAME}:backup-${BACKUP_TIME} || log_warn "镜像保存失败"

    log_info "备份完成: ${BACKUP_FILE}"

    # 清理旧备份（保留最新 N 个）
    cd ${BACKUP_DIR}
    ls -t backup_*.tar | tail -n +$((MAX_BACKUPS + 1)) | xargs -r rm
    cd - > /dev/null
fi

# ==============================================
# 4. 停止旧容器
# ==============================================
log_info "停止旧容器..."
docker-compose -f ${DOCKER_COMPOSE_FILE} down || docker compose -f ${DOCKER_COMPOSE_FILE} down || true

# ==============================================
# 5. 清理旧镜像（可选）
# ==============================================
log_info "清理未使用的镜像..."
docker image prune -f || true

# ==============================================
# 6. 构建新镜像
# ==============================================
log_info "构建新镜像..."
docker-compose -f ${DOCKER_COMPOSE_FILE} build --no-cache || \
docker compose -f ${DOCKER_COMPOSE_FILE} build --no-cache || {
    log_error "镜像构建失败"
    exit 1
}

# ==============================================
# 7. 启动新容器
# ==============================================
log_info "启动新容器..."
docker-compose -f ${DOCKER_COMPOSE_FILE} up -d || \
docker compose -f ${DOCKER_COMPOSE_FILE} up -d || {
    log_error "容器启动失败"
    exit 1
}

# ==============================================
# 8. 等待服务启动
# ==============================================
log_info "等待服务启动..."
sleep 10

# ==============================================
# 9. 健康检查
# ==============================================
log_info "执行健康检查..."
MAX_RETRIES=30
RETRY_COUNT=0

while [ $RETRY_COUNT -lt $MAX_RETRIES ]; do
    if curl -f http://localhost:3001/api/health > /dev/null 2>&1; then
        log_info "健康检查通过！"
        break
    fi

    RETRY_COUNT=$((RETRY_COUNT + 1))
    log_info "等待服务就绪... ($RETRY_COUNT/$MAX_RETRIES)"
    sleep 2
done

if [ $RETRY_COUNT -eq $MAX_RETRIES ]; then
    log_error "健康检查失败，服务可能未正常启动"
    log_info "查看日志: docker logs ${PROJECT_NAME}"
    exit 1
fi

# ==============================================
# 10. 显示部署信息
# ==============================================
log_info "=========================================="
log_info "部署成功！"
log_info "=========================================="
log_info "容器名称: ${PROJECT_NAME}"
log_info "访问地址: http://localhost:3001"
log_info "健康检查: http://localhost:3001/api/health"
log_info ""
log_info "常用命令:"
log_info "  查看日志: docker logs -f ${PROJECT_NAME}"
log_info "  重启服务: docker restart ${PROJECT_NAME}"
log_info "  停止服务: docker-compose -f ${DOCKER_COMPOSE_FILE} down"
log_info "=========================================="
