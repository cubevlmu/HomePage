<script setup lang="ts">
import { computed, ref } from 'vue'
import type { ContactConfig } from '../../types/contact'
import { useUiSection } from '../../data/localize'
import BaseCard from '../common/BaseCard.vue'
import ContactMethodCard from '../common/ContactMethodCard.vue'
import SectionHeader from '../common/SectionHeader.vue'

const props = defineProps<{
  config: ContactConfig
}>()

const ui = useUiSection('contactSection')

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
    errorMessage.value = ui.value.recipientMissing
    return
  }

  if (!trimmedName) {
    errorMessage.value = ui.value.nameRequired
    return
  }

  if (!trimmedEmail) {
    errorMessage.value = ui.value.emailRequired
    return
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
    errorMessage.value = ui.value.emailInvalid
    return
  }

  if (!trimmedMessage) {
    errorMessage.value = ui.value.messageRequired
    return
  }

  errorMessage.value = ''

  const subject = encodeURIComponent(`${ui.value.contactSubjectPrefix} ${trimmedName}`)
  const body = encodeURIComponent([
    `${ui.value.emailBodyNameLabel}: ${trimmedName}`,
    `${ui.value.emailBodyEmailLabel}: ${trimmedEmail}`,
    '',
    trimmedMessage,
  ].join('\n'))

  window.location.href = `mailto:${recipientEmail.value}?subject=${subject}&body=${body}`
}
</script>

<template>
  <section class="scroll-mt-24 grid gap-5 border-t border-slate-800 py-7 sm:gap-6 sm:py-9 lg:grid-cols-[0.9fr_1.1fr] lg:gap-8" id="contact" data-nav-section>
    <div>
      <SectionHeader
        :eyebrow="config.eyebrow"
        :title="config.title"
        :description="config.description"
      />
      <div class="mt-4 grid gap-2 sm:mt-6 sm:gap-3">
        <ContactMethodCard v-for="item in config.methods" :key="item.label" :item="item" />
      </div>
    </div>
    <BaseCard as="form" class-name="space-y-3 p-4 sm:space-y-4 sm:p-6" @submit.prevent="handleSubmit">
      <label class="block">
        <span class="mb-2 block text-sm font-medium text-slate-200">{{ ui.nameLabel }}</span>
        <input class="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-brand focus:ring-3 focus:ring-brand/15" v-model.trim="form.name" type="text" name="name" autocomplete="name" :placeholder="ui.namePlaceholder" />
      </label>
      <label class="block">
        <span class="mb-2 block text-sm font-medium text-slate-200">{{ ui.emailLabel }}</span>
        <input class="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-brand focus:ring-3 focus:ring-brand/15" v-model.trim="form.email" type="email" name="email" autocomplete="email" :placeholder="ui.emailPlaceholder" />
      </label>
      <label class="block">
        <span class="mb-2 block text-sm font-medium text-slate-200">{{ ui.messageLabel }}</span>
        <textarea class="w-full resize-y rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-brand focus:ring-3 focus:ring-brand/15" v-model.trim="form.message" name="message" rows="4" :placeholder="ui.messagePlaceholder"></textarea>
      </label>
      <p class="text-xs leading-5 text-slate-500">{{ ui.formHint }}</p>
      <p v-if="errorMessage" class="rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-300" role="alert">{{ errorMessage }}</p>
      <button class="inline-flex rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 focus:ring-3 focus:ring-brand/30 focus:outline-none" type="submit">{{ ui.formButtonLabel }}</button>
    </BaseCard>
  </section>
</template>
