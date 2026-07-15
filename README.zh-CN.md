# HomePage

一个紧凑、响应式的双语个人主页与项目展示站，使用 Vue 3、Vite、TypeScript 和 Tailwind CSS 构建。个人信息、翻译、项目、Markdown 与配色均从 `public/data/` 在运行时加载。

[English](README.md) · [使用文档](doc/README.md) · [MIT License](LICENSE)

## 功能

- 单页上下滚动，导航栏跟随当前板块高亮。
- 项目详情地址使用 `/p/<slug>`。
- 项目列表响应式分页，移动端项目页使用信息侧栏。
- 自动识别系统语言，并提供适合多语言扩展的下拉选择器和回退顺序。
- JSON 与 Markdown 数据运行时加载，部署后仍可直接更新内容。
- 首页和项目 Markdown 支持相对图片地址。
- 使用 Tailwind CSS 与 CSS 变量实现运行时换色。
- 内置 Apache、Netlify 和 Cloudflare Pages 的静态路由配置。

## 快速开始

推荐使用 Node.js 20+ 与 npm 10+。

```bash
git clone https://github.com/cubevlmu/HomePage.git
cd HomePage
npm install
npm run dev
```

生产构建：

```bash
npm run build
```

将 `dist/` 中的内容上传到网站根目录。项目使用 History 路由，服务器必须将不存在的路径回退到 `index.html`，否则直接打开 `/p/<slug>` 会返回 404。具体配置见[部署文档](doc/deployment.md)。

## 修改站点内容

可编辑的数据集中在 `public/data/`：

```text
public/data/
├── manifest.json       # 语言文件、回退规则和外部链接
├── data.json           # 与语言无关的个人资料和显示设置
├── color.json          # 当前使用的配色
├── data_en.json        # 英文内容和界面文案
├── data_cn.json        # 简体中文内容和界面文案
├── project.json        # 项目索引及项目翻译信息
├── home/               # 可选的首页 Markdown 板块
├── profile/            # 头像等个人资源
└── projects/<slug>/    # 项目 Markdown、封面、Logo 和图片
```

Vite 会将这个目录原样复制到 `dist/data/`。因此部署后可以继续修改 JSON、Markdown 和媒体文件，无需重新构建前端。

完整说明：

- [数据配置与多语言](doc/data.md)
- [配色方案](doc/color-schemes.md)
- [静态部署与路由回退](doc/deployment.md)

## 项目结构

```text
src/
├── components/     # 通用界面、布局、首页和项目组件
├── composables/    # 导航与滚动行为
├── data/           # 运行时数据加载与展示适配
├── types/          # TypeScript 数据结构
├── utils/          # 资源地址与 Markdown 工具
└── views/          # 首页、项目详情和 404 页面
```

前端源码只保留展示和数据校验逻辑，个人内容应放在 `public/data/`，不要写死在 Vue 组件中。

## 命令

| 命令 | 用途 |
| --- | --- |
| `npm run dev` | 启动 Vite 开发服务器 |
| `npm run build` | 类型检查并构建生产版本 |
| `npm run preview` | 预览已经生成的生产版本 |

## 许可证

源代码采用 [MIT License](LICENSE)。如果将本项目作为自己的主页发布，请先替换仓库中附带的个人文案与媒体资源。
