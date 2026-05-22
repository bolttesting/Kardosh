import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { HERO_VIDEO } from '@/config/marketing'
import { resolveHeroPosterInstant } from '@/config/hero-poster'

import './assets/css/tailwind.css'
import { initTheme } from '@/composables/useTheme'
import { initLanguage } from '@/composables/useLanguage'

/** Prevent refresh from restoring mid-page scroll (e.g. homepage section 2) */
if (typeof window !== 'undefined') {
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual'
  }
  window.scrollTo(0, 0)
  initTheme()
  initLanguage()
}

function preloadHeroImage(href, priority = 'high') {
  if (!href) return
  if (!document.querySelector(`link[rel="preload"][href="${href}"]`)) {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'image'
    link.href = href
    document.head.appendChild(link)
  }
  const img = new Image()
  img.fetchPriority = priority
  img.src = href
}

/** Fetch instant frame + WebP poster before Vue mounts */
if (HERO_VIDEO.poster) {
  const instant = resolveHeroPosterInstant(HERO_VIDEO.poster)
  preloadHeroImage(instant, 'high')
  preloadHeroImage(HERO_VIDEO.poster, 'high')
}

const app = createApp(App)

app.use(router)

app.mount('#app')
