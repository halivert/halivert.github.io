---
author: hali
title: "WSGI en Apache"
date: 2019-01-23 00:21
categories: ["¡Código!", "Ya me pasó"]
truncatewords: 25
---

Un día, desperté con la necesidad de hacer una API RESTful en Python, tenía que
ser en un «servidor» Windows y me puse a investigar.

En esta publicación documentaré como utilizar el módulo WSGI, necesario para
alojar una aplicación web escrita en Python.

- [Prerrequisitos](#prerrequisitos)
- [Instrucciones](#instrucciones)

### Prerrequisitos
- [Python][1] (Usé Python 3.7)
- [Apache][2] (Usé Apache Lounge 2.4)
- [Microsoft Visual C++ 14.0][3]

### Instrucciones
Instalamos Python, Apache y Visual C++ 14, una vez hecho esto, podemos comenzar
con la instalación y configuración del módulo WSGI.

Para aislar el proyecto podemos utilizar los entornos virtuales de Python:
`python -m venv env` donde `env` es el folder donde se guardarán los módulos de
python y todo lo demás.

Activamos el entorno virtual `env\Scripts\activate` y una vez dentro vamos a
instalar los módulos de python necesarios:
- [Flask][4]
- [mod_wsgi][5]

`pip install flask mod_wsgi`

Nota: Si estás usando el virtual environment que viene con Python 3, la
instalación de `mod_wsgi` producirá un error, así que tendrás que copiar el
directorio `C:\Python37\libs` al directorio `env\Scripts`.

Si todo ha salido bien, entonces podrás escribir `mod_wsgi-express
module-config` y podrás ver dos líneas: Una para cargar el módulo en Apache
(comienza con `LoadModule wsgi_module`, e incluye la ruta del módulo instalado)
y otra que indica la ruta de PythonHome, ignoraremos esa por ahora.

Proseguimos a editar la configuración del servidor de Apache `httpd.conf` donde
agregaremos la línea para cargar el módulo y las siguientes que sirven para la
configuración del módulo WSGI:
```
WSGIScriptAlias [Punto de montaje] "c:/ruta/al/proyecto/archivo.wsgi"
WSGISPythonPath "c:/ruta/al/proyecto/env/lib/site-packages;c:/ruta/al/proyecto"
```
\\
Ahora bien, si necesitas usar el encabezado `Authorization` en tu aplicación
porque quizás utilices JWT authentication, entonces tienes que cambiar la opción
de pasar la autorización a las aplicaciones WSGI, con una línea más:
```
WSGIPassAuthorization On
```
\\
Pero... ¿Archivo WSGI? ¿Qué contiene eso?

Unicamente información para iniciar tu aplicación:
```python
import sys
sys.path.insert(0, "c:/ruta/al/proyecto")

from [Nombre del archivo] import [Nombre de la app] as application
```
\\
Quedó listo el entorno para una API RESTful, construiremos eso en la siguiente
publicación.

[1]: https://www.python.org
[2]: https://www.apachelounge.com
[3]: https://visualstudio.microsoft.com/downloads
[4]: http://flask.pocoo.org
[5]: https://modwsgi.readthedocs.io/en/develop
