<script setup lang="ts">
import MarkdownIt from 'markdown-it'
import { computed } from 'vue'
import { slugifyHeading } from '../../utils/markdown'

const props = defineProps<{
  content: string
}>()

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

const renderedHtml = computed(() => md.render(props.content))
</script>

<template>
  <article class="markdown-body" v-html="renderedHtml"></article>
</template>
