/**
 * 战斗属性系统 V1.0 vs V2.0 对比
 */

import { calculateBattleAttributes, calculatePower } from './src/utils/battleCalculator.js'

console.log('='.repeat(80))
console.log('战斗属性系统 V1.0 vs V2.0 对比')
console.log('='.repeat(80))

// V1.0 计算函数（旧版本）
function calculateBattleAttributesV1(player) {
  const level = player.level
  const combat = player.combat
  
  const levelMultiplier = Math.pow(2, (level - 1) / 10)
  const combatBonus = Math.min(0.2, Math.log10(combat + 1) / 50)
  const combatMultiplier = 1 + combatBonus
  const totalMultiplier = levelMultiplier * combatMultiplier
  
  const baseAttributes = {
    hp: 1000,
    attack: 100,
    defense: 100,
    speed: 100,
    crit: 50,
    toughness: 50,
    dodge: 30,
    hit: 80
  }
  
  const growthRates = {
    hp: 1.0,
    attack: 1.0,
    defense: 1.0,
    speed: 0.95,
    crit: 0.98,
    toughness: 0.98,
    dodge: 0.92,
    hit: 0.95
  }
  
  const finalAttributes = {}
  for (let attr in baseAttributes) {
    finalAttributes[attr] = Math.floor(
      baseAttributes[attr] * totalMultiplier * growthRates[attr]
    )
  }
  
  return finalAttributes
}

function calculatePowerV1(attributes) {
  const weights = {
    attack: 0.28,
    defense: 0.28,
    hp: 0.20,
    speed: 0.06,
    crit: 0.06,
    toughness: 0.06,
    dodge: 0.03,
    hit: 0.03
  }
  
  let power = 0
  for (let attr in weights) {
    if (attributes[attr] !== undefined) {
      power += attributes[attr] * weights[attr]
    }
  }
  
  return Math.floor(power)
}

// 测试数据
const testLevels = [
  { level: 1, name: '练气一层' },
  { level: 10, name: '练气大圆满' },
  { level: 11, name: '筑基初期' },
  { level: 20, name: '筑基大圆满' },
  { level: 21, name: '金丹初期' },
  { level: 30, name: '金丹大圆满' },
  { level: 31, name: '元婴初期' },
  { level: 40, name: '元婴大圆满' }
]

console.log('\n【数值对比】\n')

testLevels.forEach(test => {
  const player = { level: test.level, combat: 0 }
  
  // V1.0
  const attrsV1 = calculateBattleAttributesV1(player)
  const powerV1 = calculatePowerV1(attrsV1)
  
  // V2.0
  const attrsV2 = calculateBattleAttributes(player)
  const powerV2 = calculatePower(attrsV2)
  
  console.log(`${test.name}（${test.level}级）`)
  console.log('  V1.0:')
  console.log(`    攻击: ${attrsV1.attack.toLocaleString()}, 防御: ${attrsV1.defense.toLocaleString()}, 血量: ${attrsV1.hp.toLocaleString()}`)
  console.log(`    战斗力: ${powerV1.toLocaleString()}`)
  console.log('  V2.0:')
  console.log(`    攻击: ${attrsV2.attack.toLocaleString()}, 防御: ${attrsV2.defense.toLocaleString()}, 血量: ${attrsV2.hp.toLocaleString()}`)
  console.log(`    战斗力: ${powerV2.toLocaleString()}`)
  console.log(`  倍率: V2.0 是 V1.0 的 ${(powerV2 / powerV1).toFixed(2)}x`)
  console.log()
})

// 成长曲线对比
console.log('='.repeat(80))
console.log('【成长曲线对比】')
console.log('='.repeat(80))

console.log('\nV1.0 - 练气境界（1-10级）：')
for (let level = 1; level <= 10; level++) {
  const player = { level, combat: 0 }
  const power = calculatePowerV1(calculateBattleAttributesV1(player))
  console.log(`  ${level}级: 战斗力 ${power.toLocaleString()}`)
}

console.log('\nV2.0 - 练气境界（1-10级）：')
for (let level = 1; level <= 10; level++) {
  const player = { level, combat: 0 }
  const power = calculatePower(calculateBattleAttributes(player))
  console.log(`  ${level}级: 战斗力 ${power.toLocaleString()}`)
}

console.log('\nV1.0 - 筑基境界（11-20级）：')
for (let level = 11; level <= 20; level++) {
  const player = { level, combat: 0 }
  const power = calculatePowerV1(calculateBattleAttributesV1(player))
  console.log(`  ${level}级: 战斗力 ${power.toLocaleString()}`)
}

console.log('\nV2.0 - 筑基境界（11-20级）：')
for (let level = 11; level <= 20; level++) {
  const player = { level, combat: 0 }
  const power = calculatePower(calculateBattleAttributes(player))
  console.log(`  ${level}级: 战斗力 ${power.toLocaleString()}`)
}

// 大境界倍率对比
console.log('\n' + '='.repeat(80))
console.log('【大境界倍率对比】')
console.log('='.repeat(80))

const realmTests = [
  { level: 10, name: '练气大圆满' },
  { level: 20, name: '筑基大圆满' },
  { level: 30, name: '金丹大圆满' },
  { level: 40, name: '元婴大圆满' }
]

console.log('\nV1.0:')
let prevPowerV1 = null
realmTests.forEach(test => {
  const player = { level: test.level, combat: 0 }
  const power = calculatePowerV1(calculateBattleAttributesV1(player))
  
  if (prevPowerV1) {
    const ratio = power / prevPowerV1
    console.log(`  ${test.name}: ${power.toLocaleString()} (${ratio.toFixed(2)}x)`)
  } else {
    console.log(`  ${test.name}: ${power.toLocaleString()}`)
  }
  
  prevPowerV1 = power
})

console.log('\nV2.0:')
let prevPowerV2 = null
realmTests.forEach(test => {
  const player = { level: test.level, combat: 0 }
  const power = calculatePower(calculateBattleAttributes(player))
  
  if (prevPowerV2) {
    const ratio = power / prevPowerV2
    console.log(`  ${test.name}: ${power.toLocaleString()} (${ratio.toFixed(2)}x)`)
  } else {
    console.log(`  ${test.name}: ${power.toLocaleString()}`)
  }
  
  prevPowerV2 = power
})

console.log('\n' + '='.repeat(80))
console.log('对比完成！')
console.log('='.repeat(80))
