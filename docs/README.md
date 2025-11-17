# 📚 RunGame 项目文档

本目录包含 RunGame Monorepo 项目的核心技术文档（已精简至 **11 个**）。

---

## 🚀 快速开始

**新手必读**：
1. [ARCHITECTURE.md](ARCHITECTURE.md) - 了解项目架构
2. [1PANEL-DEPLOYMENT.md](1PANEL-DEPLOYMENT.md) - 部署到生产环境
3. [GITHUB-SECRETS-SETUP.md](GITHUB-SECRETS-SETUP.md) - 配置 GitHub Secrets

---

## 📖 文档索引

### 🏗️ 核心架构（4 个）

| 文档 | 说明 | 重要度 |
|------|------|--------|
| [ARCHITECTURE.md](ARCHITECTURE.md) | 项目架构和技术栈详解 | ⭐⭐⭐⭐⭐ |
| [DATABASE.md](DATABASE.md) | 数据库架构、双库分离、查询优化 | ⭐⭐⭐⭐⭐ |
| [I18N.md](I18N.md) | next-intl 多语言实现指南 | ⭐⭐⭐⭐ |
| [PAGE-STRUCTURE.md](PAGE-STRUCTURE.md) | PageType 动态页面系统 | ⭐⭐⭐⭐ |

### 🚀 部署指南（2 个）

| 文档 | 说明 | 使用场景 |
|------|------|----------|
| [1PANEL-DEPLOYMENT.md](1PANEL-DEPLOYMENT.md) | 1Panel 面板部署指南（推荐） | 生产环境 |
| [GITHUB-SECRETS-SETUP.md](GITHUB-SECRETS-SETUP.md) | GitHub Actions 环境变量配置 | CI/CD |

### 🤖 功能模块（3 个）

| 文档 | 说明 |
|------|------|
| [AI-FEATURES.md](AI-FEATURES.md) | AI 功能完整实现指南 |
| [GAMEPIX-IMPORT.md](GAMEPIX-IMPORT.md) | GamePix 游戏导入指南 |
| [SEO.md](SEO.md) | 搜索引擎优化完整指南 |

### 🔧 扩展功能（1 个）

| 文档 | 说明 | 可选 |
|------|------|------|
| [R2-CDN-SETUP.md](R2-CDN-SETUP.md) | R2 CDN 配置和迁移指南 | ✅ |

### 📋 目录（1 个）

| 文档 | 说明 |
|------|------|
| [README.md](README.md) | 本文档 - 文档导航 |

---

## 🎯 使用指南

### 新项目部署流程

```
1. 了解架构 → ARCHITECTURE.md
2. 配置环境 → GITHUB-SECRETS-SETUP.md
3. 部署到VPS → 1PANEL-DEPLOYMENT.md
4. 配置数据库 → DATABASE.md
```

### 功能开发流程

```
1. 多语言开发 → I18N.md
2. 动态页面 → PAGE-STRUCTURE.md
3. AI功能 → AI-FEATURES.md
4. SEO优化 → SEO.md
```

---

## 📊 文档统计

- **总文档数**: 11 个
- **核心架构**: 4 个（ARCHITECTURE, DATABASE, I18N, PAGE-STRUCTURE）
- **部署指南**: 2 个（1PANEL, GITHUB-SECRETS）
- **功能模块**: 3 个（AI, GAMEPIX, SEO）
- **扩展功能**: 1 个（R2-CDN）
- **索引导航**: 1 个（README）

---

## 🔄 文档维护

### 最近更新

- **2025-11-17**: 大规模文档合并，从 27 个精简至 11 个核心文档
  - ✅ SEO 相关 4 个文档合并为 1 个
  - ✅ R2 相关 2 个文档合并为 1 个
  - ✅ 删除重复和过时文档
  - ✅ 新增 1Panel 部署指南

- **2025-01-30**: 整合 AI 功能和游戏导入文档

- **2025-01-20**: 重组文档结构，删除过时文档

### 文档清理原则

**保留核心**：
- ✅ 核心架构文档（4 个）
- ✅ 部署指南（2 个）
- ✅ 功能模块文档（3 个）
- ✅ 必要的扩展功能（1 个）

**已删除**：
- ❌ 临时规划文档（MONOREPO-SEPARATION-PLAN）
- ❌ 重复文档（多个 SEO、R2、部署文档）
- ❌ 废弃方案（NGINX 手动安装、Docker 容器化 nginx）
- ❌ 问题报告和故障排查文档（已合并到主文档）

---

## 📞 文档反馈

如发现文档错误或需要补充，请：
1. 在代码中添加注释说明
2. 提交 GitHub Issue
3. 直接修改文档并提交 PR

---

**最后更新**: 2025-11-17
**文档版本**: v2.0（精简版）
**维护者**: RunGame Team
