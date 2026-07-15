<script setup lang="ts">
import type { Project } from '../../types/project'
import MarkdownRenderer from '../common/MarkdownRenderer.vue'
import SectionEyebrow from '../common/SectionEyebrow.vue'
import ProjectInfoPanel from './ProjectInfoPanel.vue'

defineProps<{
  project: Project
  metadata: Array<{ id: string; label: string; value: string }>
  links: Array<{ key: string; href: string; label: string; external: boolean }>
  toc: Array<{ id: string; text: string; level: number }>
  ui: Record<string, string>
}>()
</script>

<template>
  <section class="grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-5">
    <div class="min-w-0">
      <SectionEyebrow>{{ ui.contentTitle }}</SectionEyebrow>
      <article class="mt-3 rounded-2xl border border-slate-800 bg-surface/55 p-4 sm:mt-4 sm:p-7">
        <MarkdownRenderer :content="project.content" :base-url="project.contentBase" />
      </article>
    </div>

    <aside class="hidden lg:sticky lg:top-28 lg:mt-7 lg:block">
      <ProjectInfoPanel :project="project" :metadata="metadata" :links="links" :toc="toc" :ui="ui" />
    </aside>
  </section>
</template>
