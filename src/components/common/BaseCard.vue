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
  <component
    :is="as"
    class="rounded-2xl border border-slate-700/60 bg-surface/70 shadow-panel backdrop-blur-sm"
    :class="className"
    :href="href"
  >
    <slot />
  </component>
</template>
