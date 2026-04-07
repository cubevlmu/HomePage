import { computed } from 'vue'
import type { SiteConfig } from '../types/site'
import siteResource from '../resources/site.json'
import { localizeText } from './localize'

export const siteConfig = computed<SiteConfig>(() => ({
  title: localizeText(siteResource.title),
  description: localizeText(siteResource.description),
  language: localizeText(siteResource.language),
  role: localizeText(siteResource.role),
  profile: {
    login: siteResource.profile.login,
    displayName: siteResource.profile.displayName,
    avatar: siteResource.profile.avatar,
    profileUrl: siteResource.profile.profileUrl,
    company: siteResource.profile.company,
    bio: localizeText(siteResource.profile.bio),
  },
}))
