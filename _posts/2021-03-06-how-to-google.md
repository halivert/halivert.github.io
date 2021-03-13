---
author: halivert
title: "Como googlear"
date: "2021-03-13 11:31"
category: "Ya me pasó"
tags: ["Google", "Principiantes", "Programación"]
---

Googlear, es decir, buscar información con un buscador web (específicamente
Google) no es una tarea trivial, y conforme pasa el tiempo se convierte en algo
cada vez más difícil ya que hace falta criterio para encontrar lo que buscas.
Sin embargo es una tarea escencial en el ámbito de la programación.

<!-- Seguir leyendo -->

<h2 id="index">Índice</h2>

- [Inicio](#start)
- [Tips 'n tricks](#tips-n-tricks)
  - [Filtros](#filters)
    - [Dominio específico](#specific-domain)
    - [Excluir términos](#exclude-terms)
  - [Imágenes](#images)
- [Lectura adicional](#further-reading)

<h2 id="start">Inicio</h2>

Desafortunadamente para mi blog, recomendaré buscar las cosas en inglés, ya que
generalmente encuentro información más actual y de mejor calidad que en español.

Para comenzar, podemos ir (a Google) y buscar justamente eso: «How to google»,
los primeros resultados nos darán un brevario para dar inicio
<sup class="ref">[1][]</sup>:

Ahí se nos recomiendan 5 puntos, de los cuales destacaré 3:

- **Comienza con lo básico**: Formula una pregunta como se la harías a un amigo:
  _«How to declare a variable in JavaScript?»_

- **Elige bien tus palabras**: En lugar de buscar _«why my git is broken?»_
  puedes escribir el error que te arroja la consola o el compilador, e.g.

  ```sh
  dangling commit 1284e08f8bff6c...
  dangling blob fe8b00c48b6d...
  ```

- **No te preocupes por insignificancias**: Tanto la ortografía como las
  mayúsculas y minúsculas no importan en las búsquedas, ya que Google corrige
  esto automáticamente al buscar

Con eso ya debería ser suficiente para que no tengas que preguntar lo mismo una
y otra vez en foros de ayuda (Busca primero, ¿recuerdas?
<sup class="ref">[2][]</sup>)

Pero, que pasa si quieres mejorar la eficacia con la que buscas.

<h2 id="tips-n-tricks">Tips 'n tricks</h2>

<h3 id="filters">Filtros</h3>

<h4 id="specific-domain">Dominio específico</h4>

Utiliza `site:dominio.com` para acotar los resultados a un dominio en
específico. e.g.<br />

_«how to center a div site:developer.mozilla.org»_<br />
_«git fatal error ... site:stackoverflow.com»_

<h4 id="exclude-terms">Excluir términos</h4>

Utiliza `-` frente a la palabra que desees excluir en tu búsqueda e.g.<br />

_«snake python -animal»_<br />
_«best programming languages -java»_ 😎

<h3 id="images">Imágenes</h3>

La búsqueda _por_ imagenes es bastante útil también, con ella puedes encontrar
imágenes similares, sitios web donde está la imagen (o una similar) e incluso
búsqueda de objetos en la misma imagen <sup class="ref">[3][]</sup> 🤯

{%
  include picture.html
    alt="Resultado del busqueda por imagen"
    src="reverse-image-search"
%}

Lo cierto es que la búsqueda eficaz en Google y otros buscadores web te ahorrará
varios dolores de cabeza y perdida de tiempo.

Espero que esto te haya servido, puedes encontrar más información en las
siguientes fuentes:

<h3 id="further-reading">Lectura adicional</h3>

<https://dev.to/denicmarko/google-like-a-pro-5cf6>

<https://support.google.com/websearch/answer/134479?hl=en>

<https://support.google.com/websearch/answer/2466433>

<https://www.coforge.com/blog/advanced-google-search-tips>

Adiós 👋🏽

<small>
Nota: Estos consejos son similares con otros buscadores web, como
[DuckDuckGo][] (el que más utilizo), Bing u otros.
</small>

[duckduckgo]: https://duckduckgo.com
[1]: https://support.google.com/websearch/answer/134479?hl=en

[2]: {{ site.url }}/blog/2021/02/how-to-ask/
[3]: https://support.google.com/websearch/answer/1325808
