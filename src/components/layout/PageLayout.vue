<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import AppFooter from './AppFooter.vue'
import AppHeader from './AppHeader.vue'
import FaIcon from '../common/FaIcon.vue'
import { footerConfig } from '../../data/footer'
import { useLocalizedText } from '../../data/localize'
import { navigationConfig } from '../../data/navigation'
import { siteConfig } from '../../data/site'
import uiResource from '../../resources/ui.json'

const headerNav = computed(() => navigationConfig.value.navItems)
const headerCta = computed(() => ({
  label: navigationConfig.value.blogButton.label,
  href: navigationConfig.value.blogButton.href,
  icon: navigationConfig.value.blogButton.icon,
  external: true,
}))

const showBackToTop = ref(false)
const backToTopLabel = useLocalizedText(uiResource.appFooter.backToTopLabel)
let scrollFrame = 0

const updateScrollState = () => {
  scrollFrame = 0
  const shouldShow = window.scrollY > 320

  if (showBackToTop.value !== shouldShow) {
    showBackToTop.value = shouldShow
  }
}

const handleScroll = () => {
  if (scrollFrame) {
    return
  }

  scrollFrame = window.requestAnimationFrame(updateScrollState)
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  updateScrollState()
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onBeforeUnmount(() => {
  if (scrollFrame) {
    window.cancelAnimationFrame(scrollFrame)
  }

  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div class="page-shell">
    <AppHeader :profile="siteConfig.profile" :nav="headerNav" :cta="headerCta" />
    <main>
      <slot />
    </main>
    <AppFooter
      :owner="siteConfig.profile.displayName"
      :description="footerConfig.description"
      :copyright-label="footerConfig.copyrightLabel"
      :icp-placeholder="footerConfig.icpPlaceholder"
    />
    <button v-if="showBackToTop" class="back-to-top" type="button" :aria-label="backToTopLabel" @click="scrollToTop">
      <FaIcon name="chevron-up" />
    </button>
  </div>
</template>
