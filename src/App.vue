<script setup lang="ts">
import { watchEffect } from 'vue'
import { siteConfig } from './data/site'

watchEffect(() => {
  document.title = siteConfig.value.title;

  const metaDescription = document.querySelector('meta[name="description"]')
  if (metaDescription) {
    metaDescription.setAttribute('content', siteConfig.value.description)
  }
})
</script>

<template>
  <RouterView />
</template>
