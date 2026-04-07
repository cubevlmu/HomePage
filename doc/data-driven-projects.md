# Data-Driven Projects

This site reads project data from `src/content/projects/<slug>/`.

Each project folder should contain:

```text
src/content/projects/<slug>/
  meta.json
  content.md
  logo.png | logo.jpg | logo.jpeg | logo.webp | logo.svg | logo.avif   (optional)
  cover.png | cover.jpg | cover.jpeg | cover.webp | cover.svg | cover.avif   (optional)
  snapshot.png | snapshot.jpg | snapshot.jpeg | snapshot.webp | snapshot.svg | snapshot.avif   (optional)
```

## Minimal flow

1. Create a new folder under `src/content/projects/`, for example `my-project`.
2. Copy the templates from:
   - `doc/project-meta.template.json`
   - `doc/project-content.template.md`
3. Rename them to:
   - `meta.json`
   - `content.md`
4. Add optional assets like `logo.*`, `cover.*`, `snapshot.*`.

## Asset rules

- `logo.*`
  Used in the project card and the project detail header.

- `cover.*`
  Used in the right-side hero cover area on the project detail page.

- `snapshot.*`
  Used as the hero cover fallback when `cover` is not configured in `meta.json`.

- `screenshots`
  Only images explicitly configured in `meta.json` -> `screenshots` will appear in the gallery section below.

## Path rules

In `meta.json`, local assets should be written as file names relative to the current project folder:

```json
{
  "logo": "logo.svg",
  "cover": "cover.png",
  "screenshots": [
    {
      "src": "shot-1.png",
      "title": "Home",
      "description": "Main screen"
    }
  ]
}
```

You can also use:

- absolute paths like `"/images/demo.png"`
- external URLs like `"https://example.com/demo.png"`

## Required fields

These fields should always be filled:

- `id`
- `slug`
- `name`
- `subtitle`
- `summary`
- `description`
- `status`
- `year`
- `platforms`
- `tags`
- `techStack`
- `links`
- `authors`
- `highlights`
- `screenshots`
- `metadata`
- `featured`

## Field notes

- `id`
  Stable internal id. Usually the same as `slug`.

- `slug`
  Used in the route: `/projects/<slug>`.

- `summary`
  Short summary shown in cards and key detail areas.

- `description`
  Slightly longer text for the list/detail view.

- `themeColor`
  Accent color for the detail page, for example `"#22C55E"`.

- `status`
  Free text. Keep it consistent, for example `development`, `active`, `archived`.

- `year`
  Used for sorting and display. Prefer a four-digit year like `"2026"`.

- `links`
  Supported keys:
  - `github`
  - `demo`
  - `blog`
  - `download`
  - `docs`

- `authors`
  Array of `{ "name": "...", "role": "..." }`.

- `highlights`
  Short bullet-style strings. Keep each item concise.

- `metadata`
  Optional keys:
  - `license`
  - `repository`
  - `release`
  - `startedAt`
  - `updatedAt`

- `toc`
  `true` enables the generated table of contents for `content.md`.

- `featured`
  `true` puts the project into the featured grid first.

## Example workflow

If you add:

```text
src/content/projects/example-app/
  meta.json
  content.md
  logo.svg
  snapshot.png
```

And in `meta.json` you set:

```json
{
  "logo": "logo.svg",
  "cover": ""
}
```

Then:

- the list card uses `logo.svg`
- the detail header uses `logo.svg`
- the detail hero cover uses `snapshot.png` because `cover` is empty

## Notes

- Keep JSON valid. No trailing commas.
- `content.md` is raw Markdown rendered on the detail page.
- If a project is missing assets, the UI falls back to text placeholders.
