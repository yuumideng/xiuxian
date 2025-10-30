/**
 * 新战斗属性系统测试
 * 测试新公式：result = 基础值 × (1 + 境界系数) × (1 + 加成) × (1 + 轮回加成) × (1 + 战斗倍率)
 */

import { calculateBattleAttributes, calculatePower, getRealmCoefficient } from './src/utils/battleCalculator.js'

console.log('='.repeat(80))
console.log('新战斗属性系统测试')
console.log('='.repeat(80))

console.log('\n【公式说明】')
console.log('result = 基础值 × (1 + 境界系数) × (1 + 加成) × (1 + 轮回加成) × (1 + 战斗倍率)')
console.log('\n【参数设定】')
console.log('- 境界系数：Math.floor((level - 1) / 10) + 1（每大境界+1）')
console.log('- 加成：1000（暂时写死）')
console.log('- 轮回加成：0（后续设计）')
console.log('- 战斗倍率：0（后续设计）')
console.log('\n【基础值】')
console.log('- 攻击：20')
console.log('- 闪避：20')
console.log('- 防御：10')
console.log('- 血量：100')
console.log('- 速度：100')
console.log('- 暴击：100')
console.log('- 韧性：100')
console.log('- 命中：100')

// 测试数据
const testLevels = [
  { level: 1, name: '练气一层' },
  { level: 5, name: '练气五层' },
  { level: 10, name: '练气大圆满' },
  { level: 11, name: '筑基初期' },
  { level: 15, name: '筑基五层' },
  { level: 20, name: '筑基大圆满' },
  { level: 21, name: '金丹初期' },
  { level: 30, name: '金丹大圆满' },
  { level: 31, name: '元婴初期' },
  { level: 40, name: '元婴大圆满' }
]

console.log('\n' + '='.repeat(80))
console.log('【属性成长测试】')
console.log('='.repeat(80))

testLevels.forEach(test => {
  const player = { level: test.level, combat: 0 }
  const attributes = calculateBattleAttributes(player)
  const power = calculatePower(attributes)
  const realmCoefficient = getRealmCoefficient(test.level)
  
  // 计算总倍率
  const totalMultiplier = (1 + realmCoefficient) * (1 + 1000) * (1 + 0) * (1 + 0)
  
  console.log(`\n${test.name}（${test.level}级）`)
  console.log(`  境界系数: ${realmCoefficient}`)
  console.log(`  总倍率: ${totalMultiplier.toFixed(2)}`)
  console.log(`  攻击: ${attributes.attack.toLocaleString()}`)
  console.log(`  防御: ${attributes.defense.toLocaleString()}`)
  console.log(`  血量: ${attributes.hp.toLocaleString()}`)
  console.log(`  速度: ${attributes.speed.toLocaleString()}`)
  console.log(`  暴击: ${attributes.crit.toLocaleString()}`)
  console.log(`  韧性: ${attributes.toughness.toLocaleString()}`)
  console.log(`  闪避: ${attributes.dodge.toLocaleString()}`)
  console.log(`  命中: ${attributes.hit.toLocaleString()}`)
  console.log(`  战斗力: ${power.toLocaleString()}`)
})

// 验证大境界倍率关系
console.log('\n' + '='.repeat(80))
console.log('【大境界倍率验证】')
console.log('='.repeat(80))

const realmTests = [
  { level: 10, name: '练气大圆满' },
  { level: 20, name: '筑基大圆满' },
  { level: 30, name: '金丹大圆满' },
  { level: 40, name: '元婴大圆满' }
]

let previousPower = null
realmTests.forEach(test => {
  const player = { level: test.level, combat: 0 }
  const attributes = calculateBattleAttributes(player)
  const power = calculatePower(attributes)
  
  if (previousPower) {
    const ratio = power / previousPower
    console.log(`\n${test.name} vs 上个大境界`)
    console.log(`  战斗力: ${power.toLocaleString()}`)
    console.log(`  倍率: ${ratio.toFixed(2)}x`)
  } else {
    console.log(`\n${test.name}`)
    console.log(`  战斗力: ${power.toLocaleString()}`)
  }
  
  previousPower = power
})

// 验证小境界增长
console.log('\n' + '='.repeat(80))
console.log('【小境界增长验证】')
console.log('='.repeat(80))

console.log('\n练气境界内（1-10级）：')
for (let level = 1; level <= 10; level++) {
  const player = { level, combat: 0 }
  const attributes = calculateBattleAttributes(player)
  const power = calculatePower(attributes)
  const realmCoefficient = getRealmCoefficient(level)
  
  console.log(`  ${level}级: 境界系数=${realmCoefficient}, 战斗力=${power.toLocaleString()}`)
}

console.log('\n筑基境界内（11-20级）：')
for (let level = 11; level <= 20; level++) {
  const player = { level, combat: 0 }
  const attributes = calculateBattleAttributes(player)
  const power = calculatePower(attributes)
  const realmCoefficient = getRealmCoefficient(level)
  
  console.log(`  ${level}级: 境界系数=${realmCoefficient}, 战斗力=${power.toLocaleString()}`)
}

console.log('\n' + '='.repeat(80))
console.log('测试完成！')
console.log('='.repeat(80))
