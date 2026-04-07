export type NavItem = {
  label: string
  to: string
  icon: string
  external?: boolean
}

export type HeaderAction = {
  label: string
  href: string
  icon: string
  external?: boolean
}

export type NavigationConfig = {
  navItems: NavItem[]
  blogButton: HeaderAction
}
