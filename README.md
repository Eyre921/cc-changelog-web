# ⚡ Claude Code 全特性速览

> 从用户视角出发，带你看懂 Claude Code 的每一项能力。

> [在线预览](https://cclog.vibevibe.cn/) · [进阶用法](https://www.vibevibe.cn/Advanced/)

一个交互式的 Claude Code 功能速览网站，梳理了从 **v0.2.21 到 v2.1.71** 共 **220+ 个版本**、**1000+ 项更新**的完整功能演进。

🔗 **数据来源**：[GitHub Releases](https://github.com/anthropics/claude-code/releases) · [官方文档](https://code.claude.com/docs) · [下载 Claude Code](https://claude.com/download)

---

## ✨ 特性

- **13 大功能板块** — AI 模型、多 Agent 协作、会话管理、开发工作流、MCP 生态、终端体验、安全沙箱、SDK 集成、性能优化、跨平台、VS Code 扩展等
- **版本时间线** — 从 v0.2 到 v2.1 的完整演进历程
- **场景化展示** — 每个功能附带真实使用场景，帮助理解实际用途
- **终端打字动画** — Hero 区域模拟终端输入效果
- **滚动淡入动画** — 基于 Intersection Observer 的滚动渐显效果
- **导航高亮** — 粘性导航栏随滚动自动高亮当前章节
- **暗色主题** — 开发者友好的暗色 UI，暖色调点缀，导航栏支持亮暗主题切换按钮
- **中英文切换** — 导航栏支持中文/英文语言切换按钮
- **响应式设计** — 适配桌面端与移动端
- **无障碍支持** — 尊重 `prefers-reduced-motion`，使用语义化 HTML
- **零依赖** — 纯 HTML + CSS + JavaScript，无需构建工具

## 🛠 技术栈

| 技术 | 说明 |
|------|------|
| HTML5 | 语义化结构，单文件应用 |
| CSS3 | CSS 变量主题、Flexbox/Grid 布局、渐变动画 |
| Vanilla JS | 原生 DOM 操作，无框架依赖 |
| 字体 | SF Mono / Cascadia Code / JetBrains Mono + Noto Sans SC |

## 🚀 使用方式

本项目是一个纯静态的单页 HTML 文件，无需安装任何依赖或构建步骤。

### 本地预览

直接在浏览器中打开 `index.html` 即可：

```bash
# macOS
open index.html

# Linux
xdg-open index.html

# Windows
start index.html
```

或使用任意静态文件服务器：

```bash
# Python
python -m http.server 8000

# Node.js (需安装 npx)
npx serve .
```

然后访问 `http://localhost:8000`。

### 部署

由于是纯静态文件，可以部署到任意静态托管服务：

- **GitHub Pages** — 直接启用即可
- **Vercel / Netlify** — 拖拽上传或关联仓库
- **Cloudflare Pages** — 零配置部署
- **任意 CDN 或 Web 服务器**

## 📁 项目结构

```
cc-changelog-web/
├── index.html       # 主 HTML 文件
├── css/
│   └── style.css    # 样式文件（亮/暗主题）
├── js/
│   ├── app.js       # 应用逻辑（主题切换、动画、导航）
│   └── i18n.js      # 国际化模块
├── i18n/
│   ├── zh-CN.json   # 中文翻译
│   └── en.json      # 英文翻译
└── README.md        # 项目说明
```

## 📊 内容板块

| # | 板块 | 关键内容 |
|---|------|----------|
| 1 | AI 模型与选择 | Opus 4.6、Fast Mode、Sonnet 4.6、Haiku 4.5、100 万上下文 |
| 2 | 多 Agent 协作 | Agent 团队、后台 Agent、多任务并行 |
| 3 | 会话与上下文管理 | 自动记忆、会话分叉/恢复、PR 关联 |
| 4 | 开发工作流 | Git/PR 集成、Plan Mode、Web 搜索、PDF 阅读、LSP |
| 5 | MCP 生态与扩展 | OAuth、插件、Skills、Hooks、远程控制 |
| 6 | 终端体验 | 主题、Vim 模式、CJK 支持、快捷键、/loop 定时循环 |
| 7 | 安全与信任 | 沙箱环境、权限控制 |
| 8 | SDK 与集成 | TypeScript/Python SDK、插件、自定义工具 |
| 9 | 性能与效率 | 渲染优化 74%、内存泄漏修复、启动性能优化 |
| 10 | 跨平台 | macOS、Linux、Windows、WSL2 |
| 11 | VS Code 集成 | 扩展功能、Spark 图标、Plan Markdown 视图、MCP 管理 |
| 12 | 快捷键与命令 | 快捷键速查、斜杠命令、CLI 子命令、环境变量、自定义配置 |
| 13 | 版本时间线 | v0.2.21 ~ v2.1.71 完整历程 |

## 🤝 贡献

欢迎提交 Issue 或 Pull Request 来完善内容。

## 📝 说明

- 整理时间：2026-03-08
- 版本范围：v0.2.21 ~ v2.1.71
- 本站使用 Claude Code 构建
