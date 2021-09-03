import { createApp } from "petite-vue"
import { setThemeWithMediaQuery } from "./functions"

declare global {
  interface Window {
    Turbo: object
  }
}

function Menu() {
  return {
    activeMenuItem: window.location.href,
  }
}

function ThemeSwitcher() {
  return {
    resettingTheme: false,
    toggleTheme: () => {
      const isDark = document.documentElement.classList.toggle("dark")
      localStorage.setItem("halivertsTheme", isDark ? "dark" : "light")
    },
    resetSystemDefaultTheme() {
      localStorage.removeItem("halivertsTheme")
      this.resettingTheme = true
      setTimeout(() => {
        setThemeWithMediaQuery()
        this.resettingTheme = false
      }, 1000)
    },
  }
}

const mountApp = () => {
  createApp({ Menu }).mount(".menu")
  createApp({ ThemeSwitcher }).mount("#theme-switcher")
}

const event = window?.Turbo ? "turbo:load" : "DOMContentLoaded"
document.addEventListener(event, mountApp)
