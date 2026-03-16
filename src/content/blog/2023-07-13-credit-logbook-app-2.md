---
author: halivert
title: "Bitácora de crédito (vol. 2)"
date: "2023-07-13 20:00:00 -0600"
categories: ["Aprendiendo en público"]
tags: ["Laravel", "Backend"]
---

En este «_sprint_» (o lo que sea), vamos a continuar con el desarrollo de dos
características principales.

Primero comprobaremos que se puede iniciar sesión con un usuario, y que tiene
acceso a ciertos permisos, luego continuaremos con la creación y edición de
tarjetas de crédito asociadas a un usuario.

<!-- Seguir leyendo -->

## Índice

## Previos

Después de los [pasos anteriores]({% post_url 2023-07-06-credit-logbook-app-1
%}), tenemos que agregar algunas cosas al _app service provider_, migrar nuestra
base de datos, es decir agregar todos los cambios que agregamos a las
migraciones, de manera estructurada y también editar algunas de nuestras
variables de entorno.

### _App service provider_

Primero cambiamos algunas cosas en el `AppServiceProvider`, comenzamos
agregando la prevención de [_lazy
loading_](https://laravel.com/docs/10.x/eloquent-relationships#preventing-lazy-loading)
en los modelos, para evitar algunos problemas de _performance_.

También cambiaremos una parte de la gramática del la conexión a la base de
datos, particulamente el formato de la fecha, ya que por defecto no tenemos
precisión de milisegundos.

<div class="text-center underline mb-4">

[**Ver código**
&nbsp;(GitHub)](https://github.com/halivert/credit-logbook/commit/8c26eea71d440ef7b9c744e99084507439fa7b18?diff=unified)

</div>

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
entorno local.

Utilizaremos la opción `--step` para que podamos hacer _rollback_ a cada
migración individualmente.

```sh
sail artisan migrate --step
```

Si todo va bien, la consola nos mostrará un error... 😥 y es porque olvidé algo
importante, por defecto las columnas `uuid` en Laravel no son llaves primarias,
por lo que no se pueden usar como llaves foráneas en otra tabla, así que vamos
allá a corregir el desastre...

<div class="text-center underline mb-4">

[**Ver código**
&nbsp;(GitHub)](https://github.com/halivert/credit-logbook/commit/9c9d39aabf336fa3bd97046e01984c56ce40a902?diff=unified)

</div>

Ahora sí podemos ejecutar las migraciones, pero como algunas tablas ya fueron
creadas, hay que destruirlas para crearlas de nuevo.

<div class="notification">
Esto es seguro solamente en entornos de desarrollo, por favor nunca ejecutes el
siguiente comando en producción (igual Laravel te advertirá si lo intentas).
</div>

```sh
sail artisan migrate:fresh --step
```

Excelente, nuestras tablas ya han sido creadas.

### Env

También cambiaremos algunas cosas de nuestro archivo `.env`.

Por ejemplo el valor de `APP_URL` así como la sesión, la _queue_ y la caché, ya
que queremos usar redis y ya de paso queremos aumentar el tiempo de la sesión,
a... 3 días o sea **259200** segundos.

Los valores que cambiaremos quedan algo así:

```
APP_URL=http://laravel.test
CACHE_DRIVER=redis
QUEUE_CONNECTION=redis
SESSION_DRIVER=redis
SESSION_LIFETIME=259200
```

## API

Para probar nuestra API utilizaremos [Postman](https://www.postman.com/), y
comenzaremos agregando los endpoints necesarios para registrar a un usuario.

Agregamos un _environment_ ahí creamos la variable `API_URL` y luego una
petición HTTP.

Si nuestro servidor está ejecutandose con sail, tenemos la url: `laravel.test`,
como queremos poder acceder a ella desde nuestro entorno local debemos
instruirle a nuestra computadora como hacerlo.

Editamos el archivo: `/etc/hosts` y agregamos la siguiente línea:

```
127.0.0.1	laravel.test localhost
```

Así nuestra computadora sabrá redirigir las peticiones a las urls:
`laravel.test` y `localhost` a sí misma. (A partir de ahora obviaremos el
dominio, pero debe estar en todas nuestras solicitudes).

### Cookie CSRF

Primero queremos obtener la [_cookie_ csrf, para evitar algunos
ataques](https://laravel.com/docs/10.x/csrf), y lo haremos con la url:
`/sanctum/csrf-cookie`

Esta nos devolverá una _cookie_ llamada `XSRF-TOKEN`, que se ve más o menos así:
`eyJpdiI6IjVDY1NrKzN6YzNBNFJVe...MWUxNmM5IiwidGFnIjoiIn0%3D`, si nos fijamos
bien, la parte final está algo rara `%3D`, y es porque antes de enviarla en un
_header_ deberíamos decodificarla para urls con una función similar a
[decodeURIComponent](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/decodeURIComponent).
En nuestro caso, sabemos que `%3D` es `=`, así que lo sustituimos y agregaremos
a un _header_ llamado `X-XSRF-TOKEN` en cada una de nuestras llamadas
siguientes. Como ahora estamos probando con Postman, entonces hacemos algo así:

<img src="https://github.com/halivert/halivert.github.io/assets/16197249/61bb4b67-83bc-45e8-b4d8-79d39b3a2769" alt="Imagen de X-XSRF-TOKEN en Postman">

## Usuario

Seguramente utilizaremos una _SPA_ para este proyecto en futuras iteraciones,
así que dejaremos que Sanctum utilice sesiones para autenticar a los usuarios
por lo que estaremos haciendo uso de cookies.

### Registro

Para registrarnos utilizaremos Fortify, y aunque ya hicimos algunos pasos, nos
faltó agregar el proveedor de Fortify a nuestra lista de proveedores para la
app, así que hacemos eso.

También corregimos una regla de nuestras validaciones 😅

<div class="text-center underline mb-4">

[**Ver código**
&nbsp;(GitHub)](https://github.com/halivert/credit-logbook/commit/545b277174e4adf4aee913a9b68a3cef0fffa0e6?diff=unified)

</div>

Después podemos hacer la solicitud a la url: `/register`. Agregamos los datos
necesarios al _body_ de la solicitud y lo enviamos.

<img src="https://github.com/halivert/halivert.github.io/assets/16197249/7e55a751-cb68-4976-a4c7-d622cafee52f" alt="Datos de Tim y respuesta">

Si todo salió bien obtendremos una respuesta 201, y sabremos que nuestro usuario
ha sido registrado en el sistema.

### _Logout_

Probaremos el _logout_ antes del _login_ ya que cuando un usuario se registra,
automáticamente inicia sesión. Actualizamos la ruta `home` en nuestra
configuración.

<div class="text-center underline mb-4">

[**Ver código**
&nbsp;(GitHub)](https://github.com/halivert/credit-logbook/commit/bdb49f075a965ac8e51b05e53976001b1c6acf23?diff=unified)

</div>


Vamos a guardar el `X-XSRF-TOKEN` como una variable en Postman y luego hacemos
la petición a la url: `/logout`. Si todo sale bien, obtendremos una respuesta
204 como esta.

<img src="https://github.com/halivert/halivert.github.io/assets/16197249/06ac3906-cf5f-4155-a47a-87e73fd7329f" alt="Logout">

### _Login_

Ahora probamos con la ruta `/login`. Y podremos ver algo así.

<img src="https://github.com/halivert/halivert.github.io/assets/16197249/5b22345a-834d-41ec-9cac-091d91a13d40" alt="Login">

Como Sanctum utiliza las _cookies_ para la autenticación, no debemos
preocuparnos por tokens además del de csrf cuando hacemos una petición _post_,
así que mientras usemos las cookies de sesión, estaremos _loggeados_.

## Tarjetas de crédito

### Rutas

Vamos a agregar las rutas para las tarjetas de credito en nuestra API, así que
en el archivo `routes/web.php` colocamos lo siguiente:

Lo pondremos en `web` y no en `api`, porque consideramos que usaremos una _SPA_
así que queremos enviar cookies, pero luego veremos como replicar esto para usar
un _token_ también.

```php
Route::middleware(['auth:sanctum'])->prefix('api')->group(function () {
    Route::prefix('v1')->group(function () {
        Route::apiResources([
            'credit-cards' => CreditCardController::class
        ], [
            'parameters' => [
                'credit-cards' => 'creditCard'
            ],
            'shallow' => true
        ]);
    });
});
```

Ahí estamos agrupando dentro de un _middleware_ las versiones, y dentro de la
primera versión, agregamos un
[`apiResource`](https://laravel.com/docs/10.x/controllers#api-resource-routes)
que sirve para registrar solamente las rutas que no tienen vistas asociadas.

También ponemos las opciones `parameters` y `shallow`, la primera es para
cambiar el _casing_ de los parámetros y la segunda para [hacer que las rutas se
colapsen cuando sea
posible](https://laravel.com/docs/10.x/controllers#shallow-nesting).

Así debería quedar nuestra tabla de rutas para `credit-cards`:

| Método HTTP | URI                                | Nombre de ruta       |
|-------------|------------------------------------|----------------------|
| _GET_       | `api/v1/credit-cards`              | credit-cards.index   |
| _POST_      | `api/v1/credit-cards`              | credit-cards.store   |
| _GET_       | `api/v1/credit-cards/{creditCard}` | credit-cards.show    |
| _PUT/PATCH_ | `api/v1/credit-cards/{creditCard}` | credit-cards.update  |
| _DELETE_    | `api/v1/credit-cards/{creditCard}` | credit-cards.destroy |

### Políticas

Ahora registramos las políticas, porque aunque Laravel tiene registro
automático, nuestras políticas no están en el folder por defecto, por lo que
tenemos que decirle donde están.

Las rutas y políticas quedan así:

<div class="text-center underline mb-4">

[**Ver código**
&nbsp;(GitHub)](https://github.com/halivert/credit-logbook/commit/25cfae482ca3fa8de39fdeb79fbb4566cfcf8ec3?diff=unified)

</div>

### Traducciones

El idioma por defecto de nuestra aplicación será ✨ **español** ✨ pero de todas
formas vamos a agregar algunos archivos de traducción ya que nos servirán para
estandarizar los mensajes y nombres de atributos.

Cambiamos el idioma por defecto en `config/app.php` y luego publicamos los
archivos de traducción.

```sh
sail artisan lang:publish
```

Tenemos que copiar los archivos a una nueva carpeta `es_MX` y entonces traducir
todo... 😩

Pero bueno, aquí estamos (lo hizo chat gpt 🤷🏽).

<div class="text-center underline mb-4">

[**Ver código**
&nbsp;(GitHub)](https://github.com/halivert/credit-logbook/commit/e51cf04f46d468320caac87b03c1dd806057b634?diff=unified)

</div>

Luego agregamos las nuevas etiquetas.

<div class="text-center underline mb-4">

[**Ver código**
&nbsp;(GitHub)](https://github.com/halivert/credit-logbook/commit/74d9d425af0883571b6a8d55589ff03e96f4772c?diff=unified)

</div>

### _Form requests_

Vamos a utilizar [_form
requests_](https://laravel.com/docs/10.x/validation#form-request-validation)
para validar los datos que llegan y saber si debemos guardarlos en la base de
datos o solicitar correcciones al usuario...

Pero esto lo dejaremos para el siguiente sprint.
