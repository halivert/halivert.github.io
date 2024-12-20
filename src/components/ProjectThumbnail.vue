<script setup lang="ts">
import { ref } from "vue"
import { getLangFromUrl, useTranslations } from "@/i18n/utils"
import type { Project } from "@/types/project"

type Translations = Project["data"]["translations"]
type TranslationProp = keyof NonNullable<Translations[keyof Translations]>

const props = defineProps<{
  url: URL
  project: Project
}>()

const lang = getLangFromUrl(props.url)
const t = useTranslations(lang)

const showLinks = ref(false)

function getTranslation(key: TranslationProp): string {
  return props.project.data.translations[lang]?.[key] ?? ""
}
</script>

<template>
  <article
    class="relative rounded-md overflow-hidden"
    @click="showLinks = !showLinks"
  >
    <label :for="project.id">
      <figure class="cursor-pointer">
        <slot />

        <figcaption class="mt-1 text-center italic text-sm">
          {{ getTranslation("title") }}
        </figcaption>
      </figure>
    </label>

    <Transition>
      <div
        v-show="showLinks"
        class="absolute inset-0 bg-background-200/90 flex flex-col gap-2 px-4 py-2"
      >
        <strong class="text-center">{{ getTranslation("title") }}</strong>
        <span class="flex-1">{{ getTranslation("description") }}</span>
        <p class="flex items-center justify-center gap-3 text-sm">
          <a
            v-if="project.data.live"
            @click.stop
            class="underline text-accent-100 bg-accent-800 py-1 px-3 rounded"
            :href="project.data.live"
            rel="noopener noreferrer"
            target="_blank"
          >
            {{ t("Sitio") }}
          </a>
          <a
            v-if="project.data.repo"
            @click.stop
            class="underline text-accent-100 bg-accent-800 py-1 px-3 rounded"
            :href="project.data.repo"
            rel="noopener noreferrer"
            target="_blank"
          >
            {{ t("Código") }}
          </a>
        </p>
      </div>
    </Transition>
  </article>
</template>
