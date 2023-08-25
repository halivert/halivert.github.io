---
author: halivert
title: "Bitácora de crédito (Vol. 4)"
date: "2023-08-10 20:00:00 -0600"
category: "Aprendiendo en público"
tags: ["Laravel", "Backend"]
---

Este _sprint_ vamos a implementar la lógica de los controladores. Un controlador
sirve para procesar las solicitudes que le hacemos a nuestra API y devolver
ciertos datos con base en las mismas.

Ahora vamos a interactuar con la base de datos y con las solicitudes que hicimos
la semana pasada.

<!-- Seguir leyendo -->

## Índice
{:.no_toc}

* toc
{:toc}

## Controladores

Laravel ya hizo un archivo para nosotros llamado `CreditCardController`, donde
se encuentran los métodos asociados a cada tipo de solicitud.

Como estamos haciendo una API REST [*](#one){:#one-up}, nos basaremos en verbos
y sustantivos. Verbos en los métodos HTTP y sustantivos para determinar que
recursos queremos acceder.

Así en nuestro controlador de tarjetas de crédito tenemos los siguientes 5
métodos:

- index -> `GET /credit-cards`
- store -> `POST /credit-cards`
- show -> `GET /credit-cards/{creditCard}`
- update -> `PUT /credit-cards/{creditCard}`
- delete -> `DELETE /credit-cards`

En nuestro controlador tenemos también un método de PHP nativo que funciona para
crear o construir las clases, llamado `__construct` donde agregamos la
autorización del recurso para el usuario que ha iniciado sesión.

### _Index_

Para el índice de nuestro recurso, queremos mostrar todas las tarjetas
pertenecientes a un usuario, así que obtenemos los datos de mysql con el ORM y
luego los devolvemos con algunos vínculos que necesitamos.

Para ello haremos uso de los [recursos de Laravel][1]. Entonces creamos una
coleción `CreditCardCollection` y un recurso `CreditCardResource` y los movemos
a la carpeta deseada con los comandos:

```sh
sail artisan make:resource CreditCardCollection
sail artisan make:resource CreditCardResource
mv app/Http/Resources/*.php app/API/CreditCard/v1/
```

El recurso es para una tarjeta individual y la colección es para una lista de
tarjetas.

Actualizamos el _namespace_ de los archivos y luego agregamos un atributo más a
los datos de nuestro recurso, la url de cada elemento. Ahora sí estamos listos
para agregarlo a nuestro controlador.

[**Ver código** &nbsp;(GitHub)][commit-1]{:.button.is-normal.is-primary}
{: .has-text-centered}

En este _commit_ también agregamos una relación al modelo `User` para poder
obtener sus tarjetas de crédito asociadas.

### _Store_

Para almacenar la tarjeta en nuestra base de datos (no realmente, solo el nombre
y algunos datos necesarios), podemos utilizar la relación de usuarios con las
tarjetas para no tener que recibir el uuid de usuario explicitamente.

[**Ver código** &nbsp;(GitHub)][commit-2]{:.button.is-normal.is-primary}
{: .has-text-centered}

Nota: todavía no está listo para ser usado en producción ya que queremos cifrar
algunos datos sensibles como el límite de crédito en la base de datos.
{: .notification.is-yellow}

#### Cifrado

Para cifrar datos utilizaremos los _casts_ de Laravel. Ahora bien, tenemos que
hacer unas modificaciones a nuestra tabla de `credit_cards`, cómo todavía no
hemos desplegado esto en producción, vamos a actualizar la migración original.

Actualizamos y luego hacemos una migración **fresca** de las tablas.

```sh
sail artisan migrate:fresh --step
```

Luego podemos crear nuestros datos de prueba, pero nuestro límite de crédito ya
estará cifrado en la base de datos.

[**Ver código** &nbsp;(GitHub)][commit-3]{:.button.is-normal.is-primary}
{: .has-text-centered}

### Pruebas

Ahora podemos probar nuestros dos _endpoints_, tenemos el siguiente para
`store`:

![Prueba post](https://github.com/halivert/halivert.github.io/assets/16197249/4e2a5e35-7e1e-4f61-a1f5-2b8fb1262c5b)

Y también el siguiente para el `index`:

![Prueba index](https://github.com/halivert/halivert.github.io/assets/16197249/ad2389b2-d3f6-4f5c-ae84-4ebbb8d5796e)

## Conclusión

Ahora ya tenemos dos _endpoints_ que funcionan bien, pero falta un poco más,
seguiremos en el siguiente _sprint_.

## Notas

[*](#one-up){:#one} Todavía no es una API REST, pero queremos lograrlo, nos
basaremos en el conocimiento de la ✨Internet✨, particularmente en el
siguiente artículo:

<https://steveklabnik.com/writing/nobody-understands-rest-or-http>

[1]: https://laravel.com/docs/10.x/eloquent-resources

[commit-1]: https://github.com/halivert/credit-logbook/commit/78eaecfd092e9fce48c17b808a1d5c2d75e7ce3a?diff=unified
[commit-2]: https://github.com/halivert/credit-logbook/commit/c4f76cc69ba62a3b99fda9c094dd715ef3e5a135?diff=unified
[commit-3]: https://github.com/halivert/credit-logbook/commit/68c235aa2417811e33e82deeefc2a61b954c93a3?diff=unified
