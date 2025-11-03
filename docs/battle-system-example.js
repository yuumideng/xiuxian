/**
 * 战斗系统使用示例
 * 展示如何在实际游戏中集成回合制战斗和爬塔系统
 */

import { 
  calculateBattleAttributes,
  calculatePower,
  executeBattle,
  generateTowerEnemy,
  estimateTowerFloors,
  getTowerRewards,
  getAttributeInfo
} from '@/utils/battleCalculator'

// ============================================================
// 示例1：简单战斗
// ============================================================

export function example1_SimpleBattle() {
  console.log('=== 示例1：简单战斗 ===\n')
  
  // 获取玩家属性
  const player = {
    level: 10,
    talents: null,
    immortalRanking: null
  }
  const playerAttrs = calculateBattleAttributes(player)
  
  // 生成第5层敌人
  const enemy = generateTowerEnemy(playerAttrs, 5)
  
  // 执行战斗（不显示详细日志）
  const result = executeBattle(playerAttrs, enemy, false)
  
  console.log(`战斗结果: ${result.victory ? '胜利' : '失败'}`)
  console.log(`回合数: ${result.rounds}`)
  console.log(`玩家剩余HP: ${result.playerFinalHp}/${playerAttrs.hp}`)
  console.log(`HP百分比: ${(result.playerFinalHp / playerAttrs.hp * 100).toFixed(1)}%\n`)
}

// ============================================================
// 示例2：详细战斗日志
// ============================================================

export function example2_DetailedBattle() {
  console.log('=== 示例2：详细战斗日志 ===\n')
  
  const player = { level: 10, talents: null, immortalRanking: null }
  const playerAttrs = calculateBattleAttributes(player)
  const enemy = generateTowerEnemy(playerAttrs, 1)
  
  // 执行战斗（显示详细日志）
  const result = executeBattle(playerAttrs, enemy, true)
  
  console.log(`战斗结果: ${result.victory ? '✅ 胜利' : '❌ 失败'}`)
  console.log(`\n战斗日志（前10回合）:`)
  result.battleLog.slice(0, 10).forEach(log => console.log(`  ${log}`))
  console.log('\n')
}

// ============================================================
// 示例3：爬塔挑战
// ============================================================

export function example3_TowerChallenge() {
  console.log('=== 示例3：爬塔挑战 ===\n')
  
  const player = { level: 10, talents: null, immortalRanking: null }
  const playerAttrs = calculateBattleAttributes(player)
  const playerPower = calculatePower(playerAttrs)
  
  console.log(`玩家战力: ${playerPower}`)
  console.log(`开始爬塔...\n`)
  
  let currentFloor = 1
  let maxFloor = 0
  
  // 模拟爬塔（最多尝试50层）
  while (currentFloor <= 50) {
    const enemy = generateTowerEnemy(playerAttrs, currentFloor)
    const result = executeBattle(playerAttrs, enemy, false)
    
    if (result.victory) {
      maxFloor = currentFloor
      const info = getAttributeInfo(enemy.boostedAttr)
      console.log(`✅ 第${currentFloor}层通过 - 强化属性: ${info.icon}${info.name}`)
      currentFloor++
    } else {
      console.log(`❌ 第${currentFloor}层失败`)
      break
    }
  }
  
  console.log(`\n最终通过: ${maxFloor}层`)
  
  if (maxFloor > 0) {
    const reward = getTowerRewards(maxFloor)
    console.log(`获得奖励: ${reward.description}\n`)
  }
}

// ============================================================
// 示例4：预估通关层数
// ============================================================

export function example4_EstimateFloors() {
  console.log('=== 示例4：预估通关层数 ===\n')
  
  // 测试不同境界的通关层数
  const levels = [1, 5, 10, 11, 15, 20, 21, 25, 30]
  
  console.log('境界等级 | 战力 | 预计通关 | 奖励')
  console.log('-'.repeat(50))
  
  levels.forEach(level => {
    const player = { level, talents: null, immortalRanking: null }
    const attrs = calculateBattleAttributes(player)
    const power = calculatePower(attrs)
    const maxFloor = estimateTowerFloors(attrs)
    const reward = getTowerRewards(maxFloor)
    
    const realmName = ['练气', '筑基', '金丹', '元婴', '化神'][Math.floor((level - 1) / 10)]
    const subLevel = ((level - 1) % 10) + 1
    
    console.log(
      `${realmName}${subLevel}层`.padEnd(10, '　') +
      `| ${power.toString().padStart(8)} ` +
      `| ${maxFloor.toString().padStart(3)}层 ` +
      `| ${reward.description}`
    )
  })
  console.log('\n')
}

// ============================================================
// 示例5：属性轮换分析
// ============================================================

export function example5_AttributeRotation() {
  console.log('=== 示例5：属性轮换分析 ===\n')
  
  const player = { level: 10, talents: null, immortalRanking: null }
  const playerAttrs = calculateBattleAttributes(player)
  const playerPower = calculatePower(playerAttrs)
  
  console.log('层数 | 强化属性 | 敌人战力 | 战力比 | 难度')
  console.log('-'.repeat(60))
  
  for (let floor = 1; floor <= 16; floor++) {
    const enemy = generateTowerEnemy(playerAttrs, floor)
    const enemyPower = calculatePower(enemy)
    const powerRatio = (enemyPower / playerPower * 100).toFixed(1)
    const info = getAttributeInfo(enemy.boostedAttr)
    
    // 根据战力比判断难度
    let difficulty = ''
    if (powerRatio < 55) difficulty = '简单'
    else if (powerRatio < 65) difficulty = '中等'
    else if (powerRatio < 75) difficulty = '困难'
    else difficulty = '极难'
    
    console.log(
      `${floor.toString().padStart(2)}层 ` +
      `| ${info.icon}${info.name.padEnd(6, '　')} ` +
      `| ${enemyPower.toString().padStart(7)} ` +
      `| ${powerRatio.padStart(5)}% ` +
      `| ${difficulty}`
    )
  }
  console.log('\n')
}

// ============================================================
// 示例6：战斗统计分析
// ============================================================

export function example6_BattleStatistics() {
  console.log('=== 示例6：战斗统计分析 ===\n')
  
  const player = { level: 10, talents: null, immortalRanking: null }
  const playerAttrs = calculateBattleAttributes(player)
  
  // 对同一层进行100次战斗，统计胜率
  const floor = 20
  const enemy = generateTowerEnemy(playerAttrs, floor)
  const trials = 100
  
  let victories = 0
  let totalRounds = 0
  let totalHpRemaining = 0
  
  console.log(`对第${floor}层进行${trials}次战斗测试...\n`)
  
  for (let i = 0; i < trials; i++) {
    const result = executeBattle(playerAttrs, enemy, false)
    if (result.victory) {
      victories++
      totalRounds += result.rounds
      totalHpRemaining += result.playerFinalHp
    }
  }
  
  const winRate = (victories / trials * 100).toFixed(1)
  const avgRounds = victories > 0 ? (totalRounds / victories).toFixed(1) : 0
  const avgHpPercent = victories > 0 
    ? (totalHpRemaining / victories / playerAttrs.hp * 100).toFixed(1) 
    : 0
  
  console.log(`胜率: ${winRate}% (${victories}/${trials})`)
  console.log(`平均回合数: ${avgRounds}`)
  console.log(`平均剩余HP: ${avgHpPercent}%`)
  console.log('\n')
}

// ============================================================
// 运行所有示例
// ============================================================

export function runAllExamples() {
  example1_SimpleBattle()
  example2_DetailedBattle()
  example3_TowerChallenge()
  example4_EstimateFloors()
  example5_AttributeRotation()
  example6_BattleStatistics()
}

// 如果直接运行此文件
if (import.meta.url === `file://${process.argv[1]}`) {
  runAllExamples()
}
