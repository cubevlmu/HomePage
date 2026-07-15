<script setup lang="ts">
import MarkdownIt from 'markdown-it'
import { computed } from 'vue'
import { slugifyHeading } from '../../utils/markdown'

const props = withDefaults(
  defineProps<{
    content: string
    baseUrl?: string
    compact?: boolean
  }>(),
  { compact: false },
)

const md = new MarkdownIt({
  breaks: true,
  linkify: true,
  typographer: true,
})

md.renderer.rules.heading_open = (tokens, index, _options, _env, self) => {
  const titleToken = tokens[index + 1]
  const titleText = titleToken?.content ?? ''

  tokens[index].attrSet('id', slugifyHeading(titleText))
  return self.renderToken(tokens, index, _options)
}

const defaultImageRenderer = md.renderer.rules.image
const absoluteResourcePattern = /^(?:[a-z][a-z\d+.-]*:|\/\/|\/|#)/i

md.renderer.rules.image = (tokens, index, options, env, self) => {
  const source = tokens[index].attrGet('src')

  if (source && props.baseUrl && !absoluteResourcePattern.test(source)) {
    try {
      const base = new URL(props.baseUrl, window.location.origin)
      tokens[index].attrSet('src', new URL(source, base).href)
    } catch {
      // Keep the original source when malformed content cannot be resolved.
    }
  }

  return defaultImageRenderer
    ? defaultImageRenderer(tokens, index, options, env, self)
    : self.renderToken(tokens, index, options)
}

const renderedHtml = computed(() => md.render(props.content))
</script>

<template>
  <article
    class="prose prose-invert prose-slate max-w-none prose-headings:scroll-mt-24 prose-headings:font-display prose-a:text-brand-light prose-a:no-underline hover:prose-a:underline prose-img:rounded-2xl prose-img:border prose-img:border-slate-700 prose-code:text-brand-light prose-pre:border prose-pre:border-slate-700 prose-pre:bg-slate-950"
    :class="compact ? 'prose-sm sm:prose-base' : 'prose-base'"
    v-html="renderedHtml"
  ></article>
</template>
