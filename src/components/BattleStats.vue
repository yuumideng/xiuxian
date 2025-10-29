<template>
  <div class="battle-stats bg-white rounded p-3">
    <div class="flex items-center justify-between mb-2">
      <h3 class="text-sm font-medium">战斗数据</h3>
    </div>

    <div class="rounded p-2 bg-gray-50">
      <div class="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-gray-700">
        <div>血量：{{ formatNumber(battleStats.hp) }}</div>
        <div>暴击：{{ formatNumber(battleStats.crit) }}</div>
        <div>攻击：{{ formatNumber(battleStats.attack) }}</div>
        <div>韧性：{{ formatNumber(battleStats.toughness) }}</div>
        <div>防御：{{ formatNumber(battleStats.defense) }}</div>
        <div>闪避：{{ formatNumber(battleStats.dodge) }}</div>
        <div>速度：{{ formatNumber(battleStats.speed) }}</div>
        <div>命中：{{ formatNumber(battleStats.hit) }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useGameStore } from '@/store/gameState.js'
import { formatNumber } from '@/utils/numberFormatter.js'

const gameStore = useGameStore()

// 计算战斗属性(基于境界和战斗经验)
const battleStats = computed(() => {
  const level = gameStore.player.level
  const combat = gameStore.player.combat
  const baseMultiplier = Math.pow(1.5, level - 1)
  
  return {
    hp: Math.floor((1000 + combat * 0.5) * baseMultiplier),
    attack: Math.floor((500 + combat * 0.8) * baseMultiplier),
    defense: Math.floor((300 + combat * 0.6) * baseMultiplier),
    speed: Math.floor((100 + combat * 0.2) * baseMultiplier),
    crit: Math.floor((200 + combat * 0.3) * baseMultiplier),
    hit: Math.floor((150 + combat * 0.4) * baseMultiplier),
    dodge: Math.floor((120 + combat * 0.35) * baseMultiplier),
    toughness: Math.floor((180 + combat * 0.25) * baseMultiplier)
  }
})


</script>

<style scoped></style>
