import type { Project, ProjectLinkKey } from '../types/project'
import type { ProjectFieldId } from '../types/runtime-data'

type ProjectLabels = Record<string, string>

const fieldValue: Record<ProjectFieldId, (project: Project) => string | undefined> = {
  status: (project) => project.status,
  year: (project) => project.year,
  platforms: (project) => project.platforms.join(' / '),
  release: (project) => project.metadata.release,
  license: (project) => project.metadata.license,
  repository: (project) => project.metadata.repository,
  startedAt: (project) => project.metadata.startedAt,
  updatedAt: (project) => project.metadata.updatedAt,
}

const fieldLabel: Record<ProjectFieldId, string> = {
  status: 'statusLabel',
  year: 'yearLabel',
  platforms: 'platformLabel',
  release: 'releaseLabel',
  license: 'licenseLabel',
  repository: 'repositoryLabel',
  startedAt: 'startedAtLabel',
  updatedAt: 'updatedAtLabel',
}

export const getProjectLinks = (project: Project, labels: ProjectLabels, limit?: number) => {
  const links = Object.entries(project.links)
    .filter((entry): entry is [ProjectLinkKey, string] => Boolean(entry[1]))
    .map(([key, href]) => ({
      key,
      href,
      label: labels[key] ?? key,
      external: /^(?:https?:)?\/\//i.test(href),
    }))

  return typeof limit === 'number' ? links.slice(0, limit) : links
}

export const getProjectFields = (
  project: Project,
  fields: ProjectFieldId[],
  labels: ProjectLabels,
  showEmpty = false,
) =>
  fields.flatMap((field) => {
    const value = fieldValue[field](project)

    return value || showEmpty
      ? [{ id: field, label: labels[fieldLabel[field]] ?? field, value: value || '-' }]
      : []
  })
