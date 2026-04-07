import { computed } from 'vue'
import type { Project, ProjectCollection } from '../types/project'
import projectsResource from '../resources/projects.json'
import { localizeText } from './localize'

const projectMetaModules = import.meta.glob('../content/projects/*/meta.json', {
  eager: true,
  import: 'default',
}) as Record<string, Omit<Project, 'content'>>

const projectContentModules = import.meta.glob('../content/projects/*/content.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>

const projectAssetModules = import.meta.glob('../content/projects/*/*.{png,jpg,jpeg,webp,svg,avif}', {
  eager: true,
  import: 'default',
}) as Record<string, string>

const getSlugFromPath = (path: string) => path.split('/').at(-2) ?? ''

const resolveProjectAsset = (slug: string, assetPath?: string) => {
  if (!assetPath) {
    return ''
  }

  if (/^(https?:)?\/\//.test(assetPath) || assetPath.startsWith('/')) {
    return assetPath
  }

  const normalizedPath = assetPath.replace(/^\.\//, '')
  const assetModulePath = `../content/projects/${slug}/${normalizedPath}`

  return projectAssetModules[assetModulePath] ?? assetPath
}

const resolveDefaultSnapshot = (slug: string) => {
  const snapshotNames = ['snapshot.png', 'snapshot.jpg', 'snapshot.jpeg', 'snapshot.webp', 'snapshot.svg', 'snapshot.avif']

  for (const snapshotName of snapshotNames) {
    const resolvedAsset = resolveProjectAsset(slug, snapshotName)

    if (resolvedAsset !== snapshotName) {
      return resolvedAsset
    }
  }

  return ''
}

const projectEntries = Object.entries(projectMetaModules)
  .map(([path, meta]) => {
    const slug = getSlugFromPath(path)
    const contentPath = `../content/projects/${slug}/content.md`
    const content = projectContentModules[contentPath] ?? ''
    const screenshots = meta.screenshots.map((shot) => ({
      ...shot,
      src: resolveProjectAsset(slug, shot.src),
    }))
    const defaultSnapshot = resolveDefaultSnapshot(slug)

    return {
      ...meta,
      cover: resolveProjectAsset(slug, meta.cover) || defaultSnapshot,
      logo: resolveProjectAsset(slug, meta.logo),
      screenshots,
      content,
    } satisfies Project
  })
  .sort((left, right) => Number(right.featured ?? false) - Number(left.featured ?? false) || right.year.localeCompare(left.year))

export const projectCollection = computed<ProjectCollection>(() => ({
  eyebrow: localizeText(projectsResource.eyebrow),
  title: localizeText(projectsResource.title),
  description: localizeText(projectsResource.description),
  items: projectEntries,
}))

export const getProjectBySlug = (slug: string) => projectEntries.find((project) => project.slug === slug)

export const getRelatedProjects = (slug: string, limit = 3) =>
  projectEntries.filter((project) => project.slug !== slug).slice(0, limit)
