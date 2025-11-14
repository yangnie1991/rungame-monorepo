# 管理端部署检查清单

在部署前和部署后使用此清单确保所有步骤都已完成。

## 📋 部署前检查

### VPS 环境
- [ ] VPS 已购买并可访问
- [ ] 内存 ≥ 2GB（推荐 4GB+）
- [ ] 磁盘空间 ≥ 20GB
- [ ] 已安装 1Panel 面板
- [ ] 已配置防火墙规则（22, 80, 443, 9999）

### 服务准备
- [ ] PostgreSQL 已安装并运行
- [ ] 数据库已创建（数据库名、用户名、密码）
- [ ] 已记录数据库连接信息
- [ ] Docker 已安装（1Panel 自动安装）

### 域名和 DNS
- [ ] 已购买域名
- [ ] DNS A 记录已添加（admin.yourdomain.com → VPS_IP）
- [ ] DNS 已生效（可通过 `ping` 验证）

### 代码准备
- [ ] GitHub 仓库已创建
- [ ] 代码已推送到仓库
- [ ] 有仓库访问权限

---

## 🚀 部署步骤检查

### 1. 项目创建
- [ ] 在 1Panel 中创建 `rungame-admin` 项目
- [ ] 项目路径：`/opt/1panel/docker/compose/rungame-admin`
- [ ] 代码已克隆到项目目录

### 2. 环境配置
- [ ] `.env` 文件已创建（从 `.env.admin.example` 复制）
- [ ] `DATABASE_URL` 已配置正确
- [ ] `NEXTAUTH_SECRET` 已生成（32 字符随机字符串）
- [ ] `NEXTAUTH_URL` 已设置为实际域名
- [ ] `NEXTAUTH_TRUST_HOST=true` 已设置

### 3. Docker 配置
- [ ] `Dockerfile.admin` 已存在
- [ ] `docker-compose.admin.yml` 已存在
- [ ] `.dockerignore` 已存在
- [ ] `deploy-admin.sh` 有执行权限（`chmod +x`）

### 4. 首次部署
- [ ] 执行 `./deploy-admin.sh` 成功
- [ ] 容器已启动（`docker ps` 可见）
- [ ] 健康检查通过（`curl http://localhost:3001/api/health`）
- [ ] 无错误日志（`docker logs rungame-admin`）

### 5. 数据库初始化
- [ ] 进入容器成功（`docker exec -it rungame-admin sh`）
- [ ] 执行 `npm run db:push` 成功
- [ ] 执行 `npm run db:seed` 成功
- [ ] 默认管理员账户已创建

### 6. 反向代理
- [ ] 在 1Panel 中创建反向代理网站
- [ ] 代理地址设置为 `http://127.0.0.1:3001`
- [ ] SSL 证书已申请（Let's Encrypt）
- [ ] HTTPS 可访问
- [ ] HTTP 自动重定向到 HTTPS

### 7. 功能验证
- [ ] 可通过域名访问管理端
- [ ] 登录页面正常显示
- [ ] 可使用默认账户登录
- [ ] 管理端功能正常（游戏、分类、标签等）
- [ ] 图片上传功能正常（如果使用 R2）

---

## 🔄 自动部署配置（可选）

### GitHub Actions 配置
- [ ] `.github/workflows/deploy-admin.yml` 已存在
- [ ] SSH 密钥已在 VPS 上生成
- [ ] 公钥已添加到 `~/.ssh/authorized_keys`
- [ ] GitHub Secrets 已配置：
  - [ ] `VPS_HOST`
  - [ ] `VPS_USERNAME`
  - [ ] `VPS_SSH_KEY`
  - [ ] `VPS_PORT`
- [ ] 手动触发测试成功
- [ ] 推送代码可自动部署

---

## ✅ 部署后验证

### 服务状态
- [ ] 容器状态为 `Up`（`docker ps`）
- [ ] 健康检查返回 `{"status":"ok"}`
- [ ] CPU 和内存使用正常（`docker stats`）
- [ ] 磁盘空间充足（`df -h`）

### 访问测试
- [ ] HTTP 访问自动跳转 HTTPS
- [ ] HTTPS 证书有效
- [ ] 登录功能正常
- [ ] 所有管理功能可用
- [ ] API 响应正常

### 安全检查
- [ ] 默认管理员密码已修改
- [ ] SSH 密钥登录已启用
- [ ] 防火墙规则已配置
- [ ] 不必要的端口已关闭
- [ ] `.env` 文件未提交到 Git

### 备份准备
- [ ] 数据库备份脚本已配置
- [ ] 定时备份已设置（crontab）
- [ ] 备份存储位置已确定
- [ ] 备份恢复流程已测试

---

## 📊 性能优化（可选）

### 缓存配置
- [ ] Next.js 构建缓存已启用
- [ ] Prisma 查询缓存已配置
- [ ] Nginx 缓存已配置（静态资源）

### 监控配置
- [ ] 1Panel 监控已启用
- [ ] 容器健康检查已配置
- [ ] 日志轮转已配置
- [ ] 磁盘空间告警已设置

---

## 🆘 故障恢复准备

### 回滚计划
- [ ] 镜像备份策略已确定（deploy-admin.sh 自动备份）
- [ ] 数据库恢复脚本已准备
- [ ] 回滚步骤已文档化

### 联系信息
- [ ] VPS 提供商支持联系方式
- [ ] 域名服务商支持联系方式
- [ ] 团队技术支持联系方式

---

## 📝 文档检查

- [ ] [DEPLOY-QUICKSTART.md](./DEPLOY-QUICKSTART.md) - 已阅读
- [ ] [DEPLOY-ADMIN.md](./DEPLOY-ADMIN.md) - 已阅读
- [ ] [DATABASE.md](./DATABASE.md) - 已了解数据库配置
- [ ] 运维团队已培训

---

## 🎯 部署完成确认

**部署人员**: ___________________
**部署日期**: ___________________
**部署版本**: ___________________
**签名**: ___________________

---

## 📞 需要帮助？

- 📖 查看完整文档：[docs/](../../docs/)
- 🐛 提交问题：[GitHub Issues](https://github.com/yourusername/rungame-nextjs/issues)
- 💬 技术支持：[联系方式]

---

**检查清单版本**: v1.0
**最后更新**: 2025-01-14
