# Runtime data package

The site loads its content from `data/` before Vue is mounted. Vite copies `public/data/` to `dist/data/` without bundling the JSON or Markdown into JavaScript, so deployed content can be edited without rebuilding the frontend.

## Files

```text
data/
├── manifest.json
├── data.json
├── color.json
├── data_en.json
├── data_cn.json
├── project.json
├── profile/
│   └── avatar.png
└── projects/
    └── <slug>/
        ├── content_en.md
        ├── content_cn.md
        └── images and logos
```

Homepage Markdown files can be stored under `data/home/`; project Markdown and its relative assets stay under the corresponding project directory.

## `manifest.json`

The manifest declares the base file, color file, project index, available locales, locale aliases, display order, and profile/contact links.

Locale selection follows this order:

1. A locale saved by the user.
2. `navigator.languages` from the browser/system.
3. English, when declared.
4. Each manifest locale from top to bottom.

If a locale file or its project Markdown cannot be loaded, the loader continues through the same fallback chain.

Links are configured only in the manifest. `labels` contains localized labels, while `showInContact` controls whether the link also appears in the contact section.

## `data.json`

Contains language-neutral profile, SEO, and display settings. Set `profile.showAvatar` to `false` to hide the avatar.

`display.sections` controls homepage section visibility. `homeStats`, `projectOverview`, and `projectMetadata` control which computed fields appear and in what order. `backToTopThreshold` controls when the floating button appears. `seo.titleSeparator` controls generated page titles.

`homeStats` accepts `projects`, `technologies`, and `featured`. Remove an item to hide it or reorder the array to change its position. Its translated label is configured under `ui.homeView` in each locale file.

`projectPageSize` controls how many project cards appear on each homepage project page. It must be an integer greater than zero.

## `color.json`

Contains the single active color scheme. Theme colors are applied through CSS variables at runtime. Alternative ready-to-copy palettes are documented in [`color-schemes.md`](color-schemes.md).

## `data_<locale>.json`

Each locale file contains one complete translated site document: metadata, introduction, about content, section headings, navigation, contact copy, footer, and UI labels. Adding a locale requires a new file and one manifest entry; no TypeScript change is needed.

`markdownSections` adds optional Markdown-powered blocks to the homepage. Each entry defines its section `id`, heading text, and `source` file. The blocks appear between Projects and Contact; add a matching navigation item when the block should be reachable from the header. An empty array disables all Markdown blocks for that locale.

## `project.json`

Each project keeps language-neutral fields at the project level and translated fields under `locales`. The `content` value points to a Markdown file relative to `data/`.

```json
{
  "slug": "example",
  "tags": ["Vue"],
  "locales": {
    "en": {
      "name": "Example",
      "content": "projects/example/content_en.md"
    },
    "zh-CN": {
      "name": "示例",
      "content": "projects/example/content_cn.md"
    }
  }
}
```

Project translations use the selected locale, then English, then the manifest order. Project assets referenced by filename are resolved relative to `data/projects/<slug>/`. Relative Markdown image paths are resolved from the directory containing that Markdown file, so `![Preview](images/preview.png)` works without an absolute URL.

## Editing deployed data

JSON and Markdown below `dist/data/` can be updated directly. Keep filenames and JSON structure valid, and configure the server to send JSON and Markdown as UTF-8. Browser caching for these files should be disabled or kept short; the loader already requests them with `cache: no-cache`.
