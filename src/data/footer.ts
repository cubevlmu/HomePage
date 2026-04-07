import { computed } from 'vue'
import type { FooterConfig } from '../types/footer'
import footerResource from '../resources/footer.json'
import { localizeText } from './localize'

export const footerConfig = computed<FooterConfig>(() => ({
  description: localizeText(footerResource.description),
  copyrightLabel: localizeText(footerResource.copyrightLabel),
  icpPlaceholder: localizeText(footerResource.icpPlaceholder),
}))
