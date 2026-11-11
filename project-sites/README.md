# Astro project sites inside HomePage

The legacy personal homepage stays a Vue 3 application at `/`, with legacy project detail routes at `/p/:slug`. Each project marketing site is a standalone, prerendered Astro section at `/<slug>/`.

## Routes

- /rhodium/ (Simplified Chinese)
- /rhodium/en/ (English)
- /rhodium/features/ and /rhodium/en/features/
- /rhodium/guide/ and /rhodium/en/guide/
- /rhodium/reference/ and /rhodium/en/reference/

## Add a new project

1. Add a new project entry in `src/lib/catalog.ts`; both `zh` and `en` translations and the four section collections are currently required. The route generator uses the registry, not hardcoded Astro pages.
2. Generalize the default Rhodium-specific showcase graphic and SoftwareApplication schema fields in `src/layouts/ProjectLayout.astro` to match the new project's type.
3. Provide project-specific copy in `src/components/ProjectPage.astro` when the project needs a different workflow or documentation example.
4. Add an internal HTML link from the Vue homepage to the actual Astro landing page, not only the legacy /p/:slug route.
5. Run `npm install` and `npm run build` from the repository root; publish the root `dist/` folder.

## SEO

- Static HTML, per-page title/description, self-canonical, Open Graph, Twitter metadata, JSON-LD, bidirectional `hreflang`.
- `@astrojs/sitemap` writes `sitemap-index.xml` and referenced sub-sitemaps.
- `robots.txt` generated at build time.
- Set `SITE_ORIGIN` to the actual, canonical production domain before building. The default is `https://cubevlmu.site`; avoid canonicalizing to a non-deployed hostname.
- Project content changes require rebuilding the Astro site. Existing Vue `public/data` remains runtime-loaded.

Do not add blanket `noindex` directives, redirect project paths to the Vue SPA, or duplicate the same content on two canonical URLs.

For production: upload the merged root `dist/` directory. Static hosts must prioritize existing Astro files/directories ahead of SPA fallback. Search indexing is controlled by the search engines, not guaranteed by a build.
