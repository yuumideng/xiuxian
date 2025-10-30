/**
 * 战斗属性计算器
 * 
 * 核心设计：
 * 1. 每提升1个小境界，战斗力增长约7.2%
 * 2. 每跨越1个大境界（10级），战斗力累计翻倍
 * 3. 攻击和防御为核心属性，血量次之
 * 
 * @author AI Assistant
 * @version 1.0.0
 * @date 2025-10-30
 */

/**
 * 基础属性配置（练气1层的基础值）
 */
const BASE_ATTRIBUTES = {
  hp: 1000,        // 血量
  attack: 100,     // 攻击
  defense: 100,    // 防御
  speed: 100,      // 速度
  crit: 50,        // 暴击
  toughness: 50,   // 韧性
  dodge: 30,       // 闪避
  hit: 80          // 命中
}

/**
 * 属性成长系数
 * 不同属性有不同的成长速度，增加真实感
 */
const GROWTH_RATES = {
  hp: 1.0,         // 血量标准成长
  attack: 1.0,     // 攻击标准成长
  defense: 1.0,    // 防御标准成长
  speed: 0.95,     // 速度成长稍慢5%
  crit: 0.98,      // 暴击成长稍慢2%
  toughness: 0.98, // 韧性成长稍慢2%
  dodge: 0.92,     // 闪避成长较慢8%
  hit: 0.95        // 命中成长稍慢5%
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
 * 根据境界等级和战斗经验计算八大属性
 * 
 * @param {Object} player - 玩家对象
 * @param {number} player.level - 境界等级
 * @param {number} player.combat - 战斗经验
 * @returns {Object} 八大战斗属性
 */
export function calculateBattleAttributes(player) {
  const level = player.level
  const combat = player.combat
  
  // 境界倍率：每个小境界提升约7.2%，10级翻倍
  // 使用 2^((level-1)/10) 实现精确的指数增长
  const levelMultiplier = Math.pow(2, (level - 1) / 10)
  
  // 战斗经验影响（微调，不超过20%）
  // 使用对数函数，避免战斗经验影响过大
  const combatBonus = Math.min(0.2, Math.log10(combat + 1) / 50)
  const combatMultiplier = 1 + combatBonus
  
  // 综合倍率
  const totalMultiplier = levelMultiplier * combatMultiplier
  
  // 计算最终属性
  const finalAttributes = {}
  for (let attr in BASE_ATTRIBUTES) {
    finalAttributes[attr] = Math.floor(
      BASE_ATTRIBUTES[attr] * totalMultiplier * GROWTH_RATES[attr]
    )
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
  GROWTH_RATES,
  POWER_WEIGHTS
}
