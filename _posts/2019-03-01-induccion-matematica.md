---
author: "Hali"
title: "Inducción matemática"
date: 2019-03-01 11:03
hasmath: true
categories: ["Matemáticas"]
truncatewords: 26

---

En esta entrega del primer artículo de la sección [Matemáticas][1] les voy a
mostrar una herramienta muy poderosa en el pensamiento matemático, la
**inducción matemática**.

Antes de entrar de lleno a esta, vamos a revisar lo que dice el principio del
buen orden.

### Principio del buen orden
Para que un conjunto \\(A\\) cumpla con el principio del buen orden tiene que
cumplir con el siguiente enunciado \[[2][2]\]:
<p class="equation">
\[
\begin{aligned}
A \ne \emptyset \Rightarrow \exists m \in A : \forall n \in A\text{ }m < n
\end{aligned}
\]
</p>

Podemos leer el enunciado de la siguiente manera: _Sea \\(A\\) un conjunto no
vacío, entonces, existe un número \\(m\\) que pertenece a \\(A\\) tal que para
cada \\(n\\) perteneciente a \\(A\\), \\(m\\) es menor que \\(n\\)_.

Con esa definición podemos notar que cualquier conjunto de números diferente al
conjunto vacío, y que tenga un elemento mínimo, cumple con el principio del buen
orden. Es decir, un conjunto finito, como \\(B = \\{ -1, -5, 0, 100, -4 \\}\\)
cumple con el principio del buen orden, ya que tiene un elemento \\(m\\) en este
caso \\(-5\\) tal que todos los otros elementos son mayores que este.

Otro ejemplo de un conjunto que cumple con este principio es el de los números
naturales \\(\mathbb{N}\\) que son los números enteros positivos, en algunas
definiciones comienzan con \\(0\\), es decir: \\(0, 1, 2, 3,...\\) mientras que
en otras comienzan con 1, o sea: \\(1, 2, 3,...\\). En cualquier caso, este
conjunto de números cumple con el principio del buen orden.

### Inducción matemática
Ahora pasamos a la inducción, que es una técnica para demostrar proposiciones
matemáticas. Se utiliza en conjuntos bien ordenados, es decir, que cumplan con
el principio del buen orden, y para hacer uso de esta, es necesario
realizar solamente dos pasos \[[3][3]\]:
- Caso base: Esto es, demostrar que la proposición se cumple para el elemento
más chico de nuestro conjunto. (Muchas veces \\(1\\) o \\(0\\) pero no
necesariamente alguno de estos).
- Paso inductivo: Donde se asume que la proposición se cumple para un
elemento \\(n\\), entonces se cumple también para el siguiente elemento \\(n +
1\\).

Estos dos pasos establecen que la proposición se cumple para todo el conjunto de
números.

Con esto en mente, vamos a hacer un ejemplo:<br>
Probar que:
<p class="equation">
\[
\begin{aligned}
2^0 + 2^1 + 2^2 + ... + 2^n = 2^{n+1} - 1
\end{aligned}
\]
</p>
Ahora vamos a realizar los dos pasos para demostrar que esa proposición es
cierta, primero el caso base. Notamos que el primer término es \\(2^n\\) con
\\(n = 0\\).
<p class="equation">
\[
\begin{aligned}
2^n &= 2^0 \\
    &= 1
\end{aligned}
\]
</p>
Por otra parte:
<p class="equation">
\[
\begin{aligned}
2^{n+1} - 1 &= 2^{0+1} - 1 \\
            &= 2^1 - 1 \\
            &= 2 - 1 \\
            &= 1
\end{aligned}
\]
</p>
Entonces nuestro caso base queda probado, ahora pasamos al paso inductivo,
nuestra hipótesis de inducción es asumir que para \\(n = k\\) se cumple la
proposición:
<p class="equation">
\[
\begin{aligned}
2^0 + 2^1 + 2^2 + ... + 2^k = 2^{k + 1} - 1
\end{aligned}
\]
</p>
Y procedemos a añadir el siguiente término \\(2^{k + 1}\\), lo añadimos a ambos
lados de la ecuación para no romper la igualdad:
<p class="equation">
\[
\begin{aligned}
2^0 + 2^1 + 2^2 + ... + 2^k \textcolor{red}{ + 2^{k + 1}} &= 2^{k + 1} - 1
\textcolor{red}{ + 2^{k + 1}} \\ 
  &= 2^{k + 1} + 2^{k + 1} - 1 \\ 
  &= 2 \cdot 2^{k + 1} - 1 \\ 
  &= 2^{(k + 1) + 1} - 1 \\ 
\end{aligned}
\]
</p>
Podemos ver que la última igualdad tiene la forma \\(2^{n + 1} - 1\\) con \\(n =
k + 1\\) por lo que damos por concluida la prueba por inducción.

---

Vamos a hacer otro ejemplo.<br>
Probar que:
<p class="equation">
\[
\begin{aligned}
2^n \leq n!\text{ }\forall n \geq 4
\end{aligned}
\]
</p>
El caso base es cuando \\(n = 4\\).
<p class="equation">
\[
\begin{aligned}
2^n &= 2^4 \\
    &= 16
\end{aligned}
\]
</p>
Por otra parte:
<p class="equation">
\[
\begin{aligned}
n!  &= 4! \\
    &= 24
\end{aligned}
\]
</p>
El paso base es cierto, ya que \\(16 \leq 24\\).<br>
Hipótesis de inducción, asumimos que para \\(n = k\\) la proposición es cierta.
<p class="equation">
\[
\begin{aligned}
2^k \leq k!
\end{aligned}
\]
</p>
Ahora, en el paso inductivo, vamos a multiplicar ambos lados de la inecuación
por \\(k + 1\\):
<p class="equation">
\[
\begin{aligned}
2^k \textcolor{red}{\cdot (k + 1)} &\leq k! \textcolor{red}{\cdot (k +
1)} \\
2^k \cdot (k + 1) &\leq (k + 1)! && \text{Por la definicion de factorial} \\
2^k \cdot 2 < 2^k \cdot (k + 1) &\leq (k + 1)! && \text{Ya que } k + 1 > 2 \\
2^k \cdot 2 &< (k + 1)! && \text{Por transitividad} \\
2^{k + 1} &< (k + 1)! \\
2^{k + 1} &\leq (k + 1)!
\end{aligned}
\]
</p>
La última inecuación tiene la forma \\(2^n \leq n!\\) con \\(n = k + 1\\) así,
podemos dar por concluida la prueba por inducción de esa proposición.

<small>
Si hay dudas respecto a este artículo o detectas algunos errores, no dudes en
escribirme.
</small>

[1]: /blog/matematicas
[2]: http://sistemas.fciencias.unam.mx/~erhc/Axioma_supremo.pdf
[3]: http://www.math.harvard.edu/archive/23a_fall_05/Handouts/induction.pdf
