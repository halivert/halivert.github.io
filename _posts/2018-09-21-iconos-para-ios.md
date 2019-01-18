---
author: hali
layout: post
comments: true
title: 'Iconos para iOS'
date: 2018-09-21 01:42 -05:00
truncatewords: 42
categories: ['Ya me pasó', '¡Código!']
---

Desarrollando una aplicación para iOS me encontré con que necesitas un icono diferente para cada dispositivo, debes
cambiar la resolución y el nombre. Así que escribí un script para ayudar con esa tarea.

Dicho script recibe como parámetros una lista de iconos (en la máxima resolución deseada, formatos jpg, gif, png) y
nos da como resultado la copia de esos iconos en diferentes resoluciones y con diferentes nombres, según los
lineamientos que [apple recomienda](https://developer.apple.com/library/archive/qa/qa1686/_index.html).

### Requisitos
- Iconos para copiar (al menos uno).
- Interfaz de línea de comandos.
- [`sips`](https://ss64.com/osx/sips.html), una herramienta muy útil para procesar imágenes.
- [`bc`](https://www.gnu.org/software/bc/manual/html_mono/bc.html), nos servirá para hacer algunos cálculos.
- [`tail`](http://man7.org/linux/man-pages/man1/tail.1.html) y [`cut`](https://linux.die.net/man/1/cut), para
  manipular un par de cadenas.
- Editor de texto. (Yo uso [Vim](https://www.vim.org))

### Hora del código
Primero revisaremos si la ejecución del script tiene parámetros, de no ser así, lo terminamos y ya.

```
if [ $# -eq 0 ]
then
  echo "No arguments"
  exit
fi
```

Después, recorremos toda la lista de parámetros, en este caso iconos y vamos realizando algunas tareas simples.
Lo primero es obtener el nombre del icono, luego su extensión y separarlos.
(Aquí solo ejemplificaré la copia a una resolución).

```
for file in "$@"
do
  fullFileName=$file
  extension="${fullFileName##*.}"
  fileName="${fullFileName%.*}"
```

Ya que [reducir el tamaño de un icono es preferible a
aumentarlo](https://helpx.adobe.com/es/photoshop/kb/advanced-cropping-resizing-resampling-photoshop.html) suponemos
que los iconos que se pasen como parámetros son los de la máxima resolución posible, o sea los que llevarán el
prefijo `@3x`, como: `Icon@3x.png` (igual puedes cambiar eso), entonces calculamos cual es la dimensión máxima de
nuestro icono.

```
  height=$(sips -g pixelHeight $fullFileName | tail -n1 | cut -d" " -f4)
  width=$(sips -g pixelWidth $fullFileName | tail -n1 | cut -d" " -f4)
  maxDim=$(( $height > $width ? $height : $width ))
```

Posteriormente, pasamos a crear los nombres que llevarán las copias de nuestro icono. Y lo copiamos con ese nombre.

```
  r1x="$fileName@1x.$extension"

  tee $r1x < $fullFileName > /dev/null
```

Por último cambiamos la resolución de nuestro icono y listo!

```
  sips -Z $(echo "scale=3; $maxDim / 3" | bc -l) $r1x > /dev/null

done
```

Nota: Si los iconos que deseas copiar son los de la resolución media `@2x`, entonces en lugar de dividir entre 3 la
dimensión máxima, deberás dividir entre 2, para los iconos con resolución pequeña y multiplicar por 3/2 para los de
resolución más grande y así con la resolución pequeña.

El código completo lo puedes encontrar en [este
gist](https://gist.github.com/halivert/32650fcbc9f4b12cfabc94cdb4a32eed)

### Uso
```
./copyIcons.sh [Icono o iconos a copiar]
```

Mi uso favorito es poner el script en una carpeta donde tenga todos los iconos que quiero copiar y pum!

```
./copyIcons.sh *.png
```

Ahora tenemos los iconos necesarios para seguir con el desarrollo de nuestra aplicación.

