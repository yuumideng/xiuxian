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
    <div class="flex gap-2 mb-2 items-center">
      <!-- 左侧：进度条区块 -->
      <div class="flex-1 space-y-1">
        <!-- 修为进度条 -->
        <div class="relative rounded overflow-hidden bg-teal-50/50 border border-teal-200">
          <!-- 进度背景 -->
          <div 
            class="absolute inset-0 bg-teal-400/30 transition-all duration-300"
            :style="{ width: gameStore.expProgress + '%' }"
          ></div>
          <!-- 文字内容 -->
          <div class="relative px-3 py-1 flex items-center justify-between text-xs text-teal-800">
            <span class="font-medium">修为：{{ formatNumber(gameStore.player.exp) }}/{{ formatNumber(gameStore.currentRequirements.exp) }}<sup>{{ getExponentDisplay(gameStore.currentRequirements.exp) }}</sup></span>
            <span class="text-green-600">+{{ formatNumber(gameStore.actualSpeeds.exp) }}<sup>{{ getExponentDisplay(gameStore.actualSpeeds.exp) }}</sup>/10天</span>
          </div>
        </div>
        
        <!-- 战斗经验进度条 -->
        <div class="relative rounded overflow-hidden bg-orange-50/50 border border-orange-200">
          <!-- 进度背景 -->
          <div 
            class="absolute inset-0 bg-orange-400/30 transition-all duration-300"
            :style="{ width: gameStore.combatProgress + '%' }"
          ></div>
          <!-- 文字内容 -->
          <div class="relative px-3 py-1 flex items-center justify-between text-xs text-orange-800">
            <span class="font-medium">战斗经验：{{ formatNumber(gameStore.player.combat) }}/{{ formatNumber(gameStore.currentRequirements.combat) }}<sup>{{ getExponentDisplay(gameStore.currentRequirements.combat) }}</sup></span>
            <span class="text-green-600">+{{ formatNumber(gameStore.actualSpeeds.combat) }}<sup>{{ getExponentDisplay(gameStore.actualSpeeds.combat) }}</sup>/10天</span>
          </div>
        </div>
      </div>
      
      <!-- 右侧：渡劫飞升按钮 -->
      <GameButton 
        :color="gameStore.canBreakthrough ? 'dark' : 'gray'"
        custom-class="flex-col !px-4 whitespace-nowrap"
        :disabled="!gameStore.canBreakthrough"
        @click="handleBreakthrough"
      >
        <span class="text-sm leading-tight">渡劫</span>
        <span class="text-sm leading-tight">飞升</span>
      </GameButton>
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
import { formatNumber } from '@/utils/numberFormatter.js'
import GameButton from './common/GameButton.vue'

const gameStore = useGameStore()

// 计算属性
const currentRealm = computed(() => gameStore.currentRealm)
const currentWorld = computed(() => getWorldByLevel(gameStore.player.level))

// 使用新的战斗力计算系统
const calculatePower = computed(() => gameStore.battlePower)

// 获取指数显示（用于上标）
const getExponentDisplay = (value) => {
  if (value < 10000) return ''
  
  const absValue = Math.abs(value)
  const exponent = Math.floor(Math.log10(absValue) / 4)
  
  if (exponent > 0) {
    return exponent
  }
  return ''
}

// 渡劫飞升功能（每次点击只突破一次）
const handleBreakthrough = () => {
  if (!gameStore.canBreakthrough) return
  
  const beforeRealm = gameStore.currentRealm.fullName
  const success = gameStore.breakthrough()
  
  if (success) {
    const afterRealm = gameStore.currentRealm.fullName
    console.log(`✨ 渡劫飞升成功！${beforeRealm} → ${afterRealm}`)
  }
}
</script>

<style scoped></style>
