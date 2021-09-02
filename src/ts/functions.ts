export function addClass(
  element: HTMLElement,
  name: string | string[]
): HTMLElement {
  if (!element) return

  if (typeof name === "string") {
    if (element.classList) {
      element.classList.add(name)
    } else {
      let arr = element.className.split(" ")
      if (arr.indexOf(name) === -1) element.className += " " + name
    }
  } else {
    name.forEach((className: string) => {
      addClass(element, className)
    })
  }

  return element
}

export function toggleClass(
  element: HTMLElement,
  className: string
): HTMLElement {
  if (element.classList) {
    element.classList.toggle(className)
  } else {
    let classes = element.className.split(" ")
    let i = classes.indexOf(className)

    if (i >= 0) {
      classes.splice(i, 1)
    } else {
      classes.push(className)
    }

    element.className = classes.join(" ")
  }

  return element
}

export function hasClass(element: HTMLElement, name: string): boolean {
  if (!element) return

  if (element.classList) {
    return element.classList.contains(name)
  } else {
    let classes = element.className.split(" ")
    let i = classes.indexOf(name)
    return i >= 0
  }
}

export function removeClass(element: HTMLElement, name: string): HTMLElement {
  if (!element) return

  if (element.classList) {
    element.classList.remove(name)
  } else {
    let classes = element.className.split(" ")
    let i = classes.indexOf(name)

    if (i >= 0) classes.splice(i, 1)
    element.className = classes.join(" ")
  }

  return element
}

export function isInput(name: string): boolean {
  let compare = name.toLowerCase()
  return ["input", "textarea", "select"].includes(compare)
}

export function vibrate(pattern: number | number[]): boolean {
  return window.navigator.vibrate(pattern)
}

export function initThemeSwitcher(element: HTMLElement): HTMLElement {
  if (!element) return

  const firstSpan = element.getElementsByTagName("span")[0]
  const icon = firstSpan.getElementsByTagName("i")[0]
  const isDark = hasClass(document.getElementById("app"), "dark")

  removeClass(icon, isDark ? "fa-moon" : "fa-sun")
  addClass(icon, isDark ? "fa-sun" : "fa-moon")
  removeClass(element, isDark ? "is-light" : "is-dark")
  addClass(element, isDark ? "is-dark" : "is-light")

  removeClass(element, "is-invisible")
  return element
}

export function setActive(menu: HTMLElement): HTMLElement {
  if (!menu) return

  const elements: NodeListOf<HTMLLinkElement> = menu.querySelectorAll("li > a")

  removeClass(menu.querySelector("li > .is-active"), "is-active")

  for (let i = 0; i < elements.length; i++) {
    let element: HTMLLinkElement = elements[i]
    if (window.location.href === element.href) {
      addClass(element, "is-active")
      return element
    }
  }
}

export function hideModal(target: HTMLElement): HTMLElement {
  if (!target) return

  const modal: HTMLElement = target.closest(".modal")
  if (!modal) return

  addClass(modal, "is-hidden")
  setActive(document.getElementById("side-menu"))
  return modal
}

export function setThemeWithMediaQuery(): [
  MediaQueryList,
  (media: MediaQueryList | MediaQueryListEvent) => any
] {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)")

  const fun = (prefersDark: MediaQueryList | MediaQueryListEvent) => {
    if (prefersDark.matches) document.documentElement.classList.add("dark")
    else document.documentElement.classList.remove("dark")
  }

  fun(prefersDark)

  return [prefersDark, fun]
}

declare global {
  interface Window {
    vibrate: Function
    hideModal: Function
  }
}

window.vibrate = vibrate
window.hideModal = hideModal
