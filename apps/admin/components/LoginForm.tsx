"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { authClient } from "@/lib/auth-client"

const loginSchema = z.object({
  email: z.string().email("请输入有效的邮箱地址"),
  password: z.string().min(6, "密码至少6个字符"),
})

type LoginFormValues = z.infer<typeof loginSchema>

export function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema) as any,
  })

  async function onSubmit(data: LoginFormValues) {
    setIsLoading(true)

    try {
      await authClient.signIn.email({
        email: data.email,
        password: data.password,
        callbackURL: searchParams.get("callbackUrl") || "/",
      }, {
        onRequest: () => {
          setIsLoading(true)
        },
        onSuccess: () => {
          toast.success("登录成功")
          router.refresh()
        },
        onError: (ctx) => {
          toast.error("登录失败", {
            description: ctx.error.message || "邮箱或密码错误",
          })
          setIsLoading(false)
        }
      })
    } catch (error) {
      // 处理网络错误或其他未捕获的错误
      const errorMessage = error instanceof Error ? error.message : "网络连接失败"
      toast.error("登录失败", {
        description: errorMessage === "Failed to fetch"
          ? "无法连接到服务器，请检查网络连接或稍后重试"
          : errorMessage,
      })
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">邮箱</Label>
        <Input
          id="email"
          type="email"
          placeholder="admin@example.com"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">密码</Label>
        <Input
          id="password"
          type="password"
          placeholder="••••••"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "登录中..." : "登录"}
      </Button>
    </form>
  )
}
