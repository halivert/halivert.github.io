document.addEventListener("turbolinks:load", function() {
	var $navbarBurgers = Array.prototype.slice.call(
		document.querySelectorAll(".navbar-burger"),
		0
	)

	if ($navbarBurgers.length > 0) {
		$navbarBurgers.forEach(function($el) {
			$el.addEventListener("click", function() {
				var target = $el.dataset.target
				var $target = document.getElementById(target)
				toggleClass($el, "is-active")
				toggleClass($target, "is-active")
			})
		})
	}
})

const changeTheme = (id) => {
	toggleClass(document.documentElement, "dark")
	var themeSwitcher = document.getElementById(id)
	var firstSpan = themeSwitcher.getElementsByTagName("span")[0]
	var icon = firstSpan.getElementsByTagName("i")[0]

	if (hasClass(document.documentElement, "dark")) {
		localStorage.removeItem("halivertsTheme")
		removeClass(icon, "fa-moon")
		addClass(icon, "fa-sun")
		removeClass(themeSwitcher, "is-dark")
		addClass(themeSwitcher, "is-warning")
	} else {
		localStorage.halivertsTheme = "light"
		addClass(icon, "fa-moon")
		removeClass(icon, "fa-sun")
		addClass(themeSwitcher, "is-dark")
		removeClass(themeSwitcher, "is-warning")
	}

	closeAllNavbars()
}
