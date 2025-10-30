/**
 * 天赋系统测试
 */

import { 
  calculateTalentPoints,
  calculateTalentBonusMultiplier,
  calculateSingleTalentBonus,
  calculateTalentBonuses,
  calculateBattleAttributeBonuses,
  initializeTalents,
  upgradeTalentsOnBreakthrough,
  getTalentDetails,
  getRealmIndex
} from './src/utils/talentSystem.js'

import { calculateBattleAttributes, calculatePower } from './src/utils/battleCalculator.js'

console.log('='.repeat(80))
console.log('天赋系统测试')
console.log('='.repeat(80))

console.log('\n【天赋成长规则】')
console.log('- 初始值：每种天赋 40 点')
console.log('- 初始加成：每种天赋提供 1000 加成')
console.log('- 每突破一个大境界：天赋点数 +40，加成翻倍')

// 测试1：天赋点数计算
console.log('\n' + '='.repeat(80))
console.log('【测试1：天赋点数计算】')
console.log('='.repeat(80))

const testLevels = [
  { level: 1, name: '练气一层', realm: '练气' },
  { level: 10, name: '练气大圆满', realm: '练气' },
  { level: 11, name: '筑基初期', realm: '筑基' },
  { level: 20, name: '筑基大圆满', realm: '筑基' },
  { level: 21, name: '金丹初期', realm: '金丹' },
  { level: 30, name: '金丹大圆满', realm: '金丹' },
  { level: 31, name: '元婴初期', realm: '元婴' },
  { level: 40, name: '元婴大圆满', realm: '元婴' }
]

testLevels.forEach(test => {
  const realmIndex = getRealmIndex(test.level)
  const talentPoints = calculateTalentPoints(test.level)
  const bonusMultiplier = calculateTalentBonusMultiplier(test.level)
  
  console.log(`\n${test.name}（${test.level}级）`)
  console.log(`  境界索引: ${realmIndex}`)
  console.log(`  天赋点数: ${talentPoints}`)
  console.log(`  加成倍率: ${bonusMultiplier.toLocaleString()}`)
})

// 测试2：单个天赋加成计算
console.log('\n' + '='.repeat(80))
console.log('【测试2：单个天赋加成计算】')
console.log('='.repeat(80))

console.log('\n练气境界（40点天赋）：')
const bonus1 = calculateSingleTalentBonus(40, 1)
console.log(`  40点天赋提供的加成: ${bonus1.toLocaleString()}`)

console.log('\n筑基境界（80点天赋）：')
const bonus11 = calculateSingleTalentBonus(80, 11)
console.log(`  80点天赋提供的加成: ${bonus11.toLocaleString()}`)

console.log('\n金丹境界（120点天赋）：')
const bonus21 = calculateSingleTalentBonus(120, 21)
console.log(`  120点天赋提供的加成: ${bonus21.toLocaleString()}`)

console.log('\n元婴境界（160点天赋）：')
const bonus31 = calculateSingleTalentBonus(160, 31)
console.log(`  160点天赋提供的加成: ${bonus31.toLocaleString()}`)

// 测试3：天赋对战斗属性的影响
console.log('\n' + '='.repeat(80))
console.log('【测试3：天赋对战斗属性的影响】')
console.log('='.repeat(80))

testLevels.forEach(test => {
  const talents = initializeTalents(test.level)
  const bonuses = calculateTalentBonuses(talents, test.level)
  
  console.log(`\n${test.name}（${test.level}级）`)
  console.log(`  天赋点数: ${talents.qigan}`)
  console.log(`  气感 → 血量加成: ${bonuses.hp.toLocaleString()}`)
  console.log(`  神识 → 攻击加成: ${bonuses.attack.toLocaleString()}`)
  console.log(`  根骨 → 防御加成: ${bonuses.defense.toLocaleString()}`)
  console.log(`  悟性 → 修为速度加成: ${bonuses.expSpeed.toLocaleString()}`)
  console.log(`  悟性 → 功法速度加成: ${bonuses.skillSpeed.toLocaleString()}`)
  console.log(`  机缘 → 战斗经验速度加成: ${bonuses.combatSpeed.toLocaleString()}`)
  console.log(`  机缘 → 灵石获取速度加成: ${bonuses.spiritStoneSpeed.toLocaleString()}`)
})

// 测试4：战斗属性计算（含天赋加成）
console.log('\n' + '='.repeat(80))
console.log('【测试4：战斗属性计算（含天赋加成）】')
console.log('='.repeat(80))

testLevels.forEach(test => {
  const talents = initializeTalents(test.level)
  const player = { level: test.level, talents: talents }
  const attributes = calculateBattleAttributes(player)
  const power = calculatePower(attributes)
  
  console.log(`\n${test.name}（${test.level}级）`)
  console.log(`  天赋点数: ${talents.qigan}`)
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

// 测试5：突破时天赋升级
console.log('\n' + '='.repeat(80))
console.log('【测试5：突破时天赋升级】')
console.log('='.repeat(80))

console.log('\n模拟从练气突破到筑基：')
let talents = { qigan: 40, shishi: 40, gengu: 40, wuxing: 40, jiyuan: 40 }
console.log('  突破前（练气10层）:', talents)
talents = upgradeTalentsOnBreakthrough(talents, 10, 11)
console.log('  突破后（筑基初期）:', talents)

console.log('\n模拟从筑基突破到金丹：')
talents = { qigan: 80, shishi: 80, gengu: 80, wuxing: 80, jiyuan: 80 }
console.log('  突破前（筑基20层）:', talents)
talents = upgradeTalentsOnBreakthrough(talents, 20, 21)
console.log('  突破后（金丹初期）:', talents)

console.log('\n模拟小境界突破（不跨大境界）：')
talents = { qigan: 40, shishi: 40, gengu: 40, wuxing: 40, jiyuan: 40 }
console.log('  突破前（练气5层）:', talents)
talents = upgradeTalentsOnBreakthrough(talents, 5, 6)
console.log('  突破后（练气6层）:', talents)

// 测试6：战斗力对比（有天赋 vs 无天赋）
console.log('\n' + '='.repeat(80))
console.log('【测试6：战斗力对比（有天赋 vs 无天赋）】')
console.log('='.repeat(80))

testLevels.forEach(test => {
  const talents = initializeTalents(test.level)
  
  // 有天赋
  const playerWithTalent = { level: test.level, talents: talents }
  const attrsWithTalent = calculateBattleAttributes(playerWithTalent)
  const powerWithTalent = calculatePower(attrsWithTalent)
  
  // 无天赋
  const playerNoTalent = { level: test.level }
  const attrsNoTalent = calculateBattleAttributes(playerNoTalent)
  const powerNoTalent = calculatePower(attrsNoTalent)
  
  const ratio = powerWithTalent / powerNoTalent
  
  console.log(`\n${test.name}（${test.level}级）`)
  console.log(`  无天赋战斗力: ${powerNoTalent.toLocaleString()}`)
  console.log(`  有天赋战斗力: ${powerWithTalent.toLocaleString()}`)
  console.log(`  提升倍率: ${ratio.toFixed(2)}x`)
})

// 测试7：天赋详细信息
console.log('\n' + '='.repeat(80))
console.log('【测试7：天赋详细信息】')
console.log('='.repeat(80))

const testPlayer = { level: 21, talents: initializeTalents(21) }
const details = getTalentDetails(testPlayer.talents, testPlayer.level)

console.log(`\n境界索引: ${details.realmIndex}`)
console.log(`加成倍率: ${details.bonusMultiplier.toLocaleString()}`)
console.log(`总天赋点数: ${details.totalTalentPoints}`)

console.log('\n各天赋详情：')
for (let key in details.talents) {
  const talent = details.talents[key]
  console.log(`\n${talent.icon} ${talent.name}`)
  console.log(`  点数: ${talent.points}`)
  console.log(`  加成: ${talent.bonus.toLocaleString()}`)
  console.log(`  影响属性: ${talent.affectedAttributes.join(', ')}`)
  console.log(`  描述: ${talent.description}`)
}

console.log('\n' + '='.repeat(80))
console.log('测试完成！')
console.log('='.repeat(80))
