---
author: halivert
category: "Ya me pasó"
tags: ["Laravel", "JavaScript", "Vue.js", "JSON"]
date: "2019-11-03 20:24"
title: "Laravel routes in JavaScript"
lastModification: "2020-07-05 00:18"
translations:
  - short: es
    post: 2019-11-03-laravel-js-routes
---

TL;DR With a Package
<https://github.com/halivert/laravel-js-routes>


We generally use JavaScript for the front-end in our applications, if we also
use [Laravel][1] we notice that it includes a very useful wrapper called Laravel
Mix, that can preprocess our JS files.

<!-- Keep reading -->

There's a problem when we want to get some Laravel route in any JS module. A
naive approach is to export all our routes into a JSON and then use a function
that has a similar behavior but in JS.

### Code
That's why I crafted a Laravel command (usable with `php artisan`) composed by
this code:

```php
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Route;

class CreateJSRoutesCommand extends Command
{
    public function handle()
    {
      /*
       * When we call the command, this method executes
       * first.
       */
    }

    public function createFile($fileName, $contents)
    {
      /*
       * This method creates a file with name equals to
       * $fileName and content equals to $contents, it also
       * asks if you want to overwrite the file in case
       * another with same name exists.
       */
    }

    private function includeRoute($value, $routeName)
    {
      /*
       * This function determines if a route must be included
       * or not in our JSON, by default excludes telescope
       * routes.
       */
    }

    public function getJSPath($path)
    {
      /*
       * This returns the route where our new file with JSON
       * and function must be written.
       */
    }
}
```

The `handle` function does most of the work, first we get Laravel routes, filter
it and keep its URI.

```php
$routes = collect(
    Route::getRoutes()->getRoutesByName()
  )->filter(function ($route, $key) {
    return $this->includeRoute($route, $key);
  })->map(function ($route) {
    return [
      'uri' => $route->uri
    ];
  });
```

The content of our file will be composed of the JSON and function `route` so we
start adding the var name and the content.

```php
$jsonFlags = JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE;

$content = 'const routes = ';
$content .= json_encode($routes, $jsonFlags);
$content .= ";\n\n";
```

Then we build the `route` function (it's on a separate file)
```php
$content .= file_get_contents(
    __DIR__ . '/../assets/js/routeFunction.js'
);
```
```js
// assets/js/routeFunction.js

// This function receives as a route name and an array of
// parameters
const route = (routeName, params = []) => {
  // It searches in the stored routes one that match with the
  // given name and if it doesn't exists throws an error
  const _route = routes[routeName];
  if (_route == null) throw "Requested route doesn't exist";

  let uri = _route.uri;

  // If an URI is found, replace the parameters with a RegEx
  // (I don't know how I did it) and throws another error if
  // there are missing parameters.
  // Remaining parameters will be ignored.

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

Finally we create the file.
```php
$fileName = $this->option('name') ?? config('app.jsroutes.name');
if ($this->createFile($fileName, $content)) {
  $this->info("$fileName created");
}
```
### Installation
```shell
composer require halivert/laravel-js-routes
```

### Before use
If we already add the command to Laravel, then we execute it with
```shell
php artisan route:tojs
```

Then we add the file to our `webpack.mix.js` file, so it can be processed.
```js
mix.js("resources/js/routes", "public/js");
```

And after a `yarn prod` or `npm prod` we can use our `routes` function when we
want to call a route by its name in a JS file.

```js
import { route } from "./routes.js";
```

### Use
Use examples:
```js
axios
  .get(route("routeName", [param1, param2]))
  .then(response => {
    console.log(response.data);
  });
```

I would love to read your comments
Happy coding! 👋🏽

[1]: https://laravel.com

