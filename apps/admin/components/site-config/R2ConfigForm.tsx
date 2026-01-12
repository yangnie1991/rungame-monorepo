'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { updateR2ConfigAction, type R2ConfigData } from '@/app/(dashboard)/site-config/actions'
import { Loader2, Save, Eye, EyeOff, AlertCircle, CheckCircle2, Cloud } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

const r2ConfigSchema = z.object({
  accountId: z.string().min(1, "Account ID 不能为空"),
  accessKeyId: z.string().min(1, "Access Key ID 不能为空"),
  secretAccessKey: z.string().min(1, "Secret Access Key 不能为空"),
  bucketName: z.string().min(1, "Bucket Name 不能为空"),
  publicUrl: z.string().optional().or(z.literal('')),
})

type R2ConfigFormData = z.infer<typeof r2ConfigSchema>

interface R2ConfigFormProps {
  config: {
    id: string
    name: string
    displayName: string
    description: string | null
    provider: string
    apiConfig: {
      accountId: string
      accessKeyId: string
      secretAccessKey: string
      bucketName: string
      publicUrl?: string
    }
    isEnabled: boolean
    isActive: boolean
    totalCalls: number
    successCalls: number
    failedCalls: number
    lastUsedAt: Date | null
  }
}

export function R2ConfigForm({ config }: R2ConfigFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isSaving, setIsSaving] = useState(false)
  const [showAccessKey, setShowAccessKey] = useState(false)
  const [showSecretKey, setShowSecretKey] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<R2ConfigFormData>({
    resolver: zodResolver(r2ConfigSchema) as any,
    defaultValues: {
      accountId: config.apiConfig.accountId || '',
      accessKeyId: config.apiConfig.accessKeyId || '',
      secretAccessKey: config.apiConfig.secretAccessKey || '',
      bucketName: config.apiConfig.bucketName || '',
      publicUrl: config.apiConfig.publicUrl || '',
    },
  })

  const onSubmit = async (data: R2ConfigFormData) => {
    setIsSaving(true)

    try {
      const result = await updateR2ConfigAction(data)

      if (result.success) {
        toast({
          title: '保存成功',
          description: 'R2 配置已更新',
        })
        router.refresh()
      } else {
        toast({
          title: '保存失败',
          description: result.error,
          variant: 'destructive',
        })
      }
    } catch (error) {
      toast({
        title: '保存失败',
        description: error instanceof Error ? error.message : '未知错误',
        variant: 'destructive',
      })
    } finally {
      setIsSaving(false)
    }
  }

  const successRate = config.totalCalls > 0
    ? Math.round((config.successCalls / config.totalCalls) * 100)
    : 0

  return (
    <div className="space-y-6">
      {/* 配置状态卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">状态</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              {config.isActive ? (
                <>
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span className="text-lg font-semibold text-green-600">已启用</span>
                </>
              ) : (
                <>
                  <AlertCircle className="h-4 w-4 text-gray-400" />
                  <span className="text-lg font-semibold text-gray-600">未启用</span>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">总调用次数</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-gray-900">{config.totalCalls}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">成功率</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">{successRate}%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">最后使用</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              {config.lastUsedAt
                ? new Date(config.lastUsedAt).toLocaleString('zh-CN')
                : '从未使用'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 配置表单 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cloud className="h-5 w-5" />
            R2 连接配置
          </CardTitle>
          <CardDescription>
            配置 Cloudflare R2 对象存储的访问凭证
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Account ID */}
            <div className="space-y-2">
              <Label htmlFor="accountId">
                Account ID
                <span className="text-red-500 ml-1">*</span>
              </Label>
              <Input
                id="accountId"
                {...register('accountId')}
                placeholder="例如: a1b2c3d4e5f6g7h8i9j0"
                className={errors.accountId ? 'border-red-500' : ''}
              />
              {errors.accountId && (
                <p className="text-sm text-red-500">{errors.accountId.message}</p>
              )}
              <p className="text-xs text-gray-500">
                在 Cloudflare Dashboard → R2 → 概述 中查找
              </p>
            </div>

            {/* Access Key ID */}
            <div className="space-y-2">
              <Label htmlFor="accessKeyId">
                Access Key ID
                <span className="text-red-500 ml-1">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="accessKeyId"
                  type={showAccessKey ? 'text' : 'password'}
                  {...register('accessKeyId')}
                  placeholder={config.apiConfig.accessKeyId ? '••••••••••••••••' : '输入 Access Key ID'}
                  className={errors.accessKeyId ? 'border-red-500' : ''}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowAccessKey(!showAccessKey)}
                >
                  {showAccessKey ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {errors.accessKeyId && (
                <p className="text-sm text-red-500">{errors.accessKeyId.message}</p>
              )}
              <p className="text-xs text-gray-500">
                在 R2 → 管理 R2 API 令牌 中创建
              </p>
            </div>

            {/* Secret Access Key */}
            <div className="space-y-2">
              <Label htmlFor="secretAccessKey">
                Secret Access Key
                <span className="text-red-500 ml-1">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="secretAccessKey"
                  type={showSecretKey ? 'text' : 'password'}
                  {...register('secretAccessKey')}
                  placeholder={config.apiConfig.secretAccessKey ? '••••••••••••••••' : '输入 Secret Access Key'}
                  className={errors.secretAccessKey ? 'border-red-500' : ''}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowSecretKey(!showSecretKey)}
                >
                  {showSecretKey ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {errors.secretAccessKey && (
                <p className="text-sm text-red-500">{errors.secretAccessKey.message}</p>
              )}
              <p className="text-xs text-gray-500">
                创建 API 令牌时显示，请妥善保管
              </p>
            </div>

            {/* Bucket Name */}
            <div className="space-y-2">
              <Label htmlFor="bucketName">
                Bucket Name
                <span className="text-red-500 ml-1">*</span>
              </Label>
              <Input
                id="bucketName"
                {...register('bucketName')}
                placeholder="例如: my-game-assets"
                className={errors.bucketName ? 'border-red-500' : ''}
              />
              {errors.bucketName && (
                <p className="text-sm text-red-500">{errors.bucketName.message}</p>
              )}
              <p className="text-xs text-gray-500">
                在 R2 中创建的存储桶名称
              </p>
            </div>

            {/* Public URL (可选) */}
            <div className="space-y-2">
              <Label htmlFor="publicUrl">
                Public URL（可选）
              </Label>
              <Input
                id="publicUrl"
                {...register('publicUrl')}
                placeholder="例如: cdn.yourdomain.com"
                className={errors.publicUrl ? 'border-red-500' : ''}
              />
              {errors.publicUrl && (
                <p className="text-sm text-red-500">{errors.publicUrl.message}</p>
              )}
              <p className="text-xs text-gray-500">
                自定义域名（不含 https://），留空则使用 R2 默认域名
              </p>
            </div>

            {/* 安全提示 */}
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>安全提示：</strong>
                <ul className="mt-2 space-y-1 text-sm">
                  <li>• API 密钥会自动加密存储在数据库中</li>
                  <li>• 显示的掩码值（••••）表示已保存的密钥</li>
                  <li>• 输入新密钥会覆盖原有配置</li>
                  <li>• 请勿在前端代码或版本控制中暴露密钥</li>
                </ul>
              </AlertDescription>
            </Alert>

            {/* 提交按钮 */}
            <div className="flex justify-end">
              <Button type="submit" disabled={isSaving}>
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    保存中...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    保存配置
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* 使用说明 */}
      <Card>
        <CardHeader>
          <CardTitle>使用说明</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">1. 创建 R2 存储桶</h4>
            <p className="text-sm text-gray-600">
              登录 Cloudflare Dashboard → R2 → 创建存储桶
            </p>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-2">2. 创建 API 令牌</h4>
            <p className="text-sm text-gray-600">
              R2 → 管理 R2 API 令牌 → 创建 API 令牌 → 选择"对象读取和写入"权限
            </p>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-2">3. 配置自定义域名（可选）</h4>
            <p className="text-sm text-gray-600">
              在存储桶设置中绑定自定义域名，可加速访问并隐藏 R2 默认域名
            </p>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-2">4. 测试配置</h4>
            <p className="text-sm text-gray-600">
              保存配置后，尝试上传一张图片到分类或游戏，验证是否正常工作
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
