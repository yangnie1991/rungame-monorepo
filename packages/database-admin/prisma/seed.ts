import { PrismaClient } from '../generated/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import bcrypt from 'bcryptjs'

const connectionString = process.env.CACHE_DATABASE_URL
const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
    console.log('🌱 开始填充 Admin 数据库...')

    // ==================== 1. 管理员数据 ====================
    console.log('\n👤 检查管理员数据...')

    const adminEmail = 'admin@rungame.online'
    const passwordHash = await bcrypt.hash('admin123', 10)

    const existingAdmin = await prisma.user.findUnique({
        where: { email: adminEmail }
    })

    if (!existingAdmin) {
        // 创建超级管理员
        console.log(`   ✓ 创建用户: Super Admin (${adminEmail})`)
        const admin = await prisma.user.create({
            data: {
                email: adminEmail,
                name: 'Super Admin',
                role: 'SUPER_ADMIN',
                isActive: true,
                emailVerified: true,
                password: passwordHash, // 兼容性字段
                accounts: {
                    create: {
                        id: 'acc_admin_seed_' + Date.now(),
                        accountId: 'admin_account_id',
                        providerId: 'credential',
                        password: passwordHash,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    }
                }
            }
        })
        console.log(`   ✓ 密码已设置 (Hash)`)
    } else {
        // 更新现有用户密码
        await prisma.user.update({
            where: { email: adminEmail },
            data: {
                password: passwordHash
            }
        })

        const linkedAccount = await prisma.account.findFirst({
            where: { userId: existingAdmin.id, providerId: 'credential' }
        })

        if (linkedAccount) {
            await prisma.account.update({
                where: { id: linkedAccount.id },
                data: { password: passwordHash }
            })
            console.log(`   ✓ 更新管理员账户密码`)
        } else {
            // 如果只有用户但没有账户记录
            await prisma.account.create({
                data: {
                    id: 'acc_admin_seed_' + Date.now(),
                    accountId: 'admin_account_id',
                    providerId: 'credential',
                    userId: existingAdmin.id,
                    password: passwordHash,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            })
            console.log(`   ✓ 创建管理员关联账户`)
        }
        console.log(`   ✓ 管理员已存在并更新: ${existingAdmin.email}`)
    }

    // ==================== 2. AI 配置默认数据 ====================
    console.log('\n🤖 检查 AI 配置...')

    const defaultConfig = {
        name: 'OpenRouter - Gemini 2.0 Flash',
        provider: 'openrouter',
        apiKey: process.env.OPENROUTER_API_KEY || 'sk-or-v1-placeholder',
        baseUrl: 'https://openrouter.ai/api/v1',
        modelConfig: {
            models: [
                {
                    id: 'google/gemini-2.0-flash-exp:free',
                    name: 'Gemini 2.0 Flash',
                    isDefault: true,
                    isEnabled: true,
                    parameters: {
                        temperature: 0.7,
                        max_tokens: 2000,
                        top_p: 1.0
                    }
                }
            ]
        },
        isActive: true,
        isEnabled: true
    }

    const existingAiConfig = await prisma.aiConfig.findFirst({
        where: { provider: 'openrouter' }
    })

    if (!existingAiConfig) {
        await prisma.aiConfig.create({
            data: defaultConfig
        })
        console.log(`   ✓ 创建默认 AI 配置: ${defaultConfig.name}`)
    } else {
        console.log(`   ✓ AI 配置已存在`)
    }

    console.log('\n✅ Admin 数据库填充完成！')
}

main()
    .catch((e) => {
        console.error('❌ 填充数据库时出错：', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
