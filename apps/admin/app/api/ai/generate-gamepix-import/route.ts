import { NextRequest } from 'next/server'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { generateGamePixImportContent, type GamePixImportInput } from '@/lib/ai-seo-optimizer'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 60 // GamePix 导入生成可能需要更长时间

// 🎯 创建 Server-Sent Events 编码器
class SSEEncoder {
  private encoder = new TextEncoder()

  encode(data: any): Uint8Array {
    return this.encoder.encode(`data: ${JSON.stringify(data)}\n\n`)
  }
}

/**
 * GamePix 导入专用的 AI 内容生成 API
 *
 * POST /api/ai/generate-gamepix-import
 */
export async function POST(request: NextRequest) {
  try {
    // 验证身份
    const session = await auth.api.getSession({
      headers: await headers()
    })
    if (!session?.user) {
      return new Response(
        JSON.stringify({ error: '未授权' }),
        {
          status: 401,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }

    const body = await request.json()
    const {
      gameTitle,
      mainKeyword,
      subKeywords,
      originalDescription,
      markdownContent,
      locale,
      mode = 'fast',
      aiConfigId,  // AI 配置 ID（可选，不提供则使用默认激活配置）
      modelId      // 模型 ID（可选，不提供则使用配置中的默认模型）
    } = body

    // 参数验证
    if (!gameTitle || typeof gameTitle !== 'string') {
      return new Response(
        JSON.stringify({ error: '缺少必需参数: gameTitle' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }

    if (!mainKeyword || typeof mainKeyword !== 'string') {
      return new Response(
        JSON.stringify({ error: '缺少必需参数: mainKeyword（主关键词）' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }

    if (!subKeywords || !Array.isArray(subKeywords)) {
      return new Response(
        JSON.stringify({ error: '缺少必需参数: subKeywords（副关键词数组）' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }

    if (!locale || typeof locale !== 'string') {
      return new Response(
        JSON.stringify({ error: '缺少必需参数: locale' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }

    if (!['fast', 'quality'].includes(mode)) {
      return new Response(
        JSON.stringify({ error: 'mode 必须是 "fast" 或 "quality"' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }

    console.log('[GamePix Import] 开始生成内容...')
    console.log(`  - 游戏: ${gameTitle}`)
    console.log(`  - 主关键词: ${mainKeyword}`)
    console.log(`  - 副关键词: ${subKeywords.join(', ')}`)
    console.log(`  - 模式: ${mode}`)
    console.log(`  - AI 配置 ID: ${aiConfigId || '使用默认'}`)
    console.log(`  - 模型 ID: ${modelId || '使用默认'}`)
    console.log(`  - Markdown 长度: ${markdownContent?.length || 0} 字符`)

    // 构建输入
    const input: GamePixImportInput = {
      gameTitle,
      mainKeyword,
      subKeywords,
      originalDescription: originalDescription || '',
      markdownContent: markdownContent || '',
      locale,
      mode,
      aiConfigId,  // 传递 AI 配置 ID
      modelId      // 传递模型 ID
    }

    // 🎯 使用流式响应实时推送进度
    const encoder = new SSEEncoder()
    let currentStep = 0
    let totalSteps = mode === 'fast' ? 2 : 5

    const stream = new ReadableStream({
      async start(controller) {
        try {
          // 发送开始事件
          controller.enqueue(encoder.encode({
            event: 'start',
            totalSteps,
            mode,
            gameTitle
          }))

          // 进度回调
          const onProgress = (step: number, total: number, message: string) => {
            currentStep = step
            totalSteps = total
            console.log(`[GamePix Import] ${message}`)

            // 推送进度更新
            controller.enqueue(encoder.encode({
              step,
              total,
              message,
              percentage: Math.round((step / total) * 100)
            }))
          }

          // 警告回调 - 发送警告事件并等待用户确认
          const onWarning = async (
            type: 'google_search' | 'jina_reader' | 'no_data',
            message: string
          ): Promise<boolean> => {
            console.log(`[GamePix Import] ⚠️  警告: ${type} - ${message}`)

            // 发送警告事件到前端
            controller.enqueue(encoder.encode({
              type,
              message,
              timestamp: new Date().toISOString()
            }))

            // 创建一个 Promise，用于等待用户确认
            return new Promise<boolean>((resolve) => {
              // 设置一个检查间隔，检测连接是否被关闭
              let checkCount = 0
              const maxChecks = 600 // 最多等待 60 秒（100ms * 600）

              const checkInterval = setInterval(() => {
                checkCount++

                // 如果连接已关闭（用户取消）
                if (controller.desiredSize === null || checkCount >= maxChecks) {
                  clearInterval(checkInterval)
                  resolve(false) // 返回 false 表示取消
                  return
                }

                // 超过 60 秒，自动继续
                if (checkCount >= maxChecks) {
                  clearInterval(checkInterval)
                  console.log('[GamePix Import] 等待超时，自动继续')
                  resolve(true)
                }
              }, 100)

              // 如果用户选择继续（不关闭连接），5秒后自动继续
              // 这里我们假设用户在前端点击"继续"后不会关闭连接
              // 前端需要在点击"继续"后发送一个信号
              // 但由于 SSE 是单向的，我们改为：
              // - 用户点击"取消" -> 关闭连接
              // - 用户点击"继续" -> 不关闭连接，等待几秒后自动继续
              setTimeout(() => {
                clearInterval(checkInterval)
                resolve(true) // 默认 5 秒后继续
              }, 5000)
            })
          }

          // 调用生成函数
          const result = await generateGamePixImportContent(input, onProgress, onWarning)

          console.log('[GamePix Import] ✅ 生成完成')
          console.log(`  - 生成字段: 9 个`)
          console.log(`  - description 长度: ${result.description.length} 字符`)
          console.log(`  - keywords: ${result.keywords}`)

          // 发送完成事件，包含完整数据
          controller.enqueue(encoder.encode({
            success: true,
            data: result,
            stepsCompleted: currentStep,
            totalSteps,
            mode
          }))

          controller.close()
        } catch (error: any) {
          console.error('[GamePix Import] 生成失败:', error)

          // 发送错误事件
          controller.enqueue(encoder.encode({
            success: false,
            error: error.message || '生成失败'
          }))

          controller.close()
        }
      }
    })

    // 返回流式响应
    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      }
    })

  } catch (error: any) {
    console.error('[GamePix Import] 生成失败:', error)

    // 区分不同类型的错误
    if (error.message?.includes('AI 配置未设置')) {
      return new Response(
        JSON.stringify({
          error: 'AI 配置未设置',
          message: '请先在管理后台 -> AI 配置中添加 AI 服务配置'
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }

    if (error.message?.includes('API 错误') || error.message?.includes('请求失败')) {
      return new Response(
        JSON.stringify({
          error: 'AI 服务请求失败',
          message: error.message || 'AI API 调用失败，请检查配置或稍后重试'
        }),
        {
          status: 502,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }

    return new Response(
      JSON.stringify({
        error: '内部服务器错误',
        message: error.message || '生成失败，请重试'
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }
}
