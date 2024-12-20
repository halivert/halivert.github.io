<script setup lang="ts">
import { getRelativeLocaleUrl } from "astro:i18n"
import { getLangFromUrl, useTranslations } from "@/i18n/utils"
import { computed } from "vue"

const props = defineProps<{
  url: URL
  author?: {
    data: {
      firstName: string
    }
  }
  post: {
    id: string
    data: {
      title: string
      date: Date
      lastModification?: Date
      author: {
        id: string
      }
      image?: unknown
    }
    body?: string
    rendered?: {
      html: string
    }
  }
}>()

const lang = getLangFromUrl(props.url)
const t = useTranslations(lang)

const excerpt = props.post.rendered?.html.split(
  `<!-- ${t("Seguir leyendo")} -->`,
)[0]

const href = computed(() => {
  const year = props.post.data.date.getFullYear()
  const month = (props.post.data.date.getMonth() + 1)
    .toString()
    .padStart(2, "0")
  const slug = props.post.id.split(/\d{4}-\d{2}-\d{2}-/)[1]

  return getRelativeLocaleUrl(lang, `/blog/${year}/${month}/${slug}`)
})

function formatDate(date: Date) {
  const dateParts = new Intl.DateTimeFormat(lang, {
    month: "long",
    day: "2-digit",
    year: "numeric",
  }).formatToParts(date)

  const month = dateParts.find(({ type }) => type === "month")?.value
  const day = dateParts.find(({ type }) => type === "day")?.value
  const year = dateParts.find(({ type }) => type === "year")?.value

  return `${month} ${day}, ${year}`
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
        <p>
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
