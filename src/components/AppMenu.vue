<script setup lang="ts">
import { defaultLang, languages } from "@/i18n/ui"
import {
  getLangFromUrl,
  useTranslatedPath,
  useTranslations,
} from "@/i18n/utils"

const props = defineProps<{
  url: URL
  showLangButtons?: boolean
}>()

const lang = getLangFromUrl(props.url)
const translatePath = useTranslatedPath(lang)
const t = useTranslations(lang)

const links: Record<string, string> = {
  [translatePath("/blog")]: t("Blog"),
  [translatePath("/projects")]: t("Proyectos"),
  [translatePath("/about")]: t("Sobre mí"),
}

function itemIsActive(href: string) {
  return translatePath(href) === props.url.pathname
}
</script>

<template>
  <div class="lg:sticky z-10" id="side-menu-container">
    <aside
      class="flex sticky flex-col flex-nowrap justify-center max-h-dvh top-0 z-10 lg:text-3xl font-title h-full border-b-2 lg:border-r-2 lg:border-b-0 border-dashed border-accent-500 py-2 lg:gap-3"
    >
      <ul class="flex flex-col flex-nowrap px-2 gap-1 mt-1">
        <li>
          <a
            class="inline-flex lg:flex items-center justify-center aspect-square max-h-28 mx-auto min-h-0 rounded-full px-3 py-2"
            :class="{ 'bg-background-400/50': itemIsActive('/') }"
            :href="translatePath('/')"
          >
            <img
              class="my-0 mx-auto h-8 lg:h-3/4 aspect-square"
              src="/img/halivert-logo.webp"
              :alt="t('Logo de Halivert')"
            />
          </a>
        </li>
      </ul>

      <ul
        class="flex-grow flex justify-center flex-wrap px-2 gap-1 lg:my-1 lg:flex-col lg:justify-start"
      >
        <li v-for="(label, href) in links" :key="href">
          <a
            class="block px-3 py-2 lg:px-6 lg:py-4 rounded-full text-contrast-600"
            :class="{ 'bg-background-400/50': itemIsActive(href) }"
            :href="href"
            >{{ label }}</a
          >
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

      <ul
        v-if="showLangButtons"
        class="text-sm flex justify-center flex-wrap px-2 gap-1 lg:my-1 capitalize"
      >
        <li v-for="(, path) in languages" :key="path">
          <a
            :href="path === defaultLang ? '/' : `/${path}`"
            class="block px-3 py-2 rounded-full text-contrast-600"
          >
            {{ path }}
          </a>
        </li>
      </ul>
    </aside>

    <!-- {%- if page.search_bar -%} {% include search-modal.html %} {%- endif -%} -->
  </div>
</template>

<style scoped lang="css">
#side-menu-container {
  grid-area: menu;

  @media screen and (min-width: 1024px) {
    grid-area: 1 / 1 / 3 / 1;
  }
}
</style>
