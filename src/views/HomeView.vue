<script setup lang="ts">
import { computed } from 'vue'
import AppLink from '../components/common/AppLink.vue'
import FaIcon from '../components/common/FaIcon.vue'
import PageLayout from '../components/layout/PageLayout.vue'
import AboutSection from '../components/sections/AboutSection.vue'
import ContactSection from '../components/sections/ContactSection.vue'
import MarkdownSection from '../components/sections/MarkdownSection.vue'
import ProjectSection from '../components/sections/ProjectSection.vue'
import { aboutConfig } from '../data/about'
import { contactConfig } from '../data/contact'
import { heroConfig } from '../data/hero'
import { homeMarkdownSections } from '../data/home-markdown'
import { useUiSection } from '../data/localize'
import { projectCollection } from '../data/projects'
import { displayConfig, localizedManifestLinks } from '../data/runtime'
import { siteConfig } from '../data/site'

const ui = useUiSection('homeView')

const projectStats = computed(() => {
  const projects = projectCollection.value.items
  const values = {
    projects: projects.length,
    technologies: new Set(projects.flatMap((project) => project.techStack)).size,
    featured: projects.filter((project) => project.featured).length,
  }

  return displayConfig.value.homeStats.map((id) => ({ id, label: ui.value[id] ?? id, value: values[id] }))
})

</script>

<template>
  <PageLayout>
    <section id="home" class="scroll-mt-24 py-1" data-nav-section>
      <div
        class="grid gap-x-4 gap-y-4 rounded-[1.75rem] border border-slate-700/70 bg-surface/65 p-4 shadow-panel backdrop-blur-sm sm:gap-x-5 sm:p-6 lg:gap-x-7 lg:p-7"
        :class="siteConfig.profile.showAvatar ? 'grid-cols-[4.5rem_minmax(0,1fr)] sm:grid-cols-[6rem_minmax(0,1fr)] lg:grid-cols-[9rem_minmax(0,1fr)]' : 'grid-cols-1'"
      >
        <a
          v-if="siteConfig.profile.showAvatar"
          class="block size-[4.5rem] overflow-hidden rounded-xl border border-brand/30 bg-slate-950 shadow-xl sm:size-24 sm:rounded-2xl lg:size-36"
          :href="siteConfig.profile.profileUrl"
          target="_blank"
          rel="noreferrer"
        >
          <img class="size-full object-cover" :src="siteConfig.profile.avatar" :alt="ui.avatarAlt" />
        </a>

        <div class="min-w-0 self-center lg:self-start">
          <p class="font-mono text-xs font-semibold tracking-[0.22em] text-brand-light uppercase">{{ heroConfig.eyebrow }}</p>
          <h1 class="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            {{ siteConfig.profile.displayName }}
          </h1>
          <p class="mt-1 font-mono text-xs text-slate-400 sm:text-sm">{{ siteConfig.role }} · {{ siteConfig.profile.company }}</p>
        </div>

        <div class="min-w-0" :class="siteConfig.profile.showAvatar ? 'col-span-2 lg:col-start-2 lg:col-span-1' : ''">
          <h2 class="font-display text-lg font-semibold text-brand-light sm:text-xl">{{ heroConfig.title }}</h2>
          <p class="mt-1 text-sm text-slate-400">{{ siteConfig.profile.bio }}</p>
          <p class="mt-2 max-w-3xl text-sm leading-6 text-slate-300 sm:text-base sm:leading-7">{{ heroConfig.description }}</p>

          <div class="mt-4 flex flex-wrap items-center gap-2">
            <AppLink
              v-for="link in localizedManifestLinks"
              :key="link.id"
              class="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-950/50 px-3 py-2 text-xs font-semibold text-slate-200 transition hover:-translate-y-0.5 hover:border-brand/60 hover:text-white sm:text-sm"
              :to="link.href"
              :external="link.external"
            >
              <FaIcon :name="link.icon" />
              {{ link.label }}
            </AppLink>
          </div>

          <dl v-if="projectStats.length" class="mt-4 flex flex-wrap gap-2 border-t border-slate-800 pt-3">
            <div v-for="stat in projectStats" :key="stat.id" class="min-w-20 flex-none rounded-xl border border-slate-800 bg-slate-950/35 px-2.5 py-2 sm:min-w-24 sm:px-3">
              <dt class="text-xs text-slate-500">{{ stat.label }}</dt>
              <dd class="mt-0.5 font-display text-lg font-bold text-white sm:text-xl">{{ stat.value }}</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>

    <AboutSection v-if="displayConfig.sections.about" :config="aboutConfig" />
    <ProjectSection v-if="displayConfig.sections.projects" :config="projectCollection" />
    <MarkdownSection v-for="section in homeMarkdownSections" :key="section.id" :config="section" />
    <ContactSection v-if="displayConfig.sections.contact" :config="contactConfig" />
  </PageLayout>
</template>
