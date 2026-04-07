import { computed } from 'vue'
import type { AboutConfig } from '../types/about'
import aboutResource from '../resources/about.json'
import { localizeText } from './localize'

export const aboutConfig = computed<AboutConfig>(() => ({
  eyebrow: localizeText(aboutResource.eyebrow),
  title: localizeText(aboutResource.title),
  description: localizeText(aboutResource.description),
  story: aboutResource.story.map((item) => localizeText(item)),
  cards: aboutResource.cards.map((card) => ({
    title: localizeText(card.title),
    value: localizeText(card.value),
    detail: localizeText(card.detail),
  })),
}))
