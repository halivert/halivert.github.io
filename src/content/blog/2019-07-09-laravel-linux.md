---
author: halivert
category: "Ya me pasó"
date: "2019-07-09 07:36"
lastModification: "2019-07-22 22:41"
tags: ["Laravel", "Linux", "PHP"]
title: "Laravel en Linux Pt. 1"
---

En esta ocasión vamos a ver por que y como instalar el framework [Laravel][1]
en un entorno Linux.

### Introducción
Laravel es un framework escrito en [PHP][3]. Según la página oficial, está
escrito para _«Web artisans»_.

<!-- Seguir leyendo -->
{% include assets_path.html %}

¿Por qué Laravel?
- Puedes alcanzar velocidades de desarrollo bastante altas.
- Está escrito en PHP, así que muchos servidores lo soportan.
- El manejo de bases de datos es muy sencillo.
- El código se encuentra bastante bien estructurado.
- Puedes integrarlo fácilmente con frameworks de javascript como [Vue.js][4].

### Requisitos
Necesitamos PHP, un buen editor, una terminal, [composer][5] y opcionalmente
un administrador de paquetes JS ([npm][6] o [yarn][7]).

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

{%
  include picture.html
    src="laravel-new"
    alt="laravel new indigo-toupee"
%}

ahora cambiamos al nuevo directorio que acabamos de crear, y escribiendo:
```shell
php artisan serve
```
podemos entrar al vínculo que nos dice para ver nuestra aplicación.

{%
  include picture.html
    src="php-artisan-serve"
    alt="php artisan serve"
%}

y la aplicación vacía se ve...

{%
  include picture.html
    src="laravel-app"
    alt="localhost:8000"
%}

En el siguiente artículo de esta serie, veremos como utilizar esta aplicación
en un servidor Apache y que otras cosas podemos hacer con Laravel.

[1]: https://laravel.com
[3]: https://www.php.net
[4]: https://vuejs.org
[5]: https://getcomposer.org
[6]: https://www.npmjs.com
[7]: https://yarnpkg.com/es-ES/
