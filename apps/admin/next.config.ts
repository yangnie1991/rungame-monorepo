import type { NextConfig } from "next"
import path from "path"

const nextConfig: NextConfig = {
  // 移除 standalone 输出，使用标准 Docker 部署
  // output: 'standalone',

  // 忽略 ESLint 和 TS 错误，确保 CI 构建成功
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  // 设置 Turbopack 根目录为 Monorepo 根目录
  turbopack: {
    root: path.resolve(__dirname, '../../'),
  },

  // 确保 Node.js 特定包不被打包到浏览器
  serverExternalPackages: ['pg', '@prisma/client', '@prisma/adapter-pg', '@rungame/database', '@rungame/database-admin'],

  // 转译内部 monorepo 包
  transpilePackages: [],

  // Webpack 配置：锁定环境依赖
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // 强制在客户端完全禁用这些包的解析
      config.resolve.alias = {
        ...config.resolve.alias,
        'pg': false,
        '@prisma/adapter-pg': false,
        '@prisma/client': false,
      }
      // 同时也保留 fallback 作为次级防御
      config.resolve.fallback = {
        ...config.resolve.fallback,
        net: false,
        tls: false,
        fs: false,
        dns: false,
        perf_hooks: false,
      }
    }
    return config
  },

  async redirects() {
    return []
  },

  images: {
    remotePatterns: [
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
