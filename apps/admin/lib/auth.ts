import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { prismaAdmin } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { z } from "zod"

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

const nextAuth = NextAuth({
  // 🔐 信任主机（生产环境/反向代理必需）
  // 注意：启用此选项会降低 CSRF 保护，但对于反向代理是必需的
  trustHost: true,

  // 🔑 Session 配置
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 天
    updateAge: 24 * 60 * 60,  // 每 24 小时更新一次 session
  },

  // 📄 自定义页面
  pages: {
    signIn: "/login",
    error: "/login",
  },

  // 🔧 调试模式：仅在开发环境启用
  debug: process.env.NODE_ENV === 'development',

  // 🍪 Cookie 安全配置（增强 CSRF 保护）
  cookies: {
    sessionToken: {
      name: process.env.NODE_ENV === 'production'
        ? '__Secure-next-auth.session-token'
        : 'next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',  // 防止 CSRF 攻击
        path: '/',
        secure: process.env.NODE_ENV === 'production', // 生产环境强制 HTTPS
      },
    },
    callbackUrl: {
      name: process.env.NODE_ENV === 'production'
        ? '__Secure-next-auth.callback-url'
        : 'next-auth.callback-url',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
    csrfToken: {
      name: process.env.NODE_ENV === 'production'
        ? '__Host-next-auth.csrf-token'
        : 'next-auth.csrf-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',  // 关键：防止跨站请求携带 CSRF token
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },

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
  callbacks: {
    // 自定义重定向逻辑（支持多域名访问）
    async redirect({ url, baseUrl }) {
      // 允许相对路径重定向
      if (url.startsWith("/")) return url
      // 允许同域重定向
      else if (new URL(url).origin === baseUrl) return url
      // 默认重定向到 baseUrl
      return baseUrl
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = (user as any).role
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string
        (session.user as any).role = token.role as string
      }
      return session
    },
  },
})

export const { handlers, signIn, signOut, auth } = nextAuth as any
