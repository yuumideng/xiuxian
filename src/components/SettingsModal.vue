<template>
  <Modal v-model="isOpen" title="游戏设置">
    <div class="settings-content">
      <!-- 危险操作区 -->
      <div class="setting-section danger-zone">
        <h4 class="section-title danger">危险操作</h4>
        <div class="danger-content">
          <p class="warning-text">
            ⚠️ 重置游戏将清除所有进度，包括境界、修为、天赋、仙战榜等所有数据，此操作不可恢复！
          </p>
          <button
            class="reset-btn"
            @click="confirmReset"
          >
            重置游戏
          </button>
        </div>
      </div>

      <!-- 关于信息 -->
      <div class="setting-section">
        <h4 class="section-title">关于</h4>
        <div class="about-content">
          <p class="about-text">修仙挂机游戏 v1.0.0</p>
          <p class="about-text">一款放置类修仙游戏</p>
        </div>
      </div>
    </div>
  </Modal>
</template>

<script setup>
import { ref } from 'vue'
import { useGameStore } from '@/store/gameState.js'
import Modal from './common/Modal.vue'

const gameStore = useGameStore()

// 控制弹窗显示
const isOpen = defineModel({ type: Boolean, default: false })

// 确认重置
const confirmReset = () => {
  const confirmed = window.confirm(
    '⚠️ 确定要重置游戏吗？\n\n此操作将清除所有进度数据，包括：\n' +
    '• 境界和修为\n' +
    '• 天赋点数\n' +
    '• 仙战榜加成\n' +
    '• 灵石和仙玉\n' +
    '• 所有其他进度\n\n' +
    '此操作不可恢复！'
  )
  
  if (confirmed) {
    const doubleConfirm = window.confirm('真的确定要重置吗？这是最后一次确认！')
    if (doubleConfirm) {
      resetGame()
    }
  }
}

// 重置游戏
const resetGame = () => {
  gameStore.resetGame()
  isOpen.value = false
  alert('游戏已重置！祝你修仙之路顺利！')
}
</script>

<style scoped>
.settings-content {
  padding: 0.5rem 0;
}

.setting-section {
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.setting-section:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

.section-title {
  font-size: 0.9375rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.75rem;
}

.section-title.danger {
  color: #dc2626;
}

/* 游戏速度按钮 */
.speed-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.speed-btn {
  padding: 0.5rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  background-color: white;
  color: #4b5563;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.speed-btn:hover {
  border-color: #3b82f6;
  color: #3b82f6;
  background-color: #eff6ff;
}

.speed-btn.active {
  border-color: #3b82f6;
  background-color: #3b82f6;
  color: white;
}

/* 危险操作区 */
.danger-zone {
  background-color: #fef2f2;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid #fecaca;
}

.danger-content {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.warning-text {
  font-size: 0.8125rem;
  color: #991b1b;
  line-height: 1.5;
}

.reset-btn {
  padding: 0.625rem 1.25rem;
  background-color: #dc2626;
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.reset-btn:hover {
  background-color: #b91c1c;
}

.reset-btn:active {
  background-color: #991b1b;
}

/* 关于信息 */
.about-content {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.about-text {
  font-size: 0.8125rem;
  color: #6b7280;
  line-height: 1.5;
}
</style>
