import { PrismaClient } from '../../packages/database-admin/generated/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'

const connectionString = "postgresql://neondb_owner:npg_w2EnO8MtoPrY@ep-old-tooth-ad1g5ave-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require"

const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false },
})

const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function quickCheck() {
  try {
    await prisma.$connect()
    console.log('✅ 数据库连接成功\n')

    // 检查关键表是否存在
    const tables = ['admins', 'account', 'session', 'verification']
    console.log('📊 检查关键表:\n')

    for (const tableName of tables) {
      try {
        const count = await (prisma as any)[tableName === 'admins' ? 'user' : tableName].count()
        console.log(`✅ ${tableName}: ${count} 条记录`)
      } catch (error: any) {
        if (error.code === 'P2025') {
          console.log(`❌ ${tableName}: 表不存在`)
        } else {
          console.log(`⚠️  ${tableName}: 查询失败 - ${error.message}`)
        }
      }
    }

    // 检查管理员账户
    console.log('\n👤 管理员账户:')
    const admins = await prisma.user.findMany()
    if (admins.length > 0) {
      console.log(`✅ 共 ${admins.length} 个管理员账户`)
      for (const admin of admins) {
        console.log(`   - ${admin.email} (${admin.name})`)
      }
    } else {
      console.log('❌ 没有管理员账户')
    }

    // 检查 Account 关联
    console.log('\n🔑 Account 关联:')
    const accounts = await prisma.account.count()
    console.log(`✅ Account 表记录数: ${accounts}`)

    console.log('\n✅ 数据库状态检查完成！')

  } catch (error) {
    console.error('❌ 错误:', error)
  } finally {
    await prisma.$disconnect()
  }
}

quickCheck()
