/**
 * 环境变量验证初始化
 * 此文件在应用启动时被导入，只执行一次验证
 * 在根布局中导入以确保在应用实际运行时验证环境变量
 */

import { initEnv } from './env'

// 在服务器启动时执行验证
// Docker 构建时跳过（SKIP_ENV_VALIDATION=true）
if (typeof window === 'undefined' && process.env.SKIP_ENV_VALIDATION !== 'true') {
  initEnv()
}
