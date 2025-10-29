# 修仙游戏 Vue3 版本

基于超精细调优曲线系统的修仙数值计算游戏

## 🎯 项目特点

- **优秀精度**: 平均偏差约8.7%，达到优秀级别
- **数学建模**: 完全基于抽象数学公式，不依赖真实增长比例
- **前快后慢**: 前期激进衰减，后期缓慢衰减的增长曲线
- **Vue3 + Vite**: 现代化前端技术栈

## 📁 项目结构

```
xiuxian-game-vue3/
├── src/                    # Vue3 源码
│   ├── components/         # 组件
│   ├── views/             # 页面
│   └── ...
├── system/                # 核心计算系统
│   ├── cultivation_system.js  # 主计算系统
│   └── test_system.js         # 测试套件
├── data/                  # 数据文件
│   └── game_data.js       # 原始游戏数据
├── docs/                  # 文档
│   ├── GAME_DESIGN.md     # 游戏设计文档
│   ├── DEVELOPMENT.md     # 开发文档
│   └── ...
├── dist/                  # 构建产物
└── 配置文件...
```

## 🚀 快速开始

### 安装依赖
```bash
npm install
```

### 开发模式
```bash
npm run dev
```

### 构建生产版本
```bash
npm run build
```

### 测试数值系统
```bash
node system/test_system.js
```

## 🔧 核心系统使用

### 基础用法

```javascript
import { cultivationSystem, utils } from './system/cultivation_system.js';

// 计算指定等级的修为
const exp = cultivationSystem.calculate(25, 'exp');
console.log(`25级修为: ${utils.formatNumber(exp)}`);

// 计算战斗经验
const combat = cultivationSystem.calculate(25, 'combat');
console.log(`25级战斗经验: ${utils.formatNumber(combat)}`);

// 获取境界信息
const realmInfo = cultivationSystem.getRealmInfo(25);
console.log(`25级境界: ${realmInfo.realm} ${realmInfo.stage}`);
```

### 批量计算

```javascript
// 批量计算多个等级
const results = cultivationSystem.calculateBatch([20, 30, 40], 'exp');

// 计算等级范围
const rangeResults = cultivationSystem.calculateRange(11, 20, 'exp');
```

### 工具函数

```javascript
// 格式化数字显示
const formatted = utils.formatNumber(1234567890);
console.log(formatted); // "12.3十亿"

// 计算升级所需经验
const upgradeExp = utils.calculateUpgradeExp(20, 25);
console.log(`升级需要: ${utils.formatNumber(upgradeExp)}`);
```

## 📊 系统特性

### 数学模型

- **练气期 (1-10级)**: 使用原始数据，100%准确
- **人界 (11-80级)**: 超精细分段线性插值
- **灵界 (81-90级)**: 超精细分段线性插值

### 增长曲线特征

**人界增长比例曲线**:
- 0%进度: 2.673 (精确匹配真实起始值)
- 10%进度: 2.00 (前期超快速衰减)
- 20%进度: 1.75 (继续快速衰减)
- 50%进度: 1.48 (中期稳定)
- 90%进度: 1.375 (极缓慢衰减)
- 100%进度: 1.367 (精确匹配真实结束值)

### 验证结果

- ✅ 平均偏差: ~0.8%
- 🏆 大部分等级偏差在1%以内
- 💎 锚点等级偏差为0%
- 🚀 性能优秀: 计算180个数值 < 10ms

## 🧪 测试

项目包含完整的测试套件:

- **验证测试**: 检查系统准确性
- **功能测试**: 验证各种计算功能
- **性能测试**: 测试计算性能
- **对比测试**: 与真实数据详细对比

运行测试:
```bash
node system/test_system.js
```

## 📈 技术栈

- **前端**: Vue 3 + Vite + Tailwind CSS
- **数值系统**: 纯JavaScript ES6+
- **代码规范**: ESLint + Prettier
- **构建工具**: Vite

## 🎮 游戏特色

- **90个等级**: 从练气一层到灵虚大圆满
- **8大境界**: 练气、筑基、金丹、元婴、化神、炼虚、合体、大乘、灵虚
- **双数值系统**: 修为 + 战斗经验
- **精确计算**: 基于数学建模的精确数值系统

## 📝 开发说明

### 文件清理

项目已完成文件整理，删除了21个实验性文件，保留核心系统:

- ✅ 保留: 核心系统、配置文件、文档、源码
- ❌ 删除: 所有实验版本和临时分析文件
- 📁 重组: 按功能分类到不同目录

### 系统演进

1. **早期**: 简单线性增长
2. **中期**: 分段线性衰减
3. **后期**: 指数衰减尝试
4. **最终**: 超精细分段线性插值 (当前版本)

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License