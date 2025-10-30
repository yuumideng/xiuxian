/**
 * 测试统一修仙数值计算系统
 */

import { unifiedCultivationSystem, utils } from './src/system/unified_cultivation_system.js';

console.log('╔════════════════════════════════════════════════════════════════════════════════╗');
console.log('║                      统一修仙数值计算系统 - 测试报告                          ║');
console.log('╚════════════════════════════════════════════════════════════════════════════════╝\n');

console.log('📋 系统说明：');
console.log('  1. 练气期（1-10级）：使用原始真实数据');
console.log('  2. 其他所有境界：统一使用 growthCurve 增长模式');
console.log('  3. 增长曲线：2.6 → 1.9 → 1.656 → ... → 1.3（9个关键点）\n');

// 测试1：练气期
console.log('═══════════════════════════════════════════════════════════════════════════════');
console.log('测试1：练气期（1-10级）- 使用原始数据');
console.log('═══════════════════════════════════════════════════════════════════════════════');
utils.printRealmTable(1);

// 测试2：灵虚期
console.log('\n═══════════════════════════════════════════════════════════════════════════════');
console.log('测试2：灵虚期（81-90级）- 使用 growthCurve');
console.log('═══════════════════════════════════════════════════════════════════════════════');
utils.printRealmTable(81);

// 测试3：灵魄期
console.log('\n═══════════════════════════════════════════════════════════════════════════════');
console.log('测试3：灵魄期（91-100级）- 使用 growthCurve');
console.log('═══════════════════════════════════════════════════════════════════════════════');
utils.printRealmTable(91);

// 测试4：灵婴期
console.log('\n═══════════════════════════════════════════════════════════════════════════════');
console.log('测试4：灵婴期（101-110级）- 使用 growthCurve');
console.log('═══════════════════════════════════════════════════════════════════════════════');
utils.printRealmTable(101);

// 测试5：验证增长比例
console.log('\n═══════════════════════════════════════════════════════════════════════════════');
console.log('测试5：验证灵魄期增长比例');
console.log('═══════════════════════════════════════════════════════════════════════════════');

const lingpoData = unifiedCultivationSystem.calculateRealm(91);
console.log('\n增长比例验证：');
for (let i = 1; i < lingpoData.length; i++) {
  const expRatio = lingpoData[i].exp / lingpoData[i - 1].exp;
  const combatRatio = lingpoData[i].combat / lingpoData[i - 1].combat;
  console.log(`${lingpoData[i - 1].level}→${lingpoData[i].level}级: 修为 ${expRatio.toFixed(4)}倍, 战力 ${combatRatio.toFixed(4)}倍`);
}

// 测试6：导出游戏配置格式
console.log('\n═══════════════════════════════════════════════════════════════════════════════');
console.log('测试6：导出游戏配置格式（灵魄期）');
console.log('═══════════════════════════════════════════════════════════════════════════════\n');
console.log(unifiedCultivationSystem.exportRealmData(91));

// 测试7：获取所有已配置境界
console.log('\n═══════════════════════════════════════════════════════════════════════════════');
console.log('测试7：所有已配置境界列表');
console.log('═══════════════════════════════════════════════════════════════════════════════\n');

const allRealms = unifiedCultivationSystem.getAllConfiguredRealms();
console.log('已配置的境界：');
allRealms.forEach(realm => {
  const firstLevel = realm.levels[0];
  const lastLevel = realm.levels[9];
  console.log(`  ${realm.realmName}期 (${realm.realmStartLevel}-${realm.realmStartLevel + 9}级):`);
  console.log(`    起始值: 修为 ${utils.formatNumber(firstLevel.exp)}, 战力 ${utils.formatNumber(firstLevel.combat)}`);
  console.log(`    结束值: 修为 ${utils.formatNumber(lastLevel.exp)}, 战力 ${utils.formatNumber(lastLevel.combat)}`);
});

// 测试8：单个等级查询
console.log('\n═══════════════════════════════════════════════════════════════════════════════');
console.log('测试8：单个等级查询');
console.log('═══════════════════════════════════════════════════════════════════════════════\n');

const testLevels = [1, 10, 81, 91, 95, 100, 101, 110];
console.log('等级查询结果：');
testLevels.forEach(level => {
  try {
    const exp = unifiedCultivationSystem.calculate(level, 'exp');
    const combat = unifiedCultivationSystem.calculate(level, 'combat');
    console.log(`  ${level}级: 修为 ${utils.formatNumber(exp)}, 战力 ${utils.formatNumber(combat)}`);
  } catch (error) {
    console.log(`  ${level}级: ❌ ${error.message}`);
  }
});

console.log('\n╔════════════════════════════════════════════════════════════════════════════════╗');
console.log('║                              测试完成！                                        ║');
console.log('╚════════════════════════════════════════════════════════════════════════════════╝');
