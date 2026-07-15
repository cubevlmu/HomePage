<script setup lang="ts">
import type { Project } from '../../types/project'
import AppLink from '../common/AppLink.vue'
import SectionEyebrow from '../common/SectionEyebrow.vue'
import TagList from '../common/TagList.vue'

defineProps<{
  project: Project
  metadata: Array<{ id: string; label: string; value: string }>
  links: Array<{ key: string; href: string; label: string; external: boolean }>
  toc: Array<{ id: string; text: string; level: number }>
  ui: Record<string, string>
}>()

defineEmits<{ navigate: [] }>()
</script>

<template>
  <div class="grid gap-3">
    <section v-if="metadata.length" class="rounded-2xl border border-slate-800 bg-surface/60 p-4">
      <SectionEyebrow compact>{{ ui.metadataLabel }}</SectionEyebrow>
      <dl class="mt-3 grid gap-2.5">
        <div v-for="item in metadata" :key="item.id" class="flex items-start justify-between gap-3 border-b border-slate-800 pb-2.5 last:border-0 last:pb-0">
          <dt class="text-xs text-slate-500">{{ item.label }}</dt>
          <dd class="break-all text-right text-xs text-slate-300">{{ item.value }}</dd>
        </div>
      </dl>
    </section>

    <section class="rounded-2xl border border-slate-800 bg-surface/60 p-4">
      <SectionEyebrow compact>{{ ui.authorsLabel }}</SectionEyebrow>
      <div class="mt-3 grid gap-2.5">
        <div v-for="author in project.authors" :key="author.name">
          <strong class="block text-sm text-slate-100">{{ author.name }}</strong>
          <span class="text-xs text-slate-500">{{ author.role }}</span>
        </div>
      </div>
    </section>

    <section class="rounded-2xl border border-slate-800 bg-surface/60 p-4">
      <SectionEyebrow compact>{{ ui.techStackLabel }}</SectionEyebrow>
      <TagList class="mt-3" :items="project.techStack" />
    </section>

    <section v-if="links.length" class="rounded-2xl border border-slate-800 bg-surface/60 p-4">
      <SectionEyebrow compact>{{ ui.linksLabel }}</SectionEyebrow>
      <div class="mt-2.5 grid gap-1">
        <AppLink v-for="link in links" :key="link.key" :to="link.href" :external="link.external" class="rounded-lg px-2.5 py-2 text-sm text-slate-300 transition hover:bg-surface-elevated hover:text-white" @click="$emit('navigate')">
          {{ link.label }}
        </AppLink>
      </div>
    </section>

    <section class="rounded-2xl border border-slate-800 bg-surface/60 p-4">
      <SectionEyebrow compact>{{ ui.tocLabel }}</SectionEyebrow>
      <nav v-if="toc.length" class="mt-2.5 grid gap-1">
        <a v-for="item in toc" :key="item.id" :href="`#${item.id}`" class="rounded-lg py-1 text-xs text-slate-400 transition hover:text-white" :class="item.level === 3 ? 'pl-3' : ''" @click="$emit('navigate')">
          {{ item.text }}
        </a>
      </nav>
      <p v-else class="mt-3 text-xs text-slate-500">{{ ui.noTocLabel }}</p>
    </section>
  </div>
</template>
