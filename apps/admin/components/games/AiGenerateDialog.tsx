'use client'

import { useState, useEffect, useRef } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Sparkles,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Info,
  Globe,
  RefreshCw,
  Database,
  Cpu,
  Search,
  FileText,
} from 'lucide-react'
import { RichTextEditor } from '@/components/RichTextEditor'
import { AiProgressTimeline, type TimelineStep } from './ai-generation/AiProgressTimeline'

// 生成进度数据
interface GenerationProgress {
  phase: 'searching' | 'parsing' | 'generating'
  step: string
  progress: number
  current?: number
  total?: number
  details?: string
}

export interface AiGenerateDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void

  // 游戏基本信息
  gameTitle: string
  locale: string

  // 关键词（可预填充）
  initialKeywords?: string

  // 可选的额外上下文
  originalDescription?: string
  markdownContent?: string        // 🎯 GamePix 导入页面提供
  extractedContent?: string

  // 分类信息（可选）
  category?: string
  categoryId?: string

  // 初始模式（可选）
  initialMode?: 'fast' | 'quality'

  // 生成完成回调
  onGenerated: (results: Record<string, string>) => void
}

type GenerationPhase = 'config' | 'generating' | 'preview'
type SeoMode = 'fast' | 'quality'

// 字段字符限制配置
const FIELD_CHARACTER_LIMITS: Record<string, number | undefined> = {
  metaTitle: 60,
  metaDescription: 160,
  description: 60,
  longDescription: undefined,
  controls: undefined,
  howToPlay: undefined,
  gameDetails: undefined,
  faq: undefined,
  extras: undefined,
  keywords: undefined,
}

// 生成字段定义
const GENERATION_FIELDS = [
  { id: 'description', label: '简短描述', description: '游戏的简短介绍' },
  { id: 'metaTitle', label: 'SEO 标题', description: 'SEO 优化标题（50-60字符）' },
  { id: 'metaDescription', label: 'SEO 描述', description: 'SEO 优化描述（140-160字符）' },
  { id: 'keywords', label: '关键词', description: 'SEO 关键词（5-10个）' },
  { id: 'controls', label: '控制方式', description: '游戏的操作控制说明' },
  { id: 'howToPlay', label: '如何游玩', description: '游戏玩法和规则介绍' },
  { id: 'gameDetails', label: '详细游戏信息', description: '游戏的详细特性和亮点' },
  { id: 'faq', label: '常见问题', description: '玩家常见问题解答' },
  { id: 'extras', label: '其他内容', description: '补充信息和提示' },
]

// 定义步骤常量
const GENERATION_STEPS: TimelineStep[] = [
  { id: 'searching', title: '市场调研', description: '分析竞品和关键词趋势', status: 'pending', icon: <Search className="w-5 h-5 text-blue-500" /> },
  { id: 'parsing', title: '内容分析', description: '解析数据结构与核心卖点', status: 'pending', icon: <FileText className="w-5 h-5 text-orange-500" /> },
  { id: 'generating', title: 'AI 撰写', description: '生成多语言游戏内容初稿', status: 'pending', icon: <Sparkles className="w-5 h-5 text-purple-500" /> },
  { id: 'finalizing', title: 'SEO 优化', description: '优化关键词密度与搜索可见性', status: 'pending', icon: <Globe className="w-5 h-5 text-green-500" /> }
]

/**
 * 统一的 AI 内容生成对话框
 *
 * 适用场景：
 * 1. GamePix 导入页面（有 markdownContent）
 * 2. 新建游戏页面（无 markdownContent）
 * 3. 编辑游戏页面（可能有 markdownContent）
 */
export function AiGenerateDialog({
  open,
  onOpenChange,
  gameTitle,
  locale,
  initialKeywords,
  originalDescription,
  markdownContent,
  extractedContent,
  category,
  categoryId,
  initialMode,
  onGenerated
}: AiGenerateDialogProps) {
  // AI 配置状态
  const [availableConfigs, setAvailableConfigs] = useState<any[]>([])
  const [selectedConfigId, setSelectedConfigId] = useState<string>('')
  const [availableModels, setAvailableModels] = useState<any[]>([])
  const [selectedModelId, setSelectedModelId] = useState<string>('')

  // 配置加载状态
  const [loadingConfigs, setLoadingConfigs] = useState(false)
  const [configError, setConfigError] = useState<string | null>(null)

  // 关键词输入 - 主关键词默认使用游戏标题，副关键词过滤掉主关键词
  const [mainKeyword, setMainKeyword] = useState(gameTitle)
  const [subKeywords, setSubKeywords] = useState(() => {
    if (!initialKeywords) return ''
    // 过滤掉主关键词（游戏标题）
    const keywords = initialKeywords.split(',').map(k => k.trim()).filter(k => k && k.toLowerCase() !== gameTitle.toLowerCase())
    return keywords.join(', ')
  })
  const [seoMode, setSeoMode] = useState<SeoMode>(initialMode || 'quality')

  // 生成阶段
  const [phase, setPhase] = useState<GenerationPhase>('config')
  const [error, setError] = useState<string | null>(null)

  // 生成结果
  const [generatedResults, setGeneratedResults] = useState<Record<string, string>>({})
  const [editedResults, setEditedResults] = useState<Record<string, string>>({})
  const [citations, setCitations] = useState<any[]>([])

  // SSE 进度
  const [generationProgress, setGenerationProgress] = useState<GenerationProgress | null>(null)
  const eventSourceRef = useRef<EventSource | null>(null)

  // 新增日志状态
  const [logs, setLogs] = useState<string[]>([])

  // 预览标签页
  const [activePreviewTab, setActivePreviewTab] = useState<string>('description')

  // 加载可用配置和模型
  useEffect(() => {
    if (open) {
      loadAiConfigsAndModels()
      // 重置关键词为初始值
      setMainKeyword(gameTitle)
      // 过滤掉主关键词（游戏标题）
      if (initialKeywords) {
        const keywords = initialKeywords.split(',').map(k => k.trim()).filter(k => k && k.toLowerCase() !== gameTitle.toLowerCase())
        setSubKeywords(keywords.join(', '))
      } else {
        setSubKeywords('')
      }
    } else {
      // 关闭对话框时清理 EventSource
      if (eventSourceRef.current) {
        eventSourceRef.current.close()
        eventSourceRef.current = null
      }
    }
  }, [open, gameTitle, initialKeywords])

  const loadAiConfigsAndModels = async () => {
    setLoadingConfigs(true)
    setConfigError(null)

    try {
      const { getAiConfigsWithModels } = await import('@/app/(dashboard)/ai-config/actions')
      const configs = await getAiConfigsWithModels()

      if (configs.length === 0) {
        throw new Error('没有可用的 AI 配置')
      }

      setAvailableConfigs(configs)

      // 自动选中激活的配置
      const activeConfig = configs.find((c: any) => c.isActive)
      const selectedConfig = activeConfig || (configs.length > 0 ? configs[0] : null)
      if (selectedConfig) {
        setSelectedConfigId(selectedConfig.id)
        setAvailableModels(selectedConfig.models)

        // 设置默认选中的模型
        const defaultModel = selectedConfig.models.find((m: any) => m.isDefault)
        if (defaultModel) {
          setSelectedModelId(defaultModel.id)
        } else if (selectedConfig.models.length > 0 && selectedConfig.models[0]) {
          setSelectedModelId(selectedConfig.models[0].id)
        }
      }
    } catch (err: any) {
      console.error('加载 AI 配置失败:', err)
      setConfigError(err.message || '无法加载 AI 配置列表')
    } finally {
      setLoadingConfigs(false)
    }
  }

  // 当选择的配置变化时，更新模型列表
  const handleConfigChange = (configId: string) => {
    setSelectedConfigId(configId)
    const selectedConfig = availableConfigs.find(c => c.id === configId)
    if (selectedConfig) {
      setAvailableModels(selectedConfig.models)
      const defaultModel = selectedConfig.models.find((m: any) => m.isDefault)
      if (defaultModel) {
        setSelectedModelId(defaultModel.id)
      } else if (selectedConfig.models.length > 0) {
        setSelectedModelId(selectedConfig.models[0].id)
      }
    }
  }

  const resetToConfig = () => {
    setPhase('config')
    setError(null)
    setGeneratedResults({})
    setEditedResults({})
    setCitations([])
    setGenerationProgress(null)
    setLogs([])

    // 清理 EventSource
    if (eventSourceRef.current) {
      eventSourceRef.current.close()
      eventSourceRef.current = null
    }
  }

  const handleGenerate = () => {
    // 验证
    if (!mainKeyword.trim()) {
      setError('主关键词为必填项')
      return
    }

    if (!selectedConfigId || !selectedModelId) {
      setError('请选择 AI 配置和模型')
      return
    }

    setPhase('generating')
    setError(null)
    setGenerationProgress(null)
    setLogs([])

    // 清理旧连接
    if (eventSourceRef.current) {
      eventSourceRef.current.close()
      eventSourceRef.current = null
    }

    try {
      // 构建 URL
      const url = new URL('/api/ai/generate-game-content-stream', window.location.origin)
      url.searchParams.set('gameTitle', gameTitle)
      url.searchParams.set('locale', locale)
      url.searchParams.set('keywords', mainKeyword.trim())

      if (subKeywords.trim()) {
        const subKeywordsList = subKeywords.split(',').map(k => k.trim())
        url.searchParams.set('subKeywords', JSON.stringify(subKeywordsList))
      }

      if (originalDescription) {
        url.searchParams.set('originalDescription', originalDescription)
      }

      // 🎯 markdownContent 可选（仅导入页面有）
      if (markdownContent) {
        url.searchParams.set('markdownContent', markdownContent)
      }

      if (extractedContent) {
        url.searchParams.set('extractedContent', extractedContent)
      }

      if (category) url.searchParams.set('category', category)
      if (categoryId) url.searchParams.set('categoryId', categoryId)

      url.searchParams.set('configId', selectedConfigId)
      url.searchParams.set('modelId', selectedModelId)
      url.searchParams.set('mode', seoMode)

      // 创建 SSE 连接
      const eventSource = new EventSource(url.toString())
      eventSourceRef.current = eventSource

      eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data)

          if (data.type === 'progress') {
            setGenerationProgress(data.data)
            if (data.data.step) {
              setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${data.data.step}`])
            }
          } else if (data.type === 'complete') {
            setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Generation completed successfully.`])
            setGeneratedResults(data.data.results)
            setEditedResults(data.data.results)
            setCitations(data.data.citations || [])
            setActivePreviewTab('description')
            setPhase('preview')
            setGenerationProgress(null)
            eventSource.close()
            eventSourceRef.current = null
          } else if (data.type === 'error') {
            setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Error: ${data.error}`])
            setError(data.error || '生成失败')
            // setPhase('config') // 保持在生成界面以显示错误日志
            setGenerationProgress(null)
            eventSource.close()
            eventSourceRef.current = null
          }
        } catch (err) {
          console.error('解析 SSE 消息失败:', err)
        }
      }

      eventSource.onerror = () => {
        setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Connection error.`])
        setError('连接失败，请检查网络后重试')
        // setPhase('config')
        setGenerationProgress(null)
        eventSource.close()
        eventSourceRef.current = null
      }
    } catch (err: any) {
      console.error('启动生成失败:', err)
      setError(err.message || '启动失败，请重试')
      setPhase('config')
    }
  }

  const handleRegenerate = () => {
    resetToConfig()
  }

  const handleApplyToForm = () => {
    onGenerated(editedResults)
    onOpenChange(false)
    setTimeout(resetToConfig, 300)
  }

  const handleClose = () => {
    // 允许在非生成状态 OR 生成出错时关闭
    if (phase !== 'generating' || error) {
      onOpenChange(false)
      setTimeout(resetToConfig, 300)
    }
  }

  // 计算当前步骤状态
  const getStepStatus = (stepId: string, currentPhase: string | undefined): 'pending' | 'active' | 'completed' => {
    const phases = ['searching', 'parsing', 'generating', 'finalizing']
    // 注意：后端SSE返回的phase名称可能与这里定义的不完全一致，需要对齐
    // 后端返回: 'searching', 'parsing', 'generating'
    // 映射关系:
    // searching -> searching
    // parsing -> parsing
    // generating -> generating (drafting + optimization)

    // 简化处理：根据后端返回的 phase 来决定
    const mapping: Record<string, number> = {
      'searching': 0,
      'parsing': 1,
      'generating': 2,
    }

    const currentPhaseIndex = mapping[currentPhase || 'searching'] || 0
    const stepIds = ['searching', 'parsing', 'generating', 'finalizing'] // Index: 0, 1, 2, 3
    const stepIndex = stepIds.indexOf(stepId)

    if (stepIndex < currentPhaseIndex) return 'completed'
    if (stepIndex === currentPhaseIndex) return 'active'
    if (currentPhase === 'generating' && stepIndex === 3) return 'active' // 都在 generating

    return 'pending'
  }

  const currentSteps = GENERATION_STEPS.map(step => {
    // 特殊处理：如果是 SEO 优化阶段，通常是生成的一部分
    let status: 'pending' | 'active' | 'completed' | 'error' = 'pending'

    // 如果出错了
    if (error) {
      status = 'error'
    } else {
      // 简单的进度映射逻辑
      if (generationProgress?.phase === 'searching') {
        if (step.id === 'searching') status = 'active'
        else status = 'pending'
      } else if (generationProgress?.phase === 'parsing') {
        if (step.id === 'searching') status = 'completed'
        else if (step.id === 'parsing') status = 'active'
        else status = 'pending'
      } else if (generationProgress?.phase === 'generating') {
        if (step.id === 'searching' || step.id === 'parsing') status = 'completed'
        else if (step.id === 'generating') status = 'active'
        else if (step.id === 'finalizing') status = 'pending' // 或者也 active
      }
    }

    return { ...step, status }
  })

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-5xl sm:max-w-5xl max-h-[85vh] overflow-y-auto p-0 gap-0 bg-white">
        <DialogHeader className="px-8 pt-8 pb-2">
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Sparkles className="w-5 h-5 text-purple-600" />
            AI 内容生成
          </DialogTitle>
          <DialogDescription className="text-base mt-2">
            {phase === 'config' && '配置生成选项，使用 AI 一次性生成所有字段的内容'}
            {phase === 'generating' && '正在生成内容，请自动滚动查看实时日志...'}
            {phase === 'preview' && '预览并编辑生成的内容，确认后应用到表单'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 px-8 pb-8 pt-2">
          {/* 配置阶段 */}
          {/* 配置阶段 */}
          {phase === 'config' && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 py-2">
              {/* 左侧：核心配置 */}
              <div className="md:col-span-8 space-y-8">
                {/* 游戏信息摘要 */}
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex items-start justify-between">
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">目标游戏</p>
                    <p className="text-base font-medium text-slate-900 line-clamp-1">{gameTitle || '未命名游戏'}</p>
                  </div>
                  <Badge variant="outline" className="text-slate-500 bg-white border-slate-200">
                    {locale.toUpperCase()}
                  </Badge>
                </div>

                {/* AI 供应商与模型 */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Database className="w-4 h-4 text-slate-400" />
                    <h3 className="text-base font-semibold text-slate-900">AI 参数配置</h3>
                  </div>

                  {loadingConfigs ? (
                    <div className="flex items-center gap-3 text-sm text-slate-500 p-4 border border-slate-100 rounded-xl bg-slate-50/50">
                      <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
                      正在加载模型配置...
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-xs text-slate-500 font-medium ml-1">AI 供应商</Label>
                        <Select value={selectedConfigId} onValueChange={handleConfigChange}>
                          <SelectTrigger className="h-10 bg-white border-slate-200 focus:ring-slate-100 rounded-lg">
                            <SelectValue placeholder="选择供应商" />
                          </SelectTrigger>
                          <SelectContent>
                            {availableConfigs.map((config) => (
                              <SelectItem key={config.id} value={config.id}>{config.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-xs text-slate-500 font-medium ml-1">模型版本</Label>
                        <Select value={selectedModelId} onValueChange={setSelectedModelId}>
                          <SelectTrigger className="h-10 bg-white border-slate-200 focus:ring-slate-100 rounded-lg">
                            <SelectValue placeholder="选择模型" />
                          </SelectTrigger>
                          <SelectContent>
                            {availableModels.map((model) => (
                              <SelectItem key={model.id} value={model.id}>
                                <div className="flex items-center gap-2">
                                  {model.name}
                                  {model.isDefault && <Badge variant="secondary" className="text-[10px] h-4 min-h-0 px-1">默认</Badge>}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}
                </div>

                {/* 关键词配置 */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Search className="w-4 h-4 text-slate-400" />
                    <h3 className="text-base font-semibold text-slate-900">关键词设置</h3>
                  </div>

                  <div className="space-y-4 p-5 border border-slate-100 rounded-xl bg-white shadow-sm">
                    <div className="space-y-2">
                      <Label htmlFor="main-keyword" className="text-sm font-medium text-slate-700">主关键词 <span className="text-red-400">*</span></Label>
                      <Input
                        id="main-keyword"
                        value={mainKeyword}
                        onChange={(e) => setMainKeyword(e.target.value)}
                        placeholder="例如：Action RPG, Puzzle, Strategy"
                        className="bg-slate-50/50 border-slate-200 focus-visible:ring-slate-200 focus-visible:border-slate-400 h-10"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="sub-keywords" className="text-sm font-medium text-slate-700">辅助标签</Label>
                      <Textarea
                        id="sub-keywords"
                        value={subKeywords}
                        onChange={(e) => setSubKeywords(e.target.value)}
                        placeholder="例如：multiplayer, 3D, open world (用逗号分隔)"
                        rows={3}
                        className="resize-none bg-slate-50/50 border-slate-200 focus-visible:ring-slate-200 focus-visible:border-slate-400 text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 右侧：生成模式与预览 */}
              <div className="md:col-span-4 space-y-8 pl-0 md:pl-4 border-l border-transparent md:border-slate-100">
                {/* 模式选择 */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-slate-400" />
                    <h3 className="text-base font-semibold text-slate-900">生成模式</h3>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setSeoMode('fast')}
                      className={`relative group p-4 rounded-xl border text-left transition-all duration-200 ${seoMode === 'fast'
                        ? 'bg-slate-900 border-slate-900 text-white shadow-md ring-2 ring-slate-200 ring-offset-2'
                        : 'bg-white border-slate-100 text-slate-600 hover:border-blue-200 hover:bg-blue-50/30 hover:shadow-sm'
                        }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <Cpu
                          className={`w-5 h-5 ${seoMode === 'fast' ? '!text-blue-400' : 'text-slate-400 group-hover:text-blue-500'}`}
                          style={{ color: seoMode === 'fast' ? '#60a5fa' : undefined }}
                        />
                        {seoMode === 'fast' && <div className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.6)]" />}
                      </div>
                      <p
                        className={`text-sm font-semibold mb-1 ${seoMode === 'fast' ? '!text-white' : 'text-slate-900 group-hover:text-blue-600'}`}
                        style={{ color: seoMode === 'fast' ? 'white' : undefined }}
                      >
                        快速模式
                      </p>
                      <p
                        className={`text-[10px] leading-tight ${seoMode === 'fast' ? '!text-slate-200' : 'text-slate-500 group-hover:text-slate-600'}`}
                        style={{ color: seoMode === 'fast' ? '#e2e8f0' : undefined }}
                      >
                        ~15s | 基础竞品分析
                      </p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSeoMode('quality')}
                      className={`relative group p-4 rounded-xl border text-left transition-all duration-200 ${seoMode === 'quality'
                        ? 'bg-slate-900 border-slate-900 text-white shadow-md ring-2 ring-slate-200 ring-offset-2'
                        : 'bg-white border-slate-100 text-slate-600 hover:border-purple-200 hover:bg-purple-50/30 hover:shadow-sm'
                        }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <Sparkles
                          className={`w-5 h-5 ${seoMode === 'quality' ? '!text-purple-400' : 'text-slate-400 group-hover:text-purple-500'}`}
                          style={{ color: seoMode === 'quality' ? '#c084fc' : undefined }}
                        />
                        {seoMode === 'quality' && <div className="w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(192,132,252,0.6)]" />}
                      </div>
                      <p
                        className={`text-sm font-semibold mb-1 ${seoMode === 'quality' ? '!text-white' : 'text-slate-900 group-hover:text-purple-700'}`}
                        style={{ color: seoMode === 'quality' ? 'white' : undefined }}
                      >
                        质量模式
                      </p>
                      <p
                        className={`text-[10px] leading-tight ${seoMode === 'quality' ? '!text-slate-200' : 'text-slate-500 group-hover:text-slate-600'}`}
                        style={{ color: seoMode === 'quality' ? '#e2e8f0' : undefined }}
                      >
                        ~30s | 深度 SEO 优化
                      </p>
                    </button>
                  </div>
                </div>

                {/* 生成字段预览 */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="w-4 h-4 text-slate-400" />
                    <h3 className="text-base font-semibold text-slate-900">生成字段预览</h3>
                  </div>

                  <div className="bg-slate-50/50 border border-slate-100 rounded-xl p-4">
                    <div className="gap-y-2 grid grid-cols-1">
                      {GENERATION_FIELDS.slice(0, 5).map(field => (
                        <div key={field.id} className="flex items-center gap-3 py-1">
                          <div className="flex items-center justify-center w-4 h-4 rounded-full bg-green-100 border border-green-200">
                            <CheckCircle2 className="w-2.5 h-2.5 text-green-600" />
                          </div>
                          <span className="text-sm text-slate-600">{field.label}</span>
                        </div>
                      ))}
                      <div className="flex items-center gap-3 py-1">
                        <div className="flex items-center justify-center w-4 h-4 rounded-full bg-green-100 border border-green-200">
                          <CheckCircle2 className="w-2.5 h-2.5 text-green-600" />
                        </div>
                        <span className="text-sm text-slate-500 italic">... 以及其他 4 个字段</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 生成阶段 - 新的 Timeline UI */}
          {phase === 'generating' && (
            <div className="py-2">
              <AiProgressTimeline
                steps={currentSteps}
                logs={logs}
                currentPhase={generationProgress?.phase || 'searching'}
                progress={generationProgress?.progress || 0}
              />
            </div>
          )}

          {/* 预览阶段 */}
          {phase === 'preview' && (
            <>
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-green-900">生成完成</p>
                  <p className="text-sm text-green-700 mt-1">
                    已成功生成 {Object.keys(generatedResults).length} 个字段的内容。您可以预览和编辑这些内容，确认后应用到表单。
                  </p>
                </div>
              </div>

              {/* 引用来源 */}
              {citations.length > 0 && (
                <div className="border rounded-lg p-4 bg-blue-50/50">
                  <div className="flex items-center gap-2 mb-3">
                    <Globe className="w-4 h-4 text-blue-600" />
                    <h4 className="text-sm font-medium text-blue-900">参考来源</h4>
                  </div>
                  <div className="space-y-2">
                    {citations.map((citation, idx) => (
                      <div key={idx} className="text-xs">
                        <a
                          href={citation.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          [{idx + 1}] {citation.title || citation.url}
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 可编辑内容标签页 */}
              <Tabs value={activePreviewTab} onValueChange={setActivePreviewTab}>
                <div className="border rounded-lg p-2 bg-gray-50 mb-4">
                  <TabsList className="h-auto flex flex-wrap gap-1 bg-transparent">
                    {GENERATION_FIELDS.map(field => (
                      <TabsTrigger
                        key={field.id}
                        value={field.id}
                        className="text-xs px-3 py-1.5 data-[state=active]:bg-purple-600 data-[state=active]:text-white"
                      >
                        {field.label}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>

                {GENERATION_FIELDS.map(field => (
                  <TabsContent key={field.id} value={field.id} className="space-y-3">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <Label htmlFor={`edit-${field.id}`} className="text-base font-medium">
                          {field.label}
                        </Label>
                        <p className="text-xs text-gray-500 mt-1">{field.description}</p>
                      </div>
                    </div>

                    {/* 根据字段类型选择编辑器 */}
                    {field.id === 'keywords' || field.id === 'metaTitle' || field.id === 'metaDescription' || field.id === 'description' ? (
                      // 简单文本字段
                      <Textarea
                        value={editedResults[field.id] || ''}
                        onChange={(e) => setEditedResults(prev => ({
                          ...prev,
                          [field.id]: e.target.value
                        }))}
                        rows={field.id === 'keywords' ? 2 : 3}
                        className="resize-none"
                      />
                    ) : (
                      // 富文本字段
                      <RichTextEditor
                        content={editedResults[field.id] || ''}
                        onChange={(html) => setEditedResults(prev => ({
                          ...prev,
                          [field.id]: html
                        }))}
                        placeholder={`生成的${field.label}内容将显示在这里...`}
                        characterLimit={FIELD_CHARACTER_LIMITS[field.id]}
                        showCharacterCount={true}
                        keywords={mainKeyword}
                        locale={locale}
                      />
                    )}

                    <p className="text-xs text-gray-500">
                      {FIELD_CHARACTER_LIMITS[field.id]
                        ? `✅ 此字段有字符限制（${FIELD_CHARACTER_LIMITS[field.id]} 单位）`
                        : '💡 此字段无字符限制，您可以自由编辑内容'
                      }
                    </p>
                  </TabsContent>
                ))}
              </Tabs>
            </>
          )}

          {/* 错误提示 */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-red-900">生成失败</p>
                <p className="text-sm text-red-700 mt-1">{error}</p>
              </div>
            </div>
          )}

          {/* 配置错误提示 */}
          {configError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-red-900">配置加载失败</p>
                <p className="text-sm text-red-700 mt-1">{configError}</p>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={loadAiConfigsAndModels}
                  className="mt-2"
                >
                  重新加载
                </Button>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="flex justify-between items-center border-t px-6 py-4">
          <div className="flex gap-2">
            {phase === 'preview' && (
              <Button variant="outline" onClick={handleRegenerate} className="gap-2">
                <RefreshCw className="w-4 h-4" />
                重新生成
              </Button>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleClose}>
              {phase === 'preview' ? '取消' : '关闭'}
            </Button>

            {/* 错误状态下显示重试按钮 */}
            {error && (
              <Button onClick={resetToConfig} variant="secondary">
                <RefreshCw className="w-4 h-4 mr-2" />
                重置并重试
              </Button>
            )}

            {phase === 'config' && (
              <Button onClick={handleGenerate} disabled={loadingConfigs || !!configError}>
                <Sparkles className="w-4 h-4 mr-2" />
                开始生成内容
              </Button>
            )}
            {phase === 'preview' && (
              <Button onClick={handleApplyToForm} className="bg-green-600 hover:bg-green-700">
                <CheckCircle2 className="w-4 h-4 mr-2" />
                应用到表单
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
