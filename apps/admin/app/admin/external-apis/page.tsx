"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import {
  Check,
  XCircle,
  BarChart3,
  Save,
  Eye,
  EyeOff,
} from "lucide-react"
import {
  getAllExternalApiConfigs,
  updateGoogleSearchConfig,
  updateJinaReaderConfig,
  resetApiCallStats,
} from "./actions"

export default function ExternalApisPage() {
  const { toast } = useToast()

  const [configs, setConfigs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // Google Search 配置
  const [googleApiKey, setGoogleApiKey] = useState("")
  const [googleEngineId, setGoogleEngineId] = useState("")
  const [showGoogleKey, setShowGoogleKey] = useState(false)

  // Jina Reader 配置
  const [jinaApiKey, setJinaApiKey] = useState("")
  const [showJinaKey, setShowJinaKey] = useState(false)

  // 加载配置
  useEffect(() => {
    loadConfigs()
  }, [])

  const loadConfigs = async () => {
    setLoading(true)
    const data = await getAllExternalApiConfigs()
    setConfigs(data)

    // 设置 Google Search 配置
    const googleConfig = data.find(c => c.name === 'google_search')
    if (googleConfig) {
      // 显示掩码值作为 placeholder，但不设置为 value
      // 用户看到的是掩码，但输入框是空的，避免意外覆盖
      setGoogleApiKey(googleConfig.apiConfig.apiKey || "")
      setGoogleEngineId(googleConfig.apiConfig.engineId || "")
    }

    // 设置 Jina Reader 配置
    const jinaConfig = data.find(c => c.name === 'jina_reader')
    if (jinaConfig) {
      setJinaApiKey(jinaConfig.apiConfig.apiKey || "")
    }

    setLoading(false)
  }

  // 保存 Google Search 配置
  const handleSaveGoogle = async () => {
    const result = await updateGoogleSearchConfig({
      apiKey: googleApiKey,
      engineId: googleEngineId,
    })

    if (result.success) {
      toast({
        title: "保存成功",
        description: "Google Search API 配置已更新",
      })
      loadConfigs()
    } else {
      toast({
        title: "保存失败",
        description: result.error,
        variant: "destructive",
      })
    }
  }

  // 保存 Jina Reader 配置
  const handleSaveJina = async () => {
    const result = await updateJinaReaderConfig({
      apiKey: jinaApiKey,
    })

    if (result.success) {
      toast({
        title: "保存成功",
        description: "Jina Reader API 配置已更新",
      })
      loadConfigs()
    } else {
      toast({
        title: "保存失败",
        description: result.error,
        variant: "destructive",
      })
    }
  }

  // 重置统计
  const handleResetStats = async (name: string) => {
    if (!confirm(`确定要重置 ${name === 'google_search' ? 'Google Search' : 'Jina Reader'} 的调用统计吗？`)) return

    const result = await resetApiCallStats(name)

    if (result.success) {
      toast({
        title: "重置成功",
        description: "统计数据已清零",
      })
      loadConfigs()
    } else {
      toast({
        title: "重置失败",
        description: result.error,
        variant: "destructive",
      })
    }
  }

  // 计算成功率
  const calculateSuccessRate = (config: any) => {
    if (config.totalCalls === 0) return 0
    return ((config.successCalls / config.totalCalls) * 100).toFixed(1)
  }

  // 获取配置
  const googleConfig = configs.find(c => c.name === 'google_search')
  const jinaConfig = configs.find(c => c.name === 'jina_reader')

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      {/* 页面标题 */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">外部 API 配置</h1>
        <p className="text-gray-500 mt-2">
          配置 Google Search 和 Jina Reader API，用于增强 AI 功能
        </p>
      </div>

      {loading ? (
        <div className="text-center py-8 text-gray-500">加载中...</div>
      ) : (
        <div className="space-y-6">
          {/* Google Search API 配置 */}
          <Card>
            <CardHeader>
              <CardTitle>Google Search API</CardTitle>
              <CardDescription>
                用于 GamePix 游戏导入时搜索竞品网站，提升内容质量
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* API Key */}
              <div>
                <Label>API Key *</Label>
                <div className="flex gap-2">
                  <Input
                    type={showGoogleKey ? "text" : "password"}
                    placeholder="AIzaSy..."
                    value={googleApiKey}
                    onChange={(e) => setGoogleApiKey(e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => setShowGoogleKey(!showGoogleKey)}
                  >
                    {showGoogleKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              {/* Engine ID */}
              <div>
                <Label>Search Engine ID *</Label>
                <Input
                  placeholder="a1b2c3d..."
                  value={googleEngineId}
                  onChange={(e) => setGoogleEngineId(e.target.value)}
                />
              </div>

              {/* 使用统计 */}
              {googleConfig && (
                <div className="border-t pt-4 mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium">使用统计</h4>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleResetStats('google_search')}
                    >
                      重置统计
                    </Button>
                  </div>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="p-3 bg-gray-50 rounded">
                      <div className="text-xs text-gray-500">总调用</div>
                      <div className="text-lg font-bold">{googleConfig.totalCalls}</div>
                    </div>
                    <div className="p-3 bg-green-50 rounded">
                      <div className="text-xs text-green-600">成功</div>
                      <div className="text-lg font-bold text-green-600">{googleConfig.successCalls}</div>
                    </div>
                    <div className="p-3 bg-red-50 rounded">
                      <div className="text-xs text-red-600">失败</div>
                      <div className="text-lg font-bold text-red-600">{googleConfig.failedCalls}</div>
                    </div>
                    <div className="p-3 bg-blue-50 rounded">
                      <div className="text-xs text-blue-600">成功率</div>
                      <div className="text-lg font-bold text-blue-600">{calculateSuccessRate(googleConfig)}%</div>
                    </div>
                  </div>
                </div>
              )}

              {/* 保存按钮 */}
              <div className="flex justify-end">
                <Button onClick={handleSaveGoogle}>
                  <Save className="h-4 w-4 mr-2" />
                  保存配置
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Jina Reader API 配置 */}
          <Card>
            <CardHeader>
              <CardTitle>Jina Reader API</CardTitle>
              <CardDescription>
                将网页转换为 LLM 友好的 Markdown 格式（可选 API Key，不配置则使用免费模式）
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* API Key */}
              <div>
                <Label>API Key（可选）</Label>
                <div className="flex gap-2">
                  <Input
                    type={showJinaKey ? "text" : "password"}
                    placeholder="jina_..."
                    value={jinaApiKey}
                    onChange={(e) => setJinaApiKey(e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => setShowJinaKey(!showJinaKey)}
                  >
                    {showJinaKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  留空则使用免费模式，配置 API Key 可提高速率限制
                </p>
              </div>

              {/* 使用统计 */}
              {jinaConfig && (
                <div className="border-t pt-4 mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium">使用统计</h4>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleResetStats('jina_reader')}
                    >
                      重置统计
                    </Button>
                  </div>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="p-3 bg-gray-50 rounded">
                      <div className="text-xs text-gray-500">总调用</div>
                      <div className="text-lg font-bold">{jinaConfig.totalCalls}</div>
                    </div>
                    <div className="p-3 bg-green-50 rounded">
                      <div className="text-xs text-green-600">成功</div>
                      <div className="text-lg font-bold text-green-600">{jinaConfig.successCalls}</div>
                    </div>
                    <div className="p-3 bg-red-50 rounded">
                      <div className="text-xs text-red-600">失败</div>
                      <div className="text-lg font-bold text-red-600">{jinaConfig.failedCalls}</div>
                    </div>
                    <div className="p-3 bg-blue-50 rounded">
                      <div className="text-xs text-blue-600">成功率</div>
                      <div className="text-lg font-bold text-blue-600">{calculateSuccessRate(jinaConfig)}%</div>
                    </div>
                  </div>
                </div>
              )}

              {/* 保存按钮 */}
              <div className="flex justify-end">
                <Button onClick={handleSaveJina}>
                  <Save className="h-4 w-4 mr-2" />
                  保存配置
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 说明信息 */}
          <Card>
            <CardHeader>
              <CardTitle>使用说明</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Google Search API</h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• 用于 GamePix 游戏导入时搜索 Google 排名前列的网站</li>
                    <li>• 配额：免费 100 次/天，付费 $5/1000 次</li>
                    <li>• 申请地址：<a href="https://console.cloud.google.com/" target="_blank" className="text-blue-600 hover:underline">Google Cloud Console</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Jina Reader API</h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• 将网页转换为干净的 Markdown 格式，供 AI 处理</li>
                    <li>• 免费模式：无需 API Key，有基础速率限制</li>
                    <li>• 付费模式：配置 API Key 后享受更高速率限制</li>
                    <li>• 申请地址：<a href="https://jina.ai/" target="_blank" className="text-blue-600 hover:underline">Jina AI</a></li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
