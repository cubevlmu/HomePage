<script setup lang="ts">
withDefaults(
  defineProps<{
    as?: 'article' | 'div' | 'a' | 'form'
    className?: string
    href?: string
  }>(),
  {
    as: 'article',
    className: '',
    href: undefined,
  },
)
</script>

<template>
  <component :is="as" class="base-card" :class="className" :href="href">
    <slot />
  </component>
</template>
