# 游戏导入 v2 - 6步流程说明

## 更新日期
2025-11-21

## 变更概述
从5步流程升级为6步流程，主要改进：**增加标签验证**和**独立的标签关联步骤**。

## 新的6步流程

```
步骤 1 (0-10%):    预检查冲突
  - 检查 slug 冲突
  - 检查 sourcePlatformId 冲突
  - 处理冲突策略（update/skip/create_new）

步骤 2 (10-25%):   验证资源（分类+标签）
  子步骤 2.1 (10% → 17%): 验证分类
    - 检查分类是否存在
    - 检查分类是否启用
    - 获取主分类 ID

  子步骤 2.2 (17% → 25%): 验证标签
    - 去重 tagIds
    - 查询数据库检查标签是否存在
    - 跳过不存在的标签并发出警告
    - 返回 validatedTagIds

步骤 3 (25-60%):   上传图片到 R2
  - 收集需要上传的图片（thumbnail, banner, screenshots）
  - 逐个上传，支持部分失败
  - 缩略图失败 → 终止导入
  - 非关键图片失败 → 使用原始 URL 并继续
  - 返回三种状态：
    - success: 新上传成功
    - skipped: 图片已存在（这是成功！）
    - failed: 上传失败

步骤 4 (60-85%):   创建/更新游戏记录
  - 创建或更新游戏基础信息
  - 创建或更新翻译
  - 创建分类关联（gameCategories）
  - ⚠️ 不包含标签关联（移到步骤5）

步骤 5 (85-95%):   关联标签
  - 删除现有标签关联
  - 使用 validatedTagIds 创建新的标签关联
  - 关联失败不影响游戏导入，只发出警告

步骤 6 (95-100%):  更新缓存和标记
  - 标记游戏已导入
  - 失效相关缓存标签
```

## 与旧流程的主要区别

### 旧流程（5步）
```
步骤 1 (0-10%):   预检查冲突
步骤 2 (10-20%):  验证分类
步骤 3 (20-55%):  上传图片
步骤 4 (55-85%):  创建游戏 + 关联标签  ← 标签未验证
步骤 5 (85-100%): 更新缓存
```

### 新流程（6步）
```
步骤 1 (0-10%):   预检查冲突
步骤 2 (10-25%):  验证资源（分类+标签）  ← 新增标签验证
步骤 3 (25-60%):  上传图片
步骤 4 (60-85%):  创建游戏（不含标签）
步骤 5 (85-95%):  关联标签  ← 新增独立步骤
步骤 6 (95-100%): 更新缓存
```

## 核心改进

### 1. 标签验证（步骤2新增）
**问题**：旧流程中，标签在步骤4直接关联，没有验证是否存在，导致：
- 不存在的标签会导致数据库错误
- 无法给用户反馈哪些标签不存在
- 无进度显示

**解决方案**：
- 在步骤2中验证所有 tagIds 是否存在
- 过滤出存在的标签（validatedTagIds）
- 对不存在的标签发出警告
- 显示验证进度（17% → 25%）

```typescript
// 标签验证逻辑
const uniqueTagIds = [...new Set(config.tagIds)]
const existingTags = await prisma.tag.findMany({
  where: { id: { in: uniqueTagIds } },
  select: { id: true, name: true }
})

const existingTagIds = existingTags.map(t => t.id)
const missingTagIds = uniqueTagIds.filter(id => !existingTagIds.includes(id))

if (missingTagIds.length > 0) {
  send({ type: 'warning', message: `${missingTagIds.length} 个标签不存在，将被跳过` })
  warnings.push(`以下标签不存在: ${missingTagIds.join(', ')}`)
}

validatedTagIds = existingTagIds
```

### 2. 独立的标签关联步骤（步骤5新增）
**问题**：旧流程中，标签关联在步骤4中与游戏创建混在一起：
- 标签关联失败会导致整个游戏创建失败
- 无法单独重试标签关联
- 无进度显示

**解决方案**：
- 将标签关联移到独立的步骤5
- 标签关联失败不影响游戏创建
- 可以单独重试步骤5
- 显示独立进度（85% → 95%）

```typescript
// 步骤5：关联标签
if (validatedTagIds && validatedTagIds.length > 0) {
  try {
    await prisma.gameTag.deleteMany({
      where: { gameId: createdGame.id }
    })

    await prisma.gameTag.createMany({
      data: validatedTagIds.map((tagId: string) => ({
        gameId: createdGame.id,
        tagId
      }))
    })

    send({ type: 'progress', step: 5, total: 6, percentage: 95, message: `成功关联 ${validatedTagIds.length} 个标签` })
  } catch (error: any) {
    warnings.push(`标签关联失败: ${error.message}`)
    send({ type: 'warning', message: `标签关联失败，但游戏已创建` })
  }
}
```

### 3. 更细粒度的进度反馈
- 步骤2拆分为两个子步骤（分类验证、标签验证）
- 每个子步骤都有独立的进度百分比
- 前端可以更准确地显示导入进度

### 4. StepContext 扩展
新增 `validatedTagIds` 字段，支持从任意步骤恢复执行：

```typescript
interface StepContext {
  existingBySlug?: { id: string; title: string; slug: string; status: string }
  mainCategoryId?: string
  categoryName?: string
  validatedTagIds?: string[]  // ← 新增
  uploadedImages?: Record<string, string>
  uploadedCount?: number
  skippedCount?: number
  failedCount?: number
  gameId?: string
  warnings?: string[]
}
```

## 错误处理

### 标签相关错误

1. **标签不存在**（步骤2）
   - 行为：跳过不存在的标签，继续导入
   - 反馈：发送 warning 事件
   - 记录：添加到 warnings 数组

2. **标签关联失败**（步骤5）
   - 行为：游戏已创建，仅标签关联失败
   - 反馈：发送 warning 事件，告知用户游戏已创建
   - 记录：添加到 warnings 数组
   - 恢复：可以稍后重试步骤5

### 关键图片失败处理（未变更）

- 缩略图失败 → 立即终止，返回可恢复错误（recoverable: true）
- 非关键图片失败 → 使用原始 URL，继续导入

## 前端适配建议

### 1. 更新进度条
- 总步骤数从 5 改为 6
- 步骤2显示"验证资源（分类+标签）"
- 步骤5显示"关联标签"

### 2. 标签验证反馈
- 显示"验证标签"子步骤（17% → 25%）
- 对不存在的标签显示警告
- 显示验证通过的标签数量

### 3. 标签关联反馈
- 显示"关联标签"独立步骤（85% → 95%）
- 显示成功关联的标签数量
- 对关联失败显示警告（不影响游戏创建）

## 测试场景

### 场景1：正常导入（包含标签）
1. 所有标签都存在 → 验证通过
2. 图片上传成功
3. 游戏创建成功
4. 标签关联成功
5. 缓存更新成功
**预期结果**：100% 完成，无警告

### 场景2：部分标签不存在
1. 5个标签中有2个不存在 → 验证跳过2个
2. 图片上传成功
3. 游戏创建成功
4. 关联3个有效标签成功
5. 缓存更新成功
**预期结果**：100% 完成，1个警告（标签不存在）

### 场景3：标签关联失败
1. 所有标签验证通过
2. 图片上传成功
3. 游戏创建成功
4. 标签关联失败（数据库错误）
5. 缓存更新成功
**预期结果**：100% 完成，1个警告（标签关联失败），游戏已创建

### 场景4：无标签导入
1. tagIds 为空 → 跳过标签验证
2. 图片上传成功
3. 游戏创建成功
4. 跳过标签关联
5. 缓存更新成功
**预期结果**：100% 完成，无警告

## 相关文件

- 导入 API: [apps/admin/app/api/admin/import-game-v2/route.ts](apps/admin/app/api/admin/import-game-v2/route.ts)
- SSE 流程分析: [apps/admin/SSE-FLOW-ANALYSIS.md](apps/admin/SSE-FLOW-ANALYSIS.md)
- 重构总结: [apps/admin/REFACTORING-SUMMARY.md](apps/admin/REFACTORING-SUMMARY.md)

---

**版本**: v2.1（6步流程）
**创建时间**: 2025-11-21
**作者**: Claude Code
