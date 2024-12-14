---
author: halivert
category: "¡Código!"
date: "2018-03-10 02:26:45"
lastModification: "2018-10-25 23:44:35"
tags: ["C++", "Matrices", "Gauss-Jordan"]
title: "Matrices en C++"
---

Hace algún tiempo asistí al club de algoritmia de la ESCOM, en realidad nunca
llegué a ser tan bueno como las personas de ahí, pero en ese lugar fue donde
mejoré mi estilo de programación (aunque aún puede mejorar más... y mucho) y
aprendí algunos trucos.

<!-- Seguir leyendo -->

Hice una clase de Matrices con sobrecarga de operadores y con algunas funciones
para resolver algunos problemas, gracias al club que les mencionaba, sé el
código para resolver una matriz con [Gauss-Jordan][1].

Es mucho código para analizar pero les dejo el repositorio para que lo puedan
ver, y cualquier duda pueden ponerse en contacto conmigo.

[Matrices][2]

Cosas incluidas:

- 3 Constructores:
  - Matriz de m \* n.
  - Matriz cuadrada n \* n.
  - Matriz a partir de vector de vectores de enteros o dobles.
- Impresión de matriz de enteros o de dobles.
- Transpuesta de una matriz.
- Eliminación gaussiana.
- Sobrecarga de operadores:
  - Suma.
  - Resta.
  - Multiplicación (por otra matriz o por un número).
  - Acceso a elemento.

[1]: https://es.wikipedia.org/wiki/Eliminación_de_Gauss-Jordan
[2]: https://github.com/halivert/hali-matrices
