function changeTheme(id) {
  toggleClass(document.documentElement, "dark")
  let themeSwitcher = document.getElementById(id)
  let firstSpan = themeSwitcher.getElementsByTagName("span")[0]
  let icon = firstSpan.getElementsByTagName("i")[0]

  if (hasClass(document.documentElement, "dark")) {
    localStorage.removeItem("halivertsTheme")
    removeClass(icon, "fa-moon")
    addClass(icon, "fa-sun")
    removeClass(themeSwitcher, "is-light")
    addClass(themeSwitcher, "is-dark")
  } else {
    localStorage.halivertsTheme = "light"
    addClass(icon, "fa-moon")
    removeClass(icon, "fa-sun")
    addClass(themeSwitcher, "is-light")
    removeClass(themeSwitcher, "is-dark")
  }
}
