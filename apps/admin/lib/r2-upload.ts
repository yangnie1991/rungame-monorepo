/**
 * Cloudflare R2 文件上传工具
 *
 * 使用 AWS S3 SDK 连接 R2 (R2 兼容 S3 API)
 * 配置从数据库读取 (ExternalApiConfig 表)
 */

import { S3Client, PutObjectCommand, DeleteObjectCommand, HeadObjectCommand } from "@aws-sdk/client-s3"
import { getR2Config, recordApiCall, type R2Config } from './external-api-config'

/**
 * R2 客户端缓存（避免每次都创建新实例）
 */
let cachedR2Client: S3Client | null = null
let cachedConfig: R2Config | null = null

/**
 * 获取 R2 客户端实例
 * 从数据库读取配置，自动创建和缓存客户端
 *
 * @returns R2 客户端实例，如果配置不存在则返回 null
 */
async function getR2Client(): Promise<{ client: S3Client; config: R2Config } | null> {
  try {
    // 获取配置
    const config = await getR2Config()

    if (!config) {
      console.warn('[R2] R2 配置未找到，请在管理后台配置')
      return null
    }

    // 如果配置未变化，直接返回缓存的客户端
    if (
      cachedR2Client &&
      cachedConfig &&
      cachedConfig.accountId === config.accountId &&
      cachedConfig.accessKeyId === config.accessKeyId &&
      cachedConfig.bucketName === config.bucketName
    ) {
      return { client: cachedR2Client, config: cachedConfig }
    }

    // 创建新的 R2 客户端
    const client = new S3Client({
      region: "auto",
      endpoint: config.endpoint || `https://${config.accountId}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey,
      },
    })

    // 缓存客户端和配置
    cachedR2Client = client
    cachedConfig = config

    console.log('[R2] R2 客户端已初始化')
    return { client, config }

  } catch (error: any) {
    console.error('[R2] 获取 R2 客户端失败:', error.message)
    return null
  }
}

/**
 * 上传配置选项
 */
export interface UploadOptions {
  /**
   * 文件路径 (在 bucket 中的路径)
   * @example "images/categories/action.png"
   */
  key: string

  /**
   * 文件内容 (Buffer 或 Uint8Array)
   */
  body: Buffer | Uint8Array

  /**
   * 文件 MIME 类型
   * @example "image/png", "image/jpeg", "image/webp"
   */
  contentType: string

  /**
   * 缓存控制头
   * @default "public, max-age=31536000, immutable"
   */
  cacheControl?: string

  /**
   * 自定义元数据
   */
  metadata?: Record<string, string>
}

/**
 * 上传结果
 */
export interface UploadResult {
  /**
   * 文件在 R2 中的 key
   */
  key: string

  /**
   * 公共访问 URL (CDN 地址)
   */
  url: string

  /**
   * 文件大小 (字节)
   */
  size: number

  /**
   * MIME 类型
   */
  contentType: string
}

/**
 * 上传文件到 R2
 *
 * @example
 * ```typescript
 * const file = await request.formData().get('file') as File
 * const buffer = Buffer.from(await file.arrayBuffer())
 *
 * const result = await uploadToR2({
 *   key: `images/categories/${Date.now()}-${file.name}`,
 *   body: buffer,
 *   contentType: file.type,
 * })
 *
 * console.log('上传成功:', result.url)
 * ```
 */
export async function uploadToR2(options: UploadOptions): Promise<UploadResult> {
  const r2ClientData = await getR2Client()

  if (!r2ClientData) {
    throw new Error('R2 未配置,请在管理后台配置 Cloudflare R2')
  }

  const { client, config } = r2ClientData
  const { key, body, contentType, cacheControl = "public, max-age=31536000, immutable", metadata } = options

  try {
    // 上传文件
    const command = new PutObjectCommand({
      Bucket: config.bucketName,
      Key: key,
      Body: body,
      ContentType: contentType,
      CacheControl: cacheControl,
      Metadata: metadata,
    })

    await client.send(command)

    // 记录 API 调用成功
    await recordApiCall('cloudflare_r2', true)

    // 构造公共 URL
    const publicUrl = config.publicUrl
      ? `https://${config.publicUrl}/${key}`
      : `https://pub-${config.accountId}.r2.dev/${key}` // 回退到 r2.dev 域名

    return {
      key,
      url: publicUrl,
      size: body.length,
      contentType,
    }
  } catch (error) {
    // 记录 API 调用失败
    await recordApiCall('cloudflare_r2', false)

    console.error('[R2] 上传失败:', error)
    throw new Error(`文件上传失败: ${error instanceof Error ? error.message : '未知错误'}`)
  }
}

/**
 * 删除 R2 中的文件
 *
 * @param key 文件 key
 * @example
 * ```typescript
 * await deleteFromR2('images/categories/old-icon.png')
 * ```
 */
export async function deleteFromR2(key: string): Promise<void> {
  const r2ClientData = await getR2Client()

  if (!r2ClientData) {
    throw new Error('R2 未配置,请在管理后台配置 Cloudflare R2')
  }

  const { client, config } = r2ClientData

  try {
    const command = new DeleteObjectCommand({
      Bucket: config.bucketName,
      Key: key,
    })

    await client.send(command)

    // 记录 API 调用成功
    await recordApiCall('cloudflare_r2', true)

  } catch (error) {
    // 记录 API 调用失败
    await recordApiCall('cloudflare_r2', false)

    console.error('[R2] 删除失败:', error)
    throw new Error(`文件删除失败: ${error instanceof Error ? error.message : '未知错误'}`)
  }
}

/**
 * 检查文件是否存在
 *
 * @param key 文件 key
 * @returns 是否存在
 */
export async function fileExistsInR2(key: string): Promise<boolean> {
  const r2ClientData = await getR2Client()

  if (!r2ClientData) {
    return false
  }

  const { client, config } = r2ClientData

  try {
    const command = new HeadObjectCommand({
      Bucket: config.bucketName,
      Key: key,
    })

    await client.send(command)

    // 记录 API 调用成功
    await recordApiCall('cloudflare_r2', true)

    return true
  } catch {
    // 记录 API 调用失败（可选，因为文件不存在是正常情况）
    // await recordApiCall('cloudflare_r2', false)

    return false
  }
}

/**
 * 从 R2 URL 提取 key
 *
 * @param url 完整的 R2 URL
 * @returns key 或 null
 *
 * @example
 * ```typescript
 * const key = extractKeyFromUrl('https://cdn.example.com/images/test.png')
 * // => 'images/test.png'
 * ```
 */
export function extractKeyFromUrl(url: string): string | null {
  if (!url) return null

  try {
    const urlObj = new URL(url)
    // 移除开头的斜杠
    return urlObj.pathname.replace(/^\//, '')
  } catch {
    return null
  }
}

/**
 * 生成唯一的文件名
 *
 * @param originalName 原始文件名
 * @returns 带时间戳的唯一文件名
 *
 * @example
 * ```typescript
 * const uniqueName = generateUniqueFileName('icon.png')
 * // => '1705234567890-icon.png'
 * ```
 */
export function generateUniqueFileName(originalName: string): string {
  const timestamp = Date.now()
  const randomStr = Math.random().toString(36).substring(2, 8)
  const ext = originalName.split('.').pop()
  const nameWithoutExt = originalName.replace(/\.[^/.]+$/, '')
  const safeName = nameWithoutExt
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .substring(0, 50) // 限制长度

  return `${timestamp}-${randomStr}-${safeName}.${ext}`
}

/**
 * 验证文件类型
 *
 * @param contentType MIME 类型
 * @param allowedTypes 允许的类型列表
 * @returns 是否允许
 */
export function validateFileType(
  contentType: string,
  allowedTypes: string[] = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
): boolean {
  return allowedTypes.includes(contentType)
}

/**
 * 验证文件大小
 *
 * @param size 文件大小 (字节)
 * @param maxSize 最大大小 (字节)
 * @returns 是否允许
 */
export function validateFileSize(size: number, maxSize: number = 5 * 1024 * 1024): boolean {
  return size > 0 && size <= maxSize
}

/**
 * 格式化文件大小
 *
 * @param bytes 字节数
 * @returns 格式化后的大小字符串
 *
 * @example
 * ```typescript
 * formatFileSize(1024) // => '1 KB'
 * formatFileSize(1048576) // => '1 MB'
 * ```
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`
}
