<script setup lang="ts">
import { RouterLink } from 'vue-router'

withDefaults(
  defineProps<{
    to: string
    external?: boolean
    target?: string
    rel?: string
  }>(),
  {
    external: false,
    target: undefined,
    rel: 'noreferrer',
  },
)
</script>

<template>
  <a v-if="external" :href="to" :target="target ?? '_blank'" :rel="rel">
    <slot />
  </a>
  <RouterLink v-else :to="to">
    <slot />
  </RouterLink>
</template>
