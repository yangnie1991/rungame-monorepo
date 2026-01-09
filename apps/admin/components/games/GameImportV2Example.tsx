/**
 * 游戏导入示例组件（v2 版本）
 *
 * 展示如何使用新的 useGameImportV2 Hook 和改进的导入流程
 *
 * 主要改进：
 * 1. 预检查游戏冲突
 * 2. 详细的图片上传状态（成功/跳过/失败）
 * 3. 支持重试失败的图片
 * 4. 更好的错误处理
 */

'use client'

import { useState } from 'react'
import { useGameImportV2 } from '@/hooks/useGameImportV2'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Loader2, CheckCircle2, XCircle, Clock, AlertCircle, RefreshCw } from 'lucide-react'

interface GameImportV2ExampleProps {
  game: any // GamePixGameItem
  config: any // ImportConfig
  open: boolean
  onClose: () => void
  onSuccess?: (gameId: string) => void
}

export function GameImportV2Example({
  game,
  config,
  open,
  onClose,
  onSuccess,
}: GameImportV2ExampleProps) {
  const {
    status,
    progress,
    images,
    warnings,
    conflict,
    result,
    importGame,
    retryFailedImages,
    reset,
  } = useGameImportV2()

  const [isRetrying, setIsRetrying] = useState(false)

  // 开始导入
  const handleImport = async () => {
    try {
      const result = await importGame(game, config)
      if (result.success && result.gameId) {
        onSuccess?.(result.gameId)
      }
    } catch (error) {
      console.error('导入失败:', error)
    }
  }

  // 重试失败的图片
  const handleRetry = async () => {
    setIsRetrying(true)
    try {
      await retryFailedImages()
    } catch (error) {
      console.error('重试失败:', error)
    } finally {
      setIsRetrying(false)
    }
  }

  // 关闭对话框
  const handleClose = () => {
    reset()
    onClose()
  }

  // 渲染图片状态图标
  const renderImageStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case 'skipped':
        return <Clock className="h-4 w-4 text-yellow-500" />
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-500" />
      case 'uploading':
        return <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-400" />
    }
  }

  // 渲染图片状态标签
  const renderImageStatusBadge = (img: any) => {
    if (img.status === 'success') {
      return (
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          {img.isNewUpload ? '✓ 已上传' : '✓ 已存在'}
        </Badge>
      )
    }
    if (img.status === 'skipped') {
      return (
        <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
          已跳过
        </Badge>
      )
    }
    if (img.status === 'failed') {
      return (
        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
          失败
        </Badge>
      )
    }
    return null
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>导入游戏：{game?.title}</DialogTitle>
          <DialogDescription>
            正在导入游戏数据和图片资源
          </DialogDescription>
        </DialogHeader>

        {/* 进度条 */}
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">{progress.message}</span>
              <span className="text-muted-foreground">
                {progress.percentage}%
              </span>
            </div>
            <Progress value={progress.percentage} className="h-2" />
            <div className="text-xs text-muted-foreground">
              步骤 {progress.step}/{progress.total}
            </div>
          </div>

          {/* 图片上传状态 */}
          {images.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium">图片上传状态</h4>
              <div className="space-y-2 rounded-lg border p-3">
                {images.map((img, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-2 border-b last:border-0"
                  >
                    <div className="flex items-center gap-2 flex-1">
                      {renderImageStatusIcon(img.status)}
                      <span className="text-sm font-medium capitalize">
                        {img.type}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {renderImageStatusBadge(img)}
                      {img.error && (
                        <span className="text-xs text-red-600">{img.error}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* 图片上传统计 */}
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3 text-green-500" />
                  成功: {images.filter(img => img.status === 'success').length}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3 text-yellow-500" />
                  跳过: {images.filter(img => img.status === 'skipped').length}
                </span>
                <span className="flex items-center gap-1">
                  <XCircle className="h-3 w-3 text-red-500" />
                  失败: {images.filter(img => img.status === 'failed').length}
                </span>
              </div>

              {/* 重试按钮 */}
              {images.some(img => img.status === 'failed') && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleRetry}
                  disabled={isRetrying || status === 'importing'}
                  className="w-full"
                >
                  {isRetrying ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      重试中...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4" />
                      重试失败的图片
                    </>
                  )}
                </Button>
              )}
            </div>
          )}

          {/* 警告信息 */}
          {warnings.length > 0 && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <div className="space-y-1">
                  {warnings.map((warning, index) => (
                    <div key={index} className="text-sm">
                      • {warning}
                    </div>
                  ))}
                </div>
              </AlertDescription>
            </Alert>
          )}

          {/* 冲突信息 */}
          {conflict && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {conflict.type === 'game_exists' && (
                  <div>
                    <p className="font-medium">游戏已存在</p>
                    <p className="text-sm mt-1">
                      {conflict.data.title} ({conflict.data.slug})
                    </p>
                  </div>
                )}
                {conflict.type === 'duplicate_source' && (
                  <div>
                    <p className="font-medium">相同来源游戏已存在</p>
                    <p className="text-sm mt-1">
                      {conflict.data.title} ({conflict.data.slug})
                    </p>
                  </div>
                )}
              </AlertDescription>
            </Alert>
          )}

          {/* 成功信息 */}
          {status === 'success' && result && (
            <Alert className="bg-green-50 border-green-200">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                <p className="font-medium">导入成功！</p>
                {result.warnings && result.warnings.length > 0 && (
                  <div className="mt-2 space-y-1">
                    <p className="text-sm">提示：</p>
                    {result.warnings.map((warning, index) => (
                      <p key={index} className="text-sm">
                        • {warning}
                      </p>
                    ))}
                  </div>
                )}
              </AlertDescription>
            </Alert>
          )}

          {/* 错误信息 */}
          {status === 'error' && result && result.error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <p className="font-medium">导入失败</p>
                <p className="text-sm mt-1">{result.error}</p>
              </AlertDescription>
            </Alert>
          )}
        </div>

        {/* 操作按钮 */}
        <div className="flex justify-end gap-2 pt-4 border-t">
          {status === 'idle' && (
            <>
              <Button variant="outline" onClick={handleClose}>
                取消
              </Button>
              <Button onClick={handleImport}>
                开始导入
              </Button>
            </>
          )}

          {status === 'importing' && (
            <Button disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              导入中...
            </Button>
          )}

          {(status === 'success' || status === 'error') && (
            <Button onClick={handleClose}>
              关闭
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
