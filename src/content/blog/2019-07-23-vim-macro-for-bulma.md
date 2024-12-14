---
author: halivert
category: "Ya me pasó"
date: "2019-07-23 08:49"
tags: ["Vim", "Productividad"]
title: "Macros de Vim para Bulma"
translations:
  - short: en
    post: 2019-07-23-vim-macro-for-bulma
---

Cuando utilizas un framework de CSS tan flexible como [Bulma][1], deseas tener
los componentes necesarios y no más. Cuando creas tu propio «tema» puedes
importar únicamente los componentes y elementos que deseas utilizar.

Ahora bien ¿qué pasa si no estás seguro de qué archivos contienen que
cosa? **Importa todo** y despues comenta los que no son necesarios en ese
momento.

Pero ¿cómo importamos todos los elementos y componentes de Bulma, fácilmente?

<!-- Seguir leyendo -->

He encontrado estos macros que pueden serte muy utiles:
```viml
let @q='02t/"cyt"o^[;r ^Rc^Mdd.2kI// ^[2j0'
let @j='0f"a../.^["cpF/l3dfsA;^[j0'
let @k='02f"i.sass^[j0'
```

Ahora, si copias y pegas esos comandos seguramente no funcionarán porque
contienen caracteres de control y otros, debes sustituir los siguientes:

|----------|--------------------|
| Original |      Sustituir     |
|:--------:|:------------------:|
|   `^[`   |    Ctrl + v, Esc   |
|   `^R`   | Ctrl + v, Ctrl + r |
|   `^M`   |   Ctrl + v, Enter  |
|    `;`   |         `:`        |
|----------|--------------------|

Para hacer esto más sencillo puedes escribir `:%s/\V^[/[Ctrl + v, Esc]/g` y
así con los otros dos caracteres de control.

<div class="has-text-centered">
  <video autoplay loop muted playsinline>
    <source
      src="{{
        '/assets/2019-07-vim-macro-for-bulma/vim-macro.mp4'
          | absolute_url
      }}"
      type="video/mp4">
  </video>
</div>

<small>Nota: Tengo mapeada en el modo normal, la tecla `;` por `:` y
viceversa.</small>

Cuando estés en el mismo directorio que el folder `node_modules`, puedes usar
esos macros y hacer lo siguiente:

<div class="has-text-centered">
  <video autoplay loop muted playsinline>
    <source
      src="{{
        '/assets/2019-07-vim-macro-for-bulma/vim-macro-used.mp4'
          | absolute_url
      }}"
      type="video/mp4">
  </video>
</div>
<br>
Hasta el próximo vim-tip 👋🏽

#### Extra
¿Cómo funcionan esos macros?
```viml
let @q='02t/"cyt"o^[;r ^Rc^Mdd.2kI// ^[2j0'
```
- Lo primero es ir al inicio de la línea con `0`.
- Después buscamos hacia adelante 1 caracter antes de la segunda `/` con
  `2t/`.
- Luego, pegamos en el registro `c` lo que resta de la línea hasta antes de
  las comillas con `"cyt"`.
- Insertamos una línea abajo y salimos del modo insert con `o^[`.
- Agregamos el contenido del archivo que guardamos en el registro `c` con `;r
  ^Rc^M`.
- Borramos la línea de comentarios y luego la de charset con `dd.`.
- Subimos dos líneas con `2k`.
- Comentamos la línea en la que estamos con `I// `.
- Salimos del modo insert, bajamos dos líneas y volvemos al inicio con
  `^[2j0`.

```viml
let @j='0f"a../.^["cpF/l3dfsA;^[j0'
```
- Vamos al inicio de línea con `0`.
- Buscamos las primeras comillas con `f"`.
- Agregamos un `../.` con `a../.`.
- Salimos del modo insert con `^[`.
- Pegamos el contenido del registro `c` con `"cp`.
- Buscamos hacia atrás la primera `/` y nos movemos un caracter adelante con
  `F/l`.
- Borramos hasta la tercera `s` con `3dfs`.
- Añadimos el punto y coma hasta el final con `A;`.
- Salimos del modo insert, bajamos una línea y nos vamos al principio con
  `^[j0`.

```viml
let @k='02f"i.sass^[j0'
```
- Desde el inicio de línea buscamos la segundas comillas con `02f"`.
- Insertamos `.sass` con `i.sass`.
- Finalmente salimos del modo insert, bajamos una línea y volvemos al
  principio con `^[j0`.

[1]: https://bulma.io
