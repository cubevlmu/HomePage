import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

export const useSectionNavigation = (onRouteChange?: () => void) => {
  const route = useRoute()
  const activeSection = ref('home')
  let sections: HTMLElement[] = []
  let frame = 0

  const update = () => {
    frame = 0
    if (route.path !== '/' || !sections.length) return

    const activationLine = Math.min(160, window.innerHeight * 0.28)
    let current = sections[0]?.id || 'home'

    for (const section of sections) {
      if (section.getBoundingClientRect().top <= activationLine) current = section.id
    }

    activeSection.value = current
    const nextHash = `#${current}`

    if (window.location.hash !== nextHash) {
      window.history.replaceState(window.history.state, '', `${window.location.pathname}${window.location.search}${nextHash}`)
    }
  }

  const scheduleUpdate = () => {
    if (!frame) frame = window.requestAnimationFrame(update)
  }

  const refresh = () => {
    sections = Array.from(document.querySelectorAll<HTMLElement>('[data-nav-section]'))
    update()
  }

  watch(
    () => route.fullPath,
    () => {
      onRouteChange?.()
      window.requestAnimationFrame(refresh)
    },
  )

  onMounted(() => {
    refresh()
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)
  })

  onBeforeUnmount(() => {
    if (frame) window.cancelAnimationFrame(frame)
    window.removeEventListener('scroll', scheduleUpdate)
    window.removeEventListener('resize', scheduleUpdate)
  })

  return computed(() => route.path === '/' ? `/#${activeSection.value}` : '')
}
