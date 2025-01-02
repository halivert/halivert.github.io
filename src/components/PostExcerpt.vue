<script setup lang="ts">
import { getRelativeLocaleUrl } from "astro:i18n"
import type { CollectionEntry } from "astro:content"
import { getLangFromUrl, useTranslations } from "@/i18n/utils"
import { computed } from "vue"
import { getPostUrl, postReadableDate } from "@/ts/functions"

const props = defineProps<{
  url: URL
  author?: CollectionEntry<"authors">
  post: CollectionEntry<"posts">
}>()

const lang = getLangFromUrl(props.url)
const t = useTranslations(lang)
const KEEP_READING_FLAG = `<!-- ${t("Seguir leyendo")} -->`

const excerpt = props.post.rendered?.html.split(KEEP_READING_FLAG)[0]

const hasExcerpt =
  props.post.rendered?.html.includes(KEEP_READING_FLAG) ?? false

const href = computed(() => {
  const [year, month, slug] = getPostUrl(props.post)

  return getRelativeLocaleUrl(lang, `/blog/${year}/${month}/${slug}`)
})

function formatDate(date: Date) {
  return postReadableDate(lang, date)
}
</script>

<template>
  <section class="p-4 pb-0 mb-4 last-of-type:mb-0">
    <h2 class="mb-6 text-4xl font-semibold">
      <a :href>
        {{ post.data.title }}
      </a>
    </h2>
    <hr />
    <div class="flex gap-2 justify-between">
      <div class="flex-1 basis-3/4">
        <div class="flex-1 content" v-html="excerpt"></div>
        <p v-if="hasExcerpt">
          ...
          <br />
          <a :href>{{ t("Seguir leyendo") }}</a>
        </p>
      </div>

      <div v-if="post.data.image" class="basis-1/5 text-right">
        <slot />
      </div>
    </div>

    <div class="text-right flex flex-col lg:flex-row lg:gap-6 justify-end">
      <div>
        <i class="fas fa-user" aria-hidden="true"></i>
        {{ author?.data.firstName ?? post.data.author.id }}
      </div>
      <div v-if="post.data.lastModification">
        <i class="fas fa-calendar-plus" aria-hidden="true"></i>
        {{ formatDate(post.data.lastModification) }}
      </div>
      <div v-else-if="post.data.date">
        <i class="fas fa-calendar" aria-hidden="true"></i>
        {{ formatDate(post.data.date) }}
      </div>
    </div>
  </section>
</template>
