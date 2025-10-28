<template>
  <div class="top-bar space-y-1">
    <!-- 灵石和仙玉 -->
    <div class="bg-white rounded px-3 py-1.5 flex items-center justify-between text-xs">
      <div class="space-y-0.5">
        <div class="text-gray-700">
          灵石：<span class="font-medium">{{ formatNumber(gameStore.player.spiritStone) }}</span>
          <span class="text-green-600">(+{{ formatNumber(gameStore.actualSpeeds.spiritStone) }}/秒)</span>
        </div>
        <div class="text-gray-700">仙玉：<span class="font-medium">{{ formatNumber(gameStore.player.jade) }}</span></div>
      </div>
      <button
        class="w-8 h-8 rounded-full border-2 border-gray-400 flex items-center justify-center text-xl text-gray-600"
        @click="buyResources"
      >
        +
      </button>
    </div>

    <!-- 游戏时间 -->
    <div class="bg-white rounded px-3 py-1.5 flex items-center justify-between text-xs relative overflow-hidden">
      <!-- 时间流逝进度条背景 -->
      <div 
        class="absolute inset-0 bg-teal-100"
        :style="{ width: gameStore.gameState.timeProgress + '%' }"
      ></div>
      
      <!-- 内容层 -->
      <div class="relative z-10 text-gray-700">
        第<span class="font-medium">{{ gameStore.player.age }}</span>岁
        <span class="text-gray-500">(速度x{{ gameStore.player.gameSpeed }})</span>
      </div>
      <div class="relative z-10 flex items-center gap-2">

                  <span v-if="!gameStore.idleState.isIdle" class="text-xs" :class="text-red-500">
          已暂停
          </span>
        <button
          class="w-6 h-6 rounded-full border border-gray-400 flex items-center justify-center"
          @click="toggleIdle"
        >
          {{ gameStore.idleState.isIdle ? '⏸' : '▶' }}
        </button>
        <button
          class="w-6 h-6 rounded-full border border-gray-400 flex items-center justify-center"
          @click="openSettings"
        >
          ⚙
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useGameStore } from '@/store/gameState.js'

const gameStore = useGameStore()

// 数字格式化函数
const formatNumber = (num) => {
  if (num < 1000) return num.toString()
  if (num < 1000000) return (num / 1000).toFixed(1) + 'K'
  if (num < 1000000000) return (num / 1000000).toFixed(1) + 'M'
  if (num < 1000000000000) return (num / 1000000000).toFixed(1) + 'B'
  return (num / 1000000000000).toFixed(1) + 'T'
}

// 切换挂机状态
const toggleIdle = () => {
  if (gameStore.idleState.isIdle) {
    gameStore.stopIdle()
  } else {
    gameStore.startIdle()
  }
}

// 购买资源
const buyResources = () => {
  // TODO: 实现购买资源功能
  console.log('购买资源')
}

// 打开设置
const openSettings = () => {
  // TODO: 实现设置功能
  console.log('打开设置')
}
</script>

<style scoped></style>
