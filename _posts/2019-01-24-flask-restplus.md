---
author: hali
title: "Flask RESTPlus"
date: 2019-01-24 00:31
categories: ["¡Código!", "Ya me pasó"]
truncatewords: 48
---

Si ya tienes el entorno listo para alojar una aplicación web escrita en Python
(si no, puedes verlo en [esta publicación][1]), entonces te preguntarás como
escribir dicha aplicación.

Desde hace un tiempo, me volví aficionado a crear APIs, así que les mostraré
cómo hacer una en Python.

### Prerrequisitos
- [Python][2] (Usé Python 3.7)
- WSGI para Apache

### Instrucciones
Comenzaremos activando el entorno virtual que creamos en la publicación
anterior: `env\Scripts\activate` y una vez activado, instalamos el módulo que
nos hace falta:
- [Flask-RESTPlus][3]

`pip install flask-restplus`

### ¡Código!
Ahora comenzaremos con el código necesario para los endpoints de la API, primero
el código para los recursos.

```python
# Importamos los archivos necesarios.
from flask_restplus import (Resource)
from flask import (abort)

# Creamos un diccionario, en este caso se
# llamará `tasks` y es una lista con dos objetos.
tasks = [
    {
      'id': 1,
      'title': u'Comprar cosas',
      'description': u'Leche, Queso, Pizza, Fruta',
      'done': False
    },
    {
      'id': 2,
      'title': u'Aprender python',
      'description': u'Encontrar un buen tutorial',
      'done': False
    },
]

# Después, creamos dos clases, una que devuelve la lista de las tareas y otra
# que devuelve una basandose en su id.
class TasksList(Resource):
    def get(self):
        # Devolvemos la lista con el código http 200
        return tasks, 200

class Task(Resource):
    def get(self, task_id):
        # Buscamos la tarea por su id
        task = [task for task in tasks if task['id'] == task_id]
        # Si no encontramos ninguna, devolvemos el código 404
        if len(task) == 0:
            abort(404)
        # Si encontramos algo, devolvemos la tarea con el código 200
        return task[0], 200
```
\\
Ahora, tenemos que integrarlo en la aplicación que se ejecutará en el servidor\\
Agregamos los recursos y ¡listo!
```python
# Importamos los archivos necesarios
from flask import (Flask)
from flask_restplus import (Api)

import resources

app = Flask(__name__)

# Le ponemos el prefijo «v1» a la API
api = Api(app, prefix='/v1', catch_all_404s=True)

# Agregamos las rutas a los recursos en la API
api.add_resource(resources.TasksList, '/tasks')
api.add_resource(resources.Task, '/tasks/<int:task_id>')

if __name__ == '__main__':
    app.run(debug=False)
```
\\
El código completo se encuentra en el [siguiente gist][4].

Si tienes dudas o surgen errores, puedes dejar un comentario.

[1]: https://halivert.github.io/blog/2019/01/wsgi-en-apache/
[2]: https://www.python.org
[3]: https://flask-restplus.readthedocs.io/en/stable/
[4]: https://gist.github.com/halivert/7dc06a38b30c2f7093f5b841e893ec6a
