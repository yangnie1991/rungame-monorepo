import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
// import { auth } from "@/lib/auth" 
// import { headers } from "next/headers"

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 1. API路由和登录页面跳过认证检查
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/login") ||
    pathname === "/ads.txt" ||
    pathname === "/robots.txt"
  ) {
    return NextResponse.next()
  }

  // 2. 其他路由（管理后台）需要身份验证
  // 检查 session cookie 是否存在
  const sessionToken = request.cookies.get("better-auth.session_token") ||
    request.cookies.get("__Secure-better-auth.session_token")

  if (!sessionToken) {
    // 未登录，重定向到登录页
    const url = new URL("/login", request.url)
    url.searchParams.set("callbackUrl", pathname)
    return NextResponse.redirect(url)
  }

  // 角色验证将推迟到 layout.tsx 或 page.tsx 中进行

  return NextResponse.next()
}


export const config = {
  matcher: [
    // 匹配所有路径，除了静态文件
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
