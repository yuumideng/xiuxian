// 测试当前参数配置
import { CultivationSystem } from './system/cultivation_system.js';
import { realGameData } from './data/game_data.js';

const system = new CultivationSystem();

console.log('=== 修仙数值系统效果评估 ===\n');

// 测试所有等级
let totalExpDev = 0;
let totalCombatDev = 0;
let expOver10 = 0;
let expOver5 = 0;
let expOver2 = 0;
let combatOver10 = 0;
let combatOver5 = 0;
let combatOver2 = 0;

const testCount = 90;

// 按阶段分组统计
const stages = [
  { name: '练气期', range: [1, 10] },
  { name: '筑基期', range: [11, 20] },
  { name: '金丹期', range: [21, 30] },
  { name: '元婴期', range: [31, 40] },
  { name: '化神期', range: [41, 50] },
  { name: '炼虚期', range: [51, 60] },
  { name: '合体期', range: [61, 70] },
  { name: '大乘期', range: [71, 80] },
  { name: '灵虚期', range: [81, 90] }
];

console.log('┌──────────┬────────────┬────────────┬────────────┬────────────┐');
console.log('│  境界    │ 修为平均   │ 修为最大   │ 战力平均   │ 战力最大   │');
console.log('│          │  偏差率    │  偏差率    │  偏差率    │  偏差率    │');
console.log('├──────────┼────────────┼────────────┼────────────┼────────────┤');

stages.forEach(stage => {
  let stageExpDev = 0;
  let stageCombatDev = 0;
  let maxExpDev = 0;
  let maxCombatDev = 0;
  let count = 0;
  
  for (let level = stage.range[0]; level <= stage.range[1]; level++) {
    const calcExp = system.calculate(level, 'exp');
    const calcCombat = system.calculate(level, 'combat');
    const realExp = realGameData[level]?.exp || 0;
    const realCombat = realGameData[level]?.combat || 0;
    
    const expDev = realExp > 0 ? Math.abs((calcExp - realExp) / realExp * 100) : 0;
    const combatDev = realCombat > 0 ? Math.abs((calcCombat - realCombat) / realCombat * 100) : 0;
    
    stageExpDev += expDev;
    stageCombatDev += combatDev;
    maxExpDev = Math.max(maxExpDev, expDev);
    maxCombatDev = Math.max(maxCombatDev, combatDev);
    
    totalExpDev += expDev;
    totalCombatDev += combatDev;
    
    if (expDev > 10) expOver10++;
    if (expDev > 5) expOver5++;
    if (expDev > 2) expOver2++;
    if (combatDev > 10) combatOver10++;
    if (combatDev > 5) combatOver5++;
    if (combatDev > 2) combatOver2++;
    
    count++;
  }
  
  const avgExpDev = stageExpDev / count;
  const avgCombatDev = stageCombatDev / count;
  
  let expStatus = '🏆';
  if (avgExpDev > 10) expStatus = '❌';
  else if (avgExpDev > 5) expStatus = '⚠️';
  else if (avgExpDev > 2) expStatus = '🔶';
  else if (avgExpDev > 1) expStatus = '💎';
  
  let combatStatus = '🏆';
  if (avgCombatDev > 10) combatStatus = '❌';
  else if (avgCombatDev > 5) combatStatus = '⚠️';
  else if (avgCombatDev > 2) combatStatus = '🔶';
  else if (avgCombatDev > 1) combatStatus = '💎';
  
  console.log(`│${stage.name.padEnd(8)}│ ${avgExpDev.toFixed(2).padStart(7)}% ${expStatus}│ ${maxExpDev.toFixed(2).padStart(7)}% │ ${avgCombatDev.toFixed(2).padStart(7)}% ${combatStatus}│ ${maxCombatDev.toFixed(2).padStart(7)}% │`);
});

console.log('└──────────┴────────────┴────────────┴────────────┴────────────┘');

console.log('\n=== 整体统计 ===');
console.log(`修为平均偏差: ${(totalExpDev / testCount).toFixed(3)}%`);
console.log(`战力平均偏差: ${(totalCombatDev / testCount).toFixed(3)}%`);
console.log(`总体平均偏差: ${((totalExpDev + totalCombatDev) / (testCount * 2)).toFixed(3)}%`);

console.log('\n=== 偏差分布 ===');
console.log(`修为偏差>2%的等级数: ${expOver2}个`);
console.log(`修为偏差>5%的等级数: ${expOver5}个`);
console.log(`修为偏差>10%的等级数: ${expOver10}个`);
console.log(`战力偏差>2%的等级数: ${combatOver2}个`);
console.log(`战力偏差>5%的等级数: ${combatOver5}个`);
console.log(`战力偏差>10%的等级数: ${combatOver10}个`);

// 评级
let rating = '❌ 需要调优';
const avgDev = (totalExpDev + totalCombatDev) / (testCount * 2);
if (avgDev <= 1) rating = '🏆 完美';
else if (avgDev <= 3) rating = '💎 卓越';
else if (avgDev <= 5) rating = '✅ 优秀';
else if (avgDev <= 10) rating = '🔶 良好';

console.log(`\n系统评级: ${rating}`);

// 详细对比表格（关键等级）
console.log('\n=== 关键等级详细对比 ===');
const keyLevels = [11, 15, 20, 21, 25, 30, 31, 35, 40, 41, 45, 50, 51, 55, 60, 61, 65, 70, 71, 75, 80, 81, 85, 90];

console.log('┌─────┬──────────────┬─────────────────┬─────────────────┬──────────┐');
console.log('│等级 │   境界名称   │   计算修为值    │   真实修为值    │  偏差率  │');
console.log('├─────┼──────────────┼─────────────────┼─────────────────┼──────────┤');

keyLevels.forEach(level => {
  const calculated = system.calculate(level, 'exp');
  const real = realGameData[level]?.exp || 0;
  const deviation = real > 0 ? Math.abs((calculated - real) / real * 100) : 0;
  const realmInfo = system.getRealmInfo(level);
  
  const formatNumber = (num) => {
    if (num >= 1e15) return (num / 1e15).toFixed(1) + '千万亿';
    if (num >= 1e12) return (num / 1e12).toFixed(1) + '万亿';
    if (num >= 1e9) return (num / 1e9).toFixed(1) + '十亿';
    if (num >= 1e6) return (num / 1e6).toFixed(1) + '百万';
    if (num >= 1e3) return (num / 1e3).toFixed(1) + '千';
    return num.toLocaleString();
  };
  
  let status = '🏆';
  if (deviation > 10) status = '❌';
  else if (deviation > 5) status = '⚠️';
  else if (deviation > 2) status = '🔶';
  else if (deviation > 1) status = '💎';
  
  console.log(`│${level.toString().padStart(4)} │${realmInfo.stage.padEnd(12)}│${formatNumber(calculated).padStart(15)} │${formatNumber(real).padStart(15)} │${deviation.toFixed(2).padStart(7)}% ${status}│`);
});

console.log('└─────┴──────────────┴─────────────────┴─────────────────┴──────────┘');

console.log('\n✅ 测试完成！');
