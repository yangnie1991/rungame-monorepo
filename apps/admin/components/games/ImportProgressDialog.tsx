"use client"

import { useState, useRef, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { CheckCircle2, XCircle, Loader2, RefreshCw, Upload, Database, Tag, CheckCheck, ScrollText } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * 导入步骤状态
 */
export type ImportStepStatus = 'pending' | 'running' | 'success' | 'error'

/**
 * 导入步骤信息
 */
export interface ImportStep {
  id: string
  label: string
  description: string
  status: ImportStepStatus
  progress?: number // 0-100
  error?: string
  icon?: React.ReactNode
}

interface ImportProgressDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title?: string
  steps: ImportStep[]
  currentStepIndex: number
  overallProgress: number
  onRetryStep?: (stepIndex: number) => void // 重试指定的步骤
  onExecuteStep?: (stepIndex: number) => void // 执行指定的步骤(跳过之前的步骤)
  onCancel?: () => void
  allowClose?: boolean
  logs?: string[] // 实时日志
}

/**
 * 导入进度弹窗
 *
 * 功能：
 * - 显示多步骤导入进度
 * - 每个步骤显示状态图标（待处理、进行中、成功、失败）
 * - 失败时显示错误信息和重试按钮
 * - 阻止用户在导入进行中关闭弹窗
 */
export function ImportProgressDialog({
  open,
  onOpenChange,
  title = '导入游戏',
  steps,
  currentStepIndex,
  overallProgress,
  onRetryStep,
  onExecuteStep,
  onCancel,
  allowClose = false,
  logs = [],
}: ImportProgressDialogProps) {
  const [executingStepIndex, setExecutingStepIndex] = useState<number | null>(null)

  // 自动滚动日志
  const logsEndRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [logs])

  // 是否有步骤失败
  const hasError = steps.some(step => step.status === 'error')
  const failedStepIndex = steps.findIndex(step => step.status === 'error')
  const isRunning = steps.some(step => step.status === 'running')
  const isCompleted = steps.every(step => step.status === 'success')

  // 获取状态图标
  const getStatusIcon = (step: ImportStep) => {
    switch (step.status) {
      case 'success':
        return <CheckCircle2 className="h-5 w-5 text-green-600" />
      case 'error':
        return <XCircle className="h-5 w-5 text-destructive" />
      case 'running':
        return <Loader2 className="h-5 w-5 text-primary animate-spin" />
      default:
        return (
          <div className="h-5 w-5 rounded-full border-2 border-muted-foreground/30" />
        )
    }
  }

  // 处理重试步骤
  const handleRetryStep = async (stepIndex: number) => {
    if (!onRetryStep) return
    setExecutingStepIndex(stepIndex)
    try {
      await onRetryStep(stepIndex)
    } finally {
      setExecutingStepIndex(null)
    }
  }

  // 处理执行步骤
  const handleExecuteStep = async (stepIndex: number) => {
    if (!onExecuteStep) return
    setExecutingStepIndex(stepIndex)
    try {
      await onExecuteStep(stepIndex)
    } finally {
      setExecutingStepIndex(null)
    }
  }

  // 处理关闭
  const handleClose = () => {
    if (!allowClose && (isRunning || !isCompleted)) {
      return // 进行中或未完成时阻止关闭
    }
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-5xl gap-0 p-0 bg-white" onPointerDownOutside={(e) => {
        if (!allowClose && (isRunning || !isCompleted)) e.preventDefault()
      }}>
        <DialogHeader className="px-8 pt-8 pb-4">
          <DialogTitle className="flex items-center gap-2 text-xl">
            {isCompleted ? (
              <CheckCircle2 className="h-6 w-6 text-green-600" />
            ) : hasError ? (
              <XCircle className="h-6 w-6 text-destructive" />
            ) : (
              <Loader2 className="h-6 w-6 text-primary animate-spin" />
            )}
            {title}
            {isCompleted && <span className="ml-2 text-sm font-normal text-muted-foreground">已完成</span>}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-12 h-[600px]">
          {/* 左侧：进度步骤 */}
          <div className="md:col-span-4 border-r border-slate-100 p-8 flex flex-col gap-6 bg-slate-50/50 overflow-y-auto">

            {/* 总进度 */}
            <div className="space-y-2 mb-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">总进度</span>
                <span className="text-muted-foreground">{overallProgress}%</span>
              </div>
              <Progress value={overallProgress} className="h-2" />
            </div>

            {/* 步骤列表 */}
            <div className="space-y-3 flex-1">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className={cn(
                    'flex items-start gap-3 p-3 rounded-lg border transition-all',
                    step.status === 'running' && 'border-primary bg-primary/5 shadow-sm',
                    step.status === 'success' && 'border-green-200 bg-green-50/50',
                    step.status === 'error' && 'border-destructive bg-destructive/5',
                    step.status === 'pending' && 'border-slate-100 bg-white opacity-60'
                  )}
                >
                  <div className="flex-shrink-0 mt-0.5">
                    {step.icon ? (
                      <div className={cn(
                        "text-slate-400",
                        step.status === 'success' && "text-green-600",
                        step.status === 'running' && "text-primary",
                        step.status === 'error' && "text-destructive"
                      )}>
                        {step.status === 'success' ? <CheckCircle2 className="h-5 w-5" /> :
                          step.status === 'error' ? <XCircle className="h-5 w-5" /> :
                            step.status === 'running' ? <Loader2 className="h-5 w-5 animate-spin" /> :
                              step.icon}
                      </div>
                    ) : getStatusIcon(step)}
                  </div>

                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className={cn(
                        'font-medium text-sm',
                        step.status === 'success' && 'text-green-700',
                        step.status === 'error' && 'text-destructive',
                        step.status === 'running' && 'text-primary',
                        step.status === 'pending' && 'text-slate-500'
                      )}>
                        {step.label}
                      </h4>
                    </div>
                    <p className="text-xs text-muted-foreground leading-snug">
                      {step.description}
                    </p>

                    {/* 错误信息 */}
                    {step.status === 'error' && step.error && (
                      <div className="mt-2 p-2 bg-white/50 border border-destructive/20 rounded text-xs text-destructive">
                        {step.error}
                      </div>
                    )}

                    {/* 操作按钮 */}
                    <div className="mt-2 flex gap-2">
                      {step.status === 'error' && onRetryStep && (
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleRetryStep(index)}
                          disabled={executingStepIndex !== null}
                          className="h-7 text-xs"
                        >
                          {executingStepIndex === index ? (
                            <><Loader2 className="mr-1 h-3 w-3 animate-spin" />重试中</>
                          ) : (
                            <><RefreshCw className="mr-1 h-3 w-3" />重试</>
                          )}
                        </Button>
                      )}

                      {step.status === 'pending' && failedStepIndex !== -1 && index > failedStepIndex && onExecuteStep && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleExecuteStep(index)}
                          disabled={executingStepIndex !== null}
                          className="h-7 text-xs"
                        >
                          {executingStepIndex === index ? (
                            <><Loader2 className="mr-1 h-3 w-3 animate-spin" />执行中</>
                          ) : (
                            "执行"
                          )}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 底部按钮 */}
            <div className="pt-4 border-t border-slate-200 mt-auto flex gap-2 justify-end">
              {isCompleted ? (
                <Button onClick={handleClose} className="w-full bg-green-600 hover:bg-green-700">
                  <CheckCheck className="mr-2 h-4 w-4" /> 完成
                </Button>
              ) : (
                <Button
                  onClick={handleClose}
                  variant="outline"
                  disabled={!allowClose && (isRunning || !isCompleted)}
                  className="w-full"
                >
                  {isRunning ? '导入中...' : '关闭'}
                </Button>
              )}
            </div>
          </div>

          {/* 右侧：实时日志 */}
          <div className="md:col-span-8 p-8 bg-white flex flex-col h-full overflow-hidden">
            <div className="flex items-center gap-2 mb-4 pb-4 border-b border-slate-100">
              <ScrollText className="w-5 h-5 text-slate-400" />
              <h3 className="font-semibold text-slate-700">导入日志</h3>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 pr-2 font-mono text-xs" ref={scrollContainerRef}>
              {logs.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-300">
                  <Database className="w-16 h-16 mb-4 opacity-20" />
                  <p>等待任务开始...</p>
                </div>
              ) : (
                logs.map((log, index) => (
                  <div key={index} className="flex gap-3 animate-in fade-in slide-in-from-bottom-1 duration-200">
                    <div className="min-w-[4px] w-[4px] rounded-full bg-slate-200 mt-1.5 h-auto self-stretch shrink-0" />
                    <span className="text-slate-600 py-1 leading-relaxed break-all">
                      {log}
                    </span>
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

/**
 * 默认导入步骤配置
 */
export const DEFAULT_IMPORT_STEPS: ImportStep[] = [
  {
    id: 'upload-images',
    label: '上传图片到 R2',
    description: '自动上传缩略图、横幅和截图到 CDN',
    status: 'pending',
    icon: <Upload className="h-5 w-5" />,
  },
  {
    id: 'validate-category',
    label: '验证分类信息',
    description: '检查分类是否存在并获取主分类 ID',
    status: 'pending',
    icon: <Tag className="h-5 w-5" />,
  },
  {
    id: 'create-game',
    label: '创建游戏记录',
    description: '写入游戏数据到数据库',
    status: 'pending',
    icon: <Database className="h-5 w-5" />,
  },
  {
    id: 'update-cache',
    label: '更新缓存标记',
    description: '标记游戏为已导入并失效相关缓存',
    status: 'pending',
    icon: <CheckCircle2 className="h-5 w-5" />,
  },
]
