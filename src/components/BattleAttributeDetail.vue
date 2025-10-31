<template>
  <div class="battle-detail">
    <!-- 总数值和计算过程合并 -->
    <div class="section compact">
      <div class="formula-box compact">
        <div class="formula-text">
          属性 = 基础值 × (1 + 境界系数) × (1 + 加成) × (1 + 轮回加成) × (1 + 战斗倍率)
        </div>
      </div>
      
      <div class="calculation-box compact">
        <div 
          v-for="attr in attributeList" 
          :key="attr.key"
          class="calc-item"
        >
          <div class="calc-line">
            <span class="calc-name">{{ attr.name }}{{ formatNumber(allAttributesDetails[attr.key].finalValue) }}</span>
            <span class="calc-equal"> = </span>
            <span class="calc-detail">{{ allAttributesDetails[attr.key].calculationFormula }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 加成详情 -->
    <div class="section">
      <h4 class="section-title">加成详情</h4>
      <div class="bonus-list">
        <div v-if="bonusByCategory.length === 0" class="empty-bonus">
          暂无加成
        </div>
        <div v-else>
          <div 
            v-for="(category, index) in bonusByCategory" 
            :key="index"
            class="bonus-category"
          >
            <div class="category-header">
              <span class="category-name">######## {{ category.name }} ########</span>
            </div>
            <div 
              v-for="(item, itemIndex) in category.items" 
              :key="itemIndex"
              class="bonus-item"
            >
              <span class="item-number">{{ itemIndex + 1 }}.</span>
              <span class="item-name">{{ item.displayName }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 其他说明 -->
    <div class="section">
      <div class="note-text">
        轮回加成 = 轮回境界加成 + 轮回寿命加成 = {{ reincarnationBonus.realm }} + {{ reincarnationBonus.lifespan }}<br>
        当你发现没法更进一步时就可以考虑轮回了了哦～～
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { formatNumber } from '@/utils/numberFormatter.js'
import { getBattleAttributeDetails } from '@/utils/battleAttributeDetailCalculator.js'

const props = defineProps({
  player: {
    type: Object,
    required: true
  }
})

// 属性列表
const attributeList = [
  { key: 'hp', name: '血量' },
  { key: 'attack', name: '攻击' },
  { key: 'defense', name: '防御' },
  { key: 'speed', name: '速度' },
  { key: 'crit', name: '暴击' },
  { key: 'toughness', name: '韧性' },
  { key: 'dodge', name: '闪避' },
  { key: 'hit', name: '命中' }
]

// 属性中文名映射
const attributeNames = {
  hp: '血量',
  attack: '攻击',
  defense: '防御',
  speed: '速度',
  crit: '暴击',
  toughness: '韧性',
  dodge: '闪避',
  hit: '命中'
}

// 获取战斗属性详情
const battleDetails = computed(() => {
  return getBattleAttributeDetails(props.player)
})

// 获取所有属性的详情（包含计算公式）
const allAttributesDetails = computed(() => {
  const details = battleDetails.value
  const result = {}
  
  for (let attr of attributeList) {
    const attrKey = attr.key
    const baseValue = details.baseValues[attrKey]
    const realmCoefficient = details.realmCoefficient
    const bonus = details.totalBonuses[attrKey]
    const finalValue = details.finalValues[attrKey]
    
    // 构建完整计算公式：属性 = 基础值 × (1 + 境界系数) × (1 + 加成) × (1 + 轮回加成) × (1 + 战斗倍率)
    const reincarnationBonus = 0 // 轮回加成（暂时为0）
    const battleMultiplier = 0 // 战斗倍率（暂时为0）
    
    const calculationFormula = `${baseValue} × (1 + ${realmCoefficient}) × (1 + ${formatNumber(bonus)}) × (1 + ${reincarnationBonus}) × (1 + ${battleMultiplier})`
    
    result[attrKey] = {
      baseValue,
      realmCoefficient,
      bonus,
      finalValue,
      calculationFormula
    }
  }
  
  return result
})

// 按类别组织加成信息
const bonusByCategory = computed(() => {
  const details = battleDetails.value
  const categories = []
  
  // 天赋加成
  if (details.bonusDetails.talent.details && details.bonusDetails.talent.details.talents) {
    const talentItems = []
    const talents = details.bonusDetails.talent.details.talents
    
    // 气感 -> 血量
    if (talents.qigan) {
      talentItems.push({
        displayName: `血量+${formatNumber(talents.qigan.bonus)}`,
        bonus: talents.qigan.bonus
      })
    }
    
    // 神识 -> 攻击
    if (talents.shishi) {
      talentItems.push({
        displayName: `攻击+${formatNumber(talents.shishi.bonus)}`,
        bonus: talents.shishi.bonus
      })
    }
    
    // 根骨 -> 防御
    if (talents.gengu) {
      talentItems.push({
        displayName: `防御+${formatNumber(talents.gengu.bonus)}`,
        bonus: talents.gengu.bonus
      })
    }
    
    // 悟性 -> 修为修炼速度 + 功法修炼速度
    if (talents.wuxing) {
      talentItems.push({
        displayName: `修为修炼速度+${formatNumber(talents.wuxing.bonus)}`,
        bonus: talents.wuxing.bonus
      })
      talentItems.push({
        displayName: `功法修炼速度+${formatNumber(talents.wuxing.bonus)}`,
        bonus: talents.wuxing.bonus
      })
    }
    
    // 机缘 -> 战斗经验修炼速度 + 灵石获取速度
    if (talents.jiyuan) {
      talentItems.push({
        displayName: `战斗经验修炼速度+${formatNumber(talents.jiyuan.bonus)}`,
        bonus: talents.jiyuan.bonus
      })
      talentItems.push({
        displayName: `灵石获取速度+${formatNumber(talents.jiyuan.bonus)}`,
        bonus: talents.jiyuan.bonus
      })
    }
    
    if (talentItems.length > 0) {
      categories.push({
        name: '天赋',
        items: talentItems
      })
    }
  }
  
  // 仙灵环加成
  const spiritRingDetails = details.bonusDetails.spiritRing.details
  if (spiritRingDetails && spiritRingDetails.bonus > 0) {
    const spiritRingItems = []
    
    // 仙灵环影响所有8个战斗属性
    for (let attr of attributeList) {
      spiritRingItems.push({
        displayName: `${attr.name}+${formatNumber(spiritRingDetails.bonus)}`,
        bonus: spiritRingDetails.bonus
      })
    }
    
    if (spiritRingItems.length > 0) {
      categories.push({
        name: '仙灵环',
        items: spiritRingItems
      })
    }
  }
  
  // 经脉加成
  const meridianDetails = details.bonusDetails.meridian.details
  if (meridianDetails && meridianDetails.length > 0) {
    const meridianItems = []
    
    // 经脉映射
    const meridianMap = {
      '督脉': '血量',
      '任脉': '攻击',
      '冲脉': '防御',
      '带脉': '修为修炼速度',
      '阳维脉': '战斗经验修炼速度',
      '阴维脉': '灵石获取速度',
      '阴跷脉': '灵石获取速度',
      '阳跷脉': '功法修炼速度'
    }
    
    for (let meridian of meridianDetails) {
      const attrName = meridianMap[meridian.name]
      if (attrName) {
        meridianItems.push({
          displayName: `${attrName}+${formatNumber(meridian.bonus)}`,
          bonus: meridian.bonus
        })
      }
    }
    
    if (meridianItems.length > 0) {
      categories.push({
        name: '经脉',
        items: meridianItems
      })
    }
  }
  
  // 仙战榜加成 - 按属性分组，显示所有境界的累计加成
  if (details.bonusDetails.immortalRanking.details) {
    const immortalDetails = details.bonusDetails.immortalRanking.details
    
    // 属性名称映射（包括战斗属性和修炼速度）
    const attrNameMap = {
      hp: '血量',
      attack: '攻击',
      defense: '防御',
      speed: '速度',
      crit: '暴击',
      toughness: '韧性',
      dodge: '闪避',
      hit: '命中',
      expSpeed: '修为修炼速度',
      combatSpeed: '战斗经验修炼速度',
      spiritStoneSpeed: '灵石获取速度',
      techniqueSpeed: '功法修炼速度'
    }
    
    // 按属性分组统计所有境界的加成
    const attrBonusMap = {}
    
    for (let bonus of immortalDetails.realmBonuses) {
      const attr = bonus.attribute
      if (!attrBonusMap[attr]) {
        attrBonusMap[attr] = []
      }
      attrBonusMap[attr].push({
        realmLevel: bonus.realmLevel,
        bonus: bonus.bonus
      })
    }
    
    // 生成显示项
    const immortalItems = []
    for (let attr in attrBonusMap) {
      const attrName = attrNameMap[attr]
      if (attrName) {
        const bonuses = attrBonusMap[attr]
        // 计算总加成
        const totalBonus = bonuses.reduce((sum, b) => sum + b.bonus, 0)
        
        immortalItems.push({
          displayName: `${attrName}+${formatNumber(totalBonus)}`,
          bonus: totalBonus
        })
      }
    }
    
    if (immortalItems.length > 0) {
      categories.push({
        name: '仙战榜',
        items: immortalItems
      })
    }
  }
  
  return categories
})

// 轮回加成（暂时为0）
const reincarnationBonus = computed(() => ({
  realm: 0,
  lifespan: 0
}))
</script>

<style scoped>
.battle-detail {
  font-size: 0.875rem;
  color: #374151;
}

.section {
  margin-bottom: 1.5rem;
}

.section.compact {
  margin-bottom: 1rem;
}

.section:last-child {
  margin-bottom: 0;
}

.section-title {
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.5rem;
}

.formula-box {
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  padding: 0.75rem;
  margin-bottom: 0.75rem;
}

.formula-box.compact {
  padding: 0.5rem;
  margin-bottom: 0.5rem;
}

.formula-text {
  font-size: 0.8125rem;
  line-height: 1.5;
  color: #4b5563;
  word-break: break-all;
}

.calculation-box {
  background-color: #fef3c7;
  border: 1px solid #fbbf24;
  border-radius: 0.375rem;
  padding: 0.75rem;
}

.calculation-box.compact {
  padding: 0.5rem;
}

.calc-item {
  padding: 0.25rem 0;
}

.calc-line {
  display: flex;
  align-items: baseline;
  font-size: 0.8125rem;
  line-height: 1.6;
  color: #92400e;
  word-break: break-all;
}

.calc-name {
  font-weight: 600;
  color: #b45309;
  flex-shrink: 0;
  margin-right: 0.25rem;
}

.calc-equal {
  flex-shrink: 0;
  margin: 0 0.25rem;
  color: #92400e;
}

.calc-detail {
  color: #92400e;
  word-break: break-all;
}

.bonus-list {
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  padding: 0.75rem;
  max-height: 400px;
  overflow-y: auto;
}

.empty-bonus {
  text-align: center;
  color: #9ca3af;
  padding: 1rem 0;
}

.bonus-category {
  margin-bottom: 1rem;
}

.bonus-category:last-child {
  margin-bottom: 0;
}

.category-header {
  margin-bottom: 0.5rem;
}

.category-name {
  font-size: 0.8125rem;
  font-weight: 600;
  color: #6b7280;
  letter-spacing: 0.025em;
}

.bonus-item {
  display: flex;
  align-items: baseline;
  padding: 0.125rem 0;
  font-size: 0.8125rem;
  line-height: 1.5;
}

.item-number {
  color: #9ca3af;
  margin-right: 0.25rem;
  flex-shrink: 0;
}

.item-name {
  color: #4b5563;
  flex: 1;
}

.note-text {
  font-size: 0.8125rem;
  color: #6b7280;
  line-height: 1.6;
  background-color: #f9fafb;
  border-left: 3px solid #d1d5db;
  padding: 0.75rem;
  border-radius: 0.25rem;
}

/* 滚动条样式 */
.bonus-list::-webkit-scrollbar {
  width: 6px;
}

.bonus-list::-webkit-scrollbar-track {
  background: #f3f4f6;
  border-radius: 3px;
}

.bonus-list::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 3px;
}

.bonus-list::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}
</style>
