# 经脉系统设计文档

## 概述

经脉系统是修仙游戏中的核心成长系统之一，通过打通八条经脉来提升角色的战斗属性和修炼速度。

## 八条经脉

| 经脉名称 | 图标 | 影响属性 | 说明 |
|---------|------|---------|------|
| 督脉 | 🔴 | 血量 | 提升生命值上限 |
| 任脉 | ⚔️ | 攻击 | 提升物理伤害 |
| 冲脉 | 🛡️ | 防御 | 提升防御能力 |
| 带脉 | 📿 | 修为修炼速度 | 加快修为增长 |
| 阳维脉 | ☀️ | 战斗经验修炼速度 | 加快战斗经验获取 |
| 阴维脉 | 🌙 | 灵石获取速度 | 加快灵石收集 |
| 阴跷脉 | 💎 | 灵石获取速度 | 加快灵石收集（与阴维脉叠加） |
| 阳跷脉 | ✨ | 功法修炼速度 | 加快功法修炼 |

## 成长规则

### 初始加成
- 每条经脉初始加成：**2000**

### 大境界提升
- 每突破一个大境界（每10个小等级），经脉加成翻倍
- 公式：`加成 = 2000 × 2^(大境界-1)`

### 加成示例

| 境界 | 大境界级别 | 经脉加成 | 计算公式 |
|------|-----------|---------|---------|
| 练气1-10层 | 1 | 2000 | 2000 × 2^0 |
| 筑基1-10层 | 2 | 4000 | 2000 × 2^1 |
| 金丹1-10层 | 3 | 8000 | 2000 × 2^2 |
| 元婴1-10层 | 4 | 16000 | 2000 × 2^3 |
| 化神1-10层 | 5 | 32000 | 2000 × 2^4 |

## 属性加成机制

### 战斗属性加成

经脉加成会直接影响战斗属性的计算公式：

```
最终属性 = 基础值 × (1 + 境界系数) × (1 + 加成) × (1 + 轮回加成) × (1 + 战斗倍率)
```

其中，`加成` 包括：
- 天赋加成
- **经脉加成**（新增）
- 灵根加成（后续）
- 装备加成（后续）

#### 受影响的战斗属性

| 属性 | 经脉 | 加成值 |
|------|------|--------|
| 血量 | 督脉 | 经脉加成 |
| 攻击 | 任脉 | 经脉加成 |
| 防御 | 冲脉 | 经脉加成 |
| 速度 | - | 0 |
| 暴击 | - | 0 |
| 韧性 | - | 0 |
| 闪避 | - | 0 |
| 命中 | - | 0 |

### 修炼速度加成

经脉加成会影响修炼速度的计算公式：

```
修炼速度 = A × (1 + 加成) × 吸收效率 × (1 + 倍率)
```

其中，`加成` 包括：
- 天赋加成
- **经脉加成**（新增）

#### 受影响的修炼速度

| 速度类型 | 经脉 | 加成值 |
|---------|------|--------|
| 修为修炼速度 | 带脉 | 经脉加成 |
| 战斗经验修炼速度 | 阳维脉 | 经脉加成 |
| 灵石获取速度 | 阴维脉 + 阴跷脉 | 经脉加成 × 2 |
| 功法修炼速度 | 阳跷脉 | 经脉加成 |

**注意**：灵石获取速度受两条经脉影响（阴维脉和阴跷脉），因此加成为 `经脉加成 × 2`。

## 与天赋系统的叠加

经脉系统与天赋系统是独立的加成来源，两者会叠加计算。

### 战斗属性叠加示例

以**血量**为例：

**练气1层**（天赋40点，经脉加成2000）：
- 天赋加成：1000
- 经脉加成：2000
- 总加成：3000
- 血量：100 × (1 + 1) × (1 + 3000) = 300,200

**筑基1层**（天赋80点，经脉加成4000）：
- 天赋加成：4000
- 经脉加成：4000
- 总加成：8000
- 血量：100 × (1 + 2) × (1 + 8000) = 2,700,300

### 修炼速度叠加示例

以**修为修炼速度**为例：

**练气1层**（天赋40点，经脉加成2000）：
- 基础加成：10000
- 天赋加成（悟性）：1000
- 经脉加成（带脉）：2000
- 总加成：13000

**筑基1层**（天赋80点，经脉加成4000）：
- 基础加成：10000
- 天赋加成（悟性）：4000
- 经脉加成（带脉）：4000
- 总加成：18000

## 数据结构

### 经脉配置

```javascript
export const MERIDIAN_CONFIG = {
  // 初始加成值
  INITIAL_BONUS: 2000,
  
  // 经脉类型定义
  MERIDIAN_TYPES: {
    du: {
      name: '督脉',
      description: '影响血量属性',
      icon: '🔴',
      affectedAttributes: ['hp']
    },
    ren: {
      name: '任脉',
      description: '影响攻击属性',
      icon: '⚔️',
      affectedAttributes: ['attack']
    },
    // ... 其他经脉
  }
}
```

## 核心函数

### 1. calculateMeridianBonus(level)

计算当前等级的经脉加成值。

**参数**：
- `level` (number): 当前境界等级

**返回**：
- (number): 经脉加成值

**示例**：
```javascript
calculateMeridianBonus(1)   // 2000 (练气)
calculateMeridianBonus(11)  // 4000 (筑基)
calculateMeridianBonus(21)  // 8000 (金丹)
```

### 2. calculateBattleAttributeBonuses(level)

计算所有战斗属性的经脉加成。

**参数**：
- `level` (number): 当前境界等级

**返回**：
- (Object): 各属性的经脉加成
  ```javascript
  {
    hp: 2000,
    attack: 2000,
    defense: 2000,
    speed: 0,
    crit: 0,
    toughness: 0,
    dodge: 0,
    hit: 0
  }
  ```

### 3. calculateCultivationSpeedBonuses(level)

计算所有修炼速度的经脉加成。

**参数**：
- `level` (number): 当前境界等级

**返回**：
- (Object): 各修炼速度的经脉加成
  ```javascript
  {
    expSpeed: 2000,              // 带脉
    combatSpeed: 2000,           // 阳维脉
    spiritStoneSpeed: 4000,      // 阴维脉 + 阴跷脉
    techniqueSpeed: 2000         // 阳跷脉
  }
  ```

### 4. getMeridianDetails(level)

获取经脉详细信息。

**参数**：
- `level` (number): 当前境界等级

**返回**：
- (Array): 经脉详细信息数组
  ```javascript
  [
    {
      key: 'du',
      name: '督脉',
      description: '影响血量属性',
      icon: '🔴',
      bonus: 2000,
      realmLevel: 1,
      affectedAttributes: ['hp']
    },
    // ... 其他经脉
  ]
  ```

### 5. getMeridianUpgradeInfo(oldLevel, newLevel)

计算突破后的经脉加成变化。

**参数**：
- `oldLevel` (number): 旧等级
- `newLevel` (number): 新等级

**返回**：
- (Object): 加成变化信息
  ```javascript
  {
    oldRealmLevel: 1,
    newRealmLevel: 2,
    oldBonus: 2000,
    newBonus: 4000,
    isUpgraded: true,
    bonusIncrease: 2000
  }
  ```

## 集成说明

### 1. battleCalculator.js

在战斗属性计算中集成经脉加成：

```javascript
import { calculateBattleAttributeBonuses as calculateMeridianBonuses } from './meridianSystem.js'

// 在 calculateBattleAttributes 函数中
const meridianBonuses = calculateMeridianBonuses(level)
for (let attr in meridianBonuses) {
  attributeBonuses[attr] = (attributeBonuses[attr] || 0) + meridianBonuses[attr]
}
```

### 2. growthCalculator.js

在修炼速度计算中集成经脉加成：

```javascript
import { calculateCultivationSpeedBonuses as calculateMeridianSpeedBonuses } from './meridianSystem.js'

// 在 calculateExpGrowthRate 函数中
const meridianBonuses = calculateMeridianSpeedBonuses(player.level)
expBonus += meridianBonuses.expSpeed || 0

// 在 calculateCombatGrowthRate 函数中
const meridianBonuses = calculateMeridianSpeedBonuses(player.level)
combatBonus += meridianBonuses.combatSpeed || 0
```

### 3. gameState.js

在游戏状态中添加经脉信息的 getter：

```javascript
import { getMeridianDetails } from '@/utils/meridianSystem.js'

// 在 getters 中
meridianDetails: (state) => {
  return getMeridianDetails(state.player.level)
}
```

## 测试验证

运行测试脚本验证经脉系统：

```bash
node test_meridian_system.js
```

测试内容包括：
1. 基础经脉加成计算
2. 战斗属性加成
3. 修炼速度加成
4. 经脉详细信息
5. 经脉升级信息
6. 与天赋系统的叠加效果（战斗属性）
7. 与天赋系统的叠加效果（修炼速度）
8. 经脉配置验证

## 未来扩展

1. **经脉打通系统**：需要消耗资源或完成任务才能打通经脉
2. **经脉等级系统**：每条经脉可以单独升级
3. **经脉共鸣**：打通特定组合的经脉可以获得额外加成
4. **经脉逆转**：特殊情况下经脉可能被封印或逆转
5. **经脉淬炼**：使用特殊材料强化经脉效果

## 版本历史

- **v1.0.0** (2025-10-30): 初始版本
  - 实现八条经脉系统
  - 集成战斗属性加成
  - 集成修炼速度加成
  - 与天赋系统叠加计算
