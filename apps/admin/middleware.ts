import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { auth } from "@/lib/auth"

export async function middleware(request: NextRequest) {
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

  // 2. 管理后台路由需要身份验证
  if (pathname.startsWith("/admin")) {
    const session = await auth()

    if (!session) {
      // 未登录，重定向到登录页
      const url = new URL("/login", request.url)
      url.searchParams.set("callbackUrl", pathname)
      return NextResponse.redirect(url)
    }

    // 检查角色权限
    if (session.user.role !== "ADMIN" && session.user.role !== "SUPER_ADMIN") {
      return NextResponse.json(
        { error: "Forbidden: Insufficient permissions" },
        { status: 403 }
      )
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // 匹配所有路径，除了静态文件
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
