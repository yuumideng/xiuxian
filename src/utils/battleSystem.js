/**
 * 回合制战斗系统
 * 
 * 实现完整的回合制战斗逻辑：
 * - 命中-闪避对抗
 * - 暴击-韧性对抗
 * - 防御递减机制
 * - 伤害波动
 * - 速度决定先手
 * 
 * @author AI Assistant
 * @version 1.0.0
 * @date 2025-10-30
 */

/**
 * 回合制战斗系统类
 */
export class BattleSystem {
  constructor(attacker, defender) {
    this.attacker = {
      ...attacker,
      currentHp: attacker.hp,
      name: attacker.name || '攻击方'
    }
    this.defender = {
      ...defender,
      currentHp: defender.hp,
      name: defender.name || '防守方'
    }
    this.round = 0
    this.battleLog = []
    this.maxRounds = 50 // 最大回合数，防止无限战斗
  }
  
  /**
   * 判断先手
   * 速度高的先攻击，速度相同则随机
   */
  determineFirstAttacker() {
    if (this.attacker.speed > this.defender.speed) {
      return 'attacker'
    } else if (this.attacker.speed < this.defender.speed) {
      return 'defender'
    } else {
      return Math.random() > 0.5 ? 'attacker' : 'defender'
    }
  }
  
  /**
   * 命中判定
   * 命中率 = 攻击方命中 / (攻击方命中 + 防守方闪避) * 100%
   * 基础命中率不低于20%，不高于95%
   */
  checkHit(attacker, defender) {
    const hitRate = attacker.hit / (attacker.hit + defender.dodge)
    const finalHitRate = Math.max(0.2, Math.min(0.95, hitRate))
    const roll = Math.random()
    
    return {
      isHit: roll < finalHitRate,
      hitRate: finalHitRate,
      roll
    }
  }
  
  /**
   * 暴击判定
   * 暴击率 = (攻击方暴击 - 防守方韧性) / 攻击方暴击 * 50%
   * 基础暴击率5%-50%之间
   */
  checkCrit(attacker, defender) {
    const critDiff = Math.max(0, attacker.crit - defender.toughness)
    const critRate = (critDiff / attacker.crit) * 0.5
    const finalCritRate = Math.max(0.05, Math.min(0.5, critRate))
    const roll = Math.random()
    
    return {
      isCrit: roll < finalCritRate,
      critRate: finalCritRate,
      roll
    }
  }
  
  /**
   * 伤害计算
   * 基础伤害 = 攻击 * (1 - 防御/(防御+1000))
   * 暴击伤害 = 基础伤害 * (1.5 + 暴击/1000)
   * 伤害波动 ±10%
   */
  calculateDamage(attacker, defender, isCrit) {
    // 防御减伤公式：防御越高，减伤越多，但有上限
    const defenseReduction = defender.defense / (defender.defense + 1000)
    
    // 基础伤害
    let damage = attacker.attack * (1 - defenseReduction)
    
    // 暴击伤害
    if (isCrit) {
      const critMultiplier = 1.5 + (attacker.crit / 1000)
      damage *= critMultiplier
    }
    
    // 伤害波动 ±10%
    const variance = 0.9 + Math.random() * 0.2
    damage *= variance
    
    return Math.floor(Math.max(1, damage)) // 最少1点伤害
  }
  
  /**
   * 执行一次攻击
   */
  executeAttack(attackerSide, defenderSide) {
    const attacker = this[attackerSide]
    const defender = this[defenderSide]
    
    const attackLog = {
      round: this.round,
      attacker: attacker.name,
      defender: defender.name,
      attackerSide,
      defenderSide
    }
    
    // 命中判定
    const hitCheck = this.checkHit(attacker, defender)
    if (!hitCheck.isHit) {
      attackLog.result = 'miss'
      attackLog.hitRate = hitCheck.hitRate
      attackLog.message = `${attacker.name} 的攻击被 ${defender.name} 闪避了！`
      this.battleLog.push(attackLog)
      return
    }
    
    // 暴击判定
    const critCheck = this.checkCrit(attacker, defender)
    
    // 计算伤害
    const damage = this.calculateDamage(attacker, defender, critCheck.isCrit)
    defender.currentHp -= damage
    
    attackLog.result = critCheck.isCrit ? 'crit' : 'hit'
    attackLog.damage = damage
    attackLog.isCrit = critCheck.isCrit
    attackLog.critRate = critCheck.critRate
    attackLog.remainingHp = Math.max(0, defender.currentHp)
    attackLog.message = `${attacker.name} 对 ${defender.name} 造成了 ${damage} 点伤害${critCheck.isCrit ? '（暴击！）' : ''}，剩余血量：${Math.max(0, defender.currentHp)}`
    
    this.battleLog.push(attackLog)
  }
  
  /**
   * 战斗主循环
   */
  startBattle() {
    // 确定先手
    let currentAttacker = this.determineFirstAttacker()
    
    // 记录先手信息
    this.battleLog.push({
      round: 0,
      type: 'start',
      message: `战斗开始！${this[currentAttacker].name} 速度更快，率先出手！`
    })
    
    while (this.round < this.maxRounds) {
      this.round++
      
      // 当前攻击方执行攻击
      const currentDefender = currentAttacker === 'attacker' ? 'defender' : 'attacker'
      this.executeAttack(currentAttacker, currentDefender)
      
      // 检查战斗是否结束
      if (this[currentDefender].currentHp <= 0) {
        this.battleLog.push({
          round: this.round,
          type: 'end',
          winner: this[currentAttacker].name,
          message: `${this[currentAttacker].name} 获得了胜利！`
        })
        
        return {
          winner: currentAttacker,
          winnerName: this[currentAttacker].name,
          loserName: this[currentDefender].name,
          rounds: this.round,
          battleLog: this.battleLog,
          finalState: {
            attacker: { ...this.attacker },
            defender: { ...this.defender }
          }
        }
      }
      
      // 切换攻击方
      currentAttacker = currentDefender
    }
    
    // 超过最大回合数，血量多的获胜
    const winner = this.attacker.currentHp > this.defender.currentHp ? 'attacker' : 'defender'
    
    this.battleLog.push({
      round: this.round,
      type: 'timeout',
      winner: this[winner].name,
      message: `战斗超时！${this[winner].name} 血量更多，获得胜利！`
    })
    
    return {
      winner,
      winnerName: this[winner].name,
      loserName: this[winner === 'attacker' ? 'defender' : 'attacker'].name,
      rounds: this.round,
      battleLog: this.battleLog,
      timeout: true,
      finalState: {
        attacker: { ...this.attacker },
        defender: { ...this.defender }
      }
    }
  }
  
  /**
   * 获取战斗统计信息
   */
  getBattleStats() {
    const attackerHits = this.battleLog.filter(
      log => log.attackerSide === 'attacker' && (log.result === 'hit' || log.result === 'crit')
    )
    const defenderHits = this.battleLog.filter(
      log => log.attackerSide === 'defender' && (log.result === 'hit' || log.result === 'crit')
    )
    
    const attackerCrits = attackerHits.filter(log => log.result === 'crit')
    const defenderCrits = defenderHits.filter(log => log.result === 'crit')
    
    const attackerTotalDamage = attackerHits.reduce((sum, log) => sum + (log.damage || 0), 0)
    const defenderTotalDamage = defenderHits.reduce((sum, log) => sum + (log.damage || 0), 0)
    
    return {
      attacker: {
        name: this.attacker.name,
        hits: attackerHits.length,
        crits: attackerCrits.length,
        totalDamage: attackerTotalDamage,
        avgDamage: attackerHits.length > 0 ? Math.floor(attackerTotalDamage / attackerHits.length) : 0
      },
      defender: {
        name: this.defender.name,
        hits: defenderHits.length,
        crits: defenderCrits.length,
        totalDamage: defenderTotalDamage,
        avgDamage: defenderHits.length > 0 ? Math.floor(defenderTotalDamage / defenderHits.length) : 0
      }
    }
  }
}

/**
 * 快速战斗函数（不需要详细日志）
 */
export function quickBattle(attacker, defender) {
  const battle = new BattleSystem(attacker, defender)
  return battle.startBattle()
}

/**
 * 模拟多次战斗，计算胜率
 */
export function simulateBattles(attacker, defender, times = 100) {
  let attackerWins = 0
  let defenderWins = 0
  let totalRounds = 0
  
  for (let i = 0; i < times; i++) {
    const result = quickBattle(attacker, defender)
    if (result.winner === 'attacker') {
      attackerWins++
    } else {
      defenderWins++
    }
    totalRounds += result.rounds
  }
  
  return {
    attackerWinRate: (attackerWins / times * 100).toFixed(1) + '%',
    defenderWinRate: (defenderWins / times * 100).toFixed(1) + '%',
    avgRounds: (totalRounds / times).toFixed(1),
    totalBattles: times
  }
}
