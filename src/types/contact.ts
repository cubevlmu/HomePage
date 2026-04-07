export type ContactMethod = {
  label: string
  value: string
  href: string
  icon: string
}

export type ContactConfig = {
  eyebrow: string
  title: string
  description: string
  methods: ContactMethod[]
}
