/**
 * 展示所有已配置境界的完整数据
 */

import { unifiedCultivationSystem, utils } from './src/system/unified_cultivation_system.js';

console.log('╔════════════════════════════════════════════════════════════════════════════════╗');
console.log('║                    修仙游戏 - 所有已配置境界数据总览                          ║');
console.log('╚════════════════════════════════════════════════════════════════════════════════╝\n');

const allRealms = unifiedCultivationSystem.getAllConfiguredRealms();

console.log(`📊 当前已配置 ${allRealms.length} 个境界\n`);

allRealms.forEach((realm, index) => {
  const firstLevel = realm.levels[0];
  const lastLevel = realm.levels[9];
  
  console.log(`${index + 1}. ${realm.realmName}期 (${realm.realmStartLevel}-${realm.realmStartLevel + 9}级)`);
  console.log(`   起始: 修为 ${utils.formatNumber(firstLevel.exp).padEnd(20)} 战力 ${utils.formatNumber(firstLevel.combat)}`);
  console.log(`   结束: 修为 ${utils.formatNumber(lastLevel.exp).padEnd(20)} 战力 ${utils.formatNumber(lastLevel.combat)}`);
  console.log('');
});

console.log('═══════════════════════════════════════════════════════════════════════════════');
console.log('详细数据表格');
console.log('═══════════════════════════════════════════════════════════════════════════════\n');

// 打印每个境界的详细表格
allRealms.forEach(realm => {
  utils.printRealmTable(realm.realmStartLevel);
  console.log('');
});

console.log('╔════════════════════════════════════════════════════════════════════════════════╗');
console.log('║                              数据展示完成                                      ║');
console.log('╚════════════════════════════════════════════════════════════════════════════════╝');
