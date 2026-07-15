import { computed, readonly, ref } from 'vue'
import type { Project } from '../types/project'
import type {
  BaseData,
  DataManifest,
  LocaleData,
  LocaleManifestEntry,
  ManifestLink,
  ProjectIndex,
  ProjectIndexEntry,
  ThemeConfig,
} from '../types/runtime-data'
import { resolvePublicAsset } from '../utils/assets'

const STORAGE_KEY = 'home-page-locale'

const manifestState = ref<DataManifest | null>(null)
const baseDataState = ref<BaseData | null>(null)
const localeDataState = ref<LocaleData | null>(null)
const projectIndexState = ref<ProjectIndex | null>(null)
const projectsState = ref<Project[]>([])
const localeState = ref('en')

const dataUrl = (path: string) => resolvePublicAsset(`/data/${path.replace(/^\/+/, '')}`)
const contentBaseUrl = (path: string) => dataUrl(path.replace(/[^/]*$/, ''))

const fetchText = async (path: string, label: string) => {
  const response = await fetch(dataUrl(path), { cache: 'no-cache' })

  if (!response.ok) throw new Error(`Unable to load ${label} ${path}: ${response.status}`)
  return response.text()
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

const requireString = (value: unknown, field: string) => {
  if (typeof value !== 'string' || !value.trim()) {
    throw new Error(`Invalid runtime data: "${field}" must be a non-empty string.`)
  }

  return value
}

const requireStringArray = (value: unknown, field: string, allowed: readonly string[]) => {
  if (!Array.isArray(value) || value.some((item) => typeof item !== 'string' || !allowed.includes(item))) {
    throw new Error(`Invalid runtime data: "${field}" contains an unsupported value.`)
  }
}

const validateManifest = (value: unknown): DataManifest => {
  if (!isRecord(value) || !Array.isArray(value.locales) || !value.locales.length || !Array.isArray(value.links)) {
    throw new Error('Invalid manifest.json: locales and links must be arrays, and at least one locale is required.')
  }

  requireString(value.base, 'manifest.base')
  requireString(value.color, 'manifest.color')
  requireString(value.projects, 'manifest.projects')
  requireString(value.defaultLocale, 'manifest.defaultLocale')

  const localeIds = value.locales.map((entry, index) => {
    if (!isRecord(entry)) throw new Error(`Invalid manifest locale at index ${index}.`)
    requireString(entry.locale, `manifest.locales[${index}].locale`)
    requireString(entry.label, `manifest.locales[${index}].label`)
    requireString(entry.file, `manifest.locales[${index}].file`)
    return entry.locale as string
  })

  if (new Set(localeIds).size !== localeIds.length) {
    throw new Error('Invalid manifest.json: locale identifiers must be unique.')
  }

  for (const [index, link] of value.links.entries()) {
    if (!isRecord(link) || !isRecord(link.labels)) {
      throw new Error(`Invalid manifest link at index ${index}.`)
    }

    requireString(link.id, `manifest.links[${index}].id`)
    requireString(link.href, `manifest.links[${index}].href`)
    requireString(link.icon, `manifest.links[${index}].icon`)
  }

  return value as unknown as DataManifest
}

const validateBaseData = (value: unknown): BaseData => {
  if (!isRecord(value) || !isRecord(value.profile) || !isRecord(value.seo) || !isRecord(value.display)) {
    throw new Error('Invalid data.json: profile, seo, and display objects are required.')
  }

  for (const field of ['login', 'displayName', 'avatar', 'profileUrl', 'company'] as const) {
    requireString(value.profile[field], `profile.${field}`)
  }

  if (typeof value.profile.showAvatar !== 'boolean') {
    throw new Error('Invalid data.json: profile.showAvatar must be a boolean.')
  }

  requireString(value.seo.titleSeparator, 'seo.titleSeparator')

  if (
    !isRecord(value.display.sections) ||
    typeof value.display.backToTopThreshold !== 'number' ||
    value.display.backToTopThreshold < 0 ||
    typeof value.display.projectPageSize !== 'number' ||
    !Number.isInteger(value.display.projectPageSize) ||
    value.display.projectPageSize < 1
  ) {
    throw new Error('Invalid data.json: display configuration is incomplete.')
  }

  requireStringArray(value.display.homeStats, 'display.homeStats', ['projects', 'technologies', 'featured'])
  requireStringArray(value.display.projectOverview, 'display.projectOverview', [
    'status', 'year', 'platforms', 'release', 'license', 'repository', 'startedAt', 'updatedAt',
  ])
  requireStringArray(value.display.projectMetadata, 'display.projectMetadata', [
    'status', 'year', 'platforms', 'release', 'license', 'repository', 'startedAt', 'updatedAt',
  ])

  for (const section of ['about', 'projects', 'contact'] as const) {
    if (typeof value.display.sections[section] !== 'boolean') {
      throw new Error(`Invalid data.json: display.sections.${section} must be a boolean.`)
    }
  }

  return value as unknown as BaseData
}

const validateTheme = (value: unknown): ThemeConfig => {
  if (!isRecord(value)) throw new Error('Invalid color.json: a color object is required.')

  for (const field of ['name', 'background', 'surface', 'surfaceElevated', 'brand', 'brandLight', 'accent'] as const) {
    requireString(value[field], `color.${field}`)
  }

  return value as unknown as ThemeConfig
}

const validateLocaleData = (value: unknown, file: string): LocaleData => {
  if (!isRecord(value)) throw new Error(`Invalid locale data: ${file} must contain an object.`)

  requireString(value.locale, `${file}.locale`)

  for (const section of ['site', 'hero', 'about', 'projects', 'contact', 'footer', 'navigation', 'ui'] as const) {
    if (!isRecord(value[section])) {
      throw new Error(`Invalid locale data: ${file}.${section} must be an object.`)
    }
  }

  if (!Array.isArray(value.markdownSections)) {
    throw new Error(`Invalid locale data: ${file}.markdownSections must be an array.`)
  }

  const markdownSectionIds = value.markdownSections.map((section, index) => {
    if (!isRecord(section)) throw new Error(`Invalid Markdown section at ${file}.markdownSections[${index}].`)

    for (const field of ['id', 'eyebrow', 'title', 'description', 'source'] as const) {
      requireString(section[field], `${file}.markdownSections[${index}].${field}`)
    }

    return section.id as string
  })

  if (new Set(markdownSectionIds).size !== markdownSectionIds.length) {
    throw new Error(`Invalid locale data: ${file}.markdownSections ids must be unique.`)
  }

  return value as unknown as LocaleData
}

const loadHomeMarkdownSections = async (data: LocaleData): Promise<LocaleData> => ({
  ...data,
  markdownSections: await Promise.all(
    data.markdownSections.map(async (section) => ({
      ...section,
      content: await fetchText(section.source, 'homepage content'),
      contentBase: contentBaseUrl(section.source),
    })),
  ),
})

const validateProjectIndex = (value: unknown): ProjectIndex => {
  if (!isRecord(value) || !Array.isArray(value.projects)) {
    throw new Error('Invalid project.json: projects must be an array.')
  }

  const slugs = value.projects.map((entry, index) => {
    if (!isRecord(entry) || !isRecord(entry.locales)) {
      throw new Error(`Invalid project.json entry at index ${index}.`)
    }

    const slug = requireString(entry.slug, `projects[${index}].slug`)
    const id = requireString(entry.id, `projects[${index}].id`)

    if (id !== slug) {
      throw new Error(`Invalid project.json: project id "${id}" must match slug "${slug}".`)
    }

    const localeEntries = Object.entries(entry.locales)
    if (!localeEntries.length) throw new Error(`Project "${slug}" must define at least one locale.`)

    for (const [localeId, localized] of localeEntries) {
      if (!isRecord(localized)) throw new Error(`Project "${slug}" locale "${localeId}" must be an object.`)
      requireString(localized.name, `${slug}.${localeId}.name`)
      requireString(localized.content, `${slug}.${localeId}.content`)
    }

    return slug
  })

  if (new Set(slugs).size !== slugs.length) {
    throw new Error('Invalid project.json: project slugs must be unique.')
  }

  return value as unknown as ProjectIndex
}

const fetchJson = async <T>(path: string): Promise<T> => {
  const response = await fetch(dataUrl(path), { cache: 'no-cache' })

  if (!response.ok) {
    throw new Error(`Unable to load ${path}: ${response.status} ${response.statusText}`)
  }

  return (await response.json()) as T
}

const normalizeLocale = (value: string) => value.trim().toLowerCase().replace('_', '-')

const localeMatches = (entry: LocaleManifestEntry, requestedLocale: string) => {
  const requested = normalizeLocale(requestedLocale)
  const candidates = [entry.locale, ...(entry.aliases ?? [])].map(normalizeLocale)

  return candidates.some((candidate) => requested === candidate || requested.startsWith(`${candidate}-`))
}

const findLocale = (manifest: DataManifest, requestedLocales: string[]) => {
  for (const requestedLocale of requestedLocales) {
    const match = manifest.locales.find((entry) => localeMatches(entry, requestedLocale))

    if (match) {
      return match
    }
  }

  return (
    manifest.locales.find((entry) => localeMatches(entry, 'en')) ??
    manifest.locales[0]
  )
}

const localeFallbacks = (manifest: DataManifest, requestedLocale: string) => {
  const candidates = [
    manifest.locales.find((entry) => localeMatches(entry, requestedLocale)),
    manifest.locales.find((entry) => localeMatches(entry, 'en')),
    ...manifest.locales,
  ].filter((entry): entry is LocaleManifestEntry => Boolean(entry))

  return candidates.filter(
    (entry, index, entries) => entries.findIndex((candidate) => candidate.locale === entry.locale) === index,
  )
}

const projectLocaleData = (project: ProjectIndexEntry, localeEntry: LocaleManifestEntry, manifest: DataManifest) => {
  const localeCandidates = [
    localeEntry.locale,
    ...(localeEntry.aliases ?? []),
    'en',
    manifest.defaultLocale,
    ...manifest.locales.map((entry) => entry.locale),
  ]

  for (const locale of localeCandidates) {
    const exact = project.locales[locale]

    if (exact) {
      return exact
    }

    const normalized = normalizeLocale(locale)
    const matchingKey = Object.keys(project.locales).find((key) => normalizeLocale(key) === normalized)

    if (matchingKey) {
      return project.locales[matchingKey]
    }
  }

  return Object.values(project.locales)[0]
}

const resolveProjectAsset = (project: ProjectIndexEntry, path?: string) => {
  if (!path) {
    return ''
  }

  if (/^(?:[a-z]+:)?\/\//i.test(path) || path.startsWith('/')) {
    return path.startsWith('/') ? resolvePublicAsset(path) : path
  }

  return dataUrl(`projects/${project.slug}/${path}`)
}

const loadProjects = async (localeEntry: LocaleManifestEntry) => {
  const manifest = requireManifest()
  const projectIndex = requireProjectIndex()
  const projects = await Promise.all(
    projectIndex.projects.map(async (entry) => {
      const localized = projectLocaleData(entry, localeEntry, manifest)

      if (!localized) {
        throw new Error(`Project "${entry.slug}" has no localized data.`)
      }

      return {
        ...entry,
        ...localized,
        cover: resolveProjectAsset(entry, entry.cover),
        logo: resolveProjectAsset(entry, entry.logo),
        screenshots: localized.screenshots.map((screenshot) => ({
          ...screenshot,
          src: resolveProjectAsset(entry, screenshot.src),
        })),
        content: await fetchText(localized.content, 'project content'),
        contentBase: contentBaseUrl(localized.content),
        locales: undefined,
      } as Project
    }),
  )

  projectsState.value = projects.sort(
    (left, right) => Number(right.featured ?? false) - Number(left.featured ?? false) || right.year.localeCompare(left.year),
  )
}

const applyTheme = (theme: ThemeConfig) => {
  const root = document.documentElement
  root.style.setProperty('--color-surface', theme.surface)
  root.style.setProperty('--color-surface-elevated', theme.surfaceElevated)
  root.style.setProperty('--color-brand', theme.brand)
  root.style.setProperty('--color-brand-light', theme.brandLight)
  root.style.setProperty('--color-accent', theme.accent)
  root.style.setProperty('--site-background', theme.background)

  const themeColor = document.head.querySelector<HTMLMetaElement>('meta[name="theme-color"]')
  if (themeColor) themeColor.content = theme.background
}

const applyLocale = (entry: LocaleManifestEntry) => {
  localeState.value = entry.locale
  document.documentElement.lang = entry.locale
  window.localStorage.setItem(STORAGE_KEY, entry.locale)
}

export const loadLocale = async (requestedLocale: string) => {
  const manifest = requireManifest()
  const entries = localeFallbacks(manifest, requestedLocale)
  let lastError: unknown

  for (const entry of entries) {
    try {
      const localeData = validateLocaleData(await fetchJson<unknown>(entry.file), entry.file)
      localeDataState.value = await loadHomeMarkdownSections(localeData)
      applyLocale(entry)
      await loadProjects(entry)
      return
    } catch (error) {
      lastError = error
    }
  }

  throw lastError ?? new Error('manifest.json does not define any usable locales.')
}

export const loadRuntimeData = async () => {
  const manifest = validateManifest(await fetchJson<unknown>('manifest.json'))
  manifestState.value = manifest

  const [baseData, theme, projectIndex] = await Promise.all([
    fetchJson<unknown>(manifest.base).then(validateBaseData),
    fetchJson<unknown>(manifest.color).then(validateTheme),
    fetchJson<unknown>(manifest.projects).then(validateProjectIndex),
  ])
  baseDataState.value = baseData
  projectIndexState.value = projectIndex
  applyTheme(theme)

  const storedLocale = window.localStorage.getItem(STORAGE_KEY)
  const browserLocales = navigator.languages?.length ? [...navigator.languages] : [navigator.language]
  const entry = findLocale(manifest, [...(storedLocale ? [storedLocale] : []), ...browserLocales])

  if (!entry) {
    throw new Error('manifest.json does not define any locales.')
  }

  await loadLocale(entry.locale)
}

export const requireManifest = () => {
  if (!manifestState.value) throw new Error('Runtime manifest has not been loaded.')
  return manifestState.value
}

export const requireBaseData = () => {
  if (!baseDataState.value) throw new Error('Base data has not been loaded.')
  return baseDataState.value
}

export const requireLocaleData = () => {
  if (!localeDataState.value) throw new Error('Locale data has not been loaded.')
  return localeDataState.value
}

export const requireProjectIndex = () => {
  if (!projectIndexState.value) throw new Error('Project index has not been loaded.')
  return projectIndexState.value
}

export const locale = readonly(localeState)
export const availableLocales = computed(() => manifestState.value?.locales ?? [])
export const projects = readonly(projectsState)
export const manifestLinks = computed<ManifestLink[]>(() => manifestState.value?.links ?? [])
export const baseConfig = computed(() => requireBaseData())
export const displayConfig = computed(() => requireBaseData().display)

export const localizedManifestLinks = computed(() =>
  manifestLinks.value.map((link) => ({
    ...link,
    label:
      link.labels[localeState.value] ??
      link.labels.en ??
      Object.values(link.labels)[0] ??
      link.id,
  })),
)
