<script setup lang="ts">
import AppLink from '../components/common/AppLink.vue'
import PageLayout from '../components/layout/PageLayout.vue'
import { useUiSection } from '../data/localize'

const ui = useUiSection('notFoundView')
</script>

<template>
  <PageLayout>
    <section class="mx-auto max-w-2xl py-20 text-center sm:py-28">
      <p class="font-mono text-xs font-semibold tracking-[0.2em] text-brand-light uppercase">404</p>
      <h1 class="mt-4 font-display text-4xl font-bold text-white sm:text-5xl">{{ ui.title }}</h1>
      <p class="mt-5 text-base leading-7 text-slate-400">{{ ui.description }}</p>
      <AppLink
        to="/"
        class="mt-8 inline-flex rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
      >
        {{ ui.backHome }}
      </AppLink>
    </section>
  </PageLayout>
</template>
