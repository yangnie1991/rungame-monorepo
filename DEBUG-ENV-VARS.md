# 环境变量调试指南

## 📋 问题描述

部署时出现环境变量缺失错误，需要验证 GitHub Secrets 中的变量是否正确传递到 VPS。

## 🔍 调试步骤

我已在 GitHub Actions 工作流中添加了**三层环境变量验证**：

### 第 1 层：GitHub Actions 端验证

**位置**：步骤 8 - "🔍 Verify Environment Variables"

**作用**：验证 GitHub Secrets 是否正确传入 workflow

**输出示例**：
```bash
========================================
🔍 验证 GitHub Secrets 环境变量
========================================
✅ DATABASE_URL: 已设置 (长度: 127, 前缀: pos***)
✅ CACHE_DATABASE_URL: 已设置 (长度: 132, 前缀: pos***)
✅ NEXTAUTH_SECRET: 已设置 (长度: 44, 前缀: aBc***)
✅ NEXTAUTH_URL: 已设置 (长度: 32, 前缀: htt***)
✅ ENCRYPTION_KEY: 已设置 (长度: 64, 前缀: xYz***)
...
========================================
✅ 所有环境变量已正确设置
========================================
```

**失败时**：
- 显示哪些变量缺失
- 部署**立即终止**，避免浪费时间

---

### 第 2 层：VPS 端验证

**位置**：部署脚本开始处 - "🔍 验证环境变量是否正确传递到 VPS"

**作用**：验证环境变量是否通过 SSH 正确传递到 VPS

**输出示例**：
```bash
========================================
🔍 验证环境变量是否正确传递到 VPS...
========================================
✅ DATABASE_URL: 已接收 (长度: 127, 前缀: pos***)
✅ CACHE_DATABASE_URL: 已接收 (长度: 132, 前缀: pos***)
✅ NEXTAUTH_SECRET: 已接收 (长度: 44, 前缀: aBc***)
✅ NEXTAUTH_URL: 已接收 (长度: 32, 前缀: htt***)
✅ ENCRYPTION_KEY: 已接收 (长度: 64, 前缀: xYz***)
...
========================================
✅ 所有环境变量已成功传递到 VPS
========================================
```

**失败时**：
- 显示哪些变量未传递
- 提示检查 workflow.yml 的 `env` 和 `envs` 配置
- 部署**立即终止**

---

### 第 3 层：.env 文件验证

**位置**：写入 .env 文件后 - "🔍 验证 .env 文件内容"

**作用**：验证环境变量是否正确写入 .env 文件

**输出示例**：
```bash
========================================
🔍 验证 .env 文件内容...
========================================
✅ DATABASE_URL: 已写入 (长度: 127, 前缀: pos***)
✅ CACHE_DATABASE_URL: 已写入 (长度: 132, 前缀: pos***)
✅ NEXTAUTH_SECRET: 已写入 (长度: 44, 前缀: aBc***)
✅ NEXTAUTH_URL: 已写入 (长度: 32, 前缀: htt***)
✅ ENCRYPTION_KEY: 已写入 (长度: 64, 前缀: xYz***)
...
========================================
✅ .env 文件所有变量验证通过
========================================
```

**失败时**：
- 显示哪些变量在 .env 中缺失或为空
- 显示 .env 文件内容预览（隐藏敏感信息）
- 部署**立即终止**

---

## 📊 如何查看调试输出

### 方法 1：GitHub Actions 网页界面

1. 访问仓库的 **Actions** 标签页
2. 点击最新的工作流运行记录
3. 展开以下步骤查看输出：
   - **步骤 8**: "🔍 Verify Environment Variables"
   - **步骤 10**: "🚀 Deploy on VPS via PM2"

### 方法 2：使用 gh CLI（推荐）

```bash
# 查看最新的工作流运行
gh run list --workflow=deploy-admin-pm2.yml --limit 1

# 查看工作流日志
gh run view --log

# 实时监控运行中的工作流
gh run watch
```

---

## 🔧 可能的问题和解决方案

### 问题 1：第 1 层验证失败（GitHub Secrets 未设置）

**症状**：
```
❌ NEXTAUTH_URL: 未设置或为空
❌ ENCRYPTION_KEY: 未设置或为空
```

**解决方案**：

1. **检查 GitHub Secrets 配置**：
   - 访问仓库 → Settings → Secrets and variables → Actions
   - 确认以下 Secrets 已添加：
     - `NEXTAUTH_SECRET`
     - `NEXTAUTH_URL`
     - `ENCRYPTION_KEY`
     - 其他必需变量...

2. **重新添加缺失的 Secrets**：
   ```bash
   # 使用 gh CLI 添加
   gh secret set NEXTAUTH_URL
   gh secret set ENCRYPTION_KEY
   ```

3. **验证 Secret 值的格式**：
   - `NEXTAUTH_SECRET`: 44 字符 base64 字符串
   - `NEXTAUTH_URL`: 完整 URL（如 `https://admin.rungame.online`）
   - `ENCRYPTION_KEY`: 64 字符 base64 字符串

---

### 问题 2：第 2 层验证失败（未传递到 VPS）

**症状**：
```
✅ 第 1 层验证通过
❌ 第 2 层验证失败: NEXTAUTH_URL 未传递到 VPS
```

**解决方案**：

检查 `.github/workflows/deploy-admin-pm2.yml` 的配置：

1. **检查 `env` 部分**（第 171-181 行）：
   ```yaml
   env:
     NEXTAUTH_URL: ${{ secrets.NEXTAUTH_URL }}   # ✅ 确保存在
     ENCRYPTION_KEY: ${{ secrets.ENCRYPTION_KEY }} # ✅ 确保存在
     # ... 其他变量
   ```

2. **检查 `envs` 参数**（第 218 行）：
   ```yaml
   envs: DATABASE_URL,CACHE_DATABASE_URL,NEXTAUTH_SECRET,NEXTAUTH_URL,ENCRYPTION_KEY,...
   ```
   - 确保变量名拼写正确
   - 确保没有多余空格
   - 确保逗号分隔

---

### 问题 3：第 3 层验证失败（.env 文件内容异常）

**症状**：
```
✅ 第 1 层验证通过
✅ 第 2 层验证通过
❌ 第 3 层验证失败: NEXTAUTH_URL 在 .env 中为空
```

**解决方案**：

1. **检查 Bash 变量替换**：
   - 确保 heredoc 使用 `EOF`（不是 `'EOF'`）
   - 允许变量展开

2. **检查变量名拼写**：
   - Shell 脚本中的变量名必须与环境变量名一致
   - 区分大小写

---

## 🎯 预期结果

部署成功时，你应该看到：

```bash
========================================
✅ 第 1 层验证通过（GitHub Actions）
========================================
✅ 第 2 层验证通过（VPS 端）
========================================
✅ 第 3 层验证通过（.env 文件）
========================================

🔄 重启 PM2 应用...
✅ 服务健康检查通过！
========================================
✅ 部署完成！
🌐 访问地址: https://admin.rungame.online
========================================
```

---

## 📝 下一步

1. **推送代码**：
   ```bash
   git add .github/workflows/deploy-admin-pm2.yml
   git commit -m "debug: 添加三层环境变量验证机制"
   git push
   ```

2. **触发部署**：
   - 自动触发：推送到 `main` 分支
   - 手动触发：
     ```bash
     gh workflow run deploy-admin-pm2.yml
     ```

3. **查看日志**：
   ```bash
   gh run watch
   ```

4. **根据输出定位问题**：
   - 第 1 层失败 → GitHub Secrets 配置问题
   - 第 2 层失败 → workflow.yml 配置问题
   - 第 3 层失败 → .env 写入逻辑问题

---

## 🔐 安全说明

调试输出遵循以下安全原则：

1. **不完整显示敏感信息**：
   - 只显示前 3 个字符（如 `pos***`）
   - 显示变量长度用于验证

2. **不输出到公开日志**：
   - GitHub Actions 日志可能对外可见
   - 确保不泄露完整密钥

3. **验证通过后立即继续**：
   - 不在日志中保留完整变量值

---

**最后更新**：2025-11-19
**相关文件**：`.github/workflows/deploy-admin-pm2.yml`
