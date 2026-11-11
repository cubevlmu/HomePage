import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'

const site = (process.env.SITE_ORIGIN || 'https://flybugs.ink').replace(/\/+$/, '')

export default defineConfig({
  site,
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [sitemap({ customPages: [site + '/'] })],
})
