// 修仙境界配置
export const REALMS = {
  // 凡界 (1-8级)
  MORTAL: {
    name: '凡界',
    levels: [
      { level: 1, name: '练气', fullName: '练气期' },
      { level: 2, name: '筑基', fullName: '筑基期' },
      { level: 3, name: '金丹', fullName: '金丹期' },
      { level: 4, name: '元婴', fullName: '元婴期' },
      { level: 5, name: '化神', fullName: '化神期' },
      { level: 6, name: '炼虚', fullName: '炼虚期' },
      { level: 7, name: '合体', fullName: '合体期' },
      { level: 8, name: '大乘', fullName: '大乘期' }
    ]
  },
  
  // 灵界 (9-16级)
  SPIRIT: {
    name: '灵界',
    levels: [
      { level: 9, name: '灵虚', fullName: '灵虚境' },
      { level: 10, name: '灵魄', fullName: '灵魄境' },
      { level: 11, name: '灵婴', fullName: '灵婴境' },
      { level: 12, name: '灵神', fullName: '灵神境' },
      { level: 13, name: '灵劫', fullName: '灵劫境' },
      { level: 14, name: '灵尊', fullName: '灵尊境' },
      { level: 15, name: '灵圣', fullName: '灵圣境' },
      { level: 16, name: '灵帝', fullName: '灵帝境' }
    ]
  },
  
  // 仙界 (17-24级)
  IMMORTAL: {
    name: '仙界',
    levels: [
      { level: 17, name: '地仙', fullName: '地仙境' },
      { level: 18, name: '天仙', fullName: '天仙境' },
      { level: 19, name: '真仙', fullName: '真仙境' },
      { level: 20, name: '玄仙', fullName: '玄仙境' },
      { level: 21, name: '金仙', fullName: '金仙境' },
      { level: 22, name: '太乙', fullName: '太乙金仙' },
      { level: 23, name: '大罗', fullName: '大罗金仙' },
      { level: 24, name: '仙帝', fullName: '仙帝境' }
    ]
  },
  
  // 神界 (25-32级)
  DIVINE: {
    name: '神界',
    levels: [
      { level: 25, name: '神人', fullName: '神人境' },
      { level: 26, name: '神将', fullName: '神将境' },
      { level: 27, name: '神王', fullName: '神王境' },
      { level: 28, name: '神尊', fullName: '神尊境' },
      { level: 29, name: '神皇', fullName: '神皇境' },
      { level: 30, name: '神帝', fullName: '神帝境' },
      { level: 31, name: '圣神', fullName: '圣神境' },
      { level: 32, name: '至高神', fullName: '至高神境' }
    ]
  },
  
  // 混沌界 (33-40级)
  CHAOS: {
    name: '混沌界',
    levels: [
      { level: 33, name: '混沌真君', fullName: '混沌真君' },
      { level: 34, name: '混沌圣君', fullName: '混沌圣君' },
      { level: 35, name: '混沌帝君', fullName: '混沌帝君' },
      { level: 36, name: '混沌神君', fullName: '混沌神君' },
      { level: 37, name: '混沌道君', fullName: '混沌道君' },
      { level: 38, name: '混沌领主', fullName: '混沌领主' },
      { level: 39, name: '混沌主宰', fullName: '混沌主宰' },
      { level: 40, name: '混沌至尊', fullName: '混沌至尊' }
    ]
  },
  
  // 鸿蒙界 (41-48级)
  PRIMORDIAL: {
    name: '鸿蒙界',
    levels: [
      { level: 41, name: '鸿蒙元尊', fullName: '鸿蒙元尊' },
      { level: 42, name: '鸿蒙天尊', fullName: '鸿蒙天尊' },
      { level: 43, name: '鸿蒙圣尊', fullName: '鸿蒙圣尊' },
      { level: 44, name: '鸿蒙帝尊', fullName: '鸿蒙帝尊' },
      { level: 45, name: '鸿蒙至尊', fullName: '鸿蒙至尊' },
      { level: 46, name: '鸿蒙道尊', fullName: '鸿蒙道尊' },
      { level: 47, name: '鸿蒙道祖', fullName: '鸿蒙道祖' },
      { level: 48, name: '鸿蒙始祖', fullName: '鸿蒙始祖' }
    ]
  },
  
  // 虚无界 (49-56级)
  VOID: {
    name: '虚无界',
    levels: [
      { level: 49, name: '虚无行者', fullName: '虚无行者' },
      { level: 50, name: '虚无尊者', fullName: '虚无尊者' },
      { level: 51, name: '虚无帝者', fullName: '虚无帝者' },
      { level: 52, name: '虚无仙尊', fullName: '虚无仙尊' },
      { level: 53, name: '虚无神尊', fullName: '虚无神尊' },
      { level: 54, name: '虚无圣尊', fullName: '虚无圣尊' },
      { level: 55, name: '虚无道主', fullName: '虚无道主' },
      { level: 56, name: '虚无之祖', fullName: '虚无之祖' }
    ]
  },
  
  // 永恒界 (57-64级)
  ETERNAL: {
    name: '永恒界',
    levels: [
      { level: 57, name: '永恒道主', fullName: '永恒道主' },
      { level: 58, name: '永恒真皇', fullName: '永恒真皇' },
      { level: 59, name: '永恒圣帝', fullName: '永恒圣帝' },
      { level: 60, name: '永恒劫尊', fullName: '永恒劫尊' },
      { level: 61, name: '永恒天尊', fullName: '永恒天尊' },
      { level: 62, name: '永恒神祖', fullName: '永恒神祖' },
      { level: 63, name: '永恒祖帝', fullName: '永恒祖帝' },
      { level: 64, name: '永恒至高', fullName: '永恒至高' }
    ]
  },
  
  // 本源界 (65-72级)
  ORIGIN: {
    name: '本源界',
    levels: [
      { level: 65, name: '本源初醒', fullName: '本源初醒' },
      { level: 66, name: '本源凝华', fullName: '本源凝华' },
      { level: 67, name: '本源化虚', fullName: '本源化虚' },
      { level: 68, name: '本源通玄', fullName: '本源通玄' },
      { level: 69, name: '本源归真', fullName: '本源归真' },
      { level: 70, name: '本源涅槃', fullName: '本源涅槃' },
      { level: 71, name: '本源无极', fullName: '本源无极' },
      { level: 72, name: '本源永恒', fullName: '本源永恒' }
    ]
  }
}

// 获取所有境界的扁平化数组
export const getAllRealms = () => {
  const allRealms = []
  Object.values(REALMS).forEach(realm => {
    allRealms.push(...realm.levels)
  })
  return allRealms
}

// 根据等级获取境界信息
export const getRealmByLevel = (level) => {
  const allRealms = getAllRealms()
  return allRealms.find(realm => realm.level === level)
}

// 根据等级获取所属界域
export const getWorldByLevel = (level) => {
  for (const [key, realm] of Object.entries(REALMS)) {
    if (realm.levels.some(l => l.level === level)) {
      return realm.name
    }
  }
  return '未知'
}

// 境界升级所需修为和战斗经验配置
export const getRealmRequirements = (level) => {
  // 基础需求,随等级指数增长
  const baseExp = 1000
  const baseCombat = 500
  
  const expRequired = Math.floor(baseExp * Math.pow(1.5, level - 1))
  const combatRequired = Math.floor(baseCombat * Math.pow(1.4, level - 1))
  
  return {
    exp: expRequired,
    combat: combatRequired
  }
}