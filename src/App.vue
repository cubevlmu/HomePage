<script setup lang="ts">
import { computed, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { aboutConfig } from './data/about'
import { contactConfig } from './data/contact'
import { getProjectBySlug, projectCollection } from './data/projects'
import { baseConfig } from './data/runtime'
import { siteConfig } from './data/site'

const route = useRoute()
const pageTitle = (title: string) => `${title}${baseConfig.value.seo.titleSeparator}${siteConfig.value.profile.displayName}`

const pageMetadata = computed(() => {
  if (route.name === 'project-detail') {
    const project = getProjectBySlug(String(route.params.slug ?? ''))

    if (project) {
      return {
        title: pageTitle(project.name),
        description: project.summary,
        image: project.cover || project.logo || siteConfig.value.profile.avatar,
        type: 'article',
      }
    }
  }

  if (route.name === 'not-found') {
    return {
      title: pageTitle('404'),
      description: siteConfig.value.description,
      image: siteConfig.value.profile.avatar,
      type: 'website',
    }
  }

  const sectionMetadata = {
    about: { title: aboutConfig.value.title, description: aboutConfig.value.description },
    projects: { title: projectCollection.value.title, description: projectCollection.value.description },
    contact: { title: contactConfig.value.title, description: contactConfig.value.description },
  } as const
  const section = route.hash.replace(/^#/, '') as keyof typeof sectionMetadata
  const currentSection = sectionMetadata[section]

  return {
    title: currentSection ? pageTitle(currentSection.title) : siteConfig.value.title,
    description: currentSection?.description ?? siteConfig.value.description,
    image: siteConfig.value.profile.avatar,
    type: 'website',
  }
})

const setMetaContent = (attribute: 'name' | 'property', key: string, content: string) => {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`)

  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }

  element.content = content
}

const setCanonicalUrl = () => {
  let element = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')

  if (!element) {
    element = document.createElement('link')
    element.rel = 'canonical'
    document.head.appendChild(element)
  }

  const base = import.meta.env.BASE_URL.replace(/\/$/, '')
  const routePath = route.path === '/' ? '/' : route.path
  element.href = `${window.location.origin}${base}${routePath}`
}

watchEffect(() => {
  const metadata = pageMetadata.value
  const absoluteImage = new URL(metadata.image, window.location.origin).href

  document.title = metadata.title
  setMetaContent('name', 'description', metadata.description)
  setMetaContent('property', 'og:title', metadata.title)
  setMetaContent('property', 'og:description', metadata.description)
  setMetaContent('property', 'og:type', metadata.type)
  setMetaContent('property', 'og:image', absoluteImage)
  setMetaContent('name', 'twitter:card', 'summary_large_image')
  setMetaContent('name', 'twitter:title', metadata.title)
  setMetaContent('name', 'twitter:description', metadata.description)
  setMetaContent('name', 'twitter:image', absoluteImage)
  setCanonicalUrl()
})
</script>

<template>
  <RouterView />
</template>
