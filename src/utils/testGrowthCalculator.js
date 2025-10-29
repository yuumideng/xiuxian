// 测试增长速率计算器
import { calculateExpGrowthRate, calculateCombatGrowthRate, getGrowthRateDetails, getRealmCoefficient } from './growthCalculator.js'

// 测试函数
export function testGrowthCalculator() {
  console.log('=== 修为和战斗经验增长速率计算测试 ===')
  
  // 测试不同境界的玩家
  const testPlayers = [
    { level: 1, baseExpSpeed: 1, baseCombatSpeed: 1 }, // 练气一层
    { level: 10, baseExpSpeed: 1, baseCombatSpeed: 1 }, // 练气大圆满
    { level: 20, baseExpSpeed: 1, baseCombatSpeed: 1 }, // 筑基大圆满
    { level: 30, baseExpSpeed: 1, baseCombatSpeed: 1 }, // 金丹大圆满
    { level: 50, baseExpSpeed: 1, baseCombatSpeed: 1 }, // 化神大圆满
  ]
  
  testPlayers.forEach(player => {
    console.log(`\n--- 境界等级 ${player.level} ---`)
    
    // 获取境界系数
    const realmCoefficient = getRealmCoefficient(player.level)
    console.log(`境界系数: ${realmCoefficient.toFixed(2)}`)
    
    // 计算增长速率
    const expRate = calculateExpGrowthRate(player, player.baseExpSpeed)
    const combatRate = calculateCombatGrowthRate(player, player.baseCombatSpeed)
    
    console.log(`修为增长速率: ${expRate.toLocaleString()}/秒`)
    console.log(`战斗经验增长速率: ${combatRate.toLocaleString()}/秒`)
    
    // 获取详细信息
    const details = getGrowthRateDetails(player)
    console.log(`A值: ${details.A.toFixed(1)}`)
    console.log(`最终倍率: ${details.expFinalMultiplier.toLocaleString()}`)
  })
  
  console.log('\n=== 测试完成 ===')
}

// 如果直接运行此文件，执行测试
if (typeof window === 'undefined') {
  testGrowthCalculator()
}