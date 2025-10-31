# 战斗属性加成详情弹窗

## 功能概述

在战斗数据区块的标题旁边添加了【加成详情】按钮，点击后会打开一个弹窗，展示战斗属性的详细计算过程和各项加成明细。

## 组件结构

### 1. Modal.vue（通用弹窗组件）
**位置**: `src/components/common/Modal.vue`

**功能**:
- 通用的弹窗组件，可在整个项目中复用
- 支持标题自定义
- 支持点击遮罩层关闭
- 支持插槽自定义内容和底部按钮
- 自动控制 body 滚动

**使用方式**:
```vue
<Modal 
  v-model="showModal" 
  title="弹窗标题"
  :close-on-click-outside="true"
>
  <!-- 弹窗内容 -->
  <div>内容区域</div>
  
  <!-- 可选的底部按钮 -->
  <template #footer>
    <button @click="showModal = false">关闭</button>
  </template>
</Modal>
```

**Props**:
- `modelValue` (Boolean, required): 控制弹窗显示/隐藏
- `title` (String, default: '提示'): 弹窗标题
- `closeOnClickOutside` (Boolean, default: true): 是否允许点击遮罩层关闭

**Events**:
- `update:modelValue`: 弹窗状态变化时触发
- `close`: 弹窗关闭时触发

### 2. BattleAttributeDetail.vue（战斗属性详情组件）
**位置**: `src/components/BattleAttributeDetail.vue`

**功能**:
- 展示单个战斗属性的详细计算过程
- 显示计算公式
- 列出所有加成项（天赋、灵根、经脉、仙战榜等）

**Props**:
- `attribute` (String, required): 属性名称（hp, attack, defense, speed, crit, toughness, dodge, hit）
- `player` (Object, required): 玩家对象

### 3. battleAttributeDetailCalculator.js（计算工具）
**位置**: `src/utils/battleAttributeDetailCalculator.js`

**功能**:
- 计算战斗属性的详细信息
- 格式化计算公式
- 生成加成列表

**主要函数**:
- `getBattleAttributeDetails(player)`: 获取所有属性的详细计算信息
- `formatAttributeFormula(attr, details)`: 格式化单个属性的计算公式
- `formatBonusList(attr, bonusDetails)`: 格式化加成列表
- `getAttributeFullDetails(attr, player)`: 获取单个属性的完整详情
- `getAllAttributesDetails(player)`: 获取所有属性的详情

## 显示内容

### 1. 总数值
显示完整的计算公式：
```
属性名 = 基础值 × (1 + 境界系数) × (1 + 加成) × (1 + 轮回加成) × (1 + 战斗倍率)
```

### 2. 计算过程
显示具体的计算步骤和最终结果：
```
· 血量: 3.41万亿
= 100 × (1 + 80) × (1 + 49508) × (1 + 0) × (1 + 0)
```

### 3. 加成详情
按类别列出所有加成项：

#### 天赋
- 格式：`天赋名+天赋点数`
- 示例：`气感+80`

#### 灵根
- 格式：`境界名属性功法修炼速度`
- 示例：`金丹属性功法修炼速度`

#### 经脉
- 格式：`属性名+加成值`
- 示例：`血量+16000`

#### 仙战榜
- 格式：`属性名+加成值`
- 示例：`血量+8000`

### 4. 其他说明
显示轮回相关的提示信息。

## 使用示例

在 BattleStats.vue 中的使用：

```vue
<template>
  <div class="battle-stats">
    <div class="flex items-center gap-2">
      <h3>战斗数据</h3>
      <button @click="showDetailModal = true">加成详情</button>
    </div>
    
    <!-- 战斗属性显示 -->
    <div>...</div>
    
    <!-- 加成详情弹窗 -->
    <Modal v-model="showDetailModal" title="战斗属性加成详情">
      <div class="detail-modal-content">
        <!-- 属性选择标签 -->
        <div class="attribute-tabs">
          <button
            v-for="attr in attributeList"
            :key="attr.key"
            :class="['tab-btn', { active: selectedAttribute === attr.key }]"
            @click="selectedAttribute = attr.key"
          >
            {{ attr.name }}
          </button>
        </div>

        <!-- 属性详情 -->
        <BattleAttributeDetail 
          :attribute="selectedAttribute"
          :player="gameStore.player"
        />
      </div>
    </Modal>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Modal from './common/Modal.vue'
import BattleAttributeDetail from './BattleAttributeDetail.vue'

const showDetailModal = ref(false)
const selectedAttribute = ref('hp')

const attributeList = [
  { key: 'hp', name: '血量' },
  { key: 'attack', name: '攻击' },
  // ... 其他属性
]
</script>
```

## 样式特点

1. **弹窗样式**:
   - 半透明黑色遮罩层
   - 白色圆角卡片
   - 响应式设计，适配不同屏幕尺寸
   - 平滑的进入/退出动画

2. **标签页样式**:
   - 灰色背景的未选中状态
   - 蓝色背景的选中状态
   - 悬停效果

3. **内容区域样式**:
   - 公式区域：灰色背景
   - 计算过程：黄色背景（突出显示）
   - 加成列表：灰色背景，可滚动
   - 说明文字：左侧蓝色边框

## 扩展性

### 添加新的加成类型

1. 在 `battleAttributeDetailCalculator.js` 的 `formatBonusList` 函数中添加新的加成类型处理逻辑
2. 在 `BattleAttributeDetail.vue` 的 `getAttributeDisplayName` 函数中添加新的显示格式

### 在其他地方使用 Modal 组件

Modal 组件是通用的，可以在任何需要弹窗的地方使用：

```vue
<Modal v-model="showModal" title="自定义标题">
  <div>自定义内容</div>
  <template #footer>
    <button @click="handleConfirm">确认</button>
    <button @click="showModal = false">取消</button>
  </template>
</Modal>
```

## 注意事项

1. Modal 组件使用了 Teleport，会将弹窗内容渲染到 body 元素下
2. 弹窗打开时会禁用 body 的滚动，关闭时恢复
3. 加成列表区域设置了最大高度（300px）和滚动条
4. 所有数值都使用 `formatNumber` 函数进行格式化，保持显示一致性

## 未来改进

1. 支持导出属性详情为图片或文本
2. 添加属性对比功能（当前 vs 下一境界）
3. 添加加成来源的详细说明（点击加成项显示详情）
4. 支持自定义主题色
