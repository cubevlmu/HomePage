<script setup lang="ts">
import SectionEyebrow from './SectionEyebrow.vue'

defineProps<{
  eyebrow: string
  title: string
  description: string
}>()
</script>

<template>
  <div class="max-w-3xl">
    <SectionEyebrow>{{ eyebrow }}</SectionEyebrow>
    <h2 class="mt-2 font-display text-2xl font-bold tracking-tight text-white sm:text-4xl">{{ title }}</h2>
    <p class="mt-2 text-sm leading-6 text-slate-300 sm:mt-3 sm:text-base">{{ description }}</p>
  </div>
</template>
