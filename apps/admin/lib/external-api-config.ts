/**
 * 外部 API 配置管理
 *
 * 从数据库读取和管理外部 API 配置（Google Search, Jina Reader 等）
 * 自动处理加密/解密、缓存和配额管理
 *
 * 缓存策略：
 * - 使用内存缓存（Map）存储配置数据
 * - 只在保存/更新配置时清除缓存
 * - 应用重启时自动重新加载
 */

import { unstable_cache } from 'next/cache'
import { revalidateTag } from 'next/cache'
import { prismaAdmin } from '@/lib/prisma'
import { decrypt } from '@/lib/crypto'

/**
 * Google Search API 配置类型
 */
export interface GoogleSearchConfig {
  apiKey: string
  engineId: string
  endpoint?: string
  quota?: {
    daily?: number
    monthly?: number
    current?: number
  }
}

/**
 * Jina Reader API 配置类型
 */
export interface JinaReaderConfig {
  apiKey?: string  // 可选，不配置则使用免费模式
  endpoint?: string
  timeout?: number
  options?: {
    withGeneratedAlt?: boolean
    withImagesSummary?: boolean
    withLinksSummary?: boolean
  }
}

/**
 * 通用外部 API 配置类型
 */
export interface ExternalApiConfigData {
  id: string
  name: string
  displayName: string
  description: string | null
  provider: string
  apiConfig: Record<string, any>
  isEnabled: boolean
  isActive: boolean
  totalCalls: number
  successCalls: number
  failedCalls: number
  lastUsedAt: Date | null
}

/**
 * 获取 Google Search API 配置
 *
 * @returns Google Search 配置，如果未配置则返回 null
 *
 * @example
 * const config = await getGoogleSearchConfig()
 * if (config) {
 *   console.log('API Key:', config.apiKey)
 *   console.log('Engine ID:', config.engineId)
 * } else {
 *   console.log('Google Search API 未配置')
 * }
 */
export async function getGoogleSearchConfig(): Promise<GoogleSearchConfig | null> {
  try {
    const config = await getExternalApiConfig('google_search')

    if (!config) {
      return null
    }

    // 解密 API Key
    const apiKey = config.apiConfig.apiKey
      ? decrypt(config.apiConfig.apiKey)
      : null

    if (!apiKey) {
      console.warn('[External API] Google Search API Key 未配置')
      return null
    }

    return {
      apiKey,
      engineId: config.apiConfig.engineId || '',
      endpoint: config.apiConfig.endpoint || 'https://www.googleapis.com/customsearch/v1',
      quota: config.apiConfig.quota
    }

  } catch (error: any) {
    console.error('[External API] 获取 Google Search 配置失败:', error.message)
    return null
  }
}

/**
 * 获取 Jina Reader API 配置
 *
 * @returns Jina Reader 配置，如果未配置则返回默认配置（免费模式）
 *
 * @example
 * const config = await getJinaReaderConfig()
 * console.log('Endpoint:', config.endpoint)
 * if (config.apiKey) {
 *   console.log('使用 API Key 模式（更高速率限制）')
 * } else {
 *   console.log('使用免费模式')
 * }
 */
export async function getJinaReaderConfig(): Promise<JinaReaderConfig> {
  try {
    const config = await getExternalApiConfig('jina_reader')

    if (!config) {
      // 返回默认配置（免费模式）
      return {
        endpoint: 'https://r.jina.ai',
        timeout: 20,
        options: {
          withGeneratedAlt: true,
          withImagesSummary: true,
          withLinksSummary: false
        }
      }
    }

    // 解密 API Key（如果有）
    let apiKey: string | undefined
    if (config.apiConfig.apiKey) {
      try {
        apiKey = decrypt(config.apiConfig.apiKey)
      } catch (error) {
        console.warn('[External API] Jina API Key 解密失败，使用免费模式')
      }
    }

    return {
      apiKey,
      endpoint: config.apiConfig.endpoint || 'https://r.jina.ai',
      timeout: config.apiConfig.timeout || 20,
      options: config.apiConfig.options || {
        withGeneratedAlt: true,
        withImagesSummary: true,
        withLinksSummary: false
      }
    }

  } catch (error: any) {
    console.error('[External API] 获取 Jina Reader 配置失败:', error.message)

    // 返回默认配置
    return {
      endpoint: 'https://r.jina.ai',
      timeout: 20,
      options: {
        withGeneratedAlt: true,
        withImagesSummary: true,
        withLinksSummary: false
      }
    }
  }
}

// ==================== 数据库缓存 ====================

/**
 * 缓存整个 ExternalApiConfig 表
 * 所有配置查询都从这个缓存中获取，减少数据库查询
 */
const getAllConfigsFromDatabase = unstable_cache(
  async () => {
    console.log('[External API Cache] 从数据库查询所有配置')
    return await prismaAdmin.externalApiConfig.findMany({
      orderBy: { name: 'asc' }
    })
  },
  ['external-api-configs-all'], // 缓存键
  {
    tags: ['external-api-configs'], // 单一标签，清除时清除整个表
    revalidate: false // 永久缓存，只在保存/更新时手动清除
  }
)

/**
 * 获取外部 API 配置（通用方法）
 * 从缓存的表中查找，而不是直接查询数据库
 *
 * @param name - 配置名称（google_search, jina_reader 等）
 * @returns 配置对象或 null
 */
export async function getExternalApiConfig(name: string): Promise<ExternalApiConfigData | null> {
  try {
    // 从缓存获取所有配置
    const allConfigs = await getAllConfigsFromDatabase()

    // 内存中查找指定配置
    const config = allConfigs.find(c => c.name === name)

    if (!config) {
      return null
    }

    return {
      id: config.id,
      name: config.name,
      displayName: config.displayName,
      description: config.description,
      provider: config.provider,
      apiConfig: config.apiConfig as Record<string, any>,
      isEnabled: config.isEnabled,
      isActive: config.isActive,
      totalCalls: config.totalCalls,
      successCalls: config.successCalls,
      failedCalls: config.failedCalls,
      lastUsedAt: config.lastUsedAt
    }
  } catch (error: any) {
    console.error(`[External API] 查询配置 "${name}" 失败:`, error.message)
    return null
  }
}

/**
 * 记录 API 调用统计
 *
 * @param name - 配置名称
 * @param success - 是否成功
 *
 * @example
 * await recordApiCall('google_search', true)
 */
export async function recordApiCall(name: string, success: boolean): Promise<void> {
  try {
    await prismaAdmin.externalApiConfig.update({
      where: { name },
      data: {
        totalCalls: { increment: 1 },
        successCalls: success ? { increment: 1 } : undefined,
        failedCalls: success ? undefined : { increment: 1 },
        lastUsedAt: new Date()
      }
    })

    // 🔧 不清除缓存！统计数据不是关键配置，允许延迟更新
    // 只在保存/更新配置时才清除缓存（见 actions.ts 中的 clearConfigCache 调用）
    // revalidateTag(`external-api-config:${name}`)

  } catch (error: any) {
    // 记录失败不影响主流程
    console.error(`[External API] 记录调用统计失败 "${name}":`, error.message)
  }
}

/**
 * 清除配置缓存
 * 使用 Next.js revalidateTag 清除整个表的缓存
 *
 * @param _name - 配置名称（可选，为了兼容性保留参数，但实际会清除整个表缓存）
 *
 * @example
 * clearConfigCache('google_search')  // 清除整个表缓存
 * clearConfigCache()                  // 清除整个表缓存
 */
export function clearConfigCache(_name?: string): void {
  // 清除整个表的缓存（因为缓存的是整个表，所以无论是否传入 name 都清除整表）
  revalidateTag('external-api-configs')
  console.log('[External API Cache] 已清除配置缓存')
}

/**
 * 检查 API 是否已配置
 *
 * @param name - 配置名称
 * @returns true 如果已配置
 *
 * @example
 * if (await isApiConfigured('google_search')) {
 *   console.log('Google Search API 已配置')
 * }
 */
export async function isApiConfigured(name: string): Promise<boolean> {
  const config = await getExternalApiConfig(name)
  return config !== null
}

/**
 * 获取所有外部 API 配置列表
 * 从缓存中获取，而不是直接查询数据库
 *
 * @returns 所有配置的数组
 *
 * @example
 * const configs = await getAllExternalApiConfigs()
 * for (const config of configs) {
 *   console.log(`${config.displayName}: ${config.isEnabled ? '已启用' : '已禁用'}`)
 * }
 */
export async function getAllExternalApiConfigs(): Promise<ExternalApiConfigData[]> {
  try {
    // 从缓存获取所有配置
    const configs = await getAllConfigsFromDatabase()

    // 转换为返回格式
    return configs.map(config => ({
      id: config.id,
      name: config.name,
      displayName: config.displayName,
      description: config.description,
      provider: config.provider,
      apiConfig: config.apiConfig as Record<string, any>,
      isEnabled: config.isEnabled,
      isActive: config.isActive,
      totalCalls: config.totalCalls,
      successCalls: config.successCalls,
      failedCalls: config.failedCalls,
      lastUsedAt: config.lastUsedAt
    }))

  } catch (error: any) {
    console.error('[External API] 获取所有配置失败:', error.message)
    return []
  }
}
