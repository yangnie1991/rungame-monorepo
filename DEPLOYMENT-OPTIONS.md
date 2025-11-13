# 部署选项和超时处理方案

## 🚀 推荐部署方案

### 选项 1: Vercel + Upstash (推荐)

**架构**:
- Frontend + API: Vercel
- 任务队列: Upstash QStash
- 数据库: Supabase

**优势**:
- ✅ Vercel 免费额度足够（10秒超时）
- ✅ Upstash 免费额度：500 次/天
- ✅ 自动重试机制
- ✅ 无需管理服务器

**实现步骤**:

1. **安装依赖**
```bash
npm install @upstash/qstash
```

2. **创建后台任务 API**
```typescript
// app/api/cron/check-bing-index/route.ts
import { Client } from '@upstash/qstash'

const qstash = new Client({
  token: process.env.QSTASH_TOKEN!,
})

export async function POST(request: Request) {
  const { submissionIds } = await request.json()

  // 发送到后台队列
  await qstash.publishJSON({
    url: `${process.env.NEXT_PUBLIC_URL}/api/workers/check-index`,
    body: { submissionIds },
    retries: 3,
  })

  return Response.json({ success: true, message: '已加入后台队列' })
}
```

3. **Worker 处理任务**
```typescript
// app/api/workers/check-index/route.ts
export const maxDuration = 300 // Vercel Pro: 5 分钟

export async function POST(request: Request) {
  const { submissionIds } = await request.json()

  // 批量检查（可以运行很久）
  for (const id of submissionIds) {
    await checkBingIndexStatus(id)
    await new Promise(r => setTimeout(r, 2000))
  }

  return Response.json({ success: true })
}
```

**成本**: 免费 - $5/月

---

### 选项 2: Vercel + Inngest (功能更强)

**Inngest**: 专业的后台任务平台

**优势**:
- ✅ 免费额度：1000 步骤/月
- ✅ 可视化任务监控
- ✅ 自动重试、调度、并发控制
- ✅ TypeScript 支持

**实现**:
```typescript
import { Inngest } from 'inngest'

const inngest = new Inngest({ id: 'rungame' })

// 定义后台函数
export const checkBingIndex = inngest.createFunction(
  { id: 'check-bing-index' },
  { event: 'bing/check.requested' },
  async ({ event, step }) => {
    const { submissionIds } = event.data

    // 每个 URL 作为独立步骤
    for (const id of submissionIds) {
      await step.run(`check-${id}`, async () => {
        return await checkBingIndexStatus(id)
      })

      await step.sleep('wait', '2s')
    }
  }
)

// 触发任务
await inngest.send({
  name: 'bing/check.requested',
  data: { submissionIds },
})
```

**成本**: 免费 - $20/月

---

### 选项 3: Railway (最简单)

**特点**:
- ✅ 无超时限制
- ✅ 自动部署
- ✅ 内置数据库
- ⚠️ 按使用量计费

**成本**: $5-15/月

**部署**:
```bash
# 1. 安装 Railway CLI
npm install -g @railway/cli

# 2. 登录
railway login

# 3. 初始化项目
railway init

# 4. 链接数据库
railway add postgresql

# 5. 部署
railway up
```

---

### 选项 4: Cloudflare Pages + Durable Objects

**仅适用于**: 需要极致性能和全球分发

**限制**:
- ⚠️ CPU 限制严格（50ms）
- ⚠️ 需要重写所有长时间任务
- ⚠️ 学习曲线陡峭

**不推荐用于当前项目**

---

## 🎯 针对当前项目的推荐

### 短期方案（立即实施）

**限制批量操作数量**:

```typescript
// 限制一次最多检查 5 个 URL
const MAX_BATCH_SIZE = 5

const handleBatchCheck = async () => {
  if (selectedIds.length > MAX_BATCH_SIZE) {
    toast.error(`一次最多检查 ${MAX_BATCH_SIZE} 个 URL`)
    return
  }

  // 执行检查...
}
```

**分批处理**:
```typescript
// 每次检查 5 个，总共检查 20 个需要 4 次点击
const batchSize = 5
for (let i = 0; i < selectedIds.length; i += batchSize) {
  const batch = selectedIds.slice(i, i + batchSize)
  await checkBingIndexBatch(batch)

  // 显示进度
  toast.info(`已检查 ${i + batch.length}/${selectedIds.length}`)
}
```

### 中期方案（1-2 周）

**使用 Upstash QStash**:
- 成本: 免费
- 时间投入: 4-6 小时
- 改进: 无超时限制

### 长期方案（如果规模扩大）

**迁移到 Railway 或 Render**:
- 成本: $5-10/月
- 完全控制超时
- 更好的性能

---

## 📊 成本对比

| 方案 | 月成本 | 超时限制 | 复杂度 | 推荐度 |
|------|--------|----------|--------|--------|
| Vercel Free + 限制批量 | $0 | 10秒 | ⭐ | ⭐⭐⭐ |
| Vercel + Upstash | $0-5 | 无 | ⭐⭐ | ⭐⭐⭐⭐⭐ |
| Vercel + Inngest | $0-20 | 无 | ⭐⭐ | ⭐⭐⭐⭐ |
| Railway | $5-15 | 无 | ⭐ | ⭐⭐⭐⭐ |
| Cloudflare | $5 | 50ms CPU | ⭐⭐⭐⭐ | ⭐ |

---

## 🔧 实施建议

### 立即行动（今天）
1. 限制批量操作数量为 5 个
2. 添加进度提示
3. 分批处理大量 URL

### 本周实施
1. 评估 Upstash QStash
2. 实现简单的后台任务队列
3. 部署测试

### 下月考虑
1. 如果业务增长，迁移到 Railway
2. 或升级 Vercel Pro
