import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { prismaAdmin } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { z } from "zod"
import { authConfig } from "./auth.config"

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

// 🔒 安全检查：生产环境必须配置 NEXTAUTH_SECRET
if (process.env.NODE_ENV === 'production' && !process.env.NEXTAUTH_SECRET) {
  throw new Error(
    '🚨 安全错误：生产环境必须配置 NEXTAUTH_SECRET 环境变量！\n' +
    '生成方法: openssl rand -base64 32'
  )
}

console.log('[DEBUG-AUTH] Initializing NextAuth...')
console.log('[DEBUG-AUTH] NEXTAUTH_URL:', process.env.NEXTAUTH_URL)
console.log('[DEBUG-AUTH] AUTH_URL:', process.env.AUTH_URL)
console.log('[DEBUG-AUTH] NODE_ENV:', process.env.NODE_ENV)

const nextAuth = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const { email, password } = loginSchema.parse(credentials)

          const admin = await prismaAdmin.admin.findUnique({
            where: { email },
            select: {
              id: true,
              email: true,
              password: true,
              name: true,
              role: true,
              isActive: true,
            },
          })

          if (!admin || !admin.isActive) {
            return null
          }

          const isValidPassword = await bcrypt.compare(password, admin.password)
          if (!isValidPassword) {
            return null
          }

          // 记录登录时间
          await prismaAdmin.admin.update({
            where: { id: admin.id },
            data: { lastLoginAt: new Date() },
          })

          return {
            id: admin.id,
            email: admin.email,
            name: admin.name || admin.email,
            role: admin.role,
          }
        } catch (error) {
          console.error("Auth error:", error)
          return null
        }
      },
    }),
  ],
})

export const { handlers, signIn, signOut, auth } = nextAuth as any

