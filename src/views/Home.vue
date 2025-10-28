<template>
  <div class="home-page min-h-screen bg-gray-100 pb-24">
    <!-- 顶部资源栏 -->
    <div class="p-2 space-y-1">
      <TopBar />
    </div>

    <!-- 主要内容区 -->
    <div class="px-2 space-y-2">
      <!-- 历练信息卡片(包含操作按钮) -->
      <PlayerCard />

      <!-- 天赋&灵根 -->
      <TalentSection />

      <!-- 战斗数据 -->
      <BattleStats />

      <!-- 功法&装备 -->
      <SkillEquipment />

      <!-- 更多功能 -->
      <MoreFeatures />
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import { useGameStore } from '@/store/gameState.js'
import TopBar from '@/components/TopBar.vue'
import PlayerCard from '@/components/PlayerCard.vue'
import TalentSection from '@/components/TalentSection.vue'
import BattleStats from '@/components/BattleStats.vue'
import SkillEquipment from '@/components/SkillEquipment.vue'
import MoreFeatures from '@/components/MoreFeatures.vue'

const gameStore = useGameStore()
let gameLoop = null

// 游戏主循环
const startGameLoop = () => {
  gameLoop = setInterval(() => {
    if (gameStore.idleState.isIdle) {
      // 每秒更新一次游戏状态
      gameStore.processIdleGains(1)
      
      // 自动保存(每10秒)
      if (Date.now() % 10000 < 1000) {
        gameStore.saveGame()
      }
    }
  }, 1000)
}

// 停止游戏循环
const stopGameLoop = () => {
  if (gameLoop) {
    clearInterval(gameLoop)
    gameLoop = null
  }
}

// 页面加载时初始化
onMounted(() => {
  // 加载游戏数据
  gameStore.loadGame()
  
  // 启动游戏循环
  startGameLoop()
  
  // 监听页面关闭事件
  window.addEventListener('beforeunload', () => {
    gameStore.setOffline()
    gameStore.saveGame()
  })
})

// 页面卸载时清理
onUnmounted(() => {
  stopGameLoop()
  gameStore.setOffline()
  gameStore.saveGame()
})
</script>

<style scoped></style>
