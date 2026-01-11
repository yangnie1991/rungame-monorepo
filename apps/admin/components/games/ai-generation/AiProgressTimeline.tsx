'use client'

import { useEffect, useRef } from 'react'
import { CheckCircle2, Circle, Loader2, Sparkles, Search, FileText, Globe } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'

export interface TimelineStep {
    id: string
    title: string
    description?: string
    status: 'pending' | 'active' | 'completed' | 'error'
    icon?: React.ReactNode
}

interface AiProgressTimelineProps {
    steps: TimelineStep[]
    logs: string[]
    currentPhase: string
    progress: number
}

export function AiProgressTimeline({ steps, logs, currentPhase, progress }: AiProgressTimelineProps) {
    const scrollRef = useRef<HTMLDivElement>(null)

    // 自动滚动日志
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [logs])

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="md:flex h-[500px]">
                {/* 左侧：垂直步骤时间轴 */}
                <div className="flex-1 p-8 border-r border-slate-100 overflow-y-auto bg-slate-50/30">
                    <div className="space-y-8 relative">
                        {/* 连接线背景 */}
                        <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-slate-200" />

                        {steps.map((step, index) => {
                            const isLast = index === steps.length - 1

                            return (
                                <div key={step.id} className="relative flex gap-4">
                                    {/* 连接线高亮 (仅当前或已完成步骤) */}
                                    {!isLast && (step.status === 'completed' || step.status === 'active') && (
                                        <div className="absolute left-6 top-6 h-full w-0.5 bg-blue-500 transition-all duration-500" />
                                    )}

                                    {/* 图标节点 */}
                                    <div className={cn(
                                        "relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-4 transition-all duration-300 shadow-sm",
                                        step.status === 'completed' && "bg-blue-500 border-blue-100 text-white shadow-blue-200",
                                        step.status === 'active' && "bg-white border-blue-500 text-blue-600 shadow-blue-100 animate-pulse",
                                        step.status === 'pending' && "bg-white border-slate-200 text-slate-300",
                                        step.status === 'error' && "bg-white border-red-500 text-red-500"
                                    )}>
                                        {step.status === 'completed' ? (
                                            <CheckCircle2 className="w-6 h-6" />
                                        ) : step.status === 'active' ? (
                                            <Loader2 className="w-6 h-6 animate-spin" />
                                        ) : (
                                            step.icon || <Circle className="w-5 h-5 fill-current" />
                                        )}
                                    </div>

                                    {/* 文本内容 */}
                                    <div className="flex-1 pt-1">
                                        <div className="flex items-center justify-between mb-1">
                                            <h3 className={cn(
                                                "text-lg font-semibold transition-colors",
                                                step.status === 'active' ? "text-blue-700" :
                                                    step.status === 'completed' ? "text-slate-800" : "text-slate-400"
                                            )}>
                                                {step.title}
                                            </h3>
                                            {step.status === 'active' && (
                                                <Badge variant="secondary" className="bg-blue-50 text-blue-600 animate-pulse">
                                                    Processing
                                                </Badge>
                                            )}
                                        </div>
                                        {step.description && (
                                            <p className={cn(
                                                "text-sm transition-colors",
                                                step.status === 'pending' ? "text-slate-300" : "text-slate-500"
                                            )}>
                                                {step.description}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* 右侧：实时日志面板 */}
                <div className="w-full md:w-[45%] bg-slate-50/50 flex flex-col border-l border-slate-100">
                    <div className="px-4 py-3 border-b border-slate-100 bg-white/50 flex items-center justify-between backdrop-blur-sm">
                        <div className="flex items-center gap-2">
                            <div className="flex gap-1.5 opacity-60">
                                <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                                <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                                <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                            </div>
                            <span className="ml-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">实时生成日志</span>
                        </div>
                        <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-green-50 border border-green-100">
                            <span className="relative flex h-1.5 w-1.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
                            </span>
                            <span className="text-[10px] font-medium text-green-700">运行中</span>
                        </div>
                    </div>

                    <div
                        ref={scrollRef}
                        className="flex-1 p-4 overflow-y-auto font-mono text-sm space-y-2.5 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent"
                    >
                        {logs.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-3">
                                <div className="p-3 bg-white rounded-full shadow-sm border border-slate-100">
                                    <Loader2 className="w-5 h-5 animate-spin text-slate-300" />
                                </div>
                                <p className="text-xs font-medium">等待任务开始...</p>
                            </div>
                        ) : (
                            logs.map((log, i) => (
                                <div key={i} className="flex gap-2.5 animate-in fade-in slide-in-from-left-1 duration-300 items-start">
                                    <span className="text-slate-300 select-none mt-0.5 text-xs">›</span>
                                    <span className={cn(
                                        "break-all leading-tight text-xs md:text-sm",
                                        log.includes('Error') ? "text-red-600 bg-red-50 px-1.5 py-0.5 rounded border border-red-100" :
                                            log.includes('Success') || log.includes('完成') ? "text-green-700 font-medium" :
                                                log.includes('Wait') ? "text-amber-600" :
                                                    "text-slate-600"
                                    )}>
                                        {log}
                                    </span>
                                </div>
                            ))
                        )}
                        {/* 底部光标 */}
                        {logs.length > 0 && (
                            <div className="w-1.5 h-3 bg-slate-400/50 animate-pulse ml-4 mt-2" />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
