<script setup lang="ts">
import { computed, ref } from 'vue'
import type { ContactConfig } from '../../types/contact'
import { useLocalizedText } from '../../data/localize'
import uiResource from '../../resources/ui.json'
import BaseCard from '../common/BaseCard.vue'
import ContactMethodCard from '../common/ContactMethodCard.vue'
import SectionHeader from '../common/SectionHeader.vue'

const props = defineProps<{
  config: ContactConfig
}>()

const nameLabel = useLocalizedText(uiResource.contactSection.nameLabel)
const namePlaceholder = useLocalizedText(uiResource.contactSection.namePlaceholder)
const emailLabel = useLocalizedText(uiResource.contactSection.emailLabel)
const emailPlaceholder = useLocalizedText(uiResource.contactSection.emailPlaceholder)
const messageLabel = useLocalizedText(uiResource.contactSection.messageLabel)
const messagePlaceholder = useLocalizedText(uiResource.contactSection.messagePlaceholder)
const formButtonLabel = useLocalizedText(uiResource.contactSection.formButtonLabel)
const formHint = useLocalizedText(uiResource.contactSection.formHint)
const nameRequired = useLocalizedText(uiResource.contactSection.nameRequired)
const emailRequired = useLocalizedText(uiResource.contactSection.emailRequired)
const emailInvalid = useLocalizedText(uiResource.contactSection.emailInvalid)
const messageRequired = useLocalizedText(uiResource.contactSection.messageRequired)
const recipientMissing = useLocalizedText(uiResource.contactSection.recipientMissing)

const form = ref({
  name: '',
  email: '',
  message: '',
})

const errorMessage = ref('')

const recipientEmail = computed(() => {
  const emailMethod = props.config.methods.find((method) => method.href.startsWith('mailto:'))
  return emailMethod?.href.replace(/^mailto:/, '') ?? ''
})

const handleSubmit = () => {
  const trimmedName = form.value.name.trim()
  const trimmedEmail = form.value.email.trim()
  const trimmedMessage = form.value.message.trim()

  if (!recipientEmail.value) {
    errorMessage.value = recipientMissing.value
    return
  }

  if (!trimmedName) {
    errorMessage.value = nameRequired.value
    return
  }

  if (!trimmedEmail) {
    errorMessage.value = emailRequired.value
    return
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
    errorMessage.value = emailInvalid.value
    return
  }

  if (!trimmedMessage) {
    errorMessage.value = messageRequired.value
    return
  }

  errorMessage.value = ''

  const subject = encodeURIComponent(`Website contact from ${trimmedName}`)
  const body = encodeURIComponent([
    `Name: ${trimmedName}`,
    `Email: ${trimmedEmail}`,
    '',
    trimmedMessage,
  ].join('\n'))

  window.location.href = `mailto:${recipientEmail.value}?subject=${subject}&body=${body}`
}
</script>

<template>
  <section class="contact-section" id="contact">
    <div class="contact-copy">
      <SectionHeader
        :eyebrow="config.eyebrow"
        :title="config.title"
        :description="config.description"
      />
      <div class="contact-list">
        <ContactMethodCard v-for="item in config.methods" :key="item.label" :item="item" />
      </div>
    </div>
    <BaseCard as="form" class-name="contact-card" @submit.prevent="handleSubmit">
      <label>
        <span>{{ nameLabel }}</span>
        <input v-model.trim="form.name" type="text" name="name" autocomplete="name" :placeholder="namePlaceholder" />
      </label>
      <label>
        <span>{{ emailLabel }}</span>
        <input v-model.trim="form.email" type="email" name="email" autocomplete="email" :placeholder="emailPlaceholder" />
      </label>
      <label>
        <span>{{ messageLabel }}</span>
        <textarea v-model.trim="form.message" name="message" rows="5" :placeholder="messagePlaceholder"></textarea>
      </label>
      <p class="contact-card__hint">{{ formHint }}</p>
      <p v-if="errorMessage" class="contact-card__error" role="alert">{{ errorMessage }}</p>
      <button class="button button--primary" type="submit">{{ formButtonLabel }}</button>
    </BaseCard>
  </section>
</template>
