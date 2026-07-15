<script setup lang="ts">
defineProps<{ items: string[] }>()
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <span v-for="item in items" :key="item" class="rounded-lg bg-surface-elevated px-2.5 py-1 font-mono text-xs text-slate-300">
      {{ item }}
    </span>
  </div>
</template>
