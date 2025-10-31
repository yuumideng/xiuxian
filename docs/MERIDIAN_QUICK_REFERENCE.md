# 经脉系统快速参考

## 📋 八条经脉速查表

| 经脉 | 图标 | 影响属性 | 初始加成 | 成长方式 |
|------|------|---------|---------|---------|
| 督脉 | 🔴 | 血量 | 2000 | 每大境界×2 |
| 任脉 | ⚔️ | 攻击 | 2000 | 每大境界×2 |
| 冲脉 | 🛡️ | 防御 | 2000 | 每大境界×2 |
| 带脉 | 📿 | 修为速度 | 2000 | 每大境界×2 |
| 阳维脉 | ☀️ | 战斗经验速度 | 2000 | 每大境界×2 |
| 阴维脉 | 🌙 | 灵石速度 | 2000 | 每大境界×2 |
| 阴跷脉 | 💎 | 灵石速度 | 2000 | 每大境界×2 |
| 阳跷脉 | ✨ | 功法速度 | 2000 | 每大境界×2 |

## 🔢 加成数值速查

| 境界 | 等级范围 | 大境界 | 经脉加成 |
|------|---------|--------|---------|
| 练气 | 1-10 | 1 | 2,000 |
| 筑基 | 11-20 | 2 | 4,000 |
| 金丹 | 21-30 | 3 | 8,000 |
| 元婴 | 31-40 | 4 | 16,000 |
| 化神 | 41-50 | 5 | 32,000 |
| 炼虚 | 51-60 | 6 | 64,000 |
| 合体 | 61-70 | 7 | 128,000 |
| 大乘 | 71-80 | 8 | 256,000 |
| 渡劫 | 81-90 | 9 | 512,000 |
| 真仙 | 91-100 | 10 | 1,024,000 |

## 💻 常用代码片段

### 导入经脉系统

```javascript
import {
  calculateMeridianBonus,
  calculateBattleAttributeBonuses,
  calculateCultivationSpeedBonuses,
  getMeridianDetails,
  getMeridianUpgradeInfo
} from '@/utils/meridianSystem'
```

### 获取当前经脉加成

```javascript
const bonus = calculateMeridianBonus(player.level)
// 练气1层: 2000
// 筑基1层: 4000
// 金丹1层: 8000
```

### 获取战斗属性加成

```javascript
const bonuses = calculateBattleAttributeBonuses(player.level)
// {
//   hp: 2000,
//   attack: 2000,
//   defense: 2000,
//   speed: 0,
//   crit: 0,
//   toughness: 0,
//   dodge: 0,
//   hit: 0
// }
```

### 获取修炼速度加成

```javascript
const speedBonuses = calculateCultivationSpeedBonuses(player.level)
// {
//   expSpeed: 2000,
//   combatSpeed: 2000,
//   spiritStoneSpeed: 4000,  // 两条经脉叠加
//   techniqueSpeed: 2000
// }
```

### 获取经脉详情

```javascript
const details = getMeridianDetails(player.level)
// [
//   {
//     key: 'du',
//     name: '督脉',
//     icon: '🔴',
//     bonus: 2000,
//     realmLevel: 1,
//     affectedAttributes: ['hp']
//   },
//   ...
// ]
```

### 检查经脉升级

```javascript
const upgradeInfo = getMeridianUpgradeInfo(10, 11)
// {
//   oldRealmLevel: 1,
//   newRealmLevel: 2,
//   oldBonus: 2000,
//   newBonus: 4000,
//   isUpgraded: true,
//   bonusIncrease: 2000
// }
```

## 🧮 计算公式

### 经脉加成公式

```
经脉加成 = 2000 × 2^(大境界-1)
大境界 = Math.floor((level - 1) / 10) + 1
```

### 战斗属性公式

```
最终属性 = 基础值 × (1 + 境界系数) × (1 + 总加成) × (1 + 轮回加成) × (1 + 战斗倍率)

总加成 = 天赋加成 + 经脉加成 + 灵根加成 + 装备加成 + ...
```

### 修炼速度公式

```
修炼速度 = A × (1 + 总加成) × 吸收效率 × (1 + 倍率)

A = (1 + 境界系数) × (1 + 历练层数) × (1 + 轮回加成)
总加成 = 基础加成 + 天赋加成 + 经脉加成 + ...
```

## 📊 数值示例

### 血量成长示例

| 境界 | 天赋 | 经脉 | 总加成 | 血量 |
|------|------|------|--------|------|
| 练气1层 | 1000 | 2000 | 3000 | 300,200 |
| 筑基1层 | 4000 | 4000 | 8000 | 2,700,300 |
| 金丹1层 | 16000 | 8000 | 24000 | 9,600,400 |

计算过程（练气1层）：
```
基础值 = 100
境界系数 = 1
天赋加成 = 1000
经脉加成 = 2000
总加成 = 3000

血量 = 100 × (1 + 1) × (1 + 3000)
     = 100 × 2 × 3001
     = 300,200
```

### 修为速度成长示例

| 境界 | 基础 | 天赋 | 经脉 | 总加成 |
|------|------|------|------|--------|
| 练气1层 | 10000 | 1000 | 2000 | 13000 |
| 筑基1层 | 10000 | 4000 | 4000 | 18000 |
| 金丹1层 | 10000 | 16000 | 8000 | 34000 |

## 🎯 关键特性

### ✅ 自动化
- 随境界提升自动增强
- 无需手动操作
- 突破大境界时自动翻倍

### ✅ 叠加性
- 与天赋系统独立叠加
- 多条经脉可影响同一属性
- 灵石速度受两条经脉影响

### ✅ 全面性
- 覆盖3个核心战斗属性
- 覆盖4种修炼速度
- 8条经脉各司其职

### ✅ 平衡性
- 初始加成2000（天赋1000的2倍）
- 成长方式与天赋一致（翻倍）
- 与天赋系统形成互补

## 🔍 调试命令

```javascript
// 在浏览器控制台

// 1. 查看当前经脉加成
console.log('经脉加成:', calculateMeridianBonus(gameStore.player.level))

// 2. 查看所有经脉详情
console.table(getMeridianDetails(gameStore.player.level))

// 3. 查看战斗属性加成
console.log('战斗属性加成:', calculateBattleAttributeBonuses(gameStore.player.level))

// 4. 查看修炼速度加成
console.log('修炼速度加成:', calculateCultivationSpeedBonuses(gameStore.player.level))

// 5. 模拟突破升级
console.log('升级信息:', getMeridianUpgradeInfo(
  gameStore.player.level,
  gameStore.player.level + 1
))
```

## 📝 注意事项

1. **灵石速度特殊**：受阴维脉和阴跷脉两条经脉影响，加成为 `经脉加成 × 2`
2. **大境界定义**：每10个小等级为一个大境界（1-10, 11-20, 21-30...）
3. **加成叠加**：经脉加成与天赋加成是相加关系，不是相乘
4. **自动升级**：突破大境界时经脉自动升级，无需额外操作
5. **无状态系统**：经脉系统不需要存储状态，完全基于等级计算

## 🚀 性能优化建议

1. 使用 `computed` 缓存计算结果
2. 避免在循环中重复调用计算函数
3. 大数值使用格式化函数简化显示
4. 突破动画使用防抖避免重复触发

## 📚 相关文档

- [经脉系统设计文档](./MERIDIAN_SYSTEM.md)
- [经脉系统实现总结](../MERIDIAN_SYSTEM_SUMMARY.md)
- [经脉系统使用示例](./MERIDIAN_USAGE_EXAMPLE.md)
- [天赋系统文档](./TALENT_SYSTEM.md)
- [战斗属性计算文档](./BATTLE_CALCULATOR.md)
