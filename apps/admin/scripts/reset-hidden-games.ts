/**
 * 重置错误标记的下架游戏
 * 用于修复之前bug导致的错误标记
 */

import { config } from 'dotenv'
import { resolve } from 'path'

// 加载环境变量
config({ path: resolve(__dirname, '../.env.local') })

import { prismaCache } from '../lib/prisma-cache'

async function resetHiddenGames() {
  console.log('开始重置错误标记的下架游戏...')

  try {
    // 1. 先查询当前有多少游戏被标记为已下架
    const hiddenCount = await prismaCache.gamePixGameCache.count({
      where: { isHidden: true },
    })

    console.log(`当前有 ${hiddenCount} 个游戏被标记为已下架`)

    if (hiddenCount === 0) {
      console.log('没有需要重置的游戏')
      return
    }

    // 2. 将所有被标记为已下架的游戏重置为正常状态
    const result = await prismaCache.gamePixGameCache.updateMany({
      where: { isHidden: true },
      data: { isHidden: false },
    })

    console.log(`成功重置 ${result.count} 个游戏的下架状态`)
    console.log('✅ 重置完成！现在可以重新运行全量同步了')
  } catch (error) {
    console.error('重置失败:', error)
  } finally {
    await prismaCache.$disconnect()
  }
}

resetHiddenGames()
