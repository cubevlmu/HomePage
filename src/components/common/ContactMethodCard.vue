<script setup lang="ts">
import type { ContactMethod } from '../../types/contact'
import BaseCard from './BaseCard.vue'
import FaIcon from './FaIcon.vue'

defineProps<{
  item: ContactMethod
}>()
</script>

<template>
  <BaseCard
    as="a"
    class-name="group flex items-center justify-between gap-3 p-3.5 transition hover:-translate-y-0.5 hover:border-brand/60 hover:bg-surface-elevated/80 sm:gap-4 sm:p-5"
    :href="item.href"
  >
    <span class="flex min-w-0 items-center gap-3 text-sm text-slate-400">
      <FaIcon :name="item.icon" />
      <span>{{ item.label }}</span>
    </span>
    <strong class="max-w-[62%] break-all text-right text-xs text-white transition group-hover:text-brand-light sm:text-sm">{{ item.value }}</strong>
  </BaseCard>
</template>
