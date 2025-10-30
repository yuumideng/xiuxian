/**
 * 战斗系统测试脚本
 * 
 * 测试内容：
 * 1. 属性成长验证
 * 2. 战斗力计算验证
 * 3. 回合制战斗模拟
 */

import { calculateBattleAttributes, calculatePower, getAttributeGrowth } from './src/utils/battleCalculator.js'
import { BattleSystem, simulateBattles } from './src/utils/battleSystem.js'
import { formatNumber } from './src/utils/numberFormatter.js'

console.log('╔════════════════════════════════════════════════════════════╗')
console.log('║              战斗系统测试报告                              ║')
console.log('╚════════════════════════════════════════════════════════════╝\n')

// ==================== 测试1：属性成长验证 ====================
console.log('【测试1】属性成长验证 - 验证每大境界翻倍机制')
console.log('═══════════════════════════════════════════════════════════\n')

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

console.log('境界等级 | 攻击 | 防御 | 血量 | 战斗力 | 增长率')
console.log('─────────────────────────────────────────────────────────')

let prevPower = 0
testLevels.forEach(test => {
  const attrs = calculateBattleAttributes({ level: test.level, combat: 0 })
  const power = calculatePower(attrs)
  const growthRate = prevPower > 0 ? ((power / prevPower - 1) * 100).toFixed(1) + '%' : '-'
  
  console.log(
    `${test.name.padEnd(12)} | ${attrs.attack.toString().padStart(4)} | ${attrs.defense.toString().padStart(4)} | ${attrs.hp.toString().padStart(5)} | ${power.toString().padStart(6)} | ${growthRate.padStart(6)}`
  )
  
  prevPower = power
})

// ==================== 测试2：战斗力权重验证 ====================
console.log('\n【测试2】战斗力权重验证')
console.log('═══════════════════════════════════════════════════════════\n')

const level20Attrs = calculateBattleAttributes({ level: 20, combat: 0 })
console.log('筑基大圆满(20级)属性详情：')
console.log(`  攻击: ${level20Attrs.attack} (权重28%)`)
console.log(`  防御: ${level20Attrs.defense} (权重28%)`)
console.log(`  血量: ${level20Attrs.hp} (权重20%)`)
console.log(`  速度: ${level20Attrs.speed} (权重6%)`)
console.log(`  暴击: ${level20Attrs.crit} (权重6%)`)
console.log(`  韧性: ${level20Attrs.toughness} (权重6%)`)
console.log(`  闪避: ${level20Attrs.dodge} (权重3%)`)
console.log(`  命中: ${level20Attrs.hit} (权重3%)`)

const power20 = calculatePower(level20Attrs)
console.log(`\n  总战斗力: ${power20}`)

// 验证权重计算
const manualPower = 
  level20Attrs.attack * 0.28 +
  level20Attrs.defense * 0.28 +
  level20Attrs.hp * 0.20 +
  level20Attrs.speed * 0.06 +
  level20Attrs.crit * 0.06 +
  level20Attrs.toughness * 0.06 +
  level20Attrs.dodge * 0.03 +
  level20Attrs.hit * 0.03

console.log(`  手动计算: ${Math.floor(manualPower)}`)
console.log(`  ${power20 === Math.floor(manualPower) ? '✅ 权重计算正确' : '❌ 权重计算错误'}`)

// ==================== 测试3：战斗经验影响 ====================
console.log('\n【测试3】战斗经验影响测试')
console.log('═══════════════════════════════════════════════════════════\n')

const combatTests = [
  { combat: 0, name: '无战斗经验' },
  { combat: 1000000, name: '100万战斗经验' },
  { combat: 10000000, name: '1000万战斗经验' },
  { combat: 100000000, name: '1亿战斗经验' }
]

console.log('筑基初期(11级)在不同战斗经验下的属性：')
console.log('战斗经验 | 攻击 | 防御 | 血量 | 战斗力 | 提升率')
console.log('─────────────────────────────────────────────────────────')

let basePower = 0
combatTests.forEach((test, index) => {
  const attrs = calculateBattleAttributes({ level: 11, combat: test.combat })
  const power = calculatePower(attrs)
  
  if (index === 0) basePower = power
  const increase = ((power / basePower - 1) * 100).toFixed(2) + '%'
  
  console.log(
    `${test.name.padEnd(14)} | ${attrs.attack.toString().padStart(4)} | ${attrs.defense.toString().padStart(4)} | ${attrs.hp.toString().padStart(5)} | ${power.toString().padStart(6)} | ${increase.padStart(7)}`
  )
})

// ==================== 测试4：回合制战斗模拟 ====================
console.log('\n【测试4】回合制战斗模拟')
console.log('═══════════════════════════════════════════════════════════\n')

// 创建两个测试角色
const player1Attrs = calculateBattleAttributes({ level: 15, combat: 5000000 })
const player1 = {
  name: '筑基中期修士',
  ...player1Attrs
}

const player2Attrs = calculateBattleAttributes({ level: 14, combat: 4500000 })
const player2 = {
  name: '筑基初期巅峰修士',
  ...player2Attrs
}

console.log('对战双方属性：')
console.log(`\n${player1.name}:`)
console.log(`  血量: ${player1.hp}, 攻击: ${player1.attack}, 防御: ${player1.defense}`)
console.log(`  速度: ${player1.speed}, 暴击: ${player1.crit}, 韧性: ${player1.toughness}`)
console.log(`  闪避: ${player1.dodge}, 命中: ${player1.hit}`)
console.log(`  战斗力: ${calculatePower(player1)}`)

console.log(`\n${player2.name}:`)
console.log(`  血量: ${player2.hp}, 攻击: ${player2.attack}, 防御: ${player2.defense}`)
console.log(`  速度: ${player2.speed}, 暴击: ${player2.crit}, 韧性: ${player2.toughness}`)
console.log(`  闪避: ${player2.dodge}, 命中: ${player2.hit}`)
console.log(`  战斗力: ${calculatePower(player2)}`)

console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
console.log('开始战斗...\n')

const battle = new BattleSystem(player1, player2)
const result = battle.startBattle()

// 显示战斗日志（只显示前10回合和最后结果）
const logsToShow = result.battleLog.slice(0, 11)
logsToShow.forEach(log => {
  if (log.message) {
    console.log(`[回合${log.round}] ${log.message}`)
  }
})

if (result.battleLog.length > 11) {
  console.log(`... (省略${result.battleLog.length - 11}条日志) ...`)
}

console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
console.log('战斗结果：')
console.log(`  获胜者: ${result.winnerName}`)
console.log(`  战斗回合数: ${result.rounds}`)
console.log(`  ${result.timeout ? '(超时判定)' : ''}`)

// 显示战斗统计
const stats = battle.getBattleStats()
console.log('\n战斗统计：')
console.log(`  ${stats.attacker.name}:`)
console.log(`    命中次数: ${stats.attacker.hits}, 暴击次数: ${stats.attacker.crits}`)
console.log(`    总伤害: ${stats.attacker.totalDamage}, 平均伤害: ${stats.attacker.avgDamage}`)
console.log(`  ${stats.defender.name}:`)
console.log(`    命中次数: ${stats.defender.hits}, 暴击次数: ${stats.defender.crits}`)
console.log(`    总伤害: ${stats.defender.totalDamage}, 平均伤害: ${stats.defender.avgDamage}`)

// ==================== 测试5：胜率模拟 ====================
console.log('\n【测试5】胜率模拟（100场战斗）')
console.log('═══════════════════════════════════════════════════════════\n')

const winRateResult = simulateBattles(player1, player2, 100)
console.log(`${player1.name} 胜率: ${winRateResult.attackerWinRate}`)
console.log(`${player2.name} 胜率: ${winRateResult.defenderWinRate}`)
console.log(`平均回合数: ${winRateResult.avgRounds}`)

// ==================== 测试6：跨境界战斗 ====================
console.log('\n【测试6】跨境界战斗测试')
console.log('═══════════════════════════════════════════════════════════\n')

const highLevelAttrs = calculateBattleAttributes({ level: 21, combat: 0 })
const highLevel = {
  name: '金丹初期修士',
  ...highLevelAttrs
}

const lowLevelAttrs = calculateBattleAttributes({ level: 20, combat: 0 })
const lowLevel = {
  name: '筑基大圆满修士',
  ...lowLevelAttrs
}

console.log(`${highLevel.name} (战斗力: ${calculatePower(highLevel)})`)
console.log(`  VS`)
console.log(`${lowLevel.name} (战斗力: ${calculatePower(lowLevel)})`)

const crossRealmResult = simulateBattles(highLevel, lowLevel, 100)
console.log(`\n100场战斗结果：`)
console.log(`  ${highLevel.name} 胜率: ${crossRealmResult.attackerWinRate}`)
console.log(`  ${lowLevel.name} 胜率: ${crossRealmResult.defenderWinRate}`)
console.log(`  平均回合数: ${crossRealmResult.avgRounds}`)

console.log('\n╔════════════════════════════════════════════════════════════╗')
console.log('║                  测试完成                                  ║')
console.log('╚════════════════════════════════════════════════════════════╝')
