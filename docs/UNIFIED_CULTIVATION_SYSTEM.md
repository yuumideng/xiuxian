# 统一修仙数值计算系统

## 📋 系统概述

统一修仙数值计算系统是一个基于 **growthCurve** 增长模式的通用境界数值计算框架，用于生成游戏中所有境界的修为和战斗经验数值。

### 核心设计理念

1. **练气期（1-10级）**：使用原始真实数据，作为整个系统的基础
2. **其他所有境界**：统一使用 growthCurve 增长模式计算
3. **境界初始值驱动**：每个大境界只需提供初始值（第1级），系统自动计算后续9级
4. **一致性保证**：所有境界使用相同的增长曲线，确保数值平衡

## 🎯 增长曲线（growthCurve）

系统使用9个关键点的分段线性插值曲线，模拟境界内的非线性增长：

```javascript
growthCurve = [
  { progress: 0.000, ratio: 2.6 },    // 第1次增长 - 初期→初期大成
  { progress: 0.125, ratio: 1.9 },    // 第2次增长 - 初期大成→初期巅峰
  { progress: 0.250, ratio: 1.656 },  // 第3次增长 - 初期巅峰→中期
  { progress: 0.375, ratio: 1.533 },  // 第4次增长 - 中期→中期大成
  { progress: 0.500, ratio: 1.450 },  // 第5次增长 - 中期大成→中期巅峰
  { progress: 0.625, ratio: 1.391 },  // 第6次增长 - 中期巅峰→后期
  { progress: 0.750, ratio: 1.360 },  // 第7次增长 - 后期→后期大成
  { progress: 0.875, ratio: 1.318 },  // 第8次增长 - 后期大成→后期巅峰
  { progress: 1.000, ratio: 1.3 }     // 第9次增长 - 后期巅峰→大圆满
]
```

### 增长特征

- **起始比例**：2.6倍（初期快速增长）
- **结束比例**：1.3倍（后期平稳增长）
- **衰减模式**：前期快速衰减，后期缓慢衰减
- **数据来源**：基于灵虚期、灵魄期、灵婴期的真实数据拟合

## 📁 文件结构

```
xiuxian-game-vue3/
├── src/
│   ├── data/
│   │   ├── realm_initial_values.js      # 境界初始值配置
│   │   └── complete_realms.js           # 完整境界体系定义
│   └── system/
│       └── unified_cultivation_system.js # 统一计算系统
├── test_unified_system.js               # 测试脚本
└── docs/
    └── UNIFIED_CULTIVATION_SYSTEM.md    # 本文档
```

## 🔧 使用方法

### 1. 添加新境界初始值

在 `src/data/realm_initial_values.js` 中添加：

```javascript
{
  level: 111,              // 境界起始等级
  realmName: '灵神',       // 境界名称
  cultivation: 数值,       // 修为初始值
  combat: 数值,            // 战斗经验初始值
  note: '说明'             // 备注（可选）
}
```

### 2. 计算单个等级数值

```javascript
import { unifiedCultivationSystem } from './src/system/unified_cultivation_system.js';

// 计算修为
const exp = unifiedCultivationSystem.calculate(95, 'exp');

// 计算战斗经验
const combat = unifiedCultivationSystem.calculate(95, 'combat');
```

### 3. 计算整个境界数值

```javascript
// 计算灵魄期（91-100级）的所有数值
const lingpoData = unifiedCultivationSystem.calculateRealm(91);

// 返回格式：
// [
//   { level: 91, exp: ..., combat: ..., realmName: '灵魄', stageName: '初期', fullName: '灵魄初期' },
//   { level: 92, exp: ..., combat: ..., realmName: '灵魄', stageName: '初期大成', fullName: '灵魄初期大成' },
//   ...
// ]
```

### 4. 导出游戏配置格式

```javascript
// 导出为游戏配置代码
const configCode = unifiedCultivationSystem.exportRealmData(91);
console.log(configCode);

// 输出：
//   // 灵魄期 (91-100级)
//   91: { exp: 17103000000000, combat: 14531600000000, realm: "灵魄", stage: "初期" },
//   92: { exp: 44467800000000, combat: 37782160000000, realm: "灵魄", stage: "初期大成" },
//   ...
```

### 5. 格式化数字显示

```javascript
import { utils } from './src/system/unified_cultivation_system.js';

// 格式化数字
console.log(utils.formatNumber(17103000000000));  // 输出: 1710.3万亿
console.log(utils.formatNumber(105000000000000000));  // 输出: 1.05亿亿
```

### 6. 打印境界数据表格

```javascript
// 打印灵魄期数据表格
utils.printRealmTable(91);

// 输出：
// ╔════════════════════════════════════════════════════════════════════════════════╗
// ║  灵魄期 (91-100级) 数值表                                                      ║
// ╠════════════════════════════════════════════════════════════════════════════════╣
// ║ 等级 │ 阶段           │ 修为需求              │ 战斗经验需求          ║
// ╠════════════════════════════════════════════════════════════════════════════════╣
// ║   91 │ 初期           │            1710.3万亿 │            1453.16万亿 ║
// ...
```

## 📊 已配置境界

当前系统已配置以下境界的初始值：

| 等级 | 境界名称 | 修为初始值 | 战斗经验初始值 |
|------|---------|-----------|---------------|
| 1级 | 练气 | 4191 | 4191 |
| 81级 | 灵虚 | 735.9万亿 | 624.6万亿 |
| 91级 | 灵魄 | 1710.3万亿 | 1453.16万亿 |
| 101级 | 灵婴 | 1.05亿亿 | 7674.03万亿 |

## 🧪 测试验证

运行测试脚本验证系统：

```bash
cd xiuxian-game-vue3
node test_unified_system.js
```

测试内容包括：
1. 练气期原始数据验证
2. 灵虚期 growthCurve 计算
3. 灵魄期 growthCurve 计算
4. 灵婴期 growthCurve 计算
5. 增长比例验证
6. 游戏配置导出
7. 已配置境界列表
8. 单个等级查询

## 🎮 游戏集成

### 替换现有计算系统

在游戏代码中，将原有的计算系统替换为统一系统：

```javascript
// 旧代码
import { getRealmRequirements } from '@/data/realms.js';

// 新代码
import { unifiedCultivationSystem } from '@/system/unified_cultivation_system.js';

// 获取升级需求
const exp = unifiedCultivationSystem.calculate(level, 'exp');
const combat = unifiedCultivationSystem.calculate(level, 'combat');
```

### 数值格式化

```javascript
import { utils } from '@/system/unified_cultivation_system.js';

// 在界面显示时格式化数字
const displayExp = utils.formatNumber(player.exp);
```

## 📈 扩展新境界

添加新境界只需两步：

### 步骤1：添加初始值

在 `src/data/realm_initial_values.js` 中添加新境界的初始值：

```javascript
{
  level: 111,
  realmName: '灵神',
  cultivation: 你的数值,
  combat: 你的数值,
  note: '新增境界'
}
```

### 步骤2：验证计算

运行测试验证新境界的数值：

```javascript
utils.printRealmTable(111);
```

系统会自动使用 growthCurve 计算该境界的完整10级数值！

## ⚠️ 注意事项

1. **境界起始等级**：必须是 1, 11, 21, 31... 这样的值（每10级一个大境界）
2. **初始值必填**：每个境界的 cultivation 和 combat 都必须大于0
3. **练气期特殊**：练气期（1-10级）使用原始数据，不受 growthCurve 影响
4. **数值一致性**：所有境界使用相同的 growthCurve，确保游戏平衡

## 🔍 API 参考

### UnifiedCultivationSystem 类

#### calculate(level, type)
计算指定等级的数值
- **参数**：
  - `level` (number): 等级 (1-720)
  - `type` (string): 'exp' 或 'combat'
- **返回**：(number) 计算结果

#### calculateRealm(realmStartLevel)
计算整个境界的数值
- **参数**：
  - `realmStartLevel` (number): 境界起始等级
- **返回**：(Array) 10个等级的完整数据

#### exportRealmData(realmStartLevel)
导出境界数据为游戏配置格式
- **参数**：
  - `realmStartLevel` (number): 境界起始等级
- **返回**：(string) 游戏配置代码

#### getAllConfiguredRealms()
获取所有已配置境界的数值
- **返回**：(Array) 所有已配置境界的完整数据

### utils 工具函数

#### formatNumber(num)
格式化数字显示
- **参数**：
  - `num` (number): 数字
- **返回**：(string) 格式化后的字符串

#### printRealmTable(realmStartLevel)
打印境界数据表格
- **参数**：
  - `realmStartLevel` (number): 境界起始等级

#### calculateUpgradeExp(currentLevel, targetLevel)
计算升级所需经验
- **参数**：
  - `currentLevel` (number): 当前等级
  - `targetLevel` (number): 目标等级
- **返回**：(number) 所需经验

## 📝 更新日志

### v3.0.0 (2025-10-30)
- ✨ 创建统一修仙数值计算系统
- ✨ 实现基于 growthCurve 的通用计算框架
- ✨ 支持720级境界体系
- ✨ 提供完整的测试和文档

## 🤝 贡献指南

如果需要调整 growthCurve 或添加新功能，请：

1. 修改 `src/system/unified_cultivation_system.js`
2. 运行 `node test_unified_system.js` 验证
3. 更新本文档

## 📞 支持

如有问题，请查看：
- 测试脚本：`test_unified_system.js`
- 示例数据：`src/data/realm_initial_values.js`
- 境界定义：`src/data/complete_realms.js`
