import { NextRequest } from 'next/server'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { searchGoogleTopPages } from '@/lib/google-search'
import { readWebPageWithRetry } from '@/lib/jina-reader'
import { filterGameWebsites } from '@/lib/ai-seo-optimizer'
import {
  getGameContentSystemPrompt,
  getGameContentUserPrompt,
  getGameContentAnalysisPrompt,
  formatCompetitorContent,
  getContentStrategy,
  formatStrategyForPrompt,
  type GameContentPromptVariables
} from '@/lib/ai-prompt-templates'
import { getAllAiConfigs } from '@/lib/ai-config'
import { decrypt } from '@/lib/crypto'
import { parseAIJsonResponse } from '@/lib/ai-json-parser'
import { parseAIJsonWithHistory } from '@/lib/ai-json-parser-enhanced'
import {
  saveCheckpoint,
  loadCheckpoint,
  updateTaskStatus,
  createAITask
} from '@/lib/ai-checkpoint'
import { prismaAdmin } from '@rungame/database-admin'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 60 // Pro 计划有效，Hobby 计划忽略（但保留配置）

/**
 * ⚠️ Vercel SSE 超时说明：
 * - Hobby 计划：普通请求 10s，SSE 无固定限制（只要持续发送数据）
 * - Pro/Enterprise：最长 300s (5分钟)
 *
 * 关键：SSE 必须持续发送数据保持连接活跃
 * 本端点预计执行时间：50-60s（搜索3s + 解析40s + 生成15s）
 */

/**
 * 统一的游戏内容生成 SSE 端点
 *
 * GET /api/ai/generate-game-content-stream?params
 *
 * 适用于：
 * 1. GamePix 导入页面（有 markdownContent）
 * 2. 新建游戏页面（无 markdownContent）
 * 3. 编辑游戏页面（可能有 markdownContent）
 */
export async function GET(request: NextRequest) {
  try {
    // 1. 验证身份
    const session = await auth.api.getSession({
      headers: await headers()
    })
    if (!session || ((session.user as any)?.role !== 'ADMIN' && (session.user as any)?.role !== 'SUPER_ADMIN')) {
      return new Response('Unauthorized', { status: 401 })
    }

    // 2. 获取参数
    const searchParams = request.nextUrl.searchParams
    const gameTitle = searchParams.get('gameTitle')
    const locale = searchParams.get('locale')
    const keywords = searchParams.get('keywords')
    const subKeywordsStr = searchParams.get('subKeywords')
    const configId = searchParams.get('configId')
    const modelId = searchParams.get('modelId')
    const mode = (searchParams.get('mode') as 'fast' | 'quality') || 'fast'

    // 恢复参数（可选）
    const resumeTaskId = searchParams.get('resumeTaskId') // 如果提供，从失败任务恢复

    // 可选参数
    const originalDescription = searchParams.get('originalDescription')
    const markdownContent = searchParams.get('markdownContent')  // 🎯 可选

    // 3. 参数验证
    if (!gameTitle || !locale || !keywords || !configId || !modelId) {
      return new Response('Missing required parameters', { status: 400 })
    }

    const subKeywords = subKeywordsStr ? JSON.parse(subKeywordsStr) : []

    // 4. 创建或恢复任务
    let taskId = resumeTaskId || crypto.randomUUID()

    if (!resumeTaskId) {
      // 新任务：创建记录
      await createAITask({
        taskType: 'game_content_generation',
        inputData: {
          gameTitle,
          locale,
          keywords,
          subKeywords,
          configId,
          modelId,
          mode,
          originalDescription,
          markdownContent
        }
      })
    } else {
      // 恢复任务：更新状态
      await updateTaskStatus(resumeTaskId, {
        status: 'PROCESSING',
        progress: 0,
        errorMessage: undefined,
        errorDetails: undefined
      })
    }

    // 4. 创建 SSE 流
    const encoder = new TextEncoder()
    const stream = new ReadableStream({
      async start(controller) {
        const startTime = Date.now()
        let statistics = {
          urlsProcessed: 0,
          urlsSucceeded: 0,
          urlsFailed: 0,
          retries: 0
        }

        const sendProgress = (data: any) => {
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ type: 'progress', data })}\n\n`)
          )
        }

        const sendComplete = (data: any) => {
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ type: 'complete', data })}\n\n`)
          )
        }

        const sendError = (error: string) => {
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ type: 'error', error })}\n\n`)
          )
        }

        try {
          // ========== 阶段 1: Google 搜索 (1-3s) ==========

          // 检查是否可以从搜索阶段恢复
          const searchingCheckpoint = await loadCheckpoint(taskId, 'searching')
          let searchResults: any[] = []
          let snippets: string[] = []

          if (searchingCheckpoint) {
            // 从检查点恢复
            searchResults = searchingCheckpoint.searchResults
            snippets = searchResults.map((r: any) => r.snippet || '')

            sendProgress({
              phase: 'searching',
              step: `✓ 从检查点恢复: ${searchResults.length} 个搜索结果`,
              progress: 10,
              resumed: true
            })

            console.log('[检查点恢复] searching - 已恢复 Google 搜索结果')
          } else {
            // 执行搜索
            sendProgress({
              phase: 'searching',
              step: '正在搜索 Google Top 10 页面...',
              progress: 0
            })

            try {
              searchResults = await searchGoogleTopPages(keywords, 10, locale)
              snippets = searchResults.map(r => r.snippet || '')

              // 保存检查点
              await saveCheckpoint(taskId, {
                phase: 'searching',
                progress: 10,
                data: { searchResults }
              })

              sendProgress({
                phase: 'searching',
                step: `✓ 找到 ${searchResults.length} 个竞品页面`,
                progress: 10,
                current: searchResults.length,
                total: 10
              })
            } catch (error: any) {
              console.error('[Google 搜索] 失败:', error)

              // 保存错误信息到任务
              await updateTaskStatus(taskId, {
                status: 'FAILED',
                progress: 10,
                currentStep: 'searching',
                errorMessage: 'Google 搜索失败',
                errorDetails: { message: error.message, stack: error.stack }
              })

              sendProgress({
                phase: 'searching',
                step: '⚠️ 搜索失败，将使用基础模式生成',
                progress: 10
              })
            }
          }

          // ========== 阶段 2: 顺序解析 URLs + 重试 (20-40s) ==========

          const urls = searchResults.map(r => r.url)

          const parsingCheckpoint = await loadCheckpoint(taskId, 'parsing')
          let webContents: string[] = []
          let startParsingIndex = 0

          if (parsingCheckpoint) {
            // 从检查点恢复
            webContents = parsingCheckpoint.webContents
            statistics = parsingCheckpoint.statistics || statistics
            startParsingIndex = webContents.length

            sendProgress({
              phase: 'parsing',
              step: `✓ 从检查点恢复: ${webContents.length} 个网页已解析`,
              progress: 50,
              resumed: true
            })

            console.log(`[检查点恢复] parsing - 已恢复 ${webContents.length}/${urls.length} 个网页解析结果`)
          }

          // 继续解析未完成的 URL
          for (let i = startParsingIndex; i < urls.length; i++) {
            sendProgress({
              phase: 'parsing',
              step: `正在解析第 ${i + 1}/${urls.length} 个网页...`,
              current: i + 1,
              total: urls.length,
              progress: Math.round((i / urls.length) * 30) + 20, // 20-50%
              details: urls[i]
            })

            statistics.urlsProcessed++

            const result = await readWebPageWithRetry(
              urls[i],
              3,
              (attempt, error) => {
                statistics.retries++
                sendProgress({
                  phase: 'parsing',
                  step: `第 ${i + 1}/${urls.length} 个网页重试中 (第 ${attempt}/3 次)...`,
                  current: i + 1,
                  total: urls.length,
                  progress: Math.round((i / urls.length) * 30) + 20,
                  details: `上次失败: ${error}`
                })
              }
            )

            if (result.error) {
              statistics.urlsFailed++
              webContents[i] = snippets[i] || ''
              sendProgress({
                phase: 'parsing',
                step: `⚠️ 第 ${i + 1}/${urls.length} 个网页解析失败，使用 Snippet 降级`,
                current: i + 1,
                total: urls.length,
                progress: Math.round(((i + 1) / urls.length) * 30) + 20
              })
            } else {
              statistics.urlsSucceeded++
              webContents[i] = result.content
              sendProgress({
                phase: 'parsing',
                step: `✓ 第 ${i + 1}/${urls.length} 个网页解析成功 (${result.wordCount} 词)`,
                current: i + 1,
                total: urls.length,
                progress: Math.round(((i + 1) / urls.length) * 30) + 20
              })
            }

            // 每解析完一个 URL 就保存一次检查点
            await saveCheckpoint(taskId, {
              phase: 'parsing',
              progress: Math.round(((i + 1) / urls.length) * 30) + 20,
              data: {
                webContents,
                statistics
              }
            })
          }

          sendProgress({
            phase: 'parsing',
            step: `✓ 网页解析完成 (成功: ${statistics.urlsSucceeded}, 失败: ${statistics.urlsFailed})`,
            progress: 50
          })

          // ========== 阶段 2.5: AI 筛选游戏网站和内容相关性 (3-5s) ==========

          const filteringCheckpoint = await loadCheckpoint(taskId, 'filtering')
          let filteredWebsites = searchResults.map((r, i) => ({
            title: r.title,
            url: r.url,
            content: webContents[i] || ''
          }))

          if (filteringCheckpoint) {
            // 从检查点恢复
            filteredWebsites = filteringCheckpoint.filteredWebsites

            sendProgress({
              phase: 'filtering',
              step: `✓ 从检查点恢复: ${filteredWebsites.length} 个筛选网站`,
              progress: 60,
              resumed: true
            })

            console.log(`[检查点恢复] filtering - 已恢复 ${filteredWebsites.length} 个筛选结果`)
          } else {
            sendProgress({
              phase: 'filtering',
              step: '正在使用 AI 筛选游戏网站并评估内容相关性...',
              progress: 52
            })

            try {
              const filtered = await filterGameWebsites(
                filteredWebsites,
                gameTitle,
                locale,
                configId,
                modelId
              )

              if (filtered.length > 0) {
                filteredWebsites = filtered

                // 保存检查点
                await saveCheckpoint(taskId, {
                  phase: 'filtering',
                  progress: 60,
                  data: { filteredWebsites }
                })

                sendProgress({
                  phase: 'filtering',
                  step: `✓ AI 筛选完成: ${filtered.length}/${searchResults.length} 个相关网站`,
                  progress: 60
                })

                // 记录筛选结果详情
                filtered.forEach(f => {
                  console.log(`  [筛选] ${f.title}`)
                  console.log(`    网站质量: ${f.confidence}%, 内容相关性: ${f.relevanceScore}%`)
                })
              } else {
                // 即使没有筛选结果也保存检查点
                await saveCheckpoint(taskId, {
                  phase: 'filtering',
                  progress: 60,
                  data: { filteredWebsites }
                })

                sendProgress({
                  phase: 'filtering',
                  step: '⚠️ AI 筛选未找到高相关性内容，使用所有结果',
                  progress: 60
                })
              }
            } catch (error: any) {
              console.error('[AI 筛选] 失败:', error)

              // 筛选失败，保存降级结果
              await saveCheckpoint(taskId, {
                phase: 'filtering',
                progress: 60,
                data: { filteredWebsites }
              })

              sendProgress({
                phase: 'filtering',
                step: '⚠️ AI 筛选失败，使用所有搜索结果',
                progress: 60
              })
            }
          }

          // ========== 阶段 3: AI 生成 (8-15s) ==========

          const generatingCheckpoint = await loadCheckpoint(taskId, 'generating')
          let generatedContent: any

          if (generatingCheckpoint) {
            // 从检查点恢复
            if (generatingCheckpoint.success) {
              generatedContent = generatingCheckpoint.generatedContent

              sendProgress({
                phase: 'generating',
                step: `✓ 从检查点恢复: AI 生成内容 (解析方式: ${generatingCheckpoint.parseMethod})`,
                progress: 100,
                resumed: true
              })

              console.log(`[检查点恢复] generating - 已恢复 AI 生成结果`)
            } else {
              // 之前解析失败，需要用户介入
              sendError(
                'AI 返回的内容无法解析为 JSON',
                {
                  attempts: generatingCheckpoint.parseAttempts || 0,
                  rawResponse: generatingCheckpoint.rawResponse || '',
                  canManualFix: true,
                  canRetry: true,
                  taskId
                }
              )
              controller.close()
              return
            }
          } else {
            // 执行 AI 生成
            sendProgress({
              phase: 'generating',
              step: `正在使用 AI 生成优化内容 (${mode === 'fast' ? '快速' : '质量'}模式)...`,
              progress: 60
            })

            // 获取 AI 配置
            const allConfigs = await getAllAiConfigs()
            let dbConfig = allConfigs.find((c: any) => c.id === configId && c.isEnabled)

            if (!dbConfig) {
              dbConfig = allConfigs.find((c: any) => c.isActive && c.isEnabled)
            }

            if (!dbConfig) {
              throw new Error('AI 配置未找到或无效')
            }

            const apiKey = decrypt(dbConfig.apiKey)
            const modelConfig = dbConfig.modelConfig as any
            const selectedModel = modelConfig.models?.find((m: any) => m.id === modelId && m.isEnabled) ||
              modelConfig.models?.find((m: any) => m.isDefault && m.isEnabled)

            if (!selectedModel) {
              throw new Error('未找到可用的 AI 模型')
            }

            const aiConfig = {
              apiKey,
              baseUrl: dbConfig.baseUrl,
              model: selectedModel.id,
              headers: selectedModel.headers || {},
            }

            // 语言名称映射
            const languageNames: Record<string, string> = {
              en: 'English',
              zh: 'Chinese (Simplified)',
              es: 'Spanish',
              fr: 'French',
            }
            const languageName = languageNames[locale] || locale

            // 准备提示词变量（使用筛选后的网站数据）
            const promptVars: GameContentPromptVariables = {
              gameTitle,
              locale,
              languageName,
              mainKeyword: keywords,
              subKeywords,
              originalDescription: originalDescription || undefined,
              markdownContent: markdownContent || undefined,  // 🎯 可选
              competitorContent: formatCompetitorContent(
                filteredWebsites.map(f => ({ title: f.title, url: f.url, rank: 0, snippet: '' })),
                filteredWebsites.map(f => f.content)
              )
            }

            if (mode === 'fast') {
              // 快速模式：单步生成
              sendProgress({
                phase: 'generating',
                step: '快速模式 - 正在生成所有字段...',
                progress: 70
              })

              const systemPrompt = getGameContentSystemPrompt(promptVars)
              const userPrompt = getGameContentUserPrompt(promptVars)

              const response = await fetch(aiConfig.baseUrl, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${aiConfig.apiKey}`,
                  ...aiConfig.headers,
                },
                body: JSON.stringify({
                  model: aiConfig.model,
                  messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: userPrompt }
                  ],
                  temperature: 0.7,
                  max_tokens: 4000,
                  response_format: { type: "json_object" }
                }),
              })

              if (!response.ok) {
                throw new Error(`AI 调用失败: ${response.statusText}`)
              }

              const data = await response.json()
              const rawContent = data.choices?.[0]?.message?.content || '{}'

              // 🆕 使用增强的 JSON 解析器
              const parseResult = parseAIJsonWithHistory(
                rawContent,
                {},
                mode === 'fast' ? '快速模式' : '质量模式'
              )

              if (parseResult.success) {
                // 解析成功
                generatedContent = parseResult.data

                // 保存成功检查点
                await saveCheckpoint(taskId, {
                  phase: 'generating',
                  progress: 100,
                  data: {
                    success: true,
                    generatedContent,
                    rawResponse: parseResult.rawResponse,
                    parseMethod: parseResult.parseMethod,
                    timestamp: new Date().toISOString()
                  }
                })

                sendProgress({
                  phase: 'generating',
                  step: `✅ AI 生成成功 (解析方式: ${parseResult.parseMethod}, 尝试次数: ${parseResult.attempts})`,
                  progress: 100
                })

                // 如果有修复建议，提示用户
                if (parseResult.suggestions && parseResult.suggestions.length > 0) {
                  sendProgress({
                    phase: 'generating',
                    step: `⚠️ 内容已修复: ${parseResult.suggestions.join('; ')}`,
                    progress: 100,
                    warnings: parseResult.suggestions
                  })
                }

              } else {
                // 解析失败
                console.error('[AI 生成] JSON 解析失败，所有修复尝试都无效')

                // 保存失败检查点（包含原始响应）
                await saveCheckpoint(taskId, {
                  phase: 'generating',
                  progress: 90,  // 不标记为 100%，表示未完成
                  data: {
                    success: false,
                    generatedContent: null,
                    rawResponse: parseResult.rawResponse,
                    parseAttempts: parseResult.attempts,
                    errors: parseResult.errors || [],
                    suggestions: parseResult.suggestions || [],
                    timestamp: new Date().toISOString()
                  }
                })

                // 更新任务状态为需要用户介入
                await updateTaskStatus(taskId, {
                  status: 'WAITING_CONFIRM',
                  progress: 90,
                  currentStep: 'generating',
                  errorMessage: 'AI 返回内容无法解析为 JSON',
                  errorDetails: {
                    parseAttempts: parseResult.attempts,
                    errors: parseResult.errors,
                    suggestions: parseResult.suggestions,
                    rawResponseLength: parseResult.rawResponse.length,
                    rawResponsePreview: parseResult.rawResponse.substring(0, 500)
                  },
                  requiresAction: true
                })

                // 发送错误消息（包含原始响应）
                sendError(
                  'AI 返回的内容无法解析为 JSON',
                  {
                    attempts: parseResult.attempts,
                    errors: parseResult.errors,
                    suggestions: parseResult.suggestions,
                    rawResponse: parseResult.rawResponse,
                    canManualFix: true,  // 🆕 允许手动修复
                    canRetry: true,        // 🆕 允许重新生成
                    taskId
                  }
                )

                controller.close()
                return
              }

            } else {
              // 质量模式：两步生成（分析 + 生成）
            sendProgress({
              phase: 'generating',
              step: '质量模式 - 步骤 1/2: 深度分析竞品内容...',
              progress: 65
            })

            // 步骤 1: 分析
            const analysisPrompt = getGameContentAnalysisPrompt(promptVars)

            const analysisResponse = await fetch(aiConfig.baseUrl, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${aiConfig.apiKey}`,
                ...aiConfig.headers,
              },
              body: JSON.stringify({
                model: aiConfig.model,
                messages: [{ role: 'user', content: analysisPrompt }],
                temperature: 0.3,
                max_tokens: 2000,
                response_format: { type: "json_object" }
              }),
            })

            if (!analysisResponse.ok) {
              throw new Error('分析步骤失败')
            }

            const analysisData = await analysisResponse.json()
            const analysisContent = analysisData.choices?.[0]?.message?.content || '{}'
            const analysis = parseAIJsonResponse(analysisContent)

            sendProgress({
              phase: 'generating',
              step: '质量模式 - 步骤 2/2: 基于分析生成高质量内容...',
              progress: 80
            })

            // 步骤 2: 基于分析和策略生成
            const strategy = getContentStrategy(locale)
            const formattedStrategy = formatStrategyForPrompt(strategy)

            const systemPrompt = getGameContentSystemPrompt(promptVars)
            const userPrompt = getGameContentUserPrompt({
              ...promptVars,
              competitorContent: `**Analysis Results:**\n${JSON.stringify(analysis, null, 2)}\n\n${formattedStrategy}\n\n${promptVars.competitorContent}`
            })

            const generationResponse = await fetch(aiConfig.baseUrl, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${aiConfig.apiKey}`,
                ...aiConfig.headers,
              },
              body: JSON.stringify({
                model: aiConfig.model,
                messages: [
                  { role: 'system', content: systemPrompt },
                  { role: 'user', content: userPrompt }
                ],
                temperature: 0.7,
                max_tokens: 4000,
                response_format: { type: "json_object" }
              }),
            })

            if (!generationResponse.ok) {
              throw new Error('生成步骤失败')
            }

            const generationData = await generationResponse.json()
            const content = generationData.choices?.[0]?.message?.content || '{}'

            try {
              generatedContent = parseAIJsonResponse(content)
            } catch (error) {
              console.error('[JSON 解析] 失败:', content.substring(0, 500))
              throw new Error('AI 返回的内容格式无效')
            }
          }
          } // 关闭 if (!generatingCheckpoint) else

          // ========== 完成 ==========
          const duration = Date.now() - startTime

          const finalResults = {
            results: generatedContent,
            citations: filteredWebsites.map((f: any) => ({
              title: f.title,
              url: f.url,
              confidence: f.confidence,
              reasoning: f.reasoning
            })),
            statistics: {
              duration,
              urlsFiltered: searchResults.length - filteredWebsites.length,
              ...statistics
            }
          }

          // 更新任务状态为完成
          await updateTaskStatus(taskId, {
            status: 'COMPLETED',
            progress: 100,
            currentStep: 'completed'
          })

          // 保存最终结果到数据库
          await prismaAdmin.aITask.update({
            where: { id: taskId },
            data: {
              outputData: finalResults
            }
          })

          sendComplete(finalResults)

          console.log(`[AI 生成] ✅ 完成 (${mode} 模式, ${duration}ms)`)
          console.log(`[AI 生成] 📊 筛选统计: ${filteredWebsites.length}/${searchResults.length} 个网站通过筛选`)

          controller.close()

        } catch (error: any) {
          console.error('[AI 生成] 失败:', error)
          sendError(error.message || '生成失败，请重试')
          controller.close()
        }
      }
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
      }
    })

  } catch (error: any) {
    console.error('[API] 错误:', error)
    return new Response(
      JSON.stringify({ error: error.message || '服务器错误' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }
}
