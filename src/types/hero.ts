export type HeroAction = {
  label: string
  href: string
  variant: 'primary' | 'secondary' | 'ghost'
  icon: string
  external?: boolean
}

export type HeroConfig = {
  eyebrow: string
  title: string
  subtitle: string
  description: string
  actions: HeroAction[]
}
