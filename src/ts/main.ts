import { createApp } from "petite-vue"
import { setThemeWithMediaQuery } from "./functions"

declare global {
  interface Window {
    Turbo: object
  }
}

const mountApp = () => {
  createApp({
    activeMenuItem: window.location.href,

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
  }).mount("#app")
}

if (window?.Turbo) document.addEventListener("turbo:load", mountApp)
else document.addEventListener("DOMContentLoaded", mountApp)
