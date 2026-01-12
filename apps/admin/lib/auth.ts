import { hash, compare } from "bcryptjs"
import { betterAuth } from "better-auth"
import { prismaAdapter } from "better-auth/adapters/prisma"
import { prismaAdmin } from "@/lib/prisma"

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:4000",
  trustedOrigins: [
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:4000",
    "http://127.0.0.1:4000",
    "http://localhost:4000",
  ],
  // 安全配置
  advanced: {
    // 禁用跨子域 cookie
    crossSubDomainCookies: {
      enabled: false,
    },
    // SameSite cookie 设置
    useSameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  },
  // 允许相对路径的 callbackURL（内部路由）
  allowRelativeURLs: true,
  database: prismaAdapter(prismaAdmin, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    password: {
      hash: async (password: string) => {
        return await hash(password, 10);
      },
      verify: async ({ hash: hashStr, password }: { hash: string; password: string }) => {
        return await compare(password, hashStr);
      },
    }
  },
  secret: process.env.BETTER_AUTH_SECRET || "temp_secret_for_build",
  user: {
    modelName: "User", // Maps to 'admins' table via Prisma
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "ADMIN"
      },
      isActive: {
        type: "boolean",
        defaultValue: true
      }
    }
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60 // 5 minutes
    }
  }
})
