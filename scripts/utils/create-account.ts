/**
 * 为现有管理员创建 Account 记录
 */

import { PrismaClient } from '../../packages/database-admin/generated/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import bcrypt from 'bcryptjs'

const connectionString = "postgresql://neondb_owner:npg_w2EnO8MtoPrY@ep-old-tooth-ad1g5ave-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require"

const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false },
})

const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function createAccountForAdmin() {
  try {
    await prisma.$connect()
    console.log('✅ 数据库连接成功\n')

    // 获取所有管理员
    const admins = await prisma.user.findMany()

    if (admins.length === 0) {
      console.log('❌ 没有找到管理员账户')
      return
    }

    console.log(`👤 找到 ${admins.length} 个管理员账户\n`)

    for (const admin of admins) {
      console.log(`处理管理员: ${admin.email}`)

      // 检查是否已有 Account
      const existingAccount = await prisma.account.findFirst({
        where: {
          userId: admin.id,
          providerId: 'credential'
        }
      })

      if (existingAccount) {
        console.log(`  ⚠️  已存在 Account 记录，跳过`)
        continue
      }

      // 创建密码哈希
      const passwordHash = await bcrypt.hash('admin123', 10)

      // 创建 Account 记录
      await prisma.account.create({
        data: {
          id: `acc_${admin.id}`,
          accountId: admin.id,
          providerId: 'credential',
          userId: admin.id,
          password: passwordHash,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      })

      console.log(`  ✅ 成功创建 Account 记录`)
      console.log(`     邮箱: ${admin.email}`)
      console.log(`     密码: admin123`)
    }

    console.log('\n✅ 所有管理员账户处理完成！')
    console.log('\n🔐 登录信息:')
    console.log('   地址: https://admin.rungame.online/login')
    console.log('   密码: admin123 (通用密码)')

  } catch (error) {
    console.error('❌ 错误:', error)
  } finally {
    await prisma.$disconnect()
  }
}

createAccountForAdmin()
