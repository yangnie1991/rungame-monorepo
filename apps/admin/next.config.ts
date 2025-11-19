import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  output: 'standalone',
  // 设置 Turbopack 根目录为 Monorepo 根目录
  turbopack: {
    root: '../..',
  },
  // 转译内部 monorepo 包（JIT 模式下的 TypeScript 源文件）
  transpilePackages: ['@rungame/database'],
  // Webpack 配置：外部化 Prisma Client
  webpack: (config, { isServer }) => {
    if (isServer) {
      // 仅外部化 Prisma Client（@rungame/database 由 transpilePackages 处理）
      config.externals = config.externals || []
      config.externals.push({
        '@prisma/client': 'commonjs @prisma/client',
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
