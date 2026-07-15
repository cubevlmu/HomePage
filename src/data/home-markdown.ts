import { computed } from 'vue'
import { requireLocaleData } from './runtime'

export const homeMarkdownSections = computed(() => requireLocaleData().markdownSections)
