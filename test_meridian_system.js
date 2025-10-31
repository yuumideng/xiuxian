/**
 * 经脉系统测试脚本
 * 
 * 测试内容：
 * 1. 经脉加成计算
 * 2. 战斗属性加成
 * 3. 修炼速度加成
 * 4. 经脉升级信息
 * 5. 与天赋系统的叠加效果
 */

import {
  calculateMeridianBonus,
  calculateBattleAttributeBonuses,
  calculateCultivationSpeedBonuses,
  getMeridianDetails,
  getMeridianUpgradeInfo,
  MERIDIAN_CONFIG
} from './src/utils/meridianSystem.js'

import { calculateBattleAttributes, calculatePower } from './src/utils/battleCalculator.js'
import { calculateExpGrowthRate, calculateCombatGrowthRate } from './src/utils/growthCalculator.js'

console.log('========================================')
console.log('经脉系统测试')
console.log('========================================\n')

// 测试1: 基础经脉加成计算
console.log('【测试1】基础经脉加成计算')
console.log('----------------------------------------')
const testLevels = [1, 10, 11, 20, 21, 30]
testLevels.forEach(level => {
  const bonus = calculateMeridianBonus(level)
  const realmLevel = Math.floor((level - 1) / 10) + 1
  console.log(`等级 ${level} (大境界${realmLevel})：经脉加成 = ${bonus}`)
})
console.log()

// 测试2: 战斗属性加成
console.log('【测试2】战斗属性加成')
console.log('----------------------------------------')
const battleBonuses1 = calculateBattleAttributeBonuses(1)
console.log('练气1层战斗属性加成：', battleBonuses1)

const battleBonuses11 = calculateBattleAttributeBonuses(11)
console.log('筑基1层战斗属性加成：', battleBonuses11)

const battleBonuses21 = calculateBattleAttributeBonuses(21)
console.log('金丹1层战斗属性加成：', battleBonuses21)
console.log()

// 测试3: 修炼速度加成
console.log('【测试3】修炼速度加成')
console.log('----------------------------------------')
const speedBonuses1 = calculateCultivationSpeedBonuses(1)
console.log('练气1层修炼速度加成：', speedBonuses1)

const speedBonuses11 = calculateCultivationSpeedBonuses(11)
console.log('筑基1层修炼速度加成：', speedBonuses11)

const speedBonuses21 = calculateCultivationSpeedBonuses(21)
console.log('金丹1层修炼速度加成：', speedBonuses21)
console.log()

// 测试4: 经脉详细信息
console.log('【测试4】经脉详细信息')
console.log('----------------------------------------')
const meridianDetails = getMeridianDetails(1)
console.log('练气1层经脉详细信息：')
meridianDetails.forEach(m => {
  console.log(`  ${m.icon} ${m.name}：加成 ${m.bonus}，影响 ${m.affectedAttributes.join(', ')}`)
})
console.log()

// 测试5: 经脉升级信息
console.log('【测试5】经脉升级信息')
console.log('----------------------------------------')
const upgradeInfo1 = getMeridianUpgradeInfo(10, 11)
console.log('从练气10层突破到筑基1层：')
console.log(`  旧大境界：${upgradeInfo1.oldRealmLevel}，旧加成：${upgradeInfo1.oldBonus}`)
console.log(`  新大境界：${upgradeInfo1.newRealmLevel}，新加成：${upgradeInfo1.newBonus}`)
console.log(`  是否升级：${upgradeInfo1.isUpgraded}，加成增加：${upgradeInfo1.bonusIncrease}`)
console.log()

// 测试6: 与天赋系统的叠加效果（战斗属性）
console.log('【测试6】天赋+经脉叠加效果（战斗属性）')
console.log('----------------------------------------')

// 练气1层
const player1 = {
  level: 1,
  talents: {
    qigan: 40,
    shishi: 40,
    gengu: 40,
    wuxing: 40,
    jiyuan: 40
  }
}
const attrs1 = calculateBattleAttributes(player1)
const power1 = calculatePower(attrs1)
console.log('练气1层（天赋40点，经脉加成2000）：')
console.log('  血量：', attrs1.hp)
console.log('  攻击：', attrs1.attack)
console.log('  防御：', attrs1.defense)
console.log('  战斗力：', power1)
console.log()

// 筑基1层
const player11 = {
  level: 11,
  talents: {
    qigan: 80,
    shishi: 80,
    gengu: 80,
    wuxing: 80,
    jiyuan: 80
  }
}
const attrs11 = calculateBattleAttributes(player11)
const power11 = calculatePower(attrs11)
console.log('筑基1层（天赋80点，经脉加成4000）：')
console.log('  血量：', attrs11.hp)
console.log('  攻击：', attrs11.attack)
console.log('  防御：', attrs11.defense)
console.log('  战斗力：', power11)
console.log()

// 金丹1层
const player21 = {
  level: 21,
  talents: {
    qigan: 120,
    shishi: 120,
    gengu: 120,
    wuxing: 120,
    jiyuan: 120
  }
}
const attrs21 = calculateBattleAttributes(player21)
const power21 = calculatePower(attrs21)
console.log('金丹1层（天赋120点，经脉加成8000）：')
console.log('  血量：', attrs21.hp)
console.log('  攻击：', attrs21.attack)
console.log('  防御：', attrs21.defense)
console.log('  战斗力：', power21)
console.log()

// 测试7: 与天赋系统的叠加效果（修炼速度）
console.log('【测试7】天赋+经脉叠加效果（修炼速度）')
console.log('----------------------------------------')

// 练气1层
const expSpeed1 = calculateExpGrowthRate(player1, 1)
const combatSpeed1 = calculateCombatGrowthRate(player1, 1)
console.log('练气1层（天赋40点，经脉加成2000）：')
console.log('  修为速度：', expSpeed1)
console.log('  战斗经验速度：', combatSpeed1)
console.log()

// 筑基1层
const expSpeed11 = calculateExpGrowthRate(player11, 1)
const combatSpeed11 = calculateCombatGrowthRate(player11, 1)
console.log('筑基1层（天赋80点，经脉加成4000）：')
console.log('  修为速度：', expSpeed11)
console.log('  战斗经验速度：', combatSpeed11)
console.log()

// 金丹1层
const expSpeed21 = calculateExpGrowthRate(player21, 1)
const combatSpeed21 = calculateCombatGrowthRate(player21, 1)
console.log('金丹1层（天赋120点，经脉加成8000）：')
console.log('  修为速度：', expSpeed21)
console.log('  战斗经验速度：', combatSpeed21)
console.log()

// 测试8: 验证经脉配置
console.log('【测试8】经脉配置验证')
console.log('----------------------------------------')
console.log('初始加成：', MERIDIAN_CONFIG.INITIAL_BONUS)
console.log('经脉类型：')
for (let key in MERIDIAN_CONFIG.MERIDIAN_TYPES) {
  const meridian = MERIDIAN_CONFIG.MERIDIAN_TYPES[key]
  console.log(`  ${meridian.icon} ${meridian.name}：${meridian.description}`)
}
console.log()

console.log('========================================')
console.log('测试完成！')
console.log('========================================')
