---
author: halivert
title: "Upgrading Webpack to Vite in Laravel Sail"
date: "2022-07-06 12:40 -0500"
category: "Ya me pasó"
tags: ["Web", "Laravel", "JS"]
translations:
    - short: es
      post: _posts/2022-07-06-upgrade-webpack-to-vite-laravel-sail.md
---

Laravel has just added support for [Vite][1], a very powerful frontend
development tool, and you can use it if you make some small changes, as
suggested on [the official page for this migration][2].

But if you are also using Sail, which is a useful tool for integrating Docker
into your development environment, you will also have to make some other
changes.

<!-- Keep reading -->

One of the first things to do is to tell Vite that our development server is on
another host:

To do this we add two variables to our .env file.<br />
<small>
    The variable `VITE_PORT` is optional and by default it will take that number
</small>

```sh
# .env
VITE_HOST=${APP_HOST}
VITE_PORT=5173
```

We then add these variables to the Vite configuration file.

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

Then we expose that port from our `docker-compose.yml`: In services >
laravel.test (or the name of our host) > ports we add the following line, which
will take the Vite port and expose it to the same port of our development
environment.

```yml
services:
    laravel.test:
        ports:
            - '${VITE_PORT:-5173}:5173'
```


This should be enough to achieve a connection to Vite, from outside of Docker.

[1]: https://vitejs.dev/
[2]: https://github.com/laravel/vite-plugin/blob/main/UPGRADE.md#migrating-from-laravel-mix-to-vite
