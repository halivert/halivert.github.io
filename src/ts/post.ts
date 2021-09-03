import { createApp, reactive } from "petite-vue"
import { addClass, removeClass } from "./functions"

declare global {
  interface Window {
    getReactions: Function
    mentionsUrl: string
    postUrl: string
    Turbo: object
  }

  interface Reactions {
    count: number
    type: Object
  }

  interface ReactionsObject {
    postUrl?: string
  }
}

const twitterLink = (rawPostUrl: string): string => {
  const tweetUrl: URL = new URL("https://twitter.com/intent/tweet")
  const postUrl: URL = new URL(rawPostUrl)

  const author: string = (<HTMLMetaElement>(
    document.head.querySelector("meta[name='author']")
  )).content

  const data = {
    original_referer: `${postUrl.origin}`,
    text: document.title,
    url: postUrl.href,
    via: author,
  }

  Object.entries(data).forEach(([key, value]: Array<string>) => {
    tweetUrl.searchParams.append(key, value)
  })

  return tweetUrl.toString()
}

const loadReactions = async () => {
  const reactionsSection: HTMLElement = document.getElementById("reactions")
  if (!reactionsSection || !window.getReactions) return

  const reactions: Reactions = await window.getReactions()

  const availableReactions = {
    like: {
      iconClass: ["fas", "fa-star", "has-text-warning"],
    },
    repost: {
      iconClass: ["fas", "fa-retweet", "has-text-success", "ml-3"],
    },
    reply: {
      iconClass: ["fas", "fa-comment-dots", "has-text-text", "ml-3"],
    },
    mention: {
      iconClass: ["fas", "fa-quote-right", "has-text-text", "ml-3"],
      filter: "mention-of",
    },
  }

  const iconsDiv: HTMLDivElement = document.createElement("div")
  addClass(iconsDiv, ["reactions"])

  Object.keys(availableReactions).forEach((key: string) => {
    const reactionCategory = availableReactions[key]

    const text: Text = document.createTextNode(reactions.type[key] || 0)
    const icon: HTMLElement = document.createElement("i")
    addClass(icon, [...reactionCategory.iconClass, "mr-2"])

    if (reactionCategory.filter && reactions.type[key]) {
      const link: HTMLAnchorElement = document.createElement("a")
      link.href = `${window.mentionsUrl}&wm-property=${reactionCategory.filter}`
      link.appendChild(icon)
      link.appendChild(text)
      iconsDiv.appendChild(link)
    } else {
      const span: HTMLSpanElement = document.createElement("span")
      span.appendChild(icon)
      span.appendChild(text)
      iconsDiv.appendChild(span)
    }
  })

  const flexDiv: HTMLDivElement = reactionsSection.querySelector("div.flex")

  const lastReactions: HTMLDivElement = flexDiv.querySelector("div.reactions")

  if (lastReactions) {
    flexDiv.removeChild(lastReactions)
  }

  flexDiv.appendChild(iconsDiv)
}

const mountApp = () => {
  function Reactions(props: ReactionsObject) {
    const apiUrl = "https://webmention.io/api"
    const reactions = reactive({ value: [] })

    const availableReactions = {
      like: {
        className: ["fa-star", "has-text-warning"],
      },
      repost: {
        className: ["fa-retweet", "has-text-success"],
      },
      reply: {
        className: ["fa-comment-dots", "has-text-text"],
      },
      mention: {
        className: ["fa-quote-right", "has-text-text"],
        filter: "mention-of",
      },
    }

    const mentions = reactive({
      url: `${apiUrl}/mentions.html?target=${props?.postUrl}&wm-property=${availableReactions.mention.filter}`,
    })
    ;(async () => {
      const fetchedReactions: Reactions = await (
        await fetch(`${apiUrl}/count.json?target=${props?.postUrl}`)
      ).json()

      Object.entries(availableReactions).forEach(
        ([key, value]: [string, object]) => {
          const count: number = fetchedReactions.type?.[key] || 0
          value["name"] = key
          value["className"].push("fa", "ml-3", "mr-2")
          value["count"] = count

          if (value?.["filter"] && count) {
            mentions.count = count
            return
          }

          reactions.value.push(value)
        }
      )

      if (!fetchedReactions.count) reactions.value.reverse()
    })()

    return {
      reactions: reactions.value,
      mentions,
    }
  }

  createApp({
    twitterLink,
    Reactions,
  }).mount("#reactions")
}

const event: string = window?.Turbo ? "turbo:load" : "DOMContentLoaded"
document.addEventListener(event, mountApp)
