import type { AboutConfig } from './about'
import type { ContactConfig } from './contact'
import type { FooterConfig } from './footer'
import type { HeroConfig } from './hero'
import type { NavigationConfig } from './navigation'
import type { ProjectAuthor, ProjectLinks, ProjectMetadata, ProjectScreenshot } from './project'

export type LocaleManifestEntry = {
  locale: string
  label: string
  file: string
  aliases?: string[]
}

export type ManifestLink = {
  id: string
  href: string
  value?: string
  icon: string
  external?: boolean
  showInContact?: boolean
  labels: Record<string, string>
}

export type DataManifest = {
  version: number
  base: string
  color: string
  projects: string
  defaultLocale: string
  locales: LocaleManifestEntry[]
  links: ManifestLink[]
}

export type ThemeConfig = {
  name: string
  background: string
  surface: string
  surfaceElevated: string
  brand: string
  brandLight: string
  accent: string
}

export type HomeStatId = 'projects' | 'technologies' | 'featured'

export type ProjectFieldId =
  | 'status'
  | 'year'
  | 'platforms'
  | 'release'
  | 'license'
  | 'repository'
  | 'startedAt'
  | 'updatedAt'

export type DisplayConfig = {
  sections: {
    about: boolean
    projects: boolean
    contact: boolean
  }
  homeStats: HomeStatId[]
  projectPageSize: number
  projectOverview: ProjectFieldId[]
  projectMetadata: ProjectFieldId[]
  backToTopThreshold: number
}

export type BaseData = {
  profile: {
    login: string
    displayName: string
    avatar: string
    showAvatar: boolean
    profileUrl: string
    company: string
  }
  seo: {
    titleSeparator: string
  }
  display: DisplayConfig
}

export type UiConfig = {
  appHeader: Record<string, string>
  appFooter: Record<string, string>
  projectCard: Record<string, string>
  projectSection: Record<string, string>
  contactSection: Record<string, string>
  homeView: Record<string, string>
  projectDetailView: Record<string, string>
  notFoundView: Record<string, string>
  projectLinks: Record<string, string>
}

export type HomeMarkdownSection = {
  id: string
  eyebrow: string
  title: string
  description: string
  source: string
  content?: string
  contentBase?: string
}

export type LocaleData = {
  locale: string
  site: {
    title: string
    description: string
    language: string
    role: string
    bio: string
  }
  hero: HeroConfig
  markdownSections: HomeMarkdownSection[]
  about: AboutConfig
  projects: Omit<import('./project').ProjectCollection, 'items'>
  contact: ContactConfig
  footer: FooterConfig
  navigation: NavigationConfig
  ui: UiConfig
}

export type LocalizedProjectData = {
  name: string
  subtitle: string
  summary: string
  description: string
  status: string
  authors: ProjectAuthor[]
  screenshots: ProjectScreenshot[]
  content: string
}

export type ProjectIndexEntry = {
  id: string
  slug: string
  cover?: string
  logo?: string
  themeColor?: string
  year: string
  platforms: string[]
  tags: string[]
  techStack: string[]
  links: ProjectLinks
  metadata: ProjectMetadata
  toc?: boolean
  featured?: boolean
  locales: Record<string, LocalizedProjectData>
}

export type ProjectIndex = {
  projects: ProjectIndexEntry[]
}
