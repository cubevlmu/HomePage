# Documentation

HomePage keeps site content separate from the Vue application. Start with the guide that matches the task:

- [Runtime data](data.md): edit profile information, translations, links, homepage Markdown, projects and media.
- [Color schemes](color-schemes.md): select or create a runtime color palette.
- [Deployment](deployment.md): deploy the SPA and configure direct access to `/p/<slug>` routes.

## Typical workflow

1. Install dependencies with `npm install`.
2. Edit content under `public/data/`.
3. Start the local development server with `npm run dev`.
4. Build with `npm run build` when ready to deploy.
5. Upload the contents of `dist/`, not the repository itself.
6. Configure the server's history fallback as described in [deployment.md](deployment.md).

After deployment, files under `dist/data/` may be updated without rebuilding the application. Keep the same filenames and valid JSON structure.

## Content ownership

The source code is released under the [MIT License](../LICENSE). Profile text, project descriptions, screenshots, logos and other site content may have separate ownership; replace the example content before publishing a fork as your own site.
