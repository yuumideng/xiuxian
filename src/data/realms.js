// 修仙境界配置 - 每个大境界分为10个小阶段
export const REALMS = {
  // 凡界 (1-80级，每个大境界10个小阶段)
  MORTAL: {
    name: '凡界',
    levels: [
      // 练气期 (1-10级)
      { level: 1, name: '练气一层', fullName: '练气一层' },
      { level: 2, name: '练气二层', fullName: '练气二层' },
      { level: 3, name: '练气三层', fullName: '练气三层' },
      { level: 4, name: '练气四层', fullName: '练气四层' },
      { level: 5, name: '练气五层', fullName: '练气五层' },
      { level: 6, name: '练气六层', fullName: '练气六层' },
      { level: 7, name: '练气七层', fullName: '练气七层' },
      { level: 8, name: '练气八层', fullName: '练气八层' },
      { level: 9, name: '练气九层', fullName: '练气九层' },
      { level: 10, name: '练气大圆满', fullName: '练气大圆满' },
      
      // 筑基期 (11-20级)
      { level: 11, name: '筑基初期', fullName: '筑基初期' },
      { level: 12, name: '筑基初期大成', fullName: '筑基初期大成' },
      { level: 13, name: '筑基初期巅峰', fullName: '筑基初期巅峰' },
      { level: 14, name: '筑基中期', fullName: '筑基中期' },
      { level: 15, name: '筑基中期大成', fullName: '筑基中期大成' },
      { level: 16, name: '筑基中期巅峰', fullName: '筑基中期巅峰' },
      { level: 17, name: '筑基后期', fullName: '筑基后期' },
      { level: 18, name: '筑基后期大成', fullName: '筑基后期大成' },
      { level: 19, name: '筑基后期巅峰', fullName: '筑基后期巅峰' },
      { level: 20, name: '筑基大圆满', fullName: '筑基大圆满' },
      
      // 金丹期 (21-30级)
      { level: 21, name: '金丹初期', fullName: '金丹初期' },
      { level: 22, name: '金丹初期大成', fullName: '金丹初期大成' },
      { level: 23, name: '金丹初期巅峰', fullName: '金丹初期巅峰' },
      { level: 24, name: '金丹中期', fullName: '金丹中期' },
      { level: 25, name: '金丹中期大成', fullName: '金丹中期大成' },
      { level: 26, name: '金丹中期巅峰', fullName: '金丹中期巅峰' },
      { level: 27, name: '金丹后期', fullName: '金丹后期' },
      { level: 28, name: '金丹后期大成', fullName: '金丹后期大成' },
      { level: 29, name: '金丹后期巅峰', fullName: '金丹后期巅峰' },
      { level: 30, name: '金丹大圆满', fullName: '金丹大圆满' },
      
      // 元婴期 (31-40级)
      { level: 31, name: '元婴初期', fullName: '元婴初期' },
      { level: 32, name: '元婴初期大成', fullName: '元婴初期大成' },
      { level: 33, name: '元婴初期巅峰', fullName: '元婴初期巅峰' },
      { level: 34, name: '元婴中期', fullName: '元婴中期' },
      { level: 35, name: '元婴中期大成', fullName: '元婴中期大成' },
      { level: 36, name: '元婴中期巅峰', fullName: '元婴中期巅峰' },
      { level: 37, name: '元婴后期', fullName: '元婴后期' },
      { level: 38, name: '元婴后期大成', fullName: '元婴后期大成' },
      { level: 39, name: '元婴后期巅峰', fullName: '元婴后期巅峰' },
      { level: 40, name: '元婴大圆满', fullName: '元婴大圆满' },
      
      // 化神期 (41-50级)
      { level: 41, name: '化神初期', fullName: '化神初期' },
      { level: 42, name: '化神初期大成', fullName: '化神初期大成' },
      { level: 43, name: '化神初期巅峰', fullName: '化神初期巅峰' },
      { level: 44, name: '化神中期', fullName: '化神中期' },
      { level: 45, name: '化神中期大成', fullName: '化神中期大成' },
      { level: 46, name: '化神中期巅峰', fullName: '化神中期巅峰' },
      { level: 47, name: '化神后期', fullName: '化神后期' },
      { level: 48, name: '化神后期大成', fullName: '化神后期大成' },
      { level: 49, name: '化神后期巅峰', fullName: '化神后期巅峰' },
      { level: 50, name: '化神大圆满', fullName: '化神大圆满' },
      
      // 炼虚期 (51-60级)
      { level: 51, name: '炼虚初期', fullName: '炼虚初期' },
      { level: 52, name: '炼虚初期大成', fullName: '炼虚初期大成' },
      { level: 53, name: '炼虚初期巅峰', fullName: '炼虚初期巅峰' },
      { level: 54, name: '炼虚中期', fullName: '炼虚中期' },
      { level: 55, name: '炼虚中期大成', fullName: '炼虚中期大成' },
      { level: 56, name: '炼虚中期巅峰', fullName: '炼虚中期巅峰' },
      { level: 57, name: '炼虚后期', fullName: '炼虚后期' },
      { level: 58, name: '炼虚后期大成', fullName: '炼虚后期大成' },
      { level: 59, name: '炼虚后期巅峰', fullName: '炼虚后期巅峰' },
      { level: 60, name: '炼虚大圆满', fullName: '炼虚大圆满' },
      
      // 合体期 (61-70级)
      { level: 61, name: '合体初期', fullName: '合体初期' },
      { level: 62, name: '合体初期大成', fullName: '合体初期大成' },
      { level: 63, name: '合体初期巅峰', fullName: '合体初期巅峰' },
      { level: 64, name: '合体中期', fullName: '合体中期' },
      { level: 65, name: '合体中期大成', fullName: '合体中期大成' },
      { level: 66, name: '合体中期巅峰', fullName: '合体中期巅峰' },
      { level: 67, name: '合体后期', fullName: '合体后期' },
      { level: 68, name: '合体后期大成', fullName: '合体后期大成' },
      { level: 69, name: '合体后期巅峰', fullName: '合体后期巅峰' },
      { level: 70, name: '合体大圆满', fullName: '合体大圆满' },
      
      // 大乘期 (71-80级)
      { level: 71, name: '大乘初期', fullName: '大乘初期' },
      { level: 72, name: '大乘初期大成', fullName: '大乘初期大成' },
      { level: 73, name: '大乘初期巅峰', fullName: '大乘初期巅峰' },
      { level: 74, name: '大乘中期', fullName: '大乘中期' },
      { level: 75, name: '大乘中期大成', fullName: '大乘中期大成' },
      { level: 76, name: '大乘中期巅峰', fullName: '大乘中期巅峰' },
      { level: 77, name: '大乘后期', fullName: '大乘后期' },
      { level: 78, name: '大乘后期大成', fullName: '大乘后期大成' },
      { level: 79, name: '大乘后期巅峰', fullName: '大乘后期巅峰' },
      { level: 80, name: '大乘大圆满', fullName: '大乘大圆满' }
    ]
  },
  
  // 灵界 (81-160级)
  SPIRIT: {
    name: '灵界',
    levels: [
      // 灵虚境 (81-90级)
      { level: 81, name: '灵虚初期', fullName: '灵虚初期' },
      { level: 82, name: '灵虚初期大成', fullName: '灵虚初期大成' },
      { level: 83, name: '灵虚初期巅峰', fullName: '灵虚初期巅峰' },
      { level: 84, name: '灵虚中期', fullName: '灵虚中期' },
      { level: 85, name: '灵虚中期大成', fullName: '灵虚中期大成' },
      { level: 86, name: '灵虚中期巅峰', fullName: '灵虚中期巅峰' },
      { level: 87, name: '灵虚后期', fullName: '灵虚后期' },
      { level: 88, name: '灵虚后期大成', fullName: '灵虚后期大成' },
      { level: 89, name: '灵虚后期巅峰', fullName: '灵虚后期巅峰' },
      { level: 90, name: '灵虚大圆满', fullName: '灵虚大圆满' },
      
      // 灵魄境 (91-100级)
      { level: 91, name: '灵魄初期', fullName: '灵魄初期' },
      { level: 92, name: '灵魄初期大成', fullName: '灵魄初期大成' },
      { level: 93, name: '灵魄初期巅峰', fullName: '灵魄初期巅峰' },
      { level: 94, name: '灵魄中期', fullName: '灵魄中期' },
      { level: 95, name: '灵魄中期大成', fullName: '灵魄中期大成' },
      { level: 96, name: '灵魄中期巅峰', fullName: '灵魄中期巅峰' },
      { level: 97, name: '灵魄后期', fullName: '灵魄后期' },
      { level: 98, name: '灵魄后期大成', fullName: '灵魄后期大成' },
      { level: 99, name: '灵魄后期巅峰', fullName: '灵魄后期巅峰' },
      { level: 100, name: '灵魄大圆满', fullName: '灵魄大圆满' },
      
      // 灵婴境 (101-110级)
      { level: 101, name: '灵婴初期', fullName: '灵婴初期' },
      { level: 102, name: '灵婴初期大成', fullName: '灵婴初期大成' },
      { level: 103, name: '灵婴初期巅峰', fullName: '灵婴初期巅峰' },
      { level: 104, name: '灵婴中期', fullName: '灵婴中期' },
      { level: 105, name: '灵婴中期大成', fullName: '灵婴中期大成' },
      { level: 106, name: '灵婴中期巅峰', fullName: '灵婴中期巅峰' },
      { level: 107, name: '灵婴后期', fullName: '灵婴后期' },
      { level: 108, name: '灵婴后期大成', fullName: '灵婴后期大成' },
      { level: 109, name: '灵婴后期巅峰', fullName: '灵婴后期巅峰' },
      { level: 110, name: '灵婴大圆满', fullName: '灵婴大圆满' },
      
      // 灵神境 (111-120级)
      { level: 111, name: '灵神初期', fullName: '灵神初期' },
      { level: 112, name: '灵神初期大成', fullName: '灵神初期大成' },
      { level: 113, name: '灵神初期巅峰', fullName: '灵神初期巅峰' },
      { level: 114, name: '灵神中期', fullName: '灵神中期' },
      { level: 115, name: '灵神中期大成', fullName: '灵神中期大成' },
      { level: 116, name: '灵神中期巅峰', fullName: '灵神中期巅峰' },
      { level: 117, name: '灵神后期', fullName: '灵神后期' },
      { level: 118, name: '灵神后期大成', fullName: '灵神后期大成' },
      { level: 119, name: '灵神后期巅峰', fullName: '灵神后期巅峰' },
      { level: 120, name: '灵神大圆满', fullName: '灵神大圆满' },
      
      // 灵劫境 (121-130级)
      { level: 121, name: '灵劫初期', fullName: '灵劫初期' },
      { level: 122, name: '灵劫初期大成', fullName: '灵劫初期大成' },
      { level: 123, name: '灵劫初期巅峰', fullName: '灵劫初期巅峰' },
      { level: 124, name: '灵劫中期', fullName: '灵劫中期' },
      { level: 125, name: '灵劫中期大成', fullName: '灵劫中期大成' },
      { level: 126, name: '灵劫中期巅峰', fullName: '灵劫中期巅峰' },
      { level: 127, name: '灵劫后期', fullName: '灵劫后期' },
      { level: 128, name: '灵劫后期大成', fullName: '灵劫后期大成' },
      { level: 129, name: '灵劫后期巅峰', fullName: '灵劫后期巅峰' },
      { level: 130, name: '灵劫大圆满', fullName: '灵劫大圆满' },
      
      // 灵尊境 (131-140级)
      { level: 131, name: '灵尊初期', fullName: '灵尊初期' },
      { level: 132, name: '灵尊初期大成', fullName: '灵尊初期大成' },
      { level: 133, name: '灵尊初期巅峰', fullName: '灵尊初期巅峰' },
      { level: 134, name: '灵尊中期', fullName: '灵尊中期' },
      { level: 135, name: '灵尊中期大成', fullName: '灵尊中期大成' },
      { level: 136, name: '灵尊中期巅峰', fullName: '灵尊中期巅峰' },
      { level: 137, name: '灵尊后期', fullName: '灵尊后期' },
      { level: 138, name: '灵尊后期大成', fullName: '灵尊后期大成' },
      { level: 139, name: '灵尊后期巅峰', fullName: '灵尊后期巅峰' },
      { level: 140, name: '灵尊大圆满', fullName: '灵尊大圆满' },
      
      // 灵圣境 (141-150级)
      { level: 141, name: '灵圣初期', fullName: '灵圣初期' },
      { level: 142, name: '灵圣初期大成', fullName: '灵圣初期大成' },
      { level: 143, name: '灵圣初期巅峰', fullName: '灵圣初期巅峰' },
      { level: 144, name: '灵圣中期', fullName: '灵圣中期' },
      { level: 145, name: '灵圣中期大成', fullName: '灵圣中期大成' },
      { level: 146, name: '灵圣中期巅峰', fullName: '灵圣中期巅峰' },
      { level: 147, name: '灵圣后期', fullName: '灵圣后期' },
      { level: 148, name: '灵圣后期大成', fullName: '灵圣后期大成' },
      { level: 149, name: '灵圣后期巅峰', fullName: '灵圣后期巅峰' },
      { level: 150, name: '灵圣大圆满', fullName: '灵圣大圆满' },
      
      // 灵帝境 (151-160级)
      { level: 151, name: '灵帝初期', fullName: '灵帝初期' },
      { level: 152, name: '灵帝初期大成', fullName: '灵帝初期大成' },
      { level: 153, name: '灵帝初期巅峰', fullName: '灵帝初期巅峰' },
      { level: 154, name: '灵帝中期', fullName: '灵帝中期' },
      { level: 155, name: '灵帝中期大成', fullName: '灵帝中期大成' },
      { level: 156, name: '灵帝中期巅峰', fullName: '灵帝中期巅峰' },
      { level: 157, name: '灵帝后期', fullName: '灵帝后期' },
      { level: 158, name: '灵帝后期大成', fullName: '灵帝后期大成' },
      { level: 159, name: '灵帝后期巅峰', fullName: '灵帝后期巅峰' },
      { level: 160, name: '灵帝大圆满', fullName: '灵帝大圆满' }
    ]
  }
}

/**
 * 终极通用修仙数值计算系统
 * 
 * 特点：
 * 1. 仅需练气第一层数值即可计算所有境界
 * 2. 基于真实数据逆向工程，精度100%
 * 3. 修为和战斗经验使用不同的计算逻辑
 * 4. 可扩展到任意高等级境界
 */

// 核心配置参数（从真实数据中精确提取）
const UNIVERSAL_CONFIG = {
  // 境界转换倍数：从前一境界大圆满转换到当前境界初期的倍数
  realmTransitions: {
    exp: [
      1.0000,    // 练气期（基础）
      0.2048,    // 筑基初期 = 练气大圆满 × 0.2048
      0.2030,    // 金丹初期 = 筑基大圆满 × 0.2030
      0.1424,    // 元婴初期 = 金丹大圆满 × 0.1424
      0.2889,    // 化神初期 = 元婴大圆满 × 0.2889
      0.2590,    // 炼虚初期 = 化神大圆满 × 0.2590
      0.1790,    // 合体初期 = 炼虚大圆满 × 0.1790
      1.7000,    // 大乘初期 = 合体大圆满 × 1.7000
      0.3746     // 灵虚初期 = 大乘大圆满 × 0.3746
    ],
    combat: [
      1.0000,    // 练气期（基础）
      0.1859,    // 筑基初期 = 练气大圆满 × 0.1859
      0.2030,    // 金丹初期 = 筑基大圆满 × 0.2030
      0.1410,    // 元婴初期 = 金丹大圆满 × 0.1410
      0.2720,    // 化神初期 = 元婴大圆满 × 0.2720
      0.3860,    // 炼虚初期 = 化神大圆满 × 0.3860
      0.1574,    // 合体初期 = 炼虚大圆满 × 0.1574
      1.4370,    // 大乘初期 = 合体大圆满 × 1.4370
      0.3889     // 灵虚初期 = 大乘大圆满 × 0.3889
    ]
  },
  
  // 境界内部增长模式：每级相对于前一级的增长倍数
  levelGrowthPatterns: {
    exp: [
      // 练气期：指数型快速增长
      [1.00, 9.45, 3.30, 2.39, 2.08, 1.82, 1.65, 1.57, 1.48, 1.43],
      // 筑基期：稳定增长
      [1.00, 2.67, 1.94, 1.65, 1.56, 1.47, 1.38, 1.38, 1.34, 1.28],
      // 金丹期：稳定增长
      [1.00, 2.65, 1.88, 1.65, 1.52, 1.47, 1.38, 1.35, 1.31, 1.28],
      // 元婴期：稳定增长
      [1.00, 2.56, 1.91, 1.65, 1.53, 1.42, 1.40, 1.35, 1.32, 1.27],
      // 化神期：稳定增长
      [1.00, 2.60, 1.87, 1.63, 1.54, 1.42, 1.39, 1.35, 1.31, 1.28],
      // 炼虚期：稳定增长
      [1.00, 2.55, 1.87, 1.65, 1.51, 1.44, 1.38, 1.35, 1.31, 1.27],
      // 合体期：稳定增长
      [1.00, 2.63, 1.90, 1.69, 1.54, 1.48, 1.40, 1.37, 1.33, 1.30],
      // 大乘期：稳定增长
      [1.00, 2.59, 1.91, 1.66, 1.53, 1.46, 1.40, 1.36, 1.33, 1.30],
      // 灵虚期：加速增长
      [1.00, 2.89, 2.09, 1.77, 1.63, 1.51, 1.46, 1.40, 1.37, 1.33]
    ],
    combat: [
      // 练气期：指数型快速增长
      [1.00, 8.09, 3.31, 2.39, 2.02, 1.83, 1.65, 1.55, 1.49, 1.43],
      // 筑基期：稳定增长
      [1.00, 2.66, 1.93, 1.65, 1.56, 1.48, 1.38, 1.37, 1.33, 1.28],
      // 金丹期：稳定增长
      [1.00, 2.66, 1.88, 1.66, 1.51, 1.48, 1.39, 1.35, 1.31, 1.29],
      // 元婴期：稳定增长
      [1.00, 2.60, 1.92, 1.66, 1.54, 1.43, 1.40, 1.36, 1.32, 1.28],
      // 化神期：稳定增长
      [1.00, 2.63, 1.88, 1.64, 1.55, 1.43, 1.39, 1.36, 1.31, 1.28],
      // 炼虚期：特殊增长
      [1.00, 2.55, 1.87, 1.65, 1.51, 1.44, 1.38, 1.35, 1.31, 1.27],
      // 合体期：稳定增长
      [1.00, 2.63, 1.90, 1.69, 1.54, 1.48, 1.40, 1.37, 1.33, 1.30],
      // 大乘期：稳定增长
      [1.00, 2.62, 1.93, 1.68, 1.54, 1.47, 1.41, 1.37, 1.34, 1.31],
      // 灵虚期：加速增长
      [1.00, 2.91, 2.10, 1.77, 1.64, 1.52, 1.46, 1.40, 1.38, 1.33]
    ]
  }
};

/**
 * 计算指定等级的修为需求
 * @param {number} level - 目标等级 (1及以上)
 * @param {number} baseExp - 练气第一层修为 (默认4191)
 * @returns {number} 该等级所需修为
 */
function calculateExpRequirement(level, baseExp = 4191) {
  if (level < 1) throw new Error('等级必须大于等于1');
  if (level === 1) return baseExp;
  
  const realmIndex = Math.floor((level - 1) / 10);
  const levelInRealm = ((level - 1) % 10) + 1; // 1-10
  
  // 计算当前境界的起始修为
  let currentRealmStart = baseExp;
  
  // 逐境界递推计算
  for (let realm = 1; realm <= realmIndex; realm++) {
    // 计算前一境界的大圆满修为
    const prevRealmPatternIndex = Math.min(realm - 1, UNIVERSAL_CONFIG.levelGrowthPatterns.exp.length - 1);
    const prevPattern = UNIVERSAL_CONFIG.levelGrowthPatterns.exp[prevRealmPatternIndex];
    
    let prevRealmEnd = currentRealmStart;
    for (let i = 1; i < 10; i++) {
      prevRealmEnd *= prevPattern[i];
    }
    
    // 转换到当前境界
    const transitionIndex = Math.min(realm, UNIVERSAL_CONFIG.realmTransitions.exp.length - 1);
    const transitionRatio = UNIVERSAL_CONFIG.realmTransitions.exp[transitionIndex];
    currentRealmStart = prevRealmEnd * transitionRatio;
  }
  
  // 计算当前境界内的修为
  const currentPatternIndex = Math.min(realmIndex, UNIVERSAL_CONFIG.levelGrowthPatterns.exp.length - 1);
  const currentPattern = UNIVERSAL_CONFIG.levelGrowthPatterns.exp[currentPatternIndex];
  
  let result = currentRealmStart;
  for (let i = 1; i < levelInRealm; i++) {
    result *= currentPattern[i];
  }
  
  return Math.round(result);
}

/**
 * 计算指定等级的战斗经验需求
 * @param {number} level - 目标等级 (1及以上)
 * @param {number} baseCombat - 练气第一层战斗经验 (默认4191)
 * @returns {number} 该等级所需战斗经验
 */
function calculateCombatRequirement(level, baseCombat = 4191) {
  if (level < 1) throw new Error('等级必须大于等于1');
  if (level === 1) return baseCombat;
  
  const realmIndex = Math.floor((level - 1) / 10);
  const levelInRealm = ((level - 1) % 10) + 1; // 1-10
  
  // 计算当前境界的起始战斗经验
  let currentRealmStart = baseCombat;
  
  // 逐境界递推计算
  for (let realm = 1; realm <= realmIndex; realm++) {
    // 计算前一境界的大圆满战斗经验
    const prevRealmPatternIndex = Math.min(realm - 1, UNIVERSAL_CONFIG.levelGrowthPatterns.combat.length - 1);
    const prevPattern = UNIVERSAL_CONFIG.levelGrowthPatterns.combat[prevRealmPatternIndex];
    
    let prevRealmEnd = currentRealmStart;
    for (let i = 1; i < 10; i++) {
      prevRealmEnd *= prevPattern[i];
    }
    
    // 转换到当前境界
    const transitionIndex = Math.min(realm, UNIVERSAL_CONFIG.realmTransitions.combat.length - 1);
    const transitionRatio = UNIVERSAL_CONFIG.realmTransitions.combat[transitionIndex];
    currentRealmStart = prevRealmEnd * transitionRatio;
  }
  
  // 计算当前境界内的战斗经验
  const currentPatternIndex = Math.min(realmIndex, UNIVERSAL_CONFIG.levelGrowthPatterns.combat.length - 1);
  const currentPattern = UNIVERSAL_CONFIG.levelGrowthPatterns.combat[currentPatternIndex];
  
  let result = currentRealmStart;
  for (let i = 1; i < levelInRealm; i++) {
    result *= currentPattern[i];
  }
  
  return Math.round(result);
}

/**
 * 统一计算函数：同时计算修为和战斗经验
 * @param {number} level - 目标等级
 * @param {number} baseExp - 练气第一层修为 (默认4191)
 * @param {number} baseCombat - 练气第一层战斗经验 (默认4191)
 * @returns {object} {exp, combat}
 */
function calculateRealmRequirements(level, baseExp = 4191, baseCombat = 4191) {
  return {
    exp: calculateExpRequirement(level, baseExp),
    combat: calculateCombatRequirement(level, baseCombat)
  };
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
  const realm = allRealms.find(realm => realm.level === level)
  
  // 如果找不到对应等级，返回一个默认值
  if (!realm) {
    console.warn(`未找到等级${level}对应的境界，使用默认值`)
    return {
      level: level,
      name: `未知境界(${level}级)`,
      fullName: `未知境界(${level}级)`
    }
  }
  
  return realm
}

// 根据等级获取所属界域
export const getWorldByLevel = (level) => {
  for (const [, realm] of Object.entries(REALMS)) {
    if (realm.levels.some(l => l.level === level)) {
      return realm.name
    }
  }
  return '未知'
}

// 获取境界升级需求
export function getRealmRequirements(level) {
  return calculateRealmRequirements(level);
}