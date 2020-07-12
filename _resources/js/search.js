document.addEventListener("turbolinks:load", () => {
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

  function displaySearchResults(results, store) {
    let searchResults = document.getElementById("search-results")
    let template = document.getElementById("post-template")
    if (!searchResults) return

    if (results.length) {
      for (let i = 0; i < results.length; i++) {
        let item = store[results[i].ref]
        searchResults.appendChild(htmlPostElement(item, template))
      }
    } else {
      let nothingEl = searchResults.appendChild(document.createElement("p"))
      nothingEl.classList.add("title", "is-3")
      nothingEl.appendChild(document.createTextNode("No encontré nada :("))
      nothingEl.appendChild(document.createElement("br"))
      nothingEl.appendChild(
        document.createTextNode("Pero quizá esto pueda interesarte")
      )

      let template = document.getElementById("post-template")
      searchResults.appendChild(htmlPostElement(getRandomPost(), template))
    }
  }

  function getQueryVariable(variable) {
    let query = window.location.search.substring(1)
    let vars = query.split("&")

    for (let i = 0; i < vars.length; i++) {
      let pair = vars[i].split("=")

      if (pair[0] === variable)
        return decodeURIComponent(pair[1].replace(/\+/g, "%20"))
    }
  }

  function getRandomPost() {
    let keys = Object.keys(window.store)
    let i = Math.floor(Math.random() * keys.length)
    return window.store[keys[i]]
  }

  let searchTerm = getQueryVariable("consulta")

  if (searchTerm) {
    document.getElementById("search-box").setAttribute("value", searchTerm)
    let results = idx.search(searchTerm)
    displaySearchResults(results, window.store)
  } else {
    let searchResults = document.getElementById("search-results")
    if (!searchResults) return

    let textEl = searchResults.appendChild(document.createElement("p"))
    textEl.classList.add("title", "is-3")
    textEl.innerText =
      "Si no sabes que buscar, puedes comenzar con este post aleatorio"

    let template = document.getElementById("post-template")
    searchResults.appendChild(htmlPostElement(getRandomPost(), template))
  }
})
