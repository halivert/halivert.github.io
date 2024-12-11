---
author: halivert
category: "Ya me pasó"
date: "2018-10-26 00:23:39 -0500"
last_modification: "2018-11-20 22:29"
tags: ["Vim", "Fechas", "Jekyll"]
title: "Agregar fecha con Vim"
---

Mensaje para el Halí del futuro: no escribas las fechas manualmente para
tus posts hechos con Jekyll... puedes simplemente utilizar dos funciones
muy útiles de Vim.

<!-- Seguir leyendo -->

`put`: Sirve para poner un texto de un registro después de la línea
actual.

`strftime`: Da como resultado una cadena representando una fecha y hora,
si no se indica, es la fecha actual y para el formato existen las
variables:

|--------------------------|---------------------------------|
| Cadena de formato        | Ejemplo                         |
|--------------------------|---------------------------------|
| %a %d %b %Y              | vie 26 oct 2018                 |
| %b %d, %Y                | oct 26, 2018                    |
| %d/%m/%y %H:%M:%S        | 26/10/18 00:21:19               |
| %H:%M:%S                 | 00:21:37                        |
| %T                       | 00:21:48                        |
| %m/%d/%y                 | 10/26/18                        |
| %y%m%d                   | 181026                          |
| %Y-%m-%d                 | 2018-10-26                      |
| %a, %d %b %Y %H:%M:%S %z | vie, 26 oct 2018 00:23:00 -0500 |
|--------------------------|---------------------------------|

Así, para obtener, por ejemplo la fecha `2018-10-26 00:23` (lo
que seguramente estabas buscando), necesitas colocar:
```
:put=strftime('%Y-%m-%d %H:%M')
```
Gracias por leer esto, adiós.
