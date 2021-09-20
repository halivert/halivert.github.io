import { createApp } from "petite-vue"
import { isInput, vibrate } from "./functions"
import { SearchModal, SearchResult } from "./search"

declare global {
  interface Window {
    Turbo: object
    keyDownListener: EventListener
    toggleSearchModal: Function
    vibrate: (pattern: number | number[]) => boolean
    idx: lunr.Index
    index: {
      [url: string]: Post
    }
    siteUrl: String
  }

  interface Post {
    id: string
    title: string
    categories: string[]
    tags: string[]
    author: string
    image_types: string
    image: string
    image_alt: string
    url: string
    date: string
    content: string
    continue: number
  }
}

interface SideMenuComponent {
  activeSearchModal: boolean
}

function modalKeyHandler(evt: KeyboardEvent): void {
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

const mountApp = () => {
  function toggleSearchModal(this: SideMenuComponent, force?: boolean): void {
    if (force != null) this.activeSearchModal = force
    else this.activeSearchModal = !this.activeSearchModal
  }

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

window.vibrate = vibrate

const event = window?.Turbo ? "turbo:load" : "DOMContentLoaded"
document.addEventListener(event, mountApp)
