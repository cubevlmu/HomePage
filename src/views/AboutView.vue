<script setup lang="ts">
import PageLayout from '../components/layout/PageLayout.vue'
import AboutSection from '../components/sections/AboutSection.vue'
import { aboutConfig } from '../data/about'
</script>

<template>
  <PageLayout>
    <AboutSection :config="aboutConfig" />
  </PageLayout>
</template>
