# Static deployment

This project is a Vue single-page application that uses HTML5 history routing. Every route that is not a real file must fall back to `index.html`.

The landing page uses hash navigation (`/#about`, `/#projects`, and `/#contact`), while project details use clean routes such as `/p/starforum`. The history fallback is required for direct visits to project details and legacy redirects.

The production build includes:

- `.htaccess` for Apache servers with `mod_rewrite` enabled.
- `_redirects` for Netlify and Cloudflare Pages.

All editable site content is copied to `dist/data/`. JSON and Markdown in that directory can be updated after deployment without rebuilding JavaScript. Avoid long immutable cache headers for `data/`; hashed files under `assets/` can still use long-term caching.

## Nginx

Use the following rule inside the site's `server` block:

```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

When the site is hosted below a path such as `/homepage/`, build with the matching base and update the fallback path:

```powershell
$env:VITE_APP_BASE = "/homepage/"
npm run build
```

```nginx
location /homepage/ {
    try_files $uri $uri/ /homepage/index.html;
}
```

Do not open `dist/index.html` through `file://`; serve the `dist` directory over HTTP.
