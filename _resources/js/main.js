function addClass(element, name) {
	if (!element) return

	if (element.classList) {
		element.classList.add(name)
	} else {
		let arr = element.className.split(" ")
		if (arr.indexOf(name) === -1) element.className += " " + name
	}
}

function toggleClass(element, className) {
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

function hasClass(element, name) {
	if (!element) return

	if (element.classList) {
		return element.classList.contains(name)
	} else {
		let classes = element.className.split(" ")
		let i = classes.indexOf(name)
		return i >= 0
	}
}

function removeClass(element, name) {
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

function isInput(name) {
	let compare = name.toLowerCase()
	return ["input", "textarea", "select"].includes(compare)
}

function vibrate(pattern) {
	window.navigator.vibrate(pattern)
}

function initThemeSwitcher(element) {
	if (!element) return

	const firstSpan = element.getElementsByTagName("span")[0]
	const icon = firstSpan.getElementsByTagName("i")[0]
	const isDark = hasClass(document.documentElement, "dark")

	removeClass(icon, isDark ? "fa-moon" : "fa-sun")
	addClass(icon, isDark ? "fa-sun" : "fa-moon")
	removeClass(element, isDark ? "is-dark" : "is-warning")
	addClass(element, isDark ? "is-warning" : "is-dark")

	removeClass(element, "is-invisible")
}

function setTheme() {
	if (localStorage.halivertsTheme && localStorage.halivertsTheme === "light") {
		removeClass(document.documentElement, "dark")
		localStorage.halivertsTheme = "light"
	} else {
		localStorage.removeItem("halivertsTheme")
	}
}

function hideModal(evt) {
	if (!evt) return

	const modal = evt.closest(".modal")
	if (!modal) return

	removeClass(document.documentElement, "is-clipped")
	addClass(modal, "is-hidden")
}

document.addEventListener("turbo:load", () => {
	removeClass(document.documentElement, "is-clipped")
	initThemeSwitcher(document.getElementById("theme-switcher"))
	initThemeSwitcher(document.getElementById("theme-switcher-corner"))

	const deletes = document.querySelectorAll(".notification .delete") || []

	deletes.forEach((deleteElement) => {
		notification = deleteElement.parentNode
		deleteElement.addEventListener("click", () => {
			notification.parentNode.removeChild(notification)
		})
	})

	const modals = document.querySelectorAll(".modal") || []
	modals.forEach((modal) => {
		modal.addEventListener("click", (evt) => {
			if (evt.target !== modal) {
				return
			}

			evt.preventDefault()
			toggleClass(modal, "is-hidden")
			removeClass(document.documentElement, "is-clipped")
		})
	})
})

document.addEventListener("turbo:visit", () => {
	setTheme()
})

setTheme()
