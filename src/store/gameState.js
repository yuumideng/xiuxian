import { defineStore } from 'pinia'
import { getRealmByLevel, getRealmRequirements } from '@/data/realms.js'
import { calculateExpGrowthRate, calculateCombatGrowthRate, getGrowthRateDetails } from '@/utils/growthCalculator.js'
import { calculateBattleAttributes, calculatePower } from '@/utils/battleCalculator.js'
import { upgradeTalentsOnBreakthrough, getTalentDetails } from '@/utils/talentSystem.js'
import { getMeridianDetails } from '@/utils/meridianSystem.js'
import { getSpiritRingDetails } from '@/utils/spiritRingSystem.js'
import { initializeImmortalRanking, addRealmBonus, getImmortalRankingDetails } from '@/utils/immortalRankingSystem.js'
import { getCurrentSlotId, saveToSlot, loadSaveSlot } from '@/utils/saveManager.js'

export const useGameStore = defineStore('game', {
  state: () => ({
    // 玩家基础信息
    player: {
      name: '道友',
      level: 1, // 当前境界等级
      age: 16, // 年龄
      
      // 资源
      jade: 0, // 仙玉
      spiritStone: 100, // 灵石
      
      // 修炼相关
      exp: 0, // 当前修为
      combat: 0, // 当前战斗经验
      
      // 速度属性
      spiritStoneSpeed: 1, // 灵石获取速度/秒
      baseExpSpeed: 1, // 基础修为增长速度/秒
      baseCombatSpeed: 1, // 基础战斗经验增长速度/秒
      gameSpeed: 1, // 游戏整体速度倍率
      
      // 天赋属性（初始值40点）
      talents: {
        qigan: 40, // 气感 → 血量
        shishi: 40, // 神识 → 攻击
        gengu: 40, // 根骨 → 防御
        wuxing: 40, // 悟性 → 修为修炼速度 + 功法修炼速度
        jiyuan: 40 // 机缘 → 战斗经验修炼速度 + 灵石获取速度
      },
      
      // 灵根属性
      spiritualRoots: {
        jin: 50, // 金灵根
        mu: 50, // 木灵根
        shui: 50, // 水灵根
        huo: 50, // 火灵根
        tu: 50, // 土灵根
        feng: 50, // 风灵根
        lei: 50, // 雷灵根
        guang: 100 // 光灵根
      },
      
      // 仙战榜（随机加成系统）
      immortalRanking: initializeImmortalRanking(1)
    },
    
    // 游戏状态
    gameState: {
      isOnline: true, // 是否在线
      lastOfflineTime: null, // 上次离线时间
      totalPlayTime: 0, // 总游戏时间(秒)
      timeProgress: 0, // 时间流逝进度 (0-100, 每秒增加13%)
      isPaused: false, // 是否暂停游戏
    },
    
    // 挂机状态 (保留兼容性，但不再影响收益)
    idleState: {
      isIdle: true, // 默认挂机状态
      startTime: null, // 开始挂机时间
    }
  }),
  
  getters: {
    // 当前境界信息
    currentRealm: (state) => {
      return getRealmByLevel(state.player.level)
    },
    
    // 下一境界信息
    nextRealm: (state) => {
      return getRealmByLevel(state.player.level + 1)
    },
    
    // 当前境界升级需求
    currentRequirements: (state) => {
      return getRealmRequirements(state.player.level)
    },
    
    // 修为进度百分比
    expProgress: (state) => {
      const requirements = getRealmRequirements(state.player.level)
      return Math.min((state.player.exp / requirements.exp) * 100, 100)
    },
    
    // 战斗经验进度百分比
    combatProgress: (state) => {
      const requirements = getRealmRequirements(state.player.level)
      return Math.min((state.player.combat / requirements.combat) * 100, 100)
    },
    
    // 是否可以突破
    canBreakthrough: (state) => {
      const requirements = getRealmRequirements(state.player.level)
      return state.player.exp >= requirements.exp && 
             state.player.combat >= requirements.combat
    },
    
    // 实际速度(考虑游戏速度倍率和暂停状态)
    actualSpeeds: (state) => {
      // 暂停状态下收益为0，否则获得100%收益
      const pauseMultiplier = state.gameState.isPaused ? 0 : 1.0
      
      // 使用新的增长速率计算公式
      const calculatedExpSpeed = calculateExpGrowthRate(state.player, state.player.baseExpSpeed)
      const calculatedCombatSpeed = calculateCombatGrowthRate(state.player, state.player.baseCombatSpeed)
      
      return {
        spiritStone: Math.floor(state.player.spiritStoneSpeed * state.player.gameSpeed * pauseMultiplier),
        exp: Math.floor(calculatedExpSpeed * state.player.gameSpeed * pauseMultiplier),
        combat: Math.floor(calculatedCombatSpeed * state.player.gameSpeed * pauseMultiplier)
      }
    },
    
    // 增长速率详细信息
    growthRateDetails: (state) => {
      return getGrowthRateDetails(state.player)
    },
    
    // 战斗属性（八大属性）
    battleAttributes: (state) => {
      return calculateBattleAttributes(state.player)
    },
    
    // 战斗力
    battlePower: (state) => {
      const attributes = calculateBattleAttributes(state.player)
      return calculatePower(attributes)
    },
    
    // 天赋详细信息
    talentDetails: (state) => {
      return getTalentDetails(state.player.talents, state.player.level)
    },
    
    // 经脉详细信息
    meridianDetails: (state) => {
      return getMeridianDetails(state.player.level)
    },
    
    // 仙灵环详细信息
    spiritRingDetails: (state) => {
      return getSpiritRingDetails(state.player.level)
    },
    
    // 仙战榜详细信息
    immortalRankingDetails: (state) => {
      return getImmortalRankingDetails(state.player.immortalRanking)
    }
  },
  
  actions: {
    // 暂停游戏
    pauseGame() {
      this.gameState.isPaused = true
    },
    
    // 恢复游戏
    resumeGame() {
      this.gameState.isPaused = false
    },
    
    // 切换暂停状态
    togglePause() {
      this.gameState.isPaused = !this.gameState.isPaused
    },
    
    // 开始挂机 (保留兼容性)
    startIdle() {
      this.idleState.isIdle = true
      this.idleState.startTime = Date.now()
    },
    
    // 停止挂机 (保留兼容性)
    stopIdle() {
      this.idleState.isIdle = false
      this.idleState.startTime = null
    },
    
    // 处理游戏收益(每秒调用)
    processGameGains(seconds) {
      // 如果游戏暂停，直接返回，不处理任何数据
      if (this.gameState.isPaused) {
        return
      }
      
      const gains = this.calculateGains(seconds)
      
      this.player.spiritStone += gains.spiritStone
      this.player.exp += gains.exp
      this.player.combat += gains.combat
      
      // 更新时间进度 (每秒增加13%)
      this.gameState.timeProgress += 13 * seconds * this.player.gameSpeed
      // 进度条可以超过100%，通过取模实现循环效果
      if (this.gameState.timeProgress >= 100) {
        this.gameState.timeProgress = this.gameState.timeProgress % 100
      }
      
      // 移除自动突破，改为手动点击渡劫飞升按钮
    },
    
    // 计算收益
    calculateGains(seconds) {
      const speeds = this.actualSpeeds
      
      return {
        spiritStone: Math.floor(speeds.spiritStone * seconds),
        exp: Math.floor(speeds.exp * seconds),
        combat: Math.floor(speeds.combat * seconds)
      }
    },
    
    // 境界突破（渡劫飞升）
    breakthrough() {
      if (!this.canBreakthrough) return false
      
      const requirements = this.currentRequirements
      const oldLevel = this.player.level
      
      // 扣除突破所需的修为和战斗经验，保留剩余部分
      this.player.exp -= requirements.exp
      this.player.combat -= requirements.combat
      
      // 提升境界
      this.player.level++
      const newLevel = this.player.level
      
      // 年龄增长
      this.player.age += Math.floor(Math.random() * 10) + 1
      
      // 属性提升(简单的线性增长)
      this.player.baseExpSpeed = Math.floor(this.player.baseExpSpeed * 1.2)
      this.player.baseCombatSpeed = Math.floor(this.player.baseCombatSpeed * 1.15)
      this.player.spiritStoneSpeed = Math.floor(this.player.spiritStoneSpeed * 1.1)
      
      // 天赋升级（如果跨越了大境界）
      this.player.talents = upgradeTalentsOnBreakthrough(this.player.talents, oldLevel, newLevel)
      
      // 仙战榜升级（如果跨越了大境界）
      const oldRealmLevel = Math.floor((oldLevel - 1) / 10) + 1
      const newRealmLevel = Math.floor((newLevel - 1) / 10) + 1
      if (newRealmLevel > oldRealmLevel) {
        this.player.immortalRanking = addRealmBonus(this.player.immortalRanking, newRealmLevel)
      }
      
      return true
    },
    
    // 离线收益计算
    calculateOfflineGains() {
      if (!this.gameState.lastOfflineTime) return null
      
      const offlineSeconds = (Date.now() - this.gameState.lastOfflineTime) / 1000
      const maxOfflineHours = 24 // 最大离线收益24小时
      const actualSeconds = Math.min(offlineSeconds, maxOfflineHours * 3600)
      
      return {
        time: actualSeconds,
        gains: this.calculateGains(actualSeconds)
      }
    },
    
    // 设置离线
    setOffline() {
      this.gameState.isOnline = false
      this.gameState.lastOfflineTime = Date.now()
      this.stopIdle()
    },
    
    // 设置在线
    setOnline() {
      this.gameState.isOnline = true
      
      // 计算离线收益
      const offlineResult = this.calculateOfflineGains()
      if (offlineResult) {
        this.processGameGains(offlineResult.time)
      }
      
      this.gameState.lastOfflineTime = null
    },
    
    // 保存游戏数据
    saveGame() {
      const slotId = getCurrentSlotId()
      
      if (!slotId) {
        console.warn('未选择存档槽位，无法保存')
        return
      }
      
      const saveData = {
        player: this.player,
        gameState: this.gameState,
        idleState: this.idleState
      }
      
      saveToSlot(slotId, saveData)
    },
    
    // 加载游戏数据
    loadGame() {
      const slotId = getCurrentSlotId()
      
      if (!slotId) {
        console.warn('未选择存档槽位')
        return
      }
      
      const saveData = loadSaveSlot(slotId)
      if (saveData) {
        try {
          // 直接使用存档数据覆盖，确保姓名等信息正确加载
          if (saveData.player) {
            this.player = { ...this.player, ...saveData.player }
          }
          if (saveData.gameState) {
            this.gameState = { ...this.gameState, ...saveData.gameState }
          }
          if (saveData.idleState) {
            this.idleState = { ...this.idleState, ...saveData.idleState }
          }
          
          // 兼容旧存档：将旧的速度属性转换为新的基础速度属性
          if (saveData.player.expSpeed && !saveData.player.baseExpSpeed) {
            this.player.baseExpSpeed = 1 // 重置为基础值，让新公式计算
          }
          if (saveData.player.combatSpeed && !saveData.player.baseCombatSpeed) {
            this.player.baseCombatSpeed = 1 // 重置为基础值，让新公式计算
          }
          
          // 兼容旧存档：补全缺失的仙战榜数据
          if (this.player.immortalRanking) {
            const currentLevel = this.player.level
            const currentRealmLevel = Math.floor((currentLevel - 1) / 10) + 1
            const existingRealmLevels = Object.keys(this.player.immortalRanking).map(Number)
            const maxExistingRealmLevel = Math.max(...existingRealmLevels, 0)
            
            // 如果当前境界级别大于已有的最大境界级别，补全缺失的境界
            if (currentRealmLevel > maxExistingRealmLevel) {
              console.log(`检测到仙战榜数据不完整，正在补全从第${maxExistingRealmLevel + 1}境到第${currentRealmLevel}境的数据...`)
              for (let realmLevel = maxExistingRealmLevel + 1; realmLevel <= currentRealmLevel; realmLevel++) {
                this.player.immortalRanking = addRealmBonus(this.player.immortalRanking, realmLevel)
              }
              console.log('仙战榜数据补全完成！')
            }
          } else {
            // 如果完全没有仙战榜数据，重新初始化
            const currentLevel = this.player.level
            const currentRealmLevel = Math.floor((currentLevel - 1) / 10) + 1
            this.player.immortalRanking = initializeImmortalRanking(currentRealmLevel)
            console.log(`初始化仙战榜数据到第${currentRealmLevel}境`)
          }
          
          // 如果有离线时间,设置为离线状态
          if (saveData.saveTime) {
            this.gameState.lastOfflineTime = saveData.saveTime
            this.setOnline()
          }
          
          console.log('游戏数据加载成功，玩家姓名:', this.player.name)
        } catch (error) {
          console.error('加载游戏数据失败:', error)
        }
      }
    },
    
    // 重置游戏
    resetGame() {
      // 重置玩家数据到初始状态
      this.player = {
        name: '道友',
        level: 1,
        age: 16,
        jade: 0,
        spiritStone: 100,
        exp: 0,
        combat: 0,
        spiritStoneSpeed: 1,
        baseExpSpeed: 1,
        baseCombatSpeed: 1,
        gameSpeed: 1,
        talents: {
          qigan: 40,
          shishi: 40,
          gengu: 40,
          wuxing: 40,
          jiyuan: 40
        },
        spiritualRoots: {
          jin: 50,
          mu: 50,
          shui: 50,
          huo: 50,
          tu: 50,
          feng: 50,
          lei: 50,
          guang: 100
        },
        immortalRanking: initializeImmortalRanking(1)
      }
      
      // 重置游戏状态
      this.gameState = {
        isOnline: true,
        lastOfflineTime: null,
        totalPlayTime: 0,
        timeProgress: 0,
        isPaused: false
      }
      
      // 重置挂机状态
      this.idleState = {
        isIdle: true,
        startTime: null
      }
      
      // 清除本地存储
      localStorage.removeItem('xiuxian-game-save')
      
      console.log('游戏已重置到初始状态')
    }
  }
})