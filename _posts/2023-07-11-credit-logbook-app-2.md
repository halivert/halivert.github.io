---
author: halivert
title: "Bitácora de crédito (vol. 2)"
date: "2023-07-13 20:00:00 -0600"
category: "Aprendiendo en público"
tags: ["Laravel", "Backend"]
---

En este «sprint» (o lo que sea), vamos a continuar con el desarrollo de dos
características principales.

Primero comprobaremos que se puede iniciar sesión con un usuario, y que tiene
acceso a ciertos permisos, luego continuaremos con la creación y edición de
tarjetas de crédito asociadas a un usuario.

<!-- Seguir leyendo -->

## Índice
{: .no_toc}

* toc
{:toc}

## Previos

Después de los [pasos anteriores]({% post_url 2023-07-06-credit-logbook-app-1
%}), tenemos que migrar nuestra base de datos, es decir agregar todos los
cambios que agregamos a las migraciones, de manera estructurada

### Migraciones

Las migraciones son muy útiles, pues nos permiten realizar cambios en la base de
datos de manera controlada.

Esta es una forma segura de «interactuar» con la base de datos, ya que existe
una tabla particular que lleva el registro de las migraciones que ya se han
ejecutado de acuerdo a su fecha y las migraciones ejecutadas no se repiten.

Además en caso de que una de nuestras migraciones salga mal, y necesitemos hacer
_rollback_ de esta, podemos hacerlo sencillamente y con un solo comando.

Puedes leer más acerca de las [migraciones en la documentación oficial de
Laravel](https://laravel.com/docs/10.x/migrations).

Comenzamos creando la tabla de migraciones.

```sh
sail artisan migrate:install
```

Como ya definimos el esquema que queremos en la base de datos e incluso ya
definimos algunas de las migraciones, no queda más que ejecutarlas en nuestro
entorno de prueba.

Utilizaremos la opción `--step` para que podamos hacer _rollback_ a cada
migración individualmente.

```sh
sail artisan migrate --step
```

Si todo va bien, la consola nos mostrará un error... 😥 y es porque olvidé algo
importante, por defecto las columnas `uuid` en Laravel no son llaves primarias,
por lo que no se pueden usar como llaves foráneas en otra tabla, así que vamos
allá a corregir el desastre...

[**Ver código**
&nbsp;(GitHub)](https://github.com/halivert/credit-logbook/commit/006d009a3bcbdb97b34b4d06cb5ebbe2e194d29b?diff=unified){:.button.is-normal.is-primary}
{: .has-text-centered}

Ahora sí podemos ejecutar las migraciones, pero como algunas tablas ya fueron
creadas, hay que iniciarlas de nuevo

Esto es seguro en entornos de desarrollo, por favor nunca ejecutes el siguiente
comando en producción (igual Laravel te advertirá si lo intentas)
{: .notification.is-yellow}

```sh
sail artisan migrate:fresh --step
```

### Env

También cambiaremos algunas cosas de nuestro archivo `.env`.

Por ejemplo el valor de `APP_URL` así como la sesión, la _queue_ y la caché, ya
que queremos usar redis y ya de paso queremos aumentar el tiempo de la sesión,
a... 3 días o sea 259200 segundos.

Las llaves que cambiaremos quedan algo así:

```
APP_URL=http://laravel.test
CACHE_DRIVER=redis
QUEUE_CONNECTION=redis
SESSION_DRIVER=redis
SESSION_LIFETIME=259200
```

Excelente, nuestras tablas ya han sido creadas y estamos listos para hacer
algunas pruebas con el inicio de sesión y el registro de usuarios.

## API

Para probar nuestra API utilizaremos [Postman](https://www.postman.com/), y
comenzaremos agregando los endpoints necesarios para registrar a un usuario.

Agregamos un _environment_ ahí creamos la variable `API_URL` y luego una
petición HTTP.

Si nuestro servidor está ejecutandose con sail, tenemos la url: `laravel.test`,
como queremos poder acceder a ella desde nuestro local debemos instruirle a
nuestra computadora como hacerlo.

Editamos el archivo: `/etc/hosts` y agregamos la siguiente línea:

```
127.0.0.1	laravel.test localhost
```

Así nuestra computadora sabrá redirigir las urls: `laravel.test` y `localhost` a
sí misma. (A partir de ahora obviaremos el dominio, pero debe estar en todas
nuestras solicitudes).

### Cookie CSRF

Primero queremos obtener la [_cookie_ csrf, para evitar algunos
ataques](https://laravel.com/docs/10.x/csrf), y lo haremos con la url:
`/sanctum/csrf-cookie`

Esta nos devolverá una cookie llamada `XSRF-TOKEN`, que se ve más o menos así:
`eyJpdiI6IjVDY1NrKzN6YzNBNFJVe...MWUxNmM5IiwidGFnIjoiIn0%3D`, si nos fijamos
bien, la parte final está algo rara (_%3D_), y es porque antes de enviarla en un
_header_ deberíamos decodificarla para url, con una función similar a
[decodeURIComponent](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/decodeURIComponent).
En nuestro caso, sabemos que _%3D_ es _=_, así que lo sustituimos y agregaremos
a un _header_ llamado `X-XSRF-TOKEN` en cada una de nuestras llamadas
siguientes. Como ahora estamos probando con postman, entonces hacemos algo así:

![Imagen de X-XSRF-TOKEN en postman](https://github.com/halivert/halivert.github.io/assets/16197249/61bb4b67-83bc-45e8-b4d8-79d39b3a2769)

## Pruebas Usuario

### Registro

Para registrarnos utilizaremos Fortify, y aunque ya hicimos algunos pasos, nos
faltó agregar el proveedor de Fortify a nuestra lista de proveedores para la
app, así que hacemos eso.

También corregimos una regla de nuestras validaciones 😅

[**Ver código**
&nbsp;(GitHub)](https://github.com/halivert/credit-logbook/commit/c79f7007125c4cf623fb2e75014b5233396bd880?diff=unified){:.button.is-normal.is-primary}
{: .has-text-centered}

Después podemos hacer la solicitud a la url: `/register`. Agregamos los datos
necesarios al _body_ de la solicitud y lo enviamos.

![Datos de Tim y respuesta](https://github.com/halivert/halivert.github.io/assets/16197249/7e55a751-cb68-4976-a4c7-d622cafee52f)

Si todo salió bien obtendremos una respuesta 201, y sabremos que nuestro usuario
ha sido registrado en el sistema.

### Logout

Primero actualizamos la ruta `home` en nuestra configuración.

[**Ver código**
&nbsp;(GitHub)](https://github.com/halivert/credit-logbook/commit/f5338511f61f59e46afbba95498d41faff670172?diff=unified){:.button.is-normal.is-primary}
{: .has-text-centered}

Vamos a guardar el X-XSRF-TOKEN como una variable en postman y luego hacemos la
petición a la url: `/logout`. Si todo sale bien, obtendremos una respuesta 204
como esta.

![Logout](https://github.com/halivert/halivert.github.io/assets/16197249/06ac3906-cf5f-4155-a47a-87e73fd7329f)

### Login

Ahora probamos con la ruta `/login`. Y podremos ver algo así.

![Login](https://github.com/halivert/halivert.github.io/assets/16197249/5b22345a-834d-41ec-9cac-091d91a13d40)

Como sanctum utiliza las cookies para la autenticación, no debemos preocuparnos
por tokens además del de csrf cuando hacemos una petición _post_, así que
mientras usemos las cookies de sesión, estaremos _loggeados_.

## Tarjetas de crédito

### Rutas
