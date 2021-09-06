---
author: halivert
title: "Comenzando con petite-vue"
date: "2021-09-05 13:31"
category: "Novedades"
tags: ["Vue.js", "JavaScript", "HTML", "Sitio estático"]
---

{% include assets_path.html %}

¿Por qué conformarnos con un framework (Vue), cuando podemos tener una
versión «minimizada» de este, con un coste menor tanto de construcción como de
carga?

[petite-vue](https://github.com/vuejs/petite-vue) apunta justo a eso.

Pero, ¿qué es justamente y cómo se usa? Veámoslo.

<!-- Seguir leyendo -->

## Índice

<div data-turbo="false" markdown="1">

- [¿Qué es?](#qué-es)
  - [¿Para qué sirve?](#para-qué-sirve)
- [¿Por qué debería usarlo?](#por-qué-debería-usarlo)
- [Ejemplos](#ejemplos)
- [Conclusiones](#conclusiones)

</div>

## ¿Qué es?

De acuerdo con el mismo repositorio:

> petite-vue es una distribución alternativa de Vue optimizada para mejora
> progresiva. Provee la misma sintaxis de template y el modelo de reactividad
> que Vue estándar. En cualquier caso, está específicamente optimizado para
> «salpicar» pequeñas cantidades de interacciones en una página HTML existente,
> renderizada por un framework de servidor.

Entre sus principales características están:

- Tamaño: solamente ~5.8kb
- Compatibilidad: usa la misma sintaxis de template que Vue
- Se basa en DOM, cambia en el mismo lugar
- Utiliza [@vue/reactivity](https://www.npmjs.com/package/@vue/reactivity)

Al ser tan nueva, seguramente habrá bugs y probablemente cambios en la API, sin
embargo es bastante usable y cuenta con bastantes funcionalidades.

### ¿Para qué sirve?

Este framework (si se me permite llamarlo así), funciona para agregar
funcionalidad a un sitio HTML estático o generado con un framework.

Podemos integrar petite-vue a nuestro blog por ejemplo, o podemos usarlo incluso
en aplicaciones más complejas donde necesitemos reactividad, aunque claro, tiene
sus limitaciones.

<small>
Algunas funcionalidades de este blog están implementadas con petite-vue, por
ejemplo las reacciones
</small>

### Limitaciones

Obviamente existen algunas limitaciones respecto a Vue, ya que no se utilizan
mucho en el contexto de la mejora progresiva. Además petite-vue no utiliza un
DOM virtual. [Entre otras](https://github.com/vuejs/petite-vue#not-supported).

## ¿Por qué debería usarlo?

petite-vue es adecuado en particular con sitios generados del lado del servidor,
por ejemplo con generadores de sitios estáticos o algunos frameworks.

Yo lo utilizo junto a Jekyll y también Laravel.

## Ejemplos

[Aquí muchos ejemplos](https://github.com/vuejs/petite-vue/tree/main/examples)

Hice una lista de tareas muy sencilla.

<p
  class="codepen"
  data-height="500"
  data-default-tab="js,result"
  data-slug-hash="mdwroKe"
  data-user="halivert"
  style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;"
>
  <span>
    Ver el código
    <a href="https://codepen.io/halivert/pen/mdwroKe">
      Lista de tareas
    </a>
    (<a href="https://codepen.io/halivert">@halivert</a>)
    en <a href="https://codepen.io">CodePen</a>.
  </span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

## Conclusiones

petite-vue es genial cuando se trata de agregar pequeños trozos de funcionalidad
a un sitio web estático, también es bastante útil para maquetar aunque también
para sitios en producción.

Espero que te sea de utilidad. Adiós 👋🏽
