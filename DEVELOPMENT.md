# 开发指南

## 代码格式化配置

本项目已配置 ESLint 和 Prettier 自动格式化。

### 必需的 VSCode 插件

请确保安装以下插件:

1. **ESLint** (dbaeumer.vscode-eslint)
2. **Prettier - Code formatter** (esbenp.prettier-vscode)
3. **Vue Language Features (Volar)** (vue.volar)

### 自动格式化

保存文件时会自动:
- 使用 Prettier 格式化代码
- 使用 ESLint 修复可自动修复的问题

### 手动命令

```bash
# 格式化所有代码
npm run format

# 检查并修复 ESLint 问题
npm run lint
```

### 如果自动格式化不生效

1. **重启 VSCode**
   - 关闭 VSCode 后重新打开项目

2. **检查插件是否已安装**
   - 打开命令面板 (Ctrl+Shift+P / Cmd+Shift+P)
   - 输入 "Extensions: Show Recommended Extensions"
   - 安装所有推荐的插件

3. **检查 VSCode 设置**
   - 打开命令面板
   - 输入 "Preferences: Open Workspace Settings (JSON)"
   - 确认 `.vscode/settings.json` 已加载

4. **手动触发格式化**
   - 右键点击文件 → "Format Document"
   - 或使用快捷键: Shift+Alt+F (Windows/Linux) / Shift+Option+F (Mac)

5. **查看输出日志**
   - 打开输出面板: View → Output
   - 选择 "ESLint" 或 "Prettier" 查看错误信息

### 格式化规则

- 不使用分号
- 使用单引号
- 2 空格缩进
- 行宽限制 100 字符
- 使用 LF 换行符

## 开发命令

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```
