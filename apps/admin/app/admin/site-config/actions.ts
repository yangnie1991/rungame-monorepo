'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from "@rungame/database"
import { prismaAdmin } from "@/lib/prisma"
import { encrypt, decrypt, maskSensitiveData } from "@/lib/crypto"
import { clearConfigCache, getExternalApiConfig } from "@/lib/external-api-config"
import { z } from "zod"
import type { SiteConfig } from '@prisma/client'

/**
 * 获取网站配置
 */
export async function getSiteConfigAction(): Promise<any> {
  const config = await prisma.siteConfig.findFirst({
    include: {
      translations: {
        orderBy: { locale: 'asc' },
      },
    },
  })

  return config
}

/**
 * 更新网站基础配置
 */
export async function updateSiteConfigAction(data: Partial<Omit<SiteConfig, 'id' | 'createdAt' | 'updatedAt'>>): Promise<any> {
  try {
    const existing = await prisma.siteConfig.findFirst()

    if (!existing) {
      throw new Error('网站配置不存在')
    }

    const updated = await prisma.siteConfig.update({
      where: { id: existing.id },
      data: data as any,
    })

    revalidatePath('/admin/site-config')
    revalidatePath('/', 'layout') // 重新验证所有页面

    return { success: true, data: updated }
  } catch (error) {
    console.error('[updateSiteConfigAction]', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : '更新失败',
    }
  }
}

/**
 * 更新网站配置翻译
 */
export async function updateSiteConfigTranslationAction(
  locale: string,
  data: {
    siteName: string
    siteDescription?: string
    keywords?: string[]
  }
) {
  try {
    const config = await prisma.siteConfig.findFirst()

    if (!config) {
      throw new Error('网站配置不存在')
    }

    // 查找现有翻译
    const existing = await prisma.siteConfigTranslation.findUnique({
      where: {
        siteConfigId_locale: {
          siteConfigId: config.id,
          locale,
        },
      },
    })

    let translation
    if (existing) {
      // 更新
      translation = await prisma.siteConfigTranslation.update({
        where: { id: existing.id },
        data,
      })
    } else {
      // 创建
      translation = await prisma.siteConfigTranslation.create({
        data: {
          siteConfigId: config.id,
          locale,
          ...data,
        },
      })
    }

    revalidatePath('/admin/site-config')
    revalidatePath(`/${locale}`, 'layout')

    return { success: true, data: translation }
  } catch (error) {
    console.error('[updateSiteConfigTranslationAction]', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : '更新翻译失败',
    }
  }
}

/**
 * 初始化网站配置（如果不存在）
 */
export async function initializeSiteConfigAction(): Promise<any> {
  try {
    const existing = await prisma.siteConfig.findFirst()

    if (existing) {
      return { success: true, data: existing, message: '配置已存在' }
    }

    const config = await prisma.siteConfig.create({
      data: {
        siteName: 'RunGame',
        siteDescription: 'Play thousands of free online games',
        siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://rungame.online',
        defaultKeywords: ['free online games', 'browser games', 'RunGame'],
        googleAnalyticsId: process.env.NEXT_PUBLIC_GA_ID || null,
        googleAdsenseId: process.env.NEXT_PUBLIC_ADSENSE_ID || null,
        translations: {
          create: [
            {
              locale: 'zh',
              siteName: 'RunGame - 免费在线游戏',
              siteDescription: '畅玩数千款免费在线游戏',
              keywords: ['免费在线游戏', '网页游戏', 'RunGame'],
            },
          ],
        },
      },
      include: {
        translations: true,
      },
    })

    revalidatePath('/admin/site-config')

    return { success: true, data: config, message: '配置初始化成功' }
  } catch (error) {
    console.error('[initializeSiteConfigAction]', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : '初始化失败',
    }
  }
}

// ==================== R2 CDN 配置相关 ====================

const r2ConfigSchema = z.object({
  accountId: z.string().min(1, "Account ID 不能为空"),
  accessKeyId: z.string().min(1, "Access Key ID 不能为空"),
  secretAccessKey: z.string().min(1, "Secret Access Key 不能为空"),
  bucketName: z.string().min(1, "Bucket Name 不能为空"),
  publicUrl: z.string().optional(),
})

export type R2ConfigData = z.infer<typeof r2ConfigSchema>

/**
 * 获取 R2 配置（用于显示在 UI）
 */
export async function getR2ConfigAction() {
  try {
    // 直接从缓存获取配置，不尝试初始化
    const config = await getExternalApiConfig('cloudflare_r2')

    if (!config) {
      return null
    }

    // 解密并掩码显示敏感字段
    const apiConfig = { ...config.apiConfig }

    if (apiConfig.accessKeyId) {
      try {
        const decryptedKey = decrypt(apiConfig.accessKeyId)
        apiConfig.accessKeyId = maskSensitiveData(decryptedKey)
      } catch (error) {
        apiConfig.accessKeyId = ''
      }
    }

    if (apiConfig.secretAccessKey) {
      try {
        const decryptedSecret = decrypt(apiConfig.secretAccessKey)
        apiConfig.secretAccessKey = maskSensitiveData(decryptedSecret)
      } catch (error) {
        apiConfig.secretAccessKey = ''
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
  } catch (error: any) {
    console.error('[getR2ConfigAction] 获取 R2 配置失败:', error.message)
    return null
  }
}

/**
 * 更新 R2 配置
 */
export async function updateR2ConfigAction(data: R2ConfigData) {
  try {
    // 验证数据
    const validated = r2ConfigSchema.parse(data)

    // ⚠️ 检查是否为掩码值（包含 * 字符）
    const isAccessKeyMasked = validated.accessKeyId.includes('*')
    const isSecretKeyMasked = validated.secretAccessKey.includes('*')

    // 从缓存获取现有配置
    const existingConfig = await getExternalApiConfig('cloudflare_r2')

    let encryptedAccessKey: string
    let encryptedSecretKey: string

    if (isAccessKeyMasked && isSecretKeyMasked && existingConfig) {
      // 保持原有的加密值
      encryptedAccessKey = existingConfig.apiConfig.accessKeyId as string
      encryptedSecretKey = existingConfig.apiConfig.secretAccessKey as string
    } else if (isAccessKeyMasked || isSecretKeyMasked) {
      return { success: false, error: '请输入完整的密钥，不能只更新部分字段' }
    } else {
      // 加密新的密钥
      encryptedAccessKey = encrypt(validated.accessKeyId)
      encryptedSecretKey = encrypt(validated.secretAccessKey)
    }

    // 更新或创建配置
    await prismaAdmin.externalApiConfig.upsert({
      where: { name: 'cloudflare_r2' },
      create: {
        name: 'cloudflare_r2',
        displayName: 'Cloudflare R2 CDN',
        description: '用于存储游戏图片、分类图标等静态资源',
        provider: 'cloudflare',
        apiConfig: {
          accountId: validated.accountId,
          accessKeyId: encryptedAccessKey,
          secretAccessKey: encryptedSecretKey,
          bucketName: validated.bucketName,
          publicUrl: validated.publicUrl || '',
        },
      },
      update: {
        apiConfig: {
          accountId: validated.accountId,
          accessKeyId: encryptedAccessKey,
          secretAccessKey: encryptedSecretKey,
          bucketName: validated.bucketName,
          publicUrl: validated.publicUrl || '',
        },
      },
    })

    // 清除缓存
    clearConfigCache('cloudflare_r2')

    revalidatePath('/admin/site-config')

    return { success: true }
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.issues.map(e => `${e.path.join('.')}: ${e.message}`).join(', ')
      }
    }
    console.error('[updateR2ConfigAction] 更新 R2 配置失败:', error.message)
    return { success: false, error: error.message || '更新失败' }
  }
}

/**
 * 重置 R2 API 调用统计
 */
export async function resetR2StatsAction() {
  try {
    await prismaAdmin.externalApiConfig.update({
      where: { name: 'cloudflare_r2' },
      data: {
        totalCalls: 0,
        successCalls: 0,
        failedCalls: 0,
        lastUsedAt: null,
      }
    })

    revalidatePath('/admin/site-config')

    return { success: true }
  } catch (error: any) {
    console.error('[resetR2StatsAction] 重置统计失败:', error.message)
    return { success: false, error: error.message || '操作失败' }
  }
}
