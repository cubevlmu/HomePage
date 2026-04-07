<script setup lang="ts">
import type { AboutConfig } from '../../types/about'
import BaseCard from '../common/BaseCard.vue'
import SectionHeader from '../common/SectionHeader.vue'

defineProps<{
  config: AboutConfig
}>()
</script>

<template>
  <section class="content-section" id="about">
    <SectionHeader
      :eyebrow="config.eyebrow"
      :title="config.title"
      :description="config.description"
    />
    <div class="about-grid">
      <BaseCard class-name="about-story">
        <p v-for="paragraph in config.story" :key="paragraph">
          {{ paragraph }}
        </p>
      </BaseCard>
      <div class="info-card-grid">
        <BaseCard v-for="item in config.cards" :key="item.title" class-name="info-card">
          <p class="info-card__label">{{ item.title }}</p>
          <h3>{{ item.value }}</h3>
          <p>{{ item.detail }}</p>
        </BaseCard>
      </div>
    </div>
  </section>
</template>
