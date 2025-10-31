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
        class="w-6 h-6 rounded-full border border-gray-400 flex items-center justify-center"
        @click="buyResources"
      >
        <span class="text-xs font-bold flex items-center justify-center w-full h-full text-gray-600">+</span>
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
        <!-- 暂停状态显示 -->
        <span v-if="gameStore.gameState.isPaused" class="text-xs text-red-500">
          已暂停
        </span>
        
        <!-- 暂停/恢复按钮 -->
        <button
          class="w-6 h-6 rounded-full border flex items-center justify-center"
          :class="{
            'border-red-400 bg-red-50': gameStore.gameState.isPaused,
            'border-gray-400': !gameStore.gameState.isPaused
          }"
          @click="togglePause"
        >
          <span 
            class="text-xs font-bold flex items-center justify-center w-full h-full"
            :class="{
              'text-red-500': gameStore.gameState.isPaused,
              'text-gray-600': !gameStore.gameState.isPaused
            }"
          >
            {{ gameStore.gameState.isPaused ? '▶' : '⏸' }}
          </span>
        </button>
        
        <!-- 设置按钮 -->
        <button
          class="w-6 h-6 rounded-full border border-gray-400 flex items-center justify-center"
          @click="openSettings"
        >
          <span class="flex items-center justify-center w-full h-full">⚙</span>
        </button>
      </div>
    </div>
    
    <!-- 设置弹窗 -->
    <SettingsModal v-model="showSettingsModal" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useGameStore } from '@/store/gameState.js'
import { formatNumber } from '@/utils/numberFormatter.js'
import SettingsModal from './SettingsModal.vue'

const gameStore = useGameStore()

// 控制设置弹窗显示
const showSettingsModal = ref(false)

// 切换暂停状态
const togglePause = () => {
  gameStore.togglePause()
}

// 购买资源
const buyResources = () => {
  // TODO: 实现购买资源功能
  console.log('购买资源')
}

// 打开设置
const openSettings = () => {
  showSettingsModal.value = true
}
</script>

<style scoped></style>
