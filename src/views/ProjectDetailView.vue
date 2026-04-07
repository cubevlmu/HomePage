<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AppLink from '../components/common/AppLink.vue'
import MarkdownRenderer from '../components/common/MarkdownRenderer.vue'
import PageLayout from '../components/layout/PageLayout.vue'
import { localizeText, useLocalizedText } from '../data/localize'
import { getProjectBySlug, getRelatedProjects } from '../data/projects'
import uiResource from '../resources/ui.json'
import type { ProjectLinkKey } from '../types/project'
import { extractToc } from '../utils/markdown'

const route = useRoute()
const project = computed(() => getProjectBySlug(route.params.slug as string))
const relatedProjects = computed(() => (project.value ? getRelatedProjects(project.value.slug) : []))
const tocItems = computed(() => (project.value?.toc ? extractToc(project.value.content) : []))

const backToProjectsLabel = useLocalizedText(uiResource.projectDetailView.backToProjectsLabel)
const backToHomeLabel = useLocalizedText(uiResource.projectDetailView.backToHomeLabel)
const projectListLabel = useLocalizedText(uiResource.projectDetailView.projectListLabel)
const statusLabel = useLocalizedText(uiResource.projectDetailView.statusLabel)
const platformLabel = useLocalizedText(uiResource.projectDetailView.platformLabel)
const yearLabel = useLocalizedText(uiResource.projectDetailView.yearLabel)
const techStackLabel = useLocalizedText(uiResource.projectDetailView.techStackLabel)
const linksLabel = useLocalizedText(uiResource.projectDetailView.linksLabel)
const authorsLabel = useLocalizedText(uiResource.projectDetailView.authorsLabel)
const overviewTitle = useLocalizedText(uiResource.projectDetailView.overviewTitle)
const highlightsTitle = useLocalizedText(uiResource.projectDetailView.highlightsTitle)
const galleryTitle = useLocalizedText(uiResource.projectDetailView.galleryTitle)
const contentTitle = useLocalizedText(uiResource.projectDetailView.contentTitle)
const relatedTitle = useLocalizedText(uiResource.projectDetailView.relatedTitle)
const tocLabel = useLocalizedText(uiResource.projectDetailView.tocLabel)
const metadataLabel = useLocalizedText(uiResource.projectDetailView.metadataLabel)
const licenseLabel = useLocalizedText(uiResource.projectDetailView.licenseLabel)
const repositoryLabel = useLocalizedText(uiResource.projectDetailView.repositoryLabel)
const releaseLabel = useLocalizedText(uiResource.projectDetailView.releaseLabel)
const startedAtLabel = useLocalizedText(uiResource.projectDetailView.startedAtLabel)
const updatedAtLabel = useLocalizedText(uiResource.projectDetailView.updatedAtLabel)
const noScreenshotsLabel = useLocalizedText(uiResource.projectDetailView.noScreenshotsLabel)
const noTocLabel = useLocalizedText(uiResource.projectDetailView.noTocLabel)
const projectMissingTitle = useLocalizedText(uiResource.projectDetailView.projectMissingTitle)
const projectMissingDescription = useLocalizedText(uiResource.projectDetailView.projectMissingDescription)

const linkLabelMap = {
  github: uiResource.projectLinks.github,
  demo: uiResource.projectLinks.demo,
  blog: uiResource.projectLinks.blog,
  download: uiResource.projectLinks.download,
  docs: uiResource.projectLinks.docs,
} satisfies Record<ProjectLinkKey, { en: string; zh: string }>

const projectLinks = computed(() => {
  if (!project.value) {
    return []
  }

  return Object.entries(project.value.links)
    .filter((entry): entry is [ProjectLinkKey, string] => Boolean(entry[1]))
    .map(([key, href]) => ({
      key,
      href,
      label: localizeText(linkLabelMap[key]),
      external: href.startsWith('http'),
    }))
})

const overviewItems = computed(() =>
  project.value
    ? [
        { label: statusLabel.value, value: project.value.status },
        { label: yearLabel.value, value: project.value.year },
        { label: platformLabel.value, value: project.value.platforms.join(' / ') },
        { label: releaseLabel.value, value: project.value.metadata.release || '-' },
        { label: licenseLabel.value, value: project.value.metadata.license || '-' },
        { label: repositoryLabel.value, value: project.value.metadata.repository || '-' },
      ]
    : [],
)

const metadataItems = computed(() =>
  project.value
    ? [
        { label: licenseLabel.value, value: project.value.metadata.license },
        { label: repositoryLabel.value, value: project.value.metadata.repository },
        { label: releaseLabel.value, value: project.value.metadata.release },
        { label: startedAtLabel.value, value: project.value.metadata.startedAt },
        { label: updatedAtLabel.value, value: project.value.metadata.updatedAt },
      ].filter((item): item is { label: string; value: string } => Boolean(item.value))
    : [],
)
</script>

<template>
  <PageLayout>
    <section v-if="project" class="content-section project-detail-shell">
      <div class="project-breadcrumbs">
        <div class="project-breadcrumbs__path">
          <AppLink to="/" class="project-breadcrumbs__link">{{ backToHomeLabel }}</AppLink>
          <span>/</span>
          <AppLink to="/projects" class="project-breadcrumbs__link">{{ projectListLabel }}</AppLink>
          <span>/</span>
          <span>{{ project.name }}</span>
        </div>
        <div class="project-breadcrumbs__actions">
          <AppLink to="/projects" class="project-breadcrumbs__link">{{ backToProjectsLabel }}</AppLink>
          <AppLink
            v-for="link in projectLinks.slice(0, 2)"
            :key="link.key"
            :to="link.href"
            :external="link.external"
            class="project-breadcrumbs__link"
          >
            {{ link.label }}
          </AppLink>
        </div>
      </div>

      <section class="project-hero" :style="{ '--project-accent': project.themeColor || 'var(--primary)' }">
        <div class="project-hero__copy">
          <div class="project-hero__identity">
            <div v-if="project.logo" class="project-hero__logo-wrap">
              <img class="project-hero__logo" :src="project.logo" :alt="`${project.name} logo`" />
            </div>
            <div v-else class="project-hero__logo-wrap project-hero__logo-wrap--fallback">
              <span>{{ project.name.slice(0, 2) }}</span>
            </div>
            <div>
              <span class="status-pill">{{ project.status }}</span>
              <h1 class="project-hero__title">{{ project.name }}</h1>
              <p class="project-hero__subtitle">{{ project.subtitle }}</p>
            </div>
          </div>
          <p class="project-hero__summary">{{ project.summary }}</p>
          <p class="project-hero__description">{{ project.description }}</p>
          <div class="tag-row">
            <span v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>
          <div class="project-hero__actions">
            <AppLink v-for="link in projectLinks" :key="link.key" :to="link.href" :external="link.external" class="button button--primary">
              {{ link.label }}
            </AppLink>
          </div>
        </div>
        <div class="project-hero__visual">
          <img v-if="project.cover" class="project-hero__cover" :src="project.cover" :alt="`${project.name} cover`" />
          <div v-else class="project-hero__cover project-hero__cover--fallback">
            <strong>{{ project.name }}</strong>
            <span>{{ project.subtitle }}</span>
          </div>
        </div>
      </section>

      <section class="project-overview">
        <div class="section-heading">
          <p class="eyebrow">{{ overviewTitle }}</p>
        </div>
        <div class="project-overview__grid">
          <article v-for="item in overviewItems" :key="item.label" class="project-overview__card">
            <span class="info-card__label">{{ item.label }}</span>
            <strong>{{ item.value }}</strong>
          </article>
        </div>
      </section>

      <section class="project-highlights">
        <div class="section-heading">
          <p class="eyebrow">{{ highlightsTitle }}</p>
        </div>
        <div class="project-highlights__grid">
          <article v-for="highlight in project.highlights" :key="highlight" class="project-highlight-card">
            <span class="project-highlight-card__marker"></span>
            <p>{{ highlight }}</p>
          </article>
        </div>
      </section>

      <section class="project-gallery">
        <div class="section-heading">
          <p class="eyebrow">{{ galleryTitle }}</p>
        </div>
        <div v-if="project.screenshots.length" class="project-gallery__grid">
          <article v-for="shot in project.screenshots" :key="`${shot.title}-${shot.description}`" class="project-gallery__card">
            <img v-if="shot.src" :src="shot.src" :alt="shot.title" class="project-gallery__image" />
            <div v-else class="project-gallery__image project-gallery__image--fallback">
              <span>{{ shot.title }}</span>
            </div>
            <strong>{{ shot.title }}</strong>
            <p>{{ shot.description }}</p>
          </article>
        </div>
        <p v-else class="project-gallery__empty">{{ noScreenshotsLabel }}</p>
      </section>

      <section class="project-reading">
        <div class="project-reading__main">
          <div class="section-heading">
            <p class="eyebrow">{{ contentTitle }}</p>
          </div>
          <article class="project-reading__article">
            <MarkdownRenderer :content="project.content" />
          </article>
        </div>
        <aside class="project-reading__sidebar">
          <section class="project-sidecard">
            <p class="info-card__label">{{ metadataLabel }}</p>
            <dl class="project-sidecard__list">
              <div v-for="item in metadataItems" :key="item.label">
                <dt>{{ item.label }}</dt>
                <dd>{{ item.value }}</dd>
              </div>
            </dl>
          </section>
          <section class="project-sidecard">
            <p class="info-card__label">{{ authorsLabel }}</p>
            <div class="project-authors">
              <div v-for="author in project.authors" :key="author.name" class="project-author">
                <strong>{{ author.name }}</strong>
                <span>{{ author.role }}</span>
              </div>
            </div>
          </section>
          <section class="project-sidecard">
            <p class="info-card__label">{{ techStackLabel }}</p>
            <div class="tag-row">
              <span v-for="item in project.techStack" :key="item" class="tag">{{ item }}</span>
            </div>
          </section>
          <section class="project-sidecard">
            <p class="info-card__label">{{ linksLabel }}</p>
            <div class="project-sidecard__links">
              <AppLink v-for="link in projectLinks" :key="link.key" :to="link.href" :external="link.external" class="project-sidecard__link">
                {{ link.label }}
              </AppLink>
            </div>
          </section>
          <section class="project-sidecard">
            <p class="info-card__label">{{ tocLabel }}</p>
            <nav v-if="tocItems.length" class="project-toc">
              <a v-for="item in tocItems" :key="item.id" :href="`#${item.id}`" class="project-toc__link" :class="`project-toc__link--level-${item.level}`">
                {{ item.text }}
              </a>
            </nav>
            <p v-else class="project-toc__empty">{{ noTocLabel }}</p>
          </section>
        </aside>
      </section>

      <section class="project-related">
        <div class="section-heading">
          <p class="eyebrow">{{ relatedTitle }}</p>
        </div>
        <div class="project-related__grid">
          <AppLink v-for="item in relatedProjects" :key="item.slug" :to="`/projects/${item.slug}`" class="project-related__card">
            <strong>{{ item.name }}</strong>
            <span>{{ item.subtitle }}</span>
            <p>{{ item.summary }}</p>
          </AppLink>
        </div>
      </section>
    </section>

    <section v-else class="content-section project-detail-shell">
      <div class="section-heading">
        <p class="eyebrow">{{ projectMissingTitle }}</p>
        <h2>{{ projectMissingTitle }}</h2>
        <p>{{ projectMissingDescription }}</p>
      </div>
      <AppLink to="/projects" class="button button--primary">{{ backToProjectsLabel }}</AppLink>
    </section>
  </PageLayout>
</template>
