import { createApp, reactive } from "petite-vue"
import { setThemeWithMediaQuery, isInput } from "./functions"
import SearchModal from "./search"

declare global {
  interface Window {
    Turbo: object
    keyDownListener: EventListener
  }
}

function Menu() {
  return {
    activeMenuItem: window.location.href,
    itemIsActive(el: HTMLAnchorElement) {
      return this.activeMenuItem === el.href
    },
  }
}

function modalKeyHandler(evt: KeyboardEvent) {
  if (!document.getElementById("search-modal")) return

  if (!isInput((<HTMLElement>evt.target).nodeName)) {
    if (evt.key === "/") {
      evt.preventDefault()
      return this.toggleSearchModal(true)
    }
  }

  if (evt.key === "Escape" || evt.key === "Esc") {
    evt.preventDefault()
    return this.toggleSearchModal(false)
  }
}

const mountApp = () => {
  createApp({
    Menu,
    SearchModal,
    activeSearchModal: false,
    toggleSearchModal(force: boolean = null) {
      if (force != null) return (this.activeSearchModal = force)
      this.activeSearchModal = !this.activeSearchModal
    },
    mountSearchModal() {
      document.removeEventListener("keydown", window.keyDownListener)
      window.keyDownListener = modalKeyHandler.bind(this)
      document.addEventListener("keydown", window.keyDownListener)
    },
  }).mount("#side-menu-container")
}

const event = window?.Turbo ? "turbo:load" : "DOMContentLoaded"
document.addEventListener(event, mountApp)
