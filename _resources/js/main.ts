import {
  initThemeSwitcher,
  setTheme,
  hideModal,
  setActive,
} from "./functions"

setTheme()

document.addEventListener("turbo:load", () => {
  initThemeSwitcher(document.getElementById("theme-switcher"))
  initThemeSwitcher(document.getElementById("theme-switcher-corner"))

  const deletes = document.querySelectorAll(".notification .delete") || []

  deletes.forEach((deleteElement: HTMLElement) => {
    let notification: HTMLElement = deleteElement.parentElement
    deleteElement.addEventListener("click", () => {
      notification.parentNode.removeChild(notification)
    })
  })

  const modals = document.querySelectorAll(".modal") || []
  modals.forEach((modal: HTMLElement) => {
    modal.addEventListener("click", (evt: MouseEvent) => {
      if (evt.target !== modal) {
        return
      }

      evt.preventDefault()
      hideModal(<HTMLElement>evt.target)
    })
  })

  setActive(document.getElementById("side-menu"))
})

document.addEventListener("turbo:visit", () => {
  setTheme()
})
