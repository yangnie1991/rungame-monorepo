# GamePix 游戏导入系统 v2

## 📋 概述

游戏导入系统 v2 是对原有导入流程的完整重构，提供了更好的用户体验、更强的容错性和更详细的状态反馈。本文档整合了使用指南、技术流程及浏览器插件说明。

---

## 🏗️ 核心架构与 API

### 1. 预检查 API
`POST /api/admin/import-game/pre-check`
- 检测游戏是否已存在（slug/gamePixId）
- 验证分类有效性
- 提供冲突解决建议

### 2. 导入 API (SSE)
`POST /api/admin/import-game-v2`
- **6步导入流程**：
    1. 预检查冲突 (0-10%)
    2. 验证资源（分类+标签） (10-25%)
    3. 上传图片到 R2 (25-60%)
    4. 创建/更新游戏记录 (60-85%)
    5. 关联标签 (独立步骤) (85-95%)
    6. 更新缓存 (95-100%)

---

## 🔧 使用指南 (React Hook)

```typescript
import { useGameImportV2 } from '@/hooks/useGameImportV2'

function MyComponent() {
  const {
    status,       // 'idle' | 'importing' | 'success' | 'error'
    progress,     // { step, percentage, message }
    images,       // 图片上传状态
    importGame,   // 导入函数
    retryFailedImages
  } = useGameImportV2()

  // 调用示例
  const handleImport = async () => {
    await importGame(gameData, config)
  }
}
```

---

## 🧩 浏览器插件使用

### 安装与配置
1. 打开 Chrome 扩展管理页面 `chrome://extensions/`
2. 加载扩展文件夹
3. 访问 GamePix 游戏页面点击图标即可提取信息

### 提取字段说明
| 字段 | 来源 | 类型 |
|------|------|------|
| title | 页面标题 | String |
| slug | URL slug | String |
| thumbnail | og:image | URL |
| embedUrl | iframe src | URL |

---

## 🛠️ 故障排查与最佳实践

### 常见问题
1. **图片上传失败**：支持通过 `retryFailedImages` 单独重试失败图片，无需重新导入整个游戏。
2. **标签不存在**：系统会自动跳过不存在的标签并发出警告，不会中断导入流程。
3. **分类映射**：确保 GamePix 分类已在 `CATEGORY_MAPPING` 中定义，否则归类为 `other`。

### 最佳实践
- **导入前预检查**：始终先调用预检查 API 确认无冲突。
- **关注 SSE 警告**：导入成功后的 `warnings` 数组可能包含非致命错误（如标签缺失）。

---

## 📚 详细技术文档 (归档)
- 原 6步流程文档: [已合并]
- 原 v2 指南: [已合并]
