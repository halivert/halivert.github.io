---
title: "Tabs en yakuake"
author: halivert
date: 2017-12-20 19:54
category: "Ya me pasó"
---

Usando Yakuake para Arch Linux me encontré con que al abrir una nueva pestaña no
se abre en el directorio “actual” por lo que busqué un poco en internet y
basándome en esta página ([ACIDBOURBON][1]) realizé un pequeño script que
(agregandolo a tu .bashrc o .zshrc) guarda tu directorio actual y después lo usa
cada vez que se inicia una nueva instancia de Yakuake.

<!--Seguir leyendo-->

```console
_Tx="$(basename "/"$(ps -f -p $(cat /proc/$(echo $$)/stat | cut -d \  -f 4) | tail -1 | sed 's/^.* //'))"
if [ $_Tx = "yakuake" ]; then
  alias cd=changeDir;

  changeDir() {
    \cd $1;
    pwd > ~/.currentDir
  }

  if [ -e ~/.currentDir ]; then
    cd $(cat ~/.currentDir)
  fi
fi
```

[1]: https://acidbourbon.wordpress.com/2016/12/03/a-quick-and-dirty-fix-for-yakuakes-open-new-tab-in-same-directory-issue/
