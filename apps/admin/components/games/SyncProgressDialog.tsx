'use client'

import { useState, useEffect, useRef } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { CheckCircle2, XCircle, Loader2, AlertTriangle, CloudDownload, RefreshCw, Download, Database, ScrollText, ArrowRight } from 'lucide-react'

type SyncMode = 'full' | 'incremental'

interface SyncProgressUpdate {
  currentPage: number
  totalPages: number
  processedGames: number
  newGames: number
  updatedGames: number
  currentStep: string
  estimatedTotal?: number
}

interface SyncProgressDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  // 同步配置
  config: {
    siteId: string
    orderBy?: 'quality' | 'published'
  }
  // 完成回调
  onComplete?: () => void
}

export function SyncProgressDialog({
  open,
  onOpenChange,
  config,
  onComplete,
}: SyncProgressDialogProps) {
  // 同步状态
  const [status, setStatus] = useState<'ready' | 'syncing' | 'success' | 'failed'>('ready')
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState('')
  const [startTime, setStartTime] = useState(0)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [logs, setLogs] = useState<string[]>([]) // 实时日志

  // 同步模式
  const [syncMode, setSyncMode] = useState<SyncMode>('incremental')

  // 结果数据
  const [result, setResult] = useState<{
    totalSynced?: number
    newGames?: number
    updatedGames?: number
    hiddenGames?: number
    syncDuration?: number
    error?: string
  }>({})

  // API 总游戏数
  const [estimatedTotal, setEstimatedTotal] = useState<number>(0)
  // 总页数
  const [totalPages, setTotalPages] = useState<number>(0)

  // 🎯 分批同步状态
  const [batchInfo, setBatchInfo] = useState({
    currentBatch: 0,
    totalBatches: 0,
    nextStartPage: 1,
    totalPagesInApi: 0,
    accumulatedSynced: 0,
    accumulatedNew: 0,
    accumulatedUpdated: 0,
  })

  // EventSource ref
  const eventSourceRef = useRef<EventSource | null>(null)

  // 自动滚动日志 Ref
  const logsEndRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  // 是否自动继续下一批
  const [autoContinue, setAutoContinue] = useState(true)

  // 重置状态
  useEffect(() => {
    if (open) {
      setStatus('ready')
      setProgress(0)
      setCurrentStep('')
      setLogs([])
      setStartTime(0)
      setElapsedTime(0)
      setResult({})
      setEstimatedTotal(0)
      setTotalPages(0)
      setSyncMode('incremental')
      setBatchInfo({
        currentBatch: 0,
        totalBatches: 0,
        nextStartPage: 1,
        totalPagesInApi: 0,
        accumulatedSynced: 0,
        accumulatedNew: 0,
        accumulatedUpdated: 0,
      })
      setAutoContinue(true)
    } else {
      // 关闭弹窗时清理 EventSource
      if (eventSourceRef.current) {
        eventSourceRef.current.close()
        eventSourceRef.current = null
      }
    }
  }, [open])

  // 计时器
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (status === 'syncing' && startTime > 0) {
      interval = setInterval(() => {
        setElapsedTime(Date.now() - startTime)
      }, 100)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [status, startTime])

  // 自动滚动日志
  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [logs])

  // 🎯 执行单批同步
  const executeBatch = async (
    startPage: number,
    accumulated = { synced: 0, new: 0, updated: 0 },
    globalSyncStartTime?: number
  ) => {
    const maxPages = 5 // 每批同步 5 页

    try {
      // 创建 EventSource 连接到 SSE 端点
      const url = new URL('/api/gamepix/sync-stream', window.location.origin)
      url.searchParams.set('siteId', config.siteId)
      url.searchParams.set('mode', syncMode)
      url.searchParams.set('orderBy', config.orderBy || 'quality')
      url.searchParams.set('startPage', startPage.toString())
      url.searchParams.set('maxPages', maxPages.toString())

      // 传递累计值参数
      url.searchParams.set('accumulatedSynced', accumulated.synced.toString())
      url.searchParams.set('accumulatedNew', accumulated.new.toString())
      url.searchParams.set('accumulatedUpdated', accumulated.updated.toString())

      // 传递全局同步开始时间（用于下架检测）
      if (globalSyncStartTime) {
        url.searchParams.set('globalSyncStartTime', globalSyncStartTime.toString())
      }

      const eventSource = new EventSource(url.toString())
      eventSourceRef.current = eventSource

      eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data)

          // 检查事件类型
          if (data.type === 'complete') {
            // 批次完成
            eventSource.close()
            eventSourceRef.current = null

            const {
              totalSynced,
              newGames,
              updatedGames,
              hiddenGames,
              syncDuration,
              nextStartPage,
              hasMorePages,
              actualTotalPages,
              accumulatedSynced,
              accumulatedNew,
              accumulatedUpdated,
              globalSyncStartTime: returnedGlobalSyncStartTime,
            } = data.data

            // 使用后端返回的累计值（而不是前端累加）
            const finalAccumulatedSynced = accumulatedSynced || 0
            const finalAccumulatedNew = accumulatedNew || 0
            const finalAccumulatedUpdated = accumulatedUpdated || 0

            // 更新累计统计
            setBatchInfo(prev => ({
              ...prev,
              accumulatedSynced: finalAccumulatedSynced,
              accumulatedNew: finalAccumulatedNew,
              accumulatedUpdated: finalAccumulatedUpdated,
              totalPagesInApi: actualTotalPages || prev.totalPagesInApi,
              currentBatch: prev.currentBatch + 1,
            }))

            setResult({
              totalSynced: finalAccumulatedSynced,
              newGames: finalAccumulatedNew,
              updatedGames: finalAccumulatedUpdated,
              hiddenGames: hiddenGames || 0,
              syncDuration: (result.syncDuration || 0) + syncDuration,
            })

            // 添加批次完成日志
            setLogs(prev => [...prev, `✅ 第 ${batchInfo.currentBatch + 1} 批次完成: 同步 ${totalSynced} 个, 新增 ${newGames} 个, 更新 ${updatedGames} 个`])

            // 🎯 检查是否还有更多页需要同步
            if (hasMorePages && nextStartPage && autoContinue) {
              // 自动开始下一批，传递累计值和全局同步开始时间
              setLogs(prev => [...prev, `🚀 准备下一批: 从第 ${nextStartPage} 页开始...`])

              setTimeout(() => executeBatch(
                nextStartPage,
                {
                  synced: finalAccumulatedSynced,
                  new: finalAccumulatedNew,
                  updated: finalAccumulatedUpdated,
                },
                returnedGlobalSyncStartTime // 传递全局同步开始时间
              ), 1000) // 延迟 1 秒，避免请求过快
            } else {
              // 全部完成
              setStatus('success')
              setProgress(100)
              setLogs(prev => [...prev, `🎉 全部同步完成! 总计 ${finalAccumulatedSynced} 个游戏`])
              onComplete?.()
            }
          } else if (data.type === 'error') {
            // 同步失败
            setStatus('failed')
            setResult({ error: data.error })
            setLogs(prev => [...prev, `❌ 错误: ${data.error}`])
            eventSource.close()
            eventSourceRef.current = null
          } else {
            // 进度更新（后端返回的已经是累计值）
            const progressUpdate = data as SyncProgressUpdate

            // 仅当步骤描述变化时添加日志，避免重复
            if (progressUpdate.currentStep && progressUpdate.currentStep !== currentStep) {
              setLogs(prev => [...prev, `⏱️ ${progressUpdate.currentStep}`])
            }

            setCurrentStep(progressUpdate.currentStep)
            setResult(prev => ({
              ...prev,
              totalSynced: progressUpdate.processedGames,
              newGames: progressUpdate.newGames,
              updatedGames: progressUpdate.updatedGames,
            }))

            if (progressUpdate.totalPages > 0) {
              setTotalPages(progressUpdate.totalPages)
              const progressPercent = Math.round((progressUpdate.currentPage / progressUpdate.totalPages) * 100)
              setProgress(progressPercent)
            }

            if (progressUpdate.estimatedTotal !== undefined) {
              setEstimatedTotal(progressUpdate.estimatedTotal)
            }
          }
        } catch (error) {
          console.error('解析 SSE 消息失败:', error)
          setLogs(prev => [...prev, `⚠️ 解析日志失败`])
        }
      }

      eventSource.onerror = (error) => {
        console.error('SSE 连接错误:', error)
        setStatus('failed')
        setResult({ error: '连接中断，同步失败' })
        setLogs(prev => [...prev, `❌ SSE 连接中断`])
        eventSource.close()
        eventSourceRef.current = null
      }
    } catch (error) {
      console.error('同步失败:', error)
      setStatus('failed')
      setResult({
        error: error instanceof Error ? error.message : '同步失败',
      })
      setLogs(prev => [...prev, `❌ 启动同步失败: ${error instanceof Error ? error.message : '未知错误'}`])
    }
  }

  // 🎯 启动同步（从第 1 页开始）
  const handleStartSync = async () => {
    setStatus('syncing')
    setProgress(0)
    setStartTime(Date.now())
    setCurrentStep('正在准备分批同步...')
    setLogs([`🚀 开始同步任务 (模式: ${syncMode === 'full' ? '全量' : '增量'})`])
    setResult({})
    setBatchInfo({
      currentBatch: 0,
      totalBatches: 0,
      nextStartPage: 1,
      totalPagesInApi: 0,
      accumulatedSynced: 0,
      accumulatedNew: 0,
      accumulatedUpdated: 0,
    })

    // 从第 1 页开始
    executeBatch(1)
  }

  // 取消同步
  const handleCancelSync = () => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close()
      eventSourceRef.current = null
    }
    setAutoContinue(false) // 停止自动继续
    setStatus('failed')
    setResult({ error: '用户取消同步' })
    setLogs(prev => [...prev, `⚠️ 用户取消了同步任务`])
  }

  // 关闭弹窗
  const handleClose = () => {
    if (status === 'syncing') {
      // 同步进行中时，先取消同步
      handleCancelSync()
    }
    onOpenChange(false)
  }

  // 格式化时间
  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000)
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-5xl gap-0 p-0 bg-white" onPointerDownOutside={(e) => e.preventDefault()}>
        <DialogHeader className="px-8 pt-8 pb-4">
          <DialogTitle className="flex items-center gap-2 text-xl">
            <CloudDownload className="h-6 w-6 text-blue-600" />
            GamePix 数据同步
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-12 h-[600px]">
          {/* 左侧：状态与控制 */}
          <div className="md:col-span-4 border-r border-slate-100 p-8 flex flex-col gap-6 bg-slate-50/50">

            {/* 状态卡片 */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-slate-800">同步状态</h3>
                {status === 'syncing' && <span className="text-xs font-medium px-2 py-1 bg-blue-100 text-blue-700 rounded-full animate-pulse">运行中</span>}
                {status === 'success' && <span className="text-xs font-medium px-2 py-1 bg-green-100 text-green-700 rounded-full">已完成</span>}
                {status === 'failed' && <span className="text-xs font-medium px-2 py-1 bg-red-100 text-red-700 rounded-full">失败</span>}
                {status === 'ready' && <span className="text-xs font-medium px-2 py-1 bg-slate-100 text-slate-600 rounded-full">就绪</span>}
              </div>

              {/* 核心指标 */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-500">已处理总数</span>
                  <span className="text-2xl font-bold text-slate-800">{result.totalSynced || 0}</span>
                </div>

                <div className="h-px bg-slate-100 my-2" />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-slate-500 mb-1">新增游戏</p>
                    <p className="text-lg font-semibold text-green-600">+{result.newGames || 0}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">更新游戏</p>
                    <p className="text-lg font-semibold text-orange-600">{result.updatedGames || 0}</p>
                  </div>
                </div>

                <div className="space-y-1 pt-2">
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>进度</span>
                    <span>{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2 bg-slate-100" />
                </div>

                {elapsedTime > 0 && (
                  <p className="text-xs text-center text-slate-400 pt-2">
                    已用时: {formatTime(elapsedTime)}
                  </p>
                )}
              </div>
            </div>

            {/* 错误提示 */}
            {status === 'failed' && result.error && (
              <Alert variant="destructive" className="bg-red-50 border-red-200">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800 text-xs ml-2">{result.error}</AlertDescription>
              </Alert>
            )}

            {/* 模式选择 (仅在Ready状态显示) */}
            {status === 'ready' && (
              <div className="space-y-3 mt-auto">
                <Label className="text-sm font-medium text-slate-700">选择同步模式</Label>
                <RadioGroup value={syncMode} onValueChange={(value) => setSyncMode(value as SyncMode)} className="flex flex-col gap-3">
                  <div className={`flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-all ${syncMode === 'incremental' ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:border-slate-300'}`}>
                    <RadioGroupItem value="incremental" id="incremental" />
                    <Label htmlFor="incremental" className="flex-1 cursor-pointer">
                      <div className="font-semibold text-slate-800 flex items-center gap-2">
                        <Download className="w-4 h-4 text-blue-600" /> 增量同步
                      </div>
                      <p className="text-xs text-slate-500 mt-1">仅同步新发布的游戏，速度快 (推荐)</p>
                    </Label>
                  </div>
                  <div className={`flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-all ${syncMode === 'full' ? 'border-orange-500 bg-orange-50' : 'border-slate-200 hover:border-slate-300'}`}>
                    <RadioGroupItem value="full" id="full" />
                    <Label htmlFor="full" className="flex-1 cursor-pointer">
                      <div className="font-semibold text-slate-800 flex items-center gap-2">
                        <Database className="w-4 h-4 text-orange-600" /> 全量同步
                      </div>
                      <p className="text-xs text-slate-500 mt-1">同步所有历史数据，耗时较长</p>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            )}

            {/* 操作按钮区 */}
            <div className="mt-auto pt-4 flex gap-3">
              {status === 'ready' ? (
                <>
                  <Button variant="outline" className="flex-1" onClick={() => onOpenChange(false)}>取消</Button>
                  <Button className="flex-1 bg-blue-600 hover:bg-blue-700" onClick={handleStartSync}>
                    开始同步 <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </>
              ) : status === 'syncing' ? (
                <Button variant="destructive" className="w-full" onClick={handleCancelSync}>
                  停止同步
                </Button>
              ) : (
                <Button className="w-full bg-slate-900 text-white hover:bg-slate-800" onClick={() => onOpenChange(false)}>
                  关闭窗口
                </Button>
              )}
            </div>
          </div>

          {/* 右侧：实时日志时间轴 */}
          <div className="md:col-span-8 p-8 bg-white flex flex-col h-full overflow-hidden">
            <div className="flex items-center gap-2 mb-4 pb-4 border-b border-slate-100">
              <ScrollText className="w-5 h-5 text-slate-400" />
              <h3 className="font-semibold text-slate-700">实时日志</h3>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4 pr-2" ref={scrollContainerRef}>
              {logs.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-300">
                  <Database className="w-16 h-16 mb-4 opacity-20" />
                  <p>等待任务开始...</p>
                </div>
              ) : (
                logs.map((log, index) => (
                  <div key={index} className="flex gap-3 text-sm animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className="min-w-[4px] w-[4px] rounded-full bg-slate-200 mt-1.5 h-auto self-stretch shrink-0" />
                    <div className="py-1">
                      <p className="text-slate-600 leading-relaxed font-mono text-xs">{log}</p>
                    </div>
                  </div>
                ))
              )}
              <div ref={logsEndRef} />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

