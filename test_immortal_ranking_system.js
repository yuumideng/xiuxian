/**
 * 仙战榜系统测试脚本
 * 
 * 测试内容：
 * 1. 仙战榜初始化
 * 2. 单个大境界加成计算
 * 3. 随机属性分配
 * 4. 战斗属性加成累加
 * 5. 修炼速度加成累加
 * 6. 仙战榜详细信息
 * 7. 与其他系统的叠加效果
 */

import {
  calculateRealmBonus,
  randomAttribute,
  initializeImmortalRanking,
  addRealmBonus,
  calculateBattleAttributeBonuses,
  calculateCultivationSpeedBonuses,
  getImmortalRankingDetails,
  getImmortalRankingStatistics,
  IMMORTAL_RANKING_CONFIG
} from './src/utils/immortalRankingSystem.js'

import { calculateBattleAttributes, calculatePower } from './src/utils/battleCalculator.js'
import { calculateExpGrowthRate, calculateCombatGrowthRate } from './src/utils/growthCalculator.js'

console.log('========================================')
console.log('仙战榜系统测试')
console.log('========================================\n')

// 测试1: 单个大境界加成计算
console.log('【测试1】单个大境界加成计算')
console.log('----------------------------------------')
for (let realmLevel = 1; realmLevel <= 10; realmLevel++) {
  const bonus = calculateRealmBonus(realmLevel)
  console.log(`大境界${realmLevel}：加成 = ${bonus}`)
}
console.log()

// 测试2: 随机属性分配
console.log('【测试2】随机属性分配测试')
console.log('----------------------------------------')
console.log('可随机的属性：', IMMORTAL_RANKING_CONFIG.RANDOM_ATTRIBUTES)
console.log('随机10次测试：')
for (let i = 0; i < 10; i++) {
  const attr = randomAttribute()
  const name = IMMORTAL_RANKING_CONFIG.ATTRIBUTE_NAMES[attr]
  console.log(`  第${i+1}次：${attr} (${name})`)
}
console.log()

// 测试3: 仙战榜初始化
console.log('【测试3】仙战榜初始化')
console.log('----------------------------------------')
const ranking1 = initializeImmortalRanking(1)
console.log('练气期（大境界1）初始化：', ranking1)

const ranking3 = initializeImmortalRanking(3)
console.log('金丹期（大境界3）初始化：', ranking3)
console.log()

// 测试4: 添加新的大境界加成
console.log('【测试4】添加新的大境界加成')
console.log('----------------------------------------')
let testRanking = initializeImmortalRanking(1)
console.log('初始（大境界1）：', testRanking)

testRanking = addRealmBonus(testRanking, 2)
console.log('突破到筑基（大境界2）：', testRanking)

testRanking = addRealmBonus(testRanking, 3)
console.log('突破到金丹（大境界3）：', testRanking)
console.log()

// 测试5: 战斗属性加成累加
console.log('【测试5】战斗属性加成累加')
console.log('----------------------------------------')
const battleBonuses = calculateBattleAttributeBonuses(testRanking)
console.log('战斗属性总加成：', battleBonuses)
console.log()

// 测试6: 修炼速度加成累加
console.log('【测试6】修炼速度加成累加')
console.log('----------------------------------------')
const cultivationBonuses = calculateCultivationSpeedBonuses(testRanking)
console.log('修炼速度总加成：', cultivationBonuses)
console.log()

// 测试7: 仙战榜详细信息
console.log('【测试7】仙战榜详细信息')
console.log('----------------------------------------')
const details = getImmortalRankingDetails(testRanking)
console.log('仙战榜详细信息：')
console.log(`  ${details.icon} ${details.name}`)
console.log(`  描述：${details.description}`)
console.log('  各大境界加成：')
for (let realmBonus of details.realmBonuses) {
  console.log(`    大境界${realmBonus.realmLevel}：+${realmBonus.bonus} ${realmBonus.attributeName}`)
}
console.log('  战斗属性总加成：', details.totalBonuses.battle)
console.log('  修炼速度总加成：', details.totalBonuses.cultivation)
console.log()

// 测试8: 仙战榜统计信息
console.log('【测试8】仙战榜统计信息')
console.log('----------------------------------------')
const statistics = getImmortalRankingStatistics(testRanking)
console.log('统计信息：')
console.log(`  总大境界数：${statistics.totalRealmCount}`)
console.log(`  总加成值：${statistics.totalBonus}`)
console.log('  战斗属性加成：')
for (let attr in statistics.battleAttributes) {
  const info = statistics.battleAttributes[attr]
  console.log(`    ${info.name}：+${info.bonus}`)
}
console.log('  修炼速度加成：')
for (let attr in statistics.cultivationSpeeds) {
  const info = statistics.cultivationSpeeds[attr]
  console.log(`    ${info.name}：+${info.bonus}`)
}
console.log()

// 测试9: 创建一个固定的仙战榜用于测试叠加效果
console.log('【测试9】创建固定仙战榜用于测试')
console.log('----------------------------------------')
// 手动创建一个固定的仙战榜，方便测试
const fixedRanking = {
  1: { bonus: 2000, attribute: 'attack', realmLevel: 1 },
  2: { bonus: 4000, attribute: 'defense', realmLevel: 2 },
  3: { bonus: 8000, attribute: 'expSpeed', realmLevel: 3 }
}
console.log('固定仙战榜：')
console.log('  大境界1：+2000 攻击')
console.log('  大境界2：+4000 防御')
console.log('  大境界3：+8000 修为修炼速度')
console.log()

// 测试10: 与其他系统的叠加效果（战斗属性）
console.log('【测试10】与其他系统的叠加效果（战斗属性）')
console.log('----------------------------------------')

// 金丹1层
const player21 = {
  level: 21,
  talents: {
    qigan: 120,
    shishi: 120,
    gengu: 120,
    wuxing: 120,
    jiyuan: 120
  },
  immortalRanking: fixedRanking
}
const attrs21 = calculateBattleAttributes(player21)
const power21 = calculatePower(attrs21)
console.log('金丹1层（天赋120点，经脉8000，仙灵环3500，仙战榜：攻击+2000，防御+4000）：')
console.log('  血量：', attrs21.hp)
console.log('  攻击：', attrs21.attack, '（额外+2000）')
console.log('  防御：', attrs21.defense, '（额外+4000）')
console.log('  速度：', attrs21.speed)
console.log('  战斗力：', power21)
console.log()

// 测试11: 与其他系统的叠加效果（修炼速度）
console.log('【测试11】与其他系统的叠加效果（修炼速度）')
console.log('----------------------------------------')

const expSpeed21 = calculateExpGrowthRate(player21, 1)
const combatSpeed21 = calculateCombatGrowthRate(player21, 1)
console.log('金丹1层（天赋120点，经脉8000，仙战榜：修为速度+8000）：')
console.log('  修为速度：', expSpeed21, '（额外+8000）')
console.log('  战斗经验速度：', combatSpeed21)
console.log()

// 测试12: 极端情况 - 所有加成都随机到同一属性
console.log('【测试12】极端情况测试 - 所有加成都随机到攻击')
console.log('----------------------------------------')
const extremeRanking = {
  1: { bonus: 2000, attribute: 'attack', realmLevel: 1 },
  2: { bonus: 4000, attribute: 'attack', realmLevel: 2 },
  3: { bonus: 8000, attribute: 'attack', realmLevel: 3 },
  4: { bonus: 16000, attribute: 'attack', realmLevel: 4 },
  5: { bonus: 32000, attribute: 'attack', realmLevel: 5 }
}

const extremeBattleBonuses = calculateBattleAttributeBonuses(extremeRanking)
console.log('所有加成都随机到攻击：')
console.log('  攻击总加成：', extremeBattleBonuses.attack)
console.log('  其他属性加成：', extremeBattleBonuses.defense, extremeBattleBonuses.hp)

const extremePlayer = {
  level: 41,
  talents: {
    qigan: 200,
    shishi: 200,
    gengu: 200,
    wuxing: 200,
    jiyuan: 200
  },
  immortalRanking: extremeRanking
}
const extremeAttrs = calculateBattleAttributes(extremePlayer)
console.log('化神1层（所有仙战榜加成都在攻击）：')
console.log('  攻击：', extremeAttrs.attack, '（仙战榜+62000）')
console.log('  防御：', extremeAttrs.defense, '（仙战榜+0）')
console.log()

// 测试13: 验证配置
console.log('【测试13】仙战榜配置验证')
console.log('----------------------------------------')
console.log('基础加成：', IMMORTAL_RANKING_CONFIG.BASE_BONUS)
console.log('可随机属性数量：', IMMORTAL_RANKING_CONFIG.RANDOM_ATTRIBUTES.length)
console.log('仙战榜信息：')
console.log(`  ${IMMORTAL_RANKING_CONFIG.INFO.icon} ${IMMORTAL_RANKING_CONFIG.INFO.name}`)
console.log(`  描述：${IMMORTAL_RANKING_CONFIG.INFO.description}`)
console.log()

console.log('========================================')
console.log('测试完成！')
console.log('========================================')
