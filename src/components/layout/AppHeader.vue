<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from 'vue'
import type { HeaderAction, NavItem } from '../../types/navigation'
import type { ProfileInfo } from '../../types/site'
import { useSectionNavigation } from '../../composables/useSectionNavigation'
import { useUiSection } from '../../data/localize'
import AppLink from '../common/AppLink.vue'
import FaIcon from '../common/FaIcon.vue'
import AppNavigation from './AppNavigation.vue'

defineProps<{
  profile: ProfileInfo
  nav: readonly NavItem[]
  cta?: HeaderAction
}>()

const ui = useUiSection('appHeader')
const menuOpen = ref(false)

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}

const closeMenu = () => {
  menuOpen.value = false
}

const activeTarget = useSectionNavigation(closeMenu)

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

onBeforeUnmount(() => {
  document.body.classList.remove('menu-open')
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <header class="sticky top-0 z-40 -mx-3 flex items-center justify-between gap-4 border-b border-slate-700/60 bg-slate-950/55 px-3 py-2.5 shadow-lg shadow-slate-950/20 backdrop-blur-2xl backdrop-saturate-150 supports-[backdrop-filter]:bg-slate-950/45 sm:-mx-6 sm:px-6 sm:py-3 lg:mx-0 lg:mt-3 lg:rounded-2xl lg:border lg:px-4">
    <div class="flex min-w-0 items-center gap-1.5">
      <slot name="before-brand" />
      <AppLink
        class="truncate rounded-lg px-2 py-1 font-display text-sm font-bold tracking-wide text-white transition hover:text-brand-light focus-visible:ring-2 focus-visible:ring-brand-light focus-visible:outline-none"
        to="/"
        :aria-label="ui.brandHomeLabel"
      >
        {{ profile.displayName }}
      </AppLink>
    </div>
    <AppNavigation :nav="nav" :cta="cta" :active-target="activeTarget" :aria-label="ui.navAriaLabel" />
    <button
      class="grid size-10 place-items-center rounded-xl border border-slate-700 text-slate-200 transition hover:bg-surface-elevated focus-visible:ring-2 focus-visible:ring-brand-light focus-visible:outline-none md:hidden"
      type="button"
      :aria-label="ui.menuToggleLabel"
      :aria-expanded="menuOpen"
      @click="toggleMenu"
    >
      <FaIcon :name="menuOpen ? 'xmark' : 'bars'" />
    </button>
  </header>
  <Teleport to="body">
    <Transition name="nav-backdrop">
      <button v-if="menuOpen" class="fixed inset-0 z-50 bg-slate-950/60" type="button" :aria-label="ui.menuCloseLabel" @click="closeMenu" />
    </Transition>
    <Transition name="mobile-drawer">
      <aside v-if="menuOpen" class="fixed inset-y-0 right-0 z-50 flex w-[min(19rem,88vw)] flex-col overflow-y-auto border-l border-slate-700 bg-surface p-4 shadow-2xl" :aria-label="ui.navAriaLabel" aria-modal="true" role="dialog">
        <div class="flex items-center justify-between border-b border-slate-800 px-1 pb-4 pt-[max(0.25rem,env(safe-area-inset-top))]">
          <span class="font-display font-semibold text-white">{{ ui.navAriaLabel }}</span>
          <button class="grid size-9 place-items-center rounded-lg text-slate-300 transition hover:bg-surface-elevated hover:text-white" type="button" :aria-label="ui.menuCloseLabel" @click="closeMenu">
            <FaIcon name="xmark" />
          </button>
        </div>
        <AppNavigation mobile :nav="nav" :cta="cta" :active-target="activeTarget" :aria-label="ui.navAriaLabel" @navigate="closeMenu" />
      </aside>
    </Transition>
  </Teleport>
</template>
