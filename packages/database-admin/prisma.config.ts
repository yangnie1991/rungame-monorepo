import { defineConfig, env } from '@prisma/config'

/**
 * Prisma 7 管理数据库配置
 * 管理私有 Admin 数据及缓存数据的 Schema 路径与连接 URL
 */
export default defineConfig({
    schema: './prisma/schema.prisma',
    datasource: {
        // 使用标准 process.env 以便在构建期提供 fallback，运行时仍会读取真实环境变量
        url: process.env.CACHE_DATABASE_URL || 'postgresql://user:pass@localhost:5432/db',
    },
})
