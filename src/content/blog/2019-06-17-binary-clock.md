---
author: "halivert"
category: "Divagando"
date: "2019-06-17 10:39"
image: "../../assets/img/2019-06-binary-clock/binary-clock.png"
imageAlt: "Reloj binario que marca las 23:53:49"
tags: ["Hora", "Aprender"]
title: "Reloj binario"
---

En este post les comparto un tip para practicar la lectura de números
binarios.

### «La práctica hace al maestro»
<!-- Seguir leyendo -->
Seguramente habrás notado que cuando utilizas cierta habilidad de manera
cotidiana te cuesta menos trabajo cada vez.

Pues hoy te propongo que para aprender números binarios intentes leer la hora
de una forma... diferente, con un **reloj binario**.

<article>

![Reloj binario que marca las 23:53:49](../../assets/img/2019-06-binary-clock/binary-clock.png)

</article>

¿Pero qué está pasando aquí? Bueno, este artefacto que estás viendo es un
simple reloj y pese a que es un poquito menos fácil de leer que un reloj de
manecillas, te puede ayudar a leer con más fluidez números binarios.

Primero debemos saber que existen dos tipos de reloj binario... Uno es
completamente binario, y otro es en parte decimal (BCD).

Vamos a ver cómo leer ambos tipos de reloj.

Lo primero que debemos saber es que, tanto para el reloj binario como para el
BCD, las primeras dos columnas representan la hora, las siguientes dos los
minutos y las últimas dos... exacto, los segundos.

También, cada una de las casillas pueden o no estar marcadas, o llenitas y
representan una potencia de 2 (e.g. si la casilla 3 está marcada, es 2³ o sea
8 y así sucesivamente).

Ahora vienen las diferencias.

### Binario
<article>

![Reloj binario que marca las 23:53:49](../../assets/img/2019-06-binary-clock/binary-clock.png)

</article>

Se ve como el de aquí arriba, y el primer número (la primer potencia de dos)
es el cuadrito de hasta abajo en la segunda columna de cada bloque...
<article class="flex is-printable">
  <div class="flex-1">

![Las 23 horas en un reloj binario](../../assets/img/2019-06-binary-clock/binary-clock-hr.png)

  </div>
  <p class="flex-1">
    Utilizamos solo los primeros 5 espacios, ya que tendremos 23 horas al día
    como máximo.
  </p>
</article>
Este reloj marca las 23 horas: 2⁰ + 2¹ + 2² + 2⁴ = 23.

Análogamente con los minutos y segundos.
<article class="flex is-printable">
  <div class="flex-1">

![53 minutos en un reloj binario](../../assets/img/2019-06-binary-clock/binary-clock-min.png)

  </div>
  <div class="flex-1">

![49 segundos en un reloj binario](../../assets/img/2019-06-binary-clock/binary-clock-seg.png)

  </div>
</article>

En resumen, este reloj dice que son las: **23:53:49**.

### BCD
<article>

![Reloj binario BCD que marca las 00:23:21](../../assets/img/2019-06-binary-clock/binary-clock-bcd.png)

</article>

Mencionabamos que son muy similares, salvo que en este formato, cada columna
equivale a un digito. Así, la primer columna equivale a las décimas de las
horas, la segunda a sus unidades, la tercera, decimas de los minutos, y así
sucesivamente.
<article class="flex is-printable">
  <div class="flex-1">

![0 horas en un reloj binario BCD](../../assets/img/2019-06-binary-clock/binary-clock-bcd-hr.png)

  </div>
  <p class="flex-1">
    Es fácil ver que este reloj marca las 0 horas.
  </p>
</article>

<article class="flex is-printable">
  <div class="flex-1">

![23 minutos en un reloj binario BCD](../../assets/img/2019-06-binary-clock/binary-clock-bcd-min.png)

  </div>
  <div class="flex-1">

![21 segundos en un reloj binario BCD](../../assets/img/2019-06-binary-clock/binary-clock-bcd-seg.png)

  </div>
</article>

En conjunto, este reloj marca las: **00:23:21**.

Te dejo otras capturas de relojes binarios para que practiques.

#### Práctica binario
<div class="flex flex-wrap is-printable gap-3">
  <div class="flex-1">

![Ejercicio de reloj binario](../../assets/img/2019-06-binary-clock/20190617-bin-1.png)

  </div>
  <div class="flex-1">

![Ejercicio de reloj binario](../../assets/img/2019-06-binary-clock/20190617-bin-2.png)

  </div>
  <div class="flex-1">

![Ejercicio de reloj binario](../../assets/img/2019-06-binary-clock/20190617-bin-3.png)

  </div>
  <div class="flex-1">

![Ejercicio de reloj binario](../../assets/img/2019-06-binary-clock/20190617-bin-4.png)

  </div>
</div>

#### Práctica BCD
<div class="flex is-printable flex-wrap gap-3">
  <div class="flex-1">

![Ejercicio de reloj binario BCD](../../assets/img/2019-06-binary-clock/20190617-bcd-1.png)

  </div>
  <div class="flex-1">

![Ejercicio de reloj binario BCD](../../assets/img/2019-06-binary-clock/20190617-bcd-2.png)

  </div>
  <div class="flex-1">

![Ejercicio de reloj binario BCD](../../assets/img/2019-06-binary-clock/20190617-bcd-3.png)

  </div>
  <div class="flex-1">

![Ejercicio de reloj binario BCD](../../assets/img/2019-06-binary-clock/20190617-bcd-4.png)

  </div>
</div>

Un chilión de dolares a quien comente las horas de todos.<br>
Hasta la próxima.
