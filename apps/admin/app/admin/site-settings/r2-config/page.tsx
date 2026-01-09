import { Suspense } from 'react'
import { Cloud } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { R2ConfigForm } from '@/components/site-config/R2ConfigForm'
import { getR2ConfigAction } from '@/app/admin/site-config/actions'

async function R2ConfigContent() {
  const config = await getR2ConfigAction()

  // 如果配置不存在，使用默认空配置
  const defaultConfig = {
    id: '',
    name: 'cloudflare_r2',
    displayName: 'Cloudflare R2 CDN',
    description: '用于存储游戏图片、分类图标等静态资源',
    provider: 'cloudflare',
    apiConfig: {
      accountId: '',
      accessKeyId: '',
      secretAccessKey: '',
      bucketName: '',
      publicUrl: '',
    },
    isEnabled: false,
    isActive: false,
    totalCalls: 0,
    successCalls: 0,
    failedCalls: 0,
    lastUsedAt: null,
  }

  return <R2ConfigForm config={(config || defaultConfig) as any} />
}

export default function R2ConfigPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Cloud className="h-8 w-8 text-gray-700" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Cloudflare R2 配置</h1>
          <p className="text-gray-600 mt-1">管理 R2 对象存储配置，用于图片和静态资源</p>
        </div>
      </div>

      <Suspense
        fallback={
          <Card>
            <CardContent className="py-8 text-center text-gray-600">
              加载配置中...
            </CardContent>
          </Card>
        }
      >
        <R2ConfigContent />
      </Suspense>
    </div>
  )
}
