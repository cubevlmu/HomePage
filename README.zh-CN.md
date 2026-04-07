<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/cubevlmu/HomePage/">
    <img src="./public/favicon.svg" alt="HomePage Logo" width="80" height="80">
  </a>

  <h3 align="center">HomePage</h3>

  <p align="center">
    一个使用 Vue 3、Vite 和 TypeScript 构建的双语个人主页与项目展示站点。
    它支持个人信息展示、项目数据驱动、Markdown 项目详情，以及轻量的内容维护方式。
    本项目在设计、实现和迭代过程中得到了 OpenAI Codex 的协助。
    <br />
    <br />
    <a href="./README.md">
      <img src="./public/favicon.svg" alt="English README" width="16" height="16">
      English
    </a>
  </p>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
</p>

## 目录

- [快速开始](#快速开始)
  - [环境要求](#环境要求)
  - [安装](#安装)
- [功能特性](#功能特性)
- [目录结构](#目录结构)
- [架构说明](#架构说明)
- [内容系统](#内容系统)
- [部署](#部署)
- [技术栈](#技术栈)
- [参与贡献](#参与贡献)
  - [贡献方式](#贡献方式)
- [版本管理](#版本管理)
- [作者](#作者)
- [许可证](#许可证)
- [致谢](#致谢)

---

### 快速开始

HomePage 是一个基于 Vue 的个人站点，核心目标是以简单的数据结构维护个人主页和项目展示内容。
它默认使用英文界面，并支持切换为中文，还包含项目详情页、Markdown 渲染和本地资源驱动的项目内容系统。

#### 环境要求

- 推荐 Node.js 20 或更高版本
- 推荐 npm 10 或更高版本

#### 安装

1. 克隆仓库：

   ```sh
   git clone https://github.com/cubevlmu/HomePage.git
   cd HomePage
   ```

2. 安装依赖：

   ```sh
   npm install
   ```

3. 启动开发服务器：

   ```sh
   npm run dev
   ```

4. 构建生产版本：

   ```sh
   npm run build
   ```

---

### 功能特性

- 默认英文界面，并支持切换为中文
- `src/resources/` 下的站点级 JSON 数据驱动
- `src/content/projects/` 下的项目内容数据驱动
- 基于 Markdown 的项目详情页
- 支持 `logo`、`cover`、`snapshot` 本地资源解析
- 响应式布局，包含项目卡片、详情页和联系页
- 基于 `mailto` 的轻量联系表单

---

### 目录结构

```text
home_page/
├── doc/                         # 内容和数据驱动模板说明文档
├── public/                      # 静态资源，例如 favicon、icons 和图片
│   ├── favicon.svg
│   ├── icons.svg
│   └── images/
├── src/
│   ├── components/              # 可复用 Vue 组件
│   │   ├── common/
│   │   ├── layout/
│   │   └── sections/
│   ├── content/
│   │   └── projects/            # 每个项目自己的 meta.json、content.md、logo、cover、snapshot
│   ├── data/                    # 将资源数据整理为页面可用数据
│   ├── resources/               # 站点级 JSON 内容
│   ├── router/                  # Vue Router 路由定义
│   ├── types/                   # TypeScript 类型定义
│   ├── utils/                   # 工具函数，例如 markdown 辅助
│   ├── views/                   # 路由页面
│   ├── App.vue
│   ├── main.ts
│   └── style.css
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

### 架构说明

HomePage 的结构围绕一条轻量内容管线组织：

- `src/resources/`
  提供站点级的多语言 JSON 内容，包括 hero、navigation、about、contact、footer 和 UI 文案。

- `src/data/`
  将静态 JSON 和项目文件整理成带类型的响应式数据模型，供页面层直接使用。

- `src/content/projects/`
  每个项目一个文件夹，包含 `meta.json`、`content.md` 和可选资源文件。

- `src/views/` 与 `src/components/`
  页面级视图和通用组件分离，方便继续扩展站点内容。

---

### 内容系统

项目详情页使用数据驱动方式维护。

每个项目目录结构如下：

```text
src/content/projects/<slug>/
  meta.json
  content.md
  logo.*
  cover.*
  snapshot.*
```

行为规则：

- `logo`
  用于项目卡片和项目详情页头部

- `cover`
  用于项目详情页右侧主视觉区域

- `snapshot.*`
  当 `cover` 未配置时，作为主视觉区域的兜底图片

- `screenshots`
  只有在 `meta.json` 中显式配置后，才会显示在下方 gallery 中

相关模板和文档见：

- [`doc/data-driven-projects.md`](./doc/data-driven-projects.md)
- [`doc/project-meta.template.json`](./doc/project-meta.template.json)
- [`doc/project-content.template.md`](./doc/project-content.template.md)

---

### 部署

HomePage 是一个静态前端项目，可以部署到任何支持静态文件托管的平台。

基本部署流程：

1. 安装依赖
2. 执行生产构建
3. 发布生成的 `dist/` 目录

示例：

```sh
npm install
npm run build
```

之后将 `dist/` 部署到你的静态托管平台即可。

---

### 技术栈

- [Vue 3](https://vuejs.org/) - UI 框架
- [Vite](https://vite.dev/) - 构建工具和开发服务器
- [TypeScript](https://www.typescriptlang.org/) - 类型安全代码
- [Vue Router](https://router.vuejs.org/) - 前端路由
- [Markdown-It](https://github.com/markdown-it/markdown-it) - Markdown 渲染
- [Font Awesome](https://fontawesome.com/) - 图标系统

---

### 参与贡献

欢迎贡献，尤其是以下方向：

- 页面视觉与交互优化
- 可访问性改进
- 内容维护工具优化
- 项目数据驱动流程改进

#### 贡献方式

1. Fork 本项目
2. 创建功能分支（`git checkout -b feature/AmazingFeature`）
3. 提交修改（`git commit -m 'Add some AmazingFeature'`）
4. 推送到分支（`git push origin feature/AmazingFeature`）
5. 发起 Pull Request

---

### 版本管理

本项目使用 Git 进行版本管理。
如有发布版本，可通过仓库历史记录和标签查看。

---

### 作者

- Cubevlmu - [GitHub](https://github.com/cubevlmu)
- OpenAI Codex - 实现协助与迭代支持

也可以查看 [contributors][contributors-url] 获取参与者列表。

---

### 许可证

当前仓库尚未包含正式许可证文件。
如果你计划公开发布或开源该项目，请补充 `LICENSE` 文件并更新本节内容。

---

### 致谢

- [Vue](https://vuejs.org/)
- [Vite](https://vite.dev/)
- [Vue Router](https://router.vuejs.org/)
- [Markdown-It](https://github.com/markdown-it/markdown-it)
- [Font Awesome](https://fontawesome.com/)
- [OpenAI Codex](https://openai.com/codex/)

---

<!-- links -->

[contributors-shield]: https://img.shields.io/github/contributors/cubevlmu/HomePage.svg?style=flat-square
[contributors-url]: https://github.com/cubevlmu/HomePage/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/cubevlmu/HomePage.svg?style=flat-square
[forks-url]: https://github.com/cubevlmu/HomePage/network/members
[stars-shield]: https://img.shields.io/github/stars/cubevlmu/HomePage.svg?style=flat-square
[stars-url]: https://github.com/cubevlmu/HomePage/stargazers
[issues-shield]: https://img.shields.io/github/issues/cubevlmu/HomePage.svg?style=flat-square
[issues-url]: https://github.com/cubevlmu/HomePage/issues
[license-shield]: https://img.shields.io/github/license/cubevlmu/HomePage.svg?style=flat-square
[license-url]: ./LICENSE
