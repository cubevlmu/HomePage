<script setup lang="ts">
withDefaults(defineProps<{ compact?: boolean }>(), { compact: false })
</script>

<template>
  <p class="font-mono text-xs text-brand-light uppercase" :class="compact ? 'tracking-wider' : 'font-semibold tracking-[0.2em]'">
    <slot />
  </p>
</template>
