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

请在根目录的 .env 文件中配置这些变量。

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
 * 在应用启动时调用
 */
export function initEnv() {
  // 只在服务器端运行
  if (typeof window !== 'undefined') {
    return
  }

  try {
    validateRequiredEnvVars()
    validatePublicEnvVars()
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

// 自动执行验证
initEnv()
