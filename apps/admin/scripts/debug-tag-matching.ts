/**
 * 标签匹配诊断脚本
 *
 * 用于检查：
 * 1. 数据库中 Tag.name 的实际值（英文/中文？）
 * 2. GamePix extractedTags 的格式
 * 3. 匹配逻辑是否正确
 */

import { prisma } from '@rungame/database'

async function diagnose() {
  console.log('🔍 开始诊断标签匹配问题...\n')

  // 1. 检查数据库中的标签数据
  console.log('📊 步骤 1: 检查数据库中的前 10 个标签')
  console.log('=' .repeat(80))

  const dbTags = await prisma.tag.findMany({
    take: 10,
    select: {
      id: true,
      slug: true,
      name: true, // 主表的 name 字段
      translations: {
        select: {
          locale: true,
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  dbTags.forEach((tag, index) => {
    console.log(`\n${index + 1}. 标签 ID: ${tag.id}`)
    console.log(`   Slug: "${tag.slug}"`)
    console.log(`   主表 Name: "${tag.name}"  ← 这是匹配时使用的值`)
    if (tag.translations.length > 0) {
      console.log(`   翻译:`)
      tag.translations.forEach((t) => {
        console.log(`     - ${t.locale}: "${t.name}"`)
      })
    } else {
      console.log(`   翻译: (无)`)
    }
  })

  // 2. 检查 GamePix 缓存中的标签数据
  console.log('\n\n📊 步骤 2: 检查 GamePix 缓存中的标签数据')
  console.log('=' .repeat(80))

  const { prismaCache } = await import('@/lib/prisma-cache')

  const gameCaches = await prismaCache.gamePixGameCache.findMany({
    take: 5,
    where: {
      extractedTags: {
        isEmpty: false,
      },
    },
    select: {
      namespace: true,
      extractedTags: true,
    },
    orderBy: {
      extractedAt: 'desc',
    },
  })

  if (gameCaches.length === 0) {
    console.log('⚠️  未找到包含 extractedTags 的缓存数据')
  } else {
    gameCaches.forEach((cache, index) => {
      console.log(`\n${index + 1}. 游戏: ${cache.namespace}`)
      console.log(`   提取的标签: ${cache.extractedTags.length} 个`)
      cache.extractedTags.forEach((tag: string, i: number) => {
        console.log(`     ${i + 1}. "${tag}"`)
      })
    })
  }

  // 3. 模拟匹配测试
  console.log('\n\n📊 步骤 3: 模拟匹配测试')
  console.log('=' .repeat(80))

  // 获取所有标签用于匹配
  const allTags = await prisma.tag.findMany({
    select: {
      id: true,
      name: true,
    },
  })

  console.log(`\n数据库中共有 ${allTags.length} 个标签`)

  // 测试标签（模拟 GamePix 返回的标签）
  const testTags = [
    'Action',
    'action',
    'ACTION',
    ' Action ',
    'Puzzle',
    'puzzle',
    'Adventure',
    'adventure',
    'Racing',
    'Casual',
  ]

  console.log(`\n测试标签: ${testTags.length} 个`)
  console.log('测试匹配逻辑: dbTag.name.toLowerCase() === inputTag.trim().toLowerCase()\n')

  testTags.forEach((testTag) => {
    const normalized = testTag.trim()
    const matched = allTags.find(
      (dbTag) => dbTag.name.toLowerCase() === normalized.toLowerCase()
    )

    if (matched) {
      console.log(`✅ "${testTag}" → 匹配成功 → ID: ${matched.id}, Name: "${matched.name}"`)
    } else {
      console.log(`❌ "${testTag}" → 匹配失败 (需要创建新标签)`)
    }
  })

  // 4. 详细分析
  console.log('\n\n📊 步骤 4: 问题分析')
  console.log('=' .repeat(80))

  console.log('\n可能的问题：')
  console.log('1. Tag.name 字段是否是英文？')
  console.log('   - 如果 Tag.name 是中文，而 GamePix 返回英文，则无法匹配')
  console.log('   - 解决：应该使用 slug 字段匹配（slug 通常是英文）')

  console.log('\n2. GamePix extractedTags 格式是否正确？')
  console.log('   - 是否包含多余的空格、特殊字符？')
  console.log('   - 是否大小写不一致？')

  console.log('\n3. 匹配逻辑是否正确？')
  console.log('   - 当前逻辑: dbTag.name.toLowerCase() === normalizedName.toLowerCase()')
  console.log('   - 是否应该同时匹配 slug？')

  console.log('\n\n✅ 诊断完成')
}

diagnose()
  .catch((error) => {
    console.error('诊断过程出错:', error)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
