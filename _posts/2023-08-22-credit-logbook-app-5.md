---
author: halivert
title: "Bitácora de crédito (Vol. 5)"
date: "2023-08-24 20:00:00 -0600"
category: "Aprendiendo en público"
tags: ["Laravel", "Backend"]
---

Ahora actualizaremos el comportamiento de los otros métodos en el controlador de
tarjetas de crédito.

Nos falta:
- `GET` - Mostrarla
- `PUT` - Actualizarla
- `DELETE` - Eliminarla

El `GET` es sencillo, bastará una línea de código para mostrar los datos de la
tarjeta al usuario.

<!-- Seguir leyendo -->

## Índice
{:.no_toc}

* toc
{:toc}

# Tarjeta de crédito

## `GET`

Cómo Laravel maneja la autorización a nivel de recurso en el controlador, no
necesitamos autorizar al usuario en cada función, por ello bastará con regresar
la tarjeta dentro de un `CreditCardResource` en formato JSON.

Aunque también tenemos que cambiar el tipo de respuesta de la función.

```php
public function show(CreditCard $creditCard): JsonResponse
{
    return response()->json(new CreditCardResource($creditCard));
}
```

[**Ver código** &nbsp;(GitHub)][commit-1]{:.button.is-normal.is-primary}
{: .has-text-centered}

## `PUT`

Ahora continuamos con la actualización de datos de una tarjeta.

Para ello utilizaremos un _form request_ también, en este caso
`UpdateCreditCardRequest`, que justamente es el primer parámetro de nuestra
función, seguido por la tarjeta (debemos dejar este segundo parámetro ya que
Laravel lo utiliza para la autorización, y el _form request_ lo necesita también
para hacer algunas validaciones).

[**Ver código** &nbsp;(GitHub)][commit-2]{:.button.is-normal.is-primary}
{: .has-text-centered}

Cómo ves, actualizar una tarjeta es sencillo ya que se tienen los _form
requests_. Ahora bien, es necesario que tengamos en cuenta que las validaciones
que suceden ahí son importantes.

### Validaciones

Recordemos algunas de las reglas que estamos usando y que seguramente
utilizaremos también más adelante:

- `sometimes`: Sirve para validar que el campo a veces no se encontrará presente
    en nuestra solicitud, y esto lo hacemos porque es posible que el usuario
    quiera solamente actualizar el nombre de la tarjeta o su fecha de corte,
    pero no otros datos y no es necesario que también los envíe.
- `required`: La usamos en conjunto con `sometimes`, ya que si el atributo está
    presente en la solicitud, y es requerido, entonces no puede ser `null` ni
    estar vacío.
- `string`: Valida una cadena de caracteres.
- `max:{number}`: Valida un tamaño máximo.
- `integer`: Valida un número entero.

Como sea, puedes ver las [reglas de validación aquí][validation_rules_laravel].

## `DELETE`

Por último vamos a actualizar la función _destroy_ que será ejecutada cuando
llegue una solicitud `DELETE`.

Para ello (y por ahora), vamos a eliminar los datos de la tarjeta.

Nuestra respuesta será un 204, pues no tendrá contenido.

[**Ver código** &nbsp;(GitHub)][commit-3]{:.button.is-normal.is-primary}
{: .has-text-centered}

## Fin del _CRUD_

Así terminamos el _CRUD_ completo (_Create_, _Read_, _Update_, _Delete_) de
nuestro recurso tarjeta de crédito. Y se puede apreciar lo simple que es hacer
esto con Laravel. Continuaremos haciendo el _CRUD_ para las transacciones en el
siguiente sprint.

[commit-1]: https://github.com/halivert/credit-logbook/commit/c4b26057c463fbb4a0865611d925a3200069ed3c?diff=unified
[commit-2]: https://github.com/halivert/credit-logbook/commit/0c3d358f47372eb3f21f2ca68831e49647e50a12?diff=unified
[commit-3]: https://github.com/halivert/credit-logbook/commit/65f273baebce387089c2ef011d36f578dd9912b5?diff=unified

[validation_rules_laravel]: https://laravel.com/docs/10.x/validation#available-validation-rules
