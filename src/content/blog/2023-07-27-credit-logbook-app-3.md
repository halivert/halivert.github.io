---
author: halivert
title: "Bitácora de crédito (Vol. 3)"
date: "2023-07-27 20:00:00 -0600"
categories: ["Aprendiendo en público"]
tags: ["Laravel", "Backend"]
---

Continuando con los [_form
requests_](https://laravel.com/docs/10.x/validation#form-request-validation)
revisaremos que opciones nos dan para validar datos.

<!-- Seguir leyendo -->

## Índice

## _Form requests_

Primero vemos que Laravel creó dos para nosotros: `StoreCreditCardRequest` y
`UpdateCreditCardRequest`, este par de _form requests_ servirán para validar los
datos, dar autorización en la capa de solicitudes, enviar mensajes entendibles
como respuesta y en algunas ocasiones podemos realizar pre-procesamientos en la
validación.

### Almacenar

#### Autorización

El método `authorize` devuelve **verdadero** si el usuario puede tener acceso a
esta solicitud. Lo hemos implementado así:

```php
public function authorize(): bool
{
    return $this->user()->can('create', CreditCard::class);
}
```

#### Reglas

Después está el método `rules` que devuelve el arreglo de reglas que tienen que
cumplir los campos, nosotros queremos que al solicitar el almacenamiento de una
tarjeta, tenga en cuenta el nombre, fecha límite de pago, fecha de corte, tasa
de interés y límite de crédito.

El único campo opcional o _nullable_ es la tasa de interés, a los demás les
agregamos otras reglas, como que son requeridos:

**Nombre**

- Requerido
- Cadena de texto
- Máximo 255 caracteres

**Fecha límite de pago**

- Requerido
- Entero
- La fecha límite de pago representa un día en el mes corriente, en el que debes
  terminar de pagar tu deuda, o sea que no tiene sentido que sean negativos y
  seguramente no habrá días mayores a 28 porque pues ✨ febrero ✨

**Fecha de corte**

- Requerido
- Entero
- Similar a la fecha de corte, en el sentido que la acotaremos de 1 a 28

**Tasa de interés**

- No requerido
- Decimal, puede tener de 0 a 2 decimales
- Este porcentaje debería ser mayor a 0 y menor a 200, ya que si tu tarjeta
  tiene más de 200% como tasa de interés... bueno quizá después tengamos que
  cambiar esto

**Límite de crédito**

- Requerido, para poder saber cuanto tienes disponible en cualquier momento
- Decimal, puede tener de 0 a 4 decimales
- Debe ser mayor a 0 (espero que no tengas un límite de crédito negativo 😬)

Laravel utilizara estas reglas para validar los datos que lleguen desde la API.

#### Atributos

Luego tenemos el método `attributes`, que devolverá un arreglo que indica a
Laravel cómo sustituir los nombres de los atributos, para que se vean bonitos,
básicamente. Ahí sustituimos el atributo _name_ por _Nombre_ (y así con los
demás), y lo traducimos, para que si el usuario utiliza otro de nuestros
lenguajes soportados y nos lo indica así, podamos responder de forma clara.

En resumen el código para la solicitud de almacenamiento de una tarjeta de
crédito queda así... (Ya teníamos algunas reglas escritas)

<div class="text-center underline mb-4">

[**Ver código**
&nbsp;(GitHub)](https://github.com/halivert/credit-logbook/blob/0c5fc658c12c5fd77abeec0907a3153fd1db2281/app/API/CreditCard/v1/StoreCreditCardRequest.php)

</div>

### Actualizar

Haremos lo mismo para la solicitud de actualización de la tarjeta, con algunas
excepciones.

Para la autorización, necesitamos tomar en cuenta la tarjeta de crédito que se
está solicitando actualizar.

Y en las reglas habrá campos que el usuario no quiera actualizar, por lo que
marcaremos algunos campos como _sometimes_ para decirle a Laravel que esos
campos no estarán presentes en todas las solicitudes de actualización, pero
también los marcamos como _required_ ya que no pueden ser _null_.

Y por último agregamos también los atributos.

#### _Fixes_

Ahora bien, en nuestro _PR_ anterior nos faltaban algunas cosas, cómo decirle al
controlador, que nombre debía tener el parámetro tarjeta de crédito, ya que el
método `authorizeResource` lo obtiene automáticamente con _snake case_, pero
nosotros estamos usando _camel case_.

Al final, el código queda algo así:

<div class="text-center underline mb-4">

[**Ver código**
&nbsp;(GitHub)](https://github.com/halivert/credit-logbook/commit/32ffcf76faab900cca2441bb3169f1a48775dced?diff=unified)

</div>

## Pruebas con Postman

Probaremos el endpoint `POST credit-cards` en Postman, para lo que agregamos la
url y hacemos una solicitud con valores de prueba.

<img src="https://github.com/halivert/halivert.github.io/assets/16197249/dcc2e7a2-7875-487a-abaf-a055e3e976aa" alt="Mensajes de error">

Vemos que los mensajes están "localizados", es decir traducidos a una variante
específica de un idioma, en este caso el español de México.

Si hacemos una solicitud vacía podremos ver algo así:

<img src="https://github.com/halivert/halivert.github.io/assets/16197249/69a3bfb0-d7b3-4a6b-804f-81b4eedd674f" alt="Solicitud vacía">

Y por último si enviamos los datos correctos se verá algo así...

<img src="https://github.com/halivert/halivert.github.io/assets/16197249/1b76d36d-9db1-47a5-afdf-14bc455a1b2c" alt="Solicitud correcta">

Esto es porque todavía no contamos con la lógica en el controlador.

## Conclusión

Podemos ver que las _form requests_ son bastante ágiles para realizar tareas de
validación, además que abstrae muchas cosas que de otra forma tendríamos que
escribir por nosotros mismos (como la autorización y los mensajes).

Esto es todo lo que haremos en este _sprint_ (ya que no me quedó mucho tiempo
libre) y en el siguiente veremos cómo interactuar con el ORM Doctrine, para
guardar los datos que recuperamos de la solicitud.
