<script setup lang="ts">
import PageLayout from '../components/layout/PageLayout.vue'
import ContactSection from '../components/sections/ContactSection.vue'
import { contactConfig } from '../data/contact'
</script>

<template>
  <PageLayout>
    <ContactSection :config="contactConfig" />
  </PageLayout>
</template>
