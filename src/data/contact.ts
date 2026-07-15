import { computed } from 'vue'
import type { ContactConfig } from '../types/contact'
import { localizedManifestLinks, requireLocaleData } from './runtime'

export const contactConfig = computed<ContactConfig>(() => ({
  ...requireLocaleData().contact,
  methods: localizedManifestLinks.value
    .filter((link) => link.showInContact)
    .map((link) => ({
      label: link.label,
      value: link.value ?? link.href.replace(/^mailto:/, '').replace(/^https?:\/\//, ''),
      href: link.href,
      icon: link.icon,
    })),
}))
