// 修为和战斗经验增长速率计算器
// 公式: result = A*(1+修为/战斗经验加成)*吸收效率*(1+修为/战斗经验倍率)
// A = (1+境界系数)*(1+当前境界历练层数)*(1+轮回加成)

/**
 * 境界系数配置
 * 根据大境界返回对应的系数
 * 境界级别只会随着大境界的增加而增加
 * 练气1层=1, 练气10层=1
 * 筑基初期=2, 筑基大圆满=2
 * 金丹初期=3, 金丹大圆满=3
 * 以此类推...
 */
export function getRealmCoefficient(level) {
  // 计算大境界级别：每10个小等级为一个大境界
  // level 1-10 -> 境界级别 1 (练气)
  // level 11-20 -> 境界级别 2 (筑基)
  // level 21-30 -> 境界级别 3 (金丹)
  // ...
  return Math.floor((level - 1) / 10) + 1;
}

/**
 * 计算修为增长速率
 * @param {Object} player - 玩家数据
 * @param {number} baseSpeed - 基础修为速度
 * @returns {number} 实际修为增长速率
 */
export function calculateExpGrowthRate(player, baseSpeed) {
  // 配置参数 - 按照用户原始要求
  const expBonus = 10000; // 修为加成
  const absorptionEfficiency = 1; // 吸收效率
  const expMultiplier = 2; // 修为倍率
  const currentTrainingLevel = 200; // 当前境界历练层数
  const reincarnationBonus = 100; // 轮回加成
  
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
  const combatBonus = 10000; // 战斗经验加成
  const absorptionEfficiency = 1; // 吸收效率
  const combatMultiplier = 2; // 战斗经验倍率
  const currentTrainingLevel = 200; // 当前境界历练层数
  const reincarnationBonus = 100; // 轮回加成
  
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