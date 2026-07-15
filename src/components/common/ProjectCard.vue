<script setup lang="ts">
import { computed } from 'vue'
import { uiConfig, useUiSection } from '../../data/localize'
import { getProjectLinks } from '../../data/project-presentation'
import type { Project } from '../../types/project'
import AppLink from './AppLink.vue'
import BaseCard from './BaseCard.vue'
import ProjectLogo from './ProjectLogo.vue'
import TagList from './TagList.vue'

const props = defineProps<{
  project: Project
  size: 'featured' | 'compact'
}>()

const ui = useUiSection('projectCard')
const links = computed(() => getProjectLinks(props.project, uiConfig.value.projectLinks, 2))
</script>

<template>
  <BaseCard
    class-name="group relative cursor-pointer overflow-hidden p-4 transition duration-300 hover:-translate-y-1 hover:border-brand/60 hover:bg-surface-elevated/80 sm:p-6"
    :class="size === 'featured' ? 'min-h-full' : ''"
  >
    <AppLink
      class="absolute inset-0 z-10 rounded-2xl focus-visible:ring-2 focus-visible:ring-brand-light focus-visible:outline-none"
      :to="`/p/${project.slug}`"
      :aria-label="`${ui.detailLabel}: ${project.name}`"
    />
    <div
      class="pointer-events-none absolute -top-24 -right-24 size-56 rounded-full bg-brand/15 blur-3xl transition group-hover:bg-brand/25"
    ></div>
    <div class="pointer-events-none relative z-20 flex h-full flex-col">
      <div class="flex items-center justify-between gap-4">
        <span class="rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 font-mono text-xs text-emerald-300">
          {{ project.status }}
        </span>
        <span class="font-mono text-xs text-slate-500">{{ project.year }}</span>
      </div>
      <div class="mt-4 flex items-center gap-3 sm:mt-5 sm:gap-4">
        <ProjectLogo :project="project" />
        <div class="min-w-0">
          <h3 class="font-display text-lg font-bold text-white sm:text-xl">{{ project.name }}</h3>
          <p class="mt-1 line-clamp-2 text-sm text-slate-400">{{ project.subtitle }}</p>
        </div>
      </div>
      <p class="mt-4 text-sm leading-6 text-slate-200 sm:mt-5">{{ project.summary }}</p>
      <p v-if="size === 'featured'" class="mt-2 line-clamp-3 text-sm leading-6 text-slate-400">{{ project.description }}</p>
      <TagList class="mt-3 sm:mt-4" :items="project.tags" />
      <div class="pointer-events-auto mt-auto flex flex-wrap gap-x-4 gap-y-2 pt-4 text-sm font-semibold sm:pt-5">
        <span class="text-brand-light transition group-hover:text-white">{{ ui.detailLabel }}</span>
        <AppLink
          v-for="link in links"
          :key="link.key"
          class="text-slate-400 transition hover:text-white"
          :to="link.href"
          :external="link.external"
        >
          {{ link.label }}
        </AppLink>
      </div>
    </div>
  </BaseCard>
</template>
