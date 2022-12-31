export function isInput(name: string): boolean {
  const compare = name.toLowerCase()
  return ["input", "textarea", "select"].includes(compare)
}

export function vibrate(pattern: number | number[]): boolean {
  return window.navigator.vibrate(pattern)
}

export function urlBuilder(
  baseUrl: string,
  queryParameters: Record<string, string | undefined | null>
): URL {
  const result = new URL(baseUrl)

  Object.entries(queryParameters).forEach(([key, value]) => {
    if (value) result.searchParams.append(key, value)
  })

  return result
}
