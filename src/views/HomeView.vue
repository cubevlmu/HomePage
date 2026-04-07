<script setup lang="ts">
import AppLink from '../components/common/AppLink.vue'
import PageLayout from '../components/layout/PageLayout.vue'
import { heroConfig } from '../data/hero'
import { navigationConfig } from '../data/navigation'
import { siteConfig } from '../data/site'
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
    </section>
  </PageLayout>
</template>
