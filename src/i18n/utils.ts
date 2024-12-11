import { ui, defaultLang, showDefaultLang } from "./ui"

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split("/")
  if (lang in ui) return lang as keyof typeof ui
  return defaultLang
}

function stringInLang(
  lang: keyof typeof ui,
  key: string,
): key is keyof (typeof ui)[typeof lang] {
  if (key in ui[lang]) return true
  return false
}

function getString(lang: keyof typeof ui, key: string): string {
  if (stringInLang(lang, key)) return ui[lang][key]
  if (stringInLang(defaultLang, key)) return ui[defaultLang][key]
  return key
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(
    key: string,
    replace: Record<string, string> | string[] = [],
  ) {
    return Object.entries(replace).reduce<string>(
      (result, [key, value]) => result.replaceAll(`:${key}`, value),
      getString(lang, key),
    )
  }
}

export function useTranslatedPath(lang: keyof typeof ui) {
  return function translatePath(path: string, l: string = lang) {
    return !showDefaultLang && l === defaultLang ? path : `/${l}${path}`
  }
}
