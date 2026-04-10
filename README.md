# ⚡ Claude Code 全特性速览

> 从用户视角出发，带你看懂 Claude Code 的每一项能力。

> [在线预览](https://cclog.vibevibe.cn/) · [进阶用法](https://www.vibevibe.cn/Advanced/)

一个交互式的 Claude Code 功能速览网站，梳理了从 **v0.2.21 到 v2.1.98** 共 **245+ 个版本**、**1200+ 项更新**的完整功能演进。每项功能都配有真实使用场景，用中国开发者熟悉的语言讲述，看完就能上手。

🔗 **数据来源**：[GitHub Releases](https://github.com/anthropics/claude-code/releases) · [官方文档](https://code.claude.com/docs) · [下载 Claude Code](https://claude.com/download)

---

## ✨ 特性

- **14 大功能板块** — AI 模型、多 Agent 协作、会话管理、开发工作流、MCP 生态、终端体验、安全沙箱、SDK 集成、企业工程化与可观测、性能优化、跨平台、VS Code 扩展等
- **版本时间线** — 从 v0.2 到 v2.1 的完整演进历程
- **场景化叙事** — 每个功能附带真实使用场景和故事化描述，用中国开发者社区熟悉的词句，看完就知道怎么用
- **终端打字动画** — Hero 区域模拟终端输入效果
- **滚动淡入动画** — 基于 Intersection Observer 的滚动渐显效果
- **丰富微交互** — 滚动进度条、卡片入场交错、hover 光波、统计数字滚动计数、时间线脉冲、hero 浮动粒子、卡片 3D 鼠标追踪倾斜、高亮卡片呼吸灯、hero 标题渐变流动、徽章微光扫过、卡片点击水波纹、渐变边框动画、时间线滚动渐显进度线、浮动按钮磁性吸附 + 描边环、section 标题悬浮渐变、场景列表交错入场、CTA 脉冲光晕、标签微光扫过、导航栏滚动阴影、hero 光斑跟随、时间线滚动高亮、卡片悬浮发光、统计数字跳入、键盘按键动画、场景图标旋转等 30+ 种精致动效
- **导航高亮** — 粘性导航栏随滚动自动高亮当前章节
- **暗色主题** — 开发者友好的暗色 UI，暖色调点缀，导航栏支持亮暗主题切换按钮
- **中英文切换** — 导航栏支持中文/英文语言切换按钮
- **响应式设计** — 适配桌面端与移动端
- **无障碍支持** — 尊重 `prefers-reduced-motion`，使用语义化 HTML
- **零依赖** — 纯 HTML + CSS + JavaScript，无需构建工具

## 🔄 本次同步结论（v2.1.98）

- **Vertex AI 交互式向导上线** —— v2.1.98 在登录页「3rd-party platform」里新增 Vertex 向导，从 GCP 鉴权、项目/区域配置到凭证校验和模型固定一步步带你走。对要落地在 Google Cloud 的团队来说，终于不是“文档地狱”，而是“开箱即跑”。
- **企业工程化模块补强（建议纳入独立板块）** —— v2.1.98 的 `CLAUDE_CODE_PERFORCE_MODE` 让只读文件编辑失败时直接给出 `p4 edit` 提示，不再偷偷覆盖；再加上 Linux 子进程沙箱隔离和脚本调用上限控制，特别适合有审计和合规要求的团队。
- **Monitor 工具补齐“可观测闭环”** —— v2.1.98 新增 Monitor 工具用于流式观察后台脚本事件。以前像“黑盒子”一样看不清后台任务，现在可以边跑边看，排障体验更丝滑。
- **安全修复密集交付** —— v2.1.98/2.1.97 连续修复多类 Bash 权限绕过与提示失效问题（含转义参数、复合命令、`/dev/tcp`/`/dev/udp`、`grep -f`/`rg -f` 等场景），权限策略更“说到做到”。
- **工作流可追踪性继续增强** —— 状态行输入增加 `workspace.git_worktree` 字段，OTEL 场景下 Bash 子进程传递 W3C `TRACEPARENT`，跨进程调用链能串起来，排查“慢在哪儿”更直接。
- **LSP 生态对接更标准** —— v2.1.98 起初始化请求里会通过 `clientInfo` 明确标识 Claude Code，语言服务端能更稳地识别客户端能力，降低兼容性摩擦。
- **会话恢复体验继续打磨** —— `/resume` 相关可编辑性、过滤状态、跨项目陈旧缓存、大文件 diff 丢失等问题持续修复，长期多会话开发更稳，不容易“聊着聊着就断片”。
- **已有亮点继续保留** —— `/release-notes` 交互式版本选择器、`/cost` 按模型与缓存命中拆分、远程会话主机名前缀、`forceRemoteSettingsRefresh` 强制刷新策略，以及 `/powerup` 互动教学，仍然是上手与团队推广的核心抓手。

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
| 2 | 多 Agent 协作 | Agent 团队、后台 Agent、多任务并行、Worktree 隔离 |
| 3 | 会话与上下文管理 | 自动记忆、会话分叉/恢复、PR 关联、智能压缩 |
| 4 | 开发工作流 | Git/PR 集成、Plan Mode、`/plan` 直接起手、Web 搜索、PDF 阅读、LSP |
| 5 | MCP 生态与扩展 | OAuth、插件、Skills、Hooks、远程控制、二进制内容处理、tool search 补强 |
| 6 | 终端体验 | 主题、Vim 模式、CJK 支持、快捷键、`/copy` 直写文件、语音输入、Bash 命令自动放行 |
| 7 | 安全与信任 | 沙箱环境、权限控制、企业合规 |
| 8 | SDK 与集成 | TypeScript/Python SDK、Desktop 应用、OTel 可观测性 |
| 9 | 企业工程化与可观测 | Monitor 流式观测、Perforce 模式、子进程沙箱隔离、脚本调用治理 |
| 10 | 性能与效率 | 渲染优化 74%、30+ 内存泄漏修复、启动冻结修复 |
| 11 | 跨平台 | macOS、Linux、Windows、WSL2、ARM64 |
| 12 | VS Code 集成 | Spark 图标、Plan Markdown 视图、MCP 管理对话框 |
| 13 | 快捷键与命令 | 快捷键速查、斜杠命令、`/effort`、CLI 子命令、环境变量、自定义配置 |
| 14 | 版本时间线 | v0.2.21 ~ v2.1.98 完整历程 |

## 🎨 内容风格

本站内容面向中国开发者社区，在保证准确性的前提下追求：

- **场景化叙事**：每个功能都配有"谁、在什么情况下、怎么用"的真实场景描述
- **故事感**：场景描述像讲故事一样娓娓道来，而非干巴巴的功能罗列
- **社区认知对齐**：使用中国开发者社区熟悉的词句（如"一把梭"、"丝滑"、"效率拉满"、"开箱即用"等）
- **降低心智负担**：标题和副标题一句话说清楚"这个功能解决什么问题"

## 🤝 贡献

欢迎提交 Issue 或 Pull Request 来完善内容。

## 📝 说明

- 整理时间：2026-04-06
- 版本范围：v0.2.21 ~ v2.1.98
- 本站使用 Claude Code 构建
