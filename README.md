<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/cubevlmu/HomePage/">
    <img src="./public/favicon.svg" alt="HomePage Logo" width="80" height="80">
  </a>

  <h3 align="center">HomePage</h3>

  <p align="center">
    A bilingual personal homepage and project showcase built with Vue 3, Vite, and TypeScript.
    It presents profile content, project data, markdown-based project notes, and a lightweight content-driven structure.
    This project was designed and iterated with assistance from OpenAI Codex.
    <br />
    <br />
    <a href="./README.zh-CN.md">
      <img src="./public/favicon.svg" alt="Chinese README" width="16" height="16">
      中文说明
    </a>
  </p>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
</p>

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Features](#features)
- [Directory Structure](#directory-structure)
- [Architecture](#architecture)
- [Content System](#content-system)
- [Deployment](#deployment)
- [Built With](#built-with)
- [Contributing](#contributing)
  - [How to Contribute](#how-to-contribute)
- [Versioning](#versioning)
- [Authors](#authors)
- [License](#license)
- [Acknowledgements](#acknowledgements)

---

### Getting Started

HomePage is a Vue-based personal site focused on project presentation and simple content maintenance.
It supports English by default, optional Chinese switching, project detail pages, markdown rendering, and asset-driven project content.

#### Prerequisites

- Node.js 20 or newer recommended
- npm 10 or newer recommended

#### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/cubevlmu/HomePage.git
   cd HomePage
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Start the development server:

   ```sh
   npm run dev
   ```

4. Build for production:

   ```sh
   npm run build
   ```

---

### Features

- English-first UI with Chinese language switching
- Data-driven site content under `src/resources/`
- Data-driven project content under `src/content/projects/`
- Markdown-based project detail pages
- Local asset resolution for `logo`, `cover`, and `snapshot`
- Responsive layout with project cards, detail pages, and contact section
- Lightweight mailto-based contact form

---

### Directory Structure

```text
home_page/
├── doc/                         # Templates and documentation for content/data setup
├── public/                      # Static assets such as favicon, icons, and images
│   ├── favicon.svg
│   ├── icons.svg
│   └── images/
├── src/
│   ├── components/              # Reusable Vue components
│   │   ├── common/
│   │   ├── layout/
│   │   └── sections/
│   ├── content/
│   │   └── projects/            # Per-project meta.json, content.md, logos, covers, snapshots
│   ├── data/                    # Computed content adapters for resources and projects
│   ├── resources/               # Site-level JSON content
│   ├── router/                  # Vue Router definitions
│   ├── types/                   # TypeScript type definitions
│   ├── utils/                   # Utilities such as markdown helpers
│   ├── views/                   # Route-level pages
│   ├── App.vue
│   ├── main.ts
│   └── style.css
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

### Architecture

HomePage is organized around a small content pipeline:

- `src/resources/`
  Provides localized JSON content for site-wide sections such as hero, navigation, about, contact, footer, and UI labels.

- `src/data/`
  Transforms static JSON and project files into typed, reactive view models for the app.

- `src/content/projects/`
  Stores each project as a folder containing `meta.json`, `content.md`, and optional assets.

- `src/views/` and `src/components/`
  Keep route-level screens and reusable UI blocks separate, making the site easier to extend.

---

### Content System

Project pages are data-driven.

Each project lives under:

```text
src/content/projects/<slug>/
  meta.json
  content.md
  logo.*
  cover.*
  snapshot.*
```

Behavior:

- `logo`
  Used in project cards and the detail header

- `cover`
  Used in the project detail hero visual area

- `snapshot.*`
  Used as the hero cover fallback when `cover` is not configured

- `screenshots`
  Rendered only when explicitly defined in `meta.json`

Documentation and templates are available in:

- [`doc/data-driven-projects.md`](./doc/data-driven-projects.md)
- [`doc/project-meta.template.json`](./doc/project-meta.template.json)
- [`doc/project-content.template.md`](./doc/project-content.template.md)

---

### Deployment

HomePage is a static frontend and can be deployed to any platform that serves built files.

A basic deployment flow:

1. Install dependencies
2. Run the production build
3. Deploy the generated `dist/` directory

Example:

```sh
npm install
npm run build
```

Then publish `dist/` to your static hosting provider.

---

### Built With

- [Vue 3](https://vuejs.org/) - UI framework
- [Vite](https://vite.dev/) - Build tool and dev server
- [TypeScript](https://www.typescriptlang.org/) - Type-safe application code
- [Vue Router](https://router.vuejs.org/) - Client-side routing
- [Markdown-It](https://github.com/markdown-it/markdown-it) - Markdown rendering
- [Font Awesome](https://fontawesome.com/) - Icon system

---

### Contributing

Contributions are welcome, especially around layout polish, accessibility, content tooling, and project data workflows.

#### How to Contribute

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

### Versioning

This project uses Git for version control.
Check repository history and tags for version information when available.

---

### Authors

- Cubevlmu - [GitHub](https://github.com/cubevlmu)
- OpenAI Codex - implementation assistance and iteration support

See also the list of [contributors][contributors-url] who participated in this project.

---

### License

No license file is currently included in this repository.
If you plan to publish or open-source the project, add a `LICENSE` file and update this section.

---

### Acknowledgements

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
