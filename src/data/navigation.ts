import { computed } from 'vue'
import type { NavigationConfig } from '../types/navigation'
import { localizedManifestLinks, requireLocaleData } from './runtime'

export const navigationConfig = computed<NavigationConfig>(() => {
  const navigation = requireLocaleData().navigation
  const primaryLink = localizedManifestLinks.value.find((link) => link.id === 'blog')

  return {
    ...navigation,
    blogButton: primaryLink
      ? {
          label: primaryLink.label,
          href: primaryLink.href,
          icon: primaryLink.icon,
          external: primaryLink.external,
        }
      : navigation.blogButton,
  }
})
