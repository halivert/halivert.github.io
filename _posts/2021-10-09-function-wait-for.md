---
author: halivert
title: "Función para esperar algo"
date: "2021-10-09 23:37"
category: "¡Código!"
tags: ["JavaScript", "Funciones"]
---

En este artículo quiero mostrarte algunas cosas acerca del lenguaje de
programación JavaScript mediante el uso de una función que servirá para
«esperar».

<!-- Seguir leyendo -->

## Contenido

- [Funciones de alto orden](#funciones-de-alto-orden)
- [Repetición](#repeticion)
- [Promesas](#promesas)
- [Resultado](#resultado)
  - [Uso](#uso)

Muchas veces cuando interactuamos con una API, tenemos que esperar un cambio de
estado, por ejemplo cuando queremos instanciar un servidor y estamos esperando a
que esté listo. O cuando estamos preguntando por la ubicación de un usuario.

## Funciones de alto orden

<details markdown="1" open>
  <summary>
    Si sabes que son las funciones de alto orden, puedes saltarte esta parte
  </summary>

Las [funciones de alto orden][4] son por definición funciones que reciben como
parámetro funciones o que devuelven funciones.

Aquí hay algunos ejemplos de funciones de alto orden:

Funciones como parámetro

```js
const fun = (callback) => {
  const value = 3
  callback(value)
}

fun((val) => {
  console.log(val) // 3
})
```

Funciones como valor de retorno

```js
const fun = (param) => {
  return () => {
    console.log(param)
  }
}

const log = fun(3)

log() // 3
```

Tienen usos específicos y particulares, en este caso usaremos el primer tipo,
las que reciben funciones cómo parámetro.

</details>

<h2 id="repeticion">Repetición</h2>

En ambos casos necesitamos esperar pero debemos hacerlo mientras preguntamos de
vez en vez, particularmente cuando no hay un mecanismo de webhook que nos avise
o notifique del cambio de estado.

Así, podemos hacer llamadas cada cierto tiempo, con [setInterval][1], de esta
forma:

```js
setInterval(() => {
  APICall() // Llamada a la API
}, waitTime) // Tiempo a esperar
```

Ahora bien, cuando el resultado es el deseado, debemos detener la repetición de
llamadas, de esta forma:

```js
const interval = setInterval(() => {
  APICall().then(() => {
    // Condición de parada
    if (condition) {
      clearInterval(interval) // Detener la repetición
    }
  })
}, waitTime)
```

Ahora si queremos devolver un valor, podemos envolver este código en una
[Promesa][2].

## Promesas

<details markdown="1" open>

  <summary>Si sabes que son las promesas, puedes saltarte esta parte</summary>
Las promesas son objetos que representan el resultado exitoso o fallido de una
operación asíncrona.

Una promesa se construye de manera sencilla, solamente recibe una función que
tiene dos parámetros, `resolve` y `reject` (ambos funciones) que renombraremos
para mayor facilidad `resolve` -> `good`, `reject` -> `bad`, así:

```js
new Promise((good, bad) => {})
```

En el cuerpo de la función, podemos llamar libremente a estas dos funciones,
`good` cuando el resultado es exitoso y `bad` cuando es fallido. Algo muy
interesante de las promesas es que pueden ser llamadas en una función asíncrona,
o no.

Para obtener el valor resultado de una promesa, contamos con el método `then`, y
el método `catch`.

`then` recibe una función con un parámetro que es el valor que le pasamos al
método `good`.

`catch` recibe una función con un parámetro que es el valor que le pasamos al
método `bad`.

```js
new Promise((good, bad) => {
  good("Nice")
}).then((param) => {
  console.log(param) // Nice
})

new Promise((good, bad) => {
  bad("Not nice")
}).catch((param) => {
  console.log(param) // Not nice
})
```

Pero podemos usar `await` si usamos la promesa dentro de una función asíncrona.
El costo extra que tenemos que pagar es que para el `catch`, debemos usar un
bloque [`try...catch`][3].

```js
const nice = await new Promise((good, bad) => {
  good("Nice")
})

try {
  await new Promise((good, bad) => {
    bad("Error")
  })
} catch (error) {
  console.log(error) // Error
}
```

</details>

Así, podemos usar las promesas para la función que «espera».

```js
const value = await new Promise((good) => {
  const interval = setInterval(() => {
    APICall().then(() => {
      if (condition) {
        clearInterval(interval)
        return good("Nice") // Devolver algún valor
      }
    })
  }, waitTime)
})

console.log(value) // Nice
```

Por último para reutilizar esta función y no tener que escribirla en todos
lados, podemos usar más funciones de alto orden.

## Resultado

El resultado final es algo así:

```js
function waitFor({ condition, callback, message = "", waitTime = 1000 } = {}) {
  return new Promise((resolve) => {
    if (condition()) return resolve(condition())
    if (message.length) console.log(message)

    const interval = setInterval(() => {
      const stop = (result) => {
        clearInterval(interval)
        return resolve(result)
      }

      callback(stop)
    }, waitTime)
  })
}
```

Ahora procedo a explicar la función.

Como parámetros tenemos dos funciones, una de condición y una de `callback` o
llamada atrás, un mensaje que se mostrará en la primera iteración y un tiempo de
espera.

Devolvemos la promesa en la que solo necesitamos el parámetro `resolve` (que
llamabamos `good`), en la primera línea de la promesa, comprobamos que la
condición se cumpla y de ser así devolvemos ese valor.

En caso contrario continuamos y procedemos a imprimir el mensaje (en caso de que
exista), y luego continuamos con las repeticiones.

En la repetición, creamos la función `stop` para detener las repeticiones y
devolver el valor necesario, y por último llamamos a la función `callback` con
la función `stop` como parámetro.

### Uso

Implementé un servidor de prueba para regresar un valor numérico aleatorio entre
el 1 y el 10, y la siguiente función hace llamadas hasta encontrar exactamente
el número 6.

```js
import axios from "axios"
import { waitFor } from "./src/waitFor.js"

const fun = async () => {
  const url = "http://localhost:3001/number"
  const {
    data: { number },
  } = await axios.get(url)
  console.log({ number })

  const result = await waitFor({
    message: "Waiting...",
    condition: () => (number === 6 ? { number } : false),
    callback: (stop) => {
      axios.get(url).then(({ data: { number } }) => {
        if (number === 6) stop({ number })
        console.log({ number })
      })
    },
  })
}

fun()
```

Pero es mejor un vídeo para mostrar cómo funciona.

<div class="has-text-centered">
  <video autoplay loop muted playsinline>
    <source
      src="{{ '/assets/video/function-wait-for.mp4' | absolute_url }}"
      type="video/mp4">
  </video>
</div>

En fin, si tienes dudas o comentarios, puedes enviarme un mensaje.

Adiós 👋🏽

[1]: https://developer.mozilla.org/en-US/docs/Web/API/setInterval
[2]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
[3]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch
[4]: https://typeofnan.dev/what-is-a-higher-order-function/
