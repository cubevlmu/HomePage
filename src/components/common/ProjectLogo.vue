<script setup lang="ts">
import type { Project } from '../../types/project'

withDefaults(
  defineProps<{
    project: Project
    size?: 'card' | 'hero'
  }>(),
  { size: 'card' },
)
</script>

<template>
  <div
    class="grid shrink-0 place-items-center overflow-hidden border border-slate-700 bg-slate-950/80"
    :class="size === 'hero' ? 'size-16 rounded-2xl p-2.5 sm:size-20 sm:p-3' : 'size-14 rounded-xl p-2'"
  >
    <img v-if="project.logo" class="max-h-full max-w-full object-contain" :src="project.logo" :alt="project.name" />
    <span v-else class="grid size-full place-items-center rounded-xl bg-gradient-to-br from-brand to-accent font-display font-bold text-white">
      {{ project.name.slice(0, 2) }}
    </span>
  </div>
</template>
