import { createApp } from "petite-vue"

import { Reactions, Reaction, availableReactions } from "@/ts/types/reactions"
import { Mentions } from "@/ts/types/mentions"
import { urlBuilder } from "@/ts/functions"

export namespace Post {
  export interface Image {
    ext: string
    mime: string
  }
}

export interface Post {
  id: string
  title: string
  categories: string[]
  tags: string[]
  author: string
  image_types: string
  image: string
  image_alt: string
  url: string
  date: string
  content: string
  continue: number
}

const twitterLink = (rawPostUrl: string) => {
  const postUrl = new URL(rawPostUrl)

  const author = (<HTMLMetaElement>(
    document.head.querySelector("meta[name='author']")
  )).content

  return urlBuilder("https://twitter.com/intent/tweet", {
    original_referer: `${postUrl.origin}`,
    text: document.title,
    url: postUrl.href,
    via: author,
  }).toString()
}

function getMentionsUrl(props: Mentions.Props) {
  return urlBuilder(`${props.apiUrl}/mentions.html`, {
    target: props.postUrl,
    "wm-property": props?.filter,
  }).toString()
}

function Reactions(props: Reactions.Props) {
  const apiUrl = "https://webmention.io/api"

  async function fetchReactions(this: Reactions.Component) {
    const fetchedReactions = (await (
      await fetch(`${apiUrl}/count.json?target=${props?.postUrl}`)
    ).json()) as Reactions

    this.reactions = Object.entries(availableReactions).map(
      ([type, reactionData]) => {
        const count: number = fetchedReactions.type?.[type] || 0

        if (reactionData?.["filter"] && count) {
          this.mentions.count = count
          return null
        }

        return {
          count: count,
          name: type,
          className: [...reactionData["className"], "fa", "ml-3", "mr-2"],
        }
      }
    )
  }

  const reactions: Reaction[] = []

  return {
    reactions,
    mentions: {
      count: 0,
      url: getMentionsUrl({
        apiUrl,
        postUrl: props?.postUrl,
        filter: availableReactions.mention.filter,
      }),
    },

    fetchReactions,
  }
}

const mountApp = () => createApp({ twitterLink, Reactions }).mount("#reactions")

const event: string = window?.Turbo ? "turbo:load" : "DOMContentLoaded"
document.addEventListener(event, mountApp)
