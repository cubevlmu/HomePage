import { computed } from 'vue'
import type { AboutConfig } from '../types/about'
import { requireLocaleData } from './runtime'

export const aboutConfig = computed<AboutConfig>(() => requireLocaleData().about)
