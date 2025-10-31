<template>
  <div class="battle-stats bg-white rounded p-2.5">
    <div class="flex items-center gap-2 mb-1.5">
      <h3 class="text-sm font-medium">战斗数据</h3>
      <button 
        class="detail-btn"
        @click="showDetailModal = true"
      >
        加成详情
      </button>
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

    <!-- 加成详情弹窗 -->
    <Modal 
      v-model="showDetailModal" 
      title="战斗属性加成详情"
      :close-on-click-outside="true"
    >
      <BattleAttributeDetail :player="gameStore.player" />
    </Modal>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useGameStore } from '@/store/gameState.js'
import { formatNumber } from '@/utils/numberFormatter.js'
import Modal from './common/Modal.vue'
import BattleAttributeDetail from './BattleAttributeDetail.vue'

const gameStore = useGameStore()

// 使用新的战斗属性计算系统
const battleAttributes = computed(() => gameStore.battleAttributes)

// 弹窗控制
const showDetailModal = ref(false)
</script>

<style scoped>
.detail-btn {
  padding: 0.125rem 0.5rem;
  font-size: 0.75rem;
  color: #2563eb;
  background-color: #eff6ff;
  border: 1px solid #bfdbfe;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: all 0.2s;
  font-weight: 500;
}

.detail-btn:hover {
  background-color: #dbeafe;
  border-color: #93c5fd;
}

.detail-btn:active {
  transform: scale(0.95);
}


</style>
