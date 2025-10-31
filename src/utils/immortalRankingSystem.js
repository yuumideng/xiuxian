/**
 * 仙战榜系统
 * 
 * 仙战榜特性：
 * - 每个大境界提供一次随机加成
 * - 加成随机分配到7种属性之一
 * - 可以重复分配到同一属性
 * 
 * 成长规则：
 * - 练气期（大境界1）：2000，随机分配
 * - 筑基期（大境界2）：4000，随机分配
 * - 金丹期（大境界3）：8000，随机分配
 * - 元婴期（大境界4）：16000，随机分配
 * - 公式：2000 × 2^(大境界-1)
 * 
 * 影响属性：
 * - 战斗属性：血量、攻击、防御
 * - 修炼速度：修为修炼速度、战斗经验修炼速度、灵石获取速度、功法修炼速度
 * 
 * @author AI Assistant
 * @version 1.0.0
 * @date 2025-10-30
 */

/**
 * 仙战榜配置
 */
export const IMMORTAL_RANKING_CONFIG = {
  // 基础加成值
  BASE_BONUS: 2000,
  
  // 可随机的属性列表
  RANDOM_ATTRIBUTES: [
    'hp',              // 血量
    'attack',          // 攻击
    'defense',         // 防御
    'expSpeed',        // 修为修炼速度
    'combatSpeed',     // 战斗经验修炼速度
    'spiritStoneSpeed', // 灵石获取速度
    'techniqueSpeed'   // 功法修炼速度
  ],
  
  // 属性名称映射
  ATTRIBUTE_NAMES: {
    hp: '血量',
    attack: '攻击',
    defense: '防御',
    expSpeed: '修为修炼速度',
    combatSpeed: '战斗经验修炼速度',
    spiritStoneSpeed: '灵石获取速度',
    techniqueSpeed: '功法修炼速度'
  },
  
  // 仙战榜信息
  INFO: {
    name: '仙战榜',
    description: '每个大境界随机提升一项属性',
    icon: '🏆'
  }
}

/**
 * 计算单个大境界的仙战榜加成值
 * 
 * 公式：2000 × 2^(大境界-1)
 * 
 * @param {number} realmLevel - 大境界级别
 * @returns {number} 该大境界的加成值
 */
export function calculateRealmBonus(realmLevel) {
  return IMMORTAL_RANKING_CONFIG.BASE_BONUS * Math.pow(2, realmLevel - 1)
}

/**
 * 随机选择一个属性
 * 
 * @returns {string} 随机选中的属性名
 */
export function randomAttribute() {
  const attributes = IMMORTAL_RANKING_CONFIG.RANDOM_ATTRIBUTES
  const randomIndex = Math.floor(Math.random() * attributes.length)
  return attributes[randomIndex]
}

/**
 * 初始化仙战榜数据
 * 为每个大境界随机分配属性
 * 
 * @param {number} currentRealmLevel - 当前大境界级别
 * @returns {Object} 仙战榜数据
 */
export function initializeImmortalRanking(currentRealmLevel = 1) {
  const rankings = {}
  
  for (let realmLevel = 1; realmLevel <= currentRealmLevel; realmLevel++) {
    const bonus = calculateRealmBonus(realmLevel)
    const attribute = randomAttribute()
    
    rankings[realmLevel] = {
      bonus,
      attribute,
      realmLevel
    }
  }
  
  return rankings
}

/**
 * 添加新的大境界加成
 * 当玩家突破到新的大境界时调用
 * 
 * @param {Object} currentRankings - 当前仙战榜数据
 * @param {number} newRealmLevel - 新的大境界级别
 * @returns {Object} 更新后的仙战榜数据
 */
export function addRealmBonus(currentRankings, newRealmLevel) {
  const bonus = calculateRealmBonus(newRealmLevel)
  const attribute = randomAttribute()
  
  return {
    ...currentRankings,
    [newRealmLevel]: {
      bonus,
      attribute,
      realmLevel: newRealmLevel
    }
  }
}

/**
 * 计算所有战斗属性的仙战榜总加成
 * 
 * @param {Object} rankings - 仙战榜数据
 * @returns {Object} 各战斗属性的总加成
 */
export function calculateBattleAttributeBonuses(rankings) {
  const bonuses = {
    hp: 0,
    attack: 0,
    defense: 0,
    speed: 0,
    crit: 0,
    toughness: 0,
    dodge: 0,
    hit: 0
  }
  
  // 遍历所有大境界的加成
  for (let realmLevel in rankings) {
    const ranking = rankings[realmLevel]
    const { bonus, attribute } = ranking
    
    // 只累加战斗属性
    if (bonuses.hasOwnProperty(attribute)) {
      bonuses[attribute] += bonus
    }
  }
  
  return bonuses
}

/**
 * 计算所有修炼速度的仙战榜总加成
 * 
 * @param {Object} rankings - 仙战榜数据
 * @returns {Object} 各修炼速度的总加成
 */
export function calculateCultivationSpeedBonuses(rankings) {
  const bonuses = {
    expSpeed: 0,
    combatSpeed: 0,
    spiritStoneSpeed: 0,
    techniqueSpeed: 0
  }
  
  // 遍历所有大境界的加成
  for (let realmLevel in rankings) {
    const ranking = rankings[realmLevel]
    const { bonus, attribute } = ranking
    
    // 只累加修炼速度
    if (bonuses.hasOwnProperty(attribute)) {
      bonuses[attribute] += bonus
    }
  }
  
  return bonuses
}

/**
 * 获取仙战榜详细信息
 * 
 * @param {Object} rankings - 仙战榜数据
 * @returns {Object} 仙战榜详细信息
 */
export function getImmortalRankingDetails(rankings) {
  const details = {
    name: IMMORTAL_RANKING_CONFIG.INFO.name,
    description: IMMORTAL_RANKING_CONFIG.INFO.description,
    icon: IMMORTAL_RANKING_CONFIG.INFO.icon,
    realmBonuses: [],
    totalBonuses: {
      battle: calculateBattleAttributeBonuses(rankings),
      cultivation: calculateCultivationSpeedBonuses(rankings)
    }
  }
  
  // 按大境界级别排序
  const sortedRealmLevels = Object.keys(rankings).map(Number).sort((a, b) => a - b)
  
  for (let realmLevel of sortedRealmLevels) {
    const ranking = rankings[realmLevel]
    details.realmBonuses.push({
      realmLevel: ranking.realmLevel,
      bonus: ranking.bonus,
      attribute: ranking.attribute,
      attributeName: IMMORTAL_RANKING_CONFIG.ATTRIBUTE_NAMES[ranking.attribute]
    })
  }
  
  return details
}

/**
 * 获取仙战榜加成的文本描述
 * 
 * @param {Object} rankings - 仙战榜数据
 * @returns {string} 加成描述
 */
export function getImmortalRankingBonusDescription(rankings) {
  const details = getImmortalRankingDetails(rankings)
  const lines = []
  
  lines.push(`${details.icon} ${details.name}`)
  lines.push('各大境界加成：')
  
  for (let realmBonus of details.realmBonuses) {
    lines.push(`  大境界${realmBonus.realmLevel}：+${realmBonus.bonus} ${realmBonus.attributeName}`)
  }
  
  return lines.join('\n')
}

/**
 * 获取仙战榜总加成统计
 * 
 * @param {Object} rankings - 仙战榜数据
 * @returns {Object} 总加成统计
 */
export function getImmortalRankingStatistics(rankings) {
  const battleBonuses = calculateBattleAttributeBonuses(rankings)
  const cultivationBonuses = calculateCultivationSpeedBonuses(rankings)
  
  const statistics = {
    totalRealmCount: Object.keys(rankings).length,
    totalBonus: 0,
    battleAttributes: {},
    cultivationSpeeds: {}
  }
  
  // 统计战斗属性
  for (let attr in battleBonuses) {
    if (battleBonuses[attr] > 0) {
      statistics.battleAttributes[attr] = {
        bonus: battleBonuses[attr],
        name: IMMORTAL_RANKING_CONFIG.ATTRIBUTE_NAMES[attr] || attr
      }
      statistics.totalBonus += battleBonuses[attr]
    }
  }
  
  // 统计修炼速度
  for (let attr in cultivationBonuses) {
    if (cultivationBonuses[attr] > 0) {
      statistics.cultivationSpeeds[attr] = {
        bonus: cultivationBonuses[attr],
        name: IMMORTAL_RANKING_CONFIG.ATTRIBUTE_NAMES[attr] || attr
      }
      statistics.totalBonus += cultivationBonuses[attr]
    }
  }
  
  return statistics
}

/**
 * 重置仙战榜（用于重生等场景）
 * 
 * @param {number} targetRealmLevel - 目标大境界级别
 * @returns {Object} 新的仙战榜数据
 */
export function resetImmortalRanking(targetRealmLevel = 1) {
  return initializeImmortalRanking(targetRealmLevel)
}

/**
 * 导出配置常量（供其他模块使用）
 */
export const IMMORTAL_RANKING_CONSTANTS = {
  BASE_BONUS: IMMORTAL_RANKING_CONFIG.BASE_BONUS,
  RANDOM_ATTRIBUTES: IMMORTAL_RANKING_CONFIG.RANDOM_ATTRIBUTES
}
