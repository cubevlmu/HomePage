<script setup lang="ts">
import type { AboutConfig } from '../../types/about'
import BaseCard from '../common/BaseCard.vue'
import SectionHeader from '../common/SectionHeader.vue'

defineProps<{
  config: AboutConfig
}>()
</script>

<template>
  <section class="scroll-mt-24 space-y-5 border-t border-slate-800 py-7 sm:space-y-7 sm:py-9" id="about" data-nav-section>
    <SectionHeader
      :eyebrow="config.eyebrow"
      :title="config.title"
      :description="config.description"
    />
    <div class="grid gap-3 sm:gap-5 lg:grid-cols-[1.25fr_1fr]">
      <BaseCard class-name="space-y-3 p-4 text-sm leading-6 text-slate-300 sm:space-y-4 sm:p-6 sm:text-base sm:leading-7">
        <p v-for="paragraph in config.story" :key="paragraph">
          {{ paragraph }}
        </p>
      </BaseCard>
      <div class="grid gap-2 sm:grid-cols-2 sm:gap-3 lg:grid-cols-1">
        <BaseCard v-for="item in config.cards" :key="item.title" class-name="p-3 sm:p-4">
          <p class="font-mono text-xs tracking-wider text-brand-light uppercase">{{ item.title }}</p>
          <h3 class="mt-1.5 font-display text-base font-bold text-white sm:mt-2 sm:text-xl">{{ item.value }}</h3>
          <p class="mt-1.5 text-xs leading-5 text-slate-400 sm:mt-2 sm:text-sm sm:leading-6">{{ item.detail }}</p>
        </BaseCard>
      </div>
    </div>
  </section>
</template>
