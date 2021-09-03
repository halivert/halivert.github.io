import { setThemeWithMediaQuery } from "./functions"

const app: HTMLElement = document.documentElement
const themeSetted: string = localStorage.getItem("halivertsTheme")

if (themeSetted === null) {
  const [prefersDark, handleTheme] = setThemeWithMediaQuery()

  prefersDark.addEventListener("change", handleTheme)
} else if (themeSetted === "light") {
  app.classList.remove("dark")
  localStorage.halivertsTheme = "light"
} else {
  app.classList.add("dark")
  localStorage.halivertsTheme = "dark"
}
