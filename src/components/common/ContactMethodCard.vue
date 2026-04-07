<script setup lang="ts">
import type { ContactMethod } from '../../types/contact'
import BaseCard from './BaseCard.vue'
import FaIcon from './FaIcon.vue'

defineProps<{
  item: ContactMethod
}>()
</script>

<template>
  <BaseCard as="a" class-name="contact-item" :href="item.href">
    <span class="contact-item__label contact-item__label-row">
      <FaIcon :name="item.icon" />
      <span>{{ item.label }}</span>
    </span>
    <strong>{{ item.value }}</strong>
  </BaseCard>
</template>
