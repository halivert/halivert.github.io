---
author: halivert
title: "Remedando a alguien"
date: 2018-03-12 22:59:42
category: "Divagando"
---

En este post traigo para ustedes una herramienta muy útil (no muy útil, la
verdad) que sirve para cuando intentan remedar a alguien... o sea imitarlo o
imitarla y agregar un toque de ridículo a su comentario.

<!--Seguir leyendo-->

(Cambia las vocales por "i").

Sólo escriban en el recuadro de la izquierda, donde dice "Texto original" y
listo.

<div class="field columns">
  <div class="column">
    <div class="control">
      <textarea
        class="textarea"
        id="textoOriginal"
        placeholder="Texto original"></textarea
      >
    </div>
  </div>
  <div class="column">
    <div class="control">
    <textarea
      class="textarea"
      id="textoConvertido"
      placeholder="Burla"></textarea
    >
    </div>
  </div>
</div>

<script type="text/javascript">
  let originalTextArea = document.getElementById('textoOriginal');
  let newTextArea = document.getElementById('textoConvertido');
  originalTextArea.onkeyup = function(key) {
    let texto = originalTextArea.value;
    let nuevoTexto = '';

    for (let i in texto) {
      if (isLowerVowel(texto[i]))
        nuevoTexto += 'i';
      else if (isUpperVowel(texto[i]))
        nuevoTexto += 'I';
      else if (isLowerVowelAccentuated(texto[i]))
        nuevoTexto += 'í';
      else if (isUpperVowelAccentuated(texto[i]))
        nuevoTexto += 'Í';
      else
        nuevoTexto += texto[i];
    }

    newTextArea.value = nuevoTexto;
  };

  function isLowerVowel(c) {
    return c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u';
  }

  function isUpperVowel(c) {
    return c == 'A' || c == 'E' || c == 'I' || c == 'O' || c == 'U';
  }

  function isLowerVowelAccentuated(c) {
    return c == 'á' || c == 'é' || c == 'í' || c == 'ó' || c == 'ú';
  }

  function isUpperVowelAccentuated(c) {
    return c == 'Á' || c == 'É' || c == 'Í' || c == 'Ó' || c == 'Ú';
  }
</script>

Sí... no tenía nada que hacer.
