# RunGame Monorepo - Docker 管理 Makefile
# 基于 Next.js with-docker-multi-env 官方示例

.PHONY: help build-admin build-website build-all start-admin start-website start-all stop-admin stop-website stop-all clean logs-admin logs-website

# 默认目标
help:
	@echo "RunGame Docker 管理命令:"
	@echo ""
	@echo "构建镜像:"
	@echo "  make build-admin       - 构建 Admin 应用镜像"
	@echo "  make build-website     - 构建 Website 应用镜像"
	@echo "  make build-all         - 构建所有应用镜像"
	@echo ""
	@echo "启动容器:"
	@echo "  make start-admin       - 启动 Admin 容器 (端口 3001)"
	@echo "  make start-website     - 启动 Website 容器 (端口 3000)"
	@echo "  make start-all         - 启动所有容器"
	@echo ""
	@echo "停止容器:"
	@echo "  make stop-admin        - 停止 Admin 容器"
	@echo "  make stop-website      - 停止 Website 容器"
	@echo "  make stop-all          - 停止所有容器"
	@echo ""
	@echo "日志查看:"
	@echo "  make logs-admin        - 查看 Admin 容器日志"
	@echo "  make logs-website      - 查看 Website 容器日志"
	@echo ""
	@echo "清理:"
	@echo "  make clean             - 清理所有容器和镜像"

# ============================================
# Admin 应用
# ============================================

build-admin:
	@echo "🔨 构建 Admin 镜像..."
	@if [ ! -f .env ]; then \
		echo "⚠️  警告: .env 文件不存在，使用 .env.example"; \
		cp .env.example .env; \
	fi
	docker build \
		--file Dockerfile.admin \
		--build-arg DATABASE_URL="${DATABASE_URL}" \
		--build-arg NEXTAUTH_SECRET="${NEXTAUTH_SECRET}" \
		--build-arg NEXTAUTH_URL="${NEXTAUTH_URL:-http://localhost:3001}" \
		--tag rungame-admin:latest \
		--tag rungame-admin:$(shell date +%Y%m%d-%H%M%S) \
		.
	@echo "✅ Admin 镜像构建完成"

start-admin:
	@echo "🚀 启动 Admin 容器..."
	@if [ ! -f .env ]; then \
		echo "❌ 错误: .env 文件不存在"; \
		exit 1; \
	fi
	docker run -d \
		--name rungame-admin \
		--restart unless-stopped \
		-p 3001:3001 \
		--env-file .env \
		-e PORT=3001 \
		rungame-admin:latest
	@echo "✅ Admin 容器已启动: http://localhost:3001"
	@echo "📊 查看日志: make logs-admin"

stop-admin:
	@echo "🛑 停止 Admin 容器..."
	@docker stop rungame-admin 2>/dev/null || echo "⚠️  容器未运行"
	@docker rm rungame-admin 2>/dev/null || echo "⚠️  容器不存在"
	@echo "✅ Admin 容器已停止"

logs-admin:
	@echo "📋 查看 Admin 日志 (Ctrl+C 退出)..."
	@docker logs -f rungame-admin

# ============================================
# Website 应用
# ============================================

build-website:
	@echo "🔨 构建 Website 镜像..."
	@if [ ! -f .env ]; then \
		echo "⚠️  警告: .env 文件不存在，使用 .env.example"; \
		cp .env.example .env; \
	fi
	docker build \
		--file Dockerfile.website \
		--dockerignore .dockerignore.website \
		--build-arg DATABASE_URL="${DATABASE_URL}" \
		--tag rungame-website:latest \
		--tag rungame-website:$(shell date +%Y%m%d-%H%M%S) \
		.
	@echo "✅ Website 镜像构建完成"

start-website:
	@echo "🚀 启动 Website 容器..."
	@if [ ! -f .env ]; then \
		echo "❌ 错误: .env 文件不存在"; \
		exit 1; \
	fi
	docker run -d \
		--name rungame-website \
		--restart unless-stopped \
		-p 3000:3000 \
		--env-file .env \
		-e PORT=3000 \
		rungame-website:latest
	@echo "✅ Website 容器已启动: http://localhost:3000"
	@echo "📊 查看日志: make logs-website"

stop-website:
	@echo "🛑 停止 Website 容器..."
	@docker stop rungame-website 2>/dev/null || echo "⚠️  容器未运行"
	@docker rm rungame-website 2>/dev/null || echo "⚠️  容器不存在"
	@echo "✅ Website 容器已停止"

logs-website:
	@echo "📋 查看 Website 日志 (Ctrl+C 退出)..."
	@docker logs -f rungame-website

# ============================================
# 批量操作
# ============================================

build-all: build-admin build-website
	@echo "🎉 所有镜像构建完成！"

start-all: start-admin start-website
	@echo "🎉 所有容器已启动！"
	@echo ""
	@echo "访问地址:"
	@echo "  - Admin:   http://localhost:3001"
	@echo "  - Website: http://localhost:3000"

stop-all: stop-admin stop-website
	@echo "🎉 所有容器已停止！"

# ============================================
# 清理
# ============================================

clean: stop-all
	@echo "🧹 清理 Docker 资源..."
	@docker rmi rungame-admin:latest 2>/dev/null || echo "⚠️  Admin 镜像不存在"
	@docker rmi rungame-website:latest 2>/dev/null || echo "⚠️  Website 镜像不存在"
	@docker system prune -f
	@echo "✅ 清理完成"
