<script setup lang="ts">
import { availableLocales, locale, setLocale } from '../../i18n'
import { useUiSection } from '../../data/localize'

const props = defineProps<{
  owner: string
  description: string
  copyrightLabel: string
  icpPlaceholder: string
}>()

const ui = useUiSection('appFooter')
const currentYear = new Date().getFullYear()

const changeLocale = (event: Event) => {
  void setLocale((event.target as HTMLSelectElement).value)
}
</script>

<template>
  <footer class="mt-12 flex flex-col gap-5 border-t border-slate-800 py-6 text-sm text-slate-500 sm:flex-row sm:items-end sm:justify-between">
    <div class="space-y-1.5">
      <p class="font-medium text-slate-300">{{ props.copyrightLabel }} © {{ currentYear }} {{ owner }}</p>
      <p>{{ description }}</p>
      <p v-if="props.icpPlaceholder">{{ props.icpPlaceholder }}</p>
    </div>
    <label class="grid gap-1.5">
      <span class="text-xs text-slate-500">{{ ui.languageSwitcherLabel }}</span>
      <select
        class="min-w-32 rounded-xl border border-slate-700 bg-surface px-3 py-2 text-xs font-semibold text-slate-200 outline-none transition hover:border-brand/60 focus:border-brand focus:ring-3 focus:ring-brand/15"
        :value="locale"
        :aria-label="ui.languageSwitcherLabel"
        @change="changeLocale"
      >
        <option v-for="item in availableLocales" :key="item.locale" :value="item.locale">
          {{ item.label }}
        </option>
      </select>
    </label>
  </footer>
</template>
