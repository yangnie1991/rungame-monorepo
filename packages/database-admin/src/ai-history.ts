import { prismaAdmin } from './index'

/**
 * ============================================
 * AI Chat History Utilities
 * ============================================
 */

export async function getAiChatHistory(gameId: string, locale: string) {
    return await prismaAdmin.aiChatHistory.findUnique({
        where: {
            gameId_locale: {
                gameId,
                locale
            }
        }
    })
}

export async function saveAiChatHistory(gameId: string, locale: string, messages: any[], tokenCount: number) {
    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + 7) // 7天过期

    return await prismaAdmin.aiChatHistory.upsert({
        where: {
            gameId_locale: {
                gameId,
                locale
            }
        },
        update: {
            messages,
            totalTokens: {
                increment: tokenCount
            },
            messageCount: messages.length,
            lastUsedAt: new Date(),
            expiresAt
        },
        create: {
            gameId,
            locale,
            messages,
            totalTokens: tokenCount,
            messageCount: messages.length,
            expiresAt
        }
    })
}
