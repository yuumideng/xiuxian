import { defineStore } from 'pinia'
import { getRealmByLevel, getRealmRequirements } from '@/data/realms.js'

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
      expSpeed: 10, // 修为增长速度/秒
      combatSpeed: 5, // 战斗经验增长速度/秒
      gameSpeed: 1, // 游戏整体速度倍率
      
      // 天赋属性
      talents: {
        qigan: 100, // 气感
        shishi: 100, // 神识
        gengu: 100, // 根骨
        wuxing: 100, // 悟性
        jiyuan: 100 // 机缘
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
      }
    },
    
    // 游戏状态
    gameState: {
      isOnline: true, // 是否在线
      lastOfflineTime: null, // 上次离线时间
      totalPlayTime: 0, // 总游戏时间(秒)
      timeProgress: 0, // 时间流逝进度 (0-100, 每秒增加13%)
    },
    
    // 挂机状态
    idleState: {
      isIdle: false, // 是否正在挂机
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
    
    // 实际速度(考虑游戏速度倍率和挂机状态)
    actualSpeeds: (state) => {
      // 挂机状态下获得100%收益，非挂机状态下获得50%收益
      const idleMultiplier = state.idleState.isIdle ? 1.0 : 0.5
      
      return {
        spiritStone: Math.floor(state.player.spiritStoneSpeed * state.player.gameSpeed * idleMultiplier),
        exp: Math.floor(state.player.expSpeed * state.player.gameSpeed * idleMultiplier),
        combat: Math.floor(state.player.combatSpeed * state.player.gameSpeed * idleMultiplier)
      }
    }
  },
  
  actions: {
    // 开始挂机
    startIdle() {
      this.idleState.isIdle = true
      this.idleState.startTime = Date.now()
    },
    
    // 停止挂机
    stopIdle() {
      this.idleState.isIdle = false
      this.idleState.startTime = null
    },
    
    // 处理游戏收益(每秒调用)
    processGameGains(seconds) {
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
      
      // 检查是否可以自动突破
      this.checkAutoBreakthrough()
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
    
    // 检查自动突破
    checkAutoBreakthrough() {
      while (this.canBreakthrough && this.nextRealm) {
        this.breakthrough()
      }
    },
    
    // 境界突破
    breakthrough() {
      if (!this.canBreakthrough) return false
      
      // 提升境界
      this.player.level++
      
      // 清空修为和战斗经验
      this.player.exp = 0
      this.player.combat = 0
      
      // 年龄增长
      this.player.age += Math.floor(Math.random() * 10) + 1
      
      // 属性提升(简单的线性增长)
      this.player.expSpeed = Math.floor(this.player.expSpeed * 1.2)
      this.player.combatSpeed = Math.floor(this.player.combatSpeed * 1.15)
      this.player.spiritStoneSpeed = Math.floor(this.player.spiritStoneSpeed * 1.1)
      
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
      const saveData = {
        player: this.player,
        gameState: this.gameState,
        saveTime: Date.now()
      }
      localStorage.setItem('xiuxian-game-save', JSON.stringify(saveData))
    },
    
    // 加载游戏数据
    loadGame() {
      const saveData = localStorage.getItem('xiuxian-game-save')
      if (saveData) {
        try {
          const data = JSON.parse(saveData)
          this.player = { ...this.player, ...data.player }
          this.gameState = { ...this.gameState, ...data.gameState }
          
          // 如果有离线时间,设置为离线状态
          if (data.saveTime) {
            this.gameState.lastOfflineTime = data.saveTime
            this.setOnline()
          }
        } catch (error) {
          console.error('加载游戏数据失败:', error)
        }
      }
    }
  }
})