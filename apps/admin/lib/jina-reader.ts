/**
 * Jina AI Reader API 集成
 *
 * 将任何 URL 转换为 LLM 友好的 Markdown 格式
 * 自动移除广告、导航栏等无关内容，保留文章主体
 *
 * 文档: https://jina.ai/reader
 * 免费使用，可选 API Key 提高速率限制
 *
 * 配置方式：
 * 在管理后台配置（/admin/external-apis）
 *
 * 本地开发代理设置:
 * - 使用 TUN 模式（推荐）或系统代理
 * - 详见: PROXY-QUICKSTART.md
 */

import { getJinaReaderConfig, recordApiCall } from '@/lib/external-api-config'

export interface JinaReaderResult {
  url: string           // 原始 URL
  title: string         // 页面标题
  content: string       // Markdown 格式的内容
  wordCount: number     // 字数统计
  error?: string        // 错误信息（如果解析失败）
}

/**
 * 使用 Jina Reader 解析单个网页
 *
 * @param url - 要解析的网页 URL
 * @param truncate - 是否截断内容（默认 true，截断到 5000 字符）
 * @param skipApiKey - 强制跳过 API Key，使用免费模式（用于回退）
 * @returns 解析结果
 *
 * @example
 * const result = await readWebPage('https://example.com/article')
 * console.log(result.content) // Markdown 格式的内容（截断到 5000 字符）
 *
 * @example
 * const result = await readWebPage('https://example.com/article', false)
 * console.log(result.content) // 完整的 Markdown 内容（不截断）
 */
export async function readWebPage(url: string, truncate: boolean = true, skipApiKey: boolean = false): Promise<JinaReaderResult> {
  try {
    // 从数据库获取配置
    const dbConfig = await getJinaReaderConfig()

    // 如果设置了 skipApiKey，强制不使用 API Key（回退模式）
    const apiKey = skipApiKey ? undefined : dbConfig.apiKey
    const endpoint = dbConfig.endpoint || 'https://r.jina.ai'
    const timeout = dbConfig.timeout || 20
    const options = dbConfig.options || {
      withGeneratedAlt: true,
      withImagesSummary: true,
      withLinksSummary: false
    }

    if (skipApiKey) {
      console.log('[Jina Reader] 使用回退模式（免费 API）')
    } else if (apiKey) {
      console.log('[Jina Reader] 使用数据库配置（带 API Key）')
    } else {
      console.log('[Jina Reader] 使用数据库配置（免费模式）')
    }

    // 构建 Jina Reader URL
    const jinaUrl = `${endpoint}/${url}`

    // 构建请求头
    const headers: Record<string, string> = {
      'Accept': 'text/markdown',
      'X-Return-Format': 'markdown',
      'X-Timeout': String(timeout),
      'X-With-Generated-Alt': String(options.withGeneratedAlt),
      'X-With-Images-Summary': String(options.withImagesSummary),
      'X-With-Links-Summary': String(options.withLinksSummary)
    }

    // 如果有 API Key，添加认证（可选，提高速率限制）
    if (apiKey) {
      headers['Authorization'] = `Bearer ${apiKey}`
    }

    // 调用 Jina Reader API
    const response = await fetch(jinaUrl, {
      headers,
      signal: AbortSignal.timeout(21000)  // 21秒超时（客户端稍长于服务端）
    })

    // 处理错误响应
    if (!response.ok) {
      // 记录失败
      await recordApiCall('jina_reader', false).catch(() => {})

      // 401 认证失败
      if (response.status === 401) {
        throw new Error('Jina API Key 无效或已过期。请在管理后台（外部 API 配置）更新或移除 API Key 使用免费模式')
      }

      // 402 付费要求 / 配额用完 - 实现回退逻辑
      if (response.status === 402) {
        // 如果当前使用的是付费 API 且未在回退模式
        if (apiKey && !skipApiKey) {
          console.log('[Jina Reader] 付费 API 返回 402，尝试回退到免费 API')

          // 递归调用自己，但跳过 API Key（回退到免费模式）
          return await readWebPage(url, truncate, true)
        }

        // 如果已经是免费模式或回退模式
        if (skipApiKey) {
          throw new Error('Jina 免费 API 配额已用完。请稍后重试')
        } else {
          throw new Error('Jina 免费模式配额已用完。请在管理后台（外部 API 配置）添加有效的 API Key 或稍后重试')
        }
      }

      // 403 访问被拒绝
      if (response.status === 403) {
        throw new Error('网页禁止访问，可能有反爬虫保护')
      }

      // 404 页面不存在
      if (response.status === 404) {
        throw new Error('网页不存在或已被删除')
      }

      // 429 速率限制
      if (response.status === 429) {
        if (apiKey) {
          throw new Error('Jina API 速率限制（已使用 API Key）。请稍后重试或升级账户')
        } else {
          throw new Error('Jina 免费模式速率限制。建议在管理后台（外部 API 配置）添加有效的 API Key')
        }
      }

      throw new Error(`HTTP ${response.status}`)
    }

    // 获取 Markdown 内容
    let markdown = await response.text()

    // 验证内容
    if (!markdown || markdown.trim().length === 0) {
      throw new Error('返回内容为空')
    }

    // 检查是否是错误响应（Jina 有时返回 200 但内容是错误信息）
    if (markdown.startsWith('Error:') || markdown.includes('Failed to fetch')) {
      throw new Error(markdown.substring(0, 200))
    }

    // 提取标题（第一行通常是 # 标题）
    const titleMatch = markdown.match(/^#\s+(.+)$/m)
    const title = titleMatch ? titleMatch[1].trim() : extractDomainFromUrl(url)

    // 统计字数（移除 Markdown 标记）
    const plainText = markdown
      .replace(/[#*_`[\]()!]/g, '')  // 移除 Markdown 符号
      .replace(/\s+/g, ' ')          // 多个空格合并为一个
      .trim()

    const words = plainText.split(/\s+/).filter(w => w.length > 0)
    const wordCount = words.length

    // 限制内容长度（避免 Token 过多）
    const maxChars = 5000
    let truncatedContent = markdown

    if (truncate && markdown.length > maxChars) {
      // 优先从 Images: 部分开始截断（Jina Reader 自动将图片放在最后）
      const imagesSectionIndex = markdown.indexOf('\nImages:\n')

      if (imagesSectionIndex > 0 && imagesSectionIndex <= maxChars) {
        // 如果图片部分在 maxChars 范围内，直接截断到图片之前
        truncatedContent = markdown.substring(0, imagesSectionIndex)
        truncatedContent += '\n\n...(Images 部分已移除，原文共 ' + markdown.length + ' 字符)'
      } else {
        // 否则按照原来的逻辑截断
        truncatedContent = markdown.substring(0, maxChars)
        // 找到最后一个完整段落
        const lastNewline = truncatedContent.lastIndexOf('\n\n')
        if (lastNewline > maxChars * 0.8) {
          truncatedContent = truncatedContent.substring(0, lastNewline)
        }
        truncatedContent += '\n\n...(内容已截断，共 ' + markdown.length + ' 字符)'
      }
    }

    console.log(`[Jina Reader] ✓ ${url} - ${wordCount} 词`)

    // 记录成功
    await recordApiCall('jina_reader', true).catch(() => {})

    return {
      url,
      title,
      content: truncatedContent,
      wordCount
    }

  } catch (error: any) {
    console.error(`[Jina Reader] ✗ ${url}:`, error.message)

    // 记录失败（如果错误不是在 recordApiCall 之后发生的）
    await recordApiCall('jina_reader', false).catch(() => {})

    // 返回失败结果（不抛出错误，允许部分失败）
    return {
      url,
      title: extractDomainFromUrl(url),
      content: '',
      wordCount: 0,
      error: error.message || '解析失败'
    }
  }
}

/**
 * 带重试机制的网页解析（指数退避策略）
 *
 * @param url - 要解析的网页 URL
 * @param maxRetries - 最大重试次数（默认 3）
 * @param onRetry - 重试回调函数（用于进度反馈）
 * @returns 解析结果
 *
 * @example
 * const result = await readWebPageWithRetry('https://example.com', 3, (attempt, error) => {
 *   console.log(`重试第 ${attempt} 次: ${error}`)
 * })
 */
export async function readWebPageWithRetry(
  url: string,
  maxRetries: number = 3,
  onRetry?: (attempt: number, error: string) => void
): Promise<JinaReaderResult> {
  let lastError: string = ''

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      // 第一次尝试，直接调用
      if (attempt === 1) {
        const result = await readWebPage(url, true)
        if (!result.error) {
          return result
        }
        lastError = result.error
      } else {
        // 重试前延迟（指数退避：2s, 4s, 8s）
        const delay = Math.pow(2, attempt - 1) * 1000
        console.log(`[Jina Reader] ⏳ ${url} - 等待 ${delay}ms 后重试...`)
        await new Promise(resolve => setTimeout(resolve, delay))

        // 通知重试
        if (onRetry) {
          onRetry(attempt, lastError)
        }

        // 重试
        const result = await readWebPage(url, true)
        if (!result.error) {
          console.log(`[Jina Reader] ✓ ${url} - 重试成功 (第 ${attempt} 次尝试)`)
          return result
        }
        lastError = result.error
      }
    } catch (error: any) {
      lastError = error.message || '未知错误'
      console.error(`[Jina Reader] ✗ ${url} - 第 ${attempt} 次尝试失败:`, lastError)
    }
  }

  // 所有重试都失败
  console.error(`[Jina Reader] ✗ ${url} - 重试 ${maxRetries} 次后仍失败`)
  return {
    url,
    title: extractDomainFromUrl(url),
    content: '',
    wordCount: 0,
    error: `重试 ${maxRetries} 次后失败: ${lastError}`
  }
}

/**
 * 批量解析多个网页
 *
 * 使用并发控制，每批 3 个请求并行执行
 * 即使部分失败也会继续，返回所有结果
 *
 * @param urls - URL 数组
 * @returns 解析结果数组
 *
 * @example
 * const results = await readMultiplePages([
 *   'https://site1.com',
 *   'https://site2.com',
 *   'https://site3.com'
 * ])
 * const successful = results.filter(r => !r.error)
 */
export async function readMultiplePages(
  urls: string[]
): Promise<JinaReaderResult[]> {
  const results: JinaReaderResult[] = []

  // 并发控制：每批 3 个
  const batchSize = 3

  for (let i = 0; i < urls.length; i += batchSize) {
    const batch = urls.slice(i, i + batchSize)

    console.log(`[Jina Reader] 解析批次 ${Math.floor(i / batchSize) + 1}/${Math.ceil(urls.length / batchSize)} (${batch.length} 个 URL)`)

    // 并行执行当前批次
    const batchResults = await Promise.all(
      batch.map(url => readWebPage(url))
    )

    results.push(...batchResults)

    // 批次间添加小延迟，避免触发速率限制
    if (i + batchSize < urls.length) {
      await new Promise(resolve => setTimeout(resolve, 500))
    }
  }

  // 统计结果
  const successCount = results.filter(r => !r.error && r.wordCount > 0).length
  const failCount = results.length - successCount

  console.log(`[Jina Reader] 完成: ${successCount} 成功, ${failCount} 失败`)

  return results
}

/**
 * 从 URL 中提取域名作为后备标题
 */
function extractDomainFromUrl(url: string): string {
  try {
    const urlObj = new URL(url)
    return urlObj.hostname.replace('www.', '')
  } catch {
    return url
  }
}

/**
 * 获取网页摘要（前 N 个字符）
 *
 * @param url - 网页 URL
 * @param length - 摘要长度（默认 500）
 * @returns 摘要文本
 */
export async function getPageSummary(
  url: string,
  length: number = 500
): Promise<string> {
  const result = await readWebPage(url)

  if (result.error || !result.content) {
    return `无法获取内容: ${result.error || '未知错误'}`
  }

  // 移除 Markdown 标记，返回纯文本摘要
  const plainText = result.content
    .replace(/[#*_`[\]()!]/g, '')
    .replace(/\s+/g, ' ')
    .trim()

  return plainText.length > length
    ? plainText.substring(0, length) + '...'
    : plainText
}
