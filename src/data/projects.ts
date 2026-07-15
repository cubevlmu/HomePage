import { computed } from 'vue'
import type { ProjectCollection } from '../types/project'
import { projects, requireLocaleData } from './runtime'

export const projectCollection = computed<ProjectCollection>(() => ({
  ...requireLocaleData().projects,
  items: [...projects.value],
}))

export const getProjectBySlug = (slug: string) => projects.value.find((project) => project.slug === slug)

const countSharedValues = (left: string[], right: string[]) => {
  const rightValues = new Set(right.map((value) => value.toLowerCase()))
  return left.reduce((count, value) => count + Number(rightValues.has(value.toLowerCase())), 0)
}

export const getRelatedProjects = (slug: string, limit = 3) => {
  const currentProject = getProjectBySlug(slug)

  if (!currentProject) {
    return []
  }

  return projects.value
    .filter((project) => project.slug !== slug)
    .map((project) => ({
      project,
      score:
        countSharedValues(currentProject.tags, project.tags) * 3 +
        countSharedValues(currentProject.techStack, project.techStack) * 2 +
        countSharedValues(currentProject.platforms, project.platforms),
    }))
    .sort(
      (left, right) =>
        right.score - left.score ||
        Number(right.project.featured ?? false) - Number(left.project.featured ?? false) ||
        right.project.year.localeCompare(left.project.year),
    )
    .slice(0, limit)
    .map(({ project }) => project)
}
