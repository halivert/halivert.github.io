async function makeIdx() {
	if (!window.idx) {
		window.index = await fetch("/index.json").then((d) => d.json())

		window.idx = lunr(function() {
			this.field("id")
			this.field("title", { boost: 10 })
			this.field("categories")
			this.field("tags")
			this.field("author")
			for (let key in window.index) {
				this.add({
					id: key,
					title: window.index[key].title,
					categories: window.index[key].categories,
					tags: window.index[key].tags,
					author: window.index[key].author,
				})
			}
		})
	}

	return window.idx
}

function showSearchModal() {
	const modal = document.getElementById("search-modal")
	const input = document.getElementById("search-input")

	removeClass(modal, "is-hidden")

	if (input) document.getElementById("search-input").focus()
}

function hideSearchModal() {
	const modal = document.getElementById("search-modal")
	const input = document.getElementById("search-input")

	addClass(modal, "is-hidden")

	if (input) input.value = ""

	displaySearchResults([], window.index)
}

async function inputSearch(input) {
	if (!input) return

	let idx = await makeIdx()

	const searchTerm = input.value

	let results = searchTerm ? idx.search(searchTerm) : []
	displaySearchResults(results, window.index)
}

function displaySearchResults(results, store) {
	let searchResults = document.getElementById("search-results")
	let template = document.getElementById("post-template")
	if (!searchResults) return

	while (searchResults.firstChild) {
		searchResults.removeChild(searchResults.lastChild)
	}

	if (results.length) {
		for (let i = 0; i < results.length; i++) {
			let item = store[results[i].ref]
			searchResults.appendChild(htmlPostElement(item, template))
		}
	}
}

function htmlPostElement(item, template) {
	let newElement = template.content.cloneNode(true)

	let pictureEl = newElement.querySelector("picture.post-picture")
	if (item.image_types && item.image) {
		item.image_types.split(",").forEach((type, idx, arr) => {
			let [ext, mime] = type.split(":"),
				imgEl
			if (idx === arr.length - 1) {
				imgEl = pictureEl.appendChild(document.createElement("img"))
				imgEl.src = `${item.image}.${ext}`
				imgEl.alt = item.image_alt
			} else {
				imgEl = pictureEl.appendChild(document.createElement("source"))
				imgEl.srcset = `${item.image}.${ext}`
				imgEl.type = mime
			}
		})
	} else {
		pictureEl.remove()
	}

	let titleEl = newElement.querySelector("a.post-title")
	titleEl.href = item.url
	titleEl.text = item.title

	newElement.querySelector("span.post-author").innerText = item.author
	newElement.querySelector("span.post-date").innerText = item.date

	let contentEl = newElement.querySelector("div.post-content")
	contentEl.innerHTML = item.content

	if (item.continue === 1) {
		contentEl.appendChild(document.createElement("p")).innerHTML = "&#8230;"

		let keepReadingEl = contentEl.appendChild(document.createElement("a"))
		keepReadingEl.classList.add("subtitle", "is-5", "has-text-link")
		keepReadingEl.href = item.url
		keepReadingEl.text = "Seguir leyendo"
	}

	return newElement
}

function addEventListeners() {
	document.addEventListener("keydown", (evt) => {
		const modal = document.getElementById("search-modal")

		if (modal) {
			if (!isInput(evt.target.nodeName)) {
				if (evt.key === "/") {
					evt.preventDefault()
					return showSearchModal()
				}
			}

			if (evt.key === "Escape" || evt.key === "Esc") {
				evt.preventDefault()
				return hideSearchModal()
			}
		}
	})
}

addEventListeners()
