import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'

export const dynamic = 'force-dynamic'

/**
 * 检查 ENCRYPTION_KEY 是否配置
 *
 * GET /api/admin/check-encryption-key
 */
export async function GET(request: NextRequest) {
  try {
    // 验证管理员身份
    // 验证管理员身份
    const session = await auth.api.getSession({
      headers: await headers()
    })
    if (!session || ((session.user as any)?.role !== 'ADMIN' && (session.user as any)?.role !== 'SUPER_ADMIN')) {
      return NextResponse.json({ error: '未授权' }, { status: 401 })
    }

    // 检查 ENCRYPTION_KEY 是否配置
    const configured = !!process.env.ENCRYPTION_KEY

    return NextResponse.json({
      configured,
      message: configured
        ? 'ENCRYPTION_KEY 已配置'
        : 'ENCRYPTION_KEY 未配置，请在 .env.local 中添加'
    })
  } catch (error) {
    return NextResponse.json(
      { error: '检查失败' },
      { status: 500 }
    )
  }
}
