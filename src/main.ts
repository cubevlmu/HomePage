import { createApp } from 'vue'
import App from './App.vue'
import { loadRuntimeData } from './data/runtime'
import { router } from './router'
import './style.css'

const mountApp = async () => {
  try {
    await loadRuntimeData()
    createApp(App).use(router).mount('#app')
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    const container = document.querySelector<HTMLElement>('#app')

    if (container) {
      const main = document.createElement('main')
      const title = document.createElement('h1')
      const description = document.createElement('p')
      const details = document.createElement('pre')

      main.style.cssText = 'max-width:720px;margin:12vh auto;padding:24px;font-family:sans-serif;color:#e2e8f0'
      title.style.fontSize = '28px'
      title.textContent = 'Unable to load site data'
      description.style.cssText = 'line-height:1.7;color:#94a3b8'
      description.textContent = 'Check the files under data/ and reload the page.'
      details.style.cssText = 'overflow:auto;padding:16px;border-radius:12px;background:#0f172a'
      details.textContent = message
      main.append(title, description, details)
      container.replaceChildren(main)
    }

    console.error(error)
  }
}

void mountApp()
