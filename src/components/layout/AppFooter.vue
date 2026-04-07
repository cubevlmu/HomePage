<script setup lang="ts">
import { locale, setLocale } from '../../i18n'
import { useLocalizedText } from '../../data/localize'
import uiResource from '../../resources/ui.json'

const props = defineProps<{
  owner: string
  description: string
  copyrightLabel: string
  icpPlaceholder: string
}>()

const languageSwitcherLabel = useLocalizedText(uiResource.appFooter.languageSwitcherLabel)
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="site-footer">
    <div class="site-footer__meta">
      <p class="site-footer__copyright">{{ props.copyrightLabel }} © {{ currentYear }} {{ owner }}</p>
      <p>{{ description }}</p>
      <p class="site-footer__icp">{{ props.icpPlaceholder }}</p>
    </div>
    <div class="site-footer__actions">
      <div class="lang-switch" :aria-label="languageSwitcherLabel" role="group">
        <button class="lang-switch__button" :class="{ 'lang-switch__button--active': locale === 'en' }" type="button" @click="setLocale('en')">
          EN
        </button>
        <button class="lang-switch__button" :class="{ 'lang-switch__button--active': locale === 'zh' }" type="button" @click="setLocale('zh')">
          中文
        </button>
      </div>
    </div>
  </footer>
</template>
