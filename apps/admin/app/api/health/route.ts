import { NextResponse } from 'next/server'
import { prisma } from '@rungame/database'

/**
 * 健康检查端点
 * 用于 Docker 容器健康检查和监控
 */
export async function GET() {
  try {
    // 检查数据库连接
    await prisma.$queryRaw`SELECT 1`

    return NextResponse.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'rungame-admin',
      database: 'connected',
      version: process.env.npm_package_version || '1.0.0'
    }, { status: 200 })
  } catch (error) {
    console.error('Health check failed:', error)

    return NextResponse.json({
      status: 'error',
      timestamp: new Date().toISOString(),
      service: 'rungame-admin',
      database: 'disconnected',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 503 })
  }
}
