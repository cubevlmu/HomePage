import { computed } from 'vue'
import type { FooterConfig } from '../types/footer'
import { requireLocaleData } from './runtime'

export const footerConfig = computed<FooterConfig>(() => requireLocaleData().footer)
