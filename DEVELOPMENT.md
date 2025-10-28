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

#### 🔍 故障排除步骤:

1. **重启 VSCode** (最重要!)
   ```bash
   # 完全关闭 VSCode,然后重新打开项目文件夹
   ```

2. **检查插件状态**
   - 按 `Ctrl+Shift+P` / `Cmd+Shift+P`
   - 输入 "Extensions: Show Installed Extensions"
   - 确认以下插件已安装并启用:
     - ✅ ESLint (dbaeumer.vscode-eslint)
     - ✅ Prettier - Code formatter (esbenp.prettier-vscode)
     - ✅ Vue Language Features (Volar) (vue.volar)

3. **验证配置加载**
   - 按 `Ctrl+Shift+P` / `Cmd+Shift+P`
   - 输入 "Preferences: Open Workspace Settings (JSON)"
   - 确认显示的是项目根目录下的 `.vscode/settings.json`

4. **手动测试格式化**
   ```bash
   # 测试 Prettier 是否工作
   npm run format
   
   # 测试 ESLint 是否工作
   npm run lint
   ```

5. **逐步测试保存时格式化**
   - 打开任意 `.vue` 文件
   - 故意打乱格式 (删除空格、换行等)
   - 按 `Shift+Alt+F` / `Shift+Option+F` 手动格式化
   - 如果手动格式化成功,再测试保存时自动格式化

6. **检查状态栏**
   - VSCode 底部状态栏应显示:
     - 语言模式: "Vue"
     - 格式化工具: "Prettier"

7. **查看输出日志**
   - View → Output
   - 下拉选择 "Prettier" 或 "ESLint"
   - 查看是否有错误信息

8. **重置 VSCode 设置** (最后手段)
   ```bash
   # 如果以上都不行,可以尝试重置用户设置
   # 按 Ctrl+Shift+P / Cmd+Shift+P
   # 输入 "Preferences: Open User Settings (JSON)"
   # 临时添加以下设置:
   ```
   ```json
   {
     "editor.formatOnSave": true,
     "editor.defaultFormatter": "esbenp.prettier-vscode"
   }
   ```

#### 🎯 快速验证方法:

1. 打开 `src/components/MoreFeatures.vue`
2. 在任意一行末尾添加多个空格
3. 按 `Ctrl+S` / `Cmd+S` 保存
4. 如果空格被自动删除,说明格式化生效了!

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
