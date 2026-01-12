/**
 * AI 任务检查点管理工具
 *
 * 用于在 AI 生成任务的关键阶段保存中间结果到数据库，
 * 支持任务失败后从最近的检查点恢复执行。
 *
 * @module ai-checkpoint
 */

import { prismaAdmin } from "@rungame/database-admin"

export type CheckpointPhase = 'searching' | 'parsing' | 'filtering' | 'generating'

export interface CheckpointData {
  phase: CheckpointPhase
  progress: number
  data: any
}

export interface SearchingCheckpointData {
  searchResults: Array<{
    title: string
    url: string
    snippet: string
  }>
  timestamp: string
}

export interface ParsingCheckpointData {
  webContents: string[]
  statistics: {
    urlsSucceeded: number
    urlsFailed: number
    retries: number
    urlsProcessed: number
  }
  timestamp: string
}

export interface FilteringCheckpointData {
  filteredWebsites: Array<{
    title: string
    url: string
    content: string
    confidence?: number
    relevanceScore?: number
    reasoning?: string
  }>
  timestamp: string
}

export interface GeneratingCheckpointData {
  success: boolean
  generatedContent: any
  rawResponse?: string
  parseMethod?: string
  timestamp: string
}

/**
 * 保存检查点到数据库（独立字段）
 *
 * @param taskId - 任务 ID
 * @param params - 检查点参数
 */
export async function saveCheckpoint(
  taskId: string,
  { phase, progress, data }: CheckpointData
): Promise<void> {
  try {
    // 根据 phase 选择更新哪个字段
    const fieldMap = {
      searching: 'searchingCheckpoint',
      parsing: 'parsingCheckpoint',
      filtering: 'filteringCheckpoint',
      generating: 'generatingCheckpoint'
    }

    const fieldName = fieldMap[phase]

    await prismaAdmin.aITask.update({
      where: { id: taskId },
      data: {
        [fieldName]: {
          ...data,
          timestamp: new Date().toISOString()
        },
        currentStep: phase,
        progress,
        lastCheckpoint: new Date()
      }
    })

    console.log(`[检查点] ✅ 已保存到字段 ${fieldName}: ${phase} (${progress}%)`)
  } catch (error) {
    console.error(`[检查点] ❌ 保存失败 [${phase}]:`, error)
    // 不抛出错误，避免中断主流程
  }
}

/**
 * 从独立字段加载检查点
 *
 * @param taskId - 任务 ID
 * @param phase - 检查点阶段
 * @returns 检查点数据或 null
 */
export async function loadCheckpoint(
  taskId: string,
  phase: CheckpointPhase
): Promise<any | null> {
  try {
    const fieldMap = {
      searching: 'searchingCheckpoint',
      parsing: 'parsingCheckpoint',
      filtering: 'filteringCheckpoint',
      generating: 'generatingCheckpoint'
    }

    const fieldName = fieldMap[phase]

    const task = await prismaAdmin.aITask.findUnique({
      where: { id: taskId },
      select: { [fieldName]: true }
    })

    return task?.[fieldName as keyof typeof task] || null
  } catch (error) {
    console.error(`[检查点] ❌ 加载失败 [${phase}]:`, error)
    return null
  }
}

/**
 * 检查是否可以从指定阶段恢复
 *
 * @param taskId - 任务 ID
 * @param phase - 检查点阶段
 * @returns true 如果检查点存在，否则 false
 */
export async function canResumeFrom(
  taskId: string,
  phase: CheckpointPhase
): Promise<boolean> {
  const data = await loadCheckpoint(taskId, phase)
  return data !== null
}

/**
 * 清理所有检查点（任务完成后可选）
 *
 * @param taskId - 任务 ID
 */
export async function clearCheckpoints(taskId: string): Promise<void> {
  try {
    await prismaAdmin.aITask.update({
      where: { id: taskId },
      data: {
        searchingCheckpoint: null,
        parsingCheckpoint: null,
        filteringCheckpoint: null,
        generatingCheckpoint: null
      }
    })
    console.log(`[检查点] 🗑️ 已清理所有检查点 [${taskId}]`)
  } catch (error) {
    console.error(`[检查点] ❌ 清理失败 [${taskId}]:`, error)
  }
}

/**
 * 获取任务的所有检查点信息
 *
 * @param taskId - 任务 ID
 * @returns 包含所有检查点的对象
 */
export async function getAllCheckpoints(taskId: string): Promise<{
  searching: any
  parsing: any
  filtering: any
  generating: any
}> {
  try {
    const task = await prismaAdmin.aITask.findUnique({
      where: { id: taskId },
      select: {
        searchingCheckpoint: true,
        parsingCheckpoint: true,
        filteringCheckpoint: true,
        generatingCheckpoint: true
      }
    })

    return {
      searching: task?.searchingCheckpoint || null,
      parsing: task?.parsingCheckpoint || null,
      filtering: task?.filteringCheckpoint || null,
      generating: task?.generatingCheckpoint || null
    }
  } catch (error) {
    console.error(`[检查点] ❌ 获取所有检查点失败 [${taskId}]:`, error)
    return {
      searching: null,
      parsing: null,
      filtering: null,
      generating: null
    }
  }
}

/**
 * 更新任务状态和错误信息
 *
 * @param taskId - 任务 ID
 * @param params - 更新参数
 */
export async function updateTaskStatus(
  taskId: string,
  params: {
    status: 'PENDING' | 'PROCESSING' | 'WAITING_CONFIRM' | 'COMPLETED' | 'FAILED' | 'CANCELLED'
    progress?: number
    currentStep?: string
    errorMessage?: string
    errorDetails?: any
    requiresAction?: boolean
  }
): Promise<void> {
  try {
    await prismaAdmin.aITask.update({
      where: { id: taskId },
      data: {
        ...params,
        ...(params.status === 'COMPLETED' && { completedAt: new Date() }),
        ...(params.status === 'PROCESSING' && !params.progress && { startedAt: new Date() })
      }
    })

    console.log(`[任务状态] ✅ 已更新: ${taskId} -> ${params.status} (${params.progress || 0}%)`)
  } catch (error) {
    console.error(`[任务状态] ❌ 更新失败 [${taskId}]:`, error)
    throw error
  }
}

/**
 * 创建新的 AI 任务
 *
 * @param params - 任务参数
 * @returns 创建的任务 ID
 */
export async function createAITask(params: {
  taskType: string
  inputData: any
}): Promise<string> {
  try {
    const task = await prismaAdmin.aITask.create({
      data: {
        taskType: params.taskType,
        status: 'PENDING',
        progress: 0,
        inputData: params.inputData
      }
    })

    console.log(`[任务创建] ✅ 已创建任务: ${task.id}`)
    return task.id
  } catch (error) {
    console.error(`[任务创建] ❌ 创建失败:`, error)
    throw error
  }
}
