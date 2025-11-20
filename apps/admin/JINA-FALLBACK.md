# Jina Reader API 回退机制

## 功能说明

当使用 Jina Reader 付费 API 时，如果遇到 402 错误（配额用完/需要付费），系统会**自动回退到免费 API**，确保服务的连续性。

## 工作流程

```
1. 首次请求使用付费 API (带 API Key)
   ↓
2. 如果返回 402 错误
   ↓
3. 自动重试，使用免费 API (不带 API Key)
   ↓
4. 返回结果或错误
```

## 代码示例

```typescript
import { readWebPage } from '@/lib/jina-reader'

// 正常调用，会自动处理回退
const result = await readWebPage('https://example.com/article')

if (result.error) {
  console.error('解析失败:', result.error)
} else {
  console.log('标题:', result.title)
  console.log('内容:', result.content)
}
```

## 日志输出

### 付费 API 成功
```
[Jina Reader] 使用数据库配置（带 API Key）
[Jina Reader] ✓ https://example.com - 1234 词
```

### 付费 API 失败，回退到免费 API
```
[Jina Reader] 使用数据库配置（带 API Key）
[Jina Reader] 付费 API 返回 402，尝试回退到免费 API
[Jina Reader] 使用回退模式（免费 API）
[Jina Reader] ✓ https://example.com - 1234 词
```

### 免费 API 也失败
```
[Jina Reader] 使用数据库配置（带 API Key）
[Jina Reader] 付费 API 返回 402，尝试回退到免费 API
[Jina Reader] 使用回退模式（免费 API）
[Jina Reader] ✗ https://example.com: Jina 免费 API 配额已用完。请稍后重试
```

## 错误消息

| 场景 | 错误消息 |
|------|---------|
| 付费 API 402 + 免费 API 成功 | 无错误，正常返回结果 |
| 付费 API 402 + 免费 API 402 | `Jina 免费 API 配额已用完。请稍后重试` |
| 免费模式直接 402 | `Jina 免费模式配额已用完。请在管理后台（外部 API 配置）添加有效的 API Key 或稍后重试` |

## 技术细节

### 实现位置
- 文件: [apps/admin/lib/jina-reader.ts](apps/admin/lib/jina-reader.ts#L44-L139)
- 函数: `readWebPage(url: string, truncate: boolean = true, skipApiKey: boolean = false)`

### 参数说明
- `url`: 要解析的网页 URL
- `truncate`: 是否截断内容到 5000 字符（默认 true）
- `skipApiKey`: 强制跳过 API Key，使用免费模式（内部参数，用于回退逻辑）

### 回退逻辑
```typescript
if (response.status === 402) {
  // 如果当前使用的是付费 API 且未在回退模式
  if (apiKey && !skipApiKey) {
    console.log('[Jina Reader] 付费 API 返回 402，尝试回退到免费 API')

    // 递归调用自己，但跳过 API Key（回退到免费模式）
    return await readWebPage(url, truncate, true)
  }

  // 如果已经是免费模式，抛出错误
  throw new Error('Jina 免费 API 配额已用完。请稍后重试')
}
```

## 配置说明

在管理后台配置 Jina Reader API Key:
1. 访问 `/admin/external-apis`
2. 找到 "Jina Reader" 配置
3. 填写 API Key（可选）
4. 保存

- **有 API Key**: 优先使用付费 API，失败时自动回退到免费 API
- **无 API Key**: 直接使用免费 API

## 注意事项

1. **速率限制**: 免费 API 有更严格的速率限制
2. **配额管理**: 建议监控 API 使用量，避免频繁触发回退
3. **性能影响**: 回退会导致单次请求时间增加（需要两次 API 调用）
4. **幂等性**: 回退逻辑只触发一次，不会无限递归

## 相关文件

- [apps/admin/lib/jina-reader.ts](apps/admin/lib/jina-reader.ts) - Jina Reader 集成
- [apps/admin/lib/external-api-config.ts](apps/admin/lib/external-api-config.ts) - 外部 API 配置管理

---

**更新时间**: 2025-11-21
**版本**: v1.0
