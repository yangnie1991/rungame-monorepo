/**
 * 检查生产数据库 Admin 表内容
 * 用于诊断生产环境的数据库状态
 *
 * 使用方法:
 * 1. 直接设置生产数据库连接字符串（推荐）
 *    CACHE_DATABASE_URL="生产连接字符串" pnpm tsx scripts/utils/check-admin-tables.ts
 *
 * 2. 或者修改下方的 PRODUCTION_DB_URL 变量
 */

import { PrismaClient } from '../../packages/database-admin/generated/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'

// ========== 配置生产数据库连接字符串 ==========
// 方式 1: 使用环境变量（推荐，避免硬编码）
let connectionString = process.env.CACHE_DATABASE_URL

// 方式 2: 如果环境变量未设置，使用下方硬编码的生产连接字符串
if (!connectionString) {
  // 在这里粘贴你的生产数据库连接字符串
  connectionString = "postgresql://neondb_owner:npg_w2EnO8MtoPrY@ep-old-tooth-ad1g5ave-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require"
}

if (!connectionString) {
  console.error('❌ 未设置生产数据库连接字符串')
  console.error('\n请选择以下方式之一:')
  console.error('1. 设置环境变量:')
  console.error('   export CACHE_DATABASE_URL="你的连接字符串"')
  console.error('2. 或直接在脚本中修改 PRODUCTION_DB_URL 变量')
  process.exit(1)
}

// 从连接字符串提取 SSL 配置
const url = new URL(connectionString.replace('postgres://', 'http://').replace('postgresql://', 'http://'))
const sslmode = url.searchParams.get('sslmode')

const pool = new Pool({
  connectionString,
  ssl: sslmode === 'require' || sslmode === 'prefer' ? { rejectUnauthorized: false } : false,
})

const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function checkAdminTables() {
  console.log('==========================================')
  console.log('🔍 检查生产数据库 Admin 表内容')
  console.log('==========================================')
  console.log(`\n📡 连接数据库: ${connectionString.replace(/:[^:@]*@/, ':****@')}`)
  console.log(`🔒 SSL 模式: ${sslmode || 'none'}`)
  console.log(`🏷️  环境: 生产环境 (Production)\n`)

  try {
    // 测试连接
    await prisma.$connect()
    console.log('✅ 数据库连接成功\n')

    // 1. 检查 User 表 (admins)
    console.log('==========================================')
    console.log('👤 User 表 (admins)')
    console.log('==========================================')
    const users = await prisma.$queryRaw`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'admins'`

    if (Array.isArray(users) && users.length > 0) {
      const admins = await prisma.$queryRaw<any[]>`SELECT id, email, name, role, is_active, created_at FROM admins ORDER BY created_at DESC`
      console.log(`总记录数: ${admins.length}\n`)

      if (admins.length === 0) {
        console.log('⚠️  警告: User 表为空，没有管理员账户')
      } else {
        console.table(admins.map(a => ({
          ID: a.id.substring(0, 8) + '...',
          邮箱: a.email,
          姓名: a.name,
          角色: a.role,
          状态: a.is_active ? '✅ 启用' : '❌ 禁用',
          创建时间: a.created_at,
        })))
      }
    } else {
      console.log('❌ User 表不存在')
    }

    // 2. 检查 Account 表
    console.log('\n==========================================')
    console.log('🔑 Account 表')
    console.log('==========================================')
    const accountTable = await prisma.$queryRaw`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'account'`

    if (Array.isArray(accountTable) && accountTable.length > 0) {
      const accounts = await prisma.$queryRaw<any[]>`SELECT id, user_id, "providerId", created_at FROM account ORDER BY created_at DESC`
      console.log(`总记录数: ${accounts.length}\n`)
      console.table(accounts.map(a => ({
        ID: a.id.substring(0, 8) + '...',
        用户ID: a.user_id.substring(0, 8) + '...',
        提供商: a.providerId,
        创建时间: a.created_at,
      })))
    } else {
      console.log('❌ Account 表不存在')
    }

    // 3. 检查 Session 表
    console.log('\n==========================================')
    console.log('🔐 Session 表')
    console.log('==========================================')
    const sessionTable = await prisma.$queryRaw`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'session'`

    if (Array.isArray(sessionTable) && sessionTable.length > 0) {
      const sessions = await prisma.$queryRaw<any[]>`SELECT id, user_id, expires_at, created_at FROM session ORDER BY created_at DESC LIMIT 10`
      const totalSessions = await prisma.$queryRaw<any[]>`SELECT COUNT(*) as count FROM session`
      console.log(`总记录数: ${totalSessions[0]?.count || 0}\n`)
      console.table(sessions.map(s => ({
        ID: s.id.substring(0, 8) + '...',
        用户ID: s.user_id.substring(0, 8) + '...',
        过期时间: s.expires_at,
        创建时间: s.created_at,
      })))
    } else {
      console.log('❌ Session 表不存在')
    }

    // 4. 检查所有表的创建情况
    console.log('\n==========================================')
    console.log('📊 Admin 数据库表结构检查')
    console.log('==========================================')

    const tables = [
      { name: 'admins', label: 'User 表 (管理员)' },
      { name: 'account', label: 'Account 表 (账户)' },
      { name: 'session', label: 'Session 表 (会话)' },
      { name: 'verification', label: 'Verification 表 (验证)' },
      { name: 'ai_configs', label: 'AI 配置' },
      { name: 'external_api_configs', label: '外部 API 配置' },
      { name: 'import_platforms', label: '导入平台' },
      { name: 'search_engine_configs', label: '搜索引擎配置' },
      { name: 'url_submissions', label: 'URL 提交记录' },
      { name: 'submission_batches', label: '批量提交任务' },
      { name: 'gamepix_games_cache', label: 'GamePix 缓存' },
      { name: 'sync_logs', label: '同步日志' },
      { name: 'ai_chat_history', label: 'AI 对话历史' },
    ]

    const tableResults: { name: string; label: string; exists: boolean; count?: number }[] = []

    for (const table of tables) {
      try {
        // 使用 Prisma 的标准查询方式
        const result = await prisma.$queryRawUnsafe<any[]>(
          `SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_name = '${table.name}'`
        )

        if (Array.isArray(result) && result.length > 0) {
          // 表存在，获取记录数
          const countResult = await prisma.$queryRawUnsafe<any[]>(
            `SELECT COUNT(*) as count FROM "${table.name}"`
          )
          const count = parseInt(countResult[0]?.count || '0')
          tableResults.push({ ...table, exists: true, count })
        } else {
          tableResults.push({ ...table, exists: false })
        }
      } catch (error) {
        tableResults.push({ ...table, exists: false })
      }
    }

    // 显示结果
    console.log('\n表状态总览:\n')
    const existingTables = tableResults.filter(t => t.exists)
    const missingTables = tableResults.filter(t => !t.exists)

    console.log(`✅ 已创建 (${existingTables.length}/${tables.length}):`)
    for (const table of existingTables) {
      console.log(`   ${table.label} (${table.name}): ${table.count} 条记录`)
    }

    if (missingTables.length > 0) {
      console.log(`\n❌ 缺失 (${missingTables.length}/${tables.length}):`)
      for (const table of missingTables) {
        console.log(`   ${table.label} (${table.name})`)
      }
    }

    // 5. 诊断建议
    console.log('\n==========================================')
    console.log('💡 诊断建议')
    console.log('==========================================')

    if (missingTables.length > 0) {
      console.log(`⚠️  生产数据库缺少 ${missingTables.length} 个表，无法正常工作`)
      console.log('\n🔧 解决方案:')
      console.log('   1. 运行数据库迁移创建缺失的表:')
      console.log('      CACHE_DATABASE_URL="生产连接字符串" \\')
      console.log('      pnpm db:push --schema=packages/database-admin/prisma/schema.prisma')
      console.log('\n   2. 或者使用 Prisma Migrate (推荐生产环境):')
      console.log('      CACHE_DATABASE_URL="生产连接字符串" \\')
      console.log('      pnpm db:migrate deploy --schema=packages/database-admin/prisma/schema.prisma')
      console.log('\n   3. 然后运行 seed 初始化管理员数据:')
      console.log('      CACHE_DATABASE_URL="生产连接字符串" \\')
      console.log('      pnpm --filter @rungame/database-admin db:seed')
    } else {
      const adminTable = tableResults.find(t => t.name === 'admins')
      const accountTable = tableResults.find(t => t.name === 'account')

      if (adminTable?.exists && adminTable.count === 0) {
        console.log('⚠️  User 表为空，需要运行 seed 创建管理员账户:')
        console.log('   CACHE_DATABASE_URL="生产连接字符串" \\')
        console.log('   pnpm --filter @rungame/database-admin db:seed')
      } else if (accountTable?.exists && accountTable.count === 0) {
        console.log('⚠️  Account 表为空，用户无法登录:')
        console.log('   CACHE_DATABASE_URL="生产连接字符串" \\')
        console.log('   pnpm --filter @rungame/database-admin db:seed')
      } else {
        console.log('✅ Admin 表结构正常，可以尝试登录')
        console.log('   登录地址: https://admin.rungame.online/login')
        console.log('   管理员邮箱: admin@rungame.online')
        console.log('   默认密码: admin123')
      }
    }

  } catch (error) {
    console.error('\n❌ 查询数据库时出错:', error)

    if (error instanceof Error) {
      console.error(`错误详情: ${error.message}`)

      // 提供针对性的建议
      if (error.message.includes('SSL')) {
        console.log('\n💡 SSL 错误解决方案:')
        console.log('   1. 确认连接字符串包含 ?sslmode=require')
        console.log('   2. 检查数据库是否允许 SSL 连接')
      } else if (error.message.includes('connect') || error.message.includes('ECONNREFUSED')) {
        console.log('\n💡 连接错误解决方案:')
        console.log('   1. 检查数据库是否运行')
        console.log('   2. 检查 IP 白名单设置')
        console.log('   3. 确认数据库地址和端口正确')
      } else if (error.message.includes('relation') || error.message.includes('does not exist')) {
        console.log('\n💡 表不存在错误解决方案:')
        console.log('   1. 运行数据库迁移创建表:')
        console.log('      pnpm db:push --schema=packages/database-admin/prisma/schema.prisma')
        console.log('   2. 或者运行 seed 初始化数据:')
        console.log('      pnpm --filter @rungame/database-admin db:seed')
      }
    }

    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

checkAdminTables()
