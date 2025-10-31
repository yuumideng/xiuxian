/**
 * 战斗属性计算器
 * 
 * 核心设计：
 * 公式：result = 基础值 × (1 + 境界系数) × (1 + 加成) × (1 + 轮回加成) × (1 + 战斗倍率)
 * 
 * 参数设定：
 * - 境界系数：Math.floor((level - 1) / 10) + 1（每大境界+1）
 * - 加成：天赋加成 + 灵根加成 + 装备加成 + ...（动态计算）
 * - 轮回加成：0（后续设计）
 * - 战斗倍率：0（后续设计）
 * 
 * @author AI Assistant
 * @version 2.1.0
 * @date 2025-10-30
 */

import { calculateBattleAttributeBonuses } from './talentSystem.js'
import { calculateBattleAttributeBonuses as calculateMeridianBonuses } from './meridianSystem.js'
import { calculateBattleAttributeBonuses as calculateSpiritRingBonuses } from './spiritRingSystem.js'
import { calculateBattleAttributeBonuses as calculateImmortalRankingBonuses } from './immortalRankingSystem.js'

/**
 * 基础属性配置（练气1层的基础值）
 */
const BASE_ATTRIBUTES = {
  attack: 20,      // 攻击
  dodge: 20,       // 闪避
  defense: 10,     // 防御
  hp: 100,         // 血量
  speed: 100,      // 速度
  crit: 100,       // 暴击
  toughness: 100,  // 韧性
  hit: 100         // 命中
}

/**
 * 境界系数配置（新版本 - 指数增长）
 * 
 * 规则：
 * - 练气期（大境界1）：每小境界 +1（1→10）
 * - 筑基期（大境界2）：每小境界 +1（11→20）
 * - 金丹期（大境界3）：每小境界 +2（22→40）
 * - 元婴期（大境界4）：每小境界 +4（44→80）
 * - 化神期（大境界5）：每小境界 +8（88→168）
 * 
 * 公式：
 * - 大境界1-2：每小境界 +1
 * - 大境界n（n≥3）：每小境界 +2^(n-2)
 * 
 * 示例：
 * - 练气1层=1, 练气10层=10
 * - 筑基初期=11, 筑基大圆满=20
 * - 金丹初期=22, 金丹大圆满=40
 * - 元婴初期=44, 元婴大圆满=80
 * - 化神初期=88, 化神大圆满=168
 */
export function getRealmCoefficient(level) {
  // 计算大境界级别（每10个小等级为一个大境界）
  const realmLevel = Math.floor((level - 1) / 10) + 1
  // 计算当前大境界内的小境界（1-10）
  const subLevel = ((level - 1) % 10) + 1
  
  // 计算前面所有大境界的累计系数
  let baseCoefficient = 0
  
  for (let i = 1; i < realmLevel; i++) {
    if (i <= 2) {
      // 练气和筑基：每小境界 +1，共10个小境界
      baseCoefficient += 10
    } else {
      // 金丹及以上：每小境界 +2^(i-2)，共10个小境界
      baseCoefficient += 10 * Math.pow(2, i - 2)
    }
  }
  
  // 计算当前大境界内的增量
  let currentIncrement = 0
  if (realmLevel <= 2) {
    // 练气和筑基：每小境界 +1
    currentIncrement = subLevel
  } else {
    // 金丹及以上：每小境界 +2^(realmLevel-2)
    currentIncrement = subLevel * Math.pow(2, realmLevel - 2)
  }
  
  return baseCoefficient + currentIncrement
}

/**
 * 战斗力权重配置
 * 攻击和防御为核心，血量次之，其他属性平均分配
 */
const POWER_WEIGHTS = {
  attack: 0.28,    // 攻击权重28% - 核心输出
  defense: 0.28,   // 防御权重28% - 核心生存
  hp: 0.20,        // 血量权重20% - 次要生存
  speed: 0.06,     // 速度权重6%
  crit: 0.06,      // 暴击权重6%
  toughness: 0.06, // 韧性权重6%
  dodge: 0.03,     // 闪避权重3%
  hit: 0.03        // 命中权重3%
}

/**
 * 根据境界等级和天赋计算八大属性
 * 公式：result = 基础值 × (1 + 境界系数) × (1 + 加成) × (1 + 轮回加成) × (1 + 战斗倍率)
 * 
 * @param {Object} player - 玩家对象
 * @param {number} player.level - 境界等级
 * @param {Object} player.talents - 天赋对象（可选）
 * @returns {Object} 八大战斗属性
 */
export function calculateBattleAttributes(player) {
  const level = player.level
  const talents = player.talents || null
  const immortalRanking = player.immortalRanking || null
  
  // 1. 境界系数
  const realmCoefficient = getRealmCoefficient(level)
  
  // 2. 加成（天赋加成 + 经脉加成 + 灵根加成 + 装备加成 + ...）
  let attributeBonuses = {}
  
  // 2.1 天赋加成
  if (talents) {
    attributeBonuses = calculateBattleAttributeBonuses(talents, level)
  } else {
    // 如果没有天赋数据，使用默认值0
    attributeBonuses = {
      hp: 0,
      attack: 0,
      defense: 0,
      speed: 0,
      crit: 0,
      toughness: 0,
      dodge: 0,
      hit: 0
    }
  }
  
  // 2.2 经脉加成
  const meridianBonuses = calculateMeridianBonuses(level)
  // 将经脉加成叠加到总加成中
  for (let attr in meridianBonuses) {
    attributeBonuses[attr] = (attributeBonuses[attr] || 0) + meridianBonuses[attr]
  }
  
  // 2.3 仙灵环加成
  const spiritRingBonuses = calculateSpiritRingBonuses(level)
  // 将仙灵环加成叠加到总加成中
  for (let attr in spiritRingBonuses) {
    attributeBonuses[attr] = (attributeBonuses[attr] || 0) + spiritRingBonuses[attr]
  }
  
  // 2.4 仙战榜加成
  if (immortalRanking) {
    const immortalRankingBonuses = calculateImmortalRankingBonuses(immortalRanking)
    // 将仙战榜加成叠加到总加成中
    for (let attr in immortalRankingBonuses) {
      attributeBonuses[attr] = (attributeBonuses[attr] || 0) + immortalRankingBonuses[attr]
    }
  }
  
  // 2.5 灵根加成（后续实现）
  // 2.6 装备加成（后续实现）
  // 2.7 功法加成（后续实现）
  
  // 3. 轮回加成（暂时为0，后续设计）
  const reincarnationBonus = 0
  
  // 4. 战斗倍率（暂时为0，后续设计）
  const battleMultiplier = 0
  
  // 计算最终属性（每个属性使用各自的加成）
  const finalAttributes = {}
  for (let attr in BASE_ATTRIBUTES) {
    const bonus = attributeBonuses[attr] || 0
    const totalMultiplier = (1 + realmCoefficient) * (1 + bonus) * (1 + reincarnationBonus) * (1 + battleMultiplier)
    finalAttributes[attr] = Math.floor(BASE_ATTRIBUTES[attr] * totalMultiplier)
  }
  
  return finalAttributes
}

/**
 * 计算战斗力
 * 综合考虑所有属性，不同属性有不同权重
 * 
 * @param {Object} attributes - 八大战斗属性
 * @returns {number} 战斗力数值
 */
export function calculatePower(attributes) {
  let power = 0
  
  for (let attr in POWER_WEIGHTS) {
    if (attributes[attr] !== undefined) {
      power += attributes[attr] * POWER_WEIGHTS[attr]
    }
  }
  
  return Math.floor(power)
}

/**
 * 获取属性详细信息
 * 
 * @param {string} attrName - 属性名称
 * @returns {Object} 属性详细信息
 */
export function getAttributeInfo(attrName) {
  const attributeInfoMap = {
    hp: {
      name: '血量',
      description: '生命值，归零则战斗失败',
      icon: '❤️'
    },
    attack: {
      name: '攻击',
      description: '物理伤害基础值',
      icon: '⚔️'
    },
    defense: {
      name: '防御',
      description: '减少受到的伤害',
      icon: '🛡️'
    },
    speed: {
      name: '速度',
      description: '决定出手顺序和闪避率',
      icon: '⚡'
    },
    crit: {
      name: '暴击',
      description: '暴击率和暴击伤害',
      icon: '💥'
    },
    toughness: {
      name: '韧性',
      description: '抵抗暴击和控制效果',
      icon: '💪'
    },
    dodge: {
      name: '闪避',
      description: '躲避攻击的概率',
      icon: '🌪️'
    },
    hit: {
      name: '命中',
      description: '命中目标的概率',
      icon: '🎯'
    }
  }
  
  return attributeInfoMap[attrName] || { name: attrName, description: '', icon: '' }
}

/**
 * 获取属性成长信息
 * 
 * @param {number} currentLevel - 当前等级
 * @param {number} targetLevel - 目标等级
 * @param {number} combat - 战斗经验
 * @returns {Object} 成长信息
 */
export function getAttributeGrowth(currentLevel, targetLevel, combat = 0) {
  const currentAttrs = calculateBattleAttributes({ level: currentLevel, combat })
  const targetAttrs = calculateBattleAttributes({ level: targetLevel, combat })
  
  const growth = {}
  for (let attr in currentAttrs) {
    growth[attr] = {
      current: currentAttrs[attr],
      target: targetAttrs[attr],
      increase: targetAttrs[attr] - currentAttrs[attr],
      percentage: ((targetAttrs[attr] / currentAttrs[attr] - 1) * 100).toFixed(1)
    }
  }
  
  return growth
}

/**
 * 导出配置常量（供其他模块使用）
 */
export const BATTLE_CONFIG = {
  BASE_ATTRIBUTES,
  POWER_WEIGHTS
}
