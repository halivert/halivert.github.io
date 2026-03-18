<script setup lang="ts">
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

function getTranslation(key: TranslationProp): string {
  return props.project.data.translations[lang]?.[key] ?? ""
}
</script>

<template>
  <article
    class="rounded-md overflow-hidden border border-background-200 dark:border-background-800 flex flex-col"
  >
    <figure>
      <slot />
    </figure>

    <div class="flex flex-col gap-2 px-4 py-3 flex-1">
      <strong>{{ getTranslation("title") }}</strong>
      <p class="flex-1 text-sm">{{ getTranslation("description") }}</p>
      <p class="flex gap-2 text-sm mt-auto">
        <a
          v-if="project.data.live"
          class="text-accent-100 bg-accent-800 py-1 px-3 rounded"
          :href="project.data.live"
          rel="noopener noreferrer"
          target="_blank"
        >
          {{ t("Sitio") }}
        </a>
        <a
          v-if="project.data.repo"
          class="border border-accent-800 dark:border-accent-300 text-accent-800 dark:text-accent-300 py-1 px-3 rounded"
          :href="project.data.repo"
          rel="noopener noreferrer"
          target="_blank"
        >
          {{ t("Código") }}
        </a>
      </p>
    </div>
  </article>
</template>
