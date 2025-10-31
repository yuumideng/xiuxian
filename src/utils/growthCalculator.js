// 修为和战斗经验增长速率计算器
// 公式: result = A*(1+修为/战斗经验加成)*吸收效率*(1+修为/战斗经验倍率)
// A = (1+境界系数)*(1+当前境界历练层数)*(1+轮回加成)

import { calculateCultivationSpeedBonuses as calculateTalentSpeedBonuses } from './talentSystem.js'
import { calculateCultivationSpeedBonuses as calculateMeridianSpeedBonuses } from './meridianSystem.js'
import { calculateCultivationSpeedBonuses as calculateImmortalRankingSpeedBonuses } from './immortalRankingSystem.js'

/**
 * 境界系数配置（新版本 - 指数增长）
 * 
 * 规则：
 * - 练气期（大境界1）：每小境界 +1（1→10）
 * - 筑基期（大境界2）：每小境界 +1（11→20）
 * - 金丹期（大境界3）：每小境界 +2（22→40）
 * - 元婴期（大境界4）：每小境界 +4（44→80）
 * - 化神期（大境界5）：每小境界 +8（88→168）
 * 
 * 公式：
 * - 大境界1-2：每小境界 +1
 * - 大境界n（n≥3）：每小境界 +2^(n-2)
 * 
 * 示例：
 * - 练气1层=1, 练气10层=10
 * - 筑基初期=11, 筑基大圆满=20
 * - 金丹初期=22, 金丹大圆满=40
 * - 元婴初期=44, 元婴大圆满=80
 * - 化神初期=88, 化神大圆满=168
 */
export function getRealmCoefficient(level) {
  // 计算大境界级别（每10个小等级为一个大境界）
  const realmLevel = Math.floor((level - 1) / 10) + 1
  // 计算当前大境界内的小境界（1-10）
  const subLevel = ((level - 1) % 10) + 1
  
  // 计算前面所有大境界的累计系数
  let baseCoefficient = 0
  
  for (let i = 1; i < realmLevel; i++) {
    if (i <= 2) {
      // 练气和筑基：每小境界 +1，共10个小境界
      baseCoefficient += 10
    } else {
      // 金丹及以上：每小境界 +2^(i-2)，共10个小境界
      baseCoefficient += 10 * Math.pow(2, i - 2)
    }
  }
  
  // 计算当前大境界内的增量
  let currentIncrement = 0
  if (realmLevel <= 2) {
    // 练气和筑基：每小境界 +1
    currentIncrement = subLevel
  } else {
    // 金丹及以上：每小境界 +2^(realmLevel-2)
    currentIncrement = subLevel * Math.pow(2, realmLevel - 2)
  }
  
  return baseCoefficient + currentIncrement
}

/**
 * 计算修为增长速率
 * @param {Object} player - 玩家数据
 * @param {number} baseSpeed - 基础修为速度
 * @returns {number} 实际修为增长速率
 */
export function calculateExpGrowthRate(player, baseSpeed) {
  // 配置参数 - 按照用户原始要求
  let expBonus = 10000; // 修为加成（基础值）
  const absorptionEfficiency = 1; // 吸收效率
  const expMultiplier = 2; // 修为倍率
  const currentTrainingLevel = 200; // 当前境界历练层数
  const reincarnationBonus = 100; // 轮回加成
  
  // 计算天赋加成
  if (player.talents) {
    const talentBonuses = calculateTalentSpeedBonuses(player.talents, player.level)
    expBonus += talentBonuses.expSpeed || 0
  }
  
  // 计算经脉加成
  const meridianBonuses = calculateMeridianSpeedBonuses(player.level)
  expBonus += meridianBonuses.expSpeed || 0
  
  // 计算仙战榜加成
  if (player.immortalRanking) {
    const immortalRankingBonuses = calculateImmortalRankingSpeedBonuses(player.immortalRanking)
    expBonus += immortalRankingBonuses.expSpeed || 0
  }
  
  // 计算境界系数
  const realmCoefficient = getRealmCoefficient(player.level);
  
  // 计算 A = (1+境界系数)*(1+当前境界历练层数)*(1+轮回加成)
  const A = (1 + realmCoefficient) * (1 + currentTrainingLevel) * (1 + reincarnationBonus);
  
  // 计算最终结果
  // result = A*(1+修为加成)*吸收效率*(1+修为倍率)
  const result = A * (1 + expBonus) * absorptionEfficiency * (1 + expMultiplier);
  
  // 应用到基础速度上
  return Math.floor(baseSpeed * result);
}

/**
 * 计算战斗经验增长速率
 * @param {Object} player - 玩家数据
 * @param {number} baseSpeed - 基础战斗经验速度
 * @returns {number} 实际战斗经验增长速率
 */
export function calculateCombatGrowthRate(player, baseSpeed) {
  // 配置参数 - 按照用户原始要求
  let combatBonus = 10000; // 战斗经验加成（基础值）
  const absorptionEfficiency = 1; // 吸收效率
  const combatMultiplier = 2; // 战斗经验倍率
  const currentTrainingLevel = 200; // 当前境界历练层数
  const reincarnationBonus = 100; // 轮回加成
  
  // 计算天赋加成
  if (player.talents) {
    const talentBonuses = calculateTalentSpeedBonuses(player.talents, player.level)
    combatBonus += talentBonuses.combatSpeed || 0
  }
  
  // 计算经脉加成
  const meridianBonuses = calculateMeridianSpeedBonuses(player.level)
  combatBonus += meridianBonuses.combatSpeed || 0
  
  // 计算仙战榜加成
  if (player.immortalRanking) {
    const immortalRankingBonuses = calculateImmortalRankingSpeedBonuses(player.immortalRanking)
    combatBonus += immortalRankingBonuses.combatSpeed || 0
  }
  
  // 计算境界系数
  const realmCoefficient = getRealmCoefficient(player.level);
  
  // 计算 A = (1+境界系数)*(1+当前境界历练层数)*(1+轮回加成)
  const A = (1 + realmCoefficient) * (1 + currentTrainingLevel) * (1 + reincarnationBonus);
  
  // 计算最终结果
  // result = A*(1+战斗经验加成)*吸收效率*(1+战斗经验倍率)
  const result = A * (1 + combatBonus) * absorptionEfficiency * (1 + combatMultiplier);
  
  // 应用到基础速度上
  return Math.floor(baseSpeed * result);
}

/**
 * 获取增长速率详细信息（用于调试和显示）
 * @param {Object} player - 玩家数据
 * @returns {Object} 详细的计算信息
 */
export function getGrowthRateDetails(player) {
  const realmCoefficient = getRealmCoefficient(player.level);
  const currentTrainingLevel = 200;
  const reincarnationBonus = 100;
  const A = (1 + realmCoefficient) * (1 + currentTrainingLevel) * (1 + reincarnationBonus);
  
  return {
    realmCoefficient,
    currentTrainingLevel,
    reincarnationBonus,
    A,
    expBonus: 10000,
    combatBonus: 10000,
    absorptionEfficiency: 1,
    expMultiplier: 2,
    combatMultiplier: 2,
    expFinalMultiplier: A * (1 + 10000) * 1 * (1 + 2),
    combatFinalMultiplier: A * (1 + 10000) * 1 * (1 + 2)
  };
}