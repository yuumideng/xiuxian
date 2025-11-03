<template>
  <Modal v-model="showModal" title="天劫" @close="handleClose" position="center">
    <div class="space-y-3 text-xs">
      <!-- 副标题 -->
      <div class="text-center">
        <div class="text-sm font-bold text-gray-800">
          {{ playerTitle }}-天道轮回劫(第{{ currentFloor + 1 }}劫)
        </div>
      </div>
      
      <!-- 说明文字 -->
      <div class="text-gray-600 leading-relaxed text-center px-2" style="font-size: 0.6875rem;">
        在无尽的修真宇宙中，天道轮回劫是所有修真者必须面对的终极试炼。
        天道轮回劫会根据修真者的修为力量界、心性、领悟力法则等多因素生成对手。
        只有真正强大的修真者，才能在这残酷的天道法则中脱颖而出。
        伤害越高一位数形的重量者，伤害越高一位数形的重量者。
      </div>
      
      <!-- 核心提示 -->
      <div class="text-center space-y-0.5" style="font-size: 0.6875rem;">
        <div class="text-purple-600 font-medium">(天劫一次更比一次强)</div>
        <div class="text-red-600 font-medium">(挑战失败则陨落于此，化为尘俗)</div>
        <div class="text-orange-600 font-medium">(唯有真正的强者，才能在这残酷的天道法则中脱颖而出——终生机)</div>
      </div>
      
      <!-- 奖励说明 -->
      <div class="text-center text-red-500 leading-relaxed px-2" style="font-size: 0.6875rem;">
        主动迎战天劫成功之后会保留刚刚时长(还会修炼提前打了安心挂机)<br/>
        提前迎战次数限制一天100次<br/>
        月卡+100次，终身+200次，治愈卡200次，超级倍速卡无限制
      </div>
      
      <!-- 快速战斗结果提示 -->
      <Transition name="fade">
        <div v-if="quickBattleResult" class="text-center py-2 px-3 rounded-lg" 
             :class="quickBattleResult.victory ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'">
          <div class="font-bold mb-1" 
               :class="quickBattleResult.victory ? 'text-green-700' : 'text-red-700'">
            {{ quickBattleResult.victory ? '恭喜道友成功战胜' : '挑战失败' }}
            「天道轮回劫(第{{ quickBattleResult.floor }}劫)」{{ quickBattleResult.victory ? '！' : '' }}
          </div>
          <div v-if="quickBattleResult.victory" class="text-green-600 text-xs">
            获得天劫奖励「天劫淬体碎片×{{ quickBattleResult.rewards }}」
          </div>
          <div v-else class="text-red-600 text-xs">
            {{ quickBattleResult.message }}
          </div>
        </div>
      </Transition>
      
      <!-- 操作按钮区 -->
      <div class="grid grid-cols-3 gap-2">
        <!-- 主动迎战天劫 -->
        <button 
          class="col-span-1 bg-gradient-to-br from-red-500 to-red-600 text-white rounded-lg py-3 px-2 font-bold shadow-lg hover:shadow-xl transition-all active:scale-95 flex flex-col items-center justify-center"
          @click="handleActiveBattle"
        >
          <span class="text-sm">主动</span>
          <span class="text-sm">迎战天劫</span>
          <span class="text-xs mt-1 opacity-90">无限次</span>
        </button>
        
        <!-- 挑战天劫（被动） -->
        <button 
          class="col-span-1 bg-gray-300 text-gray-500 rounded-lg py-3 px-2 font-bold flex flex-col items-center justify-center cursor-not-allowed relative"
          :disabled="!isPassiveTriggered"
          @click="handlePassiveBattle"
        >
          <!-- 刀剑交叉图标 -->
          <svg class="w-8 h-8 mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M14.5 3l-3 3 3 3M9.5 3l3 3-3 3M6 9l3 3-3 3M18 9l-3 3 3 3"/>
            <path d="M12 6v12M6 12h12"/>
            <circle cx="12" cy="12" r="2" fill="currentColor"/>
          </svg>
          <span class="text-sm">挑战天劫</span>
          <span class="text-xs mt-1 leading-tight">
            {{ passiveTimeText }}
          </span>
        </button>
        
        <!-- 右侧按钮组 -->
        <div class="col-span-1 flex flex-col gap-2">
          <!-- 天劫淬体 -->
          <button 
            class="bg-gradient-to-br from-gray-800 to-gray-900 text-white rounded-lg py-2 px-2 text-xs font-bold shadow-lg hover:shadow-xl transition-all active:scale-95"
            @click="handleTianJieQuenTi"
          >
            天劫<br/>淬体
          </button>
          
          <!-- 心魔&天劫排行榜 -->
          <button 
            class="bg-gradient-to-br from-gray-800 to-gray-900 text-white rounded-lg py-2 px-2 text-xs font-bold shadow-lg hover:shadow-xl transition-all active:scale-95 leading-tight"
            @click="handleRanking"
          >
            心魔&天劫<br/>排行榜
          </button>
        </div>
      </div>
      
      <!-- 快速主动迎战天劫 / 取消按钮 -->
      <button 
        v-if="!isBattling"
        class="w-full bg-gradient-to-br from-red-500 to-red-600 text-white rounded-lg py-3 px-4 font-bold shadow-lg hover:shadow-xl transition-all active:scale-95"
        @click="handleQuickBattle"
      >
        <span class="text-sm">快速主动迎战天劫</span>
      </button>
      <button 
        v-else
        class="w-full bg-gradient-to-br from-gray-500 to-gray-600 text-white rounded-lg py-3 px-4 font-bold shadow-lg hover:shadow-xl transition-all active:scale-95"
        @click="handleCancelBattle"
      >
        <span class="text-sm">⏸ 取消连续挑战</span>
      </button>
      
      <!-- 连续战斗复选框 -->
      <div class="flex items-center justify-center gap-2">
        <input 
          type="checkbox" 
          id="continuousBattle" 
          v-model="isContinuousBattle"
          :disabled="isBattling"
          class="w-4 h-4 rounded border-gray-300 text-red-600 focus:ring-red-500 disabled:opacity-50"
        />
        <label for="continuousBattle" class="text-gray-700 cursor-pointer select-none" :class="{ 'opacity-50': isBattling }">
          连续战斗
        </label>
      </div>
      
      <!-- 底部提示 -->
      <div class="text-gray-400 text-center" style="font-size: 0.625rem;">
        （点击空白处关闭）
      </div>
    </div>
  </Modal>
  
  <!-- 战斗详情弹窗 -->
  <TianJieBattleDetail 
    v-model="showBattleDetail"
    :player-attrs="playerAttrs"
    :enemy-attrs="enemyAttrs"
    :floor="battleFloor"
    :battle-result="battleResult"
    @confirm="handleBattleConfirm"
  />
  
  <!-- 排行榜弹窗 -->
  <TianJieRankingModal v-model="showRankingModal" />
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useGameStore } from '@/store/gameState'
import Modal from './common/Modal.vue'
import TianJieBattleDetail from './TianJieBattleDetail.vue'
import TianJieRankingModal from './TianJieRankingModal.vue'
import { calculateBattleAttributes, executeBattle, generateTowerEnemy } from '@/utils/battleCalculator'

const router = useRouter()
const gameStore = useGameStore()

const showModal = defineModel({ type: Boolean, default: false })

// 战斗详情弹窗
const showBattleDetail = ref(false)
const battleFloor = ref(1)
const playerAttrs = ref(null)
const enemyAttrs = ref(null)
const battleResult = ref(null)

// 快速战斗结果
const quickBattleResult = ref(null)
const isBattling = ref(false)
const isContinuousBattle = ref(false)

// 排行榜弹窗
const showRankingModal = ref(false)

// 当前天劫层数（使用getter，会自动处理境界变化）
const currentFloor = computed(() => gameStore.currentTianJieFloor)

// 是否触发被动天劫
const isPassiveTriggered = computed(() => gameStore.player.tianJie.isPassiveTriggered)

// 玩家称号（根据境界）
const playerTitle = computed(() => {
  const realm = gameStore.currentRealm
  return realm?.name || '练气一层'
})

// 被动天劫倒计时文本
const passiveTimeText = computed(() => {
  const years = gameStore.tianJieRemainingYears
  const days = gameStore.tianJieRemainingDays
  return `${years}年${days}天后降临`
})

// 关闭弹窗
const handleClose = () => {
  showModal.value = false
}

// 主动迎战天劫（详细模式）
const handleActiveBattle = () => {
  // 计算玩家属性
  const attrs = calculateBattleAttributes(gameStore.player)
  
  // 挑战下一层
  const nextFloor = currentFloor.value + 1
  
  // 生成敌人（传入玩家等级）
  const enemy = generateTowerEnemy(attrs, nextFloor, gameStore.player.level)
  
  // 执行战斗
  const result = executeBattle(attrs, enemy, true)
  
  // 保存战斗数据到sessionStorage
  sessionStorage.setItem('tianJieBattleData', JSON.stringify({
    playerAttrs: attrs,
    enemyAttrs: enemy,
    floor: nextFloor,
    battleResult: result,
    isPassive: false
  }))
  
  // 跳转到战斗页面
  router.push('/tianjie-battle')
}

// 被动天劫挑战
const handlePassiveBattle = () => {
  if (!isPassiveTriggered.value) return
  
  // 计算玩家属性
  const attrs = calculateBattleAttributes(gameStore.player)
  
  // 挑战当前应该面对的层数
  const nextFloor = currentFloor.value + 1
  
  // 生成敌人（传入玩家等级）
  const enemy = generateTowerEnemy(attrs, nextFloor, gameStore.player.level)
  
  // 执行战斗
  const result = executeBattle(attrs, enemy, true)
  
  // 保存战斗数据到sessionStorage
  sessionStorage.setItem('tianJieBattleData', JSON.stringify({
    playerAttrs: attrs,
    enemyAttrs: enemy,
    floor: nextFloor,
    battleResult: result,
    isPassive: true
  }))
  
  // 跳转到战斗页面
  router.push('/tianjie-battle')
}

// 取消连续挑战
const handleCancelBattle = () => {
  isContinuousBattle.value = false
  console.log('已取消连续挑战')
}

// 快速主动迎战
const handleQuickBattle = async () => {
  if (isBattling.value) return
  
  isBattling.value = true
  quickBattleResult.value = null
  
  // 如果勾选了连续战斗
  if (isContinuousBattle.value) {
    await handleContinuousBattle()
  } else {
    await handleSingleQuickBattle()
  }
  
  isBattling.value = false
}

// 单次快速战斗
const handleSingleQuickBattle = async () => {
  // 计算玩家属性
  const attrs = calculateBattleAttributes(gameStore.player)
  
  // 挑战下一层
  const nextFloor = currentFloor.value + 1
  
  // 生成敌人（传入玩家等级）
  const enemy = generateTowerEnemy(attrs, nextFloor, gameStore.player.level)
  
  // 调试信息
  console.log('=== 天劫战斗信息 ===')
  console.log('当前等级:', gameStore.player.level)
  console.log('挑战层数:', nextFloor)
  console.log('玩家战力:', calculateBattleAttributes(gameStore.player))
  console.log('敌人战力:', enemy)
  console.log('敌人战力倍率:', enemy.powerRatio)
  
  // 执行战斗（不需要详细日志）
  const result = executeBattle(attrs, enemy, false)
  
  // 显示结果
  if (result.victory) {
    gameStore.activeTianJieSuccess(nextFloor)
    quickBattleResult.value = {
      victory: true,
      floor: nextFloor,
      rewards: Math.floor(nextFloor * 3.5) // 简单的奖励计算
    }
  } else {
    gameStore.activeTianJieFailure()
    quickBattleResult.value = {
      victory: false,
      floor: nextFloor,
      message: '道友实力尚浅，需继续修炼'
    }
  }
  
  // 3秒后清除结果
  setTimeout(() => {
    quickBattleResult.value = null
  }, 3000)
}

// 连续战斗
const handleContinuousBattle = async () => {
  let currentChallengeFloor = currentFloor.value + 1
  let continueBattle = true
  
  while (continueBattle && isContinuousBattle.value) {
    // 计算玩家属性
    const attrs = calculateBattleAttributes(gameStore.player)
    
    // 生成敌人（传入玩家等级）
    const enemy = generateTowerEnemy(attrs, currentChallengeFloor, gameStore.player.level)
    
    // 执行战斗
    const result = executeBattle(attrs, enemy, false)
    
    // 显示结果
    if (result.victory) {
      gameStore.activeTianJieSuccess(currentChallengeFloor)
      quickBattleResult.value = {
        victory: true,
        floor: currentChallengeFloor,
        rewards: Math.floor(currentChallengeFloor * 3.5)
      }
      currentChallengeFloor++
    } else {
      gameStore.activeTianJieFailure()
      quickBattleResult.value = {
        victory: false,
        floor: currentChallengeFloor,
        message: `连续挑战至第${currentChallengeFloor}劫失败，共通过${currentChallengeFloor - currentFloor.value - 1}劫`
      }
      continueBattle = false
    }
    
    // 等待一小段时间显示结果（50ms = 1秒20层）
    await new Promise(resolve => setTimeout(resolve, 50))
  }
  
  // 保持最后的结果显示3秒
  setTimeout(() => {
    quickBattleResult.value = null
  }, 3000)
}

// 战斗详情确认
const handleBattleConfirm = (isPassive) => {
  if (battleResult.value.victory) {
    if (isPassive) {
      // 被动天劫成功
      gameStore.passiveTianJieSuccess()
    } else {
      // 主动天劫成功
      gameStore.activeTianJieSuccess(battleFloor.value)
    }
  } else {
    if (isPassive) {
      // 被动天劫失败，游戏继续暂停，不做处理
      console.log('被动天劫失败，请继续挑战')
    } else {
      // 主动天劫失败
      gameStore.activeTianJieFailure()
    }
  }
  
  showBattleDetail.value = false
}

// 天劫淬体（预留）
const handleTianJieQuenTi = () => {
  console.log('天劫淬体功能开发中...')
}

// 排行榜
const handleRanking = () => {
  showRankingModal.value = true
}

// 监听被动天劫触发，自动打开弹窗
watch(() => gameStore.player.tianJie.isPassiveTriggered, (triggered) => {
  if (triggered) {
    showModal.value = true
  }
})
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
