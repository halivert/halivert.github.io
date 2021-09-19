export function isInput(name: string): boolean {
  let compare = name.toLowerCase()
  return ["input", "textarea", "select"].includes(compare)
}

export function vibrate(pattern: number | number[]): boolean {
  return window.navigator.vibrate(pattern)
}
