import { cp, mkdir, readdir, readFile, writeFile } from 'node:fs/promises'
import { resolve, join } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const from = join(root, 'project-sites', 'dist')
const to = join(root, 'dist')

const projectPaths = await readdir(from, { withFileTypes: true })
const reserved = new Set(['index.html', 'assets', 'data', '_redirects', '.htaccess'])
for (const entry of projectPaths) {
  if (reserved.has(entry.name)) {
    throw new Error('Astro build conflicts with existing homepage path: ' + entry.name)
  }
}
await mkdir(to, { recursive: true })
for (const entry of projectPaths) {
  // The Vue build owns root and /p/; Astro owns only registered project paths
  // and explicitly named generated assets such as the sitemap.
  await cp(join(from, entry.name), join(to, entry.name), { recursive: true, force: false, errorOnExist: true })
}
const robotsPath = join(to, 'robots.txt')
const origin = (process.env.SITE_ORIGIN || 'https://flybugs.ink').replace(/\/+$/, '')
const robots = ['User-agent: *', 'Allow: /', '', 'Sitemap: ' + origin + '/sitemap-index.xml', ''].join('\n')
await writeFile(robotsPath, robots, 'utf8')
const required = ['rhodium/index.html', 'rhodium/en/index.html', 'rhodium/features/index.html', 'rhodium/guide/index.html', 'rhodium/reference/index.html', 'sitemap-index.xml']
for (const name of required) {
  await readFile(join(to, name))
}
console.log('Merged Astro project sites into dist/ without changing the Vue root route.')
