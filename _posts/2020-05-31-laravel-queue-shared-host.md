---
author: "halivert"
title: "Tareas en cola, Laravel (Servidor compartido)"
date: "2020-05-31 00:50"
category: "Ya me pasó"
tags: ["Laravel", "Host", "Server"]
---

No quería demasiado retraso en las peticiones que enviaban un correo, así que
decidí utilizar el `QUEUE_CONNECTION=database` en el archivo de configuración
(.env) y así comienza ese "largo" camino a usar una cola en Laravel para ciertas
tareas que llevan poco más de 1 segundo, en este caso notificaciones.

<!-- Seguir leyendo -->

Suponiendo que tenemos las notificaciones que deseamos utilizar, creamos las
migraciones (en caso que no existan) para las tablas que utilizaremos para
guardar las tareas en la cola (jobs) y las tareas fallidas (failed_jobs).

```sh
php artisan queue:table
php artisan queue:failed-table
```

Ahora tenemos que programar el inicio y reinicio (opcional) de la cola para que
ejecute las tareas que guardamos ahí.

En nuestro archivo `app/Console/Kernel.php` agregamos lo siguiente al método
`schedule`.

```php
$schedule->command('queue:work --tries=3 --delay=5')
  ->everyMinute()
  ->withoutOverlapping()
  ->runInBackground()
  ->appendOutputTo(config('queue.log', 'queue.log'));

// Opcionalmente si queremos reinicar la cola cada 10 minutos
$schedule->command('queue:restart')->everyTenMinutes();
```

Dentro del comando que ejecutamos le pedimos que intente cada tarea 3 veces en
caso de fallar y que tarde 5 segundos antes de volverlo a intentar.

Además estamos pidiendo a Laravel que se ejecuten las tareas que están en la
cola cada minuto (`everyMinute`) sin que se traslape con otro proceso que
hayamos ejecutado (`withoutOverlapping`), además le pedimos que lo haga "tras
bambalinas" (`runInBackground`) para continuar con los demás procesos en el
método schedule y que añada la salida a un archivo que obtenemos de la
configuración (`appendOutputTo`), por defecto `queue.log`.

Ahora solo falta agregar los cronjobs correspondientes para que se ejecuten los
procesos que definimos en este método.

Tecleando `crontabs -e` se abre el archivo donde agregaremos la siguiente línea.

```
* * * * * cd [ruta del proyecto] && php artisan schedule:run >> /dev/null 2>&1
```

Y listo, nuestras tareas en cola comenzarán a ejecutarse cuando guardemos las
crontabs.

Esto resulta particularmente útil para servidores compartidos en donde no puedes
instalar cosas a tu antojo, por ejemplo `supervisor`.

Y nada, aquí están las fuentes.

<https://laravel.com/docs/7.x/queues><br>
<https://laravel.com/docs/7.x/scheduling><br>
<https://laracasts.com/discuss/channels/laravel/free-queue-solution-for-shared-hosting>

Adiós 👋🏽
