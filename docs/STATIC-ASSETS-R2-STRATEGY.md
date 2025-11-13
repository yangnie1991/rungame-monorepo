# 静态资源 R2 动态管理方案

> **创建时间**: 2025-11-14
> **核心思路**: 静态资源动态链接到 R2，支持后端动态修改

## 🎯 核心目标

### 当前问题

**方案 V3 中的静态文件处理**：
```
packages/ui/public/logo/       # Logo 文件放在这里
├── logo-rungame.svg
├── logo-rungame-white.svg
└── *.png
```

**问题**：
- ❌ Logo 修改需要重新部署
- ❌ 无法在管理后台动态更换
- ❌ 不统一（游戏图片在 R2，Logo 在本地）
- ❌ 没有 CDN 加速

### 新方案：R2 动态资源

```
R2 存储结构：
rungame-assets/
├── branding/              # 品牌资源
│   ├── logo/
│   │   ├── logo-main.svg
│   │   ├── logo-white.svg
│   │   ├── logo-*.png
│   │   └── favicon.ico
│   ├── icons/
│   │   ├── category-*.svg
│   │   └── tag-*.svg
│   └── og-templates/
│       └── default-og.png
│
├── games/                 # 游戏资源
│   ├── thumbnails/
│   └── screenshots/
│
└── uploads/              # 用户上传
    └── ...
```

**优势**：
- ✅ 管理后台可以动态更换 Logo
- ✅ 统一的资源管理
- ✅ CDN 加速
- ✅ 无需重新部署

## 🏗️ 架构设计

### 1. 数据库配置表

```prisma
// prisma/schema.prisma

model SiteAssets {
  id        String   @id @default(cuid())
  key       String   @unique  // 如: 'logo-main', 'logo-white', 'favicon'
  type      AssetType         // LOGO, ICON, IMAGE, FILE
  url       String            // R2 完整 URL
  cdnUrl    String?           // CDN URL（如果有）
  filename  String
  mimeType  String
  size      Int               // 文件大小（字节）
  width     Int?              // 图片宽度
  height    Int?              // 图片高度
  isActive  Boolean  @default(true)
  metadata  Json?             // 额外元数据
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([key])
  @@index([type])
}

enum AssetType {
  LOGO
  ICON
  IMAGE
  FILE
  OG_IMAGE
}

model SiteConfig {
  id    String @id @default(cuid())
  key   String @unique
  value Json

  @@index([key])
}
```

### 2. R2 存储配置

```typescript
// apps/admin/lib/r2-assets.ts

import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'

const r2Client = new S3Client({
  region: 'auto',
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
})

// 资源路径生成器
export function getAssetPath(type: string, filename: string) {
  const paths = {
    logo: 'branding/logo',
    icon: 'branding/icons',
    'og-template': 'branding/og-templates',
    game: 'games/thumbnails',
    upload: 'uploads',
  }

  const basePath = paths[type] || 'uploads'
  return `${basePath}/${filename}`
}

// 上传资源
export async function uploadAssetToR2(
  file: File,
  type: string,
  key: string
) {
  const filename = `${key}-${Date.now()}.${file.name.split('.').pop()}`
  const path = getAssetPath(type, filename)

  const command = new PutObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME!,
    Key: path,
    Body: Buffer.from(await file.arrayBuffer()),
    ContentType: file.type,
  })

  await r2Client.send(command)

  // 返回 URL
  const cdnUrl = `${process.env.R2_PUBLIC_URL}/${path}`
  return {
    url: cdnUrl,
    path,
    filename,
  }
}

// 删除资源
export async function deleteAssetFromR2(path: string) {
  const command = new DeleteObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME!,
    Key: path,
  })

  await r2Client.send(command)
}
```

### 3. Admin 管理界面

```typescript
// apps/admin/app/(admin)/admin/assets/page.tsx

'use client'

import { useState } from 'react'
import { Button } from '@rungame/ui'
import { Upload } from 'lucide-react'

export default function AssetsManagementPage() {
  const [uploading, setUploading] = useState(false)

  const handleUploadLogo = async (file: File, key: string) => {
    setUploading(true)

    const formData = new FormData()
    formData.append('file', file)
    formData.append('key', key)
    formData.append('type', 'logo')

    const response = await fetch('/api/admin/assets/upload', {
      method: 'POST',
      body: formData,
    })

    const result = await response.json()

    if (result.success) {
      toast.success('Logo 上传成功')
      // 刷新资源列表
    }

    setUploading(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">资源管理</h1>
      </div>

      {/* Logo 管理 */}
      <Card>
        <CardHeader>
          <CardTitle>Logo 管理</CardTitle>
          <CardDescription>
            上传和管理网站 Logo
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* 主 Logo */}
          <div className="flex items-center gap-4">
            <div className="w-32 h-32 border rounded flex items-center justify-center">
              <Image
                src={currentAssets['logo-main']?.url || '/placeholder.svg'}
                alt="主 Logo"
                width={128}
                height={128}
              />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">主 Logo</h3>
              <p className="text-sm text-muted-foreground mb-2">
                深色背景使用的 Logo
              </p>
              <input
                type="file"
                accept="image/svg+xml,image/png"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) handleUploadLogo(file, 'logo-main')
                }}
                className="hidden"
                id="logo-main-upload"
              />
              <label htmlFor="logo-main-upload">
                <Button variant="outline" disabled={uploading}>
                  <Upload className="mr-2 h-4 w-4" />
                  上传新 Logo
                </Button>
              </label>
            </div>
          </div>

          {/* 白色 Logo */}
          <div className="flex items-center gap-4">
            <div className="w-32 h-32 border rounded bg-gray-900 flex items-center justify-center">
              <Image
                src={currentAssets['logo-white']?.url || '/placeholder.svg'}
                alt="白色 Logo"
                width={128}
                height={128}
              />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">白色 Logo</h3>
              <p className="text-sm text-muted-foreground mb-2">
                浅色背景使用的 Logo
              </p>
              <input
                type="file"
                accept="image/svg+xml,image/png"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) handleUploadLogo(file, 'logo-white')
                }}
                className="hidden"
                id="logo-white-upload"
              />
              <label htmlFor="logo-white-upload">
                <Button variant="outline" disabled={uploading}>
                  <Upload className="mr-2 h-4 w-4" />
                  上传新 Logo
                </Button>
              </label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 其他资源管理 */}
    </div>
  )
}
```

### 4. Admin API 端点

```typescript
// apps/admin/app/api/admin/assets/upload/route.ts

import { NextRequest } from 'next/server'
import { uploadAssetToR2 } from '@/lib/r2-assets'
import { prisma } from '@rungame/database'
import { auth } from '@/lib/auth'

export async function POST(request: NextRequest) {
  // 验证权限
  const session = await auth()
  if (!session || session.user.role !== 'SUPER_ADMIN') {
    return Response.json({ error: 'Forbidden' }, { status: 403 })
  }

  const formData = await request.formData()
  const file = formData.get('file') as File
  const key = formData.get('key') as string
  const type = formData.get('type') as string

  if (!file || !key || !type) {
    return Response.json({ error: 'Missing required fields' }, { status: 400 })
  }

  try {
    // 上传到 R2
    const { url, path, filename } = await uploadAssetToR2(file, type, key)

    // 获取图片尺寸（如果是图片）
    let width: number | undefined
    let height: number | undefined

    if (file.type.startsWith('image/')) {
      // 使用 sharp 或其他库获取尺寸
      // const metadata = await sharp(buffer).metadata()
      // width = metadata.width
      // height = metadata.height
    }

    // 保存到数据库
    const asset = await prisma.siteAssets.upsert({
      where: { key },
      update: {
        url,
        cdnUrl: url,
        filename,
        mimeType: file.type,
        size: file.size,
        width,
        height,
        updatedAt: new Date(),
      },
      create: {
        key,
        type: type.toUpperCase() as any,
        url,
        cdnUrl: url,
        filename,
        mimeType: file.type,
        size: file.size,
        width,
        height,
      },
    })

    return Response.json({
      success: true,
      asset,
    })
  } catch (error) {
    console.error('Upload error:', error)
    return Response.json(
      { error: 'Upload failed' },
      { status: 500 }
    )
  }
}
```

### 5. Website 使用资源

#### 方案 A：服务端查询（推荐）

```typescript
// apps/website/lib/assets.ts

import { prisma } from '@rungame/database'
import { unstable_cache } from 'next/cache'

/**
 * 获取站点资源
 * 使用长缓存（1小时）
 */
const getAssetByKey = unstable_cache(
  async (key: string) => {
    const asset = await prisma.siteAssets.findUnique({
      where: { key, isActive: true },
    })

    return asset?.cdnUrl || asset?.url
  },
  ['site-asset'],
  {
    revalidate: 3600, // 1 小时
    tags: ['assets'],
  }
)

// 导出常用资源 getter
export async function getLogoUrl() {
  return await getAssetByKey('logo-main') || '/fallback-logo.svg'
}

export async function getLogoWhiteUrl() {
  return await getAssetByKey('logo-white') || '/fallback-logo-white.svg'
}

export async function getFaviconUrl() {
  return await getAssetByKey('favicon') || '/favicon.ico'
}

// 获取所有资源（一次查询）
export async function getAllAssets() {
  const assets = await prisma.siteAssets.findMany({
    where: { isActive: true },
  })

  const assetMap = new Map()
  assets.forEach(asset => {
    assetMap.set(asset.key, asset.cdnUrl || asset.url)
  })

  return assetMap
}
```

#### 方案 B：客户端查询（性能较低）

```typescript
// apps/website/app/api/assets/[key]/route.ts

export async function GET(
  request: Request,
  { params }: { params: { key: string } }
) {
  const asset = await prisma.siteAssets.findUnique({
    where: { key: params.key, isActive: true },
  })

  if (!asset) {
    return Response.json({ error: 'Not found' }, { status: 404 })
  }

  return Response.json({
    url: asset.cdnUrl || asset.url,
  })
}
```

#### 使用示例

```typescript
// apps/website/components/site/Header.tsx

import Image from 'next/image'
import { getLogoUrl } from '@/lib/assets'

export async function Header() {
  const logoUrl = await getLogoUrl()

  return (
    <header>
      <Image
        src={logoUrl}
        alt="RunGame"
        width={120}
        height={40}
        priority
      />
    </header>
  )
}
```

```typescript
// apps/website/app/[locale]/layout.tsx

import { getFaviconUrl, getAllAssets } from '@/lib/assets'

export async function generateMetadata() {
  const faviconUrl = await getFaviconUrl()

  return {
    icons: {
      icon: faviconUrl,
      apple: faviconUrl,
    },
  }
}
```

## 📂 修正后的 Monorepo 结构

```
packages/
├── database/                   # 🟢 最小共享
│   ├── prisma/
│   │   ├── schema.prisma      # ✅ 包含 SiteAssets 表
│   │   └── seed.ts
│   └── src/
│       ├── index.ts
│       └── client.ts          # ✅ 只导出 PrismaClient
│
└── ui/                        # 🟢 UI 组件（无 Logo）
    ├── src/
    │   ├── components/ui/     # shadcn/ui 组件
    │   ├── lib/utils.ts       # cn() 工具
    │   └── index.ts
    ├── public/                # ❌ 移除 logo/（改用 R2）
    │   └── placeholder.svg    # ✅ 只保留占位图
    └── package.json

apps/admin/
├── app/
│   ├── (admin)/admin/
│   │   ├── assets/           # 🆕 资源管理页面
│   │   │   ├── page.tsx
│   │   │   └── components/
│   │   └── ...
│   └── api/admin/assets/    # 🆕 资源管理 API
│       ├── upload/
│       ├── delete/
│       └── list/
│
└── lib/
    └── r2-assets.ts          # 🆕 R2 资源管理

apps/website/
└── lib/
    └── assets.ts             # 🆕 资源获取函数
```

## 🔄 资源回退策略

### 1. 数据库默认资源

```typescript
// prisma/seed.ts

async function seedAssets() {
  const defaultAssets = [
    {
      key: 'logo-main',
      type: 'LOGO',
      url: 'https://cdn.rungame.online/branding/logo/logo-main.svg',
      cdnUrl: 'https://cdn.rungame.online/branding/logo/logo-main.svg',
      filename: 'logo-main.svg',
      mimeType: 'image/svg+xml',
      size: 5120,
      isActive: true,
    },
    {
      key: 'logo-white',
      type: 'LOGO',
      url: 'https://cdn.rungame.online/branding/logo/logo-white.svg',
      cdnUrl: 'https://cdn.rungame.online/branding/logo/logo-white.svg',
      filename: 'logo-white.svg',
      mimeType: 'image/svg+xml',
      size: 5120,
      isActive: true,
    },
    {
      key: 'favicon',
      type: 'ICON',
      url: 'https://cdn.rungame.online/branding/logo/favicon.ico',
      cdnUrl: 'https://cdn.rungame.online/branding/logo/favicon.ico',
      filename: 'favicon.ico',
      mimeType: 'image/x-icon',
      size: 15406,
      isActive: true,
    },
  ]

  for (const asset of defaultAssets) {
    await prisma.siteAssets.upsert({
      where: { key: asset.key },
      update: asset,
      create: asset,
    })
  }
}
```

### 2. 本地开发回退

```typescript
// apps/website/lib/assets.ts

export async function getLogoUrl() {
  try {
    const url = await getAssetByKey('logo-main')
    return url || '/fallback-logo.svg' // 本地回退
  } catch (error) {
    console.error('Failed to get logo:', error)
    return '/fallback-logo.svg'
  }
}
```

### 3. 环境变量配置

```env
# apps/admin/.env
R2_ENDPOINT="https://xxx.r2.cloudflarestorage.com"
R2_ACCESS_KEY_ID="xxx"
R2_SECRET_ACCESS_KEY="xxx"
R2_BUCKET_NAME="rungame-assets"
R2_PUBLIC_URL="https://cdn.rungame.online"

# apps/website/.env
# Website 只需要读取，不需要 R2 凭证
```

## 🚀 迁移步骤

### 步骤 1：上传现有资源到 R2

```bash
# 使用 AWS CLI 或 rclone 上传现有 Logo
aws s3 cp public/logo/logo-rungame.svg \
  s3://rungame-assets/branding/logo/logo-main.svg \
  --endpoint-url https://xxx.r2.cloudflarestorage.com

aws s3 cp public/logo/logo-rungame-white.svg \
  s3://rungame-assets/branding/logo/logo-white.svg \
  --endpoint-url https://xxx.r2.cloudflarestorage.com

# 或使用管理界面上传
```

### 步骤 2：更新数据库 Schema

```bash
cd packages/database

# 添加 SiteAssets 模型到 schema.prisma
# 运行迁移
pnpm run db:push

# 填充默认数据
pnpm run db:seed
```

### 步骤 3：开发 Admin 管理界面

```bash
cd apps/admin

# 创建资源管理页面
# 创建上传 API
# 测试上传功能
```

### 步骤 4：更新 Website 使用

```bash
cd apps/website

# 创建 lib/assets.ts
# 更新所有使用 Logo 的组件
# 测试资源加载
```

### 步骤 5：清理旧文件

```bash
# 删除 packages/ui/public/logo/
# 删除其他不需要的静态文件
```

## ✅ 优势总结

### 1. 动态管理
- ✅ 管理后台可以随时更换 Logo
- ✅ 无需重新部署前端
- ✅ 实时生效

### 2. 统一管理
- ✅ 所有资源都在 R2
- ✅ 统一的上传和管理界面
- ✅ 版本控制和历史记录

### 3. 性能优化
- ✅ CDN 加速
- ✅ 缓存策略（1小时）
- ✅ 减少服务器压力

### 4. 扩展性
- ✅ 支持多套主题 Logo
- ✅ 支持 A/B 测试
- ✅ 支持品牌升级

### 5. 成本
- ✅ R2 存储成本极低
- ✅ 流量成本低
- ✅ 无需额外服务

## 📊 性能对比

| 方案 | 加载速度 | 可维护性 | 灵活性 | CDN |
|------|---------|---------|--------|-----|
| **本地静态** | 快 | ❌ 需要重新部署 | ❌ 固定 | ❌ |
| **R2 动态** | 快 | ✅ 管理后台修改 | ✅ 动态 | ✅ |

## 🔐 安全考虑

### 1. 上传权限
```typescript
// 只有 SUPER_ADMIN 可以上传
if (session.user.role !== 'SUPER_ADMIN') {
  return Response.json({ error: 'Forbidden' }, { status: 403 })
}
```

### 2. 文件类型验证
```typescript
const allowedTypes = ['image/svg+xml', 'image/png', 'image/jpeg', 'image/webp']
if (!allowedTypes.includes(file.type)) {
  return Response.json({ error: 'Invalid file type' }, { status: 400 })
}
```

### 3. 文件大小限制
```typescript
const maxSize = 5 * 1024 * 1024 // 5MB
if (file.size > maxSize) {
  return Response.json({ error: 'File too large' }, { status: 400 })
}
```

### 4. R2 访问控制
```typescript
// 使用 R2 的 CORS 和访问控制
// 只允许 website 域名访问
```

## 📝 环境变量更新

### apps/admin/.env.example
```env
# R2 存储（完整权限）
R2_ENDPOINT="https://xxx.r2.cloudflarestorage.com"
R2_ACCESS_KEY_ID="xxx"
R2_SECRET_ACCESS_KEY="xxx"
R2_BUCKET_NAME="rungame-assets"
R2_PUBLIC_URL="https://cdn.rungame.online"
```

### apps/website/.env.example
```env
# Website 不需要 R2 凭证
# 只通过数据库查询 URL
DATABASE_URL="postgresql://..."
```

---

**总结**：
- ✅ 所有静态资源（Logo、图标等）动态存储在 R2
- ✅ 管理后台可以随时修改，无需重新部署
- ✅ Website 通过数据库查询 + 缓存获取资源 URL
- ✅ 统一管理，CDN 加速，成本低廉
