/**
 * 天赋系统
 * 
 * 天赋类型与对应属性：
 * - 气感 → 血量
 * - 神识 → 攻击
 * - 根骨 → 防御
 * - 悟性 → 修为修炼速度 + 功法修炼速度
 * - 机缘 → 战斗经验修炼速度 + 灵石获取速度
 * 
 * 成长规则：
 * - 初始值：每种天赋 40 点
 * - 初始加成：每种天赋提供 1000 加成
 * - 每突破一个大境界：天赋点数 +40，加成翻倍
 * 
 * @author AI Assistant
 * @version 1.0.0
 * @date 2025-10-30
 */

/**
 * 天赋配置
 */
export const TALENT_CONFIG = {
  // 初始天赋点数
  INITIAL_TALENT_POINTS: 40,
  
  // 初始加成值
  INITIAL_BONUS: 1000,
  
  // 每个大境界增加的天赋点数
  TALENT_POINTS_PER_REALM: 40,
  
  // 天赋类型定义
  TALENT_TYPES: {
    qigan: {
      name: '气感',
      description: '影响血量属性',
      icon: '💨',
      affectedAttributes: ['hp']
    },
    shishi: {
      name: '神识',
      description: '影响攻击属性',
      icon: '🧠',
      affectedAttributes: ['attack']
    },
    gengu: {
      name: '根骨',
      description: '影响防御属性',
      icon: '🦴',
      affectedAttributes: ['defense']
    },
    wuxing: {
      name: '悟性',
      description: '影响修为修炼速度和功法修炼速度',
      icon: '💡',
      affectedAttributes: ['expSpeed', 'skillSpeed']
    },
    jiyuan: {
      name: '机缘',
      description: '影响战斗经验修炼速度和灵石获取速度',
      icon: '🍀',
      affectedAttributes: ['combatSpeed', 'spiritStoneSpeed']
    }
  }
}

/**
 * 计算境界系数（用于天赋成长）
 * 练气=0, 筑基=1, 金丹=2, 元婴=3...
 * 
 * @param {number} level - 玩家等级
 * @returns {number} 境界系数
 */
export function getRealmIndex(level) {
  return Math.floor((level - 1) / 10)
}

/**
 * 根据境界等级计算天赋点数
 * 
 * @param {number} level - 玩家等级
 * @param {number} initialPoints - 初始天赋点数（默认40）
 * @returns {number} 当前境界应有的天赋点数
 */
export function calculateTalentPoints(level, initialPoints = TALENT_CONFIG.INITIAL_TALENT_POINTS) {
  const realmIndex = getRealmIndex(level)
  return initialPoints + (realmIndex * TALENT_CONFIG.TALENT_POINTS_PER_REALM)
}

/**
 * 根据境界等级计算天赋加成倍率
 * 练气=1000, 筑基=2000, 金丹=4000, 元婴=8000...
 * 
 * @param {number} level - 玩家等级
 * @returns {number} 天赋加成倍率
 */
export function calculateTalentBonusMultiplier(level) {
  const realmIndex = getRealmIndex(level)
  return TALENT_CONFIG.INITIAL_BONUS * Math.pow(2, realmIndex)
}

/**
 * 计算单个天赋对属性的加成
 * 
 * @param {number} talentPoints - 天赋点数
 * @param {number} level - 玩家等级
 * @returns {number} 该天赋提供的加成值
 */
export function calculateSingleTalentBonus(talentPoints, level) {
  const bonusMultiplier = calculateTalentBonusMultiplier(level)
  // 天赋点数 / 初始点数 * 加成倍率
  return (talentPoints / TALENT_CONFIG.INITIAL_TALENT_POINTS) * bonusMultiplier
}

/**
 * 计算所有天赋对战斗属性的总加成
 * 
 * @param {Object} talents - 天赋对象
 * @param {number} talents.qigan - 气感
 * @param {number} talents.shishi - 神识
 * @param {number} talents.gengu - 根骨
 * @param {number} talents.wuxing - 悟性
 * @param {number} talents.jiyuan - 机缘
 * @param {number} level - 玩家等级
 * @returns {Object} 各属性的天赋加成
 */
export function calculateTalentBonuses(talents, level) {
  return {
    // 气感 → 血量
    hp: calculateSingleTalentBonus(talents.qigan, level),
    
    // 神识 → 攻击
    attack: calculateSingleTalentBonus(talents.shishi, level),
    
    // 根骨 → 防御
    defense: calculateSingleTalentBonus(talents.gengu, level),
    
    // 悟性 → 修为修炼速度 + 功法修炼速度
    expSpeed: calculateSingleTalentBonus(talents.wuxing, level),
    skillSpeed: calculateSingleTalentBonus(talents.wuxing, level),
    
    // 机缘 → 战斗经验修炼速度 + 灵石获取速度
    combatSpeed: calculateSingleTalentBonus(talents.jiyuan, level),
    spiritStoneSpeed: calculateSingleTalentBonus(talents.jiyuan, level)
  }
}

/**
 * 计算战斗属性的总加成（用于战斗属性计算公式）
 * 
 * @param {Object} talents - 天赋对象
 * @param {number} level - 玩家等级
 * @returns {Object} 战斗属性的加成值
 */
export function calculateBattleAttributeBonuses(talents, level) {
  const bonuses = calculateTalentBonuses(talents, level)
  
  return {
    hp: bonuses.hp,
    attack: bonuses.attack,
    defense: bonuses.defense,
    // 速度、暴击、韧性、闪避、命中暂时没有对应的天赋，使用默认值0
    speed: 0,
    crit: 0,
    toughness: 0,
    dodge: 0,
    hit: 0
  }
}

/**
 * 初始化玩家天赋（用于新游戏或重置）
 * 
 * @param {number} level - 玩家等级
 * @returns {Object} 初始化的天赋对象
 */
export function initializeTalents(level = 1) {
  const talentPoints = calculateTalentPoints(level)
  
  return {
    qigan: talentPoints,
    shishi: talentPoints,
    gengu: talentPoints,
    wuxing: talentPoints,
    jiyuan: talentPoints
  }
}

/**
 * 升级天赋（突破大境界时调用）
 * 
 * @param {Object} talents - 当前天赋对象
 * @param {number} oldLevel - 旧等级
 * @param {number} newLevel - 新等级
 * @returns {Object} 升级后的天赋对象
 */
export function upgradeTalentsOnBreakthrough(talents, oldLevel, newLevel) {
  const oldRealmIndex = getRealmIndex(oldLevel)
  const newRealmIndex = getRealmIndex(newLevel)
  
  // 如果跨越了大境界
  if (newRealmIndex > oldRealmIndex) {
    const realmDiff = newRealmIndex - oldRealmIndex
    const pointsIncrease = realmDiff * TALENT_CONFIG.TALENT_POINTS_PER_REALM
    
    return {
      qigan: talents.qigan + pointsIncrease,
      shishi: talents.shishi + pointsIncrease,
      gengu: talents.gengu + pointsIncrease,
      wuxing: talents.wuxing + pointsIncrease,
      jiyuan: talents.jiyuan + pointsIncrease
    }
  }
  
  // 没有跨越大境界，天赋不变
  return talents
}

/**
 * 获取天赋详细信息
 * 
 * @param {Object} talents - 天赋对象
 * @param {number} level - 玩家等级
 * @returns {Object} 天赋详细信息
 */
export function getTalentDetails(talents, level) {
  const bonusMultiplier = calculateTalentBonusMultiplier(level)
  const realmIndex = getRealmIndex(level)
  const expectedPoints = calculateTalentPoints(level)
  
  const details = {}
  
  for (let talentKey in talents) {
    const talentConfig = TALENT_CONFIG.TALENT_TYPES[talentKey]
    const talentPoints = talents[talentKey]
    const bonus = calculateSingleTalentBonus(talentPoints, level)
    
    details[talentKey] = {
      name: talentConfig.name,
      description: talentConfig.description,
      icon: talentConfig.icon,
      points: talentPoints,
      expectedPoints: expectedPoints,
      bonus: bonus,
      bonusMultiplier: bonusMultiplier,
      affectedAttributes: talentConfig.affectedAttributes
    }
  }
  
  return {
    talents: details,
    realmIndex: realmIndex,
    bonusMultiplier: bonusMultiplier,
    totalTalentPoints: Object.values(talents).reduce((sum, val) => sum + val, 0)
  }
}

/**
 * 验证天赋数据是否需要更新（用于存档加载时）
 * 
 * @param {Object} talents - 天赋对象
 * @param {number} level - 玩家等级
 * @returns {boolean} 是否需要更新
 */
export function needsTalentUpdate(talents, level) {
  const expectedPoints = calculateTalentPoints(level)
  
  // 检查任意一个天赋是否与预期不符
  for (let talentKey in talents) {
    if (talents[talentKey] !== expectedPoints) {
      return true
    }
  }
  
  return false
}

/**
 * 修正天赋数据（用于存档加载时）
 * 
 * @param {Object} talents - 天赋对象
 * @param {number} level - 玩家等级
 * @returns {Object} 修正后的天赋对象
 */
export function fixTalents(talents, level) {
  const expectedPoints = calculateTalentPoints(level)
  
  return {
    qigan: expectedPoints,
    shishi: expectedPoints,
    gengu: expectedPoints,
    wuxing: expectedPoints,
    jiyuan: expectedPoints
  }
}
