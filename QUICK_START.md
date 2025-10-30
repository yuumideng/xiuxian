# 🚀 快速启动指南

## 渡劫飞升功能已完成！

---

## 📦 启动项目

### 1. 安装依赖（如果还没安装）
```bash
npm install
```

### 2. 启动开发服务器
```bash
npm run dev
```

### 3. 打开浏览器
访问：http://localhost:5173

---

## 🎮 测试渡劫飞升功能

### 方法1：在游戏中测试

1. **启动游戏**
   - 打开浏览器访问游戏
   - 查看右上角的修为和战斗经验进度条

2. **观察按钮状态**
   - 初始状态：按钮是灰色的（禁用）
   - 等待修为和战斗经验增长

3. **等待条件满足**
   - 当两个进度条都达到100%时
   - 按钮会变成黑底白字（可点击）

4. **点击渡劫飞升**
   - 点击按钮
   - 观察境界提升
   - 查看控制台输出（F12 打开开发者工具）

### 方法2：使用测试脚本

```bash
# 运行突破系统测试
node test_breakthrough.js
```

输出示例：
```
╔════════════════════════════════════════════════════════════╗
║           渡劫飞升系统 - 测试报告                          ║
╚════════════════════════════════════════════════════════════╝

【测试1】单次突破 - 刚好满足条件
═══════════════════════════════════════════════════════════

🌟 开始渡劫飞升...

第1次突破：
  境界：1级 → 2级
  修为：5,000 - 4,191 = 809
  战斗：5,000 - 4,191 = 809

✨ 突破完成！共突破 1 个境界
```

---

## 🎯 功能验证清单

### 基础功能
- [ ] 按钮显示在修为进度条右侧
- [ ] 初始状态按钮是灰色的
- [ ] 修为和战斗经验都满足时，按钮变黑色
- [ ] 点击按钮可以突破境界
- [ ] 突破后剩余经验继承到下一境界

### 高级功能
- [ ] 剩余经验足够时，可以连续突破多个境界
- [ ] 长时间挂机后，点击一次可以突破多次
- [ ] 控制台输出详细的突破信息
- [ ] 按钮状态切换流畅

### UI 效果
- [ ] 可点击状态：黑底白字
- [ ] 禁用状态：灰色
- [ ] 鼠标悬停有高亮效果（仅可点击状态）
- [ ] 禁用状态无法点击

---

## 🔍 调试技巧

### 1. 快速测试突破功能

在浏览器控制台（F12）中执行：

```javascript
// 获取 gameStore
const gameStore = window.__PINIA__.state.value.game

// 设置大量经验（测试连续突破）
gameStore.player.exp = 10000000
gameStore.player.combat = 10000000

// 查看当前状态
console.log('当前境界：', gameStore.currentRealm.fullName)
console.log('修为：', gameStore.player.exp)
console.log('战斗经验：', gameStore.player.combat)
console.log('可突破：', gameStore.canBreakthrough)
```

### 2. 查看突破日志

点击渡劫飞升按钮后，控制台会输出：

```
第1次突破：练气初期 → 练气初期大成
第2次突破：练气初期大成 → 练气初期巅峰
第3次突破：练气初期巅峰 → 练气中期
✨ 渡劫飞升成功！共突破 3 个境界，当前境界：练气中期
```

### 3. 检查按钮状态

```javascript
// 检查按钮是否可点击
const button = document.querySelector('.breakthrough-button')
console.log('按钮禁用状态：', button.disabled)
console.log('按钮类名：', button.className)
```

---

## 📊 性能监控

### 查看游戏状态

```javascript
// 在控制台执行
const gameStore = window.__PINIA__.state.value.game

console.log('玩家信息：', {
  境界: gameStore.currentRealm.fullName,
  等级: gameStore.player.level,
  年龄: gameStore.player.age,
  修为: gameStore.player.exp,
  战斗经验: gameStore.player.combat,
  修为进度: gameStore.expProgress + '%',
  战斗进度: gameStore.combatProgress + '%',
  可突破: gameStore.canBreakthrough
})
```

---

## 🐛 常见问题

### Q1: 按钮一直是灰色的？
**A**: 需要等待修为和战斗经验都达到当前境界需求。可以：
- 等待自动增长
- 或在控制台手动设置大量经验（见调试技巧）

### Q2: 点击按钮没反应？
**A**: 检查：
1. 按钮是否是黑色（可点击状态）
2. 打开控制台查看是否有错误信息
3. 确认游戏没有暂停

### Q3: 突破后经验清零了？
**A**: 这是正常的！经验会扣除当前境界需求，剩余部分继承。例如：
- 突破前：修为 5000，需求 4191
- 突破后：修为 809（5000 - 4191）

### Q4: 如何测试连续突破？
**A**: 在控制台设置大量经验：
```javascript
const gameStore = window.__PINIA__.state.value.game
gameStore.player.exp = 100000000  // 1亿
gameStore.player.combat = 100000000  // 1亿
```
然后点击渡劫飞升按钮。

---

## 📚 相关文档

| 文档 | 说明 |
|------|------|
| `docs/BREAKTHROUGH_SYSTEM.md` | 渡劫飞升系统详细说明 |
| `docs/UI_GUIDE.md` | UI 设计指南 |
| `BREAKTHROUGH_SUMMARY.md` | 功能完成总结 |
| `CHANGELOG.md` | 更新日志 |
| `test_breakthrough.js` | 测试脚本 |

---

## 🎉 开始体验

现在就启动项目，体验全新的渡劫飞升功能吧！

```bash
npm run dev
```

然后打开浏览器访问：http://localhost:5173

祝你修仙之路顺利！🌟
