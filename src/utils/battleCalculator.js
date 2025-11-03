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
 * 回合制战斗系统
 * 基于八项属性进行真实战斗模拟
 */

/**
 * 战斗配置
 */
const BATTLE_SETTINGS = {
  MAX_ROUNDS: 100,           // 最大回合数
  CRIT_DAMAGE: 1.5,          // 暴击伤害倍率
  DEFENSE_REDUCTION: 0.0005, // 防御减伤系数（每点防御减少0.05%伤害）
  SPEED_DODGE_RATIO: 0.0001, // 速度对闪避的影响（每点速度增加0.01%闪避）
  BASE_HIT_RATE: 0.9,        // 基础命中率90%
  BASE_DODGE_RATE: 0.05,     // 基础闪避率5%
  BASE_CRIT_RATE: 0.1,       // 基础暴击率10%
  HIT_RATIO: 0.0005,         // 命中对命中率的影响（每点命中增加0.05%）
  DODGE_RATIO: 0.0005,       // 闪避对闪避率的影响（每点闪避增加0.05%）
  CRIT_RATIO: 0.0005,        // 暴击对暴击率的影响（每点暴击增加0.05%）
  TOUGHNESS_RATIO: 0.0005    // 韧性对抗暴击的影响（每点韧性减少0.05%暴击率）
}

/**
 * 计算命中率
 */
function calculateHitRate(attacker, defender) {
  const hitBonus = attacker.hit * BATTLE_SETTINGS.HIT_RATIO
  const dodgeBonus = defender.dodge * BATTLE_SETTINGS.DODGE_RATIO
  const speedDodge = defender.speed * BATTLE_SETTINGS.SPEED_DODGE_RATIO
  
  return Math.max(0.1, Math.min(0.95, 
    BATTLE_SETTINGS.BASE_HIT_RATE + hitBonus - dodgeBonus - speedDodge
  ))
}

/**
 * 计算闪避率
 */
function calculateDodgeRate(defender) {
  const dodgeBonus = defender.dodge * BATTLE_SETTINGS.DODGE_RATIO
  const speedBonus = defender.speed * BATTLE_SETTINGS.SPEED_DODGE_RATIO
  
  return Math.max(0, Math.min(0.5, 
    BATTLE_SETTINGS.BASE_DODGE_RATE + dodgeBonus + speedBonus
  ))
}

/**
 * 计算暴击率
 */
function calculateCritRate(attacker, defender) {
  const critBonus = attacker.crit * BATTLE_SETTINGS.CRIT_RATIO
  const toughnessReduction = defender.toughness * BATTLE_SETTINGS.TOUGHNESS_RATIO
  
  return Math.max(0, Math.min(0.8, 
    BATTLE_SETTINGS.BASE_CRIT_RATE + critBonus - toughnessReduction
  ))
}

/**
 * 计算防御减伤
 */
function calculateDefenseReduction(defense) {
  const reduction = defense * BATTLE_SETTINGS.DEFENSE_REDUCTION
  return Math.min(0.9, reduction) // 最多减伤90%
}

/**
 * 计算单次攻击伤害
 */
function calculateDamage(attacker, defender) {
  // 1. 命中判定
  const hitRate = calculateHitRate(attacker, defender)
  if (Math.random() > hitRate) {
    return { damage: 0, isMiss: true, isCrit: false }
  }
  
  // 2. 闪避判定
  const dodgeRate = calculateDodgeRate(defender)
  if (Math.random() < dodgeRate) {
    return { damage: 0, isDodge: true, isCrit: false }
  }
  
  // 3. 暴击判定
  const critRate = calculateCritRate(attacker, defender)
  const isCrit = Math.random() < critRate
  
  // 4. 计算基础伤害
  const defenseReduction = calculateDefenseReduction(defender.defense)
  let damage = attacker.attack * (1 - defenseReduction)
  
  // 5. 暴击加成
  if (isCrit) {
    damage *= BATTLE_SETTINGS.CRIT_DAMAGE
  }
  
  // 6. 随机波动 ±10%
  damage *= (0.9 + Math.random() * 0.2)
  
  return { 
    damage: Math.floor(damage), 
    isMiss: false, 
    isDodge: false, 
    isCrit 
  }
}

/**
 * 执行回合制战斗
 * @param {Object} player - 玩家属性
 * @param {Object} enemy - 敌人属性
 * @param {boolean} detailed - 是否返回详细战斗日志
 * @returns {Object} 战斗结果
 */
export function executeBattle(player, enemy, detailed = false) {
  // 复制属性，避免修改原对象
  const playerState = { ...player, currentHp: player.hp }
  const enemyState = { ...enemy, currentHp: enemy.hp }
  
  const battleLog = []
  let round = 0
  
  // 决定出手顺序（速度高的先手）
  const playerFirst = playerState.speed >= enemyState.speed
  
  while (round < BATTLE_SETTINGS.MAX_ROUNDS) {
    round++
    
    // 按速度顺序执行回合
    const attackers = playerFirst 
      ? [{ state: playerState, name: '玩家' }, { state: enemyState, name: '敌人' }]
      : [{ state: enemyState, name: '敌人' }, { state: playerState, name: '玩家' }]
    
    for (let i = 0; i < 2; i++) {
      const attacker = attackers[i]
      const defender = attackers[1 - i]
      
      // 检查攻击者是否已死亡
      if (attacker.state.currentHp <= 0) continue
      
      // 执行攻击
      const result = calculateDamage(attacker.state, defender.state)
      defender.state.currentHp -= result.damage
      
      // 记录战斗日志
      if (detailed) {
        let logMsg = `第${round}回合 - ${attacker.name}攻击${defender.name}：`
        if (result.isMiss) {
          logMsg += '未命中'
        } else if (result.isDodge) {
          logMsg += '被闪避'
        } else {
          logMsg += `造成${result.damage}伤害${result.isCrit ? '(暴击!)' : ''}`
        }
        logMsg += ` [${defender.name}剩余HP: ${Math.max(0, defender.state.currentHp)}/${defender.state.hp}]`
        battleLog.push(logMsg)
      }
      
      // 检查战斗是否结束
      if (defender.state.currentHp <= 0) {
        return {
          victory: attacker.name === '玩家',
          rounds: round,
          playerFinalHp: playerState.currentHp,
          enemyFinalHp: enemyState.currentHp,
          battleLog: detailed ? battleLog : null
        }
      }
    }
  }
  
  // 超过最大回合数，判定为失败
  return {
    victory: false,
    rounds: BATTLE_SETTINGS.MAX_ROUNDS,
    playerFinalHp: playerState.currentHp,
    enemyFinalHp: enemyState.currentHp,
    battleLog: detailed ? [...battleLog, '战斗超时，判定失败'] : null
  }
}

/**
 * 爬塔系统 - 生成指定层数的敌人属性
 * 
 * 新的难度设计策略：
 * 1. 练气1层就能通过第1层天劫
 * 2. 每个大境界可以多打约150层
 * 3. 难度曲线：敌人等级 = 玩家当前等级 + (层数 - 1) × 难度系数
 * 
 * 难度系数计算：
 * - 前50层：每层+0.5级（较容易）
 * - 50-100层：每层+0.6级
 * - 100-150层：每层+0.7级
 * - 150层以上：每层+0.8级
 * 
 * 这样设计可以确保：
 * - 练气1层（等级1）可以打过第1层（敌人等级1）
 * - 练气大圆满（等级10）可以打到约150层（敌人等级约85）
 * - 筑基大圆满（等级20）可以打到约300层（敌人等级约190）
 * - 金丹大圆满（等级30）可以打到约450层（敌人等级约295）
 * 
 * @param {Object} playerAttrs - 玩家属性（仅用于计算战力比）
 * @param {number} floor - 当前大境界的天劫层数（从1开始）
 * @param {number} playerLevel - 玩家当前等级（用于计算大境界）
 * @returns {Object} 敌人属性
 */
export function generateTowerEnemy(playerAttrs, floor, playerLevel = 1) {
  // 属性提升顺序（按战斗影响力排序）
  const attrOrder = ['attack', 'defense', 'hp', 'speed', 'crit', 'toughness', 'dodge', 'hit']
  
  // 计算玩家的大境界等级（1=练气，2=筑基，3=金丹...）
  const playerRealmLevel = Math.floor((playerLevel - 1) / 10) + 1
  
  // 计算难度系数（根据层数动态调整）
  // 目标：每个大境界（10级）可以多打约150层
  // 策略：敌人等级增长速度远低于层数增长速度
  let difficultyCoefficient = 0
  
  if (floor <= 50) {
    // 前50层：每层+0.06级（非常平缓）
    difficultyCoefficient = (floor - 1) * 0.06
  } else if (floor <= 100) {
    // 50-100层：每层+0.07级
    difficultyCoefficient = 50 * 0.06 + (floor - 50) * 0.07
  } else if (floor <= 150) {
    // 100-150层：每层+0.08级
    difficultyCoefficient = 50 * 0.06 + 50 * 0.07 + (floor - 100) * 0.08
  } else {
    // 150层以上：每层+0.09级
    difficultyCoefficient = 50 * 0.06 + 50 * 0.07 + 50 * 0.08 + (floor - 150) * 0.09
  }
  
  // 天劫敌人的等级 = 玩家当前等级 + 难度系数
  const enemyLevel = Math.max(1, Math.floor(playerLevel + difficultyCoefficient))
  
  // 计算敌人的基础属性（基于固定境界等级）
  const enemyBaseAttrs = calculateBattleAttributes({ level: enemyLevel, talents: null, immortalRanking: null })
  
  // 确定本层提升的属性（循环）
  const boostedAttrIndex = (floor - 1) % attrOrder.length
  const boostedAttr = attrOrder[boostedAttrIndex]
  
  // 生成敌人属性（降低属性加成，从30%降到15%）
  const enemyAttrs = {}
  
  for (let attr of attrOrder) {
    if (attr === boostedAttr) {
      // 被提升的属性：基础值 × 1.15（额外15%加成）
      enemyAttrs[attr] = Math.floor(enemyBaseAttrs[attr] * 1.15)
    } else {
      // 其他属性：基础值 × 0.95（略微降低5%，让玩家更容易通过）
      enemyAttrs[attr] = Math.floor(enemyBaseAttrs[attr] * 0.95)
    }
  }
  
  // 计算敌人战力与玩家战力的比值（用于显示）
  const enemyPower = calculatePower(enemyAttrs)
  const playerPower = calculatePower(playerAttrs)
  const powerRatio = playerPower > 0 ? enemyPower / playerPower : 1
  
  return {
    ...enemyAttrs,
    floor,
    enemyLevel,
    playerRealmLevel,
    boostedAttr,
    powerRatio: powerRatio,
    difficultyCoefficient: difficultyCoefficient
  }
}

/**
 * 计算爬塔预期层数
 * 基于战力对比的简单估算
 * 
 * @param {Object} playerAttrs - 玩家属性
 * @returns {number} 预期可通过的层数
 */
export function estimateTowerFloors(playerAttrs) {
  const playerPower = calculatePower(playerAttrs)
  
  // 二分查找最高可通过层数
  let left = 1, right = 200
  let maxFloor = 1
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2)
    const enemy = generateTowerEnemy(playerAttrs, mid)
    const enemyPower = calculatePower(enemy)
    
    // 如果玩家战力 > 敌人战力 × 1.1，认为可以通过
    if (playerPower > enemyPower * 1.1) {
      maxFloor = mid
      left = mid + 1
    } else {
      right = mid - 1
    }
  }
  
  return maxFloor
}

/**
 * 获取爬塔奖励
 * 根据通过层数计算属性提升
 * 
 * @param {number} floor - 通过的层数
 * @returns {Object} 属性提升
 */
export function getTowerRewards(floor) {
  // 属性提升顺序
  const attrOrder = ['attack', 'defense', 'hp', 'speed', 'crit', 'toughness', 'dodge', 'hit']
  
  // 确定奖励的属性
  const rewardAttrIndex = (floor - 1) % attrOrder.length
  const rewardAttr = attrOrder[rewardAttrIndex]
  
  // 奖励倍率：每层0.5%
  const rewardRatio = floor * 0.005
  
  return {
    attr: rewardAttr,
    ratio: rewardRatio,
    description: `${getAttributeInfo(rewardAttr).name}提升${(rewardRatio * 100).toFixed(1)}%`
  }
}

/**
 * 导出配置常量（供其他模块使用）
 */
export const BATTLE_CONFIG = {
  BASE_ATTRIBUTES,
  POWER_WEIGHTS,
  BATTLE_SETTINGS
}
