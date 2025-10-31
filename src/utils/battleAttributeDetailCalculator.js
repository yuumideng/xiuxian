/**
 * 战斗属性详细计算器
 * 用于生成战斗属性的详细计算过程和加成明细
 * 
 * @author AI Assistant
 * @version 1.0.0
 * @date 2025-10-30
 */

import { getRealmCoefficient, BATTLE_CONFIG } from './battleCalculator.js'
import { calculateBattleAttributeBonuses, getTalentDetails } from './talentSystem.js'
import { calculateBattleAttributeBonuses as calculateMeridianBonuses, getMeridianDetails } from './meridianSystem.js'
import { calculateBattleAttributeBonuses as calculateSpiritRingBonuses, getSpiritRingDetails } from './spiritRingSystem.js'
import { calculateBattleAttributeBonuses as calculateImmortalRankingBonuses, getImmortalRankingDetails } from './immortalRankingSystem.js'

/**
 * 属性中文名映射
 */
const ATTRIBUTE_NAMES = {
  hp: '血量',
  attack: '攻击',
  defense: '防御',
  speed: '速度',
  crit: '暴击',
  toughness: '韧性',
  dodge: '闪避',
  hit: '命中'
}

/**
 * 获取战斗属性的详细计算信息
 * 
 * @param {Object} player - 玩家对象
 * @returns {Object} 详细计算信息
 */
export function getBattleAttributeDetails(player) {
  const level = player.level
  const talents = player.talents || null
  const immortalRanking = player.immortalRanking || null
  
  // 1. 基础值
  const baseValues = BATTLE_CONFIG.BASE_ATTRIBUTES
  
  // 2. 境界系数
  const realmCoefficient = getRealmCoefficient(level)
  
  // 3. 各类加成
  const bonusDetails = {
    talent: { bonuses: {}, details: null },
    meridian: { bonuses: {}, details: null },
    spiritRing: { bonuses: {}, details: null },
    immortalRanking: { bonuses: {}, details: null }
  }
  
  // 3.1 天赋加成
  if (talents) {
    bonusDetails.talent.bonuses = calculateBattleAttributeBonuses(talents, level)
    bonusDetails.talent.details = getTalentDetails(talents, level)
  }
  
  // 3.2 经脉加成
  bonusDetails.meridian.bonuses = calculateMeridianBonuses(level)
  bonusDetails.meridian.details = getMeridianDetails(level)
  
  // 3.3 仙灵环加成
  bonusDetails.spiritRing.bonuses = calculateSpiritRingBonuses(level)
  bonusDetails.spiritRing.details = getSpiritRingDetails(level)
  
  // 3.4 仙战榜加成
  if (immortalRanking) {
    bonusDetails.immortalRanking.bonuses = calculateImmortalRankingBonuses(immortalRanking)
    bonusDetails.immortalRanking.details = getImmortalRankingDetails(immortalRanking)
  }
  
  // 4. 计算总加成
  const totalBonuses = {}
  for (let attr in baseValues) {
    totalBonuses[attr] = 0
    for (let bonusType in bonusDetails) {
      totalBonuses[attr] += bonusDetails[bonusType].bonuses[attr] || 0
    }
  }
  
  // 5. 计算最终值
  const finalValues = {}
  for (let attr in baseValues) {
    const bonus = totalBonuses[attr]
    const totalMultiplier = (1 + realmCoefficient) * (1 + bonus)
    finalValues[attr] = Math.floor(baseValues[attr] * totalMultiplier)
  }
  
  return {
    baseValues,
    realmCoefficient,
    bonusDetails,
    totalBonuses,
    finalValues
  }
}

/**
 * 格式化属性计算公式
 * 
 * @param {string} attr - 属性名
 * @param {Object} details - 详细计算信息
 * @returns {Object} 格式化后的公式信息
 */
export function formatAttributeFormula(attr, details) {
  const { baseValues, realmCoefficient, totalBonuses, finalValues } = details
  
  const baseValue = baseValues[attr]
  const bonus = totalBonuses[attr]
  const finalValue = finalValues[attr]
  
  // 格式化加成百分比
  const bonusPercent = (bonus * 100).toFixed(2)
  
  // 构建公式字符串
  const formula = `${ATTRIBUTE_NAMES[attr]} = ${baseValue} × (1 + ${realmCoefficient}) × (1 + ${bonusPercent}%)`
  
  // 计算步骤
  const steps = [
    `基础值：${baseValue}`,
    `境界系数：${realmCoefficient}`,
    `总加成：${bonusPercent}%`,
    `计算：${baseValue} × ${1 + realmCoefficient} × ${(1 + bonus).toFixed(4)}`,
    `结果：${finalValue}`
  ]
  
  return {
    name: ATTRIBUTE_NAMES[attr],
    formula,
    steps,
    baseValue,
    realmCoefficient,
    bonus,
    bonusPercent,
    finalValue
  }
}

/**
 * 格式化加成列表
 * 
 * @param {string} attr - 属性名
 * @param {Object} bonusDetails - 加成详情
 * @returns {Array} 格式化后的加成列表
 */
export function formatBonusList(attr, bonusDetails) {
  const bonusList = []
  
  // 天赋加成
  if (bonusDetails.talent.details && bonusDetails.talent.details.talents) {
    const talentBonus = bonusDetails.talent.bonuses[attr] || 0
    if (talentBonus > 0) {
      const details = bonusDetails.talent.details.talents
      const items = []
      
      // 根据属性类型找到对应的天赋
      if (attr === 'hp' && details.qigan) {
        items.push({
          name: '气感',
          value: details.qigan.points,
          bonus: details.qigan.bonus
        })
      }
      if (attr === 'attack' && details.shishi) {
        items.push({
          name: '神识',
          value: details.shishi.points,
          bonus: details.shishi.bonus
        })
      }
      if (attr === 'defense' && details.gengu) {
        items.push({
          name: '根骨',
          value: details.gengu.points,
          bonus: details.gengu.bonus
        })
      }
      
      if (items.length > 0) {
        bonusList.push({
          category: '天赋',
          totalBonus: talentBonus,
          items
        })
      }
    }
  }
  
  // 仙灵环加成（灵根）
  const spiritRingBonus = bonusDetails.spiritRing.bonuses[attr] || 0
  if (spiritRingBonus > 0) {
    const details = bonusDetails.spiritRing.details
    // 根据大境界级别获取境界名称
    const realmNames = ['练气', '筑基', '金丹', '元婴', '化神', '炼虚', '合体', '大乘', '渡劫']
    const realmName = realmNames[details.realmLevel - 1] || `第${details.realmLevel}境`
    
    bonusList.push({
      category: '灵根',
      totalBonus: spiritRingBonus,
      items: [{
        name: realmName,
        value: details.bonus,
        bonus: details.bonus,
        type: 'spiritRing'
      }]
    })
  }
  
  // 经脉加成
  const meridianBonus = bonusDetails.meridian.bonuses[attr] || 0
  if (meridianBonus > 0) {
    const details = bonusDetails.meridian.details
    const items = []
    
    // 找到对应的经脉
    for (let meridian of details) {
      if (meridian.affectedAttributes && meridian.affectedAttributes.includes(attr)) {
        items.push({
          name: meridian.name,
          value: meridian.bonus,
          bonus: meridian.bonus
        })
      }
    }
    
    if (items.length > 0) {
      bonusList.push({
        category: '经脉',
        totalBonus: meridianBonus,
        items
      })
    }
  }
  
  // 仙战榜加成
  if (bonusDetails.immortalRanking.details) {
    const immortalBonus = bonusDetails.immortalRanking.bonuses[attr] || 0
    if (immortalBonus > 0) {
      const details = bonusDetails.immortalRanking.details
      const items = []
      
      // 找到对应属性的加成
      for (let bonus of details.realmBonuses) {
        if (bonus.attribute === attr) {
          items.push({
            name: `第${bonus.realmLevel}境`,
            value: bonus.bonus,
            bonus: bonus.bonus
          })
        }
      }
      
      if (items.length > 0) {
        bonusList.push({
          category: '仙战榜',
          totalBonus: immortalBonus,
          items
        })
      }
    }
  }
  
  return bonusList
}

/**
 * 获取完整的属性详情（包含公式和加成列表）
 * 
 * @param {string} attr - 属性名
 * @param {Object} player - 玩家对象
 * @returns {Object} 完整的属性详情
 */
export function getAttributeFullDetails(attr, player) {
  const details = getBattleAttributeDetails(player)
  const formula = formatAttributeFormula(attr, details)
  const bonusList = formatBonusList(attr, details.bonusDetails)
  
  return {
    ...formula,
    bonusList
  }
}

/**
 * 获取所有属性的详情
 * 
 * @param {Object} player - 玩家对象
 * @returns {Object} 所有属性的详情
 */
export function getAllAttributesDetails(player) {
  const details = getBattleAttributeDetails(player)
  const result = {}
  
  for (let attr in BATTLE_CONFIG.BASE_ATTRIBUTES) {
    result[attr] = getAttributeFullDetails(attr, player)
  }
  
  return result
}
