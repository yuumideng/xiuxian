<template>
  <div class="save-select-page">
    <!-- 标题 -->
    <div class="header">
      <h1 class="title">天道轮回：我的修仙梦</h1>
      <button class="cloud-save-btn">
        云<br/>存档
      </button>
    </div>
    
    <!-- 存档列表 -->
    <div class="save-list">
      <!-- 空状态提示 -->
      <div v-if="saveSlots.length === 0" class="empty-state">
        <div class="empty-state-icon">📜</div>
        <div class="empty-state-text">暂无存档位</div>
        <div class="empty-state-hint">点击下方按钮创建新的存档位</div>
      </div>
      
      <div
        v-for="slot in saveSlots"
        :key="slot.slotId"
        class="save-slot"
        @click="selectSlot(slot)"
      >
        <div class="slot-number">{{ slot.slotId }}</div>
        
        <!-- 空存档 -->
        <div v-if="slot.isEmpty" class="empty-slot">
          <span class="empty-text">(点击开始修仙之旅)</span>
        </div>
        
        <!-- 已有存档 -->
        <div v-else class="filled-slot">
          <div class="slot-content">
            <div class="player-name">{{ slot.playerName }}</div>
            <div class="save-time">存档时间：{{ formatSaveTime(slot.saveTime) }}</div>
          </div>
          <div v-if="slot.isNew" class="new-badge">NEW</div>
        </div>
        
        <!-- 删除按钮（空存档和已有存档都显示） -->
        <button
          class="delete-btn"
          @click.stop="confirmDelete(slot.slotId)"
        >
          🗑
        </button>
      </div>
      
      <!-- 创建新存档位按钮 -->
      <div class="add-slot-btn" @click="addNewSlot" v-if="canAddSlot">
        <span class="add-icon">+</span>
        <span class="add-text">创建新的存档位</span>
      </div>
    </div>
    
    <!-- 底部进度条和提示 -->
    <div class="footer">
      <div class="progress-bar">
        <div class="progress-fill">100%</div>
      </div>
      <p class="footer-text">
        拒制不良游戏，拒绝盗版游戏，注意自我保护，谨防受骗上当<br/>
        适度游戏益脑，沉迷游戏伤身，合理安排时间，享受健康生活
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getAllSaveSlots, deleteSaveSlot, setCurrentSlotId, addNewSlot as addSlot } from '@/utils/saveManager.js'

const router = useRouter()
const saveSlots = ref([])

// 是否可以添加新存档位
const canAddSlot = computed(() => {
  return saveSlots.value.length < 8
})

// 加载存档列表
const loadSaveSlots = () => {
  saveSlots.value = getAllSaveSlots()
}

// 选择存档槽位
const selectSlot = (slot) => {
  setCurrentSlotId(slot.slotId)
  
  if (slot.isEmpty) {
    // 空存档，跳转到角色创建页面
    router.push('/create-character')
  } else {
    // 已有存档，直接进入游戏
    router.push('/game')
  }
}

// 确认删除存档
const confirmDelete = (slotId) => {
  const confirmed = window.confirm('确定要删除这个存档吗？此操作不可恢复！')
  if (confirmed) {
    deleteSaveSlot(slotId)
    loadSaveSlots()
  }
}

// 添加新存档位
const addNewSlot = () => {
  if (saveSlots.value.length >= 8) {
    alert('最多只能创建8个存档位')
    return
  }
  addSlot()
  loadSaveSlots()
}

// 格式化保存时间
const formatSaveTime = (timestamp) => {
  if (!timestamp) return ''
  
  const date = new Date(timestamp)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')
  
  return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`
}

onMounted(() => {
  loadSaveSlots()
})
</script>

<style scoped>
.save-select-page {
  min-height: 100vh;
  background: #f5f5f5;
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
}

/* 头部 */
.header {
  position: relative;
  text-align: center;
  margin-bottom: 1rem;
  padding-top: 0.5rem;
}

.title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #333;
  margin: 0;
  letter-spacing: 0.05em;
}

.cloud-save-btn {
  position: absolute;
  top: 0;
  right: 0;
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%);
  color: white;
  border: none;
  border-radius: 0.5rem;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  line-height: 1.3;
  box-shadow: 0 2px 8px rgba(238, 90, 111, 0.3);
}

/* 存档列表 */
.save-list {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.save-slot {
  background: white;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  padding: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
}

.save-slot:hover {
  border-color: #999;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.slot-number {
  font-size: 1.125rem;
  font-weight: 700;
  color: #666;
  min-width: 1.25rem;
}

/* 空状态 */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 1rem;
  gap: 0.75rem;
}

.empty-state-icon {
  font-size: 3rem;
  opacity: 0.5;
}

.empty-state-text {
  font-size: 1.125rem;
  font-weight: 600;
  color: #666;
}

.empty-state-hint {
  font-size: 0.875rem;
  color: #999;
}

/* 空存档 */
.empty-slot {
  flex: 1;
  text-align: center;
}

.empty-text {
  color: #999;
  font-size: 0.9375rem;
}

/* 已有存档 */
.filled-slot {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 1rem;
  position: relative;
}

.slot-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.player-name {
  font-size: 1rem;
  font-weight: 600;
  color: #333;
}

.save-time {
  font-size: 0.75rem;
  color: #999;
}

.delete-btn {
  background: transparent;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
  padding: 0.25rem;
  opacity: 0.6;
  transition: opacity 0.2s;
}

.delete-btn:hover {
  opacity: 1;
}

.new-badge {
  position: absolute;
  top: -0.5rem;
  left: 2.5rem;
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%);
  color: white;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.25rem 0.5rem;
  border-radius: 1rem;
  box-shadow: 0 2px 4px rgba(238, 90, 111, 0.3);
}

/* 创建新存档位按钮 */
.add-slot-btn {
  background: white;
  border: 2px dashed #999;
  border-radius: 0.5rem;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;
}

.add-slot-btn:hover {
  border-color: #667eea;
  background: #f9fafb;
}

.add-icon {
  font-size: 1.5rem;
  color: #999;
}

.add-slot-btn:hover .add-icon {
  color: #667eea;
}

.add-text {
  font-size: 0.875rem;
  color: #999;
  font-weight: 500;
}

.add-slot-btn:hover .add-text {
  color: #667eea;
}

/* 底部 */
.footer {
  margin-top: auto;
  padding-top: 0.75rem;
}

.progress-bar {
  background: #e0e0e0;
  border-radius: 1rem;
  height: 2rem;
  overflow: hidden;
  margin-bottom: 0.75rem;
}

.progress-fill {
  background: linear-gradient(90deg, #4ade80 0%, #22c55e 100%);
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 0.9375rem;
  width: 100%;
}

.footer-text {
  text-align: center;
  font-size: 0.6875rem;
  color: #999;
  line-height: 1.5;
  margin: 0;
}

/* 响应式 */
@media (max-width: 639px) {
  .title {
    font-size: 1.5rem;
  }
  
  .save-slot {
    padding: 0.875rem;
  }
}
</style>
