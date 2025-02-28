<script setup lang="ts">
import { getRelativeLocaleUrl } from "astro:i18n"
import { defaultLang, displayLanguages } from "@/i18n/ui"
import { getLangFromUrl, useTranslations } from "@/i18n/utils"

const props = defineProps<{
  url: URL
  showLangButtons?: boolean
}>()

const lang = getLangFromUrl(props.url)
const t = useTranslations(lang)

const links: Record<string, { text: string; match?: string }> = {
  "/blog/1": { text: t("Blog"), match: "/blog" },
  "/projects": { text: t("Proyectos") },
  "/about": { text: t("Sobre mí") },
}

function itemIsActive(href: string, exact?: boolean) {
  const localeHref = getRelativeLocaleUrl(lang, href).replace(/\/$/, "")
  const currentPath = props.url.pathname.replace(/\/$/, "")

  return exact ? localeHref === currentPath : currentPath.startsWith(localeHref)
}
</script>

<template>
  <div
    class="lg:sticky z-10 border-b-2 lg:border-r-2 lg:border-b-0 border-dashed border-accent-500"
    id="side-menu-container"
  >
    <aside
      class="flex sticky flex-col flex-nowrap justify-center max-h-dvh top-0 z-10 lg:text-3xl font-title py-2 lg:gap-3 h-full"
    >
      <ul class="flex flex-col flex-nowrap px-2 gap-1 mt-1">
        <li>
          <a
            class="inline-flex lg:flex items-center justify-center aspect-square max-h-28 mx-auto min-h-0 rounded-full px-3 py-2"
            :class="{
              'bg-background-400/50 dark:bg-background-900/50': itemIsActive(
                '/',
                true,
              ),
            }"
            :href="getRelativeLocaleUrl(lang, '/')"
          >
            <slot />
          </a>
        </li>
      </ul>

      <ul
        class="flex-grow flex justify-center flex-wrap px-2 gap-1 lg:my-1 lg:flex-col lg:justify-start"
      >
        <li v-for="(link, href) in links" :key="href">
          <a
            class="block px-3 py-2 lg:px-6 lg:py-4 rounded-full"
            :class="{
              'bg-background-400/50 dark:bg-background-900/50': itemIsActive(
                link.match ?? href,
              ),
            }"
            :href="getRelativeLocaleUrl(lang, href)"
            >{{ link.text }}</a
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
        <li v-for="(label, lang) in displayLanguages" :key="lang">
          <a
            :href="lang === defaultLang ? '/' : `/${lang}/`"
            class="block px-3 py-2 rounded-full"
          >
            {{ label }}
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
