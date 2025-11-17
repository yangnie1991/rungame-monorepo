/**
 * 环境变量验证
 * 在应用启动时检查必需的环境变量
 */

/**
 * 验证必需的环境变量
 * 如果缺少任何必需的环境变量，抛出错误
 * @param buildTimeOnly - 是否只验证构建时必需的变量
 */
export function validateRequiredEnvVars(buildTimeOnly = false) {
  // 构建时必需的环境变量（主要是数据库相关）
  const buildTimeRequired = [
    'DATABASE_URL',
  ]

  // 运行时必需的环境变量（认证、加密等）
  const runtimeRequired = [
    'NEXTAUTH_SECRET',
    'NEXTAUTH_URL',
    'ENCRYPTION_KEY',
  ]

  // 根据阶段选择需要验证的变量
  const required = buildTimeOnly ? buildTimeRequired : [...buildTimeRequired, ...runtimeRequired]

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

生成 ENCRYPTION_KEY:
  openssl rand -base64 48

生成 NEXTAUTH_SECRET:
  openssl rand -base64 32

========================================
`
    throw new Error(message)
  }
}

/**
 * 验证 ENCRYPTION_KEY 的强度
 * 在生产环境中强制要求强密钥
 */
export function validateEncryptionKeyStrength() {
  const key = process.env.ENCRYPTION_KEY!

  // 开发环境只警告，不阻止启动
  if (process.env.NODE_ENV !== 'production') {
    if (key.length < 32) {
      console.warn('⚠️ ENCRYPTION_KEY 长度不足 32 个字符，建议使用更强的密钥')
    }
    return
  }

  // 生产环境严格检查
  if (key.length < 32) {
    throw new Error('生产环境的 ENCRYPTION_KEY 必须至少 32 个字符')
  }

  // 检查密钥复杂度
  const hasUpperCase = /[A-Z]/.test(key)
  const hasLowerCase = /[a-z]/.test(key)
  const hasNumber = /[0-9]/.test(key)
  const hasSpecial = /[^A-Za-z0-9]/.test(key)

  if (!hasUpperCase || !hasLowerCase || !hasNumber || !hasSpecial) {
    console.warn('⚠️ ENCRYPTION_KEY 复杂度不足，建议包含大小写字母、数字和特殊字符')
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

  // 如果显式设置跳过验证，则完全跳过（用于 Docker 构建）
  if (process.env.SKIP_ENV_VALIDATION === 'true') {
    console.log('⏭️ 跳过环境变量验证（SKIP_ENV_VALIDATION=true）')
    return
  }

  // 检测是否为构建阶段
  const isBuildTime =
    process.env.NEXT_PHASE === 'phase-production-build' ||
    process.argv.some(arg => arg.includes('build'))

  try {
    if (isBuildTime) {
      // 构建阶段：只验证构建时必需的环境变量
      console.log('🔨 构建阶段：验证构建时环境变量')
      validateRequiredEnvVars(true) // 只验证 DATABASE_URL
    } else {
      // 运行时阶段：验证所有环境变量
      validateRequiredEnvVars(false) // 验证所有变量
      validateEncryptionKeyStrength()

      if (process.env.NODE_ENV === 'development') {
        console.log('✅ 环境变量验证通过')
      }
    }
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

// 自动执行验证
initEnv()
