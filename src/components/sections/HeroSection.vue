<script setup lang="ts">
import type { HeroConfig } from '../../types/hero'
import { useLocalizedText } from '../../data/localize'
import uiResource from '../../resources/ui.json'
import AppLink from '../common/AppLink.vue'
import FaIcon from '../common/FaIcon.vue'

defineProps<{
  config: HeroConfig
}>()

const projectCountLabel = useLocalizedText(uiResource.heroSection.projectCountLabel)
const focusLabel = useLocalizedText(uiResource.heroSection.focusLabel)
const focusValueTitle = useLocalizedText(uiResource.heroSection.focusValueTitle)
const focusValue = useLocalizedText(uiResource.heroSection.focusValue)
const goalLabel = useLocalizedText(uiResource.heroSection.goalLabel)
const goalValue = useLocalizedText(uiResource.heroSection.goalValue)
const focusPanelDescription = useLocalizedText(uiResource.heroSection.focusPanelDescription)
const structureLabel = useLocalizedText(uiResource.heroSection.structureLabel)
const structureValue = useLocalizedText(uiResource.heroSection.structureValue)
const structureDescription = useLocalizedText(uiResource.heroSection.structureDescription)
</script>

<template>
  <section class="hero-section" id="home">
    <div class="hero-copy">
      <p class="eyebrow">{{ config.eyebrow }}</p>
      <h1>{{ config.title }}</h1>
      <h2>{{ config.subtitle }}</h2>
      <p class="hero-description">{{ config.description }}</p>
      <div class="hero-actions">
        <AppLink
          v-for="action in config.actions"
          :key="action.label"
          class="button"
          :class="`button--${action.variant}`"
          :to="action.href"
          :external="action.external"
        >
          <FaIcon :name="action.icon" />
          <span>{{ action.label }}</span>
        </AppLink>
      </div>
      <dl class="hero-stats">
        <div>
          <dt>{{ projectCountLabel }}</dt>
          <dd>03+</dd>
        </div>
        <div>
          <dt>{{ focusLabel }}</dt>
          <dd>{{ focusValue }}</dd>
        </div>
        <div>
          <dt>{{ goalLabel }}</dt>
          <dd>{{ goalValue }}</dd>
        </div>
      </dl>
    </div>
    <div class="hero-visual" aria-hidden="true">
      <div class="visual-panel visual-panel--primary">
        <span class="visual-panel__label">{{ focusLabel }}</span>
        <strong>{{ focusValueTitle }}</strong>
        <p>{{ focusPanelDescription }}</p>
      </div>
      <div class="visual-panel visual-panel--secondary">
        <span class="visual-panel__label">{{ structureLabel }}</span>
        <strong>{{ structureValue }}</strong>
        <p>{{ structureDescription }}</p>
      </div>
      <div class="grid-orb grid-orb--one"></div>
      <div class="grid-orb grid-orb--two"></div>
    </div>
  </section>
</template>
