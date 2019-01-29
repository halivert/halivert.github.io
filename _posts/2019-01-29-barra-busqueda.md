---
author: "Hali"
title: "Barra de búsqueda"
date: 2019-01-29 10:38
categories: ["Novedades", "¡Código!"]
truncatewords: 46
---

#### Ahora hay una barra de búsqueda disponible en el blog

Llega a ustedes gracias a la biblioteca [lunr.js][1] que funciona para crear un
índice de búsqueda en un sitio (estático en este caso) y que no necesita
servidores externos, u otros servicios de búsqueda.

Para hacerlo utilicé estos dos tutoriales: [Jekyll search using lunr.js][2] y
[Search with Lunr.js][3].

En pocas palabras necesitamos:
- La biblioteca [lunr.js][1].
- Un cuadro de búsqueda \[[1][4]\].
- Una página donde se mostrará el resultado de la búsqueda \[[2][5]\].
- Un script para procesar y mostrar los datos \[[3][6]\].
- Un script donde estará el objeto `idx`, que será el índice de todos nuestros
  artículos \[[4][7]\].

Ahora les explicaré un poco del código necesario para dicha tarea.

Obviaremos el cuadro de búsqueda y la página donde se muestra el resultado de la
búsqueda, lo único que necesitamos establecer ahí son: la acción del formulario
(que será la ruta de la página donde se mostrará el resultado, en este caso
{% raw %}`{{ site.baseurl }}/blog/search`{% endraw %}), y el id del elemento
donde se mostrará (en este caso `search-results`).

En el archivo [`search-lunr.html`][7] encontramos el objeto `idx`, que
iniciaremos con la variable `window.store`. (Es importante que tenga la
extensión html, ya que necesitamos que procese los objetos, tags y filtros de
liquid).
```html
<script>
  {% raw %}window.store = {
    // ...
    // Iteramos a través de los artículos y los agregamos a un objeto
    // window.store.
    {% for post in site.posts %}
      "{{ post.id | strip | xml_escape }}": {
        "title": {{ post.title | strip | jsonify }},
        "categories": {{ post.categories | jsonify }},
        "content": {{ post.content | strip_html | strip_newlines | jsonify }},
        "url": {{ post.url | strip | jsonify }},
        // ...
      }
      {% unless forloop.last %},{% endunless %}
    {% endfor %}
  };

  // Aquí es donde creamos el objeto en el que buscaremos posteriormente.
  var idx = lunr(function() {
    // Agregamos los campos, el boost es para darle más importancia al título.
    this.field('id');
    this.field('title', { boost: 10 });
    this.field('categories');
    this.field('content');

    // Agregamos todos los resultados al objeto idx.
    for (var key in window.store) {
      this.add({
        'id': key,
        'title': window.store[key].title,
        'categories': window.store[key].categories,
        'content': window.store[key].content,
      });
    }
  });{% endraw %}
</script>
```
\\
Aquí tenemos el archivo [`search.js`][6] que es el encargado de procesar y
mostrar los datos. Se compone de dos funciones principales:
- getQueryVariable (Con esta función obtenemos el término a buscar, se nos envía
  por el método GET, y aparece en la URL).
- displaySearchResults.

```js
function displaySearchResults(results, store) {
    // Es el elemento en donde se mostrarán los resultados.
    var searchResults = document.getElementById('search-results');

    if (results.length) {
      var appendString = '';

      // Iteramos a través de los resultados.
      for (var i = 0; i < results.length; i++) {
        // Obtenemos el resultado de acuerdo a su índice.
        var item = store[results[i].ref];
        // Agregamos los resultados a una cadena en el formato que deseemos.
        appendString += `
          <section><p class="title is-size-2">
          <a class="has-text-primary" href="${item.url}">${item.title}</a>
          </p><hr><div class="content has-text-justified"><p>
          ${item.displayContent}
          </p>
        `;
        // ...
      }

      searchResults.innerHTML = appendString;
    } else {
      searchResults.innerHTML = '<p class="title is-3">No encontré nada :(</p>';
    }
  }
```
\\
Ya sólo queda probar si funciona, pero bueno... Esa es una tarea para ti.

[1]: https://lunrjs.com
[2]: https://learn.cloudcannon.com/jekyll/jekyll-search-using-lunr-js/
[3]: https://jekyllcodex.org/without-plugin/search-lunr/
[4]: https://github.com/halivert/halivert.github.io/blob/master/_includes/nav.html#L28-L47
[5]: https://github.com/halivert/halivert.github.io/blob/master/search.html
[6]: https://github.com/halivert/halivert.github.io/blob/master/js/search.js
[7]: https://github.com/halivert/halivert.github.io/blob/master/_includes/search-lunr.html

