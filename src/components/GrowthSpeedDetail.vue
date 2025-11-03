<template>
  <Modal v-model="showModal" title="修炼速度加成详情" @close="handleClose" position="bottom">
    <div class="space-y-2 text-xs">
      <!-- 灵石速度 -->
      <div>
        <div class="text-gray-700">灵石 = A × (1 + 灵石加成) × (1 + 卡片加成)</div>
        <div class="text-gray-500 text-[11px]">
          {{ formatNumber(actualSpeeds.spiritStone) }} = A × (1 + {{ formatNumber(bonuses.spiritStone) }}) × (1 + 0)
        </div>
      </div>

      <!-- 修为速度 -->
      <div>
        <div class="text-gray-700">修为 = A × (1 + 修为加成) × 吸收效率 × (1 + 修为倍率)</div>
        <div class="text-gray-500 text-[11px]">
          {{ formatNumber(actualSpeeds.exp) }} = A × (1 + {{ formatNumber(bonuses.exp) }}) × {{ absorptionEfficiency }} × (1 + {{ expMultiplier }})
        </div>
      </div>

      <!-- 战斗经验速度 -->
      <div>
        <div class="text-gray-700">战斗经验 = A × (1 + 战斗经验加成) × 吸收效率 × (1 + 战斗经验倍率)</div>
        <div class="text-gray-500 text-[11px]">
          {{ formatNumber(actualSpeeds.combat) }} = A × (1 + {{ formatNumber(bonuses.combat) }}) × {{ absorptionEfficiency }} × (1 + {{ combatMultiplier }})
        </div>
      </div>

      <!-- A值详情 -->
      <div class="pt-1 border-t border-gray-200">
        <div class="text-gray-700">其中：A = (1 + 境界) × (1 + 历练层) × (1 + 轮回加成)</div>
        <div class="text-gray-500 text-[11px]">
          {{ formatNumber(A) }} = (1 + {{ formatNumber(realmCoefficient) }}) × (1 + {{ currentTrainingLevel }}) × (1 + {{ reincarnationBonus }})
        </div>
      </div>

      <!-- 提示信息 -->
      <div class="text-[11px] text-gray-400 pt-1 border-t border-gray-200">
        (卡片加成 = 0)
      </div>
      <div class="text-[11px] text-gray-400">
        (当你发现没法更进一步的时候就可以考虑轮回了哦~~)
      </div>
    </div>
  </Modal>
</template>

<script setup>
import { computed, watch } from 'vue'
import { useGameStore } from '@/store/gameState.js'
import { formatNumber } from '@/utils/numberFormatter.js'
import { getRealmCoefficient, getTrainingLevels } from '@/utils/growthCalculator.js'
import { calculateCultivationSpeedBonuses as calculateTalentSpeedBonuses } from '@/utils/talentSystem.js'
import { calculateCultivationSpeedBonuses as calculateMeridianSpeedBonuses } from '@/utils/meridianSystem.js'
import { calculateCultivationSpeedBonuses as calculateImmortalRankingSpeedBonuses } from '@/utils/immortalRankingSystem.js'
import Modal from './common/Modal.vue'

const props = defineProps({
  show: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['close'])

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

const gameStore = useGameStore()

// 常量配置
const absorptionEfficiency = 1
const expMultiplier = 2
const combatMultiplier = 2
const reincarnationBonus = 100

// 计算境界系数
const realmCoefficient = computed(() => {
  return getRealmCoefficient(gameStore.player.level)
})

// 计算历练层数（动态）
const currentTrainingLevel = computed(() => {
  return getTrainingLevels(gameStore.player.level)
})

// 计算 A 值
const A = computed(() => {
  return (1 + realmCoefficient.value) * (1 + currentTrainingLevel.value) * (1 + reincarnationBonus)
})

// 计算各系统的加成
const talentBonuses = computed(() => {
  if (!gameStore.player.talents) return { expSpeed: 0, combatSpeed: 0, spiritStoneSpeed: 0 }
  return calculateTalentSpeedBonuses(gameStore.player.talents, gameStore.player.level)
})

const meridianBonuses = computed(() => {
  return calculateMeridianSpeedBonuses(gameStore.player.level)
})

const immortalRankingBonuses = computed(() => {
  if (!gameStore.player.immortalRanking) return { expSpeed: 0, combatSpeed: 0, spiritStoneSpeed: 0 }
  return calculateImmortalRankingSpeedBonuses(gameStore.player.immortalRanking)
})

// 总加成
const bonuses = computed(() => {
  return {
    spiritStone: (talentBonuses.value.spiritStoneSpeed || 0) + 
                 (meridianBonuses.value.spiritStoneSpeed || 0) + 
                 (immortalRankingBonuses.value.spiritStoneSpeed || 0),
    exp: (talentBonuses.value.expSpeed || 0) + 
         (meridianBonuses.value.expSpeed || 0) + 
         (immortalRankingBonuses.value.expSpeed || 0),
    combat: (talentBonuses.value.combatSpeed || 0) + 
            (meridianBonuses.value.combatSpeed || 0) + 
            (immortalRankingBonuses.value.combatSpeed || 0)
  }
})

// 加成详情（分来源）
const bonusDetails = computed(() => {
  return {
    spiritStone: {
      talent: talentBonuses.value.spiritStoneSpeed || 0,
      meridian: meridianBonuses.value.spiritStoneSpeed || 0,
      immortalRanking: immortalRankingBonuses.value.spiritStoneSpeed || 0
    },
    exp: {
      talent: talentBonuses.value.expSpeed || 0,
      meridian: meridianBonuses.value.expSpeed || 0,
      immortalRanking: immortalRankingBonuses.value.expSpeed || 0
    },
    combat: {
      talent: talentBonuses.value.combatSpeed || 0,
      meridian: meridianBonuses.value.combatSpeed || 0,
      immortalRanking: immortalRankingBonuses.value.combatSpeed || 0
    }
  }
})

// 实际速度
const actualSpeeds = computed(() => {
  return {
    spiritStone: gameStore.player.spiritStoneSpeed * 10, // 转换为10天的速度
    exp: gameStore.actualSpeeds.exp,
    combat: gameStore.actualSpeeds.combat
  }
})
</script>
