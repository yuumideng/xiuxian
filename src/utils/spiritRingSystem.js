/**
 * 仙灵环系统
 * 
 * 仙灵环特性：
 * - 同时作用于8项战斗属性（血量、攻击、防御、速度、暴击、韧性、闪避、命中）
 * - 不影响修炼速度
 * 
 * 成长规则（累加式增长）：
 * - 练气期（大境界1）：500
 * - 筑基期（大境界2）：500 + 1000 = 1500
 * - 金丹期（大境界3）：1500 + 1000×2 = 3500
 * - 元婴期（大境界4）：3500 + 1000×4 = 7500
 * - 化神期（大境界5）：7500 + 1000×8 = 15500
 * - 规律：每次在上一境界基础上增加 1000 × 2^(大境界-2)
 * 
 * @author AI Assistant
 * @version 1.1.0
 * @date 2025-10-30
 */

/**
 * 仙灵环配置
 */
export const SPIRIT_RING_CONFIG = {
  // 基础加成值
  BASE_BONUS: 500,
  
  // 增长基数
  GROWTH_BASE: 1000,
  
  // 仙灵环信息
  INFO: {
    name: '仙灵环',
    description: '同时提升所有战斗属性',
    icon: '💍',
    affectedAttributes: ['hp', 'attack', 'defense', 'speed', 'crit', 'toughness', 'dodge', 'hit']
  }
}

/**
 * 计算仙灵环加成值（累加式增长）
 * 
 * 规律：每次在上一境界基础上增加 1000 × 2^(大境界-2)
 * 
 * 计算方法：
 * - 大境界1：500
 * - 大境界2：500 + 1000×2^0 = 1500
 * - 大境界3：1500 + 1000×2^1 = 3500
 * - 大境界4：3500 + 1000×2^2 = 7500
 * - 大境界5：7500 + 1000×2^3 = 15500
 * 
 * 通用公式：bonus = 500 + 1000 × (2^0 + 2^1 + ... + 2^(n-2))
 *         = 500 + 1000 × (2^(n-1) - 1)  (n >= 2)
 * 
 * @param {number} level - 当前境界等级
 * @returns {number} 仙灵环加成值
 */
export function calculateSpiritRingBonus(level) {
  // 计算大境界级别（每10个小等级为一个大境界）
  const realmLevel = Math.floor((level - 1) / 10) + 1
  
  // 练气期（大境界1）
  if (realmLevel === 1) {
    return SPIRIT_RING_CONFIG.BASE_BONUS
  }
  
  // 大境界 ≥ 2
  // 使用等比数列求和公式：S = a(2^n - 1) / (2 - 1) = a(2^n - 1)
  // 这里 a = 1000, n = realmLevel - 1
  // bonus = 500 + 1000 × (2^(realmLevel-1) - 1)
  const bonus = SPIRIT_RING_CONFIG.BASE_BONUS + 
                SPIRIT_RING_CONFIG.GROWTH_BASE * (Math.pow(2, realmLevel - 1) - 1)
  
  return bonus
}

/**
 * 计算所有战斗属性的仙灵环加成
 * 
 * 仙灵环同时作用于所有8项战斗属性
 * 
 * @param {number} level - 当前境界等级
 * @returns {Object} 各属性的仙灵环加成
 */
export function calculateBattleAttributeBonuses(level) {
  const bonus = calculateSpiritRingBonus(level)
  
  // 返回各战斗属性的加成（所有属性加成相同）
  return {
    hp: bonus,
    attack: bonus,
    defense: bonus,
    speed: bonus,
    crit: bonus,
    toughness: bonus,
    dodge: bonus,
    hit: bonus
  }
}

/**
 * 获取仙灵环详细信息
 * 
 * @param {number} level - 当前境界等级
 * @returns {Object} 仙灵环详细信息
 */
export function getSpiritRingDetails(level) {
  const bonus = calculateSpiritRingBonus(level)
  const realmLevel = Math.floor((level - 1) / 10) + 1
  
  return {
    name: SPIRIT_RING_CONFIG.INFO.name,
    description: SPIRIT_RING_CONFIG.INFO.description,
    icon: SPIRIT_RING_CONFIG.INFO.icon,
    bonus: bonus,
    realmLevel: realmLevel,
    affectedAttributes: SPIRIT_RING_CONFIG.INFO.affectedAttributes
  }
}

/**
 * 获取仙灵环加成的文本描述
 * 
 * @param {number} level - 当前境界等级
 * @returns {string} 加成描述
 */
export function getSpiritRingBonusDescription(level) {
  const bonus = calculateSpiritRingBonus(level)
  const realmLevel = Math.floor((level - 1) / 10) + 1
  
  return `当前大境界：${realmLevel}，仙灵环加成：${bonus}（作用于所有战斗属性）`
}

/**
 * 计算突破后的仙灵环加成变化
 * 
 * @param {number} oldLevel - 旧等级
 * @param {number} newLevel - 新等级
 * @returns {Object} 加成变化信息
 */
export function getSpiritRingUpgradeInfo(oldLevel, newLevel) {
  const oldRealmLevel = Math.floor((oldLevel - 1) / 10) + 1
  const newRealmLevel = Math.floor((newLevel - 1) / 10) + 1
  
  const oldBonus = calculateSpiritRingBonus(oldLevel)
  const newBonus = calculateSpiritRingBonus(newLevel)
  
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
 * 获取仙灵环成长预览
 * 
 * @param {number} maxRealmLevel - 最大大境界级别
 * @returns {Array} 成长预览数组
 */
export function getSpiritRingGrowthPreview(maxRealmLevel = 10) {
  const preview = []
  
  for (let realmLevel = 1; realmLevel <= maxRealmLevel; realmLevel++) {
    const level = (realmLevel - 1) * 10 + 1
    const bonus = calculateSpiritRingBonus(level)
    
    preview.push({
      realmLevel,
      level,
      bonus
    })
  }
  
  return preview
}

/**
 * 导出配置常量（供其他模块使用）
 */
export const SPIRIT_RING_CONSTANTS = {
  BASE_BONUS: SPIRIT_RING_CONFIG.BASE_BONUS,
  GROWTH_BASE: SPIRIT_RING_CONFIG.GROWTH_BASE
}
