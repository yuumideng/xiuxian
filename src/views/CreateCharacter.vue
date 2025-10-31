<template>
  <div class="create-character-page">
    <!-- 头部 -->
    <div class="header">
      <button class="back-btn" @click="goBack">
        ←
      </button>
      <h1 class="title">游戏开局数据设置</h1>
    </div>
    
    <!-- 表单内容 -->
    <div class="form-content">
      <!-- 姓名和性别（同一行） -->
      <div class="name-gender-row">
        <div class="input-group">
          <label class="label">姓</label>
          <div class="input-wrapper">
            <input
              v-model="surname"
              type="text"
              class="input"
              placeholder="姓"
              maxlength="2"
            />
            <button class="dice-btn" @click="randomizeSurname">
              🎲
            </button>
          </div>
        </div>
        
        <div class="input-group">
          <label class="label">名</label>
          <div class="input-wrapper">
            <input
              v-model="givenName"
              type="text"
              class="input"
              placeholder="名"
              maxlength="2"
            />
            <button class="dice-btn" @click="randomizeGivenName">
              🎲
            </button>
          </div>
        </div>
        
        <div class="input-group">
          <label class="label">性别</label>
          <div class="gender-options">
            <label class="gender-option">
              <input
                v-model="gender"
                type="radio"
                value="male"
                class="gender-radio"
              />
              <span class="gender-text">♂男</span>
            </label>
            <label class="gender-option">
              <input
                v-model="gender"
                type="radio"
                value="female"
                class="gender-radio"
              />
              <span class="gender-text">♀女</span>
            </label>
          </div>
        </div>
      </div>
      
      <!-- 天赋和灵根 -->
      <div class="talents-roots-section">
        <!-- 天赋 -->
        <div class="talents-box">
          <h3 class="section-title">天赋</h3>
          <div class="talents-list">
            <div class="talent-item">气感：{{ talents.qigan }}/40</div>
            <div class="talent-item">神识：{{ talents.shishi }}/40</div>
            <div class="talent-item">根骨：{{ talents.gengu }}/40</div>
            <div class="talent-item">悟性：{{ talents.wuxing }}/40</div>
            <div class="talent-item">机缘：{{ talents.jiyuan }}/40</div>
          </div>
        </div>
        
        <!-- 灵根 -->
        <div class="roots-box">
          <h3 class="section-title">灵根</h3>
          <div class="roots-info">
            <div class="fake-roots">伪灵根:{{ fakeRootsCount }}/200</div>
            <div class="roots-grid">
              <div class="root-item">金灵根({{ spiritualRoots.jin }})</div>
              <div class="root-item">木灵根({{ spiritualRoots.mu }})</div>
              <div class="root-item">水灵根({{ spiritualRoots.shui }})</div>
              <div class="root-item">土灵根({{ spiritualRoots.tu }})</div>
              <div class="root-item">火灵根({{ spiritualRoots.huo }})</div>
              <div class="root-item">风灵根({{ spiritualRoots.feng }})</div>
              <div class="root-item">雷灵根({{ spiritualRoots.lei }})</div>
              <div class="root-item">光灵根({{ spiritualRoots.guang }})</div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 操作按钮（同一行） -->
      <div class="action-buttons">
        <button class="vip-random-btn">
          VIP随机
        </button>
        <button class="add-random-btn">
          🎲+99
        </button>
        <div class="dice-count">
          🎲×{{ randomCount }}
        </div>
      </div>
      
      <!-- 轮回加成说明（精简） -->
      <div class="reincarnation-info">
        轮回加成 = {{ reincarnationBonus.realm }} + {{ reincarnationBonus.lifespan }} = 
        <span class="highlight">{{ reincarnationBonus.total }}</span>
      </div>
      
      <!-- 灵根说明（精简合并） -->
      <div class="roots-description">
        <div class="desc-content">
          <p><strong>灵根说明：</strong>金木水火土风雷光八种灵根影响修为及功法修炼速度。天灵根（单属性）最佳，真灵根（双属性）次之，伪灵根（三属性+）较慢。<span class="red-text">灵根种类越多数值越低越好</span>，但<span class="orange-text">修炼越慢</span>。</p>
        </div>
      </div>
      
      <!-- 开始按钮 -->
      <button class="start-btn" @click="startGame">
        开启修仙之旅
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { randomSurname, randomName } from '@/data/names.js'
import { getCurrentSlotId, createNewSave } from '@/utils/saveManager.js'

const router = useRouter()

// 表单数据
const surname = ref('')
const givenName = ref('')
const gender = ref('male')

// 初始化随机姓名
const initRandomName = () => {
  surname.value = randomSurname()
  givenName.value = randomName(gender.value)
}

// 页面加载时生成随机姓名
initRandomName()

// 天赋数据
const talents = ref({
  qigan: 8,
  shishi: 7,
  gengu: 11,
  wuxing: 6,
  jiyuan: 8
})

// 灵根数据
const spiritualRoots = ref({
  jin: 12,
  mu: 10,
  shui: 7,
  tu: 11,
  huo: 0,
  feng: 0,
  lei: 0,
  guang: 0
})

// 伪灵根数量
const fakeRootsCount = computed(() => {
  return Object.values(spiritualRoots.value).reduce((sum, val) => sum + val, 0)
})

// 随机次数
const randomCount = ref(10)

// 轮回加成
const reincarnationBonus = ref({
  realm: 3873.88,
  lifespan: 4620.3,
  total: 8494.18
})

// 完整名字
const fullName = computed(() => {
  return surname.value + givenName.value
})

// 随机姓氏
const randomizeSurname = () => {
  surname.value = randomSurname()
}

// 随机名字
const randomizeGivenName = () => {
  givenName.value = randomName(gender.value)
}

// 开始游戏
const startGame = () => {
  if (!fullName.value || fullName.value.length < 2) {
    alert('请输入完整的姓名')
    return
  }
  
  const slotId = getCurrentSlotId()
  if (!slotId) {
    alert('未选择存档槽位')
    router.push('/')
    return
  }
  
  // 创建新存档
  createNewSave(slotId, fullName.value)
  
  // 跳转到游戏页面
  router.push('/game')
}

// 返回
const goBack = () => {
  router.push('/')
}
</script>

<style scoped>
.create-character-page {
  height: 100vh;
  background: #f5f5f5;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* 头部 */
.header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  flex-shrink: 0;
}

.back-btn {
  background: transparent;
  border: none;
  font-size: 1.5rem;
  color: #666;
  cursor: pointer;
  padding: 0.25rem;
}

.title {
  font-size: 1rem;
  font-weight: 600;
  color: #333;
  margin: 0;
}

/* 表单内容 */
.form-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  overflow: hidden;
}

/* 姓名和性别区域（同一行） */
.name-gender-row {
  background: white;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  padding: 0.5rem;
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  gap: 0.5rem;
  flex-shrink: 0;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 0;
}

.label {
  font-size: 0.75rem;
  color: #666;
  font-weight: 500;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  min-width: 0;
}

.input {
  width: 100%;
  min-width: 0;
  padding: 0.375rem 2rem 0.375rem 0.5rem;
  border: 1px solid #ddd;
  border-radius: 0.375rem;
  font-size: 0.8125rem;
  background: #f9f9f9;
}

.input:focus {
  outline: none;
  border-color: #999;
}

.dice-btn {
  position: absolute;
  right: 0.25rem;
  background: #333;
  border: none;
  border-radius: 50%;
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 0.75rem;
  flex-shrink: 0;
}

.gender-options {
  display: flex;
  gap: 0.25rem;
  height: 100%;
  align-items: center;
}

.gender-option {
  display: flex;
  align-items: center;
  gap: 0.125rem;
  cursor: pointer;
  white-space: nowrap;
}

.gender-radio {
  width: 0.875rem;
  height: 0.875rem;
  flex-shrink: 0;
}

.gender-text {
  font-size: 0.75rem;
  color: #333;
}

/* 天赋和灵根区域（同一行） */
.talents-roots-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
  flex-shrink: 0;
}

.talents-box,
.roots-box {
  background: white;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  padding: 0.5rem;
}

.section-title {
  font-size: 0.8125rem;
  font-weight: 600;
  color: #333;
  margin: 0 0 0.375rem 0;
  text-align: center;
}

.talents-list {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.talent-item {
  font-size: 0.75rem;
  color: #666;
}

.roots-info {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.fake-roots {
  font-size: 0.75rem;
  color: #666;
  text-align: center;
  padding: 0.25rem;
  background: #f9f9f9;
  border-radius: 0.375rem;
}

.roots-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.25rem;
}

.root-item {
  font-size: 0.6875rem;
  color: #666;
}

/* 操作按钮（同一行） */
.action-buttons {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  flex-shrink: 0;
}

.vip-random-btn {
  flex: 1;
  background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
  color: #333;
  border: none;
  border-radius: 0.375rem;
  padding: 0.5rem;
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(255, 215, 0, 0.3);
}

.add-random-btn {
  background: #333;
  color: white;
  border: none;
  border-radius: 0.375rem;
  padding: 0.5rem 0.625rem;
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
}

.dice-count {
  background: white;
  border: 1px solid #ddd;
  border-radius: 0.375rem;
  padding: 0.5rem 0.625rem;
  font-size: 0.75rem;
  font-weight: 600;
}

/* 轮回加成说明（精简） */
.reincarnation-info {
  background: white;
  border: 2px solid #ff6b6b;
  border-radius: 0.375rem;
  padding: 0.375rem 0.5rem;
  font-size: 0.6875rem;
  color: #666;
  line-height: 1.3;
  flex-shrink: 0;
}

.highlight {
  color: #ff6b6b;
  font-weight: 600;
}

/* 灵根说明（精简合并） */
.roots-description {
  background: white;
  border: 1px solid #ddd;
  border-radius: 0.375rem;
  padding: 0.375rem 0.5rem;
  flex-shrink: 0;
}

.desc-content {
  display: flex;
  flex-direction: column;
}

.desc-content p {
  font-size: 0.6875rem;
  color: #666;
  margin: 0;
  line-height: 1.3;
}

.red-text {
  color: #ff6b6b;
  font-weight: 600;
}

.orange-text {
  color: #ff9800;
  font-weight: 600;
}

/* 开始按钮 */
.start-btn {
  width: 100%;
  background: #333;
  color: white;
  border: none;
  border-radius: 0.375rem;
  padding: 0.75rem;
  font-size: 0.9375rem;
  font-weight: 600;
  cursor: pointer;
  flex-shrink: 0;
}

.start-btn:active {
  background: #222;
}
</style>
