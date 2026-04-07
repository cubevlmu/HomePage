<script setup lang="ts">
import { computed } from 'vue'
import { localizeText, useLocalizedText } from '../../data/localize'
import type { Project, ProjectLinkKey } from '../../types/project'
import uiResource from '../../resources/ui.json'
import AppLink from './AppLink.vue'
import BaseCard from './BaseCard.vue'

const props = defineProps<{
  project: Project
  size: 'featured' | 'compact'
}>()

const detailLabel = useLocalizedText(uiResource.projectCard.detailLabel)

const linkLabelMap = {
  github: uiResource.projectLinks.github,
  demo: uiResource.projectLinks.demo,
  blog: uiResource.projectLinks.blog,
  download: uiResource.projectLinks.download,
  docs: uiResource.projectLinks.docs,
} as const

const links = computed(() =>
  Object.entries(props.project.links)
    .filter((entry): entry is [ProjectLinkKey, string] => Boolean(entry[1]))
    .slice(0, 2)
    .map(([key, href]) => ({
      key,
      href,
      label: localizeText(linkLabelMap[key]),
      external: href.startsWith('http'),
    })),
)
</script>

<template>
  <BaseCard :class-name="`project-card project-card--${size}`">
    <div class="project-card__glow"></div>
    <div class="project-card__body">
      <div class="project-card__meta">
        <span class="status-pill">{{ project.status }}</span>
        <span class="project-year">{{ project.year }}</span>
      </div>
      <div class="project-card__header">
        <div v-if="project.logo" class="project-card__logo-wrap">
          <img class="project-card__logo" :src="project.logo" :alt="`${project.name} logo`" />
        </div>
        <div v-else class="project-card__logo-wrap project-card__logo-wrap--fallback">
          <span>{{ project.name.slice(0, 2) }}</span>
        </div>
        <div class="project-card__title-group">
          <h3>{{ project.name }}</h3>
          <p class="project-year">{{ project.subtitle }}</p>
        </div>
      </div>
      <p class="project-summary">{{ project.summary }}</p>
      <p class="project-description">{{ project.description }}</p>
      <div class="tag-row">
        <span v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</span>
      </div>
      <div class="project-links">
        <AppLink class="project-link" :to="`/projects/${project.slug}`">{{ detailLabel }}</AppLink>
        <AppLink v-for="link in links" :key="link.key" class="project-link" :to="link.href" :external="link.external">
          {{ link.label }}
        </AppLink>
      </div>
    </div>
  </BaseCard>
</template>
