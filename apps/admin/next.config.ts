import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  output: 'standalone',
  // 设置 Turbopack 根目录为 Monorepo 根目录
  turbopack: {
    root: '../..',
  },
  // 将 Prisma 和 database 包标记为外部包，避免 Webpack 打包
  // 解决 "node:fs", "node:os" 等 Node.js 内置模块的导入问题
  serverComponentsExternalPackages: [
    '@prisma/client',
    '@rungame/database',
  ],
  // Webpack 配置：处理 node: 协议和外部化 Prisma
  webpack: (config, { isServer }) => {
    if (isServer) {
      // 外部化 Prisma 相关包，避免 Webpack 打包
      config.externals = config.externals || []
      config.externals.push({
        '@prisma/client': 'commonjs @prisma/client',
        '@rungame/database': 'commonjs @rungame/database',
      })
    }
    return config
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

export default nextConfig
