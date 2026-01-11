import type { NextAuthConfig } from "next-auth"

export const authConfig: NextAuthConfig = {
    // 🔐 信任主机
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

    // 🔧 调试模式
    debug: process.env.NODE_ENV === "development",

    providers: [], // 在 auth.ts 中添加具体的 providers

    callbacks: {
        // 自定义重定向逻辑
        async redirect({ url, baseUrl }) {
            if (url.startsWith("/")) return url
            else if (new URL(url).origin === baseUrl) return url
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
}
