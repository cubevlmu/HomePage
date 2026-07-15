# HomePage

A compact, bilingual personal homepage and project showcase built with Vue 3, Vite, TypeScript and Tailwind CSS. Site content, translations, projects, Markdown and colors are loaded from `public/data/` at runtime.

[简体中文](README.zh-CN.md) · [Documentation](doc/README.md) · [MIT License](LICENSE)

## Features

- Single-page homepage with scroll navigation and active-section highlighting.
- Project detail routes at `/p/<slug>`.
- Responsive project pagination and mobile project-information drawer.
- Locale detection, locale combobox and configurable fallback order.
- Runtime JSON/Markdown content that can be updated after deployment.
- Relative image paths in homepage and project Markdown.
- Runtime color themes powered by Tailwind CSS and CSS variables.
- Static-hosting rules for Apache, Netlify and Cloudflare Pages.

## Quick start

Requirements: Node.js 20+ and npm 10+ are recommended.

```bash
git clone https://github.com/cubevlmu/HomePage.git
cd HomePage
npm install
npm run dev
```

Production build:

```bash
npm run build
```

Upload the contents of `dist/` to the web root. Because this is a history-mode SPA, the server must fall back unknown routes to `index.html`; otherwise direct access to `/p/<slug>` will return 404. See [the deployment guide](doc/deployment.md).

## Customize the site

The editable package is under `public/data/`:

```text
public/data/
├── manifest.json       # locale files, fallbacks and external links
├── data.json           # language-neutral profile and display settings
├── color.json          # active color palette
├── data_en.json        # English content and UI labels
├── data_cn.json        # Simplified Chinese content and UI labels
├── project.json        # project index and translated project metadata
├── home/               # optional homepage Markdown sections
├── profile/            # profile assets
└── projects/<slug>/    # project Markdown, covers, logos and images
```

Vite copies this directory to `dist/data/`. A deployed site's JSON, Markdown and media can therefore be changed without rebuilding the frontend.

Detailed configuration is documented in:

- [Runtime data and localization](doc/data.md)
- [Color schemes](doc/color-schemes.md)
- [Static deployment and route fallback](doc/deployment.md)

## Project structure

```text
src/
├── components/     # shared UI, layout, homepage and project components
├── composables/    # navigation and scroll behavior
├── data/           # runtime loading and presentation adapters
├── types/          # TypeScript data contracts
├── utils/          # asset and Markdown helpers
└── views/          # homepage, project detail and 404 views
```

The frontend contains presentation and validation logic only. Personal content should stay in `public/data/`, not in Vue components.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Type-check and build the production site |
| `npm run preview` | Preview an existing production build |

## License

Source code is available under the [MIT License](LICENSE). Replace the included personal text and media before publishing a fork as your own site.
