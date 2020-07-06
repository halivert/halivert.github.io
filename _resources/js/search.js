document.addEventListener("turbolinks:load", () => {
	function postHtmlString(item) {
		return (
			`<section>
			<h2 class="title is-2">
				<a class="has-text-primary" href="${item.url}">${item.title}</a>
			</h2>
			<hr />
			<div class="columns">
				<div class="column">
					<div class="content has-text-justified">
						<div>${item.display_content}` +
			(item.continue === 1
				? `<p>&#8230;</p>

				<a class="subtitle is-5 has-text-link" href="${item.url}">
					Seguir leyendo
				</a>`
				: "") +
			`</div></div>
				</div>` +
			(item.image
				? `<div class="column is-3">
						<img src="${item.image}" alt="${item.image_alt}">
					</div>`
				: "") +
			`</div>
			<br />
			<div class="box">
				<i class="fas fa-user" aria-hidden="true"></i>
				${item.author}
				<span class="mobile-separator"></span>` +
			(item.last_modification
				? `<i class="fas fa-calendar-plus" aria-hidden="true"></i>
					<span>${item.last_modification}</span>`
				: `<i class="fas fa-calendar" aria-hidden="true"></i>
					<span>${item.date}</span>`) +
			`</div>
			<br />
		</section>`
		)
	}

	function displaySearchResults(results, store) {
		var searchResults = document.getElementById("search-results")
		if (!searchResults) return

		if (results.length) {
			var appendString = ""

			for (var i = 0; i < results.length; i++) {
				var item = store[results[i].ref]
				appendString += postHtmlString(item)
			}

			searchResults.innerHTML = appendString
		} else {
			searchResults.innerHTML = '<p class="title is-3">No encontré nada :(</p>'
		}
	}

	function getQueryVariable(variable) {
		var query = window.location.search.substring(1)
		var vars = query.split("&")

		for (var i = 0; i < vars.length; i++) {
			var pair = vars[i].split("=")

			if (pair[0] === variable) {
				return decodeURIComponent(pair[1].replace(/\+/g, "%20"))
			}
		}
	}

	var searchTerm = getQueryVariable("consulta")

	if (searchTerm) {
		document.getElementById("search-box").setAttribute("value", searchTerm)
		var results = idx.search(`${searchTerm}`)
		displaySearchResults(results, window.store)
	} else {
		var searchResults = document.getElementById("search-results")
		if (!searchResults) return

		searchResults.innerHTML = `
			<p class="title is-3">
				Si no sabes que buscar, puedes comenzar con este post aleatorio
			</p>
		`

		var appendString = ""
		var keys = Object.keys(window.store)
		var i = Math.floor(Math.random() * keys.length)
		appendString += postHtmlString(window.store[keys[i]])

		searchResults.innerHTML += appendString
	}
})
