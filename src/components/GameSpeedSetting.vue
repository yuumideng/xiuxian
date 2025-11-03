<template>
  <Modal v-model="showModal" title="设置每次跳跃的时间长度（天）" @close="handleClose" position="bottom">
    <div class="space-y-1.5 text-xs">
      <!-- 普通速度选择 -->
      <div class="speed-section">
        <div class="flex items-center gap-1.5">
          <span class="text-gray-700 font-medium" style="font-size: 0.6875rem;">普通速度：</span>
          <div class="flex gap-1.5">
            <button 
              class="speed-option"
              :class="{ 'selected': currentSpeed === 10 }"
              @click="selectNormalSpeed(10)"
            >
              <span v-if="currentSpeed === 10" class="check-mark">✓</span>
              10
            </button>
            <button 
              class="speed-option"
              :class="{ 'selected': currentSpeed === 20 }"
              @click="selectNormalSpeed(20)"
            >
              <span v-if="currentSpeed === 20" class="check-mark">✓</span>
              20
            </button>
          </div>
        </div>
      </div>

      <!-- 超级速度选择 -->
      <div class="speed-section super-speed">
        <div class="flex flex-col gap-0.5 mb-1">
          <div class="flex items-center gap-1.5">
            <span class="text-gray-700 font-medium" style="font-size: 0.6875rem;">超级速度：</span>
            <button 
              class="super-speed-btn"
              @click="activateSuperSpeed"
              :disabled="isSuperSpeedActive"
            >
              <span class="vip-icon">👑</span>
              获得超级加速时间
              <span style="font-size: 0.625rem;">(vip无限加速)</span>
            </button>
          </div>
          
          <!-- 超级速度倒计时 -->
          <div v-if="isSuperSpeedActive" class="countdown-text">
            剩余时间：{{ formatTime(superSpeedRemaining) }}
          </div>
        </div>

        <div class="flex gap-1">
          <!-- 下一境界速度（永远不可选） -->
          <button 
            class="super-speed-box disabled"
            :disabled="true"
          >
            <div class="super-speed-value">{{ nextRealmSpeed }}</div>
            <div class="speed-label">({{ nextRealmName }}解锁)</div>
          </button>
          
          <!-- 当前境界速度（激活后可选） -->
          <button 
            class="super-speed-box"
            :class="{ 'selected': currentSpeed === currentRealmSpeed, 'disabled': !isSuperSpeedActive }"
            :disabled="!isSuperSpeedActive"
            @click="selectSuperSpeed"
          >
            <span v-if="currentSpeed === currentRealmSpeed" class="check-mark">✓</span>
            <div class="super-speed-value">{{ currentRealmSpeed }}</div>
          </button>
        </div>
      </div>

      <!-- 速度加成详情表格 -->
      <div class="bonus-table">
        <div class="table-header">
          <span>速度加成类别</span>
          <span>加成天数（天）</span>
        </div>
        
        <div class="table-row">
          <span>当前选择速度</span>
          <span class="value">{{ currentSpeed }}</span>
        </div>
        
        <div class="table-row">
          <span>当前存档天劫</span>
          <span class="value">0/2 = 0</span>
        </div>
        
        <div class="table-row">
          <span>轮回心魔劫（轮回之后取最高记录）</span>
          <span class="value">38657/2 = 19328</span>
        </div>
        
        <div class="table-row">
          <span>轮回天劫（轮回之后取最高记录）</span>
          <span class="value">55184/2 = 27592</span>
        </div>
        
        <div class="table-row">
          <span>星罗棋速度</span>
          <span class="value">505*20 = 10100</span>
        </div>
        
        <div class="table-row">
          <span>月卡最高领取次数-1</span>
          <span class="value">28*100 = 2800</span>
        </div>
        
        <div class="table-row">
          <span>终身卡最高领取次数-1</span>
          <span class="value">120*100 = 12000</span>
        </div>
        
        <div class="table-row">
          <span>神器套装最低等级+1</span>
          <span class="value">0*1000 = 0</span>
        </div>
        
        <div class="table-row">
          <span>道心时轮</span>
          <span class="value">0</span>
        </div>
        
        <div class="table-row">
          <span>时轮秘境（天初境解锁）</span>
          <span class="value">0</span>
        </div>
        
        <div class="table-row">
          <span>资源卡额外基础天数</span>
          <span class="value">0</span>
        </div>
        
        <div class="table-row total">
          <span>合计天数</span>
          <span class="value">{{ totalDays }}（天）</span>
        </div>
        
        <div class="table-row">
          <span>当前倍速</span>
          <span class="value">{{ currentMultiplier }}（倍）</span>
        </div>
        
        <div class="table-row final">
          <span>最终游戏速度(每秒多少天)</span>
          <span class="value highlight">{{ finalSpeed }}（天）</span>
        </div>
      </div>

      <!-- 底部提示 -->
      <div class="text-gray-400 text-center space-y-0.5" style="font-size: 0.625rem;">
        <div>时轮加速需？会自动跳到到最慢速度）</div>
        <div>（点击空白处关闭）</div>
      </div>
    </div>
  </Modal>
</template>

<script setup>
import { ref, computed, watch, onUnmounted } from 'vue'
import { useGameStore } from '@/store/gameState.js'
import Modal from './common/Modal.vue'

const props = defineProps({
  show: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['close', 'speedChange'])

const gameStore = useGameStore()

// 使用本地状态来控制 Modal
const showModal = computed({
  get: () => props.show,
  set: (value) => {
    if (!value) {
      emit('close')
    }
  }
})

// 关闭处理
const handleClose = () => {
  emit('close')
}

// 超级速度状态
const isSuperSpeedActive = ref(false)
const superSpeedRemaining = ref(0) // 剩余秒数
let superSpeedTimer = null

// 当前选择的速度
const currentSpeed = ref(10)

// 获取境界名称
const getRealmName = (realmLevel) => {
  const realmNames = ['练气', '筑基', '金丹', '元婴', '化神', '炼虚', '合体', '大乘', '渡劫']
  return realmNames[realmLevel - 1] || `第${realmLevel}境`
}

// 计算当前境界和下一境界的超级速度
const currentRealmSpeed = computed(() => {
  const realmLevel = Math.floor((gameStore.player.level - 1) / 10) + 1
  return 100 + (realmLevel - 1) * 100
})

const nextRealmSpeed = computed(() => {
  return currentRealmSpeed.value + 100
})

// 下一境界名称
const nextRealmName = computed(() => {
  const currentRealmLevel = Math.floor((gameStore.player.level - 1) / 10) + 1
  return getRealmName(currentRealmLevel + 1)
})

// 固定的加成值（暂时写死）
const bonusValues = {
  currentArchive: 0,
  heartDemon: 19328,
  heavenTribulation: 27592,
  starChess: 10100,
  monthCard: 2800,
  lifetimeCard: 12000,
  artifact: 0,
  timeWheel: 0,
  timeRealm: 0,
  resourceCard: 0
}

// 当前倍速（暂时写死）
const currentMultiplier = ref(3)

// 计算合计天数
const totalDays = computed(() => {
  return currentSpeed.value + 
         bonusValues.currentArchive +
         bonusValues.heartDemon +
         bonusValues.heavenTribulation +
         bonusValues.starChess +
         bonusValues.monthCard +
         bonusValues.lifetimeCard +
         bonusValues.artifact +
         bonusValues.timeWheel +
         bonusValues.timeRealm +
         bonusValues.resourceCard
})

// 计算最终游戏速度
const finalSpeed = computed(() => {
  return totalDays.value * currentMultiplier.value
})

// 选择普通速度
const selectNormalSpeed = (speed) => {
  currentSpeed.value = speed // 直接更新当前速度
}

// 激活超级速度
const activateSuperSpeed = () => {
  if (isSuperSpeedActive.value) return
  
  isSuperSpeedActive.value = true
  superSpeedRemaining.value = 20 * 60 // 20分钟 = 1200秒
  // 不自动选中，让玩家自己选择
  
  // 启动倒计时
  startSuperSpeedTimer()
}

// 选择超级速度
const selectSuperSpeed = () => {
  if (!isSuperSpeedActive.value) return
  currentSpeed.value = currentRealmSpeed.value
}

// 启动超级速度倒计时
const startSuperSpeedTimer = () => {
  if (superSpeedTimer) {
    clearInterval(superSpeedTimer)
  }
  
  superSpeedTimer = setInterval(() => {
    superSpeedRemaining.value--
    
    if (superSpeedRemaining.value <= 0) {
      // 超级速度结束，回退到普通速度20
      isSuperSpeedActive.value = false
      currentSpeed.value = 20
      clearInterval(superSpeedTimer)
      superSpeedTimer = null
    }
  }, 1000)
}

// 格式化时间显示
const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${minutes}:${secs.toString().padStart(2, '0')}`
}

// 监听当前速度变化，用于调试
watch(currentSpeed, (newSpeed) => {
  console.log('当前速度变化:', newSpeed)
  console.log('合计天数:', totalDays.value)
  console.log('最终速度:', finalSpeed.value)
})

// 监听最终速度变化，通知父组件
watch(finalSpeed, (newSpeed) => {
  emit('speedChange', newSpeed)
})

// 组件卸载时清理定时器
onUnmounted(() => {
  if (superSpeedTimer) {
    clearInterval(superSpeedTimer)
  }
})
</script>

<style scoped>
.speed-section {
  padding: 0.375rem;
  background-color: #f9fafb;
  border-radius: 0.25rem;
  border: 1px solid #e5e7eb;
}

.speed-option {
  position: relative;
  min-width: 45px;
  padding: 0.25rem 0.5rem;
  background-color: white;
  border: 1.5px solid #d1d5db;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: all 0.2s;
  font-weight: 500;
  font-size: 0.8125rem;
}

.speed-option:hover {
  border-color: #9ca3af;
}

.speed-option.selected {
  border-color: #ef4444;
  background-color: #fef2f2;
}

.speed-option.disabled {
  background-color: #f3f4f6;
  opacity: 0.6;
  cursor: not-allowed;
}

.super-speed-box {
  flex: 1;
  padding: 0.25rem 0.375rem;
  background-color: white;
  border: 1.5px solid #d1d5db;
  border-radius: 0.25rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
  font-weight: 500;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 2rem;
}

.super-speed-box:hover:not(.disabled) {
  border-color: #9ca3af;
}

.super-speed-box.selected {
  border-color: #ef4444;
  background-color: #fef2f2;
}

.super-speed-box.disabled {
  background-color: #f3f4f6;
  opacity: 0.6;
  cursor: not-allowed;
}

.super-speed-value {
  font-size: 0.8125rem;
  font-weight: 700;
  color: #374151;
  line-height: 1.2;
}

.check-mark {
  position: absolute;
  top: -5px;
  right: -5px;
  width: 16px;
  height: 16px;
  background-color: #ef4444;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: bold;
}

.super-speed {
  background: linear-gradient(135deg, #ecfeff 0%, #cffafe 100%);
  border-color: #a5f3fc;
}

.super-speed-btn {
  padding: 0.1875rem 0.5rem;
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  color: white;
  border-radius: 0.25rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.1875rem;
  border: none;
  font-size: 0.6875rem;
}

.super-speed-btn:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 6px rgba(239, 68, 68, 0.3);
}

.super-speed-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.vip-icon {
  font-size: 11px;
}

.countdown-text {
  color: #0891b2;
  font-weight: 600;
  margin-bottom: 0.125rem;
  text-align: center;
  font-size: 0.6875rem;
}

.speed-label {
  font-size: 0.5625rem;
  color: #64748b;
  margin-top: 0.0625rem;
  line-height: 1;
}

.bonus-table {
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  overflow: hidden;
}

.table-header {
  display: flex;
  justify-content: space-between;
  padding: 0.375rem 0.5rem;
  background-color: #f3f4f6;
  font-weight: 600;
  color: #374151;
  border-bottom: 1px solid #e5e7eb;
  font-size: 0.6875rem;
}

.table-row {
  display: flex;
  justify-content: space-between;
  padding: 0.25rem 0.5rem;
  border-bottom: 1px solid #f3f4f6;
  font-size: 0.6875rem;
}

.table-row:last-child {
  border-bottom: none;
}

.table-row.total {
  background-color: #fef3c7;
  font-weight: 600;
  color: #92400e;
}

.table-row.final {
  background-color: #cffafe;
  font-weight: 700;
}

.table-row .value {
  font-weight: 500;
  color: #6b7280;
}

.table-row.total .value,
.table-row.final .value {
  color: inherit;
}

.table-row.final .value.highlight {
  color: #0891b2;
  font-size: 0.75rem;
}
</style>
