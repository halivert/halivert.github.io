const addClass = (element, name) => {
  if (!element) return

  if (element.classList) {
    element.classList.add(name)
  } else {
    let arr = element.className.split(" ")
    if (arr.indexOf(name) === -1) element.className += " " + name
  }
}

const activateNavMenu = () => {
  let menu = document.getElementById("nav-menu")
  if (!menu) return

  let display = getComputedStyle(menu).getPropertyValue("display")
  if (display === "none") addClass(menu, "is-active")
}

const toggleClass = (element, className) => {
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
}

const hasClass = (element, name) => {
  if (!element) return

  if (element.classList) {
    return element.classList.contains(name)
  } else {
    let classes = element.className.split(" ")
    let i = classes.indexOf(name)
    return i >= 0
  }
}

const removeClass = (element, name) => {
  if (!element) return

  if (element.classList) {
    element.classList.remove(name)
  } else {
    let classes = element.className.split(" ")
    let i = classes.indexOf(className)

    if (i >= 0) classes.splice(i, 1)
    element.className = classes.join(" ")
  }
}

const isInput = name => {
  let compare = name.toLowerCase()
  return ["input", "textarea", "select"].includes(compare)
}

const closeAllNavbars = () => {
  let $navbarBurgers = Array.prototype.slice.call(
    document.querySelectorAll(".navbar-burger"),
    0
  )

  if ($navbarBurgers.length > 0) {
    $navbarBurgers.forEach($el => {
      let $target = document.getElementById($el.dataset.target)
      removeClass($el, "is-active")
      removeClass($target, "is-active")
    })
  }
}

const vibrate = pattern => {
  window.navigator.vibrate(pattern)
}

const initThemeSwitcher = element => {
  if (!element) return

  let firstSpan = element.getElementsByTagName("span")[0]
  let icon = firstSpan.getElementsByTagName("i")[0]

  if (hasClass(document.documentElement, "dark")) {
    removeClass(icon, "fa-moon")
    addClass(icon, "fa-sun")
    removeClass(element, "is-dark")
    addClass(element, "is-warning")
  } else {
    addClass(icon, "fa-moon")
    removeClass(icon, "fa-sun")
    addClass(element, "is-dark")
    removeClass(element, "is-warning")
  }

  removeClass(element, "is-invisible")
}

const setTheme = () => {
  if (localStorage.halivertsTheme && localStorage.halivertsTheme === "light") {
    removeClass(document.documentElement, "dark")
    localStorage.halivertsTheme = "light"
  } else {
    localStorage.removeItem("halivertsTheme")
  }
}

setTheme()

document.addEventListener("turbolinks:load", () => {
  let searchBox = document.getElementById("search-box")
  if (searchBox) {
    document.addEventListener("keypress", evt => {
      if (!isInput(evt.target.nodeName) && evt.charCode === 47) {
        evt.preventDefault()
        activateNavMenu()
        searchBox.focus()
        searchBox.select()
      }
    })
  }

  initThemeSwitcher(document.getElementById("theme-switcher"))
  initThemeSwitcher(document.getElementById("theme-switcher-corner"))

  const deletes = document.querySelectorAll(".notification .delete") || []
  deletes.forEach($delete => {
    $notification = $delete.parentNode
    $delete.addEventListener("click", () => {
      $notification.parentNode.removeChild($notification)
    })
  })

  const downArrows = document.querySelectorAll(".down-arrow") || []
  downArrows.forEach(arrow => {
    const target = arrow.dataset.target
    arrow.addEventListener("click", () => {
      const targetElement = document.querySelector(target)
      if (targetElement) targetElement.scrollIntoView({ behavior: "smooth" })
    })
  })
})

document.addEventListener("turbolinks:visit", setTheme)
