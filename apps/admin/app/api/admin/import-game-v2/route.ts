/**
 * 游戏导入 API v2（重构版）
 *
 * POST /api/admin/import-game-v2
 *
 * 导入流程（6步）：
 * 步骤 1 (0-10%):    预检查冲突（slug, sourcePlatformId）
 * 步骤 2 (10-25%):   验证资源（分类+标签）
 *   子步骤 2.1 (10-17%): 验证分类
 *   子步骤 2.2 (17-25%): 验证标签
 * 步骤 3 (25-60%):   上传图片到 R2（支持部分失败、去重、跳过）
 * 步骤 4 (60-85%):   创建/更新游戏记录
 * 步骤 5 (85-95%):   关联标签
 * 步骤 6 (95-100%):  更新缓存和标记
 *
 * 特性：
 * 1. 预检查游戏冲突（slug, sourcePlatformId）
 * 2. 标签验证（不存在的标签会被跳过并警告）
 * 3. 图片上传支持部分失败（去重、跳过、失败）
 * 4. 详细的 SSE 进度反馈
 * 5. 单步可恢复的错误处理
 * 6. 更友好的用户体验
 *
 * SSE 事件类型：
 * - progress: 进度更新
 * - image_upload: 单张图片上传结果
 * - warning: 警告信息（不影响流程）
 * - error: 错误信息
 * - conflict: 冲突检测（需要用户决策）
 * - success: 导入成功
 * - step_completed: 步骤完成（包含上下文数据，用于恢复）
 */

import { NextRequest } from 'next/server'
import { auth } from '@/lib/auth'
import { uploadGamePixImageToR2, type ImageUploadResult } from '@/lib/gamepix-image-upload'
import { prisma, CACHE_TAGS } from '@rungame/database'
import { revalidateTag } from 'next/cache'
import { z } from 'zod'

// ==================== 类型定义 ====================

/**
 * SSE 事件类型
 */
type SSEEvent =
  | { type: 'progress'; step: number; total: number; percentage: number; message: string }
  | { type: 'image_upload'; image: string; status: 'success' | 'skipped' | 'failed'; url?: string; reason?: string; isNewUpload?: boolean }
  | { type: 'warning'; message: string }
  | { type: 'error'; message: string; recoverable: boolean; step?: string; stepIndex?: number; context?: StepContext }
  | { type: 'conflict'; conflictType: 'game_exists' | 'duplicate_source'; data: any }
  | { type: 'success'; gameId: string; warnings?: string[]; context?: StepContext }
  | { type: 'step_completed'; stepIndex: number; context: StepContext }

/**
 * 导入配置
 */
interface ImportConfig {
  // 基础信息
  slug: string
  categoryId: string
  status: string
  isFeatured: boolean

  // 英文内容
  title?: string
  description?: string
  keywords?: string
  metaTitle?: string
  metaDescription?: string

  // 图片
  thumbnail?: string
  banner?: string
  screenshots?: string[]

  // 游戏设置
  width?: number
  height?: number
  gameUrl?: string
  videos?: string[]

  // 翻译
  translations?: Array<{
    locale: string
    title?: string
    description?: string
    keywords?: string
    metaTitle?: string
    metaDescription?: string
    contentSections?: any
  }>

  // 内容块
  contentSections?: any

  // 标签
  tagIds?: string[]

  // 冲突处理策略
  conflictStrategy?: 'update' | 'skip' | 'create_new'
}

/**
 * 步骤执行上下文(用于恢复执行)
 */
interface StepContext {
  // 步骤1的输出
  existingBySlug?: { id: string; title: string; slug: string; status: string }

  // 步骤2的输出
  mainCategoryId?: string
  categoryName?: string
  validatedTagIds?: string[]

  // 步骤3的输出
  uploadedImages?: Record<string, string>
  uploadedCount?: number
  skippedCount?: number
  failedCount?: number

  // 步骤4的输出
  gameId?: string

  // 累积的警告
  warnings?: string[]
}

/**
 * GamePix 游戏数据
 */
interface GamePixGameItem {
  id: string
  namespace: string
  title: string
  description: string
  url: string
  image: string
  banner_image?: string
  category: string
  width: number
  height: number
  orientation: string
  quality_score: number
  date_published?: string
  date_modified?: string
}

// ==================== 辅助函数 ====================

function createSSEMessage(data: SSEEvent): string {
  return `data: ${JSON.stringify(data)}\n\n`
}

function calculateAspectRatio(width: number, height: number): string {
  if (!width || !height) return '16:9'
  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b))
  const divisor = gcd(width, height)
  return `${width / divisor}:${height / divisor}`
}

// ==================== 主要逻辑 ====================

export async function POST(req: NextRequest) {
  // 验证身份
  const session = await auth()
  if (!session?.user || !['ADMIN', 'SUPER_ADMIN'].includes((session.user as any).role)) {
    return new Response(
      createSSEMessage({ type: 'error', message: '无权限', recoverable: false }),
      { status: 403, headers: { 'Content-Type': 'text/event-stream' } }
    )
  }

  // 创建 SSE 流
  const encoder = new TextEncoder()
  const stream = new ReadableStream({
    async start(controller) {
      const send = (data: SSEEvent) => {
        controller.enqueue(encoder.encode(createSSEMessage(data)))
      }

      try {
        // 解析请求
        const body = await req.json()
        const {
          game,
          config,
          startFromStep = 1, // 从哪个步骤开始执行(默认从步骤1开始)
          context = {} // 之前步骤的执行上下文
        }: {
          game: GamePixGameItem
          config: ImportConfig
          startFromStep?: number
          context?: StepContext
        } = body

        if (!game || !config) {
          send({ type: 'error', message: '缺少必要参数', recoverable: false })
          controller.close()
          return
        }

        console.log(`[导入游戏 v2] 开始: ${game.title}${startFromStep > 1 ? ` (从步骤${startFromStep}恢复)` : ''}`)

        const warnings: string[] = context.warnings || []
        const totalSteps = 6

        // ========== 步骤 1: 预检查游戏冲突 ==========
        let existingBySlug = context.existingBySlug

        if (startFromStep <= 1) {
          send({ type: 'progress', step: 1, total: totalSteps, percentage: 0, message: '检查游戏是否已存在...' })

          // 检查 slug 冲突
          existingBySlug = await prisma.game.findUnique({
            where: { slug: config.slug },
            select: { id: true, title: true, slug: true, status: true }
          }) || undefined

          if (existingBySlug) {
            // 如果设置了冲突策略为 update，则更新游戏
            if (config.conflictStrategy === 'update') {
              send({ type: 'warning', message: `游戏已存在，将更新: ${existingBySlug.title}` })
              warnings.push(`更新了已存在的游戏: ${existingBySlug.slug}`)
            } else if (config.conflictStrategy === 'skip') {
              send({ type: 'error', message: '游戏已存在，已跳过导入', recoverable: true, step: 'conflict_check' })
              controller.close()
              return
            } else {
              // 返回冲突信息，让前端用户选择
              send({
                type: 'conflict',
                conflictType: 'game_exists',
                data: existingBySlug
              })
              controller.close()
              return
            }
          }

          // 检查来源平台 ID 冲突
          const existingBySource = await prisma.game.findFirst({
            where: {
              sourcePlatform: 'gamepix',
              sourcePlatformId: game.id,
            },
            select: { id: true, title: true, slug: true }
          })

          if (existingBySource && config.conflictStrategy !== 'update') {
            send({
              type: 'conflict',
              conflictType: 'duplicate_source',
              data: existingBySource
            })
            controller.close()
            return
          }

          send({ type: 'progress', step: 1, total: totalSteps, percentage: 10, message: '预检查完成' })

          // 发送步骤1的上下文数据
          send({
            type: 'step_completed',
            stepIndex: 0,
            context: { existingBySlug, warnings }
          })
        } else {
          send({ type: 'progress', step: 1, total: totalSteps, percentage: 10, message: '跳过步骤(使用缓存)' })
        }

        // ========== 步骤 2: 验证资源（分类+标签） ==========
        let mainCategoryId = context.mainCategoryId
        let categoryName = context.categoryName
        let validatedTagIds = context.validatedTagIds

        if (startFromStep <= 2) {
          // 子步骤 2.1: 验证分类 (10% → 17%)
          send({ type: 'progress', step: 2, total: totalSteps, percentage: 10, message: '验证分类信息...' })

          const category = await prisma.category.findUnique({
            where: { id: config.categoryId },
            select: { id: true, name: true, parentId: true, isEnabled: true }
          })

          if (!category) {
            send({ type: 'error', message: '分类不存在', recoverable: false, step: 'category_check' })
            controller.close()
            return
          }

          if (!category.isEnabled) {
            send({ type: 'warning', message: `分类已禁用: ${category.name}，但仍会继续导入` })
            warnings.push(`使用了已禁用的分类: ${category.name}`)
          }

          mainCategoryId = category.parentId || category.id
          categoryName = category.name

          send({ type: 'progress', step: 2, total: totalSteps, percentage: 17, message: '分类验证完成' })

          // 子步骤 2.2: 验证标签 (17% → 25%)
          send({ type: 'progress', step: 2, total: totalSteps, percentage: 17, message: '验证标签信息...' })

          validatedTagIds = []

          if (config.tagIds && config.tagIds.length > 0) {
            // 去重
            const uniqueTagIds = [...new Set(config.tagIds)]

            // 查询数据库，检查所有 tagIds 是否存在
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
            console.log(`[导入游戏 v2] ✓ 标签验证完成: ${validatedTagIds?.length}/${uniqueTagIds.length}`)
          } else {
            console.log(`[导入游戏 v2] 未指定标签，跳过标签验证`)
          }

          send({ type: 'progress', step: 2, total: totalSteps, percentage: 25, message: '资源验证完成' })

          // 发送步骤2的上下文数据
          send({
            type: 'step_completed',
            stepIndex: 1,
            context: { existingBySlug, mainCategoryId, categoryName, validatedTagIds, warnings }
          })
        } else {
          send({ type: 'progress', step: 2, total: totalSteps, percentage: 25, message: '跳过步骤(使用缓存)' })
        }

        // ========== 步骤 3: 上传图片到 R2 ==========
        let uploadedImages: Record<string, string> = context.uploadedImages || {}
        let uploadedCount = context.uploadedCount || 0
        let skippedCount = context.skippedCount || 0
        let failedCount = context.failedCount || 0

        if (startFromStep <= 3) {
          send({ type: 'progress', step: 3, total: totalSteps, percentage: 25, message: '开始上传图片...' })

          // 收集需要上传的图片
          const imagesToUpload: Array<{ url: string; type: 'thumbnail' | 'banner' | 'screenshot' }> = []

          if (config.thumbnail && !config.thumbnail.includes('r2.dev') && !config.thumbnail.includes('cloudflare')) {
            imagesToUpload.push({ url: config.thumbnail, type: 'thumbnail' })
          }
          if (config.banner && !config.banner.includes('r2.dev') && !config.banner.includes('cloudflare')) {
            imagesToUpload.push({ url: config.banner, type: 'banner' })
          }
          if (config.screenshots && Array.isArray(config.screenshots)) {
            config.screenshots.forEach((url: string) => {
              if (!url.includes('r2.dev') && !url.includes('cloudflare')) {
                imagesToUpload.push({ url, type: 'screenshot' })
              }
            })
          }

          console.log(`[导入游戏 v2] 需要处理 ${imagesToUpload.length} 张图片`)

          // 上传图片（支持部分失败）
          uploadedImages = {}
          uploadedCount = 0
          skippedCount = 0
          failedCount = 0

          for (let i = 0; i < imagesToUpload.length; i++) {
            const image = imagesToUpload[i]!
            const progress = 25 + Math.round((i / imagesToUpload.length) * 35)

            send({
              type: 'progress',
              step: 3,
              total: totalSteps,
              percentage: progress,
              message: `上传图片 ${i + 1}/${imagesToUpload.length}: ${image.type}`
            })

            try {
              const folderMap: Record<string, string> = {
                thumbnail: 'games/thumbnails',
                banner: 'games/banners',
                screenshot: 'games/screenshots',
              }
              const folder = folderMap[image.type]

              const result: ImageUploadResult = await uploadGamePixImageToR2(image.url, { folder })

              console.log(`[导入游戏 v2] uploadGamePixImageToR2 返回结果:`, {
                url: result.url,
                hash: result.hash,
                isNewUpload: result.isNewUpload,
                size: result.size,
                contentType: result.contentType
              })

              uploadedImages[image.url] = result.url

              if (result.isNewUpload) {
                uploadedCount++
                const sseEvent = {
                  type: 'image_upload' as const,
                  image: image.type,
                  status: 'success' as const,
                  url: result.url,
                  isNewUpload: true
                }
                console.log(`[导入游戏 v2] 发送 SSE (新上传):`, sseEvent)
                send(sseEvent)
              } else {
                skippedCount++
                const sseEvent = {
                  type: 'image_upload' as const,
                  image: image.type,
                  status: 'skipped' as const,
                  url: result.url,
                  reason: '图片已存在，直接使用',
                  isNewUpload: false
                }
                console.log(`[导入游戏 v2] 发送 SSE (已存在):`, sseEvent)
                send(sseEvent)
              }

              console.log(`[导入游戏 v2] ✓ 图片处理成功: ${image.type} ${result.isNewUpload ? '(新上传)' : '(已存在)'}`)
            } catch (error: any) {
              failedCount++
              const errorMessage = error.message || '未知错误'

              send({
                type: 'image_upload',
                image: image.type,
                status: 'failed',
                reason: errorMessage
              })

              console.error(`[导入游戏 v2] ✗ 图片上传失败: ${image.type}`, errorMessage)

              // 对于关键图片（thumbnail）失败，终止导入流程
              if (image.type === 'thumbnail') {
                send({
                  type: 'error',
                  message: `缩略图上传失败: ${errorMessage}`,
                  recoverable: true,
                  step: 'image_upload',
                  stepIndex: 2,
                  context: {
                    existingBySlug,
                    mainCategoryId,
                    categoryName,
                    uploadedImages,
                    uploadedCount,
                    skippedCount,
                    failedCount,
                    warnings: [...warnings, `关键图片（缩略图）上传失败: ${errorMessage}`]
                  }
                })
                console.error(`[导入游戏 v2] ✗✗✗ 缩略图上传失败，终止导入流程`)
                controller.close()
                return
              }

              // 对于非关键图片（banner, screenshots）失败，使用原始 URL 并继续
              uploadedImages[image.url] = image.url
              warnings.push(`图片上传失败 (${image.type}): ${errorMessage}，使用原始 URL`)
            }
          }

          send({
            type: 'progress',
            step: 3,
            total: totalSteps,
            percentage: 60,
            message: `图片处理完成！(上传: ${uploadedCount}, 跳过: ${skippedCount}, 失败: ${failedCount})`
          })

          if (failedCount > 0) {
            send({ type: 'warning', message: `${failedCount} 张图片上传失败，已使用原始 URL` })
          }

          // 发送步骤3的上下文数据
          send({
            type: 'step_completed',
            stepIndex: 2,
            context: {
              existingBySlug,
              mainCategoryId,
              categoryName,
              validatedTagIds,
              uploadedImages,
              uploadedCount,
              skippedCount,
              failedCount,
              warnings
            }
          })
        } else {
          send({ type: 'progress', step: 3, total: totalSteps, percentage: 60, message: '跳过步骤(使用缓存)' })
        }

        // 更新配置中的图片 URL
        const finalThumbnail = (config.thumbnail && uploadedImages[config.thumbnail]) || config.thumbnail || game.banner_image || game.image
        const finalBanner = (config.banner && uploadedImages[config.banner]) || config.banner || game.banner_image
        const finalScreenshots = (config.screenshots || []).map((url: string) => uploadedImages[url] || url)

        // ========== 步骤 4: 创建/更新游戏记录（不含标签） ==========
        let createdGame: any

        if (startFromStep <= 4) {
          send({ type: 'progress', step: 4, total: totalSteps, percentage: 60, message: '创建/更新游戏记录...' })

          const gameData = {
            slug: config.slug,
            title: config.title || game.title,
            description: config.description || game.description,
            keywords: config.keywords || `${game.title}, ${game.category}, online game, free game, html5 game`,
            metaTitle: config.metaTitle || `${game.title} - Play Free Online`,
            metaDescription: config.metaDescription || game.description.substring(0, 160),
            thumbnail: finalThumbnail,
            banner: finalBanner,
            embedUrl: game.url,
            gameUrl: config.gameUrl || game.url,
            screenshots: finalScreenshots,
            videos: config.videos || [],
            dimensions: {
              width: config.width || game.width,
              height: config.height || game.height,
              aspectRatio: calculateAspectRatio(config.width || game.width, config.height || game.height),
              orientation: game.orientation,
            },
            sourcePlatform: 'gamepix',
            sourcePlatformId: game.id,
            qualityScore: game.quality_score * 10,
            status: config.status as any,
            isFeatured: config.isFeatured,
            playCount: 0,
            viewCount: 0,
            releaseDate: game.date_published ? new Date(game.date_published) : undefined,
            sourceUpdatedAt: game.date_modified ? new Date(game.date_modified) : undefined,
            importedAt: new Date(),
            gameInfo: config.contentSections || undefined,
          }

          if (existingBySlug && config.conflictStrategy === 'update') {
            // 更新现有游戏（不含标签，标签在步骤5中处理）
            createdGame = await prisma.game.update({
              where: { id: existingBySlug.id },
              data: {
                ...gameData,
                // 更新翻译
                translations: config.translations && config.translations.length > 0
                  ? {
                    deleteMany: {},
                    create: config.translations.map((t: any) => ({
                      locale: t.locale,
                      title: t.title || game.title,
                      description: t.description || game.description,
                      keywords: t.keywords || `${game.title}, ${game.category}`,
                      metaTitle: t.metaTitle || `${game.title}`,
                      metaDescription: t.metaDescription || game.description.substring(0, 160),
                      translationInfo: t.contentSections || undefined,
                    })),
                  }
                  : undefined,
              }
            })

            send({ type: 'progress', step: 4, total: totalSteps, percentage: 75, message: '游戏记录更新成功' })
            console.log(`[导入游戏 v2] ✓ 游戏更新成功: ${createdGame.id}`)
          } else {
            // 创建新游戏（不含标签，标签在步骤5中处理）
            createdGame = await prisma.game.create({
              data: {
                ...gameData,
                gameCategories: {
                  create: {
                    categoryId: config.categoryId,
                    mainCategoryId: mainCategoryId!,
                    isPrimary: true,
                    sortOrder: 0,
                  },
                },
                translations: config.translations && config.translations.length > 0
                  ? {
                    create: config.translations.map((t: any) => ({
                      locale: t.locale,
                      title: t.title || game.title,
                      description: t.description || game.description,
                      keywords: t.keywords || `${game.title}, ${game.category}`,
                      metaTitle: t.metaTitle || `${game.title}`,
                      metaDescription: t.metaDescription || game.description.substring(0, 160),
                      translationInfo: t.contentSections || undefined,
                    })),
                  }
                  : undefined,
              }
            })

            send({ type: 'progress', step: 4, total: totalSteps, percentage: 75, message: '游戏记录创建成功' })
            console.log(`[导入游戏 v2] ✓ 游戏创建成功: ${createdGame.id}`)
          }

          send({ type: 'progress', step: 4, total: totalSteps, percentage: 85, message: '游戏记录处理完成' })

          // 发送步骤4的上下文数据
          send({
            type: 'step_completed',
            stepIndex: 3,
            context: {
              existingBySlug,
              mainCategoryId,
              categoryName,
              validatedTagIds,
              uploadedImages,
              uploadedCount,
              skippedCount,
              failedCount,
              gameId: createdGame.id,
              warnings
            }
          })
        } else {
          // 跳过步骤4,使用context中的gameId
          if (!context.gameId) {
            send({ type: 'error', message: '缺少游戏ID上下文，无法跳过步骤4', recoverable: false })
            controller.close()
            return
          }
          createdGame = { id: context.gameId }
          send({ type: 'progress', step: 4, total: totalSteps, percentage: 85, message: '跳过步骤(使用缓存)' })
        }

        // ========== 步骤 5: 关联标签 ==========
        if (startFromStep <= 5) {
          send({ type: 'progress', step: 5, total: totalSteps, percentage: 85, message: '开始关联标签...' })

          if (validatedTagIds && validatedTagIds.length > 0) {
            try {
              // 先删除现有标签关联
              await prisma.gameTag.deleteMany({
                where: { gameId: createdGame.id }
              })

              // 创建新的标签关联
              await prisma.gameTag.createMany({
                data: validatedTagIds.map((tagId: string) => ({
                  gameId: createdGame.id,
                  tagId
                }))
              })

              send({ type: 'progress', step: 5, total: totalSteps, percentage: 95, message: `成功关联 ${validatedTagIds.length} 个标签` })
              console.log(`[导入游戏 v2] ✓ 标签关联完成: ${validatedTagIds.length} 个`)
            } catch (error: any) {
              console.error('[导入游戏 v2] 标签关联失败:', error)
              warnings.push(`标签关联失败: ${error.message}`)
              send({ type: 'warning', message: `标签关联失败: ${error.message}，但游戏已创建` })
              send({ type: 'progress', step: 5, total: totalSteps, percentage: 95, message: '标签关联失败，继续下一步' })
            }
          } else {
            send({ type: 'progress', step: 5, total: totalSteps, percentage: 95, message: '无需关联标签' })
            console.log(`[导入游戏 v2] 未指定标签，跳过关联`)
          }

          // 发送步骤5的上下文数据
          send({
            type: 'step_completed',
            stepIndex: 4,
            context: {
              existingBySlug,
              mainCategoryId,
              categoryName,
              validatedTagIds,
              uploadedImages,
              uploadedCount,
              skippedCount,
              failedCount,
              gameId: createdGame.id,
              warnings
            }
          })
        } else {
          send({ type: 'progress', step: 5, total: totalSteps, percentage: 95, message: '跳过步骤(使用缓存)' })
        }

        // ========== 步骤 6: 更新缓存和标记 ==========
        if (startFromStep <= 6) {
          send({ type: 'progress', step: 6, total: totalSteps, percentage: 95, message: '更新缓存标记...' })

          try {
            const { markGameAsImported } = await import('@/app/admin/import-games/cache-actions')
            await markGameAsImported(game.id)
          } catch (error: any) {
            console.error('[导入游戏 v2] 更新缓存标记失败:', error)
            warnings.push('缓存标记更新失败，但不影响游戏导入')
          }

          send({ type: 'progress', step: 6, total: totalSteps, percentage: 97, message: '失效相关缓存...' })

          // revalidateTag(CACHE_TAGS.CATEGORIES)
          // revalidateTag(CACHE_TAGS.TAGS)
          // revalidateTag(CACHE_TAGS.GAMES)
          // revalidateTag(CACHE_TAGS.FEATURED_GAMES)
          // revalidateTag(CACHE_TAGS.DASHBOARD_STATS)
        } else {
          send({ type: 'progress', step: 6, total: totalSteps, percentage: 100, message: '跳过步骤(使用缓存)' })
        }

        // ========== 完成 ==========
        send({ type: 'progress', step: 6, total: totalSteps, percentage: 100, message: '导入完成！' })
        send({
          type: 'success',
          gameId: createdGame.id,
          warnings: warnings.length > 0 ? warnings : undefined
        })

        console.log(`[导入游戏 v2] ✅ 完成: ${game.title}`)
        controller.close()
      } catch (error: any) {
        console.error('[导入游戏 v2] 意外错误:', error)
        send({ type: 'error', message: error.message || '导入失败', recoverable: false })
        controller.close()
      }
    }
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  })
}
