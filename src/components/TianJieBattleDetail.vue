<template>
  <Modal v-model="showModal" title="" @close="handleClose" :close-on-click-outside="false">
    <div class="battle-detail-container">
      <!-- 标题 -->
      <div class="battle-header">
        <h3 class="battle-title">挑战:天道轮回劫(第{{ floor }}劫)</h3>
        <div class="battle-status" :class="battleResult?.victory ? 'text-green-600' : 'text-red-600'">
          已战胜:{{ battleResult?.victory ? '1' : '0' }}/1
        </div>
      </div>
      
      <!-- 属性对比区 -->
      <div class="attributes-compare">
        <!-- 玩家属性 -->
        <div class="player-attrs">
          <div class="attr-title">{{ playerName }}</div>
          <div class="attr-item" v-for="(value, key) in displayPlayerAttrs" :key="key">
            <span class="attr-label">{{ getAttrLabel(key) }}</span>
            <span class="attr-value">{{ formatAttrValue(value) }}</span>
          </div>
          <div class="attr-item power">
            <span class="attr-label">战斗力</span>
            <span class="attr-value">{{ formatAttrValue(playerPower) }}</span>
          </div>
        </div>
        
        <!-- VS 图标 -->
        <div class="vs-icon">
          <svg viewBox="0 0 24 24" fill="currentColor" class="w-12 h-12 text-red-500">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </div>
        
        <!-- 敌人属性 -->
        <div class="enemy-attrs">
          <div class="attr-title">天道轮回劫(第{{ floor }}劫)</div>
          <div class="attr-item" v-for="(value, key) in displayEnemyAttrs" :key="key">
            <span class="attr-value">{{ formatAttrValue(value) }}</span>
            <span class="attr-label">{{ getAttrLabel(key) }}</span>
          </div>
          <div class="attr-item power">
            <span class="attr-value">{{ formatAttrValue(enemyPower) }}</span>
            <span class="attr-label">战斗力</span>
          </div>
        </div>
      </div>
      
      <!-- 战斗日志区 -->
      <div class="battle-log-container">
        <div class="battle-log-header">****** 战斗即将开始 ******</div>
        <div class="battle-log-content" ref="logContainer">
          <div 
            v-for="(log, index) in battleLogs" 
            :key="index"
            class="log-item"
            :class="getLogClass(log)"
          >
            {{ log }}
          </div>
        </div>
        <div class="battle-log-footer">
          ****** 战斗结束！{{ battleResult?.victory ? '你胜利啦' : '你失败啦' }}！******
        </div>
      </div>
      
      <!-- 底部统计 -->
      <div class="battle-stats">
        <div class="stat-item">
          <span class="stat-label">战胜</span>
          <span class="stat-value">{{ battleResult?.victory ? '1' : '0' }}/1</span>
        </div>
        <button class="confirm-btn" @click="handleConfirm">
          确定
        </button>
        <div class="stat-rates">
          <div>闪避率:{{ dodgeRate }}% vs 闪避率:{{ enemyDodgeRate }}%</div>
          <div>暴击率:{{ critRate }}% vs 暴击率:{{ enemyCritRate }}%</div>
        </div>
      </div>
    </div>
  </Modal>
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue'
import { useGameStore } from '@/store/gameState'
import Modal from './common/Modal.vue'
import { calculatePower, getAttributeInfo } from '@/utils/battleCalculator'
import { formatNumber } from '@/utils/numberFormatter'

const props = defineProps({
  playerAttrs: {
    type: Object,
    required: true
  },
  enemyAttrs: {
    type: Object,
    required: true
  },
  floor: {
    type: Number,
    required: true
  },
  battleResult: {
    type: Object,
    default: null
  },
  isPassive: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['confirm'])

const gameStore = useGameStore()
const showModal = defineModel({ type: Boolean, default: false })

const logContainer = ref(null)

// 玩家名称
const playerName = computed(() => {
  const realm = gameStore.currentRealm
  return `${gameStore.player.name}(${realm.name}${realm.subName})`
})

// 显示的属性（排除某些内部属性）
const displayPlayerAttrs = computed(() => {
  if (!props.playerAttrs) return {}
  const { floor, boostedAttr, powerRatio, ...attrs } = props.playerAttrs
  return attrs
})

const displayEnemyAttrs = computed(() => {
  if (!props.enemyAttrs) return {}
  const { floor, boostedAttr, powerRatio, ...attrs } = props.enemyAttrs
  return attrs
})

// 战斗力
const playerPower = computed(() => {
  return props.playerAttrs ? calculatePower(props.playerAttrs) : 0
})

const enemyPower = computed(() => {
  return props.enemyAttrs ? calculatePower(props.enemyAttrs) : 0
})

// 战斗日志
const battleLogs = computed(() => {
  if (!props.battleResult || !props.battleResult.battleLog) return []
  return props.battleResult.battleLog
})

// 统计数据（简化计算）
const dodgeRate = computed(() => {
  if (!props.playerAttrs) return 0
  return Math.floor((props.playerAttrs.dodge / 10000) * 100)
})

const enemyDodgeRate = computed(() => {
  if (!props.enemyAttrs) return 0
  return Math.floor((props.enemyAttrs.dodge / 10000) * 100)
})

const critRate = computed(() => {
  if (!props.playerAttrs) return 0
  return Math.floor((props.playerAttrs.crit / 10000) * 100)
})

const enemyCritRate = computed(() => {
  if (!props.enemyAttrs) return 0
  return Math.floor((props.enemyAttrs.crit / 10000) * 100)
})

// 获取属性标签
const getAttrLabel = (key) => {
  const info = getAttributeInfo(key)
  return info.name
}

// 格式化属性值
const formatAttrValue = (value) => {
  return formatNumber(value)
}

// 获取日志样式类
const getLogClass = (log) => {
  if (log.includes('暴击')) return 'log-crit'
  if (log.includes('闪避') || log.includes('未命中')) return 'log-dodge'
  if (log.includes(gameStore.player.name) || log.includes('玩家')) return 'log-player'
  if (log.includes('天道轮回劫') || log.includes('敌人')) return 'log-enemy'
  return ''
}

// 关闭弹窗
const handleClose = () => {
  // 被动天劫失败时不允许关闭
  if (props.isPassive && !props.battleResult?.victory) {
    return
  }
  showModal.value = false
}

// 确认按钮
const handleConfirm = () => {
  emit('confirm', props.isPassive)
}

// 监听战斗日志变化，自动滚动到底部
watch(() => battleLogs.value.length, async () => {
  await nextTick()
  if (logContainer.value) {
    logContainer.value.scrollTop = logContainer.value.scrollHeight
  }
})
</script>

<style scoped>
.battle-detail-container {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  font-size: 0.75rem;
}

/* 标题区 */
.battle-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid #e5e7eb;
}

.battle-title {
  font-size: 0.875rem;
  font-weight: bold;
  color: #1f2937;
}

.battle-status {
  font-size: 0.75rem;
  font-weight: 600;
}

/* 属性对比区 */
.attributes-compare {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 0.75rem;
  padding: 0.75rem;
  background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%);
  border-radius: 0.5rem;
}

.player-attrs,
.enemy-attrs {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.attr-title {
  font-size: 0.6875rem;
  font-weight: 600;
  color: #4b5563;
  margin-bottom: 0.25rem;
  padding-bottom: 0.25rem;
  border-bottom: 1px solid #d1d5db;
}

.attr-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.6875rem;
  padding: 0.125rem 0;
}

.attr-item.power {
  margin-top: 0.25rem;
  padding-top: 0.25rem;
  border-top: 1px solid #d1d5db;
  font-weight: 600;
  color: #dc2626;
}

.attr-label {
  color: #6b7280;
}

.attr-value {
  color: #1f2937;
  font-weight: 500;
}

.enemy-attrs .attr-item {
  flex-direction: row-reverse;
}

.vs-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 战斗日志区 */
.battle-log-container {
  display: flex;
  flex-direction: column;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  overflow: hidden;
  background: #ffffff;
}

.battle-log-header,
.battle-log-footer {
  padding: 0.5rem;
  text-align: center;
  font-size: 0.6875rem;
  color: #6b7280;
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
}

.battle-log-footer {
  border-bottom: none;
  border-top: 1px solid #e5e7eb;
}

.battle-log-content {
  max-height: 300px;
  overflow-y: auto;
  padding: 0.5rem;
  font-size: 0.6875rem;
  line-height: 1.6;
}

.log-item {
  padding: 0.25rem 0;
  color: #4b5563;
}

.log-item.log-player {
  color: #059669;
}

.log-item.log-enemy {
  color: #dc2626;
}

.log-item.log-crit {
  color: #dc2626;
  font-weight: 600;
}

.log-item.log-dodge {
  color: #6b7280;
  font-style: italic;
}

/* 底部统计 */
.battle-stats {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  padding: 0.75rem;
  background: #f9fafb;
  border-radius: 0.5rem;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
}

.stat-label {
  color: #6b7280;
}

.stat-value {
  font-weight: 600;
  color: #1f2937;
}

.confirm-btn {
  width: 100%;
  max-width: 200px;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
  color: white;
  font-weight: bold;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: all 0.2s;
}

.confirm-btn:hover {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.confirm-btn:active {
  transform: scale(0.95);
}

.stat-rates {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-size: 0.6875rem;
  color: #6b7280;
  text-align: center;
}

/* 滚动条样式 */
.battle-log-content::-webkit-scrollbar {
  width: 6px;
}

.battle-log-content::-webkit-scrollbar-track {
  background: #f3f4f6;
}

.battle-log-content::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 3px;
}

.battle-log-content::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}
</style>
