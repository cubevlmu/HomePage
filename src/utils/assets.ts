const externalUrlPattern = /^(?:[a-z]+:)?\/\//i

export const resolvePublicAsset = (path: string) => {
  if (!path || externalUrlPattern.test(path) || path.startsWith('data:')) {
    return path
  }

  const base = import.meta.env.BASE_URL.endsWith('/')
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`

  return `${base}${path.replace(/^\/+/, '')}`
}
