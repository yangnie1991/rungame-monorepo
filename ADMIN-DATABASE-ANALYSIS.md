# Admin 数据库 Schema 对比分析

## 📋 分析概览

本文档对比**旧主表schema**和**新admin数据库schema**的差异，并明确哪些表属于管理配置表，应迁移到Neon数据库。

---

## 🎯 表分类

### ✅ 管理配置表（应在Admin数据库 - Neon）

| 表名 | 用途 | 数据量 | 迁移状态 |
|------|------|--------|----------|
| `admins` | 管理员用户 | 1条 | ✅ 已迁移 |
| `import_platforms` | 游戏导入平台配置 | 1条 | ⚠️ 需重新迁移（字段不匹配）|
| `ai_configs` | AI服务配置 | 1条 | ⚠️ 需重新迁移（字段不匹配）|
| `search_engine_configs` | 搜索引擎提交配置 | 3条 | ⚠️ 需重新迁移（字段不匹配）|
| `url_submissions` | URL提交记录 | 643条 | ⚠️ 需重新迁移（字段不匹配）|
| `submission_batches` | 批量提交任务 | 0条 | ✅ 表已存在 |

### 🗄️ 缓存表（应在Admin数据库 - Neon）

| 表名 | 用途 | 数据量 | 状态 |
|------|------|--------|------|
| `gamepix_games_cache` | GamePix游戏缓存 | 未知 | ✅ 已存在 |
| `sync_logs` | 同步日志 | 未知 | ✅ 已存在 |
| `ai_chat_history` | AI对话历史 | 未知 | ✅ 已存在 |

### 📊 业务数据表（保留在主数据库 - Supabase）

| 表名 | 用途 | 说明 |
|------|------|------|
| `games` | 游戏主表 | 核心业务数据 |
| `game_translations` | 游戏翻译 | 核心业务数据 |
| `categories` | 游戏分类 | 核心业务数据 |
| `category_translations` | 分类翻译 | 核心业务数据 |
| `tags` | 游戏标签 | 核心业务数据 |
| `tag_translations` | 标签翻译 | 核心业务数据 |
| `page_types` | 页面类型 | 核心业务数据 |
| `page_type_translations` | 页面类型翻译 | 核心业务数据 |
| `page_content_blocks` | 页面内容块 | 核心业务数据 |
| `page_content_block_translations` | 内容块翻译 | 核心业务数据 |
| `languages` | 系统语言 | 核心业务数据 |
| `language_translations` | 语言翻译 | 核心业务数据 |
| `game_votes` | 游戏投票 | 用户交互数据 |
| `site_configs` | 网站配置 | 应用配置数据 |
| `_GameToCategory` | 游戏-分类关联 | 核心业务数据 |
| `_GameToTag` | 游戏-标签关联 | 核心业务数据 |

---

## 🔍 字段差异对比

### 1. ImportPlatform 表

#### 旧主表字段（Supabase）
```prisma
model ImportPlatform {
  id           String    @id @default(cuid())
  name         String
  apiUrl       String    @map("api_url")
  apiKey       String    @map("api_key")
  isEnabled    Boolean   @default(true) @map("is_enabled")
  lastSyncAt   DateTime? @map("last_sync_at")
  totalGames   Int       @default(0) @map("total_games")
  syncedGames  Int       @default(0) @map("synced_games")
  createdAt    DateTime  @default(now()) @map("created_at")
  updatedAt    DateTime  @updatedAt @map("updated_at")
}
```

#### 新Admin数据库字段（Neon - 当前）
```prisma
model ImportPlatform {
  id              String    @id @default(cuid())
  name            String
  slug            String    @unique        // ❌ 新增字段
  type            String                  // ❌ 新增字段
  icon            String?                 // ❌ 新增字段
  apiConfig       Json      @map("api_config")  // ❌ 改为JSON
  defaultConfig   Json?     @default("{}") @map("default_config") // ❌ 新增字段
  isEnabled       Boolean   @default(true) @map("is_enabled")
  sortOrder       Int       @default(0) @map("sort_order") // ❌ 新增字段
  totalImported   Int       @default(0) @map("total_imported")
  lastImportAt    DateTime? @map("last_import_at")
  createdAt       DateTime  @default(now()) @map("created_at")
  updatedAt       DateTime  @updatedAt @map("updated_at")
}
```

#### ⚠️ 关键差异
- **缺失字段**: `apiUrl`, `apiKey`, `lastSyncAt`, `totalGames`, `syncedGames`
- **新增字段**: `slug`, `type`, `icon`, `apiConfig` (JSON), `defaultConfig` (JSON), `sortOrder`, `totalImported`, `lastImportAt`
- **语义变化**: `totalGames` → `totalImported`, `lastSyncAt` → `lastImportAt`

---

### 2. AiConfig 表

#### 旧主表字段（Supabase）
```prisma
model AiConfig {
  id            String   @id @default(cuid())
  provider      String
  model         String
  apiKey        String   @map("api_key")
  apiUrl        String   @map("api_url")
  temperature   Float?   @default(0.7)
  maxTokens     Int?     @default(2000) @map("max_tokens")
  systemPrompt  String?  @db.Text @map("system_prompt")
  isEnabled     Boolean  @default(true) @map("is_enabled")
  createdAt     DateTime @default(now()) @map("created_at")
  updatedAt     DateTime @updatedAt @map("updated_at")
}
```

#### 新Admin数据库字段（Neon - 当前）
```prisma
model AiConfig {
  id          String   @id @default(cuid())
  name        String                   // ❌ 新增字段
  provider    String
  apiKey      String   @map("api_key")
  baseUrl     String   @map("base_url") // ⚠️ 重命名 apiUrl → baseUrl
  modelConfig Json     @map("model_config") // ❌ 改为JSON，包含models数组
  isActive    Boolean  @default(false) @map("is_active") // ❌ 新增字段
  isEnabled   Boolean  @default(true) @map("is_enabled")
  createdAt   DateTime @default(now()) @map("created_at")
  updatedAt   DateTime @updatedAt @map("updated_at")
}
```

#### ⚠️ 关键差异
- **缺失字段**: `model`, `apiUrl`, `temperature`, `maxTokens`, `systemPrompt`
- **新增字段**: `name`, `baseUrl`, `modelConfig` (JSON), `isActive`
- **结构变化**: 原来的 `model`, `temperature`, `maxTokens` 现在都在 `modelConfig` JSON字段中

---

### 3. SearchEngineConfig 表

#### 旧主表字段（Supabase）
```prisma
model SearchEngineConfig {
  id        String   @id @default(cuid())
  name      String
  submitUrl String   @map("submit_url")
  apiKey    String?  @map("api_key")
  isEnabled Boolean  @default(true) @map("is_enabled")
  batchSize Int      @default(100) @map("batch_size")
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")
}
```

#### 新Admin数据库字段（Neon - 当前）
```prisma
model SearchEngineConfig {
  id             String    @id @default(cuid())
  name           String
  slug           String    @unique            // ❌ 新增字段
  type           String                      // ❌ 新增字段
  icon           String?                     // ❌ 新增字段
  description    String?                     // ❌ 新增字段
  apiEndpoint    String    @map("api_endpoint") // ⚠️ 重命名 submitUrl → apiEndpoint
  apiKey         String?   @map("api_key")
  apiToken       String?   @map("api_token")  // ❌ 新增字段
  siteUrl        String?   @map("site_url")   // ❌ 新增字段
  extraConfig    Json?     @default("{}") @map("extra_config") // ❌ 新增字段
  isEnabled      Boolean   @default(true) @map("is_enabled")
  autoSubmit     Boolean   @default(false) @map("auto_submit") // ❌ 新增字段
  sortOrder      Int       @default(0) @map("sort_order") // ❌ 新增字段
  totalSubmitted Int       @default(0) @map("total_submitted") // ❌ 新增字段
  totalSuccess   Int       @default(0) @map("total_success") // ❌ 新增字段
  totalFailed    Int       @default(0) @map("total_failed") // ❌ 新增字段
  lastSubmitAt   DateTime? @map("last_submit_at") // ❌ 新增字段
  createdAt      DateTime  @default(now()) @map("created_at")
  updatedAt      DateTime  @updatedAt @map("updated_at")
}
```

#### ⚠️ 关键差异
- **缺失字段**: `submitUrl`, `batchSize`
- **新增字段**: `slug`, `type`, `icon`, `description`, `apiEndpoint`, `apiToken`, `siteUrl`, `extraConfig`, `autoSubmit`, `sortOrder`, `totalSubmitted`, `totalSuccess`, `totalFailed`, `lastSubmitAt`
- **重命名**: `submitUrl` → `apiEndpoint`

---

### 4. UrlSubmission 表

#### 旧主表字段（Supabase）
```prisma
model UrlSubmission {
  id              String           @id @default(cuid())
  url             String           @unique
  searchEngineId  String           @map("search_engine_id")
  status          SubmissionStatus @default(PENDING)
  responseMessage String?          @map("response_message")
  submittedAt     DateTime?        @map("submitted_at")
  createdAt       DateTime         @default(now()) @map("created_at")
  updatedAt       DateTime         @updatedAt @map("updated_at")
}
```

#### 新Admin数据库字段（Neon - 当前）
```prisma
model UrlSubmission {
  id       String  @id @default(cuid())
  url      String
  urlType  String  @map("url_type")         // ❌ 新增字段
  entityId String? @map("entity_id")        // ❌ 新增字段
  locale   String?                          // ❌ 新增字段

  // Google提交状态（分离）
  googleSubmitStatus        SubmissionStatus? @map("google_submit_status")
  googleSubmitStatusMessage String?           @map("google_submit_status_message")
  googleSubmitHttpStatus    Int?              @map("google_submit_http_status")
  googleSubmitResponseBody  String?           @map("google_submit_response_body")
  googleSubmitResponseTime  Int?              @map("google_submit_response_time")
  googleSubmittedAt         DateTime?         @map("google_submitted_at")

  // Bing提交状态（分离）
  bingSubmitStatus        SubmissionStatus? @map("bing_submit_status")
  bingSubmitStatusMessage String?           @map("bing_submit_status_message")
  bingSubmitHttpStatus    Int?              @map("bing_submit_http_status")
  bingSubmitResponseBody  String?           @map("bing_submit_response_body")
  bingSubmitResponseTime  Int?              @map("bing_submit_response_time")
  bingSubmittedAt         DateTime?         @map("bing_submitted_at")

  // Google收录状态
  indexedByGoogle      Boolean?  @map("indexed_by_google")
  googleIndexedAt      DateTime? @map("google_indexed_at")
  googleLastCheckAt    DateTime? @map("google_last_check_at")
  googleCheckMessage   String?   @map("google_check_message")
  googleIndexStatusRaw Json?     @map("google_index_status_raw")

  // Bing收录状态
  indexedByBing      Boolean?  @map("indexed_by_bing")
  bingIndexedAt      DateTime? @map("bing_indexed_at")
  bingLastCheckAt    DateTime? @map("bing_last_check_at")
  bingCheckMessage   String?   @map("bing_check_message")
  bingIndexStatusRaw Json?     @map("bing_index_status_raw")

  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")

  @@unique([url], name: "unique_url")
}
```

#### ⚠️ 关键差异
- **缺失字段**: `searchEngineId`, `status`, `responseMessage`, `submittedAt`
- **新增字段**: `urlType`, `entityId`, `locale`, 以及所有Google/Bing分离的字段
- **结构变化**: 原来单一的 `status`/`responseMessage` 现在分离为 Google 和 Bing 各自的状态字段

---

## 📊 迁移策略建议

### 方案 A: 修改新schema匹配旧结构（推荐）✅

**优点**:
- 数据迁移简单，直接复制字段
- 不需要复杂的数据转换逻辑
- 保持与旧系统的兼容性

**缺点**:
- 失去新schema的增强功能（如JSON配置、Google/Bing分离）

**实施步骤**:
1. 修改 `schema-admin.prisma` 恢复旧字段
2. 运行 `prisma db push` 更新Neon数据库
3. 执行简单的数据迁移脚本

---

### 方案 B: 保持新schema，编写转换逻辑

**优点**:
- 保留新schema的增强功能
- 更灵活的配置管理

**缺点**:
- 需要复杂的字段映射逻辑
- 可能丢失部分旧数据信息
- 迁移脚本复杂度高

**字段映射示例**:
```javascript
// ImportPlatform 转换
{
  slug: platform.name.toLowerCase().replace(/\s+/g, '-'),
  type: 'gamepix',
  apiConfig: {
    apiUrl: platform.api_url,
    apiKey: platform.api_key
  },
  totalImported: platform.total_games || 0,
  lastImportAt: platform.last_sync_at
}
```

---

## 🎯 推荐方案

**建议采用方案 A**：修改新schema以匹配旧主表结构

### 理由：
1. **数据完整性**: 避免字段映射导致的数据丢失
2. **简单可靠**: 迁移脚本简单，出错概率低
3. **快速实施**: 不需要复杂的转换逻辑
4. **向后兼容**: 保持与旧系统的一致性

### 后续优化：
如果未来需要增强功能（如JSON配置），可以：
1. 在新字段中逐步添加增强功能
2. 保留旧字段作为兼容层
3. 使用数据库视图或应用层转换

---

## 📝 下一步操作

1. ✅ 修改 `schema-admin.prisma` 以匹配旧主表字段
2. ✅ 运行 `prisma db push` 更新Neon数据库
3. ✅ 更新迁移脚本 `migrate-all-admin-data.js`
4. ✅ 执行数据迁移
5. ✅ 验证迁移结果

---

**文档创建时间**: 2025-11-20
**分析人**: Claude Code
**目的**: 确保Admin数据库schema与旧主表完全一致，顺利完成数据迁移
