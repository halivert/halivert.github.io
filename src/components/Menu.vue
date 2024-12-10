<script setup lang="ts">
</script>

<template>
  <div id="side-menu-container">
    <aside class="menu">
      <ul class="menu-list mt-1">
        <li>
          <!-- <a -->
          <!--   class="menu-logo" -->
          <!--   :class="{ 'is-active': itemIsActive($el) &#38;&#38; !activeSearchModal }" -->
          <!--   href="{{ '/' | locale_url }}" -->
          <!-- > -->
          <!--   <img -->
          <!--     class="logo my-0 dark" -->
          <!--     src="{{ '/assets/img/halivert-logo.webp' | absolute_url }}" -->
          <!--     alt="{{ 'Logo de Halivert' | __ }}" -->
          <!--   /> -->
          <!-- </a> -->
        </li>
      </ul>

      <ul class="menu-list my-1 menu-center" style="flex-grow: 1">
        <li>
          <!-- <a -->
          <!--   :class="{ 'is-active': itemIsActive($el) &#38;&#38; !activeSearchModal }" -->
          <!--   href="{{ '/blog/' | locale_url }}" -->
          <!--   >{{ "Blog" | __ }}</a -->
          <!-- > -->
        </li>
        <li>
          <!-- <a -->
          <!--   :class="{ 'is-active': itemIsActive($el) &#38;&#38; !activeSearchModal }" -->
          <!--   href="{{ '/projects/' | locale_url }}" -->
          <!--   >{{ "Proyectos" | __ }}</a -->
          <!-- > -->
        </li>
        <li>
          <!-- <a -->
          <!--   :class="{ 'is-active': itemIsActive($el) &#38;&#38; !activeSearchModal }" -->
          <!--   href="{{ '/about/' | locale_url }}" -->
          <!--   >{{ "Sobre mí" | __ }}</a -->
          <!-- > -->
        </li>
        <!-- {%- if page.search_bar -%} -->
        <!-- <li v-cloak> -->
        <!--   <button -->
        <!--     id="search-button" -->
        <!--     type="button" -->
        <!--     class="menu-item" -->
        <!--     :class="{ 'is-active': activeSearchModal }" -->
        <!--     v-on:click="toggleSearchModal()" -->
        <!--   > -->
        <!--     <span> -->
        <!--       <i class="fas fa-search"></i> -->
        <!--     </span> -->
        <!--     <span>{{ "Buscar" | __ }}</span> -->
        <!--     <kbd class="keycode">/</kbd> -->
        <!--   </button> -->
        <!-- </li> -->
        <!-- {%- endif -%} -->
      </ul>

      <!-- {% if page.lang_buttons or layout.lang_buttons %} -->
      <!-- <ul class="menu-list lang"> -->
      <!--   {% for lang in site.data.langs %} -->
      <!--   <li> -->
      <!--     <a href="{{ lang.path | absolute_url }}"> -->
      <!--       {{ lang.title }} -->
      <!--     </a> -->
      <!--   </li> -->
      <!--   {% endfor %} -->
      <!-- </ul> -->
      <!-- {% endif %} -->
    </aside>

    <!-- {%- if page.search_bar -%} {% include search-modal.html %} {%- endif -%} -->
  </div>
</template>
