function addClass(element: HTMLElement, name: string | string[]) {
	if (!element) return

	if (typeof name === "string") {
		if (element.classList) {
			element.classList.add(name)
		} else {
			let arr = element.className.split(" ")
			if (arr.indexOf(name) === -1) element.className += " " + name
		}
	} else {
		name.forEach((className: string) => {
			addClass(element, className)
		})
	}
}

function toggleClass(element: HTMLElement, className: string) {
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

function hasClass(element: HTMLElement, name: string) {
	if (!element) return

	if (element.classList) {
		return element.classList.contains(name)
	} else {
		let classes = element.className.split(" ")
		let i = classes.indexOf(name)
		return i >= 0
	}
}

function removeClass(element: HTMLElement, name: string) {
	if (!element) return

	if (element.classList) {
		element.classList.remove(name)
	} else {
		let classes = element.className.split(" ")
		let i = classes.indexOf(name)

		if (i >= 0) classes.splice(i, 1)
		element.className = classes.join(" ")
	}
}

function isInput(name: string) {
	let compare = name.toLowerCase()
	return ["input", "textarea", "select"].includes(compare)
}

function vibrate(pattern: number | number[]) {
	window.navigator.vibrate(pattern)
}

function initThemeSwitcher(element: HTMLElement) {
	if (!element) return

	const firstSpan = element.getElementsByTagName("span")[0]
	const icon = firstSpan.getElementsByTagName("i")[0]
	const isDark = hasClass(document.documentElement, "dark")

	removeClass(icon, isDark ? "fa-moon" : "fa-sun")
	addClass(icon, isDark ? "fa-sun" : "fa-moon")
	removeClass(element, isDark ? "is-light" : "is-dark")
	addClass(element, isDark ? "is-dark" : "is-light")

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

function setActive(menu: HTMLElement) {
	if (!menu) return

	const elements: NodeListOf<HTMLLinkElement> = menu.querySelectorAll("li > a")

	removeClass(menu.querySelector("li > .is-active"), "is-active")

	elements.forEach((element: HTMLLinkElement) => {
		if (window.location.href === element.href) {
			addClass(element, "is-active")
		}
	})
}

function hideModal(target: HTMLElement) {
	if (!target) return

	const modal: HTMLElement = target.closest(".modal")
	if (!modal) return

	addClass(modal, "is-hidden")
	setActive(document.getElementById("side-menu"))
}

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

setTheme()
