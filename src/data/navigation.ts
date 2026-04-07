import { computed } from 'vue'
import type { NavigationConfig } from '../types/navigation'
import navigationResource from '../resources/navigation.json'
import { localizeText } from './localize'

export const navigationConfig = computed<NavigationConfig>(() => ({
  navItems: navigationResource.navItems.map((item) => ({
    label: localizeText(item.label),
    to: item.to,
    icon: item.icon,
  })),
  blogButton: {
    label: localizeText(navigationResource.blogButton.label),
    href: navigationResource.blogButton.href,
    icon: navigationResource.blogButton.icon,
  },
}))
