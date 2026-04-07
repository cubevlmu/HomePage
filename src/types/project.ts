export type ProjectLinkKey = 'github' | 'demo' | 'blog' | 'download' | 'docs'

export type ProjectLinks = Partial<Record<ProjectLinkKey, string>>

export type ProjectAuthor = {
  name: string
  role: string
}

export type ProjectScreenshot = {
  src: string
  title: string
  description: string
}

export type ProjectMetadata = {
  license?: string
  repository?: string
  release?: string
  startedAt?: string
  updatedAt?: string
}

export type Project = {
  id: string
  slug: string
  name: string
  subtitle: string
  summary: string
  description: string
  cover?: string
  logo?: string
  themeColor?: string
  status: string
  year: string
  platforms: string[]
  tags: string[]
  techStack: string[]
  links: ProjectLinks
  authors: ProjectAuthor[]
  highlights: string[]
  screenshots: ProjectScreenshot[]
  metadata: ProjectMetadata
  toc?: boolean
  featured?: boolean
  content: string
}

export type ProjectCollection = {
  eyebrow: string
  title: string
  description: string
  items: Project[]
}
