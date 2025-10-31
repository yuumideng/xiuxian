/**
 * 存档管理工具
 * 管理多个游戏存档
 */

import { initializeImmortalRanking } from './immortalRankingSystem.js'

const SAVE_SLOTS_KEY = 'xiuxian-game-saves'
const MAX_SAVE_SLOTS = 8 // 最多8个存档槽位

/**
 * 获取所有存档槽位信息
 * @returns {Array} 存档槽位数组
 */
export function getAllSaveSlots() {
  const savesData = localStorage.getItem(SAVE_SLOTS_KEY)
  if (!savesData) {
    // 初始化为空数组，不自动创建存档位
    localStorage.setItem(SAVE_SLOTS_KEY, JSON.stringify([]))
    return []
  }
  
  try {
    return JSON.parse(savesData)
  } catch (error) {
    console.error('读取存档列表失败:', error)
    return []
  }
}

/**
 * 获取指定槽位的存档数据
 * @param {number} slotId - 槽位ID
 * @returns {Object|null} 存档数据
 */
export function loadSaveSlot(slotId) {
  const saveKey = `xiuxian-game-save-${slotId}`
  const saveData = localStorage.getItem(saveKey)
  
  if (!saveData) {
    return null
  }
  
  try {
    return JSON.parse(saveData)
  } catch (error) {
    console.error(`读取存档槽位${slotId}失败:`, error)
    return null
  }
}

/**
 * 保存游戏数据到指定槽位
 * @param {number} slotId - 槽位ID
 * @param {Object} gameData - 游戏数据
 */
export function saveToSlot(slotId, gameData) {
  const saveKey = `xiuxian-game-save-${slotId}`
  const saveTime = Date.now()
  
  const saveData = {
    ...gameData,
    slotId,
    saveTime
  }
  
  // 保存游戏数据
  localStorage.setItem(saveKey, JSON.stringify(saveData))
  
  // 更新存档槽位信息
  updateSlotInfo(slotId, gameData.player, saveTime)
}

/**
 * 更新存档槽位信息
 * @param {number} slotId - 槽位ID
 * @param {Object} player - 玩家数据
 * @param {number} saveTime - 保存时间
 */
function updateSlotInfo(slotId, player, saveTime) {
  const slots = getAllSaveSlots()
  const slotIndex = slots.findIndex(s => s.slotId === slotId)
  
  if (slotIndex !== -1) {
    slots[slotIndex] = {
      slotId,
      isEmpty: false,
      playerName: player.name,
      level: player.level,
      age: player.age,
      saveTime,
      playTime: player.totalPlayTime || 0
    }
    
    localStorage.setItem(SAVE_SLOTS_KEY, JSON.stringify(slots))
  }
}

/**
 * 删除指定槽位的存档（同时删除存档位）
 * @param {number} slotId - 槽位ID
 */
export function deleteSaveSlot(slotId) {
  const saveKey = `xiuxian-game-save-${slotId}`
  localStorage.removeItem(saveKey)
  
  // 从存档列表中移除该槽位
  const slots = getAllSaveSlots()
  const filteredSlots = slots.filter(s => s.slotId !== slotId)
  
  // 重新分配 slotId
  filteredSlots.forEach((slot, index) => {
    slot.slotId = index + 1
  })
  
  // 允许删除到0个存档位
  localStorage.setItem(SAVE_SLOTS_KEY, JSON.stringify(filteredSlots))
}

/**
 * 添加新的存档槽位
 * @returns {boolean} 是否添加成功
 */
export function addNewSlot() {
  const slots = getAllSaveSlots()
  
  if (slots.length >= MAX_SAVE_SLOTS) {
    console.warn('已达到最大存档槽位数量')
    return false
  }
  
  const newSlotId = slots.length + 1
  slots.push({
    slotId: newSlotId,
    isEmpty: true,
    playerName: null,
    level: null,
    age: null,
    saveTime: null,
    playTime: null
  })
  
  localStorage.setItem(SAVE_SLOTS_KEY, JSON.stringify(slots))
  return true
}

/**
 * 创建新存档
 * @param {number} slotId - 槽位ID
 * @param {string} playerName - 角色名
 * @returns {Object} 初始游戏数据
 */
export function createNewSave(slotId, playerName) {
  const initialData = {
    player: {
      name: playerName,
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
      immortalRanking: initializeImmortalRanking(1),
      totalPlayTime: 0
    },
    gameState: {
      isOnline: true,
      lastOfflineTime: null,
      totalPlayTime: 0,
      timeProgress: 0,
      isPaused: false
    },
    idleState: {
      isIdle: true,
      startTime: null
    }
  }
  
  saveToSlot(slotId, initialData)
  return initialData
}

/**
 * 获取当前活跃的存档槽位ID
 * @returns {number|null} 槽位ID
 */
export function getCurrentSlotId() {
  return parseInt(localStorage.getItem('xiuxian-game-current-slot')) || null
}

/**
 * 设置当前活跃的存档槽位ID
 * @param {number} slotId - 槽位ID
 */
export function setCurrentSlotId(slotId) {
  localStorage.setItem('xiuxian-game-current-slot', slotId.toString())
}
