# 天道轮回：我的修仙梦

一款基于 Vue3 的修仙放置类游戏，包含完整的修仙体系、战斗系统和存档管理。

## 🎯 项目特点

- **完整修仙体系**: 90个境界，从练气到灵虚大圆满
- **多维成长系统**: 天赋、灵根、经脉、仙灵环、仙战榜等多个成长维度
- **战斗属性系统**: 8大战斗属性（血量、攻击、防御、暴击等）
- **存档管理**: 支持多存档，动态创建/删除存档位
- **现代化技术栈**: Vue3 + Vite + Pinia + Tailwind CSS

## 📁 项目结构

```
xiuxian-game-vue3/
├── src/
│   ├── components/          # 组件
│   │   ├── common/         # 通用组件（Modal、GameButton）
│   │   ├── BattleAttributeDetail.vue
│   │   ├── BattleStats.vue
│   │   ├── MoreFeatures.vue
│   │   ├── PlayerCard.vue
│   │   ├── SettingsModal.vue
│   │   ├── SkillEquipment.vue
│   │   ├── TalentSection.vue
│   │   └── TopBar.vue
│   ├── data/               # 数据文件
│   │   ├── names.js        # 姓名数据
│   │   └── realms.js       # 境界数据
│   ├── router/             # 路由配置
│   ├── store/              # 状态管理（Pinia）
│   │   └── gameState.js    # 游戏状态
│   ├── utils/              # 工具函数
│   │   ├── battleAttributeDetailCalculator.js
│   │   ├── battleCalculator.js
│   │   ├── growthCalculator.js
│   │   ├── immortalRankingSystem.js
│   │   ├── meridianSystem.js
│   │   ├── numberFormatter.js
│   │   ├── saveManager.js
│   │   ├── spiritRingSystem.js
│   │   └── talentSystem.js
│   ├── views/              # 页面
│   │   ├── CreateCharacter.vue  # 创建角色
│   │   ├── Home.vue            # 游戏主页
│   │   └── SaveSelect.vue      # 存档选择
│   ├── App.vue
│   ├── main.js
│   └── style.css
├── docs/                   # 详细文档
├── dist/                   # 构建产物
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

## 🎮 游戏功能

### 存档系统
- 支持多存档（最多8个）
- 动态创建/删除存档位
- 可以删除到0个存档位
- 自动保存（每10秒）

### 角色创建
- 自定义角色姓名（随机仙侠风格姓名）
- 性别选择
- 天赋属性（气感、神识、根骨、悟性、机缘）
- 灵根系统（金木水火土风雷光八种灵根）
- 轮回加成系统

### 修炼系统
- **90个境界**: 练气(1-10) → 筑基(11-20) → 金丹(21-30) → 元婴(31-40) → 化神(41-50) → 炼虚(51-60) → 合体(61-70) → 大乘(71-80) → 灵虚(81-90)
- **双数值成长**: 修为 + 战斗经验
- **渡劫飞升**: 手动突破境界
- **暂停/继续**: 游戏速度控制

### 成长系统
- **天赋系统**: 5大天赋影响不同属性
- **灵根系统**: 8种灵根影响修炼速度
- **经脉系统**: 随境界提升自动解锁
- **仙灵环系统**: 提供额外加成
- **仙战榜系统**: 随机加成系统

### 战斗系统
- **8大战斗属性**: 血量、攻击、防御、暴击率、暴击伤害、命中、闪避、速度
- **战斗力计算**: 综合所有属性的战斗力评估
- **详细属性查看**: 可查看每个属性的详细计算过程

## 📊 核心系统

### 数值计算
- 基于境界系数的增长系统
- 天赋、灵根、经脉、仙灵环、仙战榜多维度加成
- 精确的数值平衡

### 数字格式化
支持大数字显示：
- 万、亿、万亿、亿亿
- 上标指数显示（如：8282.37万亿⁴）

### 存档管理
- LocalStorage 本地存储
- 支持多槽位管理
- 离线收益计算（最多24小时）

## 📈 技术栈

- **前端框架**: Vue 3 (Composition API)
- **构建工具**: Vite
- **状态管理**: Pinia
- **路由**: Vue Router
- **样式**: Tailwind CSS
- **代码规范**: ESLint + Prettier
- **存储**: LocalStorage

## 📝 开发说明

### 项目清理

项目已完成大规模清理（2025-10-31），删除了 37+ 个无用文件：

- ❌ 删除: 11个测试文件、16个临时文档、4个无用组件、2个废弃工具
- ✅ 保留: 核心功能代码、系统设计文档、配置文件
- 📁 详情: 查看 `PROJECT_CLEANUP.md`

### 代码规范

- 使用 ES6+ 语法
- 组件使用 Composition API
- 统一使用 `import` 而非 `require`
- 遵循 Vue 3 最佳实践

### 文档

详细的系统设计文档位于 `docs/` 目录：
- `GAME_DESIGN.md` - 游戏设计
- `BATTLE_SYSTEM.md` - 战斗系统
- `BREAKTHROUGH_SYSTEM.md` - 突破系统
- `TALENT_SYSTEM.md` - 天赋系统
- `MERIDIAN_SYSTEM.md` - 经脉系统
- `SPIRIT_RING_SYSTEM.md` - 仙灵环系统
- `IMMORTAL_RANKING_SYSTEM.md` - 仙战榜系统
- 等等...

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License