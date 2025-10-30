/**
 * 示例：如何添加和计算新境界
 * 
 * 场景：你想添加"灵神期"（111-120级）的数值
 */

import { unifiedCultivationSystem, utils } from '../src/system/unified_cultivation_system.js';

console.log('╔════════════════════════════════════════════════════════════════════════════════╗');
console.log('║                    添加新境界示例 - 灵神期（111-120级）                       ║');
console.log('╚════════════════════════════════════════════════════════════════════════════════╝\n');

// 步骤1：准备初始值
console.log('📝 步骤1：准备初始值');
console.log('─────────────────────────────────────────────────────────────────────────────────');
console.log('假设你已经确定了灵神期的初始值：');
console.log('  - 111级修为：6.5亿亿');
console.log('  - 111级战力：4.8亿亿');
console.log('');
console.log('请在 src/data/realm_initial_values.js 中添加：');
console.log('```javascript');
console.log('{');
console.log('  level: 111,');
console.log('  realmName: \'灵神\',');
console.log('  cultivation: 650000000000000000,  // 6.5亿亿');
console.log('  combat: 480000000000000000,       // 4.8亿亿');
console.log('  note: \'新增境界\'');
console.log('}');
console.log('```\n');

// 步骤2：模拟计算（假设已添加）
console.log('📊 步骤2：系统自动计算完整数值');
console.log('─────────────────────────────────────────────────────────────────────────────────');
console.log('添加初始值后，系统会自动使用 growthCurve 计算111-120级的所有数值：\n');

// 模拟数据（实际使用时会从 realm_initial_values.js 读取）
const mockInitialExp = 650000000000000000;  // 6.5亿亿
const mockInitialCombat = 480000000000000000;  // 4.8亿亿

// 手动计算示例（展示计算逻辑）
const mockRealmData = [];
let currentExp = mockInitialExp;
let currentCombat = mockInitialCombat;

const growthCurve = [
  { progress: 0.000, ratio: 2.6 },
  { progress: 0.125, ratio: 1.9 },
  { progress: 0.250, ratio: 1.656 },
  { progress: 0.375, ratio: 1.533 },
  { progress: 0.500, ratio: 1.450 },
  { progress: 0.625, ratio: 1.391 },
  { progress: 0.750, ratio: 1.360 },
  { progress: 0.875, ratio: 1.318 },
  { progress: 1.000, ratio: 1.3 }
];

function interpolateRatio(progress, curve) {
  progress = Math.max(0, Math.min(1, progress));
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

const stages = [
  '初期', '初期大成', '初期巅峰',
  '中期', '中期大成', '中期巅峰',
  '后期', '后期大成', '后期巅峰',
  '大圆满'
];

for (let i = 0; i < 10; i++) {
  mockRealmData.push({
    level: 111 + i,
    stage: stages[i],
    exp: Math.round(currentExp),
    combat: Math.round(currentCombat)
  });
  
  if (i < 9) {
    const progress = i / 8;
    const ratio = interpolateRatio(progress, growthCurve);
    currentExp *= ratio;
    currentCombat *= ratio;
  }
}

// 打印表格
console.log('╔════════════════════════════════════════════════════════════════════════════════╗');
console.log('║  灵神期 (111-120级) 数值表                                                    ║');
console.log('╠════════════════════════════════════════════════════════════════════════════════╣');
console.log('║ 等级 │ 阶段           │ 修为需求              │ 战斗经验需求          ║');
console.log('╠════════════════════════════════════════════════════════════════════════════════╣');

mockRealmData.forEach(data => {
  const levelStr = data.level.toString().padStart(4);
  const stageStr = data.stage.padEnd(14);
  const expStr = utils.formatNumber(data.exp).padStart(20);
  const combatStr = utils.formatNumber(data.combat).padStart(20);
  console.log(`║ ${levelStr} │ ${stageStr} │ ${expStr} │ ${combatStr} ║`);
});

console.log('╚════════════════════════════════════════════════════════════════════════════════╝\n');

// 步骤3：验证增长比例
console.log('🔍 步骤3：验证增长比例');
console.log('─────────────────────────────────────────────────────────────────────────────────');
console.log('检查每级之间的增长倍数是否符合 growthCurve：\n');

for (let i = 1; i < mockRealmData.length; i++) {
  const expRatio = mockRealmData[i].exp / mockRealmData[i - 1].exp;
  const combatRatio = mockRealmData[i].combat / mockRealmData[i - 1].combat;
  const progress = (i - 1) / 8;
  const expectedRatio = interpolateRatio(progress, growthCurve);
  
  console.log(`${mockRealmData[i - 1].level}→${mockRealmData[i].level}级:`);
  console.log(`  实际增长: 修为 ${expRatio.toFixed(4)}倍, 战力 ${combatRatio.toFixed(4)}倍`);
  console.log(`  预期增长: ${expectedRatio.toFixed(4)}倍 (progress=${progress.toFixed(3)})`);
  console.log('');
}

// 步骤4：导出游戏配置
console.log('📤 步骤4：导出游戏配置格式');
console.log('─────────────────────────────────────────────────────────────────────────────────');
console.log('可以直接复制以下代码到游戏配置文件中：\n');

console.log('  // 灵神期 (111-120级)');
mockRealmData.forEach(data => {
  console.log(`  ${data.level}: { exp: ${data.exp}, combat: ${data.combat}, realm: "灵神", stage: "${data.stage}" },`);
});

console.log('\n╔════════════════════════════════════════════════════════════════════════════════╗');
console.log('║                              完成！                                            ║');
console.log('╠════════════════════════════════════════════════════════════════════════════════╣');
console.log('║  现在你可以：                                                                  ║');
console.log('║  1. 将初始值添加到 realm_initial_values.js                                    ║');
console.log('║  2. 运行 node test_unified_system.js 验证                                      ║');
console.log('║  3. 使用 unifiedCultivationSystem.calculateRealm(111) 获取数据                ║');
console.log('╚════════════════════════════════════════════════════════════════════════════════╝');
