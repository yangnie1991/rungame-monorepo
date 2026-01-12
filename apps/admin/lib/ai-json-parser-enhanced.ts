/**
 * 增强的 AI JSON 解析器
 *
 * 特点：
 * 1. 保存完整的解析历史和错误信息
 * 2. 返回详细的元数据（解析方式、尝试次数等）
 * 3. 提供智能修复建议
 * 4. 保留原始响应用于手动修复和调试
 *
 * @module ai-json-parser-enhanced
 */

export interface ParseResult {
  success: boolean
  data?: any
  rawResponse: string
  parseMethod?: 'direct' | 'markdown_removed' | 'fixed_unterminated' | 'fixed_malformed' | 'extracted' | 'fallback'
  errors?: Array<{
    step: string
    message: string
    timestamp: string
  }>
  attempts: number
  suggestions?: string[]
}

/**
 * 增强的 JSON 解析函数
 *
 * 多层策略尝试解析 AI 返回的 JSON：
 * 1. 直接解析
 * 2. 移除 markdown 代码块
 * 3. 修复未闭合的字符串
 * 4. 修复格式错误的 JSON
 * 5. 移除注释和多余符号
 * 6. 提取 JSON 对象
 * 7. 返回默认值
 *
 * @param content - AI 返回的原始内容
 * @param fallback - 最终降级值（默认为 {}）
 * @param context - 错误上下文信息（用于日志）
 * @returns ParseResult 包含解析结果和详细元数据
 */
export function parseAIJsonWithHistory(
  content: string,
  fallback: any = {},
  context?: string
): ParseResult {
  const errors: Array<{ step: string; message: string; timestamp: string }> = []
  const suggestions: string[] = []
  let attempts = 0

  const addError = (step: string, message: string) => {
    errors.push({
      step,
      message,
      timestamp: new Date().toISOString()
    })
    attempts++
    const contextStr = context ? ` [${context}]` : ''
    console.error(`[JSON 解析${contextStr}] 步骤 ${attempts} - ${step}: ${message}`)
  }

  const rawResponse = content
  let cleaned = content.trim()

  // ========== 步骤 1: 直接解析 ==========
  try {
    const parsed = JSON.parse(cleaned)
    console.log(`[JSON 解析] ✅ 步骤 1: 直接解析成功`)
    return {
      success: true,
      data: parsed,
      rawResponse,
      parseMethod: 'direct',
      attempts: 1
    }
  } catch (error) {
    addError('直接解析', error instanceof Error ? error.message : String(error))
  }

  // ========== 步骤 2: 移除 markdown 代码块 ==========
  try {
    const codeBlockPattern = /^```(?:json)?\s*\n?([\s\S]*?)\n?```$/
    const match = cleaned.match(codeBlockPattern)

    if (match && match[1]) {
      cleaned = match[1].trim()
      const parsed = JSON.parse(cleaned)

      console.log(`[JSON 解析] ✅ 步骤 2: 移除 markdown 代码块后解析成功`)
      return {
        success: true,
        data: parsed,
        rawResponse,
        parseMethod: 'markdown_removed',
        attempts: 2
      }
    } else {
      addError('移除 markdown', '未检测到 markdown 代码块标记')
    }
  } catch (error) {
    addError('移除 markdown 后解析', error instanceof Error ? error.message : String(error))
  }

  // ========== 步骤 3: 修复未闭合的字符串 ==========
  try {
    const errorMessage = errors[errors.length - 1]?.message || ''

    if (errorMessage.includes('Unterminated') || errorMessage.includes('string')) {
      console.log(`[JSON 解析] 🔧 步骤 3: 检测到未闭合字符串，尝试修复...`)

      const fixed = fixUnterminatedString(cleaned)
      const parsed = JSON.parse(fixed)

      suggestions.push('部分内容被截断以修复未闭合字符串')
      suggestions.push('考虑增加 max_tokens 参数以获得完整响应')

      console.log(`[JSON 解析] ✅ 步骤 3: 修复未闭合字符串后解析成功`)
      return {
        success: true,
        data: parsed,
        rawResponse,
        parseMethod: 'fixed_unterminated',
        attempts: 3,
        suggestions
      }
    } else {
      addError('修复未闭合字符串', '未检测到相关错误')
    }
  } catch (error) {
    addError('修复未闭合字符串失败', error instanceof Error ? error.message : String(error))
  }

  // ========== 步骤 4: 修复格式错误的 JSON ==========
  try {
    const errorMessage = errors[errors.length - 1]?.message || ''

    if (errorMessage.includes('Expected') || errorMessage.includes('property')) {
      console.log(`[JSON 解析] 🔧 步骤 4: 检测到格式错误，尝试修复...`)

      const fixed = fixMalformedJSON(cleaned)
      const parsed = JSON.parse(fixed)

      suggestions.push('部分内容被移除以修复格式错误')
      suggestions.push('AI 返回的内容可能被截断或不完整')

      console.log(`[JSON 解析] ✅ 步骤 4: 修复格式错误后解析成功`)
      return {
        success: true,
        data: parsed,
        rawResponse,
        parseMethod: 'fixed_malformed',
        attempts: 4,
        suggestions
      }
    } else {
      addError('修复格式错误', '未检测到相关错误')
    }
  } catch (error) {
    addError('修复格式错误失败', error instanceof Error ? error.message : String(error))
  }

  // ========== 步骤 5: 移除注释和多余符号 ==========
  try {
    console.log(`[JSON 解析] 🔧 步骤 5: 移除注释和修复符号...`)

    let fixed = cleaned

    // 移除注释
    fixed = fixed.replace(/\/\/.*$/gm, '')
    fixed = fixed.replace(/\/\*[\s\S]*?\*\//g, '')

    // 修复连续逗号
    fixed = fixed.replace(/,\s*,/g, ',')

    // 修复末尾多余逗号
    fixed = fixed.replace(/,(\s*[}\]])/g, '$1')

    const parsed = JSON.parse(fixed)

    suggestions.push('移除了 AI 添加的注释')
    suggestions.push('修复了多余的逗号')

    console.log(`[JSON 解析] ✅ 步骤 5: 移除注释后解析成功`)
    return {
      success: true,
      data: parsed,
      rawResponse,
      parseMethod: 'fixed_malformed',
      attempts: 5,
      suggestions
    }
  } catch (error) {
    addError('移除注释失败', error instanceof Error ? error.message : String(error))
  }

  // ========== 步骤 6: 提取 JSON 对象 ==========
  try {
    console.log(`[JSON 解析] 🔧 步骤 6: 尝试提取 JSON 对象...`)

    const jsonMatch = cleaned.match(/\{[\s\S]*\}/)

    if (jsonMatch) {
      let extracted = jsonMatch[0]

      // 对提取的内容应用修复
      extracted = extracted.replace(/\/\/.*$/gm, '')
      extracted = extracted.replace(/\/\*[\s\S]*?\*\//g, '')
      extracted = extracted.replace(/,\s*,/g, ',')
      extracted = extracted.replace(/,(\s*[}\]])/g, '$1')

      const parsed = JSON.parse(extracted)

      suggestions.push('从非 JSON 文本中提取了 JSON 对象')
      suggestions.push('AI 返回的内容包含额外文本说明')

      console.log(`[JSON 解析] ✅ 步骤 6: 提取 JSON 对象后解析成功`)
      return {
        success: true,
        data: parsed,
        rawResponse,
        parseMethod: 'extracted',
        attempts: 6,
        suggestions
      }
    } else {
      addError('提取 JSON', '未找到 JSON 对象')
    }
  } catch (error) {
    addError('提取 JSON 失败', error instanceof Error ? error.message : String(error))
  }

  // ========== 所有步骤都失败 ==========
  console.error(`[JSON 解析] ❌ 所有 ${attempts} 个步骤都失败`)
  console.error(`[JSON 解析] 原始内容长度: ${rawResponse.length}`)
  console.error(`[JSON 解析] 原始内容前 500 字符:`, rawResponse.substring(0, 500))
  console.error(`[JSON 解析] 原始内容后 200 字符:`, rawResponse.substring(Math.max(0, rawResponse.length - 200)))

  // 生成修复建议
  suggestions.push('AI 返回的内容完全无法解析为 JSON')
  suggestions.push('建议：1) 检查 AI 模型是否支持 JSON 模式；2) 增加 max_tokens；3) 检查提示词')

  if (rawResponse.length > 4000) {
    suggestions.push('响应长度接近或超过 max_tokens，可能导致内容被截断')
  }

  if (!rawResponse.includes('{') || !rawResponse.includes('}')) {
    suggestions.push('响应中未找到 JSON 对象标记，AI 可能未遵循指令')
  }

  if (rawResponse.includes('<') && rawResponse.includes('>')) {
    suggestions.push('响应包含 HTML 标签，AI 可能返回了网页而非 JSON')
  }

  return {
    success: false,
    rawResponse,
    attempts,
    errors,
    suggestions,
    data: fallback
  }
}

/**
 * 修复未闭合的字符串（截断到最后一个完整字段）
 *
 * 策略：找到最后完整的 "字段" 字段，截断并补上 }
 */
function fixUnterminatedString(json: string): string {
  // 尝试找到最后完整的 "field", 模式
  const lastCompleteField = json.lastIndexOf('",')
  if (lastCompleteField > 0) {
    const truncated = json.substring(0, lastCompleteField + 1) + '\n}'
    console.log('[fixUnterminatedString] 截断到最后一个完整字段 (",)，长度:', truncated.length)
    return truncated
  }

  // 尝试找到最后完整的 "field"\n 模式
  const lastCompleteField2 = json.lastIndexOf('"\n')
  if (lastCompleteField2 > 0) {
    const truncated = json.substring(0, lastCompleteField2 + 1) + '\n}'
    console.log('[fixUnterminatedString] 截断到最后一个完整字段 ("\\n)，长度:', truncated.length)
    return truncated
  }

  // 尝试找到最后完整的 "field": 模式
  const lastColonIndex = json.lastIndexOf('":')
  if (lastColonIndex > 0) {
    // 尝试找到对应的值
    const afterColon = json.substring(lastColonIndex + 2)
    const lastQuote = afterColon.lastIndexOf('"')
    if (lastQuote > 0) {
      const truncated = json.substring(0, lastColonIndex + 2 + lastQuote + 1) + '\n}'
      console.log('[fixUnterminatedString] 截断到最后一个完整值，长度:', truncated.length)
      return truncated
    }
  }

  return json
}

/**
 * 修复格式错误的 JSON（逐行截断策略）
 *
 * 策略：从后往前逐行删除，直到找到可以解析的完整 JSON
 */
function fixMalformedJSON(json: string): string {
  const lines = json.split('\n')

  // 从后往前找，去掉最后几行可能不完整的内容
  for (let i = lines.length - 1; i > 0; i--) {
    let testJson = lines.slice(0, i).join('\n').trim()

    // 如果不以 } 结尾，补上
    if (!testJson.endsWith('}')) {
      // 移除最后可能不完整的行
      const lastCommaIndex = testJson.lastIndexOf(',')
      if (lastCommaIndex > 0) {
        testJson = testJson.substring(0, lastCommaIndex)
      }
      testJson = testJson.trim() + '\n}'
    }

    // 尝试解析
    try {
      JSON.parse(testJson)
      console.log(`[fixMalformedJSON] 成功修复，使用前 ${i} 行，总长度: ${testJson.length}`)
      return testJson
    } catch (e) {
      // 继续尝试更短的版本
      continue
    }
  }

  console.log('[fixMalformedJSON] 无法通过逐行修复')
  return json
}

/**
 * 验证 JSON 是否有效
 *
 * @param content - 要验证的内容
 * @returns true 如果 JSON 有效，否则 false
 */
export function isValidJSON(content: string): boolean {
  try {
    JSON.parse(content)
    return true
  } catch {
    return false
  }
}

/**
 * 尝试解析 JSON，失败时返回 null
 *
 * @param content - 要解析的内容
 * @returns 解析后的对象或 null
 */
export function tryParseJSON<T = any>(content: string): T | null {
  try {
    return JSON.parse(content) as T
  } catch {
    return null
  }
}
