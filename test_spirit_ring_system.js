/**
 * 仙灵环系统测试脚本
 * 
 * 测试内容：
 * 1. 仙灵环加成计算
 * 2. 战斗属性加成
 * 3. 仙灵环详细信息
 * 4. 仙灵环升级信息
 * 5. 与天赋、经脉系统的叠加效果
 */

import {
  calculateSpiritRingBonus,
  calculateBattleAttributeBonuses,
  getSpiritRingDetails,
  getSpiritRingUpgradeInfo,
  getSpiritRingGrowthPreview,
  SPIRIT_RING_CONFIG
} from './src/utils/spiritRingSystem.js'

import { calculateBattleAttributes, calculatePower } from './src/utils/battleCalculator.js'

console.log('========================================')
console.log('仙灵环系统测试')
console.log('========================================\n')

// 测试1: 基础仙灵环加成计算
console.log('【测试1】基础仙灵环加成计算')
console.log('----------------------------------------')
const testLevels = [1, 10, 11, 20, 21, 30, 31, 40, 41, 50]
testLevels.forEach(level => {
  const bonus = calculateSpiritRingBonus(level)
  const realmLevel = Math.floor((level - 1) / 10) + 1
  console.log(`等级 ${level} (大境界${realmLevel})：仙灵环加成 = ${bonus}`)
})
console.log()

// 验证加成规律
console.log('【验证】加成规律检查')
console.log('----------------------------------------')
console.log('练气期（大境界1）：', calculateSpiritRingBonus(1), '（预期：500）')
console.log('筑基期（大境界2）：', calculateSpiritRingBonus(11), '（预期：1500）')
console.log('金丹期（大境界3）：', calculateSpiritRingBonus(21), '（预期：3500）')
console.log('元婴期（大境界4）：', calculateSpiritRingBonus(31), '（预期：7500）')
console.log('化神期（大境界5）：', calculateSpiritRingBonus(41), '（预期：15500）')
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

// 测试3: 仙灵环详细信息
console.log('【测试3】仙灵环详细信息')
console.log('----------------------------------------')
const spiritRingDetails = getSpiritRingDetails(1)
console.log('练气1层仙灵环详细信息：')
console.log(`  ${spiritRingDetails.icon} ${spiritRingDetails.name}`)
console.log(`  描述：${spiritRingDetails.description}`)
console.log(`  加成：${spiritRingDetails.bonus}`)
console.log(`  影响属性：${spiritRingDetails.affectedAttributes.join(', ')}`)
console.log()

// 测试4: 仙灵环升级信息
console.log('【测试4】仙灵环升级信息')
console.log('----------------------------------------')
const upgradeInfo1 = getSpiritRingUpgradeInfo(10, 11)
console.log('从练气10层突破到筑基1层：')
console.log(`  旧大境界：${upgradeInfo1.oldRealmLevel}，旧加成：${upgradeInfo1.oldBonus}`)
console.log(`  新大境界：${upgradeInfo1.newRealmLevel}，新加成：${upgradeInfo1.newBonus}`)
console.log(`  是否升级：${upgradeInfo1.isUpgraded}，加成增加：${upgradeInfo1.bonusIncrease}`)
console.log()

const upgradeInfo2 = getSpiritRingUpgradeInfo(20, 21)
console.log('从筑基10层突破到金丹1层：')
console.log(`  旧大境界：${upgradeInfo2.oldRealmLevel}，旧加成：${upgradeInfo2.oldBonus}`)
console.log(`  新大境界：${upgradeInfo2.newRealmLevel}，新加成：${upgradeInfo2.newBonus}`)
console.log(`  是否升级：${upgradeInfo2.isUpgraded}，加成增加：${upgradeInfo2.bonusIncrease}`)
console.log()

// 测试5: 成长预览
console.log('【测试5】仙灵环成长预览')
console.log('----------------------------------------')
const growthPreview = getSpiritRingGrowthPreview(10)
console.log('前10个大境界的仙灵环加成：')
growthPreview.forEach(item => {
  console.log(`  大境界${item.realmLevel}（等级${item.level}）：${item.bonus}`)
})
console.log()

// 测试6: 与天赋、经脉系统的叠加效果
console.log('【测试6】天赋+经脉+仙灵环叠加效果')
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
console.log('练气1层（天赋40点，经脉2000，仙灵环500）：')
console.log('  血量：', attrs1.hp)
console.log('  攻击：', attrs1.attack)
console.log('  防御：', attrs1.defense)
console.log('  速度：', attrs1.speed)
console.log('  暴击：', attrs1.crit)
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
console.log('筑基1层（天赋80点，经脉4000，仙灵环1500）：')
console.log('  血量：', attrs11.hp)
console.log('  攻击：', attrs11.attack)
console.log('  防御：', attrs11.defense)
console.log('  速度：', attrs11.speed)
console.log('  暴击：', attrs11.crit)
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
console.log('金丹1层（天赋120点，经脉8000，仙灵环3500）：')
console.log('  血量：', attrs21.hp)
console.log('  攻击：', attrs21.attack)
console.log('  防御：', attrs21.defense)
console.log('  速度：', attrs21.speed)
console.log('  暴击：', attrs21.crit)
console.log('  战斗力：', power21)
console.log()

// 元婴1层
const player31 = {
  level: 31,
  talents: {
    qigan: 160,
    shishi: 160,
    gengu: 160,
    wuxing: 160,
    jiyuan: 160
  }
}
const attrs31 = calculateBattleAttributes(player31)
const power31 = calculatePower(attrs31)
console.log('元婴1层（天赋160点，经脉16000，仙灵环7500）：')
console.log('  血量：', attrs31.hp)
console.log('  攻击：', attrs31.attack)
console.log('  防御：', attrs31.defense)
console.log('  速度：', attrs31.speed)
console.log('  暴击：', attrs31.crit)
console.log('  战斗力：', power31)
console.log()

// 测试7: 验证仙灵环配置
console.log('【测试7】仙灵环配置验证')
console.log('----------------------------------------')
console.log('基础加成：', SPIRIT_RING_CONFIG.BASE_BONUS)
console.log('增长基数：', SPIRIT_RING_CONFIG.GROWTH_BASE)
console.log('仙灵环信息：')
console.log(`  ${SPIRIT_RING_CONFIG.INFO.icon} ${SPIRIT_RING_CONFIG.INFO.name}`)
console.log(`  描述：${SPIRIT_RING_CONFIG.INFO.description}`)
console.log(`  影响属性：${SPIRIT_RING_CONFIG.INFO.affectedAttributes.join(', ')}`)
console.log()

// 测试8: 加成增长率分析
console.log('【测试8】加成增长率分析')
console.log('----------------------------------------')
for (let i = 1; i <= 5; i++) {
  const level = (i - 1) * 10 + 1
  const bonus = calculateSpiritRingBonus(level)
  const nextLevel = i * 10 + 1
  const nextBonus = calculateSpiritRingBonus(nextLevel)
  const increase = nextBonus - bonus
  const percentage = i === 1 ? 'N/A' : ((nextBonus / bonus - 1) * 100).toFixed(1) + '%'
  
  console.log(`大境界${i} → 大境界${i+1}：${bonus} → ${nextBonus}（+${increase}，增长${percentage}）`)
}
console.log()

console.log('========================================')
console.log('测试完成！')
console.log('========================================')
