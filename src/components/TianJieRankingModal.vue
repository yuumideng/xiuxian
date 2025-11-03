<template>
  <Modal v-model="showModal" title="心魔&天劫排行榜" @close="handleClose" position="center" :width="600">
    <div class="space-y-3 text-xs">
      <!-- 用户ID和VIP信息 -->
      <div class="text-center text-gray-500 text-xs">
        <div>{{ playerId }}</div>
        <div class="text-purple-600">Ios VIP v10.28(3)</div>
      </div>
      
      <!-- 表头 -->
      <div class="grid grid-cols-3 gap-2 bg-gray-100 py-2 px-3 rounded-lg font-bold text-gray-700">
        <div class="text-center">境界</div>
        <div class="text-center">心魔劫(超越玩家)</div>
        <div class="text-center">天劫 (超越玩家)</div>
      </div>
      
      <!-- 滚动区域 -->
      <div class="max-h-96 overflow-y-auto space-y-2">
        <!-- 遍历每个大界 -->
        <div v-for="realm in realmRecords" :key="realm.realmLevel" class="border border-gray-200 rounded-lg overflow-hidden">
          <!-- 大界标题 -->
          <div class="bg-gradient-to-r from-gray-50 to-gray-100 px-3 py-2 font-bold text-gray-800 border-b border-gray-200">
            {{ realm.realmName }}
          </div>
          
          <!-- 大境界记录 -->
          <div class="grid grid-cols-3 gap-2 px-3 py-2 bg-white hover:bg-gray-50 transition-colors">
            <div class="text-center text-gray-700">{{ realm.majorRealmName }}</div>
            <div class="text-center">
              <span class="font-medium">{{ realm.xinMoFloor }}</span>
              <span class="text-gray-500 text-xs ml-1">({{ realm.xinMoPercent }})</span>
            </div>
            <div class="text-center">
              <span class="font-medium">{{ realm.tianJieFloor }}</span>
              <span class="text-gray-500 text-xs ml-1">({{ realm.tianJiePercent }})</span>
            </div>
          </div>
          
          <!-- 合计行 -->
          <div class="grid grid-cols-3 gap-2 px-3 py-2 bg-gray-50 border-t border-gray-200">
            <div class="text-center text-gray-600 font-medium">合计</div>
            <div class="text-center font-bold text-gray-800">{{ realm.xinMoFloor }}</div>
            <div class="text-center font-bold text-gray-800">{{ realm.tianJieFloor }}</div>
          </div>
          
          <!-- 加成行 -->
          <div class="grid grid-cols-3 gap-2 px-3 py-2 bg-yellow-50 border-t border-gray-200">
            <div class="text-center text-gray-600 font-medium">加成</div>
            <div class="text-center text-xs text-purple-600">{{ realm.xinMoBonus }}</div>
            <div class="text-center text-xs text-purple-600">{{ realm.tianJieBonus }}</div>
          </div>
        </div>
      </div>
      
      <!-- 总劫数统计 -->
      <div class="grid grid-cols-2 gap-3 mt-4">
        <div class="bg-gradient-to-br from-pink-500 to-red-500 text-white rounded-lg py-3 px-4 text-center">
          <div class="text-xs opacity-90 mb-1">总劫数</div>
          <div class="text-2xl font-bold">{{ totalXinMoFloors }}</div>
        </div>
        <div class="bg-gradient-to-br from-blue-500 to-purple-500 text-white rounded-lg py-3 px-4 text-center">
          <div class="text-xs opacity-90 mb-1">总劫数</div>
          <div class="text-2xl font-bold">{{ totalTianJieFloors }}</div>
        </div>
      </div>
      
      <!-- 加成规则说明 -->
      <div class="bg-gray-50 rounded-lg p-3 text-xs text-gray-600 leading-relaxed">
        <div class="font-bold text-gray-700 mb-1">加成规则：</div>
        <div>根据每个境界心魔劫、劫数劫获得一定比例的对应加成</div>
        <div>1.天劫加成：灵石、修为、速度、战斗经验获取速度</div>
        <div>2.天劫加成：战斗属性（血量、攻击、防御、速度、暴击、韧性、闪避、命中）</div>
      </div>
      
      <!-- 底部提示 -->
      <div class="text-gray-400 text-center" style="font-size: 0.625rem;">
        （点击空白处关闭）
      </div>
    </div>
  </Modal>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useGameStore } from '@/store/gameState'
import Modal from './common/Modal.vue'

const gameStore = useGameStore()
const showModal = defineModel({ type: Boolean, default: false })

// 玩家ID（模拟生成）
const playerId = computed(() => {
  return 'AD2F39_2E9605_7A60EF'
})

// 大界名称映射（根据境界等级范围）
const getRealmWorldName = (realmLevel) => {
  if (realmLevel >= 1 && realmLevel <= 8) return '凡界'
  if (realmLevel >= 9 && realmLevel <= 10) return '虚无界'
  if (realmLevel >= 11 && realmLevel <= 18) return '鸿蒙界'
  if (realmLevel >= 19 && realmLevel <= 26) return '混沌界'
  return '未知界'
}

// 大境界名称映射
const getMajorRealmName = (realmLevel) => {
  const realmNames = [
    '练气期', '筑基期', '金丹期', '元婴期', '化神期', '炼虚期', '合体期', '大乘期',
    '虚无行者', '虚无尊者',
    '鸿蒙元尊', '鸿蒙天尊', '鸿蒙大尊', '鸿蒙帝尊', '鸿蒙至尊', '鸿蒙镇尊', '鸿蒙道尊', '鸿蒙始祖',
    '混沌真君', '混沌圣君', '混沌神君', '混沌道君', '混沌道君', '混沌主宰', '混沌王者', '混沌至尊'
  ]
  return realmNames[realmLevel - 1] || `境界${realmLevel}`
}

// 计算排行榜记录
const realmRecords = computed(() => {
  const currentRealmLevel = Math.floor((gameStore.player.level - 1) / 10) + 1
  const records = []
  
  // 只展示已达到的境界
  for (let realmLevel = 1; realmLevel <= currentRealmLevel; realmLevel++) {
    // 获取天劫层数
    let tianJieFloor = 0
    if (realmLevel === gameStore.player.tianJie.currentRealmLevel) {
      // 当前境界，使用当前层数
      tianJieFloor = gameStore.player.tianJie.currentFloor
    } else if (gameStore.player.tianJie.realmFloors[realmLevel]) {
      // 历史境界，使用记录的层数
      tianJieFloor = gameStore.player.tianJie.realmFloors[realmLevel]
    }
    
    // 获取心魔劫层数（暂时模拟数据）
    let xinMoFloor = 0
    if (gameStore.player.xinMo && realmLevel === gameStore.player.xinMo.currentRealmLevel) {
      xinMoFloor = gameStore.player.xinMo.currentFloor
    } else if (gameStore.player.xinMo && gameStore.player.xinMo.realmFloors[realmLevel]) {
      xinMoFloor = gameStore.player.xinMo.realmFloors[realmLevel]
    }
    
    // 如果该境界有记录，才添加到列表
    if (tianJieFloor > 0 || xinMoFloor > 0 || realmLevel === currentRealmLevel) {
      // 计算百分比（暂时固定为99.999%）
      const tianJiePercent = tianJieFloor > 0 ? '99.999%' : '0%'
      const xinMoPercent = xinMoFloor > 0 ? '99.999%' : '0%'
      
      // 计算加成（暂时写死）
      const tianJieBonus = tianJieFloor > 0 ? `战斗属性速度+${(tianJieFloor * 0.5).toFixed(2)}亿` : '无加成'
      const xinMoBonus = xinMoFloor > 0 ? `灵石修炼速度+${(xinMoFloor * 0.3).toFixed(2)}亿` : '无加成'
      
      records.push({
        realmLevel,
        realmName: getRealmWorldName(realmLevel),
        majorRealmName: getMajorRealmName(realmLevel),
        tianJieFloor,
        xinMoFloor,
        tianJiePercent,
        xinMoPercent,
        tianJieBonus,
        xinMoBonus
      })
    }
  }
  
  return records
})

// 总劫数统计
const totalTianJieFloors = computed(() => {
  return realmRecords.value.reduce((sum, record) => sum + record.tianJieFloor, 0)
})

const totalXinMoFloors = computed(() => {
  return realmRecords.value.reduce((sum, record) => sum + record.xinMoFloor, 0)
})

// 关闭弹窗
const handleClose = () => {
  showModal.value = false
}
</script>

<style scoped>
/* 自定义滚动条样式 */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
