<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import AppLink from '../components/common/AppLink.vue'
import FaIcon from '../components/common/FaIcon.vue'
import ProjectLogo from '../components/common/ProjectLogo.vue'
import SectionEyebrow from '../components/common/SectionEyebrow.vue'
import TagList from '../components/common/TagList.vue'
import PageLayout from '../components/layout/PageLayout.vue'
import ProjectInfoPanel from '../components/project/ProjectInfoPanel.vue'
import ProjectReadingSection from '../components/project/ProjectReadingSection.vue'
import { uiConfig, useUiSection } from '../data/localize'
import { getProjectFields, getProjectLinks } from '../data/project-presentation'
import { getProjectBySlug, getRelatedProjects } from '../data/projects'
import { displayConfig } from '../data/runtime'
import { extractToc } from '../utils/markdown'

const route = useRoute()
const project = computed(() => getProjectBySlug(route.params.slug as string))
const relatedProjects = computed(() => (project.value ? getRelatedProjects(project.value.slug) : []))
const tocItems = computed(() => (project.value?.toc ? extractToc(project.value.content) : []))
const ui = useUiSection('projectDetailView')
const projectLinks = computed(() => project.value ? getProjectLinks(project.value, uiConfig.value.projectLinks) : [])
const overviewItems = computed(() =>
  project.value ? getProjectFields(project.value, displayConfig.value.projectOverview, ui.value, true) : [],
)
const metadataItems = computed(() =>
  project.value ? getProjectFields(project.value, displayConfig.value.projectMetadata, ui.value) : [],
)
const infoOpen = ref(false)

watch(infoOpen, (open) => document.body.classList.toggle('menu-open', open))
watch(() => route.fullPath, () => { infoOpen.value = false })
onBeforeUnmount(() => document.body.classList.remove('menu-open'))
</script>

<template>
  <PageLayout>
    <template #header-start>
      <button
        v-if="project"
        class="grid size-9 place-items-center rounded-lg text-slate-300 transition hover:bg-surface-elevated hover:text-white lg:hidden"
        type="button"
        :aria-label="ui.infoMenuLabel"
        :aria-expanded="infoOpen"
        @click="infoOpen = true"
      >
        <FaIcon name="circle-info" />
      </button>
    </template>

    <section v-if="project" class="space-y-6 py-2 sm:space-y-7">
      <div class="flex flex-col gap-3 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <div class="flex flex-wrap items-center gap-2">
          <AppLink to="/" class="transition hover:text-white">{{ ui.backToHomeLabel }}</AppLink>
          <span>/</span>
          <AppLink to="/#projects" class="transition hover:text-white">{{ ui.projectListLabel }}</AppLink>
          <span>/</span>
          <span class="text-slate-300">{{ project.name }}</span>
        </div>
        <div class="hidden flex-wrap gap-4 sm:flex">
          <AppLink to="/#projects" class="transition hover:text-white">{{ ui.backToProjectsLabel }}</AppLink>
          <AppLink
            v-for="link in projectLinks.slice(0, 2)"
            :key="link.key"
            :to="link.href"
            :external="link.external"
            class="transition hover:text-white"
          >
            {{ link.label }}
          </AppLink>
        </div>
      </div>

      <section class="grid gap-5 overflow-hidden rounded-[1.75rem] border border-[color:var(--project-accent)]/40 bg-surface/70 p-5 shadow-panel backdrop-blur-sm lg:grid-cols-[1.15fr_0.85fr] lg:p-6" :style="{ '--project-accent': project.themeColor || 'var(--color-brand)' }">
        <div>
          <div class="flex items-center gap-3 sm:gap-5">
            <ProjectLogo :project="project" size="hero" />
            <div class="min-w-0">
              <span class="inline-flex rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 font-mono text-xs text-emerald-300">{{ project.status }}</span>
              <h1 class="mt-2 font-display text-2xl font-bold tracking-tight text-white sm:mt-3 sm:text-5xl">{{ project.name }}</h1>
              <p class="mt-2 text-sm text-slate-400 sm:text-base">{{ project.subtitle }}</p>
            </div>
          </div>
          <p class="mt-5 text-base leading-7 text-slate-100 sm:text-lg">{{ project.summary }}</p>
          <p class="mt-2 text-sm leading-6 text-slate-400">{{ project.description }}</p>
          <TagList class="mt-3" :items="project.tags" />
          <div class="mt-4 flex flex-wrap gap-2.5">
            <AppLink v-for="link in projectLinks" :key="link.key" :to="link.href" :external="link.external" class="rounded-xl bg-brand px-3 py-2 text-xs font-semibold text-white transition hover:bg-indigo-500 sm:px-4 sm:py-2.5 sm:text-sm">
              {{ link.label }}
            </AppLink>
          </div>
        </div>
        <div class="aspect-video overflow-hidden rounded-2xl border border-slate-700 bg-slate-950/70">
          <img v-if="project.cover" class="size-full object-cover" :src="project.cover" :alt="project.name" />
          <div v-else class="grid size-full place-content-center gap-3 bg-gradient-to-br from-brand/25 via-slate-950 to-accent/20 p-6 text-center">
            <strong class="font-display text-3xl text-white">{{ project.name }}</strong>
            <span class="text-sm text-slate-400">{{ project.subtitle }}</span>
          </div>
        </div>
      </section>

      <section v-if="overviewItems.length">
        <SectionEyebrow>{{ ui.overviewTitle }}</SectionEyebrow>
        <div class="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          <article v-for="item in overviewItems" :key="item.id" class="rounded-xl border border-slate-800 bg-surface/50 px-3 py-2.5">
            <span class="text-xs text-slate-500">{{ item.label }}</span>
            <strong class="mt-1 block truncate text-sm text-slate-100" :title="item.value">{{ item.value }}</strong>
          </article>
        </div>
      </section>

      <ProjectReadingSection
        :project="project"
        :metadata="metadataItems"
        :links="projectLinks"
        :toc="tocItems"
        :ui="ui"
      />

      <section v-if="project.screenshots.length">
        <SectionEyebrow>{{ ui.galleryTitle }}</SectionEyebrow>
        <div class="mt-3 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <article v-for="shot in project.screenshots" :key="`${shot.title}-${shot.description}`" class="overflow-hidden rounded-2xl border border-slate-800 bg-surface/60 p-3">
            <img v-if="shot.src" :src="shot.src" :alt="shot.title" class="aspect-video w-full rounded-xl object-cover" />
            <div v-else class="grid aspect-video place-items-center rounded-xl bg-surface-elevated text-slate-500">
              <span>{{ shot.title }}</span>
            </div>
            <strong class="mt-3 block text-sm text-white">{{ shot.title }}</strong>
            <p class="mt-1 line-clamp-2 text-xs leading-5 text-slate-400">{{ shot.description }}</p>
          </article>
        </div>
      </section>

      <section>
        <SectionEyebrow>{{ ui.relatedTitle }}</SectionEyebrow>
        <div class="mt-3 grid gap-3 sm:grid-cols-2 md:mt-4 lg:grid-cols-3">
          <AppLink v-for="item in relatedProjects" :key="item.slug" :to="`/p/${item.slug}`" class="group rounded-2xl border border-slate-800 bg-surface/55 p-4 transition hover:-translate-y-0.5 hover:border-brand/60">
            <strong class="block font-display text-lg text-white transition group-hover:text-brand-light">{{ item.name }}</strong>
            <span class="mt-1 block text-xs text-slate-500">{{ item.subtitle }}</span>
            <p class="mt-3 line-clamp-2 text-sm leading-6 text-slate-400">{{ item.summary }}</p>
          </AppLink>
        </div>
      </section>
    </section>

    <section v-else class="mx-auto max-w-2xl py-20 text-center">
      <div>
        <p class="font-mono text-xs font-semibold tracking-[0.2em] text-brand-light uppercase">404</p>
        <h2 class="mt-4 font-display text-4xl font-bold text-white">{{ ui.projectMissingTitle }}</h2>
        <p class="mt-4 leading-7 text-slate-400">{{ ui.projectMissingDescription }}</p>
      </div>
      <AppLink to="/#projects" class="mt-8 inline-flex rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500">{{ ui.backToProjectsLabel }}</AppLink>
    </section>

    <Teleport to="body">
      <Transition name="nav-backdrop">
        <button v-if="infoOpen" class="fixed inset-0 z-50 bg-slate-950/60" type="button" :aria-label="ui.infoMenuLabel" @click="infoOpen = false" />
      </Transition>
      <Transition name="project-info-drawer">
        <aside v-if="project && infoOpen" class="fixed inset-y-0 left-0 z-[60] w-[min(21rem,90vw)] overflow-y-auto border-r border-slate-700 bg-surface p-4 shadow-2xl" :aria-label="ui.infoMenuLabel" aria-modal="true" role="dialog">
          <div class="mb-4 flex items-center justify-between border-b border-slate-800 pb-3 pt-[max(0.25rem,env(safe-area-inset-top))]">
            <strong class="font-display text-white">{{ ui.infoMenuLabel }}</strong>
            <button class="grid size-9 place-items-center rounded-lg text-slate-300 transition hover:bg-surface-elevated hover:text-white" type="button" :aria-label="ui.closeInfoMenuLabel" @click="infoOpen = false">
              <FaIcon name="xmark" />
            </button>
          </div>
          <ProjectInfoPanel :project="project" :metadata="metadataItems" :links="projectLinks" :toc="tocItems" :ui="ui" @navigate="infoOpen = false" />
        </aside>
      </Transition>
    </Teleport>
  </PageLayout>
</template>
