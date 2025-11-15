# GitHub Actions 多分支部署指南

本文档说明如何使用 GitHub Actions 部署**指定分支**到 VPS。

---

## 🔀 支持的分支部署方式

### 1️⃣ 自动触发（推送代码时）

当你推送代码到以下分支时，会**自动触发部署**：

```yaml
- main                        # 主分支
- master                      # 备用主分支
- production                  # 生产分支
- feature/monorepo-migration  # 开发分支（你当前的分支）
```

**示例**:
```bash
# 推送到 main 分支 → 自动部署 main
git push origin main

# 推送到 feature/monorepo-migration → 自动部署该分支
git push origin feature/monorepo-migration
```

---

### 2️⃣ 手动触发（任意分支）

可以在 GitHub Actions 界面**手动选择分支**部署。

#### 操作步骤：

1. 进入 GitHub 仓库
2. 点击 **Actions** 标签
3. 选择 **Deploy Admin to VPS** 工作流
4. 点击右上角 **Run workflow** 按钮
5. 填写参数：
   - **Use workflow from**: 选择要部署的分支
   - **要部署的分支**: 可留空（使用上面选择的分支）或手动指定
   - **部署环境**: 选择 production/staging/development

![手动触发示例](https://github.com/actions-trigger-example.png)

---

## 📋 配置文件说明

### 当前监听的分支

在 [.github/workflows/deploy-admin.yml](../.github/workflows/deploy-admin.yml) 中：

```yaml
on:
  push:
    branches:
      - main                        # 主分支
      - master                      # 备用主分支名
      - production                  # 生产分支
      - feature/monorepo-migration  # 当前开发分支
```

### 添加新分支监听

如果需要添加其他分支，编辑配置文件：

```yaml
on:
  push:
    branches:
      - main
      - master
      - production
      - feature/monorepo-migration
      - develop              # ← 添加新分支
      - staging              # ← 添加新分支
      - feature/your-branch  # ← 添加新分支
```

---

## 🎯 常见部署场景

### 场景 1: 开发分支持续部署

**需求**: 每次推送到 `feature/monorepo-migration` 都自动部署

**配置**: ✅ 已支持（默认配置）

**操作**:
```bash
git add .
git commit -m "feat: add new feature"
git push origin feature/monorepo-migration
```

自动触发部署到 VPS。

---

### 场景 2: 生产分支部署

**需求**: 只在合并到 `main` 时部署生产环境

**方式 1: 保持当前配置**（推荐）
```bash
# 开发完成后合并到 main
git checkout main
git merge feature/monorepo-migration
git push origin main
```

**方式 2: 限制只部署 main**

修改配置：
```yaml
on:
  push:
    branches:
      - main  # 只监听 main 分支
```

---

### 场景 3: 多环境部署

**需求**:
- `develop` → 开发环境
- `staging` → 测试环境
- `main` → 生产环境

**配置**:

1. **创建多个 Secrets** (每个环境的 VPS 信息)：
   ```
   PROD_VPS_HOST
   PROD_VPS_USERNAME
   PROD_VPS_SSH_KEY

   STAGING_VPS_HOST
   STAGING_VPS_USERNAME
   STAGING_VPS_SSH_KEY
   ```

2. **修改工作流**，根据分支选择不同的 Secrets：
   ```yaml
   - name: Deploy to VPS
     uses: appleboy/ssh-action@v1.0.3
     with:
       host: ${{ github.ref_name == 'main' && secrets.PROD_VPS_HOST || secrets.STAGING_VPS_HOST }}
       username: ${{ github.ref_name == 'main' && secrets.PROD_VPS_USERNAME || secrets.STAGING_VPS_USERNAME }}
       key: ${{ github.ref_name == 'main' && secrets.PROD_VPS_SSH_KEY || secrets.STAGING_VPS_SSH_KEY }}
   ```

---

### 场景 4: 手动部署特定分支

**需求**: 临时部署某个功能分支测试

**操作**:
1. GitHub → Actions → Deploy Admin to VPS
2. Run workflow
3. 填写：
   - **Use workflow from**: `feature/test-feature`
   - **要部署的分支**: 留空（或填 `feature/test-feature`）
   - **部署环境**: `staging`
4. 点击 **Run workflow**

---

## 🔧 高级配置

### 1. 分支保护 + 部署

**场景**: 只允许 PR 合并后部署

在 GitHub Settings 中：
1. Settings → Branches → Add rule
2. 分支名称模式: `main`
3. 勾选:
   - ✅ Require a pull request before merging
   - ✅ Require status checks to pass

这样只有 PR 合并后才会触发部署。

---

### 2. 部署前检查

在工作流中添加检查步骤：

```yaml
- name: Run tests before deploy
  run: |
    npm ci
    npm run lint
    npm run test  # 如果有测试
```

如果测试失败，部署不会执行。

---

### 3. 部署通知

在工作流结尾添加通知：

```yaml
- name: Send Slack notification
  if: success()
  uses: 8398a7/action-slack@v3
  with:
    status: ${{ job.status }}
    text: '✅ Admin 部署成功 (分支: ${{ steps.branch.outputs.branch_name }})'
    webhook_url: ${{ secrets.SLACK_WEBHOOK }}
```

---

## 📊 部署日志查看

### GitHub Actions 日志

1. GitHub → Actions
2. 选择对应的工作流运行
3. 查看详细日志，包括：
   - ✅ 部署的分支
   - ✅ 部署环境
   - ✅ 构建过程
   - ✅ 健康检查结果

### VPS 日志

```bash
# 查看容器日志
docker logs -f rungame-admin

# 查看 GitHub Actions 部署时的输出
# 在 Actions 日志中查看 "Deploy to VPS" 步骤
```

---

## ⚠️ 注意事项

### 1. 分支同步

确保 VPS 上的仓库可以访问你要部署的分支：

```bash
# SSH 到 VPS
ssh root@your-vps-ip

# 进入项目目录
cd /opt/1panel/docker/compose/rungame-admin

# 查看远程分支
git branch -r

# 如果看不到目标分支，更新远程引用
git fetch origin
```

### 2. 环境变量

不同分支可能需要不同的 `.env` 配置：

```bash
# 在 VPS 上为不同分支准备配置
cp .env .env.production
cp .env .env.staging

# 根据部署分支切换配置（在部署脚本中）
if [ "${DEPLOY_BRANCH}" = "main" ]; then
  cp .env.production .env
elif [ "${DEPLOY_BRANCH}" = "staging" ]; then
  cp .env.staging .env
fi
```

### 3. 数据库迁移

如果分支包含数据库变更：

```bash
# 在部署脚本中添加
docker exec -it rungame-admin sh -c "npm run db:push"
```

---

## 🎓 学习资源

- [GitHub Actions 文档](https://docs.github.com/en/actions)
- [工作流语法](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions)
- [手动触发工作流](https://docs.github.com/en/actions/using-workflows/manually-running-a-workflow)

---

## 📝 快速参考

### 自动部署
```bash
git push origin <branch-name>
```

### 手动部署
1. GitHub → Actions → Deploy Admin to VPS
2. Run workflow
3. 选择分支和环境
4. 运行

### 添加监听分支
编辑 `.github/workflows/deploy-admin.yml`:
```yaml
branches:
  - your-new-branch
```

### 查看部署状态
```bash
# VPS
docker ps --filter name=rungame-admin
curl http://localhost:3001/api/health

# GitHub
Actions → Deploy Admin to VPS → 查看最新运行
```

---

**文档版本**: v1.0
**最后更新**: 2025-01-14
