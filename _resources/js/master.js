document.addEventListener("turbolinks:click", () => {
	showElement(document.getElementById("progress-bar"));
});

document.addEventListener("turbolinks:load", () => {
	hideElement(document.getElementById("progress-bar"));

	var searchBox = document.getElementById("search-box");
	if (searchBox) {
		document.addEventListener("keypress", evt => {
			if (!isInput(evt.target.nodeName) && evt.charCode === 47) {
				evt.preventDefault();
				activateNavMenu();
				searchBox.focus();
				searchBox.select();
			}
		});
	}

	if (localStorage.halivertsTheme && localStorage.halivertsTheme === "light") {
		removeClass(document.documentElement, "dark");
		localStorage.halivertsTheme = "light";
	} else {
		localStorage.removeItem("halivertsTheme");
	}

	var themeSwitcher = document.getElementById("theme-switcher");
	var firstSpan = themeSwitcher.getElementsByTagName("span")[0];
	var icon = firstSpan.getElementsByTagName("i")[0];

	if (localStorage.halivertsTheme && localStorage.halivertsTheme === "light") {
		addClass(icon, "fa-moon");
		removeClass(icon, "fa-sun");
		addClass(themeSwitcher, "is-dark");
		removeClass(themeSwitcher, "is-warning");
	} else {
		removeClass(icon, "fa-moon");
		addClass(icon, "fa-sun");
		removeClass(themeSwitcher, "is-dark");
		addClass(themeSwitcher, "is-warning");
	}

	removeClass(themeSwitcher, "is-invisible");

	(document.querySelectorAll(".notification .delete") || []).forEach(
		$delete => {
			$notification = $delete.parentNode;
			$delete.addEventListener("click", () => {
				$notification.parentNode.removeChild($notification);
			});
		}
	);
});

const activateNavMenu = () => {
	var menu = document.getElementById("nav-menu");
	if (!menu) return;

	var display = getComputedStyle(menu).getPropertyValue("display");
	if (display === "none") {
		addClass(menu, "is-active");
	}
};

const toggleClass = (element, className) => {
	if (element.classList) {
		element.classList.toggle(className);
	} else {
		var classes = element.className.split(" ");
		var i = classes.indexOf(className);

		if (i >= 0) classes.splice(i, 1);
		else classes.push(className);
		element.className = classes.join(" ");
	}
};

const addClass = (element, name) => {
	if (!element) return;

	if (element.classList) element.classList.add(name);
	else {
		var arr = element.className.split(" ");
		if (arr.indexOf(name) === -1) {
			element.className += " " + name;
		}
	}
};

const showElement = element => {
	if (element) removeClass(element, "is-hidden");
};

const hideElement = element => {
	if (element) addClass(element, "is-hidden");
};

const hasClass = (element, name) => {
	if (!element) return;

	if (element.classList) {
		return element.classList.contains(name);
	} else {
		var classes = element.className.split(" ");
		var i = classes.indexOf(name);
		return i >= 0;
	}
};

const removeClass = (element, name) => {
	if (!element) return;

	if (element.classList) element.classList.remove(name);
	else {
		var classes = element.className.split(" ");
		var i = classes.indexOf(className);

		if (i >= 0) classes.splice(i, 1);
		element.className = classes.join(" ");
	}
};

const isInput = name => {
	let compare = name.toLowerCase();
	return ["input", "textarea", "select"].includes(compare);
};

const closeAllNavbars = () => {
	var $navbarBurgers = Array.prototype.slice.call(
		document.querySelectorAll(".navbar-burger"),
		0
	);

	if ($navbarBurgers.length > 0) {
		$navbarBurgers.forEach($el => {
			var $target = document.getElementById($el.dataset.target);
			removeClass($el, "is-active");
			removeClass($target, "is-active");
		});
	}
};

const vibrate = pattern => {
	window.navigator.vibrate(pattern);
};
