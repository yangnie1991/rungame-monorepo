# Jina Reader API 智能回退机制

## 功能说明

Jina Reader 提供三种使用模式，支持智能回退和手动控制：

### 三种使用模式

1. **自动模式（auto）** - 推荐 ⭐
   - 优先使用付费 API（如果配置了 API Key）
   - 遇到 402 错误（配额用完）时**自动永久切换**到免费模式
   - 后续请求直接使用免费 API，避免重复尝试付费 API

2. **付费模式（paid）**
   - 强制使用付费 API
   - 配额用完时直接报错，不自动回退
   - 适用于需要稳定付费服务的场景

3. **免费模式（free）**
   - 强制使用免费 API
   - 即使配置了 API Key 也不使用
   - 适用于测试或无需高速率限制的场景

## 智能回退工作流程

### 自动模式（auto）

```
第一次请求
   ↓
使用付费 API (带 API Key)
   ↓
返回 402 错误？
   ↙        ↘
  是         否
   ↓         ↓
永久切换到   返回结果
free 模式
   ↓
重试本次请求
使用免费 API
   ↓
返回结果

后续所有请求
   ↓
直接使用免费 API
(不再尝试付费 API)
```

### 付费模式（paid）

```
所有请求
   ↓
强制使用付费 API
   ↓
返回 402 错误？
   ↙        ↘
  是         否
   ↓         ↓
抛出错误   返回结果
(不回退)
```

### 免费模式（free）

```
所有请求
   ↓
强制使用免费 API
(忽略 API Key 配置)
   ↓
返回结果或错误
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

## 日志输出示例

### 自动模式 - 首次使用（付费 API 成功）
```
[Jina Reader] 使用自动模式（当前：付费 API）
[Jina Reader] ✓ https://example.com - 1234 词
```

### 自动模式 - 触发自动切换
```
[Jina Reader] 使用自动模式（当前：付费 API）
[Jina Reader] 付费 API 配额用完，自动切换到免费模式
[External API] Jina Reader 使用模式已更新为: free
[Jina Reader] 使用临时回退模式（免费 API）
[Jina Reader] ✓ https://example.com - 1234 词
```

### 自动切换后的后续请求
```
[Jina Reader] 使用免费模式（配置强制）
[Jina Reader] ✓ https://example.com - 1234 词
```

### 付费模式 - 配额用完
```
[Jina Reader] 使用付费模式（配置强制）
[Jina Reader] ✗ https://example.com: 付费 API 配额已用完。请检查账户余额或在管理后台切换到"自动"或"免费"模式
```

### 免费模式 - 直接使用
```
[Jina Reader] 使用免费模式（配置强制）
[Jina Reader] ✓ https://example.com - 1234 词
```

## 错误消息

| 模式 | 场景 | 错误消息 |
|------|------|---------|
| auto | 付费 API 402 → 切换成功 | 无错误，自动切换到 free 并返回结果 |
| auto | 切换后免费 API 402 | `免费 API 配额已用完。建议在管理后台添加有效的 API Key 并切换到"自动"模式，或稍后重试` |
| paid | 付费 API 402 | `付费 API 配额已用完。请检查账户余额或在管理后台切换到"自动"或"免费"模式` |
| free | 免费 API 402 | `免费 API 配额已用完。建议在管理后台添加有效的 API Key 并切换到"自动"模式，或稍后重试` |

## 技术细节

### 核心文件
- **配置管理**: [apps/admin/lib/external-api-config.ts](apps/admin/lib/external-api-config.ts)
  - `JinaUseMode` 类型定义
  - `getJinaReaderConfig()` - 读取配置（包含 useMode）
  - `updateJinaUseMode()` - 更新使用模式（保存到数据库）

- **API 调用**: [apps/admin/lib/jina-reader.ts](apps/admin/lib/jina-reader.ts)
  - `readWebPage()` - 根据 useMode 决定使用哪个 API
  - 402 错误处理和自动切换逻辑

- **管理界面**: [apps/admin/app/admin/external-apis/page.tsx](apps/admin/app/admin/external-apis/page.tsx)
  - 模式切换按钮 UI
  - `handleSwitchJinaMode()` - 手动切换处理函数

- **Server Actions**: [apps/admin/app/admin/external-apis/actions.ts](apps/admin/app/admin/external-apis/actions.ts)
  - `switchJinaUseMode()` - Server Action 包装函数

### 数据库持久化

模式存储在 `ExternalApiConfig` 表的 `apiConfig` JSON 字段中：

```typescript
// 数据库结构
{
  name: 'jina_reader',
  apiConfig: {
    apiKey: '...',        // 加密的 API Key
    endpoint: '...',
    timeout: 20,
    useMode: 'auto',      // 👈 使用模式（持久化存储）
    options: { ... }
  }
}
```

更新逻辑：
```typescript
export async function updateJinaUseMode(useMode: JinaUseMode): Promise<boolean> {
  // 1. 获取当前配置
  const config = await getExternalApiConfig('jina_reader')

  // 2. 更新数据库
  await prismaAdmin.externalApiConfig.update({
    where: { name: 'jina_reader' },
    data: {
      apiConfig: {
        ...config.apiConfig,
        useMode  // 新的模式
      }
    }
  })

  // 3. 清除缓存
  await clearConfigCache('jina_reader')

  return true
}
```

### 智能回退逻辑

```typescript
// 在 readWebPage() 函数中
if (response.status === 402) {
  // 情况 1: auto 模式 + 使用付费 API → 切换到 free 模式
  if (useMode === 'auto' && apiKey && !skipApiKey) {
    console.log('[Jina Reader] 付费 API 配额用完，自动切换到免费模式')

    // 永久切换到 free 模式（保存到数据库）
    await updateJinaUseMode('free')

    // 本次请求立即重试免费 API
    return await readWebPage(url, truncate, true)
  }

  // 情况 2: paid 模式 → 抛出错误（不回退）
  if (useMode === 'paid') {
    throw new Error('付费 API 配额已用完...')
  }

  // 情况 3: free 模式 → 抛出错误
  if (useMode === 'free' || skipApiKey) {
    throw new Error('免费 API 配额已用完...')
  }
}
```

### 缓存机制

使用 Next.js `unstable_cache` 缓存配置：
- 读取时从缓存获取，避免频繁查询数据库
- 更新时调用 `clearConfigCache()` 清除缓存
- 下次读取自动从数据库重新加载最新配置

## 管理后台配置

访问 `/admin/external-apis` 进行配置：

### 1. 选择使用模式

三个按钮可快速切换模式：
- **自动** - 推荐默认模式，智能回退
- **仅付费** - 强制付费，不回退
- **仅免费** - 强制免费，忽略 API Key

### 2. 配置 API Key（可选）

- 留空：仅能使用免费模式
- 填写：可使用付费 API（取决于 useMode 设置）

### 3. 查看使用统计

实时显示：
- 总调用次数
- 成功/失败次数
- 成功率

## 使用建议

### 推荐配置 ⭐

**开发/测试环境**:
```
模式: 免费模式 (free)
API Key: 不配置
适用场景: 开发调试，无需高速率
```

**生产环境（预算有限）**:
```
模式: 自动模式 (auto)
API Key: 配置有效密钥
适用场景: 默认付费，配额用完自动降级到免费
```

**生产环境（需要稳定服务）**:
```
模式: 付费模式 (paid)
API Key: 配置有效密钥 + 充足余额
适用场景: 强制付费，配额用完报警，不降级
```

### 模式切换时机

| 时机 | 从 → 到 | 原因 |
|------|---------|------|
| 系统自动 | auto → free | 付费 API 配额用完 |
| 手动切换 | free → auto | 充值 API Key 后恢复自动模式 |
| 手动切换 | auto → paid | 需要稳定付费服务，禁止降级 |
| 手动切换 | paid → auto | 允许自动降级以保证可用性 |

## 注意事项

### ✅ 优势

1. **持久化存储** - 模式切换后永久保存，重启应用仍然生效
2. **避免重复失败** - 切换到 free 后，后续请求不再尝试付费 API
3. **性能优化** - 切换后只需一次 API 调用，不需要每次都重试
4. **灵活控制** - 三种模式满足不同场景需求

### ⚠️ 注意

1. **速率限制**
   - 免费 API: 更严格的速率限制
   - 付费 API: 根据套餐享受更高速率

2. **自动切换不可逆**
   - auto 模式下自动切换到 free 后，**不会自动切换回来**
   - 需要手动在管理后台重置为 auto 模式

3. **配额监控**
   - 建议设置 API 配额告警
   - 在管理后台查看使用统计

4. **模式优先级**
   - useMode 配置优先于 API Key 配置
   - free 模式下，即使配置了 API Key 也不会使用

## 相关文件

- [apps/admin/lib/jina-reader.ts](apps/admin/lib/jina-reader.ts) - Jina Reader 集成
- [apps/admin/lib/external-api-config.ts](apps/admin/lib/external-api-config.ts) - 外部 API 配置管理

---

**更新时间**: 2025-11-21
**版本**: v1.0
