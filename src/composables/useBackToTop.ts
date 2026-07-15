import { onBeforeUnmount, onMounted, ref } from 'vue'

export const useBackToTop = (threshold: () => number) => {
  const visible = ref(false)
  let frame = 0

  const update = () => {
    frame = 0
    visible.value = window.scrollY > threshold()
  }

  const scheduleUpdate = () => {
    if (!frame) frame = window.requestAnimationFrame(update)
  }

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  onMounted(() => {
    update()
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
  })

  onBeforeUnmount(() => {
    if (frame) window.cancelAnimationFrame(frame)
    window.removeEventListener('scroll', scheduleUpdate)
  })

  return { visible, scrollToTop }
}
