# 游戏导入系统 v2 使用指南

## 📋 概述

游戏导入系统 v2 是对原有导入流程的完整重构，提供了更好的用户体验、更强的容错性和更详细的状态反馈。

## 🎯 主要改进

### 1. 预检查机制
- ✅ 导入前检测游戏是否已存在
- ✅ 验证分类有效性
- ✅ 提供冲突解决建议

### 2. 图片上传优化
- ✅ 自动去重（通过 SHA-256 哈希）
- ✅ 详细状态反馈（成功/跳过/失败）
- ✅ 支持部分失败
- ✅ 单张图片重试

### 3. 错误处理改进
- ✅ 可恢复的错误处理
- ✅ 详细的错误信息
- ✅ 警告信息收集
- ✅ 不会因单个步骤失败而终止

### 4. 更好的进度反馈
- ✅ 实时 SSE 流
- ✅ 百分比进度条
- ✅ 每个步骤的详细描述
- ✅ 图片上传状态追踪

---

## 🏗️ 架构

### API 端点

#### 1. 预检查 API
```typescript
POST /api/admin/import-game/pre-check

// 请求
{
  slug: string
  categoryId: string
  gamePixId?: string // 可选，用于检测重复来源
}

// 响应
{
  success: boolean
  canImport: boolean
  conflicts?: {
    gameExists?: {
      id: string
      title: string
      slug: string
      status: string
    }
    categoryInvalid?: {
      reason: string
      categoryId: string
    }
    duplicateSourceGame?: {
      id: string
      title: string
      slug: string
      sourcePlatformId: string
    }
  }
  suggestions?: {
    suggestedSlug?: string
    action?: 'update' | 'skip' | 'rename'
  }
  categoryInfo?: {
    id: string
    name: string
    mainCategoryId: string
    mainCategoryName: string
  }
}
```

#### 2. 导入游戏 API（SSE）
```typescript
POST /api/admin/import-game-v2

// 请求
{
  game: GamePixGameItem
  config: {
    slug: string
    categoryId: string
    // ... 其他配置
    conflictStrategy?: 'update' | 'skip' | 'create_new'
  }
}

// SSE 事件类型
type SSEEvent =
  | { type: 'progress'; step: number; total: number; percentage: number; message: string }
  | { type: 'image_upload'; image: string; status: 'success' | 'skipped' | 'failed'; ... }
  | { type: 'warning'; message: string }
  | { type: 'error'; message: string; recoverable: boolean }
  | { type: 'conflict'; conflictType: string; data: any }
  | { type: 'success'; gameId: string; warnings?: string[] }
```

#### 3. 图片重试 API
```typescript
POST /api/admin/retry-image-upload

// 请求
{
  images: Array<{
    url: string
    type: 'thumbnail' | 'banner' | 'screenshot'
  }>
}

// 响应
{
  success: boolean
  results: Array<{
    url: string
    type: string
    status: 'success' | 'failed'
    newUrl?: string
    isNewUpload?: boolean
    error?: string
  }>
  summary: {
    total: number
    success: number
    failed: number
  }
}
```

---

## 🔧 使用方法

### 1. 使用 React Hook

```typescript
import { useGameImportV2 } from '@/hooks/useGameImportV2'

function MyComponent() {
  const {
    status,       // 'idle' | 'importing' | 'success' | 'error' | 'conflict'
    progress,     // { step, total, percentage, message }
    images,       // 图片上传状态数组
    warnings,     // 警告信息数组
    conflict,     // 冲突数据
    result,       // 导入结果
    importGame,   // 导入函数
    retryFailedImages,  // 重试函数
    reset,        // 重置状态
  } = useGameImportV2()

  // 开始导入
  const handleImport = async () => {
    try {
      const result = await importGame(game, config)
      if (result.success) {
        console.log('导入成功:', result.gameId)
      }
    } catch (error) {
      console.error('导入失败:', error)
    }
  }

  return (
    <div>
      {/* 进度条 */}
      <Progress value={progress.percentage} />
      <p>{progress.message}</p>

      {/* 图片状态 */}
      {images.map(img => (
        <div key={img.url}>
          {img.type}: {img.status}
          {img.status === 'failed' && (
            <button onClick={retryFailedImages}>重试</button>
          )}
        </div>
      ))}

      {/* 警告信息 */}
      {warnings.map(warning => (
        <Alert>{warning}</Alert>
      ))}
    </div>
  )
}
```

### 2. 使用示例组件

```typescript
import { GameImportV2Example } from '@/components/games/GameImportV2Example'

<GameImportV2Example
  game={gamePixGame}
  config={importConfig}
  open={isDialogOpen}
  onClose={() => setIsDialogOpen(false)}
  onSuccess={(gameId) => {
    console.log('导入成功:', gameId)
    router.push(`/admin/games/${gameId}`)
  }}
/>
```

---

## 📊 导入流程

```
1. [预检查] 检查游戏是否存在、验证分类
   ↓
2. [验证分类] 获取主分类ID、检查分类是否启用
   ↓
3. [上传图片] 逐张上传，自动去重
   - 检查图片是否已存在（通过 SHA-256）
   - 已存在 → 跳过，使用现有 URL
   - 不存在 → 上传到 R2
   - 失败 → 标记失败，使用原始 URL
   ↓
4. [创建游戏] 创建数据库记录
   - 如果冲突策略是 'update' → 更新现有游戏
   - 否则 → 创建新游戏
   ↓
5. [更新缓存] 清除相关缓存标记
```

---

## 🔄 从 v1 迁移

### v1 代码（旧）

```typescript
// 直接调用 SSE API
const response = await fetch('/api/admin/import-game-with-progress', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ game, config }),
})

// 手动处理 SSE 流
const reader = response.body?.getReader()
// ... 复杂的流处理逻辑
```

### v2 代码（新）

```typescript
// 使用 Hook，自动处理 SSE
const { importGame, progress, images } = useGameImportV2()

// 简单调用
const result = await importGame(game, config)
```

---

## 🎨 UI 组件示例

### 进度显示

```typescript
<div className="space-y-2">
  <div className="flex justify-between text-sm">
    <span>{progress.message}</span>
    <span>{progress.percentage}%</span>
  </div>
  <Progress value={progress.percentage} />
  <div className="text-xs text-muted-foreground">
    步骤 {progress.step}/{progress.total}
  </div>
</div>
```

### 图片状态

```typescript
{images.map((img, index) => (
  <div key={index} className="flex items-center justify-between">
    <div className="flex items-center gap-2">
      {img.status === 'success' && <CheckCircle2 className="text-green-500" />}
      {img.status === 'failed' && <XCircle className="text-red-500" />}
      {img.status === 'skipped' && <Clock className="text-yellow-500" />}
      <span>{img.type}</span>
    </div>
    {img.status === 'success' && (
      <Badge variant="outline">
        {img.isNewUpload ? '✓ 已上传' : '✓ 已存在'}
      </Badge>
    )}
    {img.status === 'failed' && (
      <span className="text-sm text-red-600">{img.error}</span>
    )}
  </div>
))}

{/* 重试按钮 */}
{images.some(img => img.status === 'failed') && (
  <Button onClick={retryFailedImages}>
    <RefreshCw className="mr-2 h-4 w-4" />
    重试失败的图片
  </Button>
)}
```

---

## 🐛 错误处理

### 可恢复的错误

这些错误不会终止整个流程：

- ✅ 单张图片上传失败 → 使用原始 URL 继续
- ✅ 缓存标记更新失败 → 记录警告继续
- ✅ 部分图片去重失败 → 上传新图片

### 不可恢复的错误

这些错误会终止流程：

- ❌ 分类不存在
- ❌ 游戏冲突（未设置策略）
- ❌ 数据库创建失败
- ❌ 权限不足

---

## 📝 最佳实践

### 1. 预检查

```typescript
// 导入前先预检查
const preCheckResult = await preCheckGame(slug, categoryId, gamePixId)

if (!preCheckResult.canImport) {
  // 显示冲突信息，让用户选择
  if (preCheckResult.conflicts?.gameExists) {
    // 显示：更新 | 跳过 | 使用新 slug
  }
}

// 用户选择后，设置 conflictStrategy
config.conflictStrategy = 'update' // 或 'skip' 或 'create_new'
```

### 2. 图片上传

```typescript
// 监听图片上传事件
useEffect(() => {
  images.forEach(img => {
    if (img.status === 'success' && !img.isNewUpload) {
      // 显示：图片已存在，跳过上传
    }
    if (img.status === 'failed') {
      // 显示：上传失败，可重试
    }
  })
}, [images])
```

### 3. 警告处理

```typescript
// 收集所有警告
useEffect(() => {
  if (warnings.length > 0) {
    // 显示警告面板
    // 但不阻止导入继续
  }
}, [warnings])
```

---

## 🔍 调试

### 启用详细日志

```typescript
// 在 Hook 中添加调试日志
console.log('[SSE Event]', data.type, data)
```

### 查看 API 日志

```bash
# 查看服务器日志
pnpm dev:admin

# 过滤导入相关日志
grep "导入游戏" logs.txt
```

---

## 📚 相关文件

- [apps/admin/hooks/useGameImportV2.ts](hooks/useGameImportV2.ts) - React Hook
- [apps/admin/app/api/admin/import-game-v2/route.ts](app/api/admin/import-game-v2/route.ts) - 导入 API
- [apps/admin/app/api/admin/import-game/pre-check/route.ts](app/api/admin/import-game/pre-check/route.ts) - 预检查 API
- [apps/admin/app/api/admin/retry-image-upload/route.ts](app/api/admin/retry-image-upload/route.ts) - 重试 API
- [apps/admin/components/games/GameImportV2Example.tsx](components/games/GameImportV2Example.tsx) - 示例组件
- [apps/admin/lib/gamepix-image-upload.ts](lib/gamepix-image-upload.ts) - 图片上传工具（含去重）

---

## 🎉 总结

新的导入系统提供了：

✅ **更好的用户体验** - 详细的进度和状态反馈
✅ **更强的容错性** - 部分失败不影响整体
✅ **更灵活的控制** - 预检查、冲突策略、单步重试
✅ **更清晰的代码** - Hook 封装，易于使用和维护

建议在新功能中使用 v2 系统，逐步替换旧的 v1 实现。
