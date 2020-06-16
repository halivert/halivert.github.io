---
title: "Hacer un vhost en Apache"
category: "Ya me pasó"
date: "2017-12-22 14:20"
author: "halivert"
---

Un vhost o servidor virtual es útil cuando desarrollamos un sitio web y
necesitamos probarlo en nuestra computadora, podemos simular el entorno al
que va a estar expuesto y será más fácil detectar problemas.

En este post explicaré como hacer uno en Apache Linux

<!-- Seguir leyendo -->

Requisitos:

- [httpd][1]
- Un editor de texto

Probablemente necesitaremos permisos de superusuario para editar los siguientes
archivos, podemos hacerlo con el comando

```
$ sudoedit [ruta del archivo]
```

\\
Comenzaremos editando el archivo **httpd-vhosts.conf** \\
(En mi caso se encuentra en _/etc/httpd/conf/extra/httpd-vhosts.conf_)

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
Crearemos una etiqueta _VirtualHost \*.80_ para cada servidor virtual que
utilicemos.
Las opciones en la etiqueta de directory sirven para poder usar un framework
como [Laravel][2] y también para poder utilizar un archivo
_.htaccess_.

El siguiente paso es editar el archivo **hosts** \\
(Generalmente se encuentra en _/etc/hosts_)

```conf
# hosts
127.0.0.1 [Url del sitio]
```

\\
Agregaremos una línea como la anterior para cada servidor virtual que hayamos
agregado en el archivo _httpd-vhosts.conf_

Para la url se recomienda utilizar dominios como:

- .test
- .example
- .invalid
- .localhost

Por último tenemos que reiniciar nuestro servicio de apache y listo, ahora ya
podemos acceder a nuestro servidor virtual desde nuestro navegador.

[1]: http://httpd.apache.org
[2]: https://laravel.com
