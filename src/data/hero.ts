import { computed } from 'vue'
import type { HeroConfig } from '../types/hero'
import { requireLocaleData } from './runtime'

export const heroConfig = computed<HeroConfig>(() => requireLocaleData().hero)
