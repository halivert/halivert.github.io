---
permalink: /test
layout: repo
title: "Árbol AVL"
description: >-
  Implementación de Árbol Binario de Búsqueda (ABB) auto-balanceado.
github_url: https://github.com/halivert/avl-tree
---

## Inicio Rápido

Usa templates.

Puedes crear un nuevo árbol de dos formas:

- Árbol vacío `Tree<T>()`
- Árbol con nodo inicial y valor `n` `Tree<T>(T n)`

Y después, puedes insertar nodos en tu árbol `tree.insert(T n)`

Para imprimir los nodos ordenados, debes usar la función
`tree.inOrder()`

Si estás usando una clase o estructura personalizada, necesitas
sobrecargar los operadores binarios (<, ==), y tener un constructor
vacío.

### Constantes

Ya he definido dos constantes: Cuando el nodo no tiene padre
(NOPARENT) y cuando el nodo es raíz(NOTIMES).

`#define NOPARENT -201`
<br />
`#define NOTIMES -202`

Propongo además, valores diferentes, para cuando necesites usar -201 o
-202.

`#define NOPARENT -45618540`
`#define NOTIMES -45093591`

### Funciones

Esta es la lista de todas las funciones incluidas en la biblioteca.
Todas las funciones trabajan en el nodo actual, a menos que se indique
lo contrario.

`friend int getNodeHeight(Tree<T> *node)`: Devuelve la altura del nodo
o `-1` si el nodo está vacío.

`T const &getData()`: Devuelve el dato.

`int getTimes()`: Devuelve cuantas veces introdujiste el mismo valor
en el árbol. Por ejemplo, si introdujiste el número `3` dos veces,
entonces el nodo con `data = 3` también tiene `times = 2`.

`bool hasParent()`: Devuelve verdadero si el nodo no es el nodo raíz.

`int getHeight()`: Devuelve la altura.

`int getNumberOfChildren()`: Devuelve el número total de hijos.

`Tree<T> *getParent()`: Devuelve un apuntador al padre.

`Tree<T> *getLeftChild()`: Devuelve un apuntador al hijo izquierdo.

`Tree<T> *getRightChild()`: Devuelve un apuntador al hijo derecho.

`Tree<T> *insert(T n)`: Inserta un nuevo nodo con valor `n`.

`Tree<T> *insert(Tree<T> *&node, T n)`: Inserta un nuevo nodo en
`nodo` con valor `n`;

`Tree<T> *remove(T n)`: Elimina el nodo con valor `n`.

`Tree<T> *remove(Tree<T> *&node)`: Elimina este `node`.

`void updateNumberOfChidren()`: Actualiza el número de hijos en sus
ancestros.

`void AVLcondition()`: Revisa si el subárbol cumple con la condición
AVL y rota los nodos necesarios para conseguirlo.

`bool isAVLComplete()`: Devuelve verdadero si el subárbol cumple con
la condición AVL.

`void updateHeight()`: Actualiza la altura de sus ancestros.

`void rightRotation()`: Rota el nodo a la derecha.
Ejemplo:

```
         x                   y
       /   \               /   \
      y     C      a      A     x
    /   \                     /   \
   A     B                   B     C
```

`void leftRotation()`: Rota el nodo a la izquierda.
Ejemplo:

```
         x                      y
       /   \                  /   \
      A     y       a        x     C
          /   \            /   \
         B     C          A     B
```

`Tree<T> *find(T key)`: Devuelve el nodo con `data = key` o
`nullptr` si no está presente.

`std::string pathToRoot()`: Devuelve el camino hacia la raíz.

`std::string longestHeight()`: Devuelve la altura más grande (camino
hacia el descendiente más lejano).

`std::string preOrder()`: Devuelve el árbol en 'pre-order'.

`std::string inOrder()`: Devuelve el árbol en 'in-order'.

`std::string postOrder()`: Devuelve el árbol en 'post-order'.

`std::string parents()`: Devuelve todos los nodos con su padre
inmediato.

`std::string specs()`: Devuelve la siguiente información del nodo:

- Data (Dato)
- Path to root (Ruta hacia la raíz)
- Times (Veces que aparece)
- Height (Altura)
- Children (Número de hijos)
- Left child (Valor de nodo izquierdo)
- Right child (Valor de nodo derecho)
- Predecessor (Predecesor)
- Successor (Sucesor)

`Tree<T> *findMinimum()`: Devuelve el valor mínimo en el árbol.

`Tree<T> *findMaximum()`: Devuelve el valor máximo en el árbol.

`Tree<T> *findPredecessor()`: Devuelve el predecesor.

`Tree<T> *findSuccessor()`: Devuelve el sucesor.

`bool isLeaf()`: Devuelve verdadero si el nodo es hoja (no tiene
hijos).

`std::string levelOrder()`: Devuelve el recorrido por orden de nivel
del árbol en forma de cadena.

`std::string givenLevel(int level)`: Devuelve el nivel del arbol en
forma de cadena.
