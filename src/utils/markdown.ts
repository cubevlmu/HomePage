export type TocItem = {
  id: string
  text: string
  level: number
}

export const slugifyHeading = (text: string) =>
  text
    .trim()
    .toLowerCase()
    .replace(/[`~!@#$%^&*()+=<>?,./:;"'|[\]{}]/g, '')
    .replace(/\s+/g, '-')

export const extractToc = (content: string) =>
  content
    .split('\n')
    .map((line) => line.match(/^(#{1,3})\s+(.+)$/))
    .filter((match): match is RegExpMatchArray => Boolean(match))
    .map((match) => ({
      level: match[1].length,
      text: match[2].trim(),
      id: slugifyHeading(match[2]),
    }))
