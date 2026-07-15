import { computed } from 'vue'
import type { UiConfig } from '../types/runtime-data'
import { requireLocaleData } from './runtime'

export const useUiSection = <T extends keyof UiConfig>(section: T) =>
  computed(() => requireLocaleData().ui[section])

export const uiConfig = computed(() => requireLocaleData().ui)
