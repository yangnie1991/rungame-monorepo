import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"

/**
 * Admin 应用根页面
 * 根据登录状态重定向到合适的页面
 */
export default async function AdminHomePage() {
  const session = await auth()

  if (!session) {
    // 未登录，重定向到登录页
    redirect("/login")
  }

  // 已登录，重定向到管理后台
  redirect("/admin")
}
