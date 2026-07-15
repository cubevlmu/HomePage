<script setup lang="ts">
import { computed, ref } from 'vue'
import { useUiSection } from '../../data/localize'
import { displayConfig } from '../../data/runtime'
import type { ProjectCollection } from '../../types/project'
import PaginationControl from '../common/PaginationControl.vue'
import ProjectCard from '../common/ProjectCard.vue'
import SectionHeader from '../common/SectionHeader.vue'

const props = defineProps<{
  config: ProjectCollection
}>()

const currentPage = ref(1)
const ui = useUiSection('projectSection')
const pageCount = computed(() => Math.max(1, Math.ceil(props.config.items.length / displayConfig.value.projectPageSize)))
const activePage = computed(() => Math.min(currentPage.value, pageCount.value))

const visibleProjects = computed(() => {
  const start = (activePage.value - 1) * displayConfig.value.projectPageSize
  return props.config.items.slice(start, start + displayConfig.value.projectPageSize)
})

const changePage = (page: number) => {
  currentPage.value = page

  window.requestAnimationFrame(() => {
    document.querySelector('#projects .project-page')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  })
}
</script>

<template>
  <section class="scroll-mt-24 space-y-5 border-t border-slate-800 py-7 sm:space-y-7 sm:py-9" id="projects" data-nav-section>
    <SectionHeader
      :eyebrow="config.eyebrow"
      :title="config.title"
      :description="config.description"
    />
    <div id="project-list" class="project-page scroll-mt-24 grid grid-cols-[repeat(auto-fit,minmax(min(100%,21rem),1fr))] gap-3">
      <ProjectCard
        v-for="project in visibleProjects"
        :key="project.slug"
        :project="project"
        :size="project.featured ? 'featured' : 'compact'"
      />
    </div>
    <div v-if="pageCount > 1" class="border-t border-slate-800/80 pt-4">
      <PaginationControl
        :current="activePage"
        :total="pageCount"
        :previous-label="ui.previousLabel"
        :next-label="ui.nextLabel"
        :page-label="ui.pageLabel"
        @change="changePage"
      />
    </div>
  </section>
</template>
