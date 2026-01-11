/**
 * GamePix 图片上传到 R2
 *
 * 功能：
 * 1. 去除图片 URL 中的 w= 参数获取原图
 * 2. 下载图片并计算 SHA-256 哈希值
 * 3. 检查 R2 中是否已存在（通过哈希值去重）
 * 4. 上传图片到 R2（不存在时）
 * 5. 返回 R2 CDN URL
 */

import 'server-only'
import { uploadToR2, fileExistsInR2, type UploadResult } from './r2-upload'
import { getR2Config } from './external-api-config'
import { removeWidthParameter } from './utils-ui'
import crypto from 'crypto'

/**
 * 图片上传结果
 */
export interface ImageUploadResult {
  /**
   * R2 CDN URL
   */
  url: string

  /**
   * 文件哈希值（用于去重）
   */
  hash: string

  /**
   * 是否是新上传（false 表示使用了已有图片）
   */
  isNewUpload: boolean

  /**
   * 文件大小（字节）
   */
  size: number

  /**
   * MIME 类型
   */
  contentType: string
}



/**
 * 计算图片的 SHA-256 哈希值
 *
 * @param buffer 图片 Buffer
 * @returns SHA-256 哈希值（16进制字符串）
 */
function calculateHash(buffer: Buffer): string {
  return crypto.createHash('sha256').update(buffer).digest('hex')
}

/**
 * 从 URL 获取文件扩展名
 *
 * @param url 图片 URL
 * @returns 文件扩展名（如 'jpg', 'png'）
 */
function getFileExtension(url: string): string {
  try {
    const urlObj = new URL(url)
    const pathname = urlObj.pathname
    const match = pathname.match(/\.([a-z0-9]+)$/i)
    return (match && match[1]) ? match[1].toLowerCase() : 'jpg' // 默认 jpg
  } catch {
    return 'jpg'
  }
}

/**
 * 根据文件扩展名获取 MIME 类型
 *
 * @param ext 文件扩展名
 * @returns MIME 类型
 */
function getMimeType(ext: string): string {
  const mimeTypes: Record<string, string> = {
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    webp: 'image/webp',
    gif: 'image/gif',
  }
  return mimeTypes[ext.toLowerCase()] || 'image/jpeg'
}

/**
 * 下载图片并上传到 R2
 *
 * @param imageUrl GamePix 图片 URL（会自动去除 w= 参数）
 * @param options 配置选项
 * @returns 上传结果
 *
 * @example
 * ```typescript
 * const result = await uploadGamePixImageToR2(
 *   'https://img.gamepix.com/games/abc/cover.jpg?w=400',
 *   { folder: 'games/thumbnails' }
 * )
 * console.log('R2 URL:', result.url)
 * console.log('是否新上传:', result.isNewUpload)
 * ```
 */
export async function uploadGamePixImageToR2(
  imageUrl: string,
  options: {
    /**
     * R2 中的文件夹路径
     * @default 'games/images'
     */
    folder?: string
  } = {}
): Promise<ImageUploadResult> {
  const { folder = 'games/images' } = options

  // 步骤 1: 去除 w= 参数，获取原图 URL
  const originalUrl = removeWidthParameter(imageUrl)
  console.log('[uploadGamePixImageToR2] 原图 URL:', originalUrl)

  // 步骤 2: 下载图片
  let imageBuffer: Buffer
  try {
    const response = await fetch(originalUrl)
    if (!response.ok) {
      throw new Error(`下载图片失败: ${response.status} ${response.statusText}`)
    }

    const arrayBuffer = await response.arrayBuffer()
    imageBuffer = Buffer.from(arrayBuffer)
    console.log('[uploadGamePixImageToR2] 图片下载成功，大小:', imageBuffer.length, '字节')
  } catch (error) {
    console.error('[uploadGamePixImageToR2] 下载图片失败:', error)
    throw new Error(`下载图片失败: ${error instanceof Error ? error.message : '未知错误'}`)
  }

  // 步骤 3: 计算图片哈希值
  const hash = calculateHash(imageBuffer)
  console.log('[uploadGamePixImageToR2] 图片哈希:', hash)

  // 步骤 4: 检查 R2 中是否已存在相同哈希的图片
  const ext = getFileExtension(originalUrl)
  const hashBasedKey = `${folder}/${hash}.${ext}`
  const exists = await fileExistsInR2(hashBasedKey)

  if (exists) {
    console.log('[uploadGamePixImageToR2] ✓ 图片已存在于 R2，跳过上传')

    // 从数据库获取 R2 配置并构造公共 URL
    const r2Config = await getR2Config()
    if (!r2Config) {
      throw new Error('R2 配置未找到，无法构造公共 URL')
    }

    console.log('[uploadGamePixImageToR2] R2 配置:', {
      publicUrl: r2Config.publicUrl || '未配置',
      accountId: r2Config.accountId ? '已配置' : '未配置',
      bucketName: r2Config.bucketName
    })

    // 构造公共 URL
    let publicUrl: string
    if (r2Config.publicUrl) {
      // 使用自定义 CDN 域名
      publicUrl = `https://${r2Config.publicUrl}/${hashBasedKey}`
    } else if (r2Config.accountId) {
      // 使用 R2 默认域名
      publicUrl = `https://pub-${r2Config.accountId}.r2.dev/${hashBasedKey}`
    } else {
      // 配置不完整，抛出错误
      throw new Error('R2 配置不完整：缺少 publicUrl 或 accountId')
    }

    // 验证 URL 格式
    if (publicUrl.includes('undefined') || publicUrl.includes('null')) {
      throw new Error(`构造的 URL 无效: ${publicUrl}`)
    }

    console.log('[uploadGamePixImageToR2] 构造的公共 URL:', publicUrl)

    return {
      url: publicUrl,
      hash,
      isNewUpload: false,
      size: imageBuffer.length,
      contentType: getMimeType(ext),
    }
  }

  // 步骤 5: 上传到 R2（使用哈希值作为文件名）
  console.log('[uploadGamePixImageToR2] 上传图片到 R2...')
  const uploadResult = await uploadToR2({
    key: hashBasedKey,
    body: imageBuffer,
    contentType: getMimeType(ext),
    cacheControl: 'public, max-age=31536000, immutable', // 永久缓存（因为哈希值唯一）
    metadata: {
      originalUrl,
      hash,
      uploadedAt: new Date().toISOString(),
    },
  })

  console.log('[uploadGamePixImageToR2] ✓ 上传成功:', uploadResult.url)

  return {
    url: uploadResult.url,
    hash,
    isNewUpload: true,
    size: uploadResult.size,
    contentType: uploadResult.contentType,
  }
}

/**
 * 批量上传 GamePix 图片到 R2
 *
 * @param imageUrls GamePix 图片 URL 数组
 * @param options 配置选项
 * @returns 上传结果数组
 *
 * @example
 * ```typescript
 * const results = await batchUploadGamePixImagesToR2([
 *   'https://img.gamepix.com/games/abc/cover.jpg?w=400',
 *   'https://img.gamepix.com/games/abc/icon.png?w=200',
 * ])
 * console.log('上传完成:', results.length)
 * ```
 */
export async function batchUploadGamePixImagesToR2(
  imageUrls: string[],
  options: {
    folder?: string
    /**
     * 并发上传数量
     * @default 3
     */
    concurrency?: number
  } = {}
): Promise<ImageUploadResult[]> {
  const { concurrency = 3 } = options
  const results: ImageUploadResult[] = []

  // 分批上传（控制并发）
  for (let i = 0; i < imageUrls.length; i += concurrency) {
    const batch = imageUrls.slice(i, i + concurrency)
    const batchResults = await Promise.all(
      batch.map(url => uploadGamePixImageToR2(url, options))
    )
    results.push(...batchResults)
  }

  return results
}
