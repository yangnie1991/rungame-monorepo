/**
 * 游戏导入预检查 API
 *
 * POST /api/admin/import-game/pre-check
 *
 * 功能：
 * 1. 检查游戏是否已存在
 * 2. 验证分类是否有效
 * 3. 提供建议和冲突解决方案
 *
 * 返回：
 * - canImport: boolean - 是否可以直接导入
 * - conflicts: 冲突信息
 * - suggestions: 建议方案
 */

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'

export const dynamic = 'force-dynamic'
import { prisma } from '@rungame/database'
import { z } from 'zod'

// 请求验证 Schema
const preCheckSchema = z.object({
  slug: z.string().min(1, 'slug 不能为空'),
  categoryId: z.string().min(1, '分类 ID 不能为空'),
  gamePixId: z.string().optional(), // GamePix 游戏 ID（用于检查是否已通过其他 slug 导入）
})

export type PreCheckRequest = z.infer<typeof preCheckSchema>

export interface PreCheckResponse {
  success: boolean
  canImport: boolean
  conflicts?: {
    gameExists?: {
      id: string
      title: string
      slug: string
      status: string
      createdAt: string
    }
    categoryInvalid?: {
      reason: string
      categoryId: string
    }
    duplicateSourceGame?: {
      id: string
      title: string
      slug: string
      sourcePlatformId: string
    }
  }
  suggestions?: {
    suggestedSlug?: string
    action?: 'update' | 'skip' | 'rename'
  }
  categoryInfo?: {
    id: string
    name: string
    mainCategoryId: string
    mainCategoryName: string
  }
  error?: string
}

export async function POST(req: NextRequest) {
  try {
    // 验证身份
    const session = await auth.api.getSession({
      headers: await headers()
    })
    if (!session || !['ADMIN', 'SUPER_ADMIN'].includes((session.user as any)?.role)) {
      return NextResponse.json(
        { success: false, error: '无权限' },
        { status: 403 }
      )
    }

    // 解析和验证请求
    const body = await req.json()
    const validation = preCheckSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: validation.error.issues.map(e => e.message).join(', ')
        },
        { status: 400 }
      )
    }

    const { slug, categoryId, gamePixId } = validation.data

    console.log(`[预检查] 开始: slug=${slug}, categoryId=${categoryId}`)

    const response: PreCheckResponse = {
      success: true,
      canImport: true,
    }

    // ========== 检查 1: 游戏是否已存在（通过 slug） ==========
    const existingGameBySlug = await prisma.game.findUnique({
      where: { slug },
      select: {
        id: true,
        title: true,
        slug: true,
        status: true,
        createdAt: true,
      }
    })

    if (existingGameBySlug) {
      response.canImport = false
      response.conflicts = {
        ...response.conflicts,
        gameExists: {
          ...existingGameBySlug,
          createdAt: existingGameBySlug.createdAt.toISOString(),
        }
      }

      // 建议操作：更新现有游戏
      response.suggestions = {
        action: 'update',
        suggestedSlug: generateAlternativeSlug(slug),
      }

      console.log(`[预检查] ⚠️  游戏已存在: ${slug}`)
    }

    // ========== 检查 2: 是否已通过其他 slug 导入（通过 sourcePlatformId） ==========
    if (gamePixId && !existingGameBySlug) {
      const existingGameBySource = await prisma.game.findFirst({
        where: {
          sourcePlatform: 'gamepix',
          sourcePlatformId: gamePixId,
        },
        select: {
          id: true,
          title: true,
          slug: true,
          sourcePlatformId: true,
        }
      })

      if (existingGameBySource) {
        response.canImport = false
        response.conflicts = {
          ...response.conflicts,
          duplicateSourceGame: {
            ...existingGameBySource,
            sourcePlatformId: existingGameBySource.sourcePlatformId || '',
          },
        }

        response.suggestions = {
          action: 'skip', // 建议跳过，因为相同游戏已存在
        }

        console.log(`[预检查] ⚠️  相同来源游戏已存在: ${existingGameBySource.slug}`)
      }
    }

    // ========== 检查 3: 验证分类是否有效 ==========
    const category = await prisma.category.findUnique({
      where: { id: categoryId },
      include: {
        parent: {
          select: {
            id: true,
            name: true,
          }
        }
      }
    })

    if (!category) {
      response.canImport = false
      response.conflicts = {
        ...response.conflicts,
        categoryInvalid: {
          reason: '分类不存在',
          categoryId,
        }
      }

      console.log(`[预检查] ❌ 分类不存在: ${categoryId}`)
    } else if (!category.isEnabled) {
      response.canImport = false
      response.conflicts = {
        ...response.conflicts,
        categoryInvalid: {
          reason: '分类已禁用',
          categoryId,
        }
      }

      console.log(`[预检查] ⚠️  分类已禁用: ${category.name}`)
    } else {
      // 分类有效，返回分类信息
      const mainCategoryId = category.parentId || category.id
      const mainCategoryName = category.parent?.name || category.name

      response.categoryInfo = {
        id: category.id,
        name: category.name,
        mainCategoryId,
        mainCategoryName,
      }

      console.log(`[预检查] ✓ 分类有效: ${category.name} (主分类: ${mainCategoryName})`)
    }

    // ========== 返回结果 ==========
    console.log(`[预检查] 完成: canImport=${response.canImport}`)

    return NextResponse.json(response)

  } catch (error: any) {
    console.error('[预检查] 错误:', error)
    return NextResponse.json(
      {
        success: false,
        canImport: false,
        error: error.message || '预检查失败',
      },
      { status: 500 }
    )
  }
}

/**
 * 生成备选 slug（添加数字后缀）
 */
function generateAlternativeSlug(slug: string): string {
  const match = slug.match(/^(.+?)-(\d+)$/)

  if (match) {
    // 如果已经有数字后缀，递增
    const base = match[1]
    const num = parseInt(match[2]!) + 1
    return `${base}-${num}`
  } else {
    // 添加 -2 后缀
    return `${slug}-2`
  }
}
