<script setup lang="ts">
import { computed } from 'vue'
import type { ProjectCollection } from '../../types/project'
import ProjectCard from '../common/ProjectCard.vue'
import SectionHeader from '../common/SectionHeader.vue'

const props = defineProps<{
  config: ProjectCollection
  featuredOnly?: boolean
}>()

const projectGroups = computed(() => {
  const featured = []
  const more = []

  for (const project of props.config.items) {
    if (project.featured) {
      featured.push(project)
    } else {
      more.push(project)
    }
  }

  return { featured, more }
})
</script>

<template>
  <section class="content-section" id="projects">
    <SectionHeader
      :eyebrow="config.eyebrow"
      :title="config.title"
      :description="config.description"
    />
    <div class="featured-grid">
      <ProjectCard v-for="project in projectGroups.featured" :key="project.name" :project="project" size="featured" />
    </div>
    <div v-if="!featuredOnly" class="project-grid">
      <ProjectCard v-for="project in projectGroups.more" :key="project.name" :project="project" size="compact" />
    </div>
  </section>
</template>
