---
author: halivert
title: "Bitácora de crédito"
date: "2023-07-06 20:00:00 -0600"
category: "Aprendiendo en público"
tags: ["Laravel", "Backend"]
---

Hace algunos años que tengo una tarjeta de crédito, y me gusta bastante llevar
un conteo exacto de que gasto y cuanto tengo disponible para pagarlo. Así que
desde entonces he estado llevando una hoja de cálculo que se ve más o menos
así

<!-- Seguir leyendo -->

Este proyecto surge como una mejora a esa hoja de cálculo (porque, ¿qué proyecto
no inicia así?). Y con esto como excusa espero poder demostrar algunas bondades
que tiene PHP y Laravel.

Espero que esta serie, que planeo salga cada jueves, sea de utilidad.

## Índice
{:.no_toc}

* toc
{:toc}

## Arquitectura

Comenzaremos dando paso a algunas decisiones importantes de arquitectura,
utilizaremos Laravel y nos ayuda bastante al saber, por ejemplo que usaremos el
patrón MVC, sin embargo tenemos que tener en cuenta otras decisiones, por
ejemplo como almacenaremos los datos, como iniciaran sesión los usuarios y cómo
se gestionan las suscripciones (en caso de que la aplicación funcione).

### Almacén de datos

Para este ejercicio utilizaremos una base de datos relacional, ya que nuestra
aplicación tiene usuarios asociados a tarjetas de crédito, que a su vez tienen
transacciones asociadas.

Debemos tener en cuenta también que al tratarse de datos financieros, debemos
elegir un motor de base de datos que soporte cifrado de datos.

Nuestra elección es **MariaDB** (en parte porque ya tengo un servidor con ese
motor de bases de datos), pero podemos utilizar PostgreSQL, MySQL, e incluso
SQLite también.

### Inicio de sesión

Para ello necesitaremos algunos datos como un _nombre de usuario_, una
_contraseña_, también un _correo electrónico_ (por si pierde su contraseña),
además podemos almacenar otros datos necesarios para que la aplicación funcione
bien como si el usuario _ya ha verificado su correo_, la _fecha en la que se
registró_ y un campo para validar el _nivel de su subscripción_.

La tabla `users` quedaría algo así:

| Columna           | Tipo de dato | Características |
|-------------------|--------------|-----------------|
| id                | uuid         | llave primaria  |
| name              | varchar(255) |                 |
| username          | varchar(255) | único           |
| email             | varchar(255) | único           |
| email_verified_at | timestamp(3) | nullable        |
| password          | varchar(255) |                 |
| subscription      | varchar(255) | nullable        |
| remember_token    | varchar(100) | nullable        |
| created_at        | timestamp(3) |                 |
| updated_at        | timestamp(3) |                 |

#### ¿Olvidó su contraseña?

También hace falta una tabla con datos necesarios para reestablecer la
contraseña de un usuario que la olvidó (Laravel nos ayuda también con esta
tabla `password_reset_tokens`) que se verá algo así:

| Columna    | Tipo de dato | Características |
|------------|--------------|-----------------|
| email      | varchar(255) | llave primaria  |
| token      | varchar(255) |                 |
| created_at | timestamp(3) | nullable        |

### Tarjetas de crédito

No queremos guardar datos sensibles de las tarjetas, pero necesitamos asociar
algunos datos a este tipo de entidades, así que haremos una tabla que guardará
el _nombre_ de una tarjeta, así como su _fecha de corte_ y _última fecha para
pagar_ y también su _límite de crédito_. La tabla de tarjetas de crédito estará
asociada a la tabla de usuarios por su id.

Dicen que no es bueno guardar cantidades de dinero como floats así que lo vamos
a intentar con decimales para comenzar.

También guardaremos la _taza de interés_.

La tabla `credit_cards` se verá algo así:

| Columna       | Tipo de dato   | Características         |
|---------------|----------------|-------------------------|
| id            | uuid           | llave primaria          |
| user_id       | uuid           | llave foránea (`users`) |
| name          | varchar(100)   |                         |
| due_date      | date           |                         |
| closing_date  | date           |                         |
| interest_rate | decimal(4, 2)  |                         |
| limit         | decimal(19, 4) |                         |
| created_at    | timestamp(3)   |                         |
| updated_at    | timestamp(3)   |                         |

### Transacciones

También tenemos la tabla de transacciones, donde iremos anotando que gastos y
que pagos se hacen. Ahí guardaremos la tarjeta a la que está asociada, también
el _monto_ de la transacción, la _fecha_, el _concepto_.

También necesitamos algunos campos para cuando hagamos compras a meses (sin y
con intereses) _plazo_ y _porcentaje de interés_, también, cuando agregemos un
pago a meses, debemos separar cada uno de los plazos para tener en cuenta cuanto
debemos en el periodo, para ello utilizaremos una referencia a la misma tabla
donde guardemos que transacción es la "raíz". Y un campo en caso de que haya
una _comisión_ por la compra.

La tabla `transactions` se verá así:

| Columna               | Tipo de dato   | Características                |
|-----------------------|----------------|--------------------------------|
| id                    | uuid           | llave primaria                 |
| credit_card_id        | uuid           | llave foránea (`credit_cards`) |
| concept               | varchar(255)   |                                |
| datetime              | timestamp(3)   |                                |
| amount                | decimal(19, 4) |                                |
| deadline              | integer        | nullable                       |
| comision              | decimal(19, 4) | nullable                       |
| interest_rate         | integer        | nullable                       |
| parent_transaction_id | uuid           | llave foránea (`transactions`) |
| created_at            | timestamp(3)   |                                |
| updated_at            | timestamp(3)   |                                |

### Otras tablas

Laravel también nos ayuda a crear otras dos tablas que servirán para tener una
lista de _trabajos_ que no terminaron con éxito y otra para tokens personales
que la aplicación nos podrá proporcionar para dar accesso a aplicaciones de
terceros con ciertos permisos.

## Código

Ya que planeamos el código que escribiremos, toca comenzar.

### Crear proyecto

Vamos a crear el proyecto con Laravel, utilizaremos [Laravel
Sail](https://laravel.com/docs/10.x/sail), este sirve para tener un entorno
igual al de producción pero sin tener que instalarle todo el software a nuestra
computadora.

Requerimos tener php, composer, docker y docker-compose instalados.

Luego vamos a la siguiente url para instalar las dependencias requeridas, en
este caso le pondremos **credit-logbook** al proyecto y le instalaremos
_mariadb_ (motor de base de datos), _redis_ (para la caché) y _mailpit_ (para
pruebas de correos):

<https://laravel.build/credit-logbook?with=mariadb,redis,mailpit>

ejecutamos el código en bash y entramos al directorio que acaba de crear

```sh
cd credit-logbook
```

luego inicializamos un repo de git y añadimos todos los elementos al índice
(esto es seguro pues laravel por defecto agrega un archivo .gitignore), después
hacemos commit.

```sh
git init .
git add .
git commit -m "chore: initial commit"
```

Después haremos un repo en la nube, en este caso utilizaremos GitHub.
Agregamos el remote y luego hacemos push para subir todos los archivos.

```sh
git remote add origin git@github.com:halivert/credit-logbook.git
git push
```

### Migraciones

Laravel utiliza migraciones para actualizar la base de datos, actualizaremos la
migración de la tabla de `users` y después el modelo `User` y la fábrica
`UserFactory` (que nos servirá para pruebas automáticas).

[Ver
código](https://github.com/halivert/credit-logbook/commit/419fb1e1d145aa929445a410dcec572cb7c7a86c?diff=split)

Después tenemos que crear una enumeración para controlar las subscripciones y
hacemos uso del [Enum
casting](https://laravel.com/docs/10.x/eloquent-mutators#enum-casting) propio de
Laravel.

Además agregamos valores por defecto al modelo `User`, ya que todos los usuarios
serán registrados con la subscripción gratuita.

También actualizamos los datos en la fábrica `UserFactory`.

[Ver
código](https://github.com/halivert/credit-logbook/commit/3055ebdd74f423cb70689469d5c8b6ba964ea5d3?diff=split)

Ahora tenemos que iniciar el contenedor para poder utilizar algunos comandos de
Laravel que crean los modelos:

> Nota: Para el siguiente comando es necesario que tengas un alias (así
> escribimos menos)
>
> `alias sail='[ -f sail ] && bash sail || bash vendor/bin/sail'`

```sh
sail up
```

y una vez que esté ejecutandose, podemos utilizar otra terminal para crear los
modelos, comenzamos con el de `CreditCard`

```sh
```

### Fortify

También vamos a instalar el paquete [Laravel
Fortify](https://laravel.com/docs/10.x/fortify), para que nos ayude con el
inicio de sesión y la recuperación de las cuentas en caso de que el usuario
pierda su contraseña.
