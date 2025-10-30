/**
 * 境界初始值配置文件
 * 
 * 说明：
 * - 每个境界的初期（第1级）的修为和战斗经验初始值
 * - 用于生成该境界完整的10级数值
 * - 后续境界请按照相同格式添加
 * 
 * 格式：
 * {
 *   level: 起始等级,
 *   realmName: '境界名称',
 *   cultivation: 修为数值,
 *   combat: 战斗经验数值
 * }
 */

export const REALM_INITIAL_VALUES = [
  // ==================== 凡界 ====================
  {
    level: 1,
    realmName: '练气',
    cultivation: 4191,
    combat: 4191,
    note: '基础境界'
  },
  {
    level: 11,
    realmName: '筑基',
    cultivation: 1321200,
    combat: 1006704,
    note: '真实数据'
  },
  {
    level: 21,
    realmName: '金丹',
    cultivation: 17197299,
    combat: 12877326,
    note: '真实数据'
  },
  {
    level: 31,
    realmName: '元婴',
    cultivation: 140000000,
    combat: 107000000,
    note: '真实数据'
  },
  {
    level: 41,
    realmName: '化神',
    cultivation: 2244000000,
    combat: 1712000000,
    note: '真实数据'
  },
  {
    level: 51,
    realmName: '炼虚',
    cultivation: 31600000000,
    combat: 38200000000,
    note: '真实数据'
  },
  {
    level: 61,
    realmName: '合体',
    cultivation: 299000000000,
    combat: 264000000000,
    note: '真实数据'
  },
  {
    level: 71,
    realmName: '大乘',
    cultivation: 32300000000000,
    combat: 24100000000000,
    note: '真实数据'
  },
  
  // ==================== 灵界 ====================
  {
    level: 81,
    realmName: '灵虚',
    cultivation: 735900000000000,  // 735.9万亿
    combat: 612100000000000,       // 612.1万亿
    note: '真实数据'
  },
  {
    level: 91,
    realmName: '灵魄',
    cultivation: 17103000000000, // 1710.3万亿
    combat: 14531600000000,      // 1453.16万亿
    note: '用户提供的真实数值'
  },
  {
    level: 101,
    realmName: '灵婴',
    cultivation: 105000000000000000, // 1.05亿亿
    combat: 76740300000000,          // 7674.03万亿
    note: '用户提供的真实数值'
  },
  
  // ==================== 待添加境界 ====================
  // 请按照以下格式添加后续境界的初始值：
  
  // {
  //   level: 111,
  //   realmName: '灵神',
  //   cultivation: 0,  // 请填入实际数值
  //   combat: 0,       // 请填入实际数值
  //   note: '待添加'
  // },
  
  // {
  //   level: 121,
  //   realmName: '灵劫',
  //   cultivation: 0,
  //   combat: 0,
  //   note: '待添加'
  // },
  
  // {
  //   level: 131,
  //   realmName: '灵尊',
  //   cultivation: 0,
  //   combat: 0,
  //   note: '待添加'
  // },
  
  // {
  //   level: 141,
  //   realmName: '灵圣',
  //   cultivation: 0,
  //   combat: 0,
  //   note: '待添加'
  // },
  
  // {
  //   level: 151,
  //   realmName: '灵帝',
  //   cultivation: 0,
  //   combat: 0,
  //   note: '待添加'
  // },
  
  // ==================== 仙界 ====================
  // {
  //   level: 161,
  //   realmName: '地仙',
  //   cultivation: 0,
  //   combat: 0,
  //   note: '待添加'
  // },
  
  // ... 继续添加其他境界
];

/**
 * 根据等级获取初始值
 * @param {number} level - 等级
 * @returns {object|null} 初始值配置，如果不存在返回null
 */
export function getInitialValueByLevel(level) {
  return REALM_INITIAL_VALUES.find(item => item.level === level) || null;
}

/**
 * 根据境界名称获取初始值
 * @param {string} realmName - 境界名称
 * @returns {object|null} 初始值配置，如果不存在返回null
 */
export function getInitialValueByRealmName(realmName) {
  return REALM_INITIAL_VALUES.find(item => item.realmName === realmName) || null;
}

/**
 * 获取所有已配置的境界初始值
 * @returns {Array} 所有初始值配置
 */
export function getAllInitialValues() {
  return REALM_INITIAL_VALUES.filter(item => item.cultivation > 0 && item.combat > 0);
}

/**
 * 检查指定等级是否已配置初始值
 * @param {number} level - 等级
 * @returns {boolean} 是否已配置
 */
export function hasInitialValue(level) {
  const config = getInitialValueByLevel(level);
  return config && config.cultivation > 0 && config.combat > 0;
}

/**
 * 获取待配置的境界列表
 * @returns {Array} 待配置的境界
 */
export function getPendingRealms() {
  const allRealms = [];
  // 生成所有境界的起始等级 (1, 11, 21, ..., 711)
  for (let level = 1; level <= 720; level += 10) {
    allRealms.push(level);
  }
  
  const configured = new Set(REALM_INITIAL_VALUES.map(item => item.level));
  return allRealms.filter(level => !configured.has(level) || !hasInitialValue(level));
}
