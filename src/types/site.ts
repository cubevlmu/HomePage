export type ProfileInfo = {
  login: string
  displayName: string
  avatar: string
  profileUrl: string
  company: string
  bio: string
}

export type SiteConfig = {
  title: string
  description: string
  language: string
  role: string
  profile: ProfileInfo
}
