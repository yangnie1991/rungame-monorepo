/**
 * 将 public 文件夹中的静态文件同步到 Cloudflare R2
 *
 * 使用方法：
 * - 增量上传（推荐）: npx tsx scripts/sync-public-to-r2.ts
 * - 强制上传: npx tsx scripts/sync-public-to-r2.ts --force
 *
 * 功能特性：
 * - 支持增量上传（仅上传新增或修改的文件）
 * - 支持强制上传（覆盖所有文件）
 * - 自动计算文件 MD5 避免重复上传
 * - 自动设置正确的 Content-Type
 * - 支持排除特定文件模式
 */

import { S3Client, PutObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3"
import fs from "fs"
import path from "path"
import crypto from "crypto"
import { glob } from "glob"
import mime from "mime-types"

// 检查环境变量
const requiredEnvVars = [
  "R2_ACCOUNT_ID",
  "R2_ACCESS_KEY_ID",
  "R2_SECRET_ACCESS_KEY",
  "R2_BUCKET_NAME",
]

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    console.error(`❌ 错误: 缺少环境变量 ${envVar}`)
    console.error("\n请在 .env 文件中配置以下变量：")
    console.error("R2_ACCOUNT_ID=your_account_id")
    console.error("R2_ACCESS_KEY_ID=your_access_key")
    console.error("R2_SECRET_ACCESS_KEY=your_secret_key")
    console.error("R2_BUCKET_NAME=your_bucket_name")
    process.exit(1)
  }
}

const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID!
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID!
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY!
const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME!

// 初始化 S3 客户端（R2 兼容 S3 API）
const s3Client = new S3Client({
  region: "auto",
  endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: R2_ACCESS_KEY_ID,
    secretAccessKey: R2_SECRET_ACCESS_KEY,
  },
})

/**
 * 计算文件的 MD5 哈希值
 */
function getFileMD5(filePath: string): string {
  const fileBuffer = fs.readFileSync(filePath)
  return crypto.createHash("md5").update(fileBuffer).digest("hex")
}

/**
 * 格式化文件大小
 */
function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 Bytes"
  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i]
}

/**
 * 获取 R2 中已有的文件列表及其 ETag
 */
async function getR2FilesList(): Promise<Map<string, string>> {
  const files = new Map<string, string>()

  try {
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
            // 移除 ETag 的引号
            files.set(obj.Key, obj.ETag.replace(/"/g, ""))
          }
        }
      }

      continuationToken = response.NextContinuationToken
    } while (continuationToken)
  } catch (error) {
    console.error("⚠️  警告: 无法获取 R2 文件列表，将强制上传所有文件")
    console.error(error)
  }

  return files
}

/**
 * 上传单个文件到 R2
 */
async function uploadFileToR2(
  localPath: string,
  r2Key: string,
  existingFiles: Map<string, string>,
  force = false
): Promise<{ uploaded: boolean; size: number }> {
  const fileContent = fs.readFileSync(localPath)
  const fileSize = fileContent.length
  const contentType = mime.lookup(localPath) || "application/octet-stream"
  const fileMD5 = getFileMD5(localPath)

  // 检查文件是否已存在且未修改
  if (!force) {
    const existingETag = existingFiles.get(r2Key)

    if (existingETag === fileMD5) {
      console.log(`⏭️  跳过（未修改）: ${r2Key} (${formatBytes(fileSize)})`)
      return { uploaded: false, size: fileSize }
    }
  }

  try {
    await s3Client.send(
      new PutObjectCommand({
        Bucket: R2_BUCKET_NAME,
        Key: r2Key,
        Body: fileContent,
        ContentType: contentType,
        CacheControl: getCacheControl(localPath),
        Metadata: {
          "original-path": localPath,
          "upload-date": new Date().toISOString(),
        },
      })
    )

    console.log(`✅ 上传成功: ${r2Key} (${formatBytes(fileSize)})`)
    return { uploaded: true, size: fileSize }
  } catch (error) {
    console.error(`❌ 上传失败: ${r2Key}`)
    console.error(error)
    return { uploaded: false, size: 0 }
  }
}

/**
 * 根据文件类型设置缓存策略
 */
function getCacheControl(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase()

  // 不同类型文件的缓存策略
  const cacheRules: Record<string, string> = {
    // 长期缓存（1年）- 图片、字体、视频等不常变化的资源
    ".jpg": "public, max-age=31536000, immutable",
    ".jpeg": "public, max-age=31536000, immutable",
    ".png": "public, max-age=31536000, immutable",
    ".gif": "public, max-age=31536000, immutable",
    ".webp": "public, max-age=31536000, immutable",
    ".svg": "public, max-age=31536000, immutable",
    ".ico": "public, max-age=31536000, immutable",
    ".woff": "public, max-age=31536000, immutable",
    ".woff2": "public, max-age=31536000, immutable",
    ".ttf": "public, max-age=31536000, immutable",
    ".eot": "public, max-age=31536000, immutable",
    ".mp4": "public, max-age=31536000, immutable",
    ".webm": "public, max-age=31536000, immutable",

    // 中期缓存（1天）- 可能更新的文件
    ".css": "public, max-age=86400",
    ".js": "public, max-age=86400",
    ".json": "public, max-age=86400",

    // 短期缓存（1小时）- SEO 文件和经常更新的内容
    ".txt": "public, max-age=3600",
    ".xml": "public, max-age=3600",
    ".html": "public, max-age=3600",
  }

  return cacheRules[ext] || "public, max-age=3600"
}

/**
 * 主函数：同步 public 文件夹到 R2
 */
async function syncPublicFiles(options: { force?: boolean } = {}) {
  console.log("\n🚀 开始同步 public 文件夹到 R2\n")
  console.log(`📍 Bucket: ${R2_BUCKET_NAME}`)
  console.log(`🌐 Endpoint: https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com\n`)

  const publicDir = path.join(process.cwd(), "public")

  // 检查 public 目录是否存在
  if (!fs.existsSync(publicDir)) {
    console.error(`❌ 错误: public 目录不存在: ${publicDir}`)
    process.exit(1)
  }

  // 定义排除模式
  // 提示：如果使用"混合方案"，可以排除需要保留在 public 的文件
  const excludePatterns = [
    // 示例：排除 ads.txt 和其他 SEO 文件
    // "ads.txt",
    // "robots.txt",
    // "llms.txt",
    // "sitemap.xml",
    // "*.txt",  // 排除所有 .txt 文件
  ]

  // 扫描所有文件
  const files = await glob("**/*", {
    cwd: publicDir,
    nodir: true,
    ignore: excludePatterns,
  })

  if (files.length === 0) {
    console.log("⚠️  警告: 没有找到需要上传的文件")
    return
  }

  console.log(`📦 找到 ${files.length} 个文件`)

  if (options.force) {
    console.log("⚠️  强制上传模式（将覆盖所有文件）\n")
  } else {
    console.log("🔄 增量上传模式（仅上传新增或修改的文件）")
    console.log("💡 提示: 使用 --force 参数可强制上传所有文件\n")
  }

  // 获取 R2 中已有的文件列表
  const existingFiles = options.force ? new Map() : await getR2FilesList()

  if (!options.force && existingFiles.size > 0) {
    console.log(`📊 R2 中已有 ${existingFiles.size} 个文件\n`)
  }

  // 统计信息
  const stats = {
    total: files.length,
    uploaded: 0,
    skipped: 0,
    failed: 0,
    totalSize: 0,
    uploadedSize: 0,
  }

  // 上传文件
  for (const file of files) {
    const localPath = path.join(publicDir, file)
    const r2Key = `public/${file}` // 在 R2 中添加 public/ 前缀

    const result = await uploadFileToR2(localPath, r2Key, existingFiles, options.force)

    stats.totalSize += result.size

    if (result.uploaded) {
      stats.uploaded++
      stats.uploadedSize += result.size
    } else {
      stats.skipped++
    }
  }

  stats.failed = stats.total - stats.uploaded - stats.skipped

  // 输出统计信息
  console.log("\n" + "=".repeat(60))
  console.log("✨ 同步完成！")
  console.log("=".repeat(60))
  console.log(`📊 统计信息:`)
  console.log(`   - 总文件数: ${stats.total}`)
  console.log(`   - 上传成功: ${stats.uploaded} 个 (${formatBytes(stats.uploadedSize)})`)
  console.log(`   - 跳过未修改: ${stats.skipped} 个`)
  if (stats.failed > 0) {
    console.log(`   - 上传失败: ${stats.failed} 个`)
  }
  console.log(`   - 总大小: ${formatBytes(stats.totalSize)}`)

  // 输出访问 URL
  const R2_PUBLIC_URL = process.env.R2_PUBLIC_URL || `https://pub-${R2_ACCOUNT_ID}.r2.dev`
  console.log(`\n🌐 访问 URL: ${R2_PUBLIC_URL}/public/`)
  console.log(`\n💡 示例: ${R2_PUBLIC_URL}/public/ads.txt`)
  console.log("=".repeat(60) + "\n")

  if (stats.failed > 0) {
    process.exit(1)
  }
}

// 解析命令行参数
const args = process.argv.slice(2)
const force = args.includes("--force") || args.includes("-f")
const help = args.includes("--help") || args.includes("-h")

if (help) {
  console.log(`
📦 将 public 文件夹同步到 Cloudflare R2

用法:
  npx tsx scripts/sync-public-to-r2.ts [选项]

选项:
  --force, -f    强制上传所有文件（覆盖已存在的文件）
  --help, -h     显示帮助信息

示例:
  # 增量上传（推荐）
  npx tsx scripts/sync-public-to-r2.ts

  # 强制上传所有文件
  npx tsx scripts/sync-public-to-r2.ts --force

环境变量:
  R2_ACCOUNT_ID          Cloudflare 账户 ID
  R2_ACCESS_KEY_ID       R2 访问密钥 ID
  R2_SECRET_ACCESS_KEY   R2 访问密钥
  R2_BUCKET_NAME         R2 Bucket 名称
  R2_PUBLIC_URL          R2 公开 URL（可选）
`)
  process.exit(0)
}

// 执行同步
syncPublicFiles({ force }).catch((error) => {
  console.error("\n❌ 同步失败:", error)
  process.exit(1)
})
