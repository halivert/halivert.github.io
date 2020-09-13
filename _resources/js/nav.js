document.addEventListener("turbolinks:load", function() {
	const navbarBurgers = Array.prototype.slice.call(
		document.querySelectorAll(".navbar-burger"),
		0
	)

	if (navbarBurgers.length > 0) {
		navbarBurgers.forEach(function(el) {
			el.addEventListener("click", function() {
				const targetId = el.dataset.target
				const target = document.getElementById(targetId)
				toggleClass(el, "is-active")
				toggleClass(target, "is-active")
			})
		})
	}
})

const changeTheme = (id) => {
	toggleClass(document.documentElement, "dark")
	const themeSwitcher = document.getElementById(id)
	const firstSpan = themeSwitcher.getElementsByTagName("span")[0]
	const icon = firstSpan.getElementsByTagName("i")[0]
	const isDark = hasClass(document.documentElement, "dark")

	toggleTheme(themeSwitcher, icon, isDark)

	if (isDark) localStorage.removeItem("halivertsTheme")
	else localStorage.halivertsTheme = "light"

	closeAllNavbars()
}
