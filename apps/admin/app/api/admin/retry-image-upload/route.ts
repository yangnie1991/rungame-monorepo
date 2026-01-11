/**
 * 图片上传重试 API
 *
 * POST /api/admin/retry-image-upload
 *
 * 功能：
 * - 单独重试失败的图片上传
 * - 支持批量重试
 * - 返回详细的上传结果
 */

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'

export const dynamic = 'force-dynamic'
import { uploadGamePixImageToR2, type ImageUploadResult } from '@/lib/gamepix-image-upload'
import { z } from 'zod'

// 请求验证 Schema
const retrySchema = z.object({
  images: z.array(z.object({
    url: z.string().url('无效的图片 URL'),
    type: z.enum(['thumbnail', 'banner', 'screenshot']),
  })).min(1, '至少需要一张图片'),
})

export type RetryImageUploadRequest = z.infer<typeof retrySchema>

export interface RetryImageUploadResponse {
  success: boolean
  results: Array<{
    url: string
    type: string
    status: 'success' | 'failed'
    newUrl?: string
    isNewUpload?: boolean
    error?: string
  }>
  summary: {
    total: number
    success: number
    failed: number
  }
}

export async function POST(req: NextRequest) {
  try {
    // 验证身份
    const session = await auth()
    if (!session || !['ADMIN', 'SUPER_ADMIN'].includes((session.user as any)?.role)) {
      return NextResponse.json(
        { success: false, error: '无权限' },
        { status: 403 }
      )
    }

    // 解析和验证请求
    const body = await req.json()
    const validation = retrySchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: validation.error.issues.map(e => e.message).join(', ')
        },
        { status: 400 }
      )
    }

    const { images } = validation.data

    console.log(`[重试图片上传] 开始重试 ${images.length} 张图片`)

    const results: RetryImageUploadResponse['results'] = []
    let successCount = 0
    let failedCount = 0

    // 逐个重试（避免并发过多）
    for (const image of images) {
      try {
        const folderMap: Record<string, string> = {
          thumbnail: 'games/thumbnails',
          banner: 'games/banners',
          screenshot: 'games/screenshots',
        }
        const folder = folderMap[image.type]

        const result: ImageUploadResult = await uploadGamePixImageToR2(image.url, { folder })

        results.push({
          url: image.url,
          type: image.type,
          status: 'success',
          newUrl: result.url,
          isNewUpload: result.isNewUpload,
        })

        successCount++
        console.log(`[重试图片上传] ✓ 成功: ${image.type} ${result.isNewUpload ? '(新上传)' : '(已存在)'}`)
      } catch (error: any) {
        results.push({
          url: image.url,
          type: image.type,
          status: 'failed',
          error: error.message,
        })

        failedCount++
        console.error(`[重试图片上传] ✗ 失败: ${image.type}`, error.message)
      }
    }

    const response: RetryImageUploadResponse = {
      success: failedCount === 0,
      results,
      summary: {
        total: images.length,
        success: successCount,
        failed: failedCount,
      }
    }

    console.log(`[重试图片上传] 完成: 成功 ${successCount}, 失败 ${failedCount}`)

    return NextResponse.json(response)
  } catch (error: any) {
    console.error('[重试图片上传] 错误:', error)
    return NextResponse.json(
      {
        success: false,
        error: error.message || '重试失败',
      },
      { status: 500 }
    )
  }
}
