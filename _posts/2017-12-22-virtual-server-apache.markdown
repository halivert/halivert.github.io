---
title: Hacer un vhost en Apache
layout: post
categories: ["Ya me pasó"]
date: '2017-12-22 14:20 -0600'
author: Hali
truncatewords: 44
---

Un vhost o servidor virtual es útil cuando desarrollamos un sitio web y
necesitamos probarlo en nuestra computadora, podemos simular el entorno al
que va a estar expuesto y será más fácil detectar problemas.

En este post explicaré como hacer uno en Apache Linux

Requisitos:
- [httpd](http://httpd.apache.org)
- Un editor de texto

Probablemente necesitaremos permisos de superusuario para editar los siguientes
archivos, podemos hacerlo con el comando
```
$ sudoedit [ruta del archivo]
```
\\
Comenzaremos editando el archivo **httpd-vhosts.conf** \\
(En mi caso se encuentra en */etc/httpd/conf/extra/httpd-vhosts.conf*)
```conf
# httpd-vhosts.conf
<VirtualHost *:80>
    ServerAdmin "[Tu correo]"
    ServerName "[Url del sitio]"
    DocumentRoot "[Directorio del sitio]"

    <Directory "[Directorio del sitio]">
      Options Indexes FollowSymLinks MultiViews
      AllowOverride All
      Order allow,deny
      allow from all
      Require all granted
    </Directory>

    ErrorLog "[Bitácora de errores]"
    CustomLog "[Bitácora de peticiones]" common
</VirtualHost>
```
\\
Crearemos una etiqueta *VirtualHost \*.80* para cada servidor virtual que utilicemos.
Las opciones en la etiqueta de directory sirven para poder usar un framework como 
[Laravel](https://laravel.com) y también para poder utilizar un archivo *.htaccess*.

El siguiente paso es editar el archivo **hosts** \\
(Generalmente se encuentra en */etc/hosts*)
```conf
# hosts
127.0.0.1 [Url del sitio]
```
\\
Agregaremos una línea como la anterior para cada servidor virtual que hayamos agregado 
en el archivo *httpd-vhosts.conf*

Para la url se recomienda utilizar dominios como:
- .test 
- .example
- .invalid
- .localhost

Por último tenemos que reiniciar nuestro servicio de apache y listo, ahora ya podemos 
acceder a nuestro servidor virtual desde nuestro navegador.