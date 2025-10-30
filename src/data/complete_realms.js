/**
 * 完整修仙境界体系配置
 * 
 * 境界划分：
 * - 凡界 (1-80级): 练气<筑基<金丹<元婴<化神<炼虚<合体<大乘
 * - 灵界 (81-160级): 灵虚<灵魄<灵婴<灵神<灵劫<灵尊<灵圣<灵帝
 * - 仙界 (161-240级): 地仙<天仙<真仙<玄仙<金仙<太乙<大罗<仙帝
 * - 神界 (241-320级): 神人<神将<神王<神尊<神皇<神帝<圣神<至高神
 * - 混沌界 (321-400级): 混沌真君<混沌圣君<混沌帝君<混沌神君<混沌道君<混沌领主<混沌主宰<混沌至尊
 * - 鸿蒙界 (401-480级): 鸿蒙元尊<鸿蒙天尊<鸿蒙圣尊<鸿蒙帝尊<鸿蒙至尊<鸿蒙道尊<鸿蒙道祖<鸿蒙始祖
 * - 虚无界 (481-560级): 虚无行者<虚无尊者<虚无帝者<虚无仙尊<虚无神尊<虚无圣尊<虚无道主<虚无之祖
 * - 永恒界 (561-640级): 永恒道主<永恒真皇<永恒圣帝<永恒劫尊<永恒天尊<永恒神祖<永恒祖帝<永恒至高
 * - 本源界 (641-720级): 本源初醒<本源凝华<本源化虚<本源通玄<本源归真<本源涅槃<本源无极<本源永恒
 */

export const COMPLETE_REALM_SYSTEM = {
  // 凡界 (1-80级)
  MORTAL: {
    name: '凡界',
    range: [1, 80],
    realms: ['练气', '筑基', '金丹', '元婴', '化神', '炼虚', '合体', '大乘']
  },
  
  // 灵界 (81-160级)
  SPIRIT: {
    name: '灵界',
    range: [81, 160],
    realms: ['灵虚', '灵魄', '灵婴', '灵神', '灵劫', '灵尊', '灵圣', '灵帝']
  },
  
  // 仙界 (161-240级)
  IMMORTAL: {
    name: '仙界',
    range: [161, 240],
    realms: ['地仙', '天仙', '真仙', '玄仙', '金仙', '太乙', '大罗', '仙帝']
  },
  
  // 神界 (241-320级)
  GOD: {
    name: '神界',
    range: [241, 320],
    realms: ['神人', '神将', '神王', '神尊', '神皇', '神帝', '圣神', '至高神']
  },
  
  // 混沌界 (321-400级)
  CHAOS: {
    name: '混沌界',
    range: [321, 400],
    realms: ['混沌真君', '混沌圣君', '混沌帝君', '混沌神君', '混沌道君', '混沌领主', '混沌主宰', '混沌至尊']
  },
  
  // 鸿蒙界 (401-480级)
  HONGMENG: {
    name: '鸿蒙界',
    range: [401, 480],
    realms: ['鸿蒙元尊', '鸿蒙天尊', '鸿蒙圣尊', '鸿蒙帝尊', '鸿蒙至尊', '鸿蒙道尊', '鸿蒙道祖', '鸿蒙始祖']
  },
  
  // 虚无界 (481-560级)
  VOID: {
    name: '虚无界',
    range: [481, 560],
    realms: ['虚无行者', '虚无尊者', '虚无帝者', '虚无仙尊', '虚无神尊', '虚无圣尊', '虚无道主', '虚无之祖']
  },
  
  // 永恒界 (561-640级)
  ETERNAL: {
    name: '永恒界',
    range: [561, 640],
    realms: ['永恒道主', '永恒真皇', '永恒圣帝', '永恒劫尊', '永恒天尊', '永恒神祖', '永恒祖帝', '永恒至高']
  },
  
  // 本源界 (641-720级)
  ORIGIN: {
    name: '本源界',
    range: [641, 720],
    realms: ['本源初醒', '本源凝华', '本源化虚', '本源通玄', '本源归真', '本源涅槃', '本源无极', '本源永恒']
  }
};

/**
 * 根据等级获取境界名称
 * @param {number} level - 等级
 * @returns {string} 境界名称
 */
export function getRealmNameByLevel(level) {
  // 计算是第几个大境界 (每个大境界10级)
  const realmIndex = Math.floor((level - 1) / 10);
  const worldIndex = Math.floor(realmIndex / 8);
  const realmInWorld = realmIndex % 8;
  
  const worlds = Object.values(COMPLETE_REALM_SYSTEM);
  if (worldIndex >= worlds.length) {
    return '未知境界';
  }
  
  const world = worlds[worldIndex];
  if (realmInWorld >= world.realms.length) {
    return '未知境界';
  }
  
  return world.realms[realmInWorld];
}

/**
 * 根据等级获取详细境界信息
 * @param {number} level - 等级
 * @returns {object} 境界详细信息
 */
export function getRealmDetailByLevel(level) {
  const realmName = getRealmNameByLevel(level);
  const levelInRealm = ((level - 1) % 10) + 1;
  
  const stages = [
    '初期', '初期大成', '初期巅峰',
    '中期', '中期大成', '中期巅峰',
    '后期', '后期大成', '后期巅峰',
    '大圆满'
  ];
  
  const stageName = stages[levelInRealm - 1];
  
  return {
    level,
    realmName,
    stageName,
    fullName: `${realmName}${stageName}`,
    worldName: getWorldNameByLevel(level)
  };
}

/**
 * 根据等级获取所属界域
 * @param {number} level - 等级
 * @returns {string} 界域名称
 */
export function getWorldNameByLevel(level) {
  for (const world of Object.values(COMPLETE_REALM_SYSTEM)) {
    if (level >= world.range[0] && level <= world.range[1]) {
      return world.name;
    }
  }
  return '未知界域';
}

/**
 * 获取所有境界列表 (1-720级)
 * @returns {Array} 境界列表
 */
export function getAllRealmsList() {
  const realms = [];
  for (let level = 1; level <= 720; level++) {
    realms.push(getRealmDetailByLevel(level));
  }
  return realms;
}

/**
 * 获取指定界域的所有境界
 * @param {string} worldKey - 界域键名 (如 'MORTAL', 'SPIRIT')
 * @returns {Array} 境界列表
 */
export function getRealmsByWorld(worldKey) {
  const world = COMPLETE_REALM_SYSTEM[worldKey];
  if (!world) return [];
  
  const realms = [];
  for (let level = world.range[0]; level <= world.range[1]; level++) {
    realms.push(getRealmDetailByLevel(level));
  }
  return realms;
}
