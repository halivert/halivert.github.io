<script setup lang="ts">
import { ref, computed, reactive, onMounted } from "vue"
import {
  availableReactions,
  type Reaction,
  type Reactions,
} from "@/ts/types/reactions"
import type { Mentions } from "@/ts/types/mentions"
import { getLangFromUrl, useTranslations } from "@/i18n/utils"
import { urlBuilder } from "@/ts/functions"

const props = defineProps<{
  url: URL
  title: string
  author: string
  instantView?: string
}>()

const lang = getLangFromUrl(props.url)
const t = useTranslations(lang)

const apiUrl = "https://webmention.io/api"
const reactions = ref<Reaction[]>([])

function getMentionsUrl(props: Mentions.Props): string {
  return urlBuilder(`${props.apiUrl}/mentions.html`, {
    target: props.postUrl,
    "wm-property": props?.filter,
  }).toString()
}

const mentions = reactive({
  count: 0,
  url: getMentionsUrl({
    apiUrl,
    postUrl: props?.url.href,
    filter: availableReactions.mention.filter,
  }),
})

const telegramLink = computed(() =>
  urlBuilder("https://t.me/share/url", {
    url: props.instantView
      ? urlBuilder("https://t.me/iv", {
          url: props.url.href,
          rhash: props.instantView,
        }).toString()
      : props.url.href,
  }).toString(),
)

async function fetchReactions() {
  const fetchedReactions = (await (
    await fetch(`${apiUrl}/count.json?target=${props?.url}`)
  ).json()) as Reactions

  reactions.value = Object.entries(availableReactions)
    .filter(([type, reactionData]) => {
      const count = fetchedReactions.type?.[type] || 0

      if (reactionData.filter && count) {
        mentions.count = count
        return false
      }

      return true
    })
    .map(([type, reactionData]) => {
      const count = fetchedReactions.type?.[type] || 0

      return {
        count,
        name: type,
        className: [...reactionData.className, "fa", "ml-3", "mr-2"],
      }
    })
}

onMounted(() => fetchReactions())
</script>

<template>
  <section class="mt-4">
    <hr class="border-accent-900" />

    <div class="flex justify-between items-center">
      <a
        class="text-sm bg-[#54a9eb] text-white rounded py-1 px-2 flex gap-2 capitalize"
        :href="telegramLink"
      >
        <span class="icon"><i class="fab fa-telegram"></i></span>
        <span>{{ t("compartir") }}</span>
      </a>

      <div class="reactions">
        <span v-for="reaction in reactions" :key="reaction.name">
          <i :class="reaction?.className"></i>
          <span v-text="reaction?.count"></span>
        </span>
        <a v-if="mentions && mentions.count" :href="mentions.url">
          <i class="fas fa-quote-right has-text-text ml-3 mr-2"></i>
          <span v-text="mentions.count || 0"></span>
        </a>
      </div>
    </div>
  </section>
</template>
