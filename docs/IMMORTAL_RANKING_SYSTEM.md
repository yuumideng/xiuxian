# 仙战榜系统设计文档

## 概述

仙战榜系统是修仙游戏中的随机加成系统，每个大境界提供一次随机加成，加成可以分配到7种不同的属性上，且可以重复分配到同一属性，为游戏增加了随机性和可玩性。

## 核心特性

### 随机加成机制
- 每个大境界提供一次加成机会
- 加成随机分配到7种属性之一
- 可以重复分配到同一属性
- 每个玩家的仙战榜加成都是独特的

### 成长规则
- **初始加成**：2000（练气期）
- **成长方式**：每大境界翻倍
- **公式**：`2000 × 2^(大境界-1)`

| 大境界 | 境界名称 | 加成值 |
|--------|---------|--------|
| 1 | 练气 | 2,000 |
| 2 | 筑基 | 4,000 |
| 3 | 金丹 | 8,000 |
| 4 | 元婴 | 16,000 |
| 5 | 化神 | 32,000 |
| 6 | 炼虚 | 64,000 |
| 7 | 合体 | 128,000 |
| 8 | 大乘 | 256,000 |
| 9 | 渡劫 | 512,000 |
| 10 | 真仙 | 1,024,000 |

## 影响属性

仙战榜可以随机影响以下7种属性：

### 战斗属性（3种）
1. **血量**（hp）
2. **攻击**（attack）
3. **防御**（defense）

### 修炼速度（4种）
4. **修为修炼速度**（expSpeed）
5. **战斗经验修炼速度**（combatSpeed）
6. **灵石获取速度**（spiritStoneSpeed）
7. **功法修炼速度**（techniqueSpeed）

## 随机分配示例

### 示例1：均匀分配
```
大境界1（2000）  → 攻击
大境界2（4000）  → 防御
大境界3（8000）  → 修为修炼速度
大境界4（16000） → 血量
大境界5（32000） → 战斗经验修炼速度

总加成：
- 攻击：2000
- 防御：4000
- 修为修炼速度：8000
- 血量：16000
- 战斗经验修炼速度：32000
```

### 示例2：重复分配
```
大境界1（2000）  → 攻击
大境界2（4000）  → 攻击
大境界3（8000）  → 防御
大境界4（16000） → 攻击
大境界5（32000） → 攻击

总加成：
- 攻击：2000 + 4000 + 16000 + 32000 = 54000
- 防御：8000
```

### 示例3：极端情况（全部同一属性）
```
大境界1（2000）  → 攻击
大境界2（4000）  → 攻击
大境界3（8000）  → 攻击
大境界4（16000） → 攻击
大境界5（32000） → 攻击

总加成：
- 攻击：62000
- 其他：0
```

## 数据结构

### 仙战榜数据格式

```javascript
{
  1: {
    bonus: 2000,
    attribute: 'attack',
    realmLevel: 1
  },
  2: {
    bonus: 4000,
    attribute: 'defense',
    realmLevel: 2
  },
  3: {
    bonus: 8000,
    attribute: 'expSpeed',
    realmLevel: 3
  }
}
```

### 配置常量

```javascript
export const IMMORTAL_RANKING_CONFIG = {
  // 基础加成值
  BASE_BONUS: 2000,
  
  // 可随机的属性列表
  RANDOM_ATTRIBUTES: [
    'hp',              // 血量
    'attack',          // 攻击
    'defense',         // 防御
    'expSpeed',        // 修为修炼速度
    'combatSpeed',     // 战斗经验修炼速度
    'spiritStoneSpeed', // 灵石获取速度
    'techniqueSpeed'   // 功法修炼速度
  ],
  
  // 属性名称映射
  ATTRIBUTE_NAMES: {
    hp: '血量',
    attack: '攻击',
    defense: '防御',
    expSpeed: '修为修炼速度',
    combatSpeed: '战斗经验修炼速度',
    spiritStoneSpeed: '灵石获取速度',
    techniqueSpeed: '功法修炼速度'
  }
}
```

## 核心函数

### 1. calculateRealmBonus(realmLevel)

计算单个大境界的加成值。

**参数**：
- `realmLevel` (number): 大境界级别

**返回**：
- (number): 该大境界的加成值

**示例**：
```javascript
calculateRealmBonus(1)  // 2000
calculateRealmBonus(2)  // 4000
calculateRealmBonus(3)  // 8000
```

### 2. randomAttribute()

随机选择一个属性。

**返回**：
- (string): 随机选中的属性名

**示例**：
```javascript
randomAttribute()  // 'attack' 或 'defense' 或其他
```

### 3. initializeImmortalRanking(currentRealmLevel)

初始化仙战榜数据。

**参数**：
- `currentRealmLevel` (number): 当前大境界级别（默认1）

**返回**：
- (Object): 仙战榜数据

**示例**：
```javascript
initializeImmortalRanking(3)
// {
//   1: { bonus: 2000, attribute: 'attack', realmLevel: 1 },
//   2: { bonus: 4000, attribute: 'defense', realmLevel: 2 },
//   3: { bonus: 8000, attribute: 'expSpeed', realmLevel: 3 }
// }
```

### 4. addRealmBonus(currentRankings, newRealmLevel)

添加新的大境界加成。

**参数**：
- `currentRankings` (Object): 当前仙战榜数据
- `newRealmLevel` (number): 新的大境界级别

**返回**：
- (Object): 更新后的仙战榜数据

**示例**：
```javascript
const rankings = initializeImmortalRanking(2)
const newRankings = addRealmBonus(rankings, 3)
// 新增大境界3的随机加成
```

### 5. calculateBattleAttributeBonuses(rankings)

计算所有战斗属性的总加成。

**参数**：
- `rankings` (Object): 仙战榜数据

**返回**：
- (Object): 各战斗属性的总加成

**示例**：
```javascript
calculateBattleAttributeBonuses(rankings)
// {
//   hp: 0,
//   attack: 6000,  // 2000 + 4000
//   defense: 8000,
//   speed: 0,
//   crit: 0,
//   toughness: 0,
//   dodge: 0,
//   hit: 0
// }
```

### 6. calculateCultivationSpeedBonuses(rankings)

计算所有修炼速度的总加成。

**参数**：
- `rankings` (Object): 仙战榜数据

**返回**：
- (Object): 各修炼速度的总加成

**示例**：
```javascript
calculateCultivationSpeedBonuses(rankings)
// {
//   expSpeed: 8000,
//   combatSpeed: 0,
//   spiritStoneSpeed: 0,
//   techniqueSpeed: 0
// }
```

### 7. getImmortalRankingDetails(rankings)

获取仙战榜详细信息。

**参数**：
- `rankings` (Object): 仙战榜数据

**返回**：
- (Object): 仙战榜详细信息

**示例**：
```javascript
getImmortalRankingDetails(rankings)
// {
//   name: '仙战榜',
//   description: '每个大境界随机提升一项属性',
//   icon: '🏆',
//   realmBonuses: [
//     { realmLevel: 1, bonus: 2000, attribute: 'attack', attributeName: '攻击' },
//     { realmLevel: 2, bonus: 4000, attribute: 'defense', attributeName: '防御' }
//   ],
//   totalBonuses: {
//     battle: { hp: 0, attack: 2000, defense: 4000, ... },
//     cultivation: { expSpeed: 0, combatSpeed: 0, ... }
//   }
// }
```

### 8. getImmortalRankingStatistics(rankings)

获取仙战榜统计信息。

**参数**：
- `rankings` (Object): 仙战榜数据

**返回**：
- (Object): 统计信息

**示例**：
```javascript
getImmortalRankingStatistics(rankings)
// {
//   totalRealmCount: 3,
//   totalBonus: 14000,
//   battleAttributes: {
//     attack: { bonus: 2000, name: '攻击' },
//     defense: { bonus: 4000, name: '防御' }
//   },
//   cultivationSpeeds: {
//     expSpeed: { bonus: 8000, name: '修为修炼速度' }
//   }
// }
```

## 集成说明

### 1. gameState.js

在玩家数据中添加仙战榜：

```javascript
import { initializeImmortalRanking, addRealmBonus, getImmortalRankingDetails } from '@/utils/immortalRankingSystem.js'

// 在 state 中
player: {
  // ... 其他属性
  immortalRanking: initializeImmortalRanking(1)
}

// 在 getters 中
immortalRankingDetails: (state) => {
  return getImmortalRankingDetails(state.player.immortalRanking)
}

// 在 breakthrough 函数中
const oldRealmLevel = Math.floor((oldLevel - 1) / 10) + 1
const newRealmLevel = Math.floor((newLevel - 1) / 10) + 1
if (newRealmLevel > oldRealmLevel) {
  this.player.immortalRanking = addRealmBonus(this.player.immortalRanking, newRealmLevel)
}
```

### 2. battleCalculator.js

集成仙战榜战斗属性加成：

```javascript
import { calculateBattleAttributeBonuses as calculateImmortalRankingBonuses } from './immortalRankingSystem.js'

// 在 calculateBattleAttributes 函数中
if (player.immortalRanking) {
  const immortalRankingBonuses = calculateImmortalRankingBonuses(player.immortalRanking)
  for (let attr in immortalRankingBonuses) {
    attributeBonuses[attr] = (attributeBonuses[attr] || 0) + immortalRankingBonuses[attr]
  }
}
```

### 3. growthCalculator.js

集成仙战榜修炼速度加成：

```javascript
import { calculateCultivationSpeedBonuses as calculateImmortalRankingSpeedBonuses } from './immortalRankingSystem.js'

// 在 calculateExpGrowthRate 函数中
if (player.immortalRanking) {
  const immortalRankingBonuses = calculateImmortalRankingSpeedBonuses(player.immortalRanking)
  expBonus += immortalRankingBonuses.expSpeed || 0
}

// 在 calculateCombatGrowthRate 函数中
if (player.immortalRanking) {
  const immortalRankingBonuses = calculateImmortalRankingSpeedBonuses(player.immortalRanking)
  combatBonus += immortalRankingBonuses.combatSpeed || 0
}
```

## 数值验证

### 固定仙战榜示例

```javascript
const fixedRanking = {
  1: { bonus: 2000, attribute: 'attack', realmLevel: 1 },
  2: { bonus: 4000, attribute: 'defense', realmLevel: 2 },
  3: { bonus: 8000, attribute: 'expSpeed', realmLevel: 3 }
}
```

### 战斗属性（金丹1层）

**基础加成**：
- 天赋：16000
- 经脉：8000
- 仙灵环：3500
- 仙战榜：攻击+2000，防御+4000

**攻击属性**：
- 总加成：16000 + 8000 + 3500 + 2000 = 29500
- 攻击：`20 × (1 + 3) × (1 + 29500) = 2,360,080`

**防御属性**：
- 总加成：16000 + 8000 + 3500 + 4000 = 31500
- 防御：`10 × (1 + 3) × (1 + 31500) = 1,260,040`

### 修炼速度（金丹1层）

**修为修炼速度**：
- 基础加成：10000
- 天赋加成：16000
- 经脉加成：8000
- 仙战榜加成：8000
- 总加成：42000

## 设计理念

### 1. 随机性
- 每个玩家的仙战榜都是独特的
- 增加游戏的可玩性和重复性
- 不同的随机结果导致不同的玩法策略

### 2. 可重复性
- 允许多个大境界的加成随机到同一属性
- 可能出现极端情况（全部加成同一属性）
- 增加了游戏的不确定性和趣味性

### 3. 平衡性
- 初始加成2000，与其他系统相当
- 指数增长，与天赋、经脉系统一致
- 7种属性均等概率，保证长期平衡

### 4. 策略性
- 玩家需要根据自己的仙战榜调整玩法
- 如果攻击加成多，可以走输出路线
- 如果修炼速度加成多，可以快速升级

## 游戏性分析

### 优势
1. **增加随机性**：每个玩家的成长路径都不同
2. **提高重玩价值**：重新开始游戏会有不同的仙战榜
3. **策略多样性**：根据仙战榜调整玩法策略
4. **话题性**：玩家可以分享自己的仙战榜

### 潜在问题
1. **运气成分**：可能导致玩家之间差距过大
2. **极端情况**：全部加成同一属性可能失衡
3. **重置需求**：玩家可能想重置仙战榜

### 优化建议
1. **保底机制**：确保每种属性至少有一次加成
2. **重置功能**：提供仙战榜重置道具（消耗资源）
3. **显示概率**：告知玩家每种属性的当前加成情况
4. **平衡调整**：根据数据调整各属性的权重

## 测试验证

运行测试脚本验证仙战榜系统：

```bash
node test_immortal_ranking_system.js
```

测试内容包括：
1. 单个大境界加成计算
2. 随机属性分配
3. 仙战榜初始化
4. 添加新的大境界加成
5. 战斗属性加成累加
6. 修炼速度加成累加
7. 仙战榜详细信息
8. 仙战榜统计信息
9. 创建固定仙战榜
10. 与其他系统的叠加效果（战斗属性）
11. 与其他系统的叠加效果（修炼速度）
12. 极端情况测试
13. 配置验证

## 未来扩展

1. **仙战榜重置**：消耗资源重新随机
2. **仙战榜锁定**：锁定某些属性，只随机其他属性
3. **仙战榜强化**：提升某个属性的加成倍率
4. **仙战榜共鸣**：特定组合产生额外效果
5. **仙战榜排行榜**：展示最强仙战榜配置

## 版本历史

- **v1.0.0** (2025-10-30): 初始版本
  - 实现仙战榜随机加成系统
  - 集成战斗属性和修炼速度加成
  - 支持重复分配到同一属性
  - 自动在突破大境界时添加新加成
