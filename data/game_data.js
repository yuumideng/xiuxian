// A游戏完整的1-90级真实数据
// 数据来源：用户提供的完整游戏数据

export const realGameData = {
  // 练气期 (1-10级)
  1: { exp: 4191, combat: 4191, realm: "练气", stage: "练气一层" },
  2: { exp: 39600, combat: 33924, realm: "练气", stage: "练气二层" },
  3: { exp: 130680, combat: 112167, realm: "练气", stage: "练气三层" },
  4: { exp: 312566, combat: 268550, realm: "练气", stage: "练气四层" },
  5: { exp: 649112, combat: 542840, realm: "练气", stage: "练气五层" },
  6: { exp: 1178848, combat: 993471, realm: "练气", stage: "练气六层" },
  7: { exp: 1943500, combat: 1643120, realm: "练气", stage: "练气七层" },
  8: { exp: 3057278, combat: 2547950, realm: "练气", stage: "练气八层" },
  9: { exp: 4525005, combat: 3785145, realm: "练气", stage: "练气九层" },
  10: { exp: 6453400, combat: 5414296, realm: "练气", stage: "练气大圆满" },
  
  // 筑基期 (11-20级)
  11: { exp: 1321200, combat: 1006704, realm: "筑基", stage: "筑基初期" },
  12: { exp: 3531168, combat: 2679840, realm: "筑基", stage: "筑基初期大成" },
  13: { exp: 6863184, combat: 5183352, realm: "筑基", stage: "筑基初期巅峰" },
  14: { exp: 11332512, combat: 8535744, realm: "筑基", stage: "筑基中期" },
  15: { exp: 17696160, combat: 13280400, realm: "筑基", stage: "筑基中期大成" },
  16: { exp: 26057808, combat: 19642176, realm: "筑基", stage: "筑基中期巅峰" },
  17: { exp: 36039024, combat: 27076896, realm: "筑基", stage: "筑基后期" },
  18: { exp: 49648896, combat: 37238400, realm: "筑基", stage: "筑基后期大成" },
  19: { exp: 66372048, combat: 49650408, realm: "筑基", stage: "筑基后期巅峰" },
  20: { exp: 84682800, combat: 63514800, realm: "筑基", stage: "筑基大圆满" },
  
  // 金丹期 (21-30级)
  21: { exp: 17197299, combat: 12877326, realm: "金丹", stage: "金丹初期" },
  22: { exp: 45562374, combat: 34287550, realm: "金丹", stage: "金丹初期大成" },
  23: { exp: 85459129, combat: 64530613, realm: "金丹", stage: "金丹初期巅峰" },
  24: { exp: 141000000, combat: 107000000, realm: "金丹", stage: "金丹中期" },
  25: { exp: 214000000, combat: 162000000, realm: "金丹", stage: "金丹中期大成" },
  26: { exp: 314000000, combat: 240000000, realm: "金丹", stage: "金丹中期巅峰" },
  27: { exp: 434000000, combat: 333000000, realm: "金丹", stage: "金丹后期" },
  28: { exp: 584000000, combat: 449000000, realm: "金丹", stage: "金丹后期大成" },
  29: { exp: 766000000, combat: 590000000, realm: "金丹", stage: "金丹后期巅峰" },
  30: { exp: 983000000, combat: 759000000, realm: "金丹", stage: "金丹大圆满" },
  
  // 元婴期 (31-40级)
  31: { exp: 140000000, combat: 107000000, realm: "元婴", stage: "元婴初期" },
  32: { exp: 359000000, combat: 278000000, realm: "元婴", stage: "元婴初期大成" },
  33: { exp: 684000000, combat: 534000000, realm: "元婴", stage: "元婴初期巅峰" },
  34: { exp: 1130000000, combat: 888000000, realm: "元婴", stage: "元婴中期" },
  35: { exp: 1734000000, combat: 1370000000, realm: "元婴", stage: "元婴中期大成" },
  36: { exp: 2456000000, combat: 1955000000, realm: "元婴", stage: "元婴中期巅峰" },
  37: { exp: 3436000000, combat: 2747000000, realm: "元婴", stage: "元婴后期" },
  38: { exp: 4639000000, combat: 3725000000, realm: "元婴", stage: "元婴后期大成" },
  39: { exp: 6114000000, combat: 4930000000, realm: "元婴", stage: "元婴后期巅峰" },
  40: { exp: 7775000000, combat: 6299000000, realm: "元婴", stage: "元婴大圆满" },
  
  // 化神期 (41-50级)
  41: { exp: 2244000000, combat: 1712000000, realm: "化神", stage: "化神初期" },
  42: { exp: 5840000000, combat: 4499000000, realm: "化神", stage: "化神初期大成" },
  43: { exp: 10898000000, combat: 8469000000, realm: "化神", stage: "化神初期巅峰" },
  44: { exp: 17784000000, combat: 13927000000, realm: "化神", stage: "化神中期" },
  45: { exp: 27427000000, combat: 21630000000, realm: "化神", stage: "化神中期大成" },
  46: { exp: 38945000000, combat: 30963000000, realm: "化神", stage: "化神中期巅峰" },
  47: { exp: 54032000000, combat: 43201000000, realm: "化神", stage: "化神后期" },
  48: { exp: 73113000000, combat: 58751000000, realm: "化神", stage: "化神后期大成" },
  49: { exp: 95506000000, combat: 77106000000, realm: "化神", stage: "化神后期巅峰" },
  50: { exp: 121961000000, combat: 99017000000, realm: "化神", stage: "化神大圆满" },
  
  // 炼虚期 (51-60级) - 根据用户之前提供的数据
  51: { exp: 31600000000, combat: 38200000000, realm: "炼虚", stage: "炼虚初期" },
  52: { exp: 80600000000, combat: 97500000000, realm: "炼虚", stage: "炼虚初期大成" },
  53: { exp: 151000000000, combat: 183000000000, realm: "炼虚", stage: "炼虚初期巅峰" },
  54: { exp: 249700000000, combat: 302000000000, realm: "炼虚", stage: "炼虚中期" },
  55: { exp: 378000000000, combat: 458000000000, realm: "炼虚", stage: "炼虚中期大成" },
  56: { exp: 543000000000, combat: 658000000000, realm: "炼虚", stage: "炼虚中期巅峰" },
  57: { exp: 750700000000, combat: 909000000000, realm: "炼虚", stage: "炼虚后期" },
  58: { exp: 1020000000000, combat: 1235000000000, realm: "炼虚", stage: "炼虚后期大成" },
  59: { exp: 1320000000000, combat: 1599000000000, realm: "炼虚", stage: "炼虚后期巅峰" },
  60: { exp: 1670000000000, combat: 2023000000000, realm: "炼虚", stage: "炼虚大圆满" },
  
  // 合体期 (61-70级) - 根据用户之前提供的数据
  61: { exp: 299000000000, combat: 264000000000, realm: "合体", stage: "合体初期" },
  62: { exp: 786000000000, combat: 693000000000, realm: "合体", stage: "合体初期大成" },
  63: { exp: 1490000000000, combat: 1314000000000, realm: "合体", stage: "合体初期巅峰" },
  64: { exp: 2520000000000, combat: 2223000000000, realm: "合体", stage: "合体中期" },
  65: { exp: 3870000000000, combat: 3414000000000, realm: "合体", stage: "合体中期大成" },
  66: { exp: 5710000000000, combat: 5038000000000, realm: "合体", stage: "合体中期巅峰" },
  67: { exp: 8010000000000, combat: 7065000000000, realm: "合体", stage: "合体后期" },
  68: { exp: 11000000000000, combat: 9707000000000, realm: "合体", stage: "合体后期大成" },
  69: { exp: 14600000000000, combat: 12884000000000, realm: "合体", stage: "合体后期巅峰" },
  70: { exp: 19000000000000, combat: 16769000000000, realm: "合体", stage: "合体大圆满" },
  
  // 大乘期 (71-80级) - 用户最新提供的数据
  71: { exp: 32300000000000, combat: 24100000000000, realm: "大乘", stage: "大乘初期" },
  72: { exp: 83800000000000, combat: 63200000000000, realm: "大乘", stage: "大乘初期大成" },
  73: { exp: 159700000000000, combat: 121700000000000, realm: "大乘", stage: "大乘初期巅峰" },
  74: { exp: 265700000000000, combat: 204300000000000, realm: "大乘", stage: "大乘中期" },
  75: { exp: 406100000000000, combat: 314700000000000, realm: "大乘", stage: "大乘中期大成" },
  76: { exp: 593400000000000, combat: 464000000000000, realm: "大乘", stage: "大乘中期巅峰" },
  77: { exp: 832400000000000, combat: 654900000000000, realm: "大乘", stage: "大乘后期" },
  78: { exp: 1135000000000000, combat: 898500000000000, realm: "大乘", stage: "大乘后期大成" },
  79: { exp: 1509200000000000, combat: 1201400000000000, realm: "大乘", stage: "大乘后期巅峰" },
  80: { exp: 1964800000000000, combat: 1573700000000000, realm: "大乘", stage: "大乘大圆满" },
  
  // 灵虚境 (81-90级) - 用户最新提供的数据
  81: { exp: 735900000000000, combat: 612100000000000, realm: "灵虚", stage: "灵虚初期" },
  82: { exp: 2129600000000000, combat: 1780500000000000, realm: "灵虚", stage: "灵虚初期大成" },
  83: { exp: 4450600000000000, combat: 3738500000000000, realm: "灵虚", stage: "灵虚初期巅峰" },
  84: { exp: 7875700000000000, combat: 6626400000000000, realm: "灵虚", stage: "灵虚中期" },
  85: { exp: 12848600000000000, combat: 10880300000000000, realm: "灵虚", stage: "灵虚中期大成" },
  86: { exp: 19443400000000000, combat: 16539700000000000, realm: "灵虚", stage: "灵虚中期巅峰" },
  87: { exp: 28330200000000000, combat: 24177700000000000, realm: "灵虚", stage: "灵虚后期" },
  88: { exp: 39588600000000000, combat: 33885100000000000, realm: "灵虚", stage: "灵虚后期大成" },
  89: { exp: 54378600000000000, combat: 46673800000000000, realm: "灵虚", stage: "灵虚后期巅峰" },
  90: { exp: 72042400000000000, combat: 62041000000000000, realm: "灵虚", stage: "灵虚大圆满" }
};

// 境界信息
export const realmInfo = {
  "练气": { levels: [1, 10], color: "#8B4513" },
  "筑基": { levels: [11, 20], color: "#CD853F" },
  "金丹": { levels: [21, 30], color: "#FFD700" },
  "元婴": { levels: [31, 40], color: "#FF6347" },
  "化神": { levels: [41, 50], color: "#9370DB" },
  "炼虚": { levels: [51, 60], color: "#4169E1" },
  "合体": { levels: [61, 70], color: "#00CED1" },
  "大乘": { levels: [71, 80], color: "#32CD32" },
  "灵虚": { levels: [81, 90], color: "#FF1493" }
};

// 获取指定等级的数据
export function getRealDataByLevel(level) {
  return realGameData[level] || null;
}

// 获取指定境界的所有数据
export function getRealDataByRealm(realmName) {
  const result = [];
  for (let level = 1; level <= 90; level++) {
    const data = realGameData[level];
    if (data && data.realm === realmName) {
      result.push({ level, ...data });
    }
  }
  return result;
}

// 获取所有数据的统计信息
export function getDataStatistics() {
  const stats = {
    totalLevels: 90,
    realms: {},
    maxExp: 0,
    maxCombat: 0,
    minExp: Infinity,
    minCombat: Infinity
  };
  
  for (let level = 1; level <= 90; level++) {
    const data = realGameData[level];
    if (data) {
      // 更新最大最小值
      stats.maxExp = Math.max(stats.maxExp, data.exp);
      stats.maxCombat = Math.max(stats.maxCombat, data.combat);
      stats.minExp = Math.min(stats.minExp, data.exp);
      stats.minCombat = Math.min(stats.minCombat, data.combat);
      
      // 统计境界信息
      if (!stats.realms[data.realm]) {
        stats.realms[data.realm] = {
          count: 0,
          levels: [],
          expRange: { min: Infinity, max: 0 },
          combatRange: { min: Infinity, max: 0 }
        };
      }
      
      const realmStats = stats.realms[data.realm];
      realmStats.count++;
      realmStats.levels.push(level);
      realmStats.expRange.min = Math.min(realmStats.expRange.min, data.exp);
      realmStats.expRange.max = Math.max(realmStats.expRange.max, data.exp);
      realmStats.combatRange.min = Math.min(realmStats.combatRange.min, data.combat);
      realmStats.combatRange.max = Math.max(realmStats.combatRange.max, data.combat);
    }
  }
  
  return stats;
}

// 格式化数值显示
export function formatNumber(num) {
  if (num >= 1e15) {
    return (num / 1e12).toFixed(1) + '千万亿';
  } else if (num >= 1e12) {
    return (num / 1e12).toFixed(1) + '万亿';
  } else if (num >= 1e9) {
    return (num / 1e9).toFixed(1) + '十亿';
  } else if (num >= 1e6) {
    return (num / 1e6).toFixed(1) + '百万';
  } else if (num >= 1e3) {
    return (num / 1e3).toFixed(1) + '千';
  } else {
    return num.toString();
  }
}

// 如果直接运行此文件，显示统计信息
if (import.meta.url === `file://${process.argv[1]}`) {
  console.log("A游戏完整数据已加载，包含1-90级所有真实数据");
  console.log("数据统计:", getDataStatistics());
}