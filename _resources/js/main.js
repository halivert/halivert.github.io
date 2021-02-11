const addClass = (element, name) => {
	if (!element) return

	if (element.classList) {
		element.classList.add(name)
	} else {
		let arr = element.className.split(" ")
		if (arr.indexOf(name) === -1) element.className += " " + name
	}
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

const isInput = (name) => {
	let compare = name.toLowerCase()
	return ["input", "textarea", "select"].includes(compare)
}

const vibrate = (pattern) => {
	window.navigator.vibrate(pattern)
}

const toggleTheme = (element, icon, isDark) => {
	removeClass(icon, isDark ? "fa-moon" : "fa-sun")
	addClass(icon, isDark ? "fa-sun" : "fa-moon")
	removeClass(element, isDark ? "is-dark" : "is-warning")
	addClass(element, isDark ? "is-warning" : "is-dark")
}

const initThemeSwitcher = (element) => {
	if (!element) return

	const firstSpan = element.getElementsByTagName("span")[0]
	const icon = firstSpan.getElementsByTagName("i")[0]
	const isDark = hasClass(document.documentElement, "dark")

	toggleTheme(element, icon, isDark)

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
		document.addEventListener("keypress", (evt) => {
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

	deletes.forEach((deleteElement) => {
		notification = deleteElement.parentNode
		deleteElement.addEventListener("click", () => {
			notification.parentNode.removeChild(notification)
		})
	})
})

document.addEventListener("turbolinks:visit", setTheme)
