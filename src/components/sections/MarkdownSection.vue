<script setup lang="ts">
import type { HomeMarkdownSection } from '../../types/runtime-data'
import BaseCard from '../common/BaseCard.vue'
import MarkdownRenderer from '../common/MarkdownRenderer.vue'
import SectionHeader from '../common/SectionHeader.vue'

defineProps<{ config: HomeMarkdownSection }>()
</script>

<template>
  <section :id="config.id" class="scroll-mt-24 space-y-5 border-t border-slate-800 py-7 sm:space-y-7 sm:py-9" data-nav-section>
    <SectionHeader :eyebrow="config.eyebrow" :title="config.title" :description="config.description" />
    <BaseCard class-name="p-4 sm:p-6">
      <MarkdownRenderer compact :content="config.content ?? ''" :base-url="config.contentBase" />
    </BaseCard>
  </section>
</template>
