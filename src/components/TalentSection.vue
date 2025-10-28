<template>
  <div class="talent-section bg-white rounded p-3">
    <h3 class="text-sm font-medium mb-2">天赋&灵根</h3>

    <div class="grid grid-cols-2 gap-3">
      <!-- 左侧：天赋 -->
      <div class="rounded p-2 bg-gray-50">
        <div class="flex items-center gap-2 mb-2">
          <span class="text-xs bg-gray-200 px-2 py-0.5 rounded">天赋</span>
          <button
            class="w-5 h-5 rounded-full border border-gray-400 flex items-center justify-center text-sm"
            @click="upgradeTalents"
          >
            +
          </button>
        </div>
        <div class="space-y-0.5 text-xs text-gray-700">
          <div>气感：{{ gameStore.player.talents.qigan }}/{{ maxTalent }}</div>
          <div>神识：{{ gameStore.player.talents.shishi }}/{{ maxTalent }}</div>
          <div>根骨：{{ gameStore.player.talents.gengu }}/{{ maxTalent }}</div>
          <div>悟性：{{ gameStore.player.talents.wuxing }}/{{ maxTalent }}</div>
          <div>机缘：{{ gameStore.player.talents.jiyuan }}/{{ maxTalent }}</div>
        </div>
      </div>

      <!-- 右侧：灵根 -->
      <div class="rounded p-2 bg-gray-50">
        <div class="flex items-center gap-2 mb-2">
          <span class="text-xs bg-gray-200 px-2 py-0.5 rounded">灵根</span>
          <button
            class="w-5 h-5 rounded-full border border-gray-400 flex items-center justify-center text-sm"
            @click="upgradeSpiritualRoots"
          >
            +
          </button>
        </div>
        <div class="bg-gray-100 p-2 rounded text-xs">
          <div class="text-gray-600 mb-1">总灵根值：{{ totalSpiritualRoots }}</div>
          <div class="grid grid-cols-2 gap-x-2 gap-y-0.5 text-gray-700">
            <div>金灵根({{ gameStore.player.spiritualRoots.jin }})</div>
            <div>木灵根({{ gameStore.player.spiritualRoots.mu }})</div>
            <div>水灵根({{ gameStore.player.spiritualRoots.shui }})</div>
            <div>火灵根({{ gameStore.player.spiritualRoots.huo }})</div>
            <div>土灵根({{ gameStore.player.spiritualRoots.tu }})</div>
            <div>风灵根({{ gameStore.player.spiritualRoots.feng }})</div>
            <div>雷灵根({{ gameStore.player.spiritualRoots.lei }})</div>
            <div>光灵根({{ gameStore.player.spiritualRoots.guang }})</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useGameStore } from '@/store/gameState.js'

const gameStore = useGameStore()

// 最大天赋值(基于境界)
const maxTalent = computed(() => {
  return 100 + gameStore.player.level * 10
})

// 总灵根值
const totalSpiritualRoots = computed(() => {
  const roots = gameStore.player.spiritualRoots
  return Object.values(roots).reduce((sum, value) => sum + value, 0)
})

// 升级天赋
const upgradeTalents = () => {
  // TODO: 实现天赋升级功能
  console.log('升级天赋')
}

// 升级灵根
const upgradeSpiritualRoots = () => {
  // TODO: 实现灵根升级功能
  console.log('升级灵根')
}
</script>

<style scoped></style>
