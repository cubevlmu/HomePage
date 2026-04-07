<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import type { HeaderAction, NavItem } from '../../types/navigation'
import type { ProfileInfo } from '../../types/site'
import { useLocalizedText } from '../../data/localize'
import uiResource from '../../resources/ui.json'
import AppLink from '../common/AppLink.vue'
import FaIcon from '../common/FaIcon.vue'

const props = defineProps<{
  profile: ProfileInfo
  nav: readonly NavItem[]
  cta?: HeaderAction
}>()

const githubAriaLabel = useLocalizedText(uiResource.appHeader.githubAriaLabel)
const navAriaLabel = useLocalizedText(uiResource.appHeader.navAriaLabel)
const menuToggleLabel = useLocalizedText(uiResource.appHeader.menuToggleLabel)
const menuCloseLabel = useLocalizedText(uiResource.appHeader.menuCloseLabel)
const menuOpen = ref(false)
const route = useRoute()

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}

const closeMenu = () => {
  menuOpen.value = false
}

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    closeMenu()
  }
}

watch(menuOpen, (isOpen) => {
  document.body.classList.toggle('menu-open', isOpen)

  if (isOpen) {
    window.addEventListener('keydown', handleKeydown)
    return
  }

  window.removeEventListener('keydown', handleKeydown)
})

watch(() => route.fullPath, closeMenu)

onBeforeUnmount(() => {
  document.body.classList.remove('menu-open')
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <header class="site-header">
    <a class="brand brand--avatar-only" :href="profile.profileUrl" :aria-label="githubAriaLabel" target="_blank" rel="noreferrer">
      <img class="brand__avatar-image" :src="profile.avatar" :alt="`${profile.displayName} avatar`" />
    </a>
    <nav class="site-nav site-nav--desktop" :aria-label="navAriaLabel">
      <AppLink
        v-for="item in nav"
        :key="item.to"
        class="nav-link"
        :to="item.to"
        :external="item.external"
      >
        <FaIcon :name="item.icon" />
        <span>{{ item.label }}</span>
      </AppLink>
      <AppLink
        v-if="cta"
        class="button button--primary site-header__cta"
        :to="cta.href"
        :external="cta.external"
      >
        <FaIcon :name="cta.icon" />
        <span>{{ cta.label }}</span>
      </AppLink>
    </nav>
    <button class="menu-toggle" type="button" :aria-label="menuToggleLabel" :aria-expanded="menuOpen" @click="toggleMenu">
      <FaIcon :name="menuOpen ? 'xmark' : 'bars'" />
    </button>
  </header>
  <Teleport to="body">
    <Transition name="nav-backdrop">
      <button v-if="menuOpen" class="site-nav-backdrop" type="button" :aria-label="menuCloseLabel" @click="closeMenu" />
    </Transition>
    <Transition name="mobile-drawer">
      <aside v-if="menuOpen" class="mobile-drawer" :aria-label="navAriaLabel">
        <div class="mobile-drawer__header">
          <span class="mobile-drawer__title">{{ navAriaLabel }}</span>
          <button class="mobile-drawer__close" type="button" :aria-label="menuCloseLabel" @click="closeMenu">
            <FaIcon name="xmark" />
          </button>
        </div>
        <nav class="mobile-drawer__nav" :aria-label="navAriaLabel">
          <AppLink
            v-for="item in nav"
            :key="`mobile-${item.to}`"
            class="mobile-drawer__link"
            :to="item.to"
            :external="item.external"
            @click="closeMenu"
          >
            <FaIcon :name="item.icon" />
            <span>{{ item.label }}</span>
          </AppLink>
          <AppLink
            v-if="cta"
            class="mobile-drawer__link mobile-drawer__link--primary"
            :to="cta.href"
            :external="cta.external"
            @click="closeMenu"
          >
            <FaIcon :name="cta.icon" />
            <span>{{ cta.label }}</span>
          </AppLink>
        </nav>
      </aside>
    </Transition>
  </Teleport>
</template>
