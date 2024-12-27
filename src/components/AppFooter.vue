<script setup lang="ts">
import { getLangFromUrl, useTranslations } from "@/i18n/utils"

const props = defineProps<{
  url: URL
}>()

const lang = getLangFromUrl(props.url)
const t = useTranslations(lang)
</script>

<template>
  <footer
    class="flex flex-col lg:flex-row z-20 bg-background-300 border-t-2 border-background-400 dark:bg-gray-900 dark:border-background-950"
    style="grid-area: footer"
  >
    <div class="flex-1 basis-1/5 flex items-center justify-center">
      <!-- <a class="text-contrast-600" href=""> -->
      <!--   <span>RSS</span> -->
      <!--   <span class="ms-1 icon"> -->
      <!--     <i class="fas fa-rss" aria-hidden="true"></i> -->
      <!--   </span> -->
      <!-- </a> -->
    </div>

    <div class="flex-1 text-center p-4 pb-8 basis-4/5">
      <a
        class="inline-block"
        rel="license"
        href="http://creativecommons.org/licenses/by/4.0/"
      >
        <img
          alt="Licencia Creative Commons"
          style="border-width: 0"
          src="https://i.creativecommons.org/l/by/4.0/88x31.png"
        />
      </a>
      <p>
        {{ t("Los artículos escritos en este blog están bajo la licencia") }}
        <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">
          Creative Commons Attribution 4.0 International License</a
        >.
      </p>
    </div>
  </footer>
</template>
