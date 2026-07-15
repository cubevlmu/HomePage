<script setup lang="ts">
import type { HeaderAction, NavItem } from '../../types/navigation'
import AppLink from '../common/AppLink.vue'
import FaIcon from '../common/FaIcon.vue'

defineProps<{
  nav: readonly NavItem[]
  cta?: HeaderAction
  activeTarget?: string
  mobile?: boolean
}>()

defineEmits<{ navigate: [] }>()
</script>

<template>
  <nav :class="mobile ? 'mt-5 flex flex-col gap-2' : 'hidden items-center gap-1 md:flex'">
    <AppLink
      v-for="item in nav"
      :key="item.to"
      :class="[
        mobile ? 'flex gap-3 px-4 py-3' : 'inline-flex gap-2 px-3 py-2 text-sm font-medium',
        item.to === activeTarget ? 'bg-brand/15 text-brand-light ring-1 ring-brand/25' : 'text-slate-300',
      ]"
      class="items-center rounded-xl transition hover:bg-surface-elevated hover:text-white focus-visible:ring-2 focus-visible:ring-brand-light focus-visible:outline-none"
      :to="item.to"
      :external="item.external"
      :aria-current="item.to === activeTarget ? 'location' : undefined"
      @click="$emit('navigate')"
    >
      <FaIcon :name="item.icon" />
      <span>{{ item.label }}</span>
    </AppLink>
    <AppLink
      v-if="cta"
      :class="mobile ? 'mt-2 flex gap-3 px-4 py-3' : 'ml-2 inline-flex gap-2 px-4 py-2 text-sm'"
      class="items-center rounded-xl bg-brand font-semibold text-white transition hover:bg-indigo-500"
      :to="cta.href"
      :external="cta.external"
      @click="$emit('navigate')"
    >
      <FaIcon :name="cta.icon" />
      <span>{{ cta.label }}</span>
    </AppLink>
  </nav>
</template>
