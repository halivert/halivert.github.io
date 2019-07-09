---
author: "Hali"
title: "Laravel en Linux Pt. 1"
date: 2019-07-09 07:36
categories: ["¡Código", "Ya me pasó"]
truncatewords: 27
---

En esta ocasión vamos a ver como instalar el framework [Laravel][1] en un
entorno Linux, también como crear una aplicación «vacía» y agregar un login
sencillo.

### Contenido
- [Introducción](#introduction)
- [Requisitos](#requirements)
- [Instalación](#instalation)

<a class="anchor" id="introduction"></a>
### Introducción
Laravel es un framework escrito en [PHP][3]. Según la página oficial, está
escrito para _«Web artisans»_.

¿Por qué Laravel?
- Puedes alcanzar velocidades de desarrollo bastante altas.
- Está escrito en PHP, así que muchos servidores lo soportan.
- El manejo de bases de datos es muy sencillo.
- El código se encuentra bastante bien estructurado.
- Puedes integrarlo fácilmente con [Vue.js][4].

<a class="anchor" id="requirements"></a>
### Requisitos
Necesitamos PHP, un buen editor, una terminal, [composer][5] y opcionalmente
un administrador de paquetes JS ([npm][6] o [yarn][7]).

<a class="anchor" id="instalation"></a>
### Instalación
Para el instalador de Laravel, utilizaremos composer, con el siguiente comando
en nuestra terminal:
```shell
composer global require laravel/installer
```
y listo, para crear una aplicación, solo tenemos que escribir:
```shell
laravel new [Nombre de la aplicación]
# Ejemplo
# laravel new indigo-toupee
```
al final resultará algo como esto...

![laravel new indigo-toupee](/img/2019-07-09-laravel-linux/laravel-new.png)

ahora cambiamos al nuevo directorio que acabamos de crear, y escribiendo:
```shell
php artisan serve
```
podemos entrar al vínculo que nos dice para ver nuestra aplicación.

![php artisan serve](/img/2019-07-09-laravel-linux/php-artisan-serve.png)

y la aplicación vacía se ve...

![localhost:8000](/img/2019-07-09-laravel-linux/laravel-app.png)

Algo que valoro mucho en Laravel, es que puedes implementar un login con un
comando:
```shell
php artisan make:auth
```
después de reiniciar el servidor aparecen dos opciones nuevas en la esquina
superior derecha:

![localhost:8000](/img/2019-07-09-laravel-linux/laravel-app-auth.png)

con esto tienes configurada una aplicación además del login de la misma.
Pero... si intentas registrar un usuario no funcionará.

Esto es porque no tenemos configurada una base de datos... aún.

Vamos a editar el archivo `.env`, busca las variables que comienzan con `DB_`
y lo cambiaremos como sigue:
```shell
# Anterior
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel
DB_USERNAME=root
DB_PASSWORD=

# Nuevo
DB_CONNECTION=sqlite
DB_DATABASE="indigo-toupee.sqlite"
```
Nota:
Si no queremos que la base de datos esté en el directorio `database`, en la
variable `DB_DATABASE` tenemos que colocar su ruta absoluta y no editar el
archivo `config/database.php`.

###### (Opcional)
Si queremos que la base de datos se encuentre en el directorio `database` de
nuestro proyecto, entonces editamos también la configuración de sqlite en el
archivo `config/database.php`.
```php
'sqlite' => [
  'driver' => 'sqlite',
  'url' => env('DATABASE_URL'),
  // Agregamos el prefijo con la función database_path, para obtener
  // la ruta absoluta para la base de datos
  'database' => database_path(env('DB_DATABASE', 'database.sqlite')),
  'prefix' => '',
  'foreign_key_constraints' => env('DB_FOREIGN_KEYS', true),
],
```
Creamos la base de datos:
```shell
touch database/indigo-toupee.sqlite
php artisan migrate # Este comando crea las tablas necesarias en la BDD
```

![php artisan
migrate](/img/2019-07-09-laravel-linux/php-artisan-migrate.png)

Ahora estamos listos para registrar usuarios e iniciar sesión.

![logged-in](/img/2019-07-09-laravel-linux/logged-in.png)

En el siguiente artículo veremos como utilizar esta aplicación en un servidor
apache y posteriormente la integración con Vue.js.

[1]: https://laravel.com
[2]: /blog/2017/12/virtual-server-apache/
[3]: https://www.php.net
[4]: https://vuejs.org
[5]: https://getcomposer.org
[6]: https://www.npmjs.com
[7]: https://yarnpkg.com/es-ES/
