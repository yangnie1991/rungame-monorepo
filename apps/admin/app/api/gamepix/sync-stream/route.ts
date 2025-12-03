/**
 * GamePix 同步流式 API（SSE）
 *
 * GET /api/gamepix/sync-stream
 * Query: {
 *   siteId: string,
 *   mode: 'full' | 'incremental',
 *   orderBy: 'quality' | 'published',
 *   startPage?: number,
 *   maxPages?: number
 * }
 *
 * 返回: SSE 流
 * - 事件类型：progress（进度更新）、complete（完成）、error（错误）
 */

import { NextRequest } from 'next/server'
import { auth } from '@/lib/auth'
import { prismaCache } from '@/lib/prisma-cache'
import { fetchGamePixFeed, type GamePixGameItem } from '@/lib/gamepix-importer'

type SyncMode = 'full' | 'incremental'

// SSE 辅助函数
function createSSEMessage(data: any, event?: string): string {
  const eventPrefix = event ? `event: ${event}\n` : ''
  return `${eventPrefix}data: ${JSON.stringify(data)}\n\n`
}

export async function GET(req: NextRequest) {
  // 验证身份
  const session = await auth()
  if (!session || !['ADMIN', 'SUPER_ADMIN'].includes(session.user.role)) {
    return new Response(
      createSSEMessage({ type: 'error', error: '无权限' }),
      { status: 403, headers: { 'Content-Type': 'text/event-stream' } }
    )
  }

  // 解析参数
  const searchParams = req.nextUrl.searchParams
  const siteId = searchParams.get('siteId')
  const mode = (searchParams.get('mode') || 'incremental') as SyncMode
  const orderBy = (searchParams.get('orderBy') || 'quality') as 'quality' | 'published'
  const startPage = parseInt(searchParams.get('startPage') || '1', 10)
  const maxPages = parseInt(searchParams.get('maxPages') || '5', 10)

  // 累计值参数（用于跨批次累计统计）
  const accumulatedSynced = parseInt(searchParams.get('accumulatedSynced') || '0', 10)
  const accumulatedNew = parseInt(searchParams.get('accumulatedNew') || '0', 10)
  const accumulatedUpdated = parseInt(searchParams.get('accumulatedUpdated') || '0', 10)

  if (!siteId) {
    return new Response(
      createSSEMessage({ type: 'error', error: '缺少 siteId 参数' }),
      { status: 400, headers: { 'Content-Type': 'text/event-stream' } }
    )
  }

  console.log(`[SSE 同步] 参数: siteId=${siteId}, mode=${mode}, orderBy=${orderBy}, startPage=${startPage}, maxPages=${maxPages}`)

  // 创建 SSE 流
  const encoder = new TextEncoder()
  const stream = new ReadableStream({
    async start(controller) {
      const send = (data: any, event?: string) => {
        // 检查 controller 是否已关闭（用户取消时会关闭）
        if (controller.desiredSize === null) {
          return false // 已关闭，停止发送
        }
        try {
          controller.enqueue(encoder.encode(createSSEMessage(data, event)))
          return true
        } catch (error) {
          // 连接已关闭，忽略错误
          return false
        }
      }

      const syncStartTime = Date.now()
      // 当前批次的计数（不包含累计值）
      let batchSynced = 0
      let batchNew = 0
      let batchUpdated = 0
      let estimatedTotal = 0
      let actualTotalPages = 0

      try {
        // 步骤 1: 获取第一页数据以获取总页数
        if (!send({
          currentPage: 0,
          totalPages: maxPages,
          processedGames: accumulatedSynced,
          newGames: accumulatedNew,
          updatedGames: accumulatedUpdated,
          currentStep: '正在获取 API 信息...',
        })) {
          console.log('[SSE 同步] 客户端已断开连接')
          return
        }

        const firstPageFeed = await fetchGamePixFeed(siteId, {
          format: 'json',
          orderBy: mode === 'incremental' ? 'published' : orderBy,
          perPage: 96,
          page: 1,
        })

        // 从 last_page_url 提取总页数
        if (firstPageFeed.last_page_url) {
          const match = firstPageFeed.last_page_url.match(/[?&]page=(\d+)/)
          if (match && match[1]) {
            actualTotalPages = parseInt(match[1], 10)
          }
        }

        // 如果无法获取总页数，默认为 1
        if (actualTotalPages === 0) {
          actualTotalPages = 1
        }

        // 预估总游戏数
        estimatedTotal = actualTotalPages * 96

        console.log(`[SSE 同步] API 总页数: ${actualTotalPages}, 预估游戏数: ${estimatedTotal}`)

        // 步骤 2: 分批同步（从 startPage 开始，最多同步 maxPages 页）
        const endPage = Math.min(startPage + maxPages - 1, actualTotalPages)

        if (!send({
          currentPage: 0,
          totalPages: maxPages,
          processedGames: accumulatedSynced,
          newGames: accumulatedNew,
          updatedGames: accumulatedUpdated,
          currentStep: `准备同步 ${startPage}-${endPage} 页（共 ${actualTotalPages} 页）...`,
          estimatedTotal,
        })) {
          console.log('[SSE 同步] 客户端已断开连接')
          return
        }

        // 逐页同步
        for (let page = startPage; page <= endPage; page++) {
          if (!send({
            currentPage: page - startPage + 1,
            totalPages: maxPages,
            processedGames: accumulatedSynced + batchSynced,
            newGames: accumulatedNew + batchNew,
            updatedGames: accumulatedUpdated + batchUpdated,
            currentStep: `正在获取第 ${page}/${actualTotalPages} 页数据...`,
            estimatedTotal,
          })) {
            console.log('[SSE 同步] 客户端已断开连接，停止同步')
            return
          }

          // 获取当前页数据
          const feed = await fetchGamePixFeed(siteId, {
            format: 'json',
            orderBy: mode === 'incremental' ? 'published' : orderBy,
            perPage: 96,
            page,
          })

          const games = feed.items || []

          if (games.length === 0) {
            console.log(`[SSE 同步] 第 ${page} 页无数据，停止同步`)
            break
          }

          if (!send({
            currentPage: page - startPage + 1,
            totalPages: maxPages,
            processedGames: accumulatedSynced + batchSynced,
            newGames: accumulatedNew + batchNew,
            updatedGames: accumulatedUpdated + batchUpdated,
            currentStep: `第 ${page} 页: 正在保存 ${games.length} 个游戏...`,
            estimatedTotal,
          })) {
            console.log('[SSE 同步] 客户端已断开连接，停止同步')
            return
          }

          // 批量插入（跳过重复）
          const createResult = await prismaCache.gamePixGameCache.createMany({
            data: games.map((game: GamePixGameItem) => ({
              id: game.id,
              namespace: game.namespace,
              title: game.title,
              description: game.description,
              category: game.category,
              quality_score: game.quality_score,
              banner_image: game.banner_image,
              image: game.image,
              url: game.url,
              width: game.width,
              height: game.height,
              orientation: game.orientation,
              date_published: new Date(game.date_published),
              date_modified: new Date(game.date_modified),
            })),
            skipDuplicates: true,
          })

          const createdCount = createResult.count
          batchNew += createdCount

          // 批量更新已存在的游戏
          const existingCount = games.length - createdCount
          if (existingCount > 0) {
            const values = games.map((game: GamePixGameItem) => {
              const escapeStr = (str: string) => str.replace(/'/g, "''")
              return `(
                '${game.id}',
                '${escapeStr(game.namespace)}',
                '${escapeStr(game.title)}',
                '${escapeStr(game.description)}',
                '${game.category}',
                ${game.quality_score},
                '${game.banner_image}',
                '${game.image}',
                '${game.url}',
                ${game.width},
                ${game.height},
                '${game.orientation}',
                '${new Date(game.date_published).toISOString()}',
                '${new Date(game.date_modified).toISOString()}'
              )`
            }).join(',')

            await prismaCache.$executeRawUnsafe(`
              UPDATE "gamepix_games_cache" AS g
              SET
                "namespace" = v.namespace,
                "title" = v.title,
                "description" = v.description,
                "category" = v.category,
                "quality_score" = v.quality_score,
                "banner_image" = v.banner_image,
                "image" = v.image,
                "url" = v.url,
                "width" = v.width,
                "height" = v.height,
                "orientation" = v.orientation,
                "date_published" = v.date_published::timestamp,
                "date_modified" = v.date_modified::timestamp,
                "lastSyncAt" = NOW()
              FROM (
                VALUES ${values}
              ) AS v(
                id, namespace, title, description, category,
                quality_score, banner_image, image, url,
                width, height, orientation, date_published, date_modified
              )
              WHERE g.id = v.id
            `)

            batchUpdated += existingCount
          }

          batchSynced += games.length

          if (!send({
            currentPage: page - startPage + 1,
            totalPages: maxPages,
            processedGames: accumulatedSynced + batchSynced,
            newGames: accumulatedNew + batchNew,
            updatedGames: accumulatedUpdated + batchUpdated,
            currentStep: `第 ${page} 页完成 (${games.length} 个游戏)`,
            estimatedTotal,
          })) {
            console.log('[SSE 同步] 客户端已断开连接，停止同步')
            return
          }

          // 如果这一页的游戏数少于 96，说明到达最后一页
          if (games.length < 96) {
            console.log(`[SSE 同步] 第 ${page} 页游戏数不足 96，已到达最后一页`)
            break
          }
        }

        const syncDuration = Date.now() - syncStartTime

        // 记录同步日志（只记录当前批次）
        await prismaCache.syncLog.create({
          data: {
            totalGames: batchSynced,
            newGames: batchNew,
            updatedGames: batchUpdated,
            status: 'success',
            syncDuration,
            apiParams: { siteId, mode, orderBy, startPage, maxPages, perPage: 96 },
          },
        })

        // 计算下一批的起始页
        const nextStartPage = endPage + 1
        const hasMorePages = endPage < actualTotalPages

        // 计算总累计值（包含当前批次）
        const totalAccumulatedSynced = accumulatedSynced + batchSynced
        const totalAccumulatedNew = accumulatedNew + batchNew
        const totalAccumulatedUpdated = accumulatedUpdated + batchUpdated

        // 发送完成事件
        send({
          type: 'complete',
          data: {
            totalSynced: batchSynced, // 当前批次的数量
            newGames: batchNew,
            updatedGames: batchUpdated,
            syncDuration,
            nextStartPage,
            hasMorePages,
            actualTotalPages,
            // 添加总累计值
            accumulatedSynced: totalAccumulatedSynced,
            accumulatedNew: totalAccumulatedNew,
            accumulatedUpdated: totalAccumulatedUpdated,
          },
        })

        console.log(`[SSE 同步] 完成: 批次=${startPage}-${endPage}, 总页数=${actualTotalPages}, hasMorePages=${hasMorePages}`)
        controller.close()
      } catch (error: any) {
        // 检查是否是因为客户端断开连接导致的错误
        if (error.code === 'ERR_INVALID_STATE' || error.message?.includes('Controller is already closed')) {
          console.log('[SSE 同步] 客户端已断开连接（用户取消）')
          return
        }

        console.error('[SSE 同步] 错误:', error)

        // 记录失败日志
        try {
          await prismaCache.syncLog.create({
            data: {
              totalGames: 0,
              newGames: 0,
              updatedGames: 0,
              status: 'failed',
              errorMessage: error.message || '未知错误',
              apiParams: { siteId, mode, orderBy, startPage, maxPages, perPage: 96 },
            },
          })
        } catch (logError) {
          console.error('[SSE 同步] 记录日志失败:', logError)
        }

        // 尝试发送错误消息（如果连接还在）
        send({ type: 'error', error: error.message || '同步失败' })

        // 尝试关闭 controller（如果还没关闭）
        try {
          if (controller.desiredSize !== null) {
            controller.close()
          }
        } catch (closeError) {
          // 忽略关闭错误
        }
      }
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
      'X-Accel-Buffering': 'no', // 禁用 Nginx 缓冲
    },
  })
}
