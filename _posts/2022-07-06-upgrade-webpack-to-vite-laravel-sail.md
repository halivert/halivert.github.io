---
author: halivert
title: "Actualizar Webpack a Vite en Laravel Sail"
date: "2022-07-06 12:40 -0500"
category: "Ya me pasó"
translations:
    - short: en
      post: _posts/en/2022-07-06-upgrade-webpack-to-vite-laravel-sail.md
tags: ["Web", "Laravel", "JS"]
---

Laravel acaba de agregar soporte para [Vite][1], una herramienta para desarrollo
frontend muy poderosa, y tú puedes usarla si realizas unos pequeños cambios,
como sugiere [la página oficial para esta migración][2].

Pero si además estás utilizando Sail, que es una útil herramienta para integrar
Docker en tu entorno de desarrollo, además tendrás que hacer algunos otros
cambios.

<!-- Seguir leyendo -->

Una de las primeras cosas que hay que hacer es decirle a Vite, que nuestro
servidor de desarrollo está en otro host:

Para ello agregamos dos variables a nuestro archivo .env<br />
<small>
    La variable `VITE_PORT` es opcional y por defecto tomará ese número
</small>

```sh
# .env
VITE_HOST=${APP_HOST}
VITE_PORT=5173
```

Luego agregamos dichas variables al archivo de configuración de Vite.

```js
// vite.config.js
import { defineConfig, loadEnv } from "vite"
import laravel from "laravel-vite-plugin"

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd())

    return {
        // ...
        server: {
            host: env.VITE_HOST,
            port: env.VITE_PORT,
        },
    }
})
```

Después exponemos dicho puerto desde nuestro `docker-compose.yml`:
En services > laravel.test (o el nombre de nuestro host) > ports agregamos la
siguiente línea, que tomará el puerto de Vite y lo expondrá al mismo puerto de
nuestro entorno de desarrollo.

```yml
services:
    laravel.test:
        ports:
            - '${VITE_PORT:-5173}:5173'
```

Esto debería ser suficiente para lograr una conexión con Vite, desde fuera de
Docker.

[1]: https://vitejs.dev/
[2]: https://github.com/laravel/vite-plugin/blob/main/UPGRADE.md#migrating-from-laravel-mix-to-vite
