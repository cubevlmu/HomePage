<script setup lang="ts">
import { computed } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faArrowRight,
  faBars,
  faChevronUp,
  faEnvelope,
  faFolderOpen,
  faHouse,
  faPenNib,
  faUser,
  faXmark,
} from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

const props = defineProps<{
  name: string
}>()

const iconMap = {
  'arrow-right': faArrowRight,
  bars: faBars,
  'chevron-up': faChevronUp,
  envelope: faEnvelope,
  'folder-open': faFolderOpen,
  github: faGithub,
  house: faHouse,
  'pen-nib': faPenNib,
  user: faUser,
  xmark: faXmark,
} as const

const icon = computed(() => iconMap[props.name as keyof typeof iconMap] ?? faArrowRight)
</script>

<template>
  <FontAwesomeIcon :icon="icon" aria-hidden="true" />
</template>
