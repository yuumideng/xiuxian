/**
 * 统一修仙数值计算系统
 * 
 * 核心设计理念：
 * 1. 练气期（1-10级）：使用原始真实数据
 * 2. 其他所有境界：统一使用 growthCurve 增长模式计算
 * 3. 每个大境界的初始值从 realm_initial_values.js 获取
 * 4. 境界内的10个小等级使用相同的 growthCurve 进行插值计算
 * 
 * @author AI Assistant
 * @version 3.0.0
 * @date 2025-10-30
 */

import { REALM_INITIAL_VALUES, getInitialValueByLevel } from '../data/realm_initial_values.js';
import { getRealmDetailByLevel } from '../data/complete_realms.js';

/**
 * 统一修仙数值计算系统类
 */
export class UnifiedCultivationSystem {
  constructor() {
    // 练气期原始数据（1-10级）- 唯一使用真实数据的境界
    this.qiData = {
      exp: [4191, 39600, 130680, 312566, 649112, 1178848, 1943500, 3057278, 4525005, 6453400],
      combat: [4191, 33924, 112167, 268550, 542840, 993471, 1643120, 2547950, 3785145, 5414296]
    };
    
    /**
     * 统一增长曲线 - 适用于所有境界（除练气期外）
     * 
     * 特征：
     * - 9个关键点，对应境界内的9次增长
     * - 起始比例2.6，结束比例1.3
     * - 前期快速衰减，后期缓慢衰减
     * - 基于灵虚期、灵魄期、灵婴期的真实数据拟合
     */
    this.growthCurve = [
      { progress: 0.000, ratio: 2.6 },    // 第1次增长 - 初期→初期大成
      { progress: 0.125, ratio: 1.9 },    // 第2次增长 - 初期大成→初期巅峰
      { progress: 0.250, ratio: 1.656 },  // 第3次增长 - 初期巅峰→中期
      { progress: 0.375, ratio: 1.533 },  // 第4次增长 - 中期→中期大成
      { progress: 0.500, ratio: 1.450 },  // 第5次增长 - 中期大成→中期巅峰
      { progress: 0.625, ratio: 1.391 },  // 第6次增长 - 中期巅峰→后期
      { progress: 0.750, ratio: 1.360 },  // 第7次增长 - 后期→后期大成
      { progress: 0.875, ratio: 1.318 },  // 第8次增长 - 后期大成→后期巅峰
      { progress: 1.000, ratio: 1.3 }     // 第9次增长 - 后期巅峰→大圆满
    ];
  }
  
  /**
   * 分段线性插值计算增长比例
   * @param {number} progress 进度值 (0-1)
   * @param {Array} curve 曲线分段点数组
   * @returns {number} 插值后的增长比例
   */
  interpolateRatio(progress, curve) {
    // 确保progress在0-1范围内
    progress = Math.max(0, Math.min(1, progress));
    
    // 找到对应的分段进行线性插值
    for (let i = 0; i < curve.length - 1; i++) {
      const current = curve[i];
      const next = curve[i + 1];
      
      if (progress >= current.progress && progress <= next.progress) {
        const segmentProgress = (progress - current.progress) / (next.progress - current.progress);
        return current.ratio + (next.ratio - current.ratio) * segmentProgress;
      }
    }
    
    return curve[curve.length - 1].ratio;
  }
  
  /**
   * 计算指定境界的完整数值（10个小等级）
   * @param {number} startLevel 境界起始等级（如11, 21, 31...）
   * @param {number} startExp 境界起始修为
   * @param {number} startCombat 境界起始战斗经验
   * @returns {Array} 10个等级的数值数组
   */
  calculateRealmLevels(startLevel, startExp, startCombat) {
    const results = [];
    
    for (let i = 0; i < 10; i++) {
      const level = startLevel + i;
      const realmDetail = getRealmDetailByLevel(level);
      
      if (i === 0) {
        // 第一级直接使用起始值
        results.push({
          level,
          exp: Math.round(startExp),
          combat: Math.round(startCombat),
          realmName: realmDetail.realmName,
          stageName: realmDetail.stageName,
          fullName: realmDetail.fullName
        });
      } else {
        // 后续等级使用 growthCurve 计算
        const progress = (i - 1) / 8; // 0到1的进度（9次增长，8个间隔）
        const ratio = this.interpolateRatio(progress, this.growthCurve);
        
        const prevExp = results[i - 1].exp;
        const prevCombat = results[i - 1].combat;
        
        results.push({
          level,
          exp: Math.round(prevExp * ratio),
          combat: Math.round(prevCombat * ratio),
          realmName: realmDetail.realmName,
          stageName: realmDetail.stageName,
          fullName: realmDetail.fullName
        });
      }
    }
    
    return results;
  }
  
  /**
   * 主计算函数 - 计算指定等级的数值
   * @param {number} level 等级 (1-720)
   * @param {string} type 数值类型 ('exp' | 'combat')
   * @returns {number} 计算结果
   */
  calculate(level, type = 'exp') {
    // 参数验证
    if (level < 1 || level > 720) {
      throw new Error(`等级必须在1-720之间，当前等级: ${level}`);
    }
    
    if (!['exp', 'combat'].includes(type)) {
      throw new Error(`数值类型必须是 'exp' 或 'combat'，当前类型: ${type}`);
    }
    
    // 练气期（1-10级）：直接使用原始数据
    if (level <= 10) {
      return this.qiData[type][level - 1];
    }
    
    // 其他境界：使用 growthCurve 计算
    // 1. 确定所属的大境界
    const realmStartLevel = Math.floor((level - 1) / 10) * 10 + 1;
    
    // 2. 获取该境界的初始值
    const initialValue = getInitialValueByLevel(realmStartLevel);
    
    if (!initialValue || initialValue.cultivation === 0 || initialValue.combat === 0) {
      throw new Error(`等级 ${level} 所属境界（起始等级 ${realmStartLevel}）的初始值未配置，请在 realm_initial_values.js 中添加`);
    }
    
    // 3. 计算该境界的完整数值
    const realmLevels = this.calculateRealmLevels(
      realmStartLevel,
      initialValue.cultivation,
      initialValue.combat
    );
    
    // 4. 返回对应等级的数值
    const levelIndex = level - realmStartLevel;
    return realmLevels[levelIndex][type];
  }
  
  /**
   * 批量计算指定境界的所有等级数值
   * @param {number} realmStartLevel 境界起始等级（如11, 21, 31...）
   * @returns {Array} 该境界10个等级的完整数据
   */
  calculateRealm(realmStartLevel) {
    // 验证是否为境界起始等级
    if ((realmStartLevel - 1) % 10 !== 0) {
      throw new Error(`${realmStartLevel} 不是境界起始等级，境界起始等级应为 1, 11, 21, 31...`);
    }
    
    // 练气期特殊处理
    if (realmStartLevel === 1) {
      const results = [];
      for (let i = 0; i < 10; i++) {
        const level = i + 1;
        const realmDetail = getRealmDetailByLevel(level);
        results.push({
          level,
          exp: this.qiData.exp[i],
          combat: this.qiData.combat[i],
          realmName: realmDetail.realmName,
          stageName: realmDetail.stageName,
          fullName: realmDetail.fullName
        });
      }
      return results;
    }
    
    // 获取初始值
    const initialValue = getInitialValueByLevel(realmStartLevel);
    
    if (!initialValue || initialValue.cultivation === 0 || initialValue.combat === 0) {
      throw new Error(`境界起始等级 ${realmStartLevel} 的初始值未配置，请在 realm_initial_values.js 中添加`);
    }
    
    // 计算该境界的完整数值
    return this.calculateRealmLevels(
      realmStartLevel,
      initialValue.cultivation,
      initialValue.combat
    );
  }
  
  /**
   * 批量计算多个等级的数值
   * @param {Array<number>} levels 等级数组
   * @param {string} type 数值类型 ('exp' | 'combat')
   * @returns {Array<{level: number, value: number}>} 计算结果数组
   */
  calculateBatch(levels, type = 'exp') {
    return levels.map(level => ({
      level,
      value: this.calculate(level, type)
    }));
  }
  
  /**
   * 计算等级范围内的所有数值
   * @param {number} startLevel 起始等级
   * @param {number} endLevel 结束等级
   * @param {string} type 数值类型 ('exp' | 'combat')
   * @returns {Array<{level: number, value: number}>} 计算结果数组
   */
  calculateRange(startLevel, endLevel, type = 'exp') {
    const levels = [];
    for (let level = startLevel; level <= endLevel; level++) {
      levels.push(level);
    }
    return this.calculateBatch(levels, type);
  }
  
  /**
   * 获取所有已配置境界的数值
   * @returns {Array} 所有已配置境界的完整数据
   */
  getAllConfiguredRealms() {
    const results = [];
    
    for (const initialValue of REALM_INITIAL_VALUES) {
      if (initialValue.cultivation > 0 && initialValue.combat > 0) {
        try {
          const realmData = this.calculateRealm(initialValue.level);
          results.push({
            realmStartLevel: initialValue.level,
            realmName: initialValue.realmName,
            levels: realmData
          });
        } catch (error) {
          console.warn(`计算境界 ${initialValue.realmName} (${initialValue.level}级) 失败:`, error.message);
        }
      }
    }
    
    return results;
  }
  
  /**
   * 导出境界数据为游戏配置格式
   * @param {number} realmStartLevel 境界起始等级
   * @returns {string} 游戏配置代码
   */
  exportRealmData(realmStartLevel) {
    const realmData = this.calculateRealm(realmStartLevel);
    const realmName = realmData[0].realmName;
    
    let output = `  // ${realmName}期 (${realmStartLevel}-${realmStartLevel + 9}级)\n`;
    
    realmData.forEach(data => {
      output += `  ${data.level}: { exp: ${data.exp}, combat: ${data.combat}, realm: "${data.realmName}", stage: "${data.stageName}" },\n`;
    });
    
    return output;
  }
}

// 创建默认实例
export const unifiedCultivationSystem = new UnifiedCultivationSystem();

// 导出工具函数
export const utils = {
  /**
   * 格式化数字显示（使用中文游戏标准单位）
   * 规则：万、亿、万亿、亿亿、万亿亿、亿亿亿...
   * 当亿的数量超过5个时使用角标：亿⁵、万亿⁵...
   * @param {number} num 数字
   * @returns {string} 格式化后的字符串
   */
  formatNumber(num) {
    if (num === 0) return '0';
    if (num < 0) return '-' + utils.formatNumber(-num);
    
    if (num < 10000) {
      return Math.floor(num).toLocaleString();
    }
    
    if (num < 100000000) {
      const wanValue = num / 10000;
      return wanValue.toFixed(2).replace(/\\.?0+$/, '') + '万';
    }
    
    // 亿以上，使用完整的单位体系
    const level = Math.floor(Math.log10(num) / 4);
    const yiCount = Math.floor(level / 2);
    const hasWan = level % 2 === 1;
    const divisor = Math.pow(10, level * 4);
    const value = num / divisor;
    
    let unit = '';
    if (yiCount <= 5) {
      if (hasWan) unit = '万';
      unit += '亿'.repeat(yiCount);
    } else {
      const superscripts = ['⁰', '¹', '²', '³', '⁴', '⁵', '⁶', '⁷', '⁸', '⁹'];
      const superscript = yiCount.toString().split('').map(d => superscripts[parseInt(d)]).join('');
      if (hasWan) unit = '万';
      unit += '亿' + superscript;
    }
    
    return value.toFixed(2).replace(/\\.?0+$/, '') + unit;
  },
  
  /**
   * 计算升级所需经验
   * @param {number} currentLevel 当前等级
   * @param {number} targetLevel 目标等级
   * @returns {number} 所需经验
   */
  calculateUpgradeExp(currentLevel, targetLevel) {
    if (targetLevel <= currentLevel) return 0;
    
    const currentExp = unifiedCultivationSystem.calculate(currentLevel, 'exp');
    const targetExp = unifiedCultivationSystem.calculate(targetLevel, 'exp');
    
    return targetExp - currentExp;
  },
  
  /**
   * 打印境界数据表格
   * @param {number} realmStartLevel 境界起始等级
   */
  printRealmTable(realmStartLevel) {
    const realmData = unifiedCultivationSystem.calculateRealm(realmStartLevel);
    const realmName = realmData[0].realmName;
    
    console.log(`\n╔════════════════════════════════════════════════════════════════════════════════╗`);
    console.log(`║  ${realmName}期 (${realmStartLevel}-${realmStartLevel + 9}级) 数值表`.padEnd(82) + '║');
    console.log(`╠════════════════════════════════════════════════════════════════════════════════╣`);
    console.log(`║ 等级 │ 阶段           │ 修为需求              │ 战斗经验需求          ║`);
    console.log(`╠════════════════════════════════════════════════════════════════════════════════╣`);
    
    realmData.forEach(data => {
      const levelStr = data.level.toString().padStart(4);
      const stageStr = data.stageName.padEnd(14);
      const expStr = utils.formatNumber(data.exp).padStart(20);
      const combatStr = utils.formatNumber(data.combat).padStart(20);
      console.log(`║ ${levelStr} │ ${stageStr} │ ${expStr} │ ${combatStr} ║`);
    });
    
    console.log(`╚════════════════════════════════════════════════════════════════════════════════╝`);
  }
};
