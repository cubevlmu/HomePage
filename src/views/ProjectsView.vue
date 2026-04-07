<script setup lang="ts">
import PageLayout from '../components/layout/PageLayout.vue'
import ProjectSection from '../components/sections/ProjectSection.vue'
import { projectCollection } from '../data/projects'
</script>

<template>
  <PageLayout>
    <ProjectSection :config="projectCollection" />
  </PageLayout>
</template>
