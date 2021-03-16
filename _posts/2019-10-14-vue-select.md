---
author: halivert
category: "Ya me pasó"
date: "2019-10-14 08:45:11 -0500"
last_modification: "2021-01-15 19:19"
tags: ["Vue.js", "Select"]
title: "Select en Vue.js"
---

<div class="notification is-yellow" markdown="1">
Este artículo fue escrito hace más de un año; en la actualidad
utilizo la biblioteca [Buefy](https://buefy.org/), que resulta más práctica y
mejor implementada, sugiero utilizar dicha biblioteca con una capa de
personalización, que no tiene que ser tan extrema como la planteada en este
artículo y de la que escribiré pronto.
</div>

Si utilizas [Vue.js][1] seguramente sabrás que hacer componentes genéricos es
una de las mejores inversiones de tiempo. Escribes código una vez (en el mejor
de los casos) y las siguientes solo lo reutilizas.

Sin embargo crear un componente que funcione adecuadamente no siempre es
sencillo, es por eso que escribo esta guía para hacer un select personalizado.

<!-- Seguir leyendo -->

Lo primero que haremos es nombrar el componente. Según la [guía de estilo de
Vue.js][2] es recomendable nombrar los componentes de manera homogénea y se
sugiere que tengan un prefijo específico, por ejemplo `Base`, `App` o `V`, en
mi caso nombro mis componentes base con el prefijo `H` y `B` para los
especificos del framework [Bulma][3].

Creamos un componente para «envolver» el select. `HField` que solo contiene
información para el usuario.

{% gist b7d9ba492e87836298e1b03fbf41f26f %}

Y ahora pasamos al select:

Su estructura general es la siguiente:

```html
<template>
  <h-field>
    <div>
      <select>
        <option></option>
        <option></option>
      </select>
    </div>

    <template>
      <slot></slot>
    </template>
  </h-field>
</template>

<script></script>
```

Agregamos un nombre de referencia al `HField` para poder agregarle los errores
en caso de que existan y también pasamos los datos que tienen que ver con
ellos.

```html
<h-field
  ref="field"
  :label="label"
  :errors="errors"
  :display-errors="displayErrors"
  :has-addons="hasAddons"
></h-field>
```

Nuestro select puede ser de tamaño completo y además puede tener errores. En
bulma utilizamos un `div` para este fin.

```html
<div
  class="select"
  :class="{ 'is-fullwidth': isFullwidth, 'is-danger': errorsActive }"
></div>
```

Agregamos también el select y utilizaremos el `v-model` para que nuestra
selección se actualice en las dos direcciones (vista-modelo, modelo-vista). Y
agregamos todos los atributos que se coloquen en la etiqueta del componente
con `v-bind="$attrs"`.

```html
<select v-model="selectedItem" v-bind="$attrs"></select>
```

Tenemos una opción deshabilitada en donde colocaremos más información para el
usuario, que además se elige por defecto.

```html
<option :value="placeholderValue" disabled>
  {%raw%}{{ placeholder }}{%endraw%}
</option>
```

Y después agregamos todas las opciones que queremos que contenga nuestro
select.

```html
<option
  v-for="(element, index) in elements"
  :value="element[idProperty]"
  :key="element[idProperty]"
>
  {%raw%}{{ element[displayProperty] }}{%endraw%}
</option>
```

Utilizaremos el atributo `idProperty` porque nuestros datos pueden no ser
homogéneos y también `displayProperty` por la misma razón, en todo caso
imprimimos los elementos y casi estamos listos para el script. Por último
agregamos el espacio donde pueden ir (o no), algunos anexos.

```html
<template #addons>
  <slot name="addons"></slot>
</template>
```

Ahora sí pasamos al código del script. Importamos el componente que creamos
hace unos momentos y después de exportar el nuevo componente (HSelect), y
nombrarlo, evitaremos que el elemento padre `h-field` herede los atributos que
se coloquen en su etiqueta.

```js
import HField from "./HField.vue";

export default {
  name: "h-select",
  inheritAttrs: false,
  components: {
    HField
  },
```

Queremos saber si hay errores activos, cual es el elemento seleccionado y
cuales son los elementos actuales, así los datos que tendrá nuestro componente
son los siguientes:

```js
data() {
  return {
    errorsActive: false,
    selectedItem: "",
    elements: []
  };
},
```

Ahora vamos a «observar» 3 atributos y es aquí donde sucede algo importante
en nuestro componente.

Lo primero es observar el `value` esto lo hacemos porque si tenemos un
`v-model` asociado a nuestro componente, queremos que el valor cambie cuando
actualizamos el modelo.

Después observamos el atributo que está conectado con nuestro select como su
`v-model`, queremos seleccionar el valor por defecto en caso de que no se
encuentre el elemento. Por el contrario, si se encuentra, y es diferente al
dato que pasamos como «viejo» escondemos los errores. Además, disparamos dos
eventos, y esto es bastante importante, porque un select en Vue.js, dispara el
evento "change" y también el evento "input", con esto lograremos que si existe
un `v-model` se actualice al realizar un cambio en nuestro select.

Por último observamos el atributo `elements` y así, cuando nuestros elementos
cambien, tendremos control del elemento seleccionado.

```js
watch: {
  value(newValue) {
    this.selectedItem = newValue;
  },
  selectedItem(newValue) {
    if (!this.elementsContain(newValue)) {
      this.selectedItem = this.placeholderValue;
      return;
    }
    if (newValue !== this.old) this.hideError();
    this.$emit("change", newValue);
    this.$emit("input", newValue);
  },
  elements(newValue) {
    var exists = this.elementsContain(this.value ? this.value : this.old);
    if (newValue && newValue.length === 1)
      this.selectedItem = newValue[0][this.idProperty];
    else
      this.selectedItem = exists
        ? this.value
          ? this.value
          : this.old
        : this.placeholderValue;
  }
},
```

Cuando creamos el componente, queremos asignar los elementos y si existen
errores, mostrarlos.

```js
created() {
  this.elements = this.initialElements;

  if (this.errors && this.errors.length > 0) {
    this.errorsActive = true;
  }
},
```

Tenemos los métodos que nos ayudarán a ocultar errores, revisar si existe un
elemento en nuestra lista y obtener el elemento seleccionado, además de uno
que solo compara que el parámetro no sea `null` ni `undefined`.

```js
methods: {
  hideError() {
    if (this.$refs.field) this.$refs.field.errorsActive = false;
    this.errorsActive = false;
  },
  elementsContain(itemId) {
    if (!this.isSomething(itemId)) return false;
    if (itemId.toString() === this.placeholderValue.toString())
      return true;
    return (
      this.elements.find(
        e => e[this.idProperty].toString() === itemId.toString()
      ) !== undefined
    );
  },
  isSomething(element) {
    return element !== undefined && element !== null;
  },
  getSelected() {
    return this.elements.find(
      e => e[this.idProperty].toString() === this.selectedItem.toString()
    );
  }
},
```

Y por último tenemos las propiedades, que _grosso modo_ se ven así:

```js
props: {
  label: String,
  placeholder: String,
  initialElements: [Object, Array],
  value: [String, Number],
  old: [String, Number],
  hasAddons: Boolean,
  placeholderValue: String,
  displayProperty: String,
  idProperty: String,
  displayErrors: Boolean,
  isFullwidth: Boolean,
  errors: Array,
}
```

Sin más aquí está el código del componente, queda mucho trabajo por hacer,
pero sin duda simplifica mucho el trabajo de hacer un select en Laravel con
Vue.js.

{% gist b34c22aa06007ead9b05df857e7ad1b6 %}

Este es un ejemplo de caso de uso.
{%raw%}

```html
<h-select
  label="{{ __('areas.area') }}"
  :initial-elements='@json($areas)'
  placeholder="{{ __('areas.area') }}"
  display-property="name"
  name="area_id"
  old="{{ old('area_id') }}"
  :errors='@json($errors->get('area_id'))'
  required>
</h-select>
```

{%endraw%}

Podemos ver que asignar una etiqueta, elementos en forma de json, un
placeholder, ademas de una seleccion previa o «vieja» y mostrar errores se
vuelve mucho más sencillo.

Espero que este código te sea de ayuda.
Adiós 👋🏽

[1]: https://vuejs.org
[2]: https://vuejs.org/v2/style-guide/#Base-component-names-strongly-recommended
[3]: https://bulma.io
