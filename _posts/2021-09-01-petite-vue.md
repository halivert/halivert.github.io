---
author: halivert
title: "Comenzando con petite-vue"
date: "2021-09-05 13:31"
last_modification: "2021-09-14 23:11"
categories: ["Novedades", "¡Código!"]
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
  - [Limitaciones](#limitaciones)
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

Hice una lista de tareas muy sencilla.

<p
  class="codepen is-flex"
  data-height="500"
  data-default-tab="js,result"
  data-slug-hash="mdwroKe"
  data-user="halivert"
  style="height: 300px; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;"
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

También, cómo ya mencioné he implementado algunas funcionalidades de este blog
con petite-vue. Por ejemplo el menú (simplificado):

```html
<div id="side-menu-container" v-scope>
  <!-- Aquí asignamos el componente Menu y su scope al elemento aside -->
  <aside v-scope="Menu()">
    <ul>
      <li>
        <!--
          Aquí asignamos la clase dependiendo si el elemento está activo
        -->
        <a :class="{ 'is-active': itemIsActive($el) && !activeSearchModal }">
          <img />
        </a>
      </li>
    </ul>
    ...
  </aside>
  ...
</div>
```

```ts
// Componente Menu, que asignamos al elemento aside
function Menu() {
  // Una propiedad reactiva y una función para saber si un elemento está activo
  return {
    activeMenuItem: window.location.href,
    itemIsActive(el: HTMLAnchorElement) {
      return this.activeMenuItem === el.href
    },
  }
}

// Creamos la aplicación y la montamos en el elemento por su id.
createApp({
  Menu,
  activeSearchModal: false,
}).mount("#side-menu-container")
```

Además las reacciones y el vínculo de compartir en Twitter, también están
implementadas así.

{% raw %}

```html
<div
  v-scope="Reactions({ postUrl: '{{ post_url }}'})"
  v-on:vue:mounted="fetchReactions"
  class="reactions"
>
  <span v-for="reaction in reactions" :key="reaction.name">
    <i :class="reaction?.className"></i>
    <span v-text="reaction?.count"></span>
  </span>
  <a v-if="mentions && mentions.count" :href="mentions.url">
    <i class="fas fa-quote-right has-text-text ml-3 mr-2"></i>
    <span v-text="mentions.count || 0"></span>
  </a>
</div>
```

{% endraw %}

```ts
function Reactions(props: ReactionsProps) {
  const apiUrl = "https://webmention.io/api"

  const availableReactions = {
    like: {
      className: ["fa-star", "has-text-warning"],
    },
    repost: {
      className: ["fa-retweet", "has-text-success"],
    },
    reply: {
      className: ["fa-comment-dots", "has-text-text"],
    },
    mention: {
      className: ["fa-quote-right", "has-text-text"],
      filter: "mention-of",
    },
  }

  async function fetchReactions() {
    const fetchedReactions: Reactions = await (
      await fetch(`${apiUrl}/count.json?target=${props?.postUrl}`)
    ).json()

    this.reactions = Object.entries(availableReactions).map(
      ([type, reactionData]: [string, object]) => {
        const count: number = fetchedReactions.type?.[type] || 0

        if (reactionData?.["filter"] && count) {
          this.mentions.count = count
          return null
        }

        return {
          count: count,
          name: type,
          className: [...reactionData["className"], "fa", "ml-3", "mr-2"],
        }
      }
    )
  }

  return {
    reactions: [],
    mentions: {
      url: getMentionsUrl({
        apiUrl,
        postUrl: props?.postUrl,
        filter: availableReactions.mention.filter,
      }),
    },

    fetchReactions,
  }
}
```

[Y en el propio repo hay muchos
ejemplos](https://github.com/vuejs/petite-vue/tree/main/examples)

## Conclusiones

petite-vue es genial cuando se trata de agregar pequeños trozos de funcionalidad
a un sitio web estático, también es bastante útil para maquetar aunque también
para sitios en producción.

Si algo me gusta de esta versión minificada es la forma en la que se manejan los
componentes, se trata de funciones que devuelven propiedades reactivas y también
funciones.

Si tienes dudas, puedes revisar en la documentación oficial de petite-vue, o
también enviarme un mensaje. Espero que te sea de utilidad. Adiós 👋🏽
