/**
 * 环境变量验证
 * 在应用启动时检查必需的环境变量
 */

/**
 * 验证必需的环境变量
 * 如果缺少任何必需的环境变量，抛出错误
 */
export function validateRequiredEnvVars() {
  const required = [
    'DATABASE_URL',
  ]

  const missing: string[] = []

  for (const envVar of required) {
    if (!process.env[envVar]) {
      missing.push(envVar)
    }
  }

  if (missing.length > 0) {
    const message = `
========================================
❌ 缺少必需的环境变量
========================================

缺少以下环境变量：
${missing.map(v => `  • ${v}`).join('\n')}

请在 .env.local 文件中配置这些变量。

参考 .env.example 文件获取配置示例。

========================================
`
    throw new Error(message)
  }
}

/**
 * 验证公共环境变量
 * Website 端不需要认证和加密相关的环境变量
 */
export function validatePublicEnvVars() {
  // Website 端只需要验证必需的数据库连接
  // 其他变量（如 NEXT_PUBLIC_* 变量）由 Next.js 自动处理

  if (process.env.NODE_ENV === 'development') {
    console.log('✅ Website 环境变量验证通过')
  }
}

/**
 * 初始化环境变量验证
 * 只在应用实际运行时调用（不在构建时调用）
 */
export function initEnv() {
  // 只在服务器端运行
  if (typeof window !== 'undefined') {
    return
  }

  // 构建阶段跳过验证
  // Next.js 构建时会设置这些环境变量
  if (
    process.env.NEXT_PHASE === 'phase-production-build' ||
    process.env.NEXT_PHASE === 'phase-development-build' ||
    // Turbo 构建标识
    process.env.TURBOPACK === '1' ||
    // CI 环境但没有运行时环境变量的情况
    (process.env.CI && !process.env.DATABASE_URL)
  ) {
    console.log('⏭️  构建阶段，跳过环境变量验证')
    return
  }

  // 直接执行验证，让错误向上抛出
  // 不使用 process.exit()，因为它在 Edge Runtime（middleware）中不被支持
  validateRequiredEnvVars()
  validatePublicEnvVars()
}

// ⚠️ 不再自动执行验证！
// 验证将在应用实际启动时进行（在 middleware.ts 或 layout.tsx 中调用）
// 这样可以避免在 Docker 构建阶段执行验证
// initEnv()
