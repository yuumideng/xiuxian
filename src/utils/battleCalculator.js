/**
 * 战斗属性计算器
 * 
 * 核心设计：
 * 公式：result = 基础值 × (1 + 境界系数) × (1 + 加成) × (1 + 轮回加成) × (1 + 战斗倍率)
 * 
 * 参数设定：
 * - 境界系数：Math.floor((level - 1) / 10) + 1（每大境界+1）
 * - 加成：1000（暂时写死，后续设计）
 * - 轮回加成：0（后续设计）
 * - 战斗倍率：0（后续设计）
 * 
 * @author AI Assistant
 * @version 2.0.0
 * @date 2025-10-30
 */

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
 * 境界系数配置
 * 根据大境界返回对应的系数
 * 境界级别只会随着大境界的增加而增加
 * 练气1层=1, 练气10层=1
 * 筑基初期=2, 筑基大圆满=2
 * 金丹初期=3, 金丹大圆满=3
 * 以此类推...
 */
export function getRealmCoefficient(level) {
  // 计算大境界级别：每10个小等级为一个大境界
  // level 1-10 -> 境界级别 1 (练气)
  // level 11-20 -> 境界级别 2 (筑基)
  // level 21-30 -> 境界级别 3 (金丹)
  // ...
  return Math.floor((level - 1) / 10) + 1;
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
 * 根据境界等级计算八大属性
 * 公式：result = 基础值 × (1 + 境界系数) × (1 + 加成) × (1 + 轮回加成) × (1 + 战斗倍率)
 * 
 * @param {Object} player - 玩家对象
 * @param {number} player.level - 境界等级
 * @returns {Object} 八大战斗属性
 */
export function calculateBattleAttributes(player) {
  const level = player.level
  
  // 1. 境界系数
  const realmCoefficient = getRealmCoefficient(level)
  
  // 2. 加成（暂时写死为1000，后续设计）
  const bonus = 1000
  
  // 3. 轮回加成（暂时为0，后续设计）
  const reincarnationBonus = 0
  
  // 4. 战斗倍率（暂时为0，后续设计）
  const battleMultiplier = 0
  
  // 计算总倍率
  const totalMultiplier = (1 + realmCoefficient) * (1 + bonus) * (1 + reincarnationBonus) * (1 + battleMultiplier)
  
  // 计算最终属性（不再使用成长系数，所有属性统一使用相同倍率）
  const finalAttributes = {}
  for (let attr in BASE_ATTRIBUTES) {
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
