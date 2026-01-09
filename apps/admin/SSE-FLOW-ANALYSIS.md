# SSE 流程分析 - 游戏导入 v2

## 核心问题分析

### 问题描述
图片已存在于 R2（这是正常情况），但前端可能显示为"处理失败"，导致用户误解。

### 根本原因
1. **R2 配置问题**：`publicUrl` 或 `accountId` 未正确配置
2. **URL 构造错误**：生成的 URL 包含 `undefined`
3. **前端状态理解**：可能将 `status: 'skipped'` 误认为失败

## SSE 事件类型定义

```typescript
type SSEEvent =
  | { type: 'progress'; step: number; total: number; percentage: number; message: string }
  | { type: 'image_upload'; image: string; status: 'success' | 'skipped' | 'failed'; url?: string; reason?: string; isNewUpload?: boolean }
  | { type: 'warning'; message: string }
  | { type: 'error'; message: string; recoverable: boolean; step?: string; stepIndex?: number; context?: StepContext }
  | { type: 'conflict'; conflictType: 'game_exists' | 'duplicate_source'; data: any }
  | { type: 'success'; gameId: string; warnings?: string[] }
  | { type: 'step_completed'; stepIndex: number; context: StepContext }
```

## 图片上传流程（步骤 3）

### 正常流程

```
开始图片上传
    ↓
收集需要上传的图片 (thumbnail, banner, screenshots)
    ↓
遍历每张图片
    ↓
调用 uploadGamePixImageToR2()
    ↓
    ├─→ 图片不存在 → 下载并上传 → 返回 { url, isNewUpload: true }
    │                                  ↓
    │                          发送 SSE: { type: 'image_upload', status: 'success', isNewUpload: true }
    │
    └─→ 图片已存在 → 跳过上传 → 返回 { url, isNewUpload: false }
                                  ↓
                          发送 SSE: { type: 'image_upload', status: 'skipped', isNewUpload: false }
```

### 三种状态的含义

| 状态 | 含义 | URL | 是否成功 | 前端显示 |
|------|------|-----|----------|----------|
| `success` | 新上传成功 | ✅ 有效 R2 URL | ✅ 是 | 绿色 "上传成功" |
| `skipped` | **图片已存在，跳过上传** | ✅ 有效 R2 URL | ✅ 是 | 蓝色 "已存在" |
| `failed` | 上传失败 | ❌ 原始 URL 或无 | ❌ 否 | 红色 "失败" |

**重要**：`status: 'skipped'` **不是失败**！它表示图片已经存在，直接使用现有的 R2 URL。

## 错误处理逻辑

### 1. 图片已存在但 URL 构造失败

**场景**：R2 配置不完整（缺少 `publicUrl` 或 `accountId`）

```typescript
// 修复前（可能返回无效 URL）
const publicUrl = r2Config.publicUrl
  ? `https://${r2Config.publicUrl}/${hashBasedKey}`
  : `https://pub-${r2Config.accountId}.r2.dev/${hashBasedKey}`  // accountId 可能是 undefined

// 修复后（验证配置完整性）
if (r2Config.publicUrl) {
  publicUrl = `https://${r2Config.publicUrl}/${hashBasedKey}`
} else if (r2Config.accountId) {
  publicUrl = `https://pub-${r2Config.accountId}.r2.dev/${hashBasedKey}`
} else {
  throw new Error('R2 配置不完整：缺少 publicUrl 或 accountId')
}

// URL 格式验证
if (publicUrl.includes('undefined') || publicUrl.includes('null')) {
  throw new Error(`构造的 URL 无效: ${publicUrl}`)
}
```

**结果**：
- ✅ 如果配置正确 → 返回有效 URL，发送 `status: 'skipped'`
- ❌ 如果配置错误 → 抛出错误，进入错误处理流程

### 2. 关键图片（thumbnail）失败处理

```typescript
if (image.type === 'thumbnail') {
  // 发送错误事件（包含完整上下文，可恢复）
  send({
    type: 'error',
    message: `缩略图上传失败: ${errorMessage}`,
    recoverable: true,
    step: 'image_upload',
    stepIndex: 2,
    context: { /* 完整执行上下文 */ }
  })

  // 终止导入流程
  controller.close()
  return
}
```

**关键点**：
- 缩略图失败 → **立即终止**，不创建游戏记录
- 返回 `recoverable: true`，前端可以选择修复后重试

### 3. 非关键图片失败处理

```typescript
// Banner 和 Screenshots 失败时
uploadedImages[image.url] = image.url  // 使用原始 URL 作为后备
warnings.push(`图片上传失败 (${image.type}): ${errorMessage}，使用原始 URL`)
```

**关键点**：
- 非关键图片失败 → **继续导入**
- 使用原始 URL 作为后备
- 记录警告信息

## 调试日志输出

### 成功场景（图片已存在）

```
[uploadGamePixImageToR2] ✓ 图片已存在于 R2，跳过上传
[uploadGamePixImageToR2] R2 配置: { publicUrl: 'cdn.example.com', accountId: '已配置', bucketName: 'my-bucket' }
[uploadGamePixImageToR2] 构造的公共 URL: https://cdn.example.com/games/banners/abc123.jpg
[导入游戏 v2] uploadGamePixImageToR2 返回结果: { url: 'https://cdn.example.com/...', hash: 'abc123', isNewUpload: false, size: 12345, contentType: 'image/jpeg' }
[导入游戏 v2] 发送 SSE (已存在): { type: 'image_upload', image: 'banner', status: 'skipped', url: 'https://cdn.example.com/...', reason: '图片已存在，直接使用', isNewUpload: false }
[导入游戏 v2] ✓ 图片处理成功: banner (已存在)
```

### 失败场景（R2 配置不完整）

```
[uploadGamePixImageToR2] ✓ 图片已存在于 R2，跳过上传
[uploadGamePixImageToR2] R2 配置: { publicUrl: '未配置', accountId: '未配置', bucketName: 'my-bucket' }
[uploadGamePixImageToR2] ✗ 错误: R2 配置不完整：缺少 publicUrl 或 accountId
[导入游戏 v2] ✗ 图片上传失败: thumbnail R2 配置不完整：缺少 publicUrl 或 accountId
[导入游戏 v2] ✗✗✗ 缩略图上传失败，终止导入流程
```

## 前端处理建议

### 1. 正确理解三种状态

```typescript
// 前端 SSE 事件处理
if (event.type === 'image_upload') {
  switch (event.status) {
    case 'success':
      // 绿色提示：上传成功
      showToast('success', `${event.image} 上传成功`)
      break

    case 'skipped':
      // 蓝色提示：已存在（这是正常情况！）
      showToast('info', `${event.image} 已存在，跳过上传`)
      break

    case 'failed':
      // 红色提示：失败
      showToast('error', `${event.image} 上传失败: ${event.reason}`)
      break
  }
}
```

### 2. 错误恢复

```typescript
if (event.type === 'error' && event.recoverable) {
  // 显示错误信息和重试按钮
  showErrorDialog({
    message: event.message,
    recoverable: true,
    onRetry: () => {
      // 从失败的步骤恢复执行
      retryImport({
        startFromStep: event.stepIndex + 1,
        context: event.context
      })
    }
  })
}
```

## 检查清单

### R2 配置检查

访问 `/admin/external-apis`，确保：

- [ ] `publicUrl` 或 `accountId` 至少配置一个
- [ ] `bucketName` 已配置
- [ ] `accessKeyId` 和 `secretAccessKey` 已配置

### 测试流程

1. **测试新图片上传**
   ```
   预期: status: 'success', isNewUpload: true
   ```

2. **测试已存在图片**
   ```
   预期: status: 'skipped', isNewUpload: false
   URL: 应该是有效的 R2 URL
   ```

3. **测试 R2 配置错误**
   ```
   预期: status: 'failed', 错误消息提示配置问题
   缩略图失败: 终止导入
   ```

## 相关文件

- 图片上传逻辑: [apps/admin/lib/gamepix-image-upload.ts](apps/admin/lib/gamepix-image-upload.ts)
- SSE API 路由: [apps/admin/app/api/admin/import-game-v2/route.ts](apps/admin/app/api/admin/import-game-v2/route.ts)
- R2 配置管理: [apps/admin/lib/external-api-config.ts](apps/admin/lib/external-api-config.ts)

---

**创建时间**: 2025-11-21
**版本**: v1.0
