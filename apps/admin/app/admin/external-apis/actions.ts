"use server"

import { prismaAdmin } from "@/lib/prisma"
import { encrypt, decrypt, maskSensitiveData } from "@/lib/crypto"
import {
  clearConfigCache,
  getAllExternalApiConfigs as getCachedConfigs,
  getExternalApiConfig,
  updateJinaUseMode as updateJinaUseModeLib,
  type JinaUseMode
} from "@/lib/external-api-config"
import { z } from "zod"

/**
 * 外部 API 配置 - Server Actions（固定配置版本）
 * 只支持 Google Search 和 Jina Reader 两个预设的 API
 */

// ==================== 数据验证 Schema ====================

const googleSearchConfigSchema = z.object({
  apiKey: z.string().min(1, "API Key 不能为空"),
  engineId: z.string().min(1, "Engine ID 不能为空"),
})

const jinaReaderConfigSchema = z.object({
  apiKey: z.string().optional(),
})

export type GoogleSearchConfigData = z.infer<typeof googleSearchConfigSchema>
export type JinaReaderConfigData = z.infer<typeof jinaReaderConfigSchema>

// ==================== 查询操作 ====================

/**
 * 获取所有外部 API 配置列表
 * 从缓存中获取数据，而不是直接查询数据库
 */
export async function getAllExternalApiConfigs() {
  try {
    // 确保两个预设配置存在
    await ensureDefaultConfigs()

    // 从缓存获取配置（而不是直接查询数据库）
    const allConfigs = await getCachedConfigs()

    // 只返回 Google Search 和 Jina Reader 配置
    const configs = allConfigs.filter(c =>
      c.name === 'google_search' || c.name === 'jina_reader'
    )

    // 解密 API Key 并掩码显示
    return configs.map(config => {
      const apiConfig = { ...config.apiConfig }

      // 如果有 API Key,解密并掩码显示
      if (apiConfig.apiKey) {
        try {
          const decryptedKey = decrypt(apiConfig.apiKey)
          apiConfig.apiKey = maskSensitiveData(decryptedKey)
        } catch (error) {
          console.error('解密 API Key 失败:', error)
          apiConfig.apiKey = ''
        }
      }

      return {
        id: config.id,
        name: config.name,
        displayName: config.displayName,
        description: config.description,
        provider: config.provider,
        apiConfig,
        isEnabled: config.isEnabled,
        isActive: config.isActive,
        totalCalls: config.totalCalls,
        successCalls: config.successCalls,
        failedCalls: config.failedCalls,
        lastUsedAt: config.lastUsedAt,
      }
    })
  } catch (error: any) {
    console.error('[External API] 获取配置列表失败:', error.message)
    return []
  }
}

// ==================== 变更操作 ====================

/**
 * 更新 Google Search API 配置
 */
export async function updateGoogleSearchConfig(data: GoogleSearchConfigData) {
  try {
    // 验证数据
    const validated = googleSearchConfigSchema.parse(data)

    // ⚠️ 检查是否为掩码值（包含 * 字符），如果是则不更新 API Key
    const isMaskedValue = validated.apiKey.includes('*')

    if (isMaskedValue) {
      // 只更新 Engine ID，不更新 API Key
      // 从缓存获取现有配置，而不是直接查询数据库
      const existingConfig = await getExternalApiConfig('google_search')

      if (existingConfig) {
        await prismaAdmin.externalApiConfig.update({
          where: { name: 'google_search' },
          data: {
            apiConfig: {
              ...(existingConfig.apiConfig as Record<string, any>),
              engineId: validated.engineId,
              endpoint: 'https://www.googleapis.com/customsearch/v1',
            },
          },
        })
      } else {
        return { success: false, error: '配置不存在，请先输入完整的 API Key' }
      }
    } else {
      // 加密 API Key
      const encryptedApiKey = encrypt(validated.apiKey)

      // 更新或创建配置
      await prismaAdmin.externalApiConfig.upsert({
        where: { name: 'google_search' },
        create: {
          name: 'google_search',
          displayName: 'Google Search API',
          description: '用于 GamePix 游戏导入时搜索竞品网站',
          provider: 'google',
          apiConfig: {
            apiKey: encryptedApiKey,
            engineId: validated.engineId,
            endpoint: 'https://www.googleapis.com/customsearch/v1',
          },
        },
        update: {
          apiConfig: {
            apiKey: encryptedApiKey,
            engineId: validated.engineId,
            endpoint: 'https://www.googleapis.com/customsearch/v1',
          },
        },
      })
    }

    // 清除缓存
    clearConfigCache('google_search')

    return { success: true }
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ')
      }
    }
    console.error('[External API] 更新 Google Search 配置失败:', error.message)
    return { success: false, error: error.message || '更新失败' }
  }
}

/**
 * 更新 Jina Reader API 配置
 */
export async function updateJinaReaderConfig(data: JinaReaderConfigData) {
  try {
    // 验证数据
    const validated = jinaReaderConfigSchema.parse(data)

    // ⚠️ 检查是否为掩码值（包含 * 字符）
    const isMaskedValue = validated.apiKey && validated.apiKey.includes('*')

    if (isMaskedValue) {
      // 不更新 API Key，保持原有配置
      // 从缓存获取现有配置，而不是直接查询数据库
      const existingConfig = await getExternalApiConfig('jina_reader')

      if (existingConfig) {
        await prismaAdmin.externalApiConfig.update({
          where: { name: 'jina_reader' },
          data: {
            apiConfig: {
              ...(existingConfig.apiConfig as Record<string, any>),
              // 保持其他配置不变
            },
          },
        })
      }
    } else {
      // 加密 API Key（如果提供）
      const encryptedApiKey = validated.apiKey ? encrypt(validated.apiKey) : undefined

      // 更新或创建配置
      await prismaAdmin.externalApiConfig.upsert({
        where: { name: 'jina_reader' },
        create: {
          name: 'jina_reader',
          displayName: 'Jina Reader API',
          description: '将网页转换为 LLM 友好的 Markdown 格式',
          provider: 'jina',
          apiConfig: {
            apiKey: encryptedApiKey,
            endpoint: 'https://r.jina.ai',
            timeout: 20,
            options: {
              withGeneratedAlt: true,
              withImagesSummary: true,
              withLinksSummary: false,
            },
          },
        },
        update: {
          apiConfig: {
            apiKey: encryptedApiKey,
            endpoint: 'https://r.jina.ai',
            timeout: 20,
            options: {
              withGeneratedAlt: true,
              withImagesSummary: true,
              withLinksSummary: false,
            },
          },
        },
      })
    }

    // 清除缓存
    clearConfigCache('jina_reader')

    return { success: true }
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ')
      }
    }
    console.error('[External API] 更新 Jina Reader 配置失败:', error.message)
    return { success: false, error: error.message || '更新失败' }
  }
}

/**
 * 重置 API 调用统计
 */
export async function resetApiCallStats(name: string) {
  try {
    await prismaAdmin.externalApiConfig.update({
      where: { name },
      data: {
        totalCalls: 0,
        successCalls: 0,
        failedCalls: 0,
        lastUsedAt: null,
      }
    })

    return { success: true }
  } catch (error: any) {
    console.error('[External API] 重置统计失败:', error.message)
    return { success: false, error: error.message || '操作失败' }
  }
}

/**
 * 切换 Jina Reader 使用模式
 */
export async function switchJinaUseMode(useMode: JinaUseMode) {
  try {
    const success = await updateJinaUseModeLib(useMode)

    if (success) {
      return { success: true }
    } else {
      return { success: false, error: '更新失败' }
    }
  } catch (error: any) {
    console.error('[External API] 切换 Jina 使用模式失败:', error.message)
    return { success: false, error: error.message || '操作失败' }
  }
}

/**
 * 确保默认配置存在
 * 从缓存中检查配置是否存在，而不是直接查询数据库
 */
async function ensureDefaultConfigs() {
  try {
    // 检查 Google Search 配置（从缓存）
    const googleConfig = await getExternalApiConfig('google_search')

    if (!googleConfig) {
      await prismaAdmin.externalApiConfig.create({
        data: {
          name: 'google_search',
          displayName: 'Google Search API',
          description: '用于 GamePix 游戏导入时搜索竞品网站',
          provider: 'google',
          apiConfig: {
            apiKey: '',
            engineId: '',
            endpoint: 'https://www.googleapis.com/customsearch/v1',
          },
        }
      })
      // 创建后清除缓存，以便下次读取到新数据
      clearConfigCache()
    }

    // 检查 Jina Reader 配置（从缓存）
    const jinaConfig = await getExternalApiConfig('jina_reader')

    if (!jinaConfig) {
      await prismaAdmin.externalApiConfig.create({
        data: {
          name: 'jina_reader',
          displayName: 'Jina Reader API',
          description: '将网页转换为 LLM 友好的 Markdown 格式',
          provider: 'jina',
          apiConfig: {
            apiKey: '',
            endpoint: 'https://r.jina.ai',
            timeout: 20,
            useMode: 'auto',  // 默认使用 auto 模式
            options: {
              withGeneratedAlt: true,
              withImagesSummary: true,
              withLinksSummary: false,
            },
          },
        }
      })
      // 创建后清除缓存，以便下次读取到新数据
      clearConfigCache()
    }
  } catch (error: any) {
    console.error('[External API] 创建默认配置失败:', error.message)
  }
}
