import type { NextConfig } from "next"
import createNextIntlPlugin from "next-intl/plugin"

// 验证必需的环境变量
import './lib/env'

const withNextIntl = createNextIntlPlugin("./i18n/config.ts")

const nextConfig: NextConfig = {
  output: 'standalone',
  // 设置 Turbopack 根目录为 Monorepo 根目录
  turbopack: {
    root: '../..',
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // 强制清除缓存
  generateBuildId: async () => {
    // 使用时间戳作为 build ID，确保每次构建都是新的
    return `build-${Date.now()}`
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
