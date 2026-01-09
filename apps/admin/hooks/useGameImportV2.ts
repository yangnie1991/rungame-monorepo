/**
 * 游戏导入 Hook（v2 版本）
 *
 * 功能：
 * - 处理 SSE 连接
 * - 实时更新进度
 * - 追踪图片上传状态
 * - 处理冲突和错误
 * - 支持重试失败的图片
 */

import { useState, useCallback, useRef } from 'react'

// ==================== 类型定义 ====================

export type ImportStatus = 'idle' | 'pre-checking' | 'importing' | 'success' | 'error' | 'conflict'

export interface ImageUploadStatus {
  url: string
  type: 'thumbnail' | 'banner' | 'screenshot'
  status: 'pending' | 'uploading' | 'success' | 'skipped' | 'failed'
  newUrl?: string
  isNewUpload?: boolean
  error?: string
}

export interface ImportProgress {
  step: number
  total: number
  percentage: number
  message: string
}

export interface ConflictData {
  type: 'game_exists' | 'duplicate_source'
  data: any
}

export interface ImportResult {
  success: boolean
  gameId?: string
  warnings?: string[]
  error?: string
}

// ==================== Hook ====================

export function useGameImportV2() {
  const [status, setStatus] = useState<ImportStatus>('idle')
  const [progress, setProgress] = useState<ImportProgress>({
    step: 0,
    total: 5,
    percentage: 0,
    message: '准备导入...',
  })
  const [images, setImages] = useState<ImageUploadStatus[]>([])
  const [warnings, setWarnings] = useState<string[]>([])
  const [conflict, setConflict] = useState<ConflictData | null>(null)
  const [result, setResult] = useState<ImportResult | null>(null)

  const eventSourceRef = useRef<EventSource | null>(null)

  /**
   * 预检查游戏
   */
  const preCheckGame = useCallback(async (slug: string, categoryId: string, gamePixId?: string) => {
    setStatus('pre-checking')

    try {
      const response = await fetch('/api/admin/import-game/pre-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, categoryId, gamePixId }),
      })

      const data = await response.json()

      if (!data.success) {
        throw new Error(data.error || '预检查失败')
      }

      return data
    } catch (error: any) {
      setStatus('error')
      setResult({
        success: false,
        error: error.message,
      })
      throw error
    }
  }, [])

  /**
   * 导入游戏（SSE）
   */
  const importGame = useCallback(async (game: any, config: any) => {
    // 重置状态
    setStatus('importing')
    setProgress({ step: 0, total: 5, percentage: 0, message: '开始导入...' })
    setImages([])
    setWarnings([])
    setConflict(null)
    setResult(null)

    // 关闭之前的连接
    if (eventSourceRef.current) {
      eventSourceRef.current.close()
    }

    return new Promise<ImportResult>((resolve, reject) => {
      try {
        // 发送 POST 请求启动 SSE
        fetch('/api/admin/import-game-v2', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ game, config }),
        })
          .then(async (response) => {
            if (!response.ok) {
              throw new Error(`HTTP ${response.status}`)
            }

            const reader = response.body?.getReader()
            if (!reader) {
              throw new Error('无法读取响应流')
            }

            const decoder = new TextDecoder()
            let buffer = ''

            // 读取 SSE 流
            while (true) {
              const { done, value } = await reader.read()

              if (done) break

              buffer += decoder.decode(value, { stream: true })

              // 处理完整的 SSE 消息
              const lines = buffer.split('\n\n')
              buffer = lines.pop() || ''

              for (const line of lines) {
                if (line.startsWith('data: ')) {
                  const jsonStr = line.substring(6)
                  try {
                    const data = JSON.parse(jsonStr)
                    handleSSEEvent(data, resolve, reject)
                  } catch (error) {
                    console.error('解析 SSE 数据失败:', error, jsonStr)
                  }
                }
              }
            }
          })
          .catch((error) => {
            setStatus('error')
            setResult({ success: false, error: error.message })
            reject(error)
          })
      } catch (error: any) {
        setStatus('error')
        setResult({ success: false, error: error.message })
        reject(error)
      }
    })
  }, [])

  /**
   * 处理 SSE 事件
   */
  const handleSSEEvent = useCallback((
    data: any,
    resolve: (value: ImportResult) => void,
    reject: (reason: any) => void
  ) => {
    console.log('[SSE Event]', data.type, data)

    switch (data.type) {
      case 'progress':
        setProgress({
          step: data.step,
          total: data.total,
          percentage: data.percentage,
          message: data.message,
        })
        break

      case 'image_upload':
        setImages((prev) => {
          const existing = prev.find((img) => img.url === data.image || img.type === data.image)
          if (existing) {
            // 更新现有图片状态
            return prev.map((img) =>
              img.url === data.image || img.type === data.image
                ? {
                    ...img,
                    status: data.status,
                    newUrl: data.url,
                    isNewUpload: data.isNewUpload,
                    error: data.reason,
                  }
                : img
            )
          } else {
            // 添加新的图片状态
            return [
              ...prev,
              {
                url: data.image,
                type: data.image, // type 从 data.image 推断
                status: data.status,
                newUrl: data.url,
                isNewUpload: data.isNewUpload,
                error: data.reason,
              },
            ]
          }
        })
        break

      case 'warning':
        setWarnings((prev) => [...prev, data.message])
        break

      case 'error':
        setStatus('error')
        setResult({
          success: false,
          error: data.message,
        })
        reject(new Error(data.message))
        break

      case 'conflict':
        setStatus('conflict')
        setConflict({
          type: data.conflictType,
          data: data.data,
        })
        reject(new Error('游戏冲突'))
        break

      case 'success':
        setStatus('success')
        setResult({
          success: true,
          gameId: data.gameId,
          warnings: data.warnings,
        })
        resolve({
          success: true,
          gameId: data.gameId,
          warnings: data.warnings,
        })
        break
    }
  }, [])

  /**
   * 重试失败的图片
   */
  const retryFailedImages = useCallback(async () => {
    const failedImages = images.filter((img) => img.status === 'failed')

    if (failedImages.length === 0) {
      return { success: true, results: [] }
    }

    try {
      const response = await fetch('/api/admin/retry-image-upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          images: failedImages.map((img) => ({
            url: img.url,
            type: img.type,
          })),
        }),
      })

      const data = await response.json()

      if (data.success) {
        // 更新图片状态
        setImages((prev) =>
          prev.map((img) => {
            const result = data.results.find((r: any) => r.url === img.url)
            if (result && result.status === 'success') {
              return {
                ...img,
                status: 'success',
                newUrl: result.newUrl,
                isNewUpload: result.isNewUpload,
                error: undefined,
              }
            }
            return img
          })
        )
      }

      return data
    } catch (error: any) {
      console.error('重试图片上传失败:', error)
      throw error
    }
  }, [images])

  /**
   * 重置状态
   */
  const reset = useCallback(() => {
    setStatus('idle')
    setProgress({ step: 0, total: 5, percentage: 0, message: '准备导入...' })
    setImages([])
    setWarnings([])
    setConflict(null)
    setResult(null)

    if (eventSourceRef.current) {
      eventSourceRef.current.close()
      eventSourceRef.current = null
    }
  }, [])

  return {
    // 状态
    status,
    progress,
    images,
    warnings,
    conflict,
    result,

    // 方法
    preCheckGame,
    importGame,
    retryFailedImages,
    reset,
  }
}
