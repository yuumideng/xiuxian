# 项目结构

## 根目录文件
```
xiuxian-game-vue3/
├── README.md                    # 项目说明
├── PROJECT_CLEANUP.md           # 清理报告
├── PROJECT_STRUCTURE.md         # 本文件
├── package.json                 # 依赖配置
├── package-lock.json           # 依赖锁定
├── vite.config.js              # Vite 配置
├── tailwind.config.js          # Tailwind 配置
├── postcss.config.js           # PostCSS 配置
├── index.html                  # HTML 入口
├── .eslintrc.cjs               # ESLint 配置
├── .eslintignore               # ESLint 忽略
├── .prettierrc                 # Prettier 配置
├── .prettierignore             # Prettier 忽略
└── .gitignore                  # Git 忽略
```

## 源代码目录（src/）

### 核心文件
```
src/
├── App.vue                     # 应用根组件
├── main.js                     # 应用入口
└── style.css                   # 全局样式
```

### 组件（components/）
```
components/
├── common/                     # 通用组件
│   ├── GameButton.vue         # 游戏按钮
│   └── Modal.vue              # 弹窗
├── BattleAttributeDetail.vue  # 战斗属性详情
├── BattleStats.vue            # 战斗数据
├── MoreFeatures.vue           # 更多功能
├── PlayerCard.vue             # 玩家卡片
├── SettingsModal.vue          # 设置弹窗
├── SkillEquipment.vue         # 功法装备
├── TalentSection.vue          # 天赋区域
└── TopBar.vue                 # 顶部栏
```

### 数据（data/）
```
data/
├── names.js                   # 姓名数据（随机姓名生成）
└── realms.js                  # 境界数据（90个境界配置）
```

### 路由（router/）
```
router/
└── index.js                   # 路由配置
```

### 状态管理（store/）
```
store/
├── index.js                   # Store 入口
└── gameState.js               # 游戏状态（Pinia）
```

### 工具函数（utils/）
```
utils/
├── battleAttributeDetailCalculator.js  # 战斗属性详情计算
├── battleCalculator.js                 # 战斗计算
├── growthCalculator.js                 # 增长速率计算
├── immortalRankingSystem.js            # 仙战榜系统
├── meridianSystem.js                   # 经脉系统
├── numberFormatter.js                  # 数字格式化
├── saveManager.js                      # 存档管理
├── spiritRingSystem.js                 # 仙灵环系统
└── talentSystem.js                     # 天赋系统
```

### 视图（views/）
```
views/
├── CreateCharacter.vue        # 创建角色页面
├── Home.vue                   # 游戏主页
└── SaveSelect.vue             # 存档选择页面
```

## 文档目录（docs/）
```
docs/
├── BATTLE_ATTRIBUTE_DETAIL_MODAL.md
├── BATTLE_DETAIL_FINAL_FIX.md
├── BATTLE_DETAIL_FIX.md
├── BATTLE_DETAIL_OPTIMIZATION.md
├── BATTLE_SYSTEM.md
├── BONUS_SYSTEMS_COMPARISON.md
├── BREAKTHROUGH_SYSTEM.md
├── DEVELOPMENT.md
├── GAME_DESIGN.md
├── GROWTH_RATE_SYSTEM.md
├── IMMORTAL_RANKING_SYSTEM.md
├── MERIDIAN_QUICK_REFERENCE.md
├── MERIDIAN_SYSTEM.md
├── MERIDIAN_USAGE_EXAMPLE.md
├── NEW_BATTLE_SYSTEM_V2.md
├── NUMBER_FORMAT_EXAMPLES.md
├── REALM_COEFFICIENT_SYSTEM.md
├── REALM_DATA_SUMMARY.md
├── SPIRIT_RING_SYSTEM.md
├── TALENT_SYSTEM.md
├── UI_GUIDE.md
└── UNIFIED_CULTIVATION_SYSTEM.md
```

## 构建产物（dist/）
```
dist/
├── index.html
└── assets/
    └── [构建后的 JS/CSS 文件]
```

## 统计信息

- **总组件数**: 11 个 Vue 组件
- **工具函数**: 9 个工具模块
- **数据文件**: 2 个
- **视图页面**: 3 个
- **文档数量**: 22 个系统设计文档
- **代码行数**: 约 3000+ 行（不含文档）

## 依赖关系

### 主要依赖
- Vue 3.x
- Vue Router 4.x
- Pinia 2.x
- Tailwind CSS 3.x

### 开发依赖
- Vite 5.x
- ESLint
- Prettier
- PostCSS
- Autoprefixer

## 路由结构

```
/                    → SaveSelect.vue    (存档选择)
/create-character    → CreateCharacter.vue (创建角色)
/game               → Home.vue          (游戏主页)
```

## 状态管理

使用 Pinia 管理全局游戏状态：
- 玩家信息（姓名、等级、年龄、资源等）
- 天赋和灵根属性
- 修为和战斗经验
- 游戏状态（在线/离线、暂停等）
- 各种加成系统（经脉、仙灵环、仙战榜）

## 存储方案

使用 LocalStorage 存储：
- 多个存档槽位（最多8个）
- 每个存档包含完整的游戏状态
- 支持离线收益计算
