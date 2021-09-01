---
author: halivert
title: "Comenzando con petite-vue"
date: "2021-09-01 12:06:55 -0500"
category: "Novedades"
tags: ["Vue.js", "Estado de JavaScript", "JavaScript", "HTML", "Sitio estático"]
---

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

### Limitaciones

## ¿Por qué debería usarlo?

## Ejemplos

## Conclusiones
