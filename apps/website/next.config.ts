import type { NextConfig } from "next"
import createNextIntlPlugin from "next-intl/plugin"
import path from "path"

// ⚠️ 环境变量验证已移至运行时（在 middleware.ts 中调用）
// 不再在构建时验证，避免 Docker 构建阶段需要真实的数据库地址
// import './lib/env'

const withNextIntl = createNextIntlPlugin("./i18n/config.ts")

const isDocker = process.env.DOCKER_BUILD === 'true'

const nextConfig: NextConfig = {
  output: isDocker ? 'standalone' : undefined,
  outputFileTracingRoot: isDocker ? path.join(__dirname, '../../') : undefined,
  // 设置 Turbopack 根目录为 Monorepo 根目录
  turbopack: {
    root: path.resolve(__dirname, '../../'),
  },
  typescript: {
    // 强制检查 TS 错误
    ignoreBuildErrors: false,
  },

  async redirects() {
    return []
  },
  images: {
    remotePatterns: [
      // 游戏平台图片
      {
        protocol: "https",
        hostname: "img.gamepix.com",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
      },
      {
        protocol: "https",
        hostname: "**.cloudflare.com",
      },
      {
        protocol: "https",
        hostname: "cdn.jsdelivr.net",
      },
      {
        protocol: "https",
        hostname: "img.gamedistribution.com",
      },
      {
        protocol: "https",
        hostname: "html5.gamedistribution.com",
      },
      // Cloudflare R2 CDN (自定义域名)
      {
        protocol: "https",
        hostname: "pub-*.r2.dev",
      },
    ],
  },
}

export default withNextIntl(nextConfig)
