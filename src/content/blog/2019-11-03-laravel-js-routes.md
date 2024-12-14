---
author: halivert
category: "Ya me pasó"
date: "2019-11-03 20:24"
tags: ["Laravel", "JavaScript", "Vue.js", "JSON"]
title: "Cómo utilizar rutas de Laravel en JS"
lastModification: "2020-07-05 00:18"
# translations:
#   - short: en
#     post: en/2019-11-03-laravel-js-routes
---

TL;DR Con un paquete<br>
<https://github.com/halivert/laravel-js-routes>

Generalmente utilizamos JavaScript para el front-end de nuestras aplicaciones,
si además empleamos [Laravel][1], notaremos que incluye un módulo muy útil
llamado Webpack Mix, que nos ayuda a preprocesar nuestros archivos JS.

<!-- Seguir leyendo -->

Un problema surge cuando queremos acceder a las rutas que definimos en Laravel
desde cualquier módulo de JS. Una de las soluciones más sencillas es exportar
todas nuestras rutas a un JSON y después utilizar una función que tenga un
comportamiento similar a la función `route` de Laravel pero en JS.

### Código
Para ello creé un comando de Laravel (se puede utilizar con `php artisan`)
compuesto por lo siguiente:

```php
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Route;

class CreateJSRoutesCommand extends Command
{
    public function handle()
    {
      /*
       * Cuando llamamos a nuestro comando, esto se ejecuta primero.
       */
    }

    public function createFile($fileName, $contents)
    {
      /*
       * Crea un archivo con el nombre de $fileName y como contenido
       * $contents, además pregunta si deseas sobreescribir el
       * archivo en caso de que exista uno con el mismo nombre.
       */
    }

    private function includeRoute($value, $routeName)
    {
      /*
       * Función que determina si una ruta debe incluirse o no en nuestro
       * JSON, por defecto omite las rutas de "telescope".
       */
    }

    public function getJSPath($path)
    {
      /*
       * Devuelve la ruta en donde se va a crear el nuevo archivo con las
       * rutas y la función.
       */
    }
}
```

La función `handle` es la que hace la mayor parte del trabajo, lo primero que
haremos será obtener las rutas de Laravel, las filtramos y conservamos solo su
URI.
```php
$routes = collect(
    Route::getRoutes()->getRoutesByName()
  )->filter(function ($route, $key) {
    return $this->includeRoute($route, $key);
  })->map(function ($route) {
    return [
    "uri" => $route->uri
    ];
  });
```

El contenido de nuestro archivo JS va a componerse del JSON y la función
`route` así que comenzamos agregando el nombre de la variable que usaremos y
el contenido.
```php
$jsonFlags = JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE;

$content = 'const routes = ';
$content .= json_encode($routes, $jsonFlags);
$content .= ";\n\n";
```

Después construimos la función `route` (en un archivo aparte)
```php
$content .= file_get_contents(
    __DIR__ . '/../assets/js/routeFunction.js'
);
```
```js
// assets/js/routeFunction.js

// Esta funcion recibe un nombre de ruta y un arrreglo de parámetros.
const route = (routeName, params = []) => {
  // Busca en las rutas guardadas la que tenga ese nombre y si no existe
  // arroja un error
  const _route = routes[routeName];
  if (_route == null) throw "Requested route doesn't exist";

  let uri = _route.uri;

  // Si se encuentra una URI, reemplaza los parámetros con una RegEx
  // (no sé como la hice) y arroja otro error si faltan parámetros.
  // Los parámetros que sobran son ignorados.

  const matches = uri.match(/{[\w]+}/g) || [];
  const requiredParametersCount = matches.length;

  if (params instanceof Array) {
    if (params.length < requiredParametersCount) throw "Missing parameters";

    for (let i = 0; i < requiredParametersCount; i++)
      uri = uri.replace(/{[\w]+}/, params.shift());

    for (let i = 0; i < params.length; i++)
      uri += (i ? "&" : "?") + params[i] + "=" + params[i];
  } else if (params instanceof Object) {
    let extraParams = matches.reduce((ac, match) => {
      let key = match.substring(1, match.length - 1);
      if (params.hasOwnProperty(key)) {
        uri = uri.replace(new RegExp(match, "g"), params[key]);
        delete ac[key];
      }
      return ac;
    }, params);

    Object.keys(extraParams).forEach((key, i) => {
      uri += (i ? "&" : "?") + key + "=" + extraParams[key];
    });
  }

  if (uri.includes("}")) throw "Missing parameters";

  return "/" + uri;
};

export { route };
```

Por último creamos el archivo.

```php
$fileName = $this->option('name') ?? config('app.jsroutes.name');
if ($this->createFile($fileName, $content)) {
  $this->info("$fileName created");
}
```

### Instalación
```shell
composer require halivert/laravel-js-routes
```

### Antes de usar
Ya que hemos agregado el comando a Laravel, entonces lo ejecutamos con:
```shell
php artisan route:tojs
```

Posterioremente debemos agregar el archivo a nuestro `webpack.mix.js`, para
que sea procesado.
```js
mix.js("resources/js/routes", "public/js");
```

Y después de un `yarn prod` o `npm prod` podremos hacer uso de nuestra nueva
función `route`, cuando queramos llamar una ruta por su nombre en un archivo JS.
```js
import { route } from "./routes.js";
```

### Uso
Ejemplos de uso:
```js
axios
  .get(route("routeName", [param1, param2]))
  .then(response => {
    console.log(response.data);
  });
```

Dudas al teléfono en pantalla 👋🏽

[1]: https://laravel.com
