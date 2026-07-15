<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  current: number
  total: number
  previousLabel: string
  nextLabel: string
  pageLabel: string
}>()

const emit = defineEmits<{ change: [page: number] }>()

const pages = computed(() => {
  if (props.total <= 7) return Array.from({ length: props.total }, (_, index) => index + 1)

  const nearby = [1, props.current - 1, props.current, props.current + 1, props.total]
    .filter((page) => page >= 1 && page <= props.total)
    .filter((page, index, items) => items.indexOf(page) === index)
    .sort((left, right) => left - right)

  return nearby.flatMap<(number | string)>((page, index) => {
    const previous = nearby[index - 1]
    return previous && page - previous > 1 ? [`ellipsis-${previous}`, page] : [page]
  })
})

const changePage = (page: number) => {
  if (page !== props.current && page >= 1 && page <= props.total) emit('change', page)
}
</script>

<template>
  <nav v-if="total > 1" class="flex flex-wrap items-center justify-center gap-1.5" :aria-label="pageLabel">
    <button
      class="rounded-lg border border-slate-700 bg-surface px-3 py-2 text-xs font-semibold text-slate-300 transition hover:border-brand/60 hover:text-white disabled:cursor-not-allowed disabled:opacity-35"
      type="button"
      :disabled="current === 1"
      @click="changePage(current - 1)"
    >
      {{ previousLabel }}
    </button>

    <template v-for="item in pages" :key="item">
      <span v-if="typeof item === 'string'" class="px-1 text-xs text-slate-600" aria-hidden="true">…</span>
      <button
        v-else
        class="grid size-9 place-items-center rounded-lg border text-xs font-semibold transition"
        :class="item === current ? 'border-brand/60 bg-brand text-white' : 'border-slate-700 bg-surface text-slate-400 hover:border-brand/60 hover:text-white'"
        type="button"
        :aria-current="item === current ? 'page' : undefined"
        :aria-label="`${pageLabel} ${item}`"
        @click="changePage(item)"
      >
        {{ item }}
      </button>
    </template>

    <button
      class="rounded-lg border border-slate-700 bg-surface px-3 py-2 text-xs font-semibold text-slate-300 transition hover:border-brand/60 hover:text-white disabled:cursor-not-allowed disabled:opacity-35"
      type="button"
      :disabled="current === total"
      @click="changePage(current + 1)"
    >
      {{ nextLabel }}
    </button>
  </nav>
</template>
