<template>
  <div class="battle-stats bg-white rounded p-2.5">
    <div class="flex items-center justify-between mb-1.5">
      <h3 class="text-sm font-medium">战斗数据</h3>
      <div class="text-xs text-orange-600 font-medium">
        战斗力：{{ formatNumber(gameStore.battlePower) }}
      </div>
    </div>

    <div class="rounded p-1.5 bg-gray-50">
      <div class="grid grid-cols-2 gap-x-4 gap-y-0.5 text-xs text-gray-700 leading-tight">
        <div>血量：{{ formatNumber(battleAttributes.hp) }}</div>
        <div>暴击：{{ formatNumber(battleAttributes.crit) }}</div>
        <div>攻击：{{ formatNumber(battleAttributes.attack) }}</div>
        <div>韧性：{{ formatNumber(battleAttributes.toughness) }}</div>
        <div>防御：{{ formatNumber(battleAttributes.defense) }}</div>
        <div>闪避：{{ formatNumber(battleAttributes.dodge) }}</div>
        <div>速度：{{ formatNumber(battleAttributes.speed) }}</div>
        <div>命中：{{ formatNumber(battleAttributes.hit) }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useGameStore } from '@/store/gameState.js'
import { formatNumber } from '@/utils/numberFormatter.js'

const gameStore = useGameStore()

// 使用新的战斗属性计算系统
const battleAttributes = computed(() => gameStore.battleAttributes)
</script>

<style scoped></style>
