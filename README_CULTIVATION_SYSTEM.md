# 修仙游戏数值系统 - 完整指南

## 🎯 系统概述

本项目实现了一个**统一的修仙数值计算系统**，用于生成游戏中所有境界（1-720级）的修为和战斗经验数值。

### 核心特点

✅ **统一增长模式**：除练气期外，所有境界使用相同的 growthCurve  
✅ **初始值驱动**：每个境界只需提供初始值，系统自动计算后续9级  
✅ **数值平衡**：确保所有境界的增长曲线一致，保证游戏平衡  
✅ **易于扩展**：添加新境界只需两步，无需复杂计算  

## 📁 项目结构

```
xiuxian-game-vue3/
├── src/
│   ├── data/
│   │   ├── realm_initial_values.js          # 🔑 境界初始值配置（你需要在这里添加数据）
│   │   ├── complete_realms.js               # 完整境界体系定义（9个界域，72个大境界）
│   │   └── realms.js                        # 旧系统（保留兼容）
│   ├── system/
│   │   └── unified_cultivation_system.js    # 统一计算系统核心
│   └── utils/
│       ├── growthCalculator.js              # 增长速率计算器
│       └── numberFormatter.js               # 数字格式化工具
├── examples/
│   └── calculate_new_realm.js               # 📖 添加新境界示例
├── test_unified_system.js                   # 🧪 系统测试脚本
└── docs/
    ├── UNIFIED_CULTIVATION_SYSTEM.md        # 📚 详细文档
    └── GAME_DESIGN.md                       # 游戏设计文档
```

## 🚀 快速开始

### 1. 查看已配置的境界

```bash
node test_unified_system.js
```

当前已配置：
- **练气期**（1-10级）：使用原始数据
- **灵虚期**（81-90级）：735.9万亿起
- **灵魄期**（91-100级）：1710.3万亿起
- **灵婴期**（101-110级）：1.05亿亿起

### 2. 添加新境界

**步骤1**：在 `src/data/realm_initial_values.js` 中添加初始值

```javascript
{
  level: 111,              // 境界起始等级
  realmName: '灵神',       // 境界名称
  cultivation: 你的数值,   // 修为初始值
  combat: 你的数值,        // 战斗经验初始值
  note: '新增境界'         // 备注
}
```

**步骤2**：运行测试验证

```bash
node test_unified_system.js
```

系统会自动使用 growthCurve 计算该境界的完整10级数值！

### 3. 查看示例

```bash
node examples/calculate_new_realm.js
```

这个示例展示了如何添加"灵神期"（111-120级）的完整流程。

## 📊 增长曲线（growthCurve）

所有境界（除练气期）使用相同的增长曲线：

```
2.6倍 → 1.9倍 → 1.656倍 → 1.533倍 → 1.450倍 → 1.391倍 → 1.360倍 → 1.318倍 → 1.3倍
```

这意味着：
- **初期→初期大成**：增长 2.6 倍（快速增长）
- **初期大成→初期巅峰**：增长 1.9 倍
- **初期巅峰→中期**：增长 1.656 倍
- ...
- **后期巅峰→大圆满**：增长 1.3 倍（平稳增长）

## 🎮 在游戏中使用

### 计算单个等级数值

```javascript
import { unifiedCultivationSystem } from './src/system/unified_cultivation_system.js';

// 计算95级的修为
const exp = unifiedCultivationSystem.calculate(95, 'exp');

// 计算95级的战斗经验
const combat = unifiedCultivationSystem.calculate(95, 'combat');
```

### 计算整个境界数值

```javascript
// 计算灵魄期（91-100级）的所有数值
const lingpoData = unifiedCultivationSystem.calculateRealm(91);

// 返回10个等级的完整数据
lingpoData.forEach(data => {
  console.log(`${data.level}级 ${data.fullName}: 修为 ${data.exp}, 战力 ${data.combat}`);
});
```

### 格式化数字显示

```javascript
import { utils } from './src/system/unified_cultivation_system.js';

// 格式化大数字
console.log(utils.formatNumber(17103000000000));      // 1710.3万亿
console.log(utils.formatNumber(105000000000000000));  // 1.05亿亿
```

## 🌟 境界体系

游戏共有 **9个界域，72个大境界，720个小等级**：

### 凡界（1-80级）
练气 → 筑基 → 金丹 → 元婴 → 化神 → 炼虚 → 合体 → 大乘

### 灵界（81-160级）
灵虚 → 灵魄 → 灵婴 → 灵神 → 灵劫 → 灵尊 → 灵圣 → 灵帝

### 仙界（161-240级）
地仙 → 天仙 → 真仙 → 玄仙 → 金仙 → 太乙 → 大罗 → 仙帝

### 神界（241-320级）
神人 → 神将 → 神王 → 神尊 → 神皇 → 神帝 → 圣神 → 至高神

### 混沌界（321-400级）
混沌真君 → 混沌圣君 → 混沌帝君 → 混沌神君 → 混沌道君 → 混沌领主 → 混沌主宰 → 混沌至尊

### 鸿蒙界（401-480级）
鸿蒙元尊 → 鸿蒙天尊 → 鸿蒙圣尊 → 鸿蒙帝尊 → 鸿蒙至尊 → 鸿蒙道尊 → 鸿蒙道祖 → 鸿蒙始祖

### 虚无界（481-560级）
虚无行者 → 虚无尊者 → 虚无帝者 → 虚无仙尊 → 虚无神尊 → 虚无圣尊 → 虚无道主 → 虚无之祖

### 永恒界（561-640级）
永恒道主 → 永恒真皇 → 永恒圣帝 → 永恒劫尊 → 永恒天尊 → 永恒神祖 → 永恒祖帝 → 永恒至高

### 本源界（641-720级）
本源初醒 → 本源凝华 → 本源化虚 → 本源通玄 → 本源归真 → 本源涅槃 → 本源无极 → 本源永恒

## 📝 待办事项

当前系统已配置到 **灵婴期（101-110级）**，后续需要添加的境界：

### 灵界剩余境界
- [ ] 灵神期（111-120级）
- [ ] 灵劫期（121-130级）
- [ ] 灵尊期（131-140级）
- [ ] 灵圣期（141-150级）
- [ ] 灵帝期（151-160级）

### 仙界（161-240级）
- [ ] 地仙期（161-170级）
- [ ] 天仙期（171-180级）
- [ ] 真仙期（181-190级）
- [ ] 玄仙期（191-200级）
- [ ] 金仙期（201-210级）
- [ ] 太乙期（211-220级）
- [ ] 大罗期（221-230级）
- [ ] 仙帝期（231-240级）

### 其他界域
- [ ] 神界（241-320级）- 8个境界
- [ ] 混沌界（321-400级）- 8个境界
- [ ] 鸿蒙界（401-480级）- 8个境界
- [ ] 虚无界（481-560级）- 8个境界
- [ ] 永恒界（561-640级）- 8个境界
- [ ] 本源界（641-720级）- 8个境界

## 🔧 工具函数

### 数值计算
- `calculate(level, type)` - 计算单个等级数值
- `calculateRealm(realmStartLevel)` - 计算整个境界数值
- `calculateBatch(levels, type)` - 批量计算多个等级
- `calculateRange(startLevel, endLevel, type)` - 计算等级范围

### 数据导出
- `exportRealmData(realmStartLevel)` - 导出游戏配置格式
- `getAllConfiguredRealms()` - 获取所有已配置境界

### 工具函数
- `utils.formatNumber(num)` - 格式化数字显示
- `utils.printRealmTable(realmStartLevel)` - 打印境界数据表格
- `utils.calculateUpgradeExp(currentLevel, targetLevel)` - 计算升级所需经验

## 📚 详细文档

- **系统文档**：[docs/UNIFIED_CULTIVATION_SYSTEM.md](docs/UNIFIED_CULTIVATION_SYSTEM.md)
- **游戏设计**：[docs/GAME_DESIGN.md](docs/GAME_DESIGN.md)
- **使用示例**：[examples/calculate_new_realm.js](examples/calculate_new_realm.js)

## ⚠️ 重要说明

1. **境界级别修正**：境界级别（realmLevel）现在按大境界计算，同一境界内的10个小等级使用相同的境界级别
   - 练气1层 = 境界级别1，练气10层 = 境界级别1
   - 筑基初期 = 境界级别2，筑基大圆满 = 境界级别2

2. **数值一致性**：所有境界（除练气期）使用相同的 growthCurve，确保游戏平衡

3. **初始值来源**：
   - 练气期：原始真实数据
   - 灵虚期、灵魄期、灵婴期：用户提供的真实数据
   - 其他境界：需要手动添加初始值

## 🎯 下一步

1. **添加更多境界初始值**：在 `src/data/realm_initial_values.js` 中继续添加后续境界的初始值
2. **验证数值平衡**：运行测试确保所有境界的数值增长合理
3. **集成到游戏**：将统一系统集成到游戏的升级和战斗系统中

## 📞 支持

如有问题，请查看：
- 测试脚本：`node test_unified_system.js`
- 示例代码：`node examples/calculate_new_realm.js`
- 详细文档：`docs/UNIFIED_CULTIVATION_SYSTEM.md`

---

**版本**：v3.0.0  
**更新日期**：2025-10-30  
**作者**：AI Assistant
