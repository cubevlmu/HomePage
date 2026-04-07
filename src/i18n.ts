import { computed, ref, watch } from 'vue'

export type Locale = 'en' | 'zh'

const STORAGE_KEY = 'home-page-locale'
const DEFAULT_LOCALE: Locale = 'en'

const isLocale = (value: string | null): value is Locale => value === 'en' || value === 'zh'

const resolveInitialLocale = (): Locale => {
  if (typeof window === 'undefined') {
    return DEFAULT_LOCALE
  }

  const storedLocale = window.localStorage.getItem(STORAGE_KEY)
  return isLocale(storedLocale) ? storedLocale : DEFAULT_LOCALE
}

export const locale = ref<Locale>(resolveInitialLocale())

export const setLocale = (nextLocale: Locale) => {
  locale.value = nextLocale
}

export const toggleLocale = () => {
  locale.value = locale.value === 'en' ? 'zh' : 'en'
}

export const pickLocalized = <T>(enValue: T, zhValue: T): T =>
  locale.value === 'en' ? enValue : zhValue

export const currentLanguageLabel = computed(() => pickLocalized('English', '中文'))

watch(
  locale,
  (currentLocale) => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, currentLocale)
      document.documentElement.lang = currentLocale === 'en' ? 'en-US' : 'zh-CN'
    }
  },
  { immediate: true },
)
