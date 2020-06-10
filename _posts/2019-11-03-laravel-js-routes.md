---
author: halivert
title: "Cómo utilizar rutas de Laravel en JS"
date: "2019-11-03 20:24"
category: "Ya me pasó"
tags: ["Laravel", "JavaScript", "Vue.js", "JSON", "JS", "Código!"]
---

Generalmente utilizamos JavaScript para el front-end de nuestras aplicaciones,
si además empleamos [Laravel][], notaremos que incluye un módulo muy útil
llamado Webpack Mix, que nos ayuda a preprocesar nuestros archivos JS.

<!-- Seguir leyendo -->

Un problema surge cuando queremos acceder a las rutas que definimos en Laravel
desde cualquier módulo de JS. Una de las soluciones más sencillas es exportar
todas nuestras rutas a un JSON y después utilizar una función que tenga un
comportamiento similar a la función `route` de Laravel pero en JS.

### Código
Para ello propongo lo siguiente, se trata de un comando de Laravel (se puede
utilizar con `php artisan`) y está compuesto por lo siguiente:

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
       * JSON, por defecto (y por ahora), omite las rutas de "telescope".
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
$content = "var routes = ";
$content .= json_encode($routes, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
$content .= ";\n\n";
```

Después construimos la función que utilizaremos para obtener las rutas.
```php
$content .= "const route = (routeName, params = []) => {\n";
$content .= "  var _route = routes[routeName];\n";
$content .= "  if (_route == null) {\n";
$content .= "    throw \"Requested route doesn't exist\";\n";
$content .= "  }\n";
$content .= "  var uri = _route.uri;\n";
$content .= "  for (var i = 0; i < params.length; i++) {\n";
$content .= "    uri = uri.replace(/{[\w]+}/, params[i]);\n";
$content .= "  }\n";
$content .= "  if (uri.includes(\"}\")) {\n";
$content .= "    throw \"Missing parameters\";\n";
$content .= "  }\n";
$content .= "  return '/' + uri;\n";
$content .= "}\n";
```

Esta función recibe el nombre de la ruta y un arreglo de parámetros, después
busca en las rutas creadas una que coincida con el nombre que le enviamos y si
no existe arroja un error, de lo contrario obtiene la URI, sustituye con una
regex (que no sé como hice) los parámetros uno a uno y arroja un error si
faltan parámetros, en caso de que sobren simplemente los ignorará.

```php
$content .= "\nexport { route };";

$fileName = $this->option("name");
if ($this->createFile($fileName, $content)) {
  $this->info("{$fileName} created");
}
```

Por último exporta la función y crea el archivo.

### Antes de usar
Ya que hemos agregado el comando a Laravel, entonces lo ejecutamos
```shell
php artisan create:routes
```

Posterioremente debemos agregar el archivo a nuestro `webpack.mix.js`, para
que sea preprocesado.
```js
mix.js("resources/js/routes", "public/js");
```

Y después de un `yarn prod` o `npm prod` podremos hacer uso de nuestra nueva
función, cuando queramos llamar una ruta por su nombre dentro de un archivo
JS, debemos importarla.
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


### Extra
Sí te parece una buena solución, solo debes agregar el siguiente paquete a tu
proyecto:
```shell
composer require halivert/laravel-js-routes
```

Dudas al teléfono en pantalla 👋🏽

[Laravel]: https://laravel.com
