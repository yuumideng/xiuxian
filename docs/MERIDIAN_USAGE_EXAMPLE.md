# 经脉系统使用示例

## 在 Vue 组件中使用经脉系统

### 1. 获取经脉详细信息

```vue
<template>
  <div class="meridian-panel">
    <h3>经脉系统</h3>
    <div class="meridian-list">
      <div 
        v-for="meridian in meridianDetails" 
        :key="meridian.key"
        class="meridian-item"
      >
        <span class="meridian-icon">{{ meridian.icon }}</span>
        <span class="meridian-name">{{ meridian.name }}</span>
        <span class="meridian-bonus">+{{ meridian.bonus }}</span>
        <span class="meridian-desc">{{ meridian.description }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useGameStore } from '@/store/gameState'

const gameStore = useGameStore()

// 获取经脉详细信息
const meridianDetails = computed(() => gameStore.meridianDetails)
</script>

<style scoped>
.meridian-panel {
  padding: 20px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 8px;
}

.meridian-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.meridian-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}

.meridian-icon {
  font-size: 24px;
}

.meridian-name {
  font-weight: bold;
  min-width: 80px;
}

.meridian-bonus {
  color: #4ade80;
  font-weight: bold;
}

.meridian-desc {
  color: #94a3b8;
  font-size: 14px;
}
</style>
```

### 2. 显示经脉加成对属性的影响

```vue
<template>
  <div class="attribute-panel">
    <h3>战斗属性</h3>
    <div class="attribute-list">
      <div class="attribute-item">
        <span class="attr-name">血量</span>
        <span class="attr-value">{{ battleAttributes.hp }}</span>
        <span class="attr-bonus">
          (天赋+{{ talentBonus.hp }} | 经脉+{{ meridianBonus.hp }})
        </span>
      </div>
      <div class="attribute-item">
        <span class="attr-name">攻击</span>
        <span class="attr-value">{{ battleAttributes.attack }}</span>
        <span class="attr-bonus">
          (天赋+{{ talentBonus.attack }} | 经脉+{{ meridianBonus.attack }})
        </span>
      </div>
      <div class="attribute-item">
        <span class="attr-name">防御</span>
        <span class="attr-value">{{ battleAttributes.defense }}</span>
        <span class="attr-bonus">
          (天赋+{{ talentBonus.defense }} | 经脉+{{ meridianBonus.defense }})
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useGameStore } from '@/store/gameState'
import { calculateBattleAttributeBonuses as calculateTalentBonuses } from '@/utils/talentSystem'
import { calculateBattleAttributeBonuses as calculateMeridianBonuses } from '@/utils/meridianSystem'

const gameStore = useGameStore()

// 战斗属性
const battleAttributes = computed(() => gameStore.battleAttributes)

// 天赋加成
const talentBonus = computed(() => {
  return calculateTalentBonuses(gameStore.player.talents, gameStore.player.level)
})

// 经脉加成
const meridianBonus = computed(() => {
  return calculateMeridianBonuses(gameStore.player.level)
})
</script>
```

### 3. 突破时显示经脉升级提示

```vue
<template>
  <div class="breakthrough-modal" v-if="showBreakthroughModal">
    <div class="modal-content">
      <h2>突破成功！</h2>
      
      <!-- 境界提升 -->
      <div class="realm-upgrade">
        <p>{{ oldRealm.name }} → {{ newRealm.name }}</p>
      </div>
      
      <!-- 天赋升级 -->
      <div class="talent-upgrade" v-if="talentUpgraded">
        <h3>天赋提升</h3>
        <p>所有天赋 +40 点</p>
        <p>天赋加成翻倍</p>
      </div>
      
      <!-- 经脉升级 -->
      <div class="meridian-upgrade" v-if="meridianUpgraded">
        <h3>经脉强化</h3>
        <p>所有经脉加成翻倍</p>
        <p>{{ meridianUpgradeInfo.oldBonus }} → {{ meridianUpgradeInfo.newBonus }}</p>
      </div>
      
      <button @click="closeModal">确定</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useGameStore } from '@/store/gameState'
import { getRealmByLevel } from '@/data/realms'
import { getMeridianUpgradeInfo } from '@/utils/meridianSystem'

const gameStore = useGameStore()
const showBreakthroughModal = ref(false)

// 突破处理
const handleBreakthrough = () => {
  const oldLevel = gameStore.player.level
  const newLevel = oldLevel + 1
  
  // 执行突破
  gameStore.breakthrough()
  
  // 获取升级信息
  const oldRealm = getRealmByLevel(oldLevel)
  const newRealm = getRealmByLevel(newLevel)
  const meridianUpgradeInfo = getMeridianUpgradeInfo(oldLevel, newLevel)
  
  // 检查是否跨越大境界
  const talentUpgraded = Math.floor((oldLevel - 1) / 10) !== Math.floor((newLevel - 1) / 10)
  const meridianUpgraded = meridianUpgradeInfo.isUpgraded
  
  // 显示模态框
  if (talentUpgraded || meridianUpgraded) {
    showBreakthroughModal.value = true
  }
}

const closeModal = () => {
  showBreakthroughModal.value = false
}
</script>
```

### 4. 显示修炼速度加成

```vue
<template>
  <div class="cultivation-speed-panel">
    <h3>修炼速度</h3>
    <div class="speed-list">
      <div class="speed-item">
        <span class="speed-name">修为速度</span>
        <span class="speed-value">{{ actualSpeeds.exp }}/秒</span>
        <span class="speed-bonus">
          (基础+{{ baseExpBonus }} | 天赋+{{ talentExpBonus }} | 经脉+{{ meridianExpBonus }})
        </span>
      </div>
      <div class="speed-item">
        <span class="speed-name">战斗经验速度</span>
        <span class="speed-value">{{ actualSpeeds.combat }}/秒</span>
        <span class="speed-bonus">
          (基础+{{ baseCombatBonus }} | 天赋+{{ talentCombatBonus }} | 经脉+{{ meridianCombatBonus }})
        </span>
      </div>
      <div class="speed-item">
        <span class="speed-name">灵石速度</span>
        <span class="speed-value">{{ actualSpeeds.spiritStone }}/秒</span>
        <span class="speed-bonus">
          (天赋+{{ talentStoneBonus }} | 经脉+{{ meridianStoneBonus }})
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useGameStore } from '@/store/gameState'
import { calculateCultivationSpeedBonuses as calculateTalentSpeedBonuses } from '@/utils/talentSystem'
import { calculateCultivationSpeedBonuses as calculateMeridianSpeedBonuses } from '@/utils/meridianSystem'

const gameStore = useGameStore()

// 实际速度
const actualSpeeds = computed(() => gameStore.actualSpeeds)

// 天赋速度加成
const talentSpeedBonuses = computed(() => {
  return calculateTalentSpeedBonuses(gameStore.player.talents, gameStore.player.level)
})

// 经脉速度加成
const meridianSpeedBonuses = computed(() => {
  return calculateMeridianSpeedBonuses(gameStore.player.level)
})

// 各项加成
const baseExpBonus = 10000
const baseCombatBonus = 10000
const talentExpBonus = computed(() => talentSpeedBonuses.value.expSpeed)
const talentCombatBonus = computed(() => talentSpeedBonuses.value.combatSpeed)
const talentStoneBonus = computed(() => talentSpeedBonuses.value.spiritStoneSpeed)
const meridianExpBonus = computed(() => meridianSpeedBonuses.value.expSpeed)
const meridianCombatBonus = computed(() => meridianSpeedBonuses.value.combatSpeed)
const meridianStoneBonus = computed(() => meridianSpeedBonuses.value.spiritStoneSpeed)
</script>
```

### 5. 经脉对比工具

```vue
<template>
  <div class="meridian-comparison">
    <h3>经脉成长预览</h3>
    <div class="comparison-table">
      <table>
        <thead>
          <tr>
            <th>境界</th>
            <th>经脉加成</th>
            <th>血量</th>
            <th>攻击</th>
            <th>防御</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="level in previewLevels" :key="level">
            <td>{{ getRealmName(level) }}</td>
            <td>{{ getMeridianBonus(level) }}</td>
            <td>{{ getAttributePreview(level, 'hp') }}</td>
            <td>{{ getAttributePreview(level, 'attack') }}</td>
            <td>{{ getAttributePreview(level, 'defense') }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { getRealmByLevel } from '@/data/realms'
import { calculateMeridianBonus } from '@/utils/meridianSystem'
import { calculateBattleAttributes } from '@/utils/battleCalculator'

// 预览的等级列表
const previewLevels = [1, 11, 21, 31, 41, 51]

// 获取境界名称
const getRealmName = (level) => {
  return getRealmByLevel(level).name
}

// 获取经脉加成
const getMeridianBonus = (level) => {
  return calculateMeridianBonus(level)
}

// 获取属性预览
const getAttributePreview = (level, attr) => {
  const player = {
    level,
    talents: {
      qigan: 40 + Math.floor((level - 1) / 10) * 40,
      shishi: 40 + Math.floor((level - 1) / 10) * 40,
      gengu: 40 + Math.floor((level - 1) / 10) * 40,
      wuxing: 40 + Math.floor((level - 1) / 10) * 40,
      jiyuan: 40 + Math.floor((level - 1) / 10) * 40
    }
  }
  const attributes = calculateBattleAttributes(player)
  return attributes[attr]
}
</script>

<style scoped>
.comparison-table {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 10px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

th {
  background: rgba(255, 255, 255, 0.1);
  font-weight: bold;
}

tr:hover {
  background: rgba(255, 255, 255, 0.05);
}
</style>
```

## 常用工具函数

### 格式化经脉加成

```javascript
export function formatMeridianBonus(bonus) {
  if (bonus >= 1000000) {
    return `${(bonus / 1000000).toFixed(1)}M`
  } else if (bonus >= 1000) {
    return `${(bonus / 1000).toFixed(1)}K`
  }
  return bonus.toString()
}
```

### 计算经脉贡献率

```javascript
export function calculateMeridianContribution(level, attr) {
  const talentBonus = calculateTalentBonuses(talents, level)[attr] || 0
  const meridianBonus = calculateMeridianBonuses(level)[attr] || 0
  const totalBonus = talentBonus + meridianBonus
  
  if (totalBonus === 0) return 0
  
  return (meridianBonus / totalBonus * 100).toFixed(1)
}
```

### 获取下一境界经脉提升

```javascript
export function getNextRealmMeridianBoost(currentLevel) {
  const currentRealmLevel = Math.floor((currentLevel - 1) / 10) + 1
  const nextRealmLevel = currentRealmLevel + 1
  const nextLevel = nextRealmLevel * 10 + 1
  
  const currentBonus = calculateMeridianBonus(currentLevel)
  const nextBonus = calculateMeridianBonus(nextLevel)
  
  return {
    currentBonus,
    nextBonus,
    increase: nextBonus - currentBonus,
    percentage: ((nextBonus / currentBonus - 1) * 100).toFixed(0)
  }
}
```

## 注意事项

1. **性能优化**：使用 `computed` 缓存计算结果，避免重复计算
2. **数据同步**：经脉加成会自动随境界提升而更新，无需手动触发
3. **UI更新**：突破时建议显示经脉升级动画，提升用户体验
4. **数值显示**：大数值建议使用 K、M 等单位简化显示
5. **加成说明**：在 UI 中清晰展示各个加成来源，帮助玩家理解

## 调试技巧

### 在控制台查看经脉信息

```javascript
// 在浏览器控制台中
import { getMeridianDetails } from '@/utils/meridianSystem'

// 查看当前经脉详情
console.log(getMeridianDetails(gameStore.player.level))

// 查看经脉加成
import { calculateMeridianBonus } from '@/utils/meridianSystem'
console.log('当前经脉加成:', calculateMeridianBonus(gameStore.player.level))

// 查看升级信息
import { getMeridianUpgradeInfo } from '@/utils/meridianSystem'
console.log('升级信息:', getMeridianUpgradeInfo(10, 11))
```
