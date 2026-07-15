<script setup lang="ts">
import { computed } from 'vue'
import AppFooter from './AppFooter.vue'
import AppHeader from './AppHeader.vue'
import FaIcon from '../common/FaIcon.vue'
import { useBackToTop } from '../../composables/useBackToTop'
import { footerConfig } from '../../data/footer'
import { homeMarkdownSections } from '../../data/home-markdown'
import { useUiSection } from '../../data/localize'
import { navigationConfig } from '../../data/navigation'
import { displayConfig } from '../../data/runtime'
import { siteConfig } from '../../data/site'

const headerNav = computed(() =>
  navigationConfig.value.navItems.filter((item) => {
    const section = item.to.split('#')[1]
    if (!section || section === 'home') return true
    return section in displayConfig.value.sections
      ? displayConfig.value.sections[section as keyof typeof displayConfig.value.sections]
      : homeMarkdownSections.value.some((item) => item.id === section)
  }),
)
const headerCta = computed(() => ({
  label: navigationConfig.value.blogButton.label,
  href: navigationConfig.value.blogButton.href,
  icon: navigationConfig.value.blogButton.icon,
  external: true,
}))

const footerUi = useUiSection('appFooter')
const headerUi = useUiSection('appHeader')
const { visible: showBackToTop, scrollToTop } = useBackToTop(() => displayConfig.value.backToTopThreshold)
</script>

<template>
  <div class="mx-auto min-h-screen w-full max-w-[1440px] px-3 sm:px-6 lg:px-5">
    <a
      href="#main-content"
      class="fixed top-3 left-4 z-[70] -translate-y-20 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white transition focus:translate-y-0 focus:outline-none"
    >
      {{ headerUi.skipToContentLabel }}
    </a>
    <AppHeader :profile="siteConfig.profile" :nav="headerNav" :cta="headerCta">
      <template #before-brand>
        <slot name="header-start" />
      </template>
    </AppHeader>
    <main id="main-content" class="pt-2 sm:pt-3" tabindex="-1">
      <slot />
    </main>
    <AppFooter
      :owner="siteConfig.profile.displayName"
      :description="footerConfig.description"
      :copyright-label="footerConfig.copyrightLabel"
      :icp-placeholder="footerConfig.icpPlaceholder"
    />
    <button
      v-if="showBackToTop"
      class="fixed right-5 bottom-5 z-30 grid size-11 place-items-center rounded-full border border-slate-700 bg-surface/90 text-slate-200 shadow-xl backdrop-blur transition hover:-translate-y-0.5 hover:border-brand/70 hover:text-white"
      type="button"
      :aria-label="footerUi.backToTopLabel"
      @click="scrollToTop"
    >
      <FaIcon name="chevron-up" />
    </button>
  </div>
</template>
