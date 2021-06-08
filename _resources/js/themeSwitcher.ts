import { addClass, hasClass, removeClass, toggleClass } from "./functions"

declare global {
	interface Window {
		changeTheme: Function
	}
}

function changeTheme(id: string) {
	toggleClass(document.documentElement, "dark")
	let themeSwitcher: HTMLElement = document.getElementById(id)
	let firstSpan: HTMLSpanElement = themeSwitcher.getElementsByTagName("span")[0]
	let icon: HTMLElement = firstSpan.getElementsByTagName("i")[0]

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

window.changeTheme = changeTheme
