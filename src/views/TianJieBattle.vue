<template>
  <div class="battle-page">
    <!-- 标题区 -->
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
        <svg viewBox="0 0 24 24" fill="currentColor" class="w-10 h-10 text-red-500">
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
          v-for="(log, index) in displayedLogs" 
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
    
    <!-- 底部统计和按钮 -->
    <div class="battle-footer">
      <div class="stat-rates">
        <div>闪避率:{{ dodgeRate }}% vs 闪避率:{{ enemyDodgeRate }}%</div>
        <div>暴击率:{{ critRate }}% vs 暴击率:{{ enemyCritRate }}%</div>
      </div>
      <button class="confirm-btn" @click="handleConfirm">
        确定
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useGameStore } from '@/store/gameState'
import { calculatePower, getAttributeInfo } from '@/utils/battleCalculator'
import { formatNumber } from '@/utils/numberFormatter'

const router = useRouter()
const gameStore = useGameStore()

const logContainer = ref(null)

// 从sessionStorage获取战斗数据
const battleData = ref(null)

// 逐步显示的日志
const displayedLogs = ref([])

onMounted(async () => {
  const data = sessionStorage.getItem('tianJieBattleData')
  if (data) {
    battleData.value = JSON.parse(data)
    // 开始逐步显示日志
    await startBattleAnimation()
  } else {
    // 如果没有数据，返回游戏页面
    router.push('/game')
  }
})

// 战斗动画：逐步显示日志
const startBattleAnimation = async () => {
  const logs = battleLogs.value
  if (logs.length === 0) return
  
  // 计算每条日志的显示间隔（1.5秒内显示完所有日志）
  const totalDuration = 1500 // 1.5秒
  const interval = totalDuration / logs.length
  
  for (let i = 0; i < logs.length; i++) {
    displayedLogs.value.push(logs[i])
    
    // 滚动到底部
    await nextTick()
    if (logContainer.value) {
      logContainer.value.scrollTop = logContainer.value.scrollHeight
    }
    
    // 等待下一条日志
    if (i < logs.length - 1) {
      await new Promise(resolve => setTimeout(resolve, interval))
    }
  }
}

// 玩家名称
const playerName = computed(() => {
  if (!battleData.value) return ''
  const realm = gameStore.currentRealm
  return `${gameStore.player.name}(${realm?.name || '练气一层'})`
})

// 层数
const floor = computed(() => battleData.value?.floor || 1)

// 显示的属性
const displayPlayerAttrs = computed(() => {
  if (!battleData.value?.playerAttrs) return {}
  const { floor, boostedAttr, powerRatio, ...attrs } = battleData.value.playerAttrs
  return attrs
})

const displayEnemyAttrs = computed(() => {
  if (!battleData.value?.enemyAttrs) return {}
  const { floor, boostedAttr, powerRatio, ...attrs } = battleData.value.enemyAttrs
  return attrs
})

// 战斗力
const playerPower = computed(() => {
  return battleData.value?.playerAttrs ? calculatePower(battleData.value.playerAttrs) : 0
})

const enemyPower = computed(() => {
  return battleData.value?.enemyAttrs ? calculatePower(battleData.value.enemyAttrs) : 0
})

// 战斗结果
const battleResult = computed(() => battleData.value?.battleResult || null)

// 战斗日志
const battleLogs = computed(() => {
  if (!battleResult.value || !battleResult.value.battleLog) return []
  return battleResult.value.battleLog
})

// 统计数据
const dodgeRate = computed(() => {
  if (!battleData.value?.playerAttrs) return 0
  return Math.floor((battleData.value.playerAttrs.dodge / 10000) * 100)
})

const enemyDodgeRate = computed(() => {
  if (!battleData.value?.enemyAttrs) return 0
  return Math.floor((battleData.value.enemyAttrs.dodge / 10000) * 100)
})

const critRate = computed(() => {
  if (!battleData.value?.playerAttrs) return 0
  return Math.floor((battleData.value.playerAttrs.crit / 10000) * 100)
})

const enemyCritRate = computed(() => {
  if (!battleData.value?.enemyAttrs) return 0
  return Math.floor((battleData.value.enemyAttrs.crit / 10000) * 100)
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

// 确认按钮
const handleConfirm = () => {
  if (!battleData.value) return
  
  const { isPassive } = battleData.value
  
  if (battleResult.value.victory) {
    if (isPassive) {
      // 被动天劫成功
      gameStore.passiveTianJieSuccess()
    } else {
      // 主动天劫成功
      gameStore.activeTianJieSuccess(floor.value)
    }
  } else {
    if (isPassive) {
      // 被动天劫失败，游戏继续暂停
      console.log('被动天劫失败，请继续挑战')
    } else {
      // 主动天劫失败
      gameStore.activeTianJieFailure()
    }
  }
  
  // 清除数据并返回游戏页面
  sessionStorage.removeItem('tianJieBattleData')
  router.push('/game')
}
</script>

<style scoped>
.battle-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

/* 标题区 */
.battle-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 0.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
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
  gap: 0.5rem;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 0.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
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
  font-size: 0.625rem;
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
  background: rgba(255, 255, 255, 0.95);
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  flex: 1;
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
  padding: 0.5rem;
  font-size: 0.625rem;
  line-height: 1.5;
  overflow-y: auto;
  max-height: 400px;
}

.log-item {
  padding: 0.125rem 0;
  color: #4b5563;
  animation: fadeInLog 0.3s ease-in;
}

@keyframes fadeInLog {
  from {
    opacity: 0;
    transform: translateX(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
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

/* 底部区域 */
.battle-footer {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 0.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.stat-rates {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-size: 0.625rem;
  color: #6b7280;
  text-align: center;
}

.confirm-btn {
  width: 100%;
  max-width: 200px;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
  color: white;
  font-weight: bold;
  font-size: 0.875rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: all 0.2s;
}

.confirm-btn:hover {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  transform: translateY(-1px);
}

.confirm-btn:active {
  transform: scale(0.95);
}

/* 滚动条样式 */
.battle-log-content::-webkit-scrollbar {
  width: 4px;
}

.battle-log-content::-webkit-scrollbar-track {
  background: #f3f4f6;
}

.battle-log-content::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 2px;
}

.battle-log-content::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}
</style>
