<script setup lang="ts">
import { onMounted, ref } from 'vue'
import AppLink from '../components/common/AppLink.vue'
import PageLayout from '../components/layout/PageLayout.vue'
import { heroConfig } from '../data/hero'
import { useLocalizedText } from '../data/localize'
import { navigationConfig } from '../data/navigation'
import { siteConfig } from '../data/site'
import uiResource from '../resources/ui.json'

interface HitokotoResponse {
  hitokoto: string
  from: string | null
  from_who: string | null
  type_desc: string | null
}

const quote = ref<HitokotoResponse | null>(null)
const isLoadingQuote = ref(true)

const hitokotoEyebrow = useLocalizedText(uiResource.homeView.hitokotoEyebrow)
const hitokotoLoading = useLocalizedText(uiResource.homeView.hitokotoLoading)
const hitokotoFallback = useLocalizedText(uiResource.homeView.hitokotoFallback)
const hitokotoSourcePrefix = useLocalizedText(uiResource.homeView.hitokotoSourcePrefix)
const hitokotoAuthorPrefix = useLocalizedText(uiResource.homeView.hitokotoAuthorPrefix)
const hitokotoTypePrefix = useLocalizedText(uiResource.homeView.hitokotoTypePrefix)

const loadHitokoto = async () => {
  try {
    const response = await fetch('https://api.furry.ist/hitokoto')

    if (!response.ok) {
      throw new Error(`Failed to fetch hitokoto: ${response.status}`)
    }

    quote.value = (await response.json()) as HitokotoResponse
  } catch {
    quote.value = null
  } finally {
    isLoadingQuote.value = false
  }
}

onMounted(() => {
  void loadHitokoto()
})
</script>

<template>
  <PageLayout>
    <section class="home-minimal">
      <p class="eyebrow">{{ heroConfig.eyebrow }}</p>
      <h1 class="home-minimal__title">{{ siteConfig.profile.displayName }}</h1>
      <p class="home-minimal__subtitle">{{ siteConfig.role }} · {{ siteConfig.profile.company }}</p>
      <p class="home-minimal__description">
        {{ heroConfig.description }}
      </p>
      <div class="home-minimal__actions">
        <AppLink v-for="item in navigationConfig.navItems" :key="item.to" class="home-minimal__nav" :to="item.to">
          {{ item.label }}
        </AppLink>
        <AppLink class="button button--secondary" :to="navigationConfig.blogButton.href" external>
          {{ navigationConfig.blogButton.label }}
        </AppLink>
      </div>

      <section class="home-hitokoto" aria-live="polite">
        <p class="eyebrow">{{ hitokotoEyebrow }}</p>
        <p v-if="isLoadingQuote" class="home-hitokoto__body">
          {{ hitokotoLoading }}
        </p>
        <template v-else-if="quote">
          <blockquote class="home-hitokoto__quote">
            {{ quote.hitokoto }}
          </blockquote>
          <div class="home-hitokoto__meta">
            <span v-if="quote.from">{{ hitokotoSourcePrefix }} · {{ quote.from }}</span>
            <span v-if="quote.from_who">{{ hitokotoAuthorPrefix }} · {{ quote.from_who }}</span>
            <span v-if="quote.type_desc">{{ hitokotoTypePrefix }} · {{ quote.type_desc }}</span>
          </div>
        </template>
        <p v-else class="home-hitokoto__body">
          {{ hitokotoFallback }}
        </p>
      </section>
    </section>
  </PageLayout>
</template>
