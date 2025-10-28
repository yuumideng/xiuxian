<template>
  <div class="player-card">
    <!-- 历练信息区块 -->
    <div class="grid grid-cols-2 gap-2 mb-2">
      <!-- 左侧：人物信息 -->
      <div class="bg-white rounded p-3">
        <div class="flex flex-col items-center mb-2">
          <div class="relative mb-2">
            <div
              class="w-20 h-20 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center overflow-hidden"
            >
              <div class="text-4xl">🧘</div>
            </div>
          </div>
          <div class="bg-gray-800 text-white text-xs px-2 py-0.5 rounded flex items-center gap-1">
            历练信息
          </div>
        </div>

        <!-- 角色属性 -->
        <div class="space-y-0.5 text-xs">
          <div class="text-purple-500">姓名：{{ gameStore.player.name }}</div>
          <div class="text-gray-700">年龄：<span class="text-blue-600">{{ gameStore.player.age }}岁</span></div>
          <div class="text-gray-700">{{ currentWorld }}：{{ currentRealm?.fullName || '未知境界' }}</div>
          <div class="text-gray-700">战斗力：<span class="text-orange-500">{{ formatNumber(calculatePower) }}</span></div>
        </div>
      </div>

      <!-- 右侧：历练区域 -->
      <div class="bg-white rounded p-3">
        <div class="text-xs text-gray-600 mb-3">历练区域：鸿蒙平原(第220/220层)</div>

        <!-- 秘境挑战 -->
        <div class="bg-gray-800 text-white rounded p-2">
          <div class="text-xs mb-1">鸿蒙秘境(进入机会966天)</div>
          <div class="text-xs text-gray-400 mb-2">213941年40天还没过2次机会</div>
          <button class="w-full bg-gray-700 hover:bg-gray-600 rounded py-1.5 text-xs mb-1">
            获取仙灵环
          </button>
          <div class="flex items-center justify-between">
            <div class="text-xs text-green-400">灵石:8282.37万亿⁴</div>
            <button class="bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded text-xs leading-tight">
              查看<br />奖励
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 修为和战斗经验 -->
    <div class="space-y-1 mb-2">
      <div>
        <!-- 修为进度条 -->
        <div class="bg-teal-100 text-teal-700 px-3 py-1.5 rounded text-xs">
          <div class="flex items-center justify-between mb-1">
            <span>修为：{{ formatNumber(gameStore.player.exp) }}/{{ formatNumber(gameStore.currentRequirements.exp) }}</span>
            <span class="text-green-600">+{{ formatNumber(gameStore.actualSpeeds.exp) }}/秒</span>
          </div>
          <div class="w-full bg-teal-200 rounded-full h-1">
            <div 
              class="bg-teal-500 h-1 rounded-full transition-all duration-300" 
              :style="{ width: gameStore.expProgress + '%' }"
            ></div>
          </div>
        </div>
        
        <!-- 战斗经验进度条 -->
        <div class="bg-orange-100 text-orange-700 px-3 py-1.5 rounded text-xs">
          <div class="flex items-center justify-between mb-1">
            <span>战斗经验：{{ formatNumber(gameStore.player.combat) }}/{{ formatNumber(gameStore.currentRequirements.combat) }}</span>
            <span class="text-green-600">+{{ formatNumber(gameStore.actualSpeeds.combat) }}/秒</span>
          </div>
          <div class="w-full bg-orange-200 rounded-full h-1">
            <div 
              class="bg-orange-500 h-1 rounded-full transition-all duration-300" 
              :style="{ width: gameStore.combatProgress + '%' }"
            ></div>
          </div>
        </div>
        
        <!-- 突破按钮 -->
        <div v-if="gameStore.canBreakthrough" class="mt-2">
          <button 
            @click="breakthrough"
            class="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 px-4 rounded text-sm font-medium hover:from-purple-600 hover:to-pink-600 transition-all"
          >
            🌟 突破至{{ gameStore.nextRealm?.fullName || '未知境界' }}
          </button>
        </div>
      </div>
    </div>

    <!-- 操作按钮 - 同一行,左边4个小按钮,右边2个大按钮 -->
    <div class="flex gap-2 h-10">
      <!-- 左侧：4个小按钮 -->
      <div class="grid grid-cols-4 gap-1.5 flex-1">
        <GameButton color="dark" custom-class="flex-col">
          <span>仙人</span>
          <span>指路</span>
        </GameButton>
        <GameButton color="dark" custom-class="flex-col">
          <span>强化</span>
          <span>经脉</span>
        </GameButton>
        <GameButton color="dark" custom-class="flex-col">
          <span>炼制</span>
          <span>丹药</span>
        </GameButton>
        <GameButton color="dark" custom-class="flex-col">
          <span>神器</span>
          <span>遗迹</span>
        </GameButton>
      </div>

      <!-- 右侧：2个劫按钮 -->
      <div class="grid grid-cols-2 gap-1.5 flex-1">
        <GameButton color="red" custom-class="flex-col">
          <span>天道轮回劫</span>
          <span class="text-xs mt-0.5">第1163劫</span>
        </GameButton>
        <GameButton color="dark" custom-class="flex-col !px-0.5">
          <span>鸿蒙元尊心魔劫</span>
          <span class="text-xs mt-0.5">第638劫</span>
        </GameButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useGameStore } from '@/store/gameState.js'
import { getWorldByLevel } from '@/data/realms.js'
import GameButton from './common/GameButton.vue'

const gameStore = useGameStore()

// 计算属性
const currentRealm = computed(() => gameStore.currentRealm)
const currentWorld = computed(() => getWorldByLevel(gameStore.player.level))

// 计算战斗力
const calculatePower = computed(() => {
  return gameStore.player.level * 100 + gameStore.player.combat + gameStore.player.exp * 0.1
})

// 数字格式化函数
const formatNumber = (num) => {
  if (num < 1000) return Math.floor(num).toString()
  if (num < 1000000) return (num / 1000).toFixed(1) + 'K'
  if (num < 1000000000) return (num / 1000000).toFixed(1) + 'M'
  if (num < 1000000000000) return (num / 1000000000).toFixed(1) + 'B'
  return (num / 1000000000000).toFixed(1) + 'T'
}

// 突破功能
const breakthrough = () => {
  const success = gameStore.breakthrough()
  if (success) {
    console.log(`成功突破至${gameStore.currentRealm.fullName}!`)
  }
}
</script>

<style scoped></style>
