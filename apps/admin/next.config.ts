import type { NextConfig } from "next"
import path from "path"

const nextConfig: NextConfig = {
  // 移除 standalone 输出，使用标准 Docker 部署
  // output: 'standalone',

  // 设置 Turbopack 根目录为 Monorepo 根目录
  turbopack: {
    root: path.resolve(__dirname, '../../'),
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
      {
        protocol: "https",
        hostname: "cdn.rungame.online",
      },
    ],
  },
}

export default nextConfig
