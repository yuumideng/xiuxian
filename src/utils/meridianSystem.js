/**
 * 经脉系统
 * 
 * 经脉类型与对应属性：
 * - 督脉 → 血量
 * - 任脉 → 攻击
 * - 冲脉 → 防御
 * - 带脉 → 修为修炼速度
 * - 阳维脉 → 战斗经验修炼速度
 * - 阴维脉 → 灵石获取速度
 * - 阴跷脉 → 灵石获取速度
 * - 阳跷脉 → 功法修炼速度
 * 
 * 成长规则：
 * - 初始加成：每条经脉提供 2000 加成
 * - 每突破一个大境界：加成翻倍（2000 → 4000 → 8000 → ...）
 * 
 * @author AI Assistant
 * @version 1.0.0
 * @date 2025-10-30
 */

/**
 * 经脉配置
 */
export const MERIDIAN_CONFIG = {
  // 初始加成值
  INITIAL_BONUS: 2000,
  
  // 经脉类型定义
  MERIDIAN_TYPES: {
    du: {
      name: '督脉',
      description: '影响血量属性',
      icon: '🔴',
      affectedAttributes: ['hp']
    },
    ren: {
      name: '任脉',
      description: '影响攻击属性',
      icon: '⚔️',
      affectedAttributes: ['attack']
    },
    chong: {
      name: '冲脉',
      description: '影响防御属性',
      icon: '🛡️',
      affectedAttributes: ['defense']
    },
    dai: {
      name: '带脉',
      description: '影响修为修炼速度',
      icon: '📿',
      affectedAttributes: ['expSpeed']
    },
    yangwei: {
      name: '阳维脉',
      description: '影响战斗经验修炼速度',
      icon: '☀️',
      affectedAttributes: ['combatSpeed']
    },
    yinwei: {
      name: '阴维脉',
      description: '影响灵石获取速度',
      icon: '🌙',
      affectedAttributes: ['spiritStoneSpeed']
    },
    yinqiao: {
      name: '阴跷脉',
      description: '影响灵石获取速度',
      icon: '💎',
      affectedAttributes: ['spiritStoneSpeed']
    },
    yangqiao: {
      name: '阳跷脉',
      description: '影响功法修炼速度',
      icon: '✨',
      affectedAttributes: ['techniqueSpeed']
    }
  }
}

/**
 * 计算单条经脉的加成值
 * 
 * 公式：加成 = 初始加成 × 2^(大境界-1)
 * 
 * 示例：
 * - 练气境（大境界1）：2000 × 2^0 = 2000
 * - 筑基境（大境界2）：2000 × 2^1 = 4000
 * - 金丹境（大境界3）：2000 × 2^2 = 8000
 * 
 * @param {number} level - 当前境界等级
 * @returns {number} 经脉加成值
 */
export function calculateMeridianBonus(level) {
  // 计算大境界级别（每10个小等级为一个大境界）
  const realmLevel = Math.floor((level - 1) / 10) + 1
  
  // 计算加成：初始加成 × 2^(大境界-1)
  const bonus = MERIDIAN_CONFIG.INITIAL_BONUS * Math.pow(2, realmLevel - 1)
  
  return bonus
}

/**
 * 计算所有战斗属性的经脉加成
 * 
 * @param {number} level - 当前境界等级
 * @returns {Object} 各属性的经脉加成
 */
export function calculateBattleAttributeBonuses(level) {
  const bonus = calculateMeridianBonus(level)
  
  // 返回各战斗属性的加成
  return {
    hp: bonus,        // 督脉 → 血量
    attack: bonus,    // 任脉 → 攻击
    defense: bonus,   // 冲脉 → 防御
    speed: 0,         // 无经脉影响
    crit: 0,          // 无经脉影响
    toughness: 0,     // 无经脉影响
    dodge: 0,         // 无经脉影响
    hit: 0            // 无经脉影响
  }
}

/**
 * 计算所有修炼速度的经脉加成
 * 
 * @param {number} level - 当前境界等级
 * @returns {Object} 各修炼速度的经脉加成
 */
export function calculateCultivationSpeedBonuses(level) {
  const bonus = calculateMeridianBonus(level)
  
  // 返回各修炼速度的加成
  return {
    expSpeed: bonus,              // 带脉 → 修为修炼速度
    combatSpeed: bonus,           // 阳维脉 → 战斗经验修炼速度
    spiritStoneSpeed: bonus * 2,  // 阴维脉 + 阴跷脉 → 灵石获取速度（两条经脉叠加）
    techniqueSpeed: bonus         // 阳跷脉 → 功法修炼速度
  }
}

/**
 * 获取经脉详细信息
 * 
 * @param {number} level - 当前境界等级
 * @returns {Array} 经脉详细信息数组
 */
export function getMeridianDetails(level) {
  const bonus = calculateMeridianBonus(level)
  const realmLevel = Math.floor((level - 1) / 10) + 1
  
  const details = []
  
  for (let meridianKey in MERIDIAN_CONFIG.MERIDIAN_TYPES) {
    const meridian = MERIDIAN_CONFIG.MERIDIAN_TYPES[meridianKey]
    
    details.push({
      key: meridianKey,
      name: meridian.name,
      description: meridian.description,
      icon: meridian.icon,
      bonus: bonus,
      realmLevel: realmLevel,
      affectedAttributes: meridian.affectedAttributes
    })
  }
  
  return details
}

/**
 * 获取经脉加成的文本描述
 * 
 * @param {number} level - 当前境界等级
 * @returns {string} 加成描述
 */
export function getMeridianBonusDescription(level) {
  const bonus = calculateMeridianBonus(level)
  const realmLevel = Math.floor((level - 1) / 10) + 1
  
  return `当前大境界：${realmLevel}，每条经脉加成：${bonus}`
}

/**
 * 计算突破后的经脉加成变化
 * 
 * @param {number} oldLevel - 旧等级
 * @param {number} newLevel - 新等级
 * @returns {Object} 加成变化信息
 */
export function getMeridianUpgradeInfo(oldLevel, newLevel) {
  const oldRealmLevel = Math.floor((oldLevel - 1) / 10) + 1
  const newRealmLevel = Math.floor((newLevel - 1) / 10) + 1
  
  const oldBonus = calculateMeridianBonus(oldLevel)
  const newBonus = calculateMeridianBonus(newLevel)
  
  return {
    oldRealmLevel,
    newRealmLevel,
    oldBonus,
    newBonus,
    isUpgraded: newRealmLevel > oldRealmLevel,
    bonusIncrease: newBonus - oldBonus
  }
}

/**
 * 导出配置常量（供其他模块使用）
 */
export const MERIDIAN_CONSTANTS = {
  INITIAL_BONUS: MERIDIAN_CONFIG.INITIAL_BONUS,
  MERIDIAN_COUNT: Object.keys(MERIDIAN_CONFIG.MERIDIAN_TYPES).length
}
