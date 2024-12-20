import type { languages } from "@/i18n/ui"

export function isInput(name: string): boolean {
  const compare = name.toLowerCase()
  return ["input", "textarea", "select"].includes(compare)
}

export function vibrate(pattern: number | number[]): boolean {
  return window.navigator.vibrate(pattern)
}

export function urlBuilder(
  baseUrl: string,
  queryParameters: Record<string, string | undefined | null>,
): URL {
  const result = new URL(baseUrl)

  Object.entries(queryParameters).forEach(([key, value]) => {
    if (value) result.searchParams.append(key, value)
  })

  return result
}

export function postReadableDate(lang: typeof languages[number], date: Date) {
  const dateParts = new Intl.DateTimeFormat(lang, {
    month: "long",
    day: "2-digit",
    year: "numeric",
  }).formatToParts(date)

  const month = dateParts.find(({ type }) => type === "month")?.value
  const day = dateParts.find(({ type }) => type === "day")?.value
  const year = dateParts.find(({ type }) => type === "year")?.value

  return `${month} ${day}, ${year}`
}

export function getPostUrl(post: {
  id: string
  data: { date: Date }
}): [string, string, string] {
  const year = post.data.date.getFullYear().toString()
  const month = (post.data.date.getMonth() + 1).toString().padStart(2, "0")
  const slug = post.id.split(/\d{4}-\d{2}-\d{2}-/)[1]

  return [year, month, slug]
}
