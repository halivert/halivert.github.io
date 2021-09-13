import { createApp } from "petite-vue"
import { isInput } from "./functions"
import { SearchModal, SearchResult } from "./search"

declare global {
  interface Window {
    Turbo: object
    keyDownListener: EventListener
    toggleSearchModal: Function
  }
}

function modalKeyHandler(evt: KeyboardEvent) {
  if (!document.getElementById("search-modal")) return

  if (!isInput((<HTMLElement>evt.target).nodeName)) {
    if (evt.key === "/") {
      evt.preventDefault()
      return window?.toggleSearchModal(true)
    }
  }

  if (evt.key === "Escape" || evt.key === "Esc") {
    evt.preventDefault()
    return window?.toggleSearchModal(false)
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

function toggleSearchModal(force: boolean = null) {
  if (force != null) this.activeSearchModal = force
  else this.activeSearchModal = !this.activeSearchModal
}

const mountApp = () => {
  createApp({
    Menu,
    SearchModal,
    SearchResult,
    activeSearchModal: false,
    searchInput: null,
    mountSearchModal() {
      window.toggleSearchModal = toggleSearchModal.bind(this)
      document.addEventListener("keydown", modalKeyHandler)
    },
  }).mount("#side-menu-container")
}

const event = window?.Turbo ? "turbo:load" : "DOMContentLoaded"
document.addEventListener(event, mountApp)
