import { computed } from 'vue'
import type { HeroAction, HeroConfig } from '../types/hero'
import heroResource from '../resources/hero.json'
import { localizeText } from './localize'

export const heroConfig = computed<HeroConfig>(() => ({
  eyebrow: localizeText(heroResource.eyebrow),
  title: localizeText(heroResource.title),
  subtitle: localizeText(heroResource.subtitle),
  description: localizeText(heroResource.description),
  actions: heroResource.actions.map((action) => ({
    label: localizeText(action.label),
    href: action.href,
    variant: action.variant as HeroAction['variant'],
    icon: action.icon,
    external: action.external,
  })),
}))
