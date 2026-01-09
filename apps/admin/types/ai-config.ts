import type { AiConfig as PrismaAiConfig } from '@prisma/client'

export type AiConfig = PrismaAiConfig

export interface AiModelParameters {
    [key: string]: any
}

export interface AiModel {
    id: string
    name: string
    isDefault?: boolean
    isEnabled?: boolean
    description?: string
    headers?: Record<string, string>
    parameters?: AiModelParameters
}

export interface AiModelConfig {
    models: Array<AiModel>
    [key: string]: any
}

export interface AiProviderTemplate {
    provider: string
    name: string
    displayName: string
    baseUrl: string
    description: string
    docUrl: string
    defaultModels: AiModel[]
}
