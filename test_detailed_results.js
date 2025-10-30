// 生成每个等级的详细测试结果
import { CultivationSystem } from './system/cultivation_system.js';
import { realGameData } from './data/game_data.js';

const system = new CultivationSystem();

console.log('\n╔════════════════════════════════════════════════════════════════════════════════╗');
console.log('║                    修仙数值系统 - 全部90级详细测试结果                          ║');
console.log('╚════════════════════════════════════════════════════════════════════════════════╝\n');

const formatNumber = (num) => {
  if (num >= 1e8) {
    // 计算是多少个"亿"
    const yiCount = Math.floor(Math.log10(num) / 8);
    const divisor = Math.pow(10, yiCount * 8);
    const value = (num / divisor).toFixed(2);
    
    if (yiCount === 1) {
      return value + '亿';
    } else if (yiCount <= 5) {
      // 2-5个亿：亿亿、亿亿亿、亿亿亿亿、亿亿亿亿亿
      return value + '亿'.repeat(yiCount);
    } else {
      // 超过5个亿：使用角标
      const superscripts = ['⁰', '¹', '²', '³', '⁴', '⁵', '⁶', '⁷', '⁸', '⁹'];
      const countStr = yiCount.toString();
      const superscript = countStr.split('').map(d => superscripts[parseInt(d)]).join('');
      return value + '亿' + superscript;
    }
  } else if (num >= 1e4) {
    return (num / 1e4).toFixed(2) + '万';
  } else {
    return num.toFixed(0);
  }
};

const getStatus = (dev) => {
  if (dev <= 1) return '🏆';
  if (dev <= 2) return '💎';
  if (dev <= 5) return '🔶';
  if (dev <= 10) return '⚠️';
  return '❌';
};

console.log('┌─────┬──────────────┬─────────────┬─────────────┬─────────┬─────────────┬─────────────┬─────────┐');
console.log('│等级 │   境界名称   │  计算修为   │  真实修为   │修为偏差 │  计算战力   │  真实战力   │战力偏差 │');
console.log('├─────┼──────────────┼─────────────┼─────────────┼─────────┼─────────────┼─────────────┼─────────┤');

let totalExpDev = 0;
let totalCombatDev = 0;

for (let level = 1; level <= 90; level++) {
  const calcExp = system.calculate(level, 'exp');
  const calcCombat = system.calculate(level, 'combat');
  const realExp = realGameData[level]?.exp || 0;
  const realCombat = realGameData[level]?.combat || 0;
  
  const expDev = realExp > 0 ? Math.abs((calcExp - realExp) / realExp * 100) : 0;
  const combatDev = realCombat > 0 ? Math.abs((calcCombat - realCombat) / realCombat * 100) : 0;
  
  totalExpDev += expDev;
  totalCombatDev += combatDev;
  
  const realmInfo = system.getRealmInfo(level);
  const expStatus = getStatus(expDev);
  const combatStatus = getStatus(combatDev);
  
  console.log(`│${level.toString().padStart(4)} │${realmInfo.stage.padEnd(12)}│${formatNumber(calcExp).padStart(11)} │${formatNumber(realExp).padStart(11)} │${expDev.toFixed(2).padStart(6)}% ${expStatus}│${formatNumber(calcCombat).padStart(11)} │${formatNumber(realCombat).padStart(11)} │${combatDev.toFixed(2).padStart(6)}% ${combatStatus}│`);
}

console.log('└─────┴──────────────┴─────────────┴─────────────┴─────────┴─────────────┴─────────────┴─────────┘');

const avgExpDev = totalExpDev / 90;
const avgCombatDev = totalCombatDev / 90;
const totalAvgDev = (avgExpDev + avgCombatDev) / 2;

let finalRating = '❌ 需要调优';
if (totalAvgDev <= 1) finalRating = '🏆 完美';
else if (totalAvgDev <= 3) finalRating = '💎 卓越';
else if (totalAvgDev <= 5) finalRating = '✅ 优秀';
else if (totalAvgDev <= 10) finalRating = '🔶 良好';

console.log('\n═══════════════════════════════════════════════════════════════════════════');
console.log('  整体统计');
console.log('═══════════════════════════════════════════════════════════════════════════');
console.log(`  修为平均偏差: ${avgExpDev.toFixed(3)}%`);
console.log(`  战力平均偏差: ${avgCombatDev.toFixed(3)}%`);
console.log(`  总体平均偏差: ${totalAvgDev.toFixed(3)}%`);
console.log(`  系统评级: ${finalRating}`);
console.log('═══════════════════════════════════════════════════════════════════════════\n');
