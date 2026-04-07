import { computed } from 'vue'
import type { ContactConfig } from '../types/contact'
import contactResource from '../resources/contact.json'
import { localizeText } from './localize'

export const contactConfig = computed<ContactConfig>(() => ({
  eyebrow: localizeText(contactResource.eyebrow),
  title: localizeText(contactResource.title),
  description: localizeText(contactResource.description),
  methods: contactResource.methods.map((method) => ({
    label: localizeText(method.label),
    value: method.value,
    href: method.href,
    icon: method.icon,
  })),
}))
