# Public 静态文件迁移到 R2 指南

本文档说明如何将 Next.js `public` 文件夹下的静态文件迁移到 Cloudflare R2，并确保在根域名下可访问。

---

## 📋 目录

1. [方案对比](#方案对比)
2. [方案 1: 混合方案（推荐）](#方案-1-混合方案推荐)
3. [方案 2: Next.js Rewrites 代理](#方案-2-nextjs-rewrites-代理)
4. [方案 3: Cloudflare Worker 边缘处理](#方案-3-cloudflare-worker-边缘处理)
5. [批量上传脚本](#批量上传脚本)
6. [最佳实践](#最佳实践)

---

## 方案对比

| 方案 | 复杂度 | 性能 | 维护成本 | 适用场景 |
|-----|-------|-----|---------|---------|
| **混合方案** | ⭐ 低 | 高 | 低 | 小型项目，静态文件不多 |
| **Rewrites 代理** | ⭐⭐ 中 | 中 | 中 | 需要统一管理所有静态资源 |
| **Worker 边缘** | ⭐⭐⭐ 高 | 最高 | 高 | 大型项目，全球化部署 |

---

## 方案 1: 混合方案（推荐）

### 策略

将静态文件分为两类：

1. **保留在 public 的文件**：
   - `ads.txt` - 广告授权文件
   - `robots.txt` - 搜索引擎爬虫规则
   - `llms.txt` - AI 爬虫指引
   - `*.txt` - 各类验证文件（域名验证、服务验证等）
   - `sitemap.xml` - 站点地图
   - `favicon.ico` - 网站图标

2. **迁移到 R2 的文件**：
   - `/images/**` - 所有图片资源
   - `/fonts/**` - 字体文件
   - `/videos/**` - 视频文件
   - `/assets/**` - 其他静态资源

### 优点

✅ **零配置** - 无需修改代码
✅ **可靠性高** - 根域名文件直接由 Next.js 服务器处理
✅ **兼容性好** - 确保广告平台能正确访问 `ads.txt`
✅ **成本低** - 这些文本文件很小，对服务器负担可忽略

### 缺点

❌ 部分文件仍在应用服务器上
❌ 不够"彻底"

### 实现步骤

无需修改，保持现有结构即可：

```
public/
├── ads.txt          # 保留
├── robots.txt       # 保留
├── llms.txt         # 保留
├── sitemap.xml      # 保留
├── favicon.ico      # 保留
├── *.txt            # 验证文件保留
│
└── images/          # → 迁移到 R2
    └── ...
```

---

## 方案 2: Next.js Rewrites 代理

### 策略

将所有静态文件上传到 R2，通过 Next.js rewrites 将根域名路径代理到 R2。

### 步骤 1: 上传文件到 R2

创建上传脚本 `scripts/upload-public-to-r2.ts`：

```typescript
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import fs from "fs"
import path from "path"
import { glob } from "glob"
import mime from "mime-types"

const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID!
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID!
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY!
const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME!

const s3Client = new S3Client({
  region: "auto",
  endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: R2_ACCESS_KEY_ID,
    secretAccessKey: R2_SECRET_ACCESS_KEY,
  },
})

async function uploadFileToR2(
  localPath: string,
  r2Key: string
): Promise<void> {
  const fileContent = fs.readFileSync(localPath)
  const contentType = mime.lookup(localPath) || "application/octet-stream"

  await s3Client.send(
    new PutObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: r2Key,
      Body: fileContent,
      ContentType: contentType,
      CacheControl: "public, max-age=31536000, immutable", // 1年缓存
    })
  )

  console.log(`✅ 上传成功: ${localPath} → ${r2Key}`)
}

async function uploadPublicFiles() {
  const publicDir = path.join(process.cwd(), "public")

  // 匹配所有需要上传的文件
  const files = await glob("**/*", {
    cwd: publicDir,
    nodir: true,
    ignore: [
      // 排除不需要上传到 R2 的文件（可选）
      // 如果使用 rewrites 方案，可以全部上传
      // "ads.txt",
      // "robots.txt",
      // "llms.txt",
      // "sitemap.xml",
    ],
  })

  console.log(`\n📦 找到 ${files.length} 个文件\n`)

  for (const file of files) {
    const localPath = path.join(publicDir, file)
    const r2Key = `public/${file}` // 在 R2 中添加 public/ 前缀

    await uploadFileToR2(localPath, r2Key)
  }

  console.log(`\n✨ 完成！共上传 ${files.length} 个文件\n`)
}

uploadPublicFiles().catch((error) => {
  console.error("❌ 上传失败:", error)
  process.exit(1)
})
```

### 步骤 2: 配置 Next.js Rewrites

编辑 `next.config.ts`：

```typescript
const nextConfig: NextConfig = {
  // ... 现有配置

  async rewrites() {
    const R2_PUBLIC_URL =
      process.env.R2_PUBLIC_URL ||
      `https://pub-${process.env.R2_ACCOUNT_ID}.r2.dev`

    return [
      // 将根域名的 .txt 文件请求代理到 R2
      {
        source: "/ads.txt",
        destination: `${R2_PUBLIC_URL}/public/ads.txt`,
      },
      {
        source: "/llms.txt",
        destination: `${R2_PUBLIC_URL}/public/llms.txt`,
      },
      {
        source: "/robots.txt",
        destination: `${R2_PUBLIC_URL}/public/robots.txt`,
      },
      // 匹配所有 .txt 验证文件
      {
        source: "/:path*.txt",
        destination: `${R2_PUBLIC_URL}/public/:path*.txt`,
      },
      // sitemap 和其他 XML 文件
      {
        source: "/sitemap.xml",
        destination: `${R2_PUBLIC_URL}/public/sitemap.xml`,
      },
      // favicon
      {
        source: "/favicon.ico",
        destination: `${R2_PUBLIC_URL}/public/favicon.ico`,
      },
    ]
  },
}
```

### 步骤 3: 执行上传

```bash
# 安装依赖
npm install mime-types glob
npm install -D @types/mime-types

# 执行上传
npx tsx scripts/upload-public-to-r2.ts
```

### 步骤 4: 测试验证

```bash
# 启动开发服务器
npm run dev

# 测试 ads.txt 是否可访问
curl http://localhost:3000/ads.txt

# 测试 llms.txt 是否可访问
curl http://localhost:3000/llms.txt
```

### 优点

✅ 所有静态文件统一管理在 R2
✅ 减少应用服务器存储压力
✅ 灵活控制缓存策略
✅ 便于 CDN 加速

### 缺点

❌ 增加了一层代理，略微增加响应时间（约 50-100ms）
❌ 配置相对复杂
❌ 需要维护上传脚本

---

## 方案 3: Cloudflare Worker 边缘处理

### 策略

使用 Cloudflare Worker 在边缘直接从 R2 返回文件，无需经过应用服务器。

### 步骤 1: 创建 Worker

创建 `workers/static-files.ts`：

```typescript
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)
    const pathname = url.pathname

    // 定义需要从 R2 读取的文件
    const staticFiles = [
      "/ads.txt",
      "/llms.txt",
      "/robots.txt",
      "/sitemap.xml",
      "/favicon.ico",
    ]

    // 检查是否是静态文件请求
    if (staticFiles.includes(pathname) || pathname.endsWith(".txt")) {
      try {
        // 从 R2 获取文件
        const object = await env.R2_BUCKET.get(`public${pathname}`)

        if (!object) {
          return new Response("Not Found", { status: 404 })
        }

        // 返回文件内容
        return new Response(object.body, {
          headers: {
            "Content-Type": object.httpMetadata?.contentType || "text/plain",
            "Cache-Control": "public, max-age=3600", // 1小时缓存
          },
        })
      } catch (error) {
        return new Response("Internal Server Error", { status: 500 })
      }
    }

    // 其他请求转发到源服务器
    return fetch(request)
  },
}

interface Env {
  R2_BUCKET: R2Bucket
}
```

### 步骤 2: 配置 wrangler.toml

创建 `wrangler.toml`：

```toml
name = "rungame-static-files"
main = "workers/static-files.ts"
compatibility_date = "2024-01-01"

[[r2_buckets]]
binding = "R2_BUCKET"
bucket_name = "game-onilne"  # 你的 R2 bucket 名称
```

### 步骤 3: 部署 Worker

```bash
# 安装 Wrangler CLI
npm install -g wrangler

# 登录 Cloudflare
wrangler login

# 部署 Worker
wrangler deploy
```

### 步骤 4: 配置路由规则

在 Cloudflare Dashboard 中：

1. 进入你的域名设置
2. 点击 **Workers Routes**
3. 添加路由规则：
   - Route: `yourdomain.com/*.txt`
   - Worker: `rungame-static-files`
4. 添加更多规则：
   - `yourdomain.com/sitemap.xml`
   - `yourdomain.com/robots.txt`
   - `yourdomain.com/favicon.ico`

### 优点

✅ **最快的响应速度** - 边缘处理，无需经过应用服务器
✅ **零服务器负担** - 完全不占用应用服务器资源
✅ **全球 CDN 加速** - Cloudflare 全球边缘网络
✅ **灵活的缓存控制** - 在 Worker 中自定义缓存策略

### 缺点

❌ 配置最复杂
❌ 需要维护 Worker 代码
❌ 增加了架构复杂度
❌ Worker 免费版有请求限制（10万次/天）

---

## 批量上传脚本

### 完整版上传脚本

创建 `scripts/sync-public-to-r2.ts`（支持增量上传）：

```typescript
import { S3Client, PutObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3"
import fs from "fs"
import path from "path"
import crypto from "crypto"
import { glob } from "glob"
import mime from "mime-types"

const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID!
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID!
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY!
const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME!

const s3Client = new S3Client({
  region: "auto",
  endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: R2_ACCESS_KEY_ID,
    secretAccessKey: R2_SECRET_ACCESS_KEY,
  },
})

// 计算文件 MD5
function getFileMD5(filePath: string): string {
  const fileBuffer = fs.readFileSync(filePath)
  return crypto.createHash("md5").update(fileBuffer).digest("hex")
}

// 获取 R2 中已有的文件列表
async function getR2FilesList(): Promise<Map<string, string>> {
  const files = new Map<string, string>()

  let continuationToken: string | undefined

  do {
    const command = new ListObjectsV2Command({
      Bucket: R2_BUCKET_NAME,
      Prefix: "public/",
      ContinuationToken: continuationToken,
    })

    const response = await s3Client.send(command)

    if (response.Contents) {
      for (const obj of response.Contents) {
        if (obj.Key && obj.ETag) {
          files.set(obj.Key, obj.ETag.replace(/"/g, ""))
        }
      }
    }

    continuationToken = response.NextContinuationToken
  } while (continuationToken)

  return files
}

async function uploadFileToR2(
  localPath: string,
  r2Key: string,
  force = false
): Promise<boolean> {
  const fileContent = fs.readFileSync(localPath)
  const contentType = mime.lookup(localPath) || "application/octet-stream"
  const fileMD5 = getFileMD5(localPath)

  // 检查文件是否已存在且未修改
  if (!force) {
    const r2Files = await getR2FilesList()
    const existingETag = r2Files.get(r2Key)

    if (existingETag === fileMD5) {
      console.log(`⏭️  跳过（未修改）: ${r2Key}`)
      return false
    }
  }

  await s3Client.send(
    new PutObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: r2Key,
      Body: fileContent,
      ContentType: contentType,
      CacheControl: "public, max-age=31536000, immutable",
      Metadata: {
        "original-path": localPath,
        "upload-date": new Date().toISOString(),
      },
    })
  )

  console.log(`✅ 上传成功: ${localPath} → ${r2Key}`)
  return true
}

async function syncPublicFiles(options: { force?: boolean } = {}) {
  const publicDir = path.join(process.cwd(), "public")

  // 可选：排除不需要上传的文件
  const excludePatterns = [
    // 如果使用混合方案，排除这些文件：
    // "ads.txt",
    // "robots.txt",
    // "llms.txt",
    // "sitemap.xml",
    // "*.txt",
  ]

  const files = await glob("**/*", {
    cwd: publicDir,
    nodir: true,
    ignore: excludePatterns,
  })

  console.log(`\n📦 找到 ${files.length} 个文件`)

  if (options.force) {
    console.log("⚠️  强制上传模式（将覆盖所有文件）\n")
  } else {
    console.log("🔄 增量上传模式（仅上传新增或修改的文件）\n")
  }

  let uploadedCount = 0
  let skippedCount = 0

  for (const file of files) {
    const localPath = path.join(publicDir, file)
    const r2Key = `public/${file}`

    const uploaded = await uploadFileToR2(localPath, r2Key, options.force)

    if (uploaded) {
      uploadedCount++
    } else {
      skippedCount++
    }
  }

  console.log(`\n✨ 完成！`)
  console.log(`   上传: ${uploadedCount} 个文件`)
  console.log(`   跳过: ${skippedCount} 个文件`)
  console.log(`   总计: ${files.length} 个文件\n`)
}

// 解析命令行参数
const args = process.argv.slice(2)
const force = args.includes("--force") || args.includes("-f")

syncPublicFiles({ force }).catch((error) => {
  console.error("❌ 同步失败:", error)
  process.exit(1)
})
```

### 使用方法

```bash
# 增量上传（推荐）- 仅上传新增或修改的文件
npx tsx scripts/sync-public-to-r2.ts

# 强制上传 - 覆盖所有文件
npx tsx scripts/sync-public-to-r2.ts --force
```

---

## 最佳实践

### 1. 文件分类策略

**保留在 public 的文件**：
- 所有 SEO 相关文件（`robots.txt`, `sitemap.xml`）
- 广告验证文件（`ads.txt`）
- 域名验证文件（`*.txt`）
- 关键的 favicon 文件

**迁移到 R2 的文件**：
- 所有图片资源（`/images/**`）
- 字体文件（`/fonts/**`）
- 视频文件（`/videos/**`）
- 其他大型静态资源

### 2. 缓存策略

```typescript
// 长期缓存（1年）- 适用于带版本号的资源
CacheControl: "public, max-age=31536000, immutable"

// 中期缓存（1天）- 适用于可能更新的资源
CacheControl: "public, max-age=86400"

// 短期缓存（1小时）- 适用于经常更新的文件
CacheControl: "public, max-age=3600"

// 不缓存 - 适用于动态内容
CacheControl: "no-cache, no-store, must-revalidate"
```

### 3. 自动化部署

添加到 `package.json`：

```json
{
  "scripts": {
    "r2:upload": "tsx scripts/sync-public-to-r2.ts",
    "r2:upload:force": "tsx scripts/sync-public-to-r2.ts --force",
    "predeploy": "npm run r2:upload"
  }
}
```

### 4. CI/CD 集成

在 `.github/workflows/deploy.yml` 中添加：

```yaml
- name: Sync static files to R2
  env:
    R2_ACCOUNT_ID: ${{ secrets.R2_ACCOUNT_ID }}
    R2_ACCESS_KEY_ID: ${{ secrets.R2_ACCESS_KEY_ID }}
    R2_SECRET_ACCESS_KEY: ${{ secrets.R2_SECRET_ACCESS_KEY }}
    R2_BUCKET_NAME: ${{ secrets.R2_BUCKET_NAME }}
  run: npm run r2:upload
```

### 5. 监控和日志

```typescript
// 添加上传统计
const stats = {
  total: 0,
  uploaded: 0,
  skipped: 0,
  failed: 0,
  totalSize: 0,
}

// 记录上传日志
fs.writeFileSync(
  "r2-upload-log.json",
  JSON.stringify({
    timestamp: new Date().toISOString(),
    stats,
    files: uploadedFiles,
  }, null, 2)
)
```

---

## 推荐方案

根据项目规模和需求选择：

### 小型项目（< 100MB 静态文件）
→ **方案 1: 混合方案**
- 简单可靠
- 维护成本低
- 足够满足需求

### 中型项目（100MB - 1GB 静态文件）
→ **方案 2: Next.js Rewrites**
- 统一管理资源
- 减少服务器压力
- 配置相对简单

### 大型项目（> 1GB 静态文件，全球化部署）
→ **方案 3: Cloudflare Worker**
- 最佳性能
- 全球 CDN 加速
- 适合高并发场景

---

## 常见问题

### Q: ads.txt 必须在根域名吗？

A: 是的，Google 和其他广告平台要求 `ads.txt` 必须在根域名访问（如 `https://yourdomain.com/ads.txt`），不能有重定向或子目录。

### Q: 使用 rewrites 会影响 SEO 吗？

A: 不会。Next.js rewrites 是服务器端代理，对搜索引擎和用户是透明的，不会产生 301/302 重定向。

### Q: 如何验证文件是否正确上传到 R2？

A: 可以直接访问 R2 公开 URL：

```bash
curl https://pub-{ACCOUNT_ID}.r2.dev/public/ads.txt
```

### Q: 上传脚本失败怎么办？

A: 检查以下几点：
1. 环境变量是否正确配置
2. R2 API Token 权限是否包含写入权限
3. Bucket 名称是否正确
4. 网络连接是否正常

### Q: 如何批量删除 R2 中的文件？

A: 创建删除脚本：

```typescript
import { S3Client, DeleteObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3"

async function deleteAllPublicFiles() {
  const files = await getR2FilesList()

  for (const [key] of files) {
    await s3Client.send(
      new DeleteObjectCommand({
        Bucket: R2_BUCKET_NAME,
        Key: key,
      })
    )
    console.log(`🗑️  删除: ${key}`)
  }
}
```

---

**最后更新**: 2025-11-14
**适用版本**: RunGame v1.0+
