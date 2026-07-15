import { computed } from 'vue'
import type { SiteConfig } from '../types/site'
import { resolvePublicAsset } from '../utils/assets'
import { requireBaseData, requireLocaleData } from './runtime'

export const siteConfig = computed<SiteConfig>(() => {
  const base = requireBaseData()
  const localized = requireLocaleData()

  return {
    title: localized.site.title,
    description: localized.site.description,
    language: localized.site.language,
    role: localized.site.role,
    profile: {
      ...base.profile,
      avatar: resolvePublicAsset(base.profile.avatar),
      bio: localized.site.bio,
    },
  }
})
