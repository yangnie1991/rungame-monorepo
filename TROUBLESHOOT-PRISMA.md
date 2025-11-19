# Prisma 平台兼容性问题排查指南

## 📋 当前问题

错误日志显示：
```
Prisma Client was generated for "debian-openssl-1.1.x",
but the actual deployment required "rhel-openssl-1.1.x".
```

这说明部署的 Prisma 二进制文件与 VPS 平台不匹配。

## 🔍 步骤 1: 检查 VPS 上的实际文件

在 VPS 上运行检查脚本：

```bash
# SSH 连接到 VPS
ssh your-vps

# 运行检查脚本（如果脚本未传输到 VPS，请先传输）
# 或者直接运行以下命令：

cd /www/wwwroot/rungame

# 检查 client 目录
ls -lh apps/admin/.next/standalone/apps/admin/src/generated/client/*.node 2>/dev/null

# 检查 prisma-admin 目录
ls -lh apps/admin/.next/standalone/apps/admin/src/generated/prisma-admin/*.node 2>/dev/null

# 搜索所有 Prisma 引擎文件
find . -name "libquery_engine*.node"
```

## 📊 预期结果

### ✅ 正确的文件（应该有）
```
libquery_engine-rhel-openssl-1.1.x.so.node   (~29-30MB)
```

### ❌ 错误的文件（不应该有）
```
libquery_engine-debian-openssl-1.1.x.so.node
libquery_engine-darwin-arm64.dylib.node
```

## 🔧 步骤 2: 检查 GitHub Actions 运行状态

1. 访问 GitHub 仓库的 Actions 标签页
2. 查看最新的 "Deploy Admin to VPS (PM2 - Auto)" 运行记录
3. 查看以下关键步骤的输出：

### 步骤 4.5: 🔍 Detect VPS Platform
期望输出：
```
✅ 最终检测结果
系统 ID: centos
基础平台: rhel-openssl
OpenSSL 版本: 1.1.x
Prisma binaryTarget: rhel-openssl-1.1.x
```

### 步骤 5: 🔧 Generate Optimized Prisma Client
期望输出：
```
目标平台: rhel-openssl-1.1.x
📋 修改后的 binaryTargets 配置:
binaryTargets = ["native", "rhel-openssl-1.1.x"]
```

### 步骤 6: 🔨 Build applications
期望输出（复制 Prisma 引擎文件时）：
```
✅ Client 已复制
-rw-r--r-- libquery_engine-rhel-openssl-1.1.x.so.node

✅ Prisma-admin 已复制
-rw-r--r-- libquery_engine-rhel-openssl-1.1.x.so.node
```

## 🛠️ 可能的问题和解决方案

### 问题 1: 最新代码还未部署

**症状**：VPS 上仍然是 debian 二进制文件

**解决方案**：
1. 检查 GitHub Actions 是否成功完成
2. 如果失败，查看错误日志
3. 如果成功，可能需要手动触发新的部署：
   ```bash
   # 推送一个小的修改触发部署
   git commit --allow-empty -m "trigger: 重新部署以应用 Prisma 修复"
   git push
   ```

### 问题 2: 平台检测失败

**症状**：Actions 日志显示检测失败或使用默认值

**可能原因**：
- SSH 连接失败
- VPS 系统信息文件缺失

**解决方案**：
1. 检查 GitHub Secrets 中的 SSH 配置
2. 在 VPS 上手动运行检测命令：
   ```bash
   cat /etc/os-release
   openssl version
   ```

### 问题 3: sed 命令修改失败

**症状**：Actions 日志显示修改后的 binaryTargets 仍然是旧值

**解决方案**：检查 schema.prisma 文件中 binaryTargets 的格式是否符合预期

### 问题 4: 文件复制失败

**症状**：Actions 日志显示 "⚠️  未找到 .node 文件"

**解决方案**：
1. 检查 Prisma 生成步骤是否成功
2. 检查生成的文件路径是否正确

## 🚀 快速修复方案

如果以上排查都正常，但 VPS 上仍然是错误的文件，可以尝试：

### 方案 A: 完全清理 VPS 部署目录

```bash
# SSH 到 VPS
ssh your-vps

# 停止应用
pm2 stop rungame-admin

# 完全清理部署目录
cd /www/wwwroot/rungame
rm -rf apps/
rm -rf logs/
rm -rf .env

# 触发新的部署
# 在本地推送代码：
git commit --allow-empty -m "deploy: 完全重新部署"
git push
```

### 方案 B: 手动在 VPS 上生成正确的二进制文件

```bash
# SSH 到 VPS
ssh your-vps

cd /www/wwwroot/rungame

# 如果有 packages/database 目录
cd packages/database

# 修改 schema.prisma 的 binaryTargets
sed -i 's/binaryTargets = \[.*\]/binaryTargets = ["native", "rhel-openssl-1.1.x"]/' prisma/schema.prisma
sed -i 's/binaryTargets = \[.*\]/binaryTargets = ["native", "rhel-openssl-1.1.x"]/' prisma/schema-admin.prisma

# 重新生成 Prisma 客户端
npx prisma generate --schema=prisma/schema.prisma
npx prisma generate --schema=prisma/schema-admin.prisma

# 复制到 standalone 目录
cp -r src/generated/client/* ../apps/admin/.next/standalone/apps/admin/src/generated/client/
cp -r src/generated/prisma-admin/* ../apps/admin/.next/standalone/apps/admin/src/generated/prisma-admin/

# 重启应用
pm2 restart rungame-admin
```

## 📞 联系支持

如果以上方法都无法解决问题，请提供：

1. GitHub Actions 最新运行的完整日志（特别是步骤 4.5, 5, 6）
2. VPS 上的文件检查结果
3. VPS 系统信息（`cat /etc/os-release` 和 `openssl version`）

---

**文档版本**: v1.0
**创建日期**: 2025-11-20
**适用问题**: Prisma 平台兼容性错误
