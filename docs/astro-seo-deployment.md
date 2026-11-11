# Static project sites: deployment and SEO

## Architecture

- Existing Vue personal homepage: `/`, `/p/:slug`; existing runtime assets `/data/*` are untouched.
- New Astro projects: `/<project>/` and their own nested section routes.
- `npm run build` builds Vue and Astro independently and merges `project-sites/dist` into root `dist`.
- Publish **root `dist/`**, not `project-sites/dist/`. Normal Vite SPA fallbacks must only run when a path does not resolve to a built file or directory.

## Before deploying

1. Node.js >= 22.12; run `npm install` from root to install workspace packages.
2. Set `SITE_ORIGIN=https://your-real-domain.example`. Default in this experiment: `https://cubevlmu.site`.
3. Run `npm run build`.
4. Confirm `dist/index.html` (personal site), `dist/rhodium/index.html` and `dist/rhodium/en/index.html` contain real content and SEO metadata.
5. Confirm `dist/sitemap-index.xml`, `dist/robots.txt`, and `dist/project-assets/rhodium-icon.svg` exist.
6. Check canonical and hreflang URLs resolve to HTTP 200 in production without SPA HTML fallback.
7. Submit the sitemap in Google Search Console, Bing Webmaster Tools, and optionally Baidu.
8. Add prominent plain `<a href="/rhodium/">` links from personal home / project listing; project pages must be discoverable without JavaScript.

## Important remaining legacy limitation

The existing Vue landing page and legacy `/p/:slug` detail pages remain client-rendered and load a separate local `public/data` directory which is ignored from Git. This change does not claim that those pages are already statically generated or indexable without JS. Full Astro homepage migration requires access to deployed JSON assets and preserving the user's personal data configuration.

## Redirect configuration

Use existing `public/_redirects` or `public/.htaccess` SPA fallback only after the host serves existing directories. Verify that `GET /rhodium/` serves its own generated HTML, not `/index.html`. Avoid cache-mixing between project pages and root fallback.

## Extend to more projects

Add catalog entries, project-specific examples and layout metadata, generate static pages for each project, and link them from the root. Consider separate project components if copy/layout starts diverging significantly.
