import { computed } from 'vue'
import { locale } from '../i18n'
import type { LocalizedText } from '../types/localized'

type MaybeLocalized = string | LocalizedText

export const localizeText = (value: MaybeLocalized) =>
  typeof value === 'string' ? value : value[locale.value]

export const useLocalizedText = (value: MaybeLocalized) => computed(() => localizeText(value))
