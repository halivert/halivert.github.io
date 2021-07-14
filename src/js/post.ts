import { addClass, removeClass } from "./functions"

declare global {
  interface Window {
    getReactions: Function
    mentionsUrl: string
    postUrl: string
  }

  interface Reactions {
    count: number
    type: Object
  }
}

const fixTwitterLink = () => {
  const tweetLink: HTMLAnchorElement = document.querySelector(
    "#reactions .twitter-share-button"
  )

  if (!tweetLink) return

  removeClass(tweetLink, "is-hidden")

  const tweetUrl: URL = new URL("https://twitter.com/intent/tweet")
  const postUrl: URL = new URL(window.postUrl)

  const author: string = (<HTMLMetaElement>(
    document.head.querySelector("meta[name='author']")
  )).content

  const data = {
    original_referer: `${postUrl.origin}`,
    text: document.title,
    url: postUrl.href,
    via: author,
  }

  Object.keys(data).forEach((key: string) => {
    tweetUrl.searchParams.append(key, data[key])
  })

  tweetLink.href = tweetUrl.toString()
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

document.addEventListener("turbo:load", () => {
  fixTwitterLink()
  loadReactions()
})

fixTwitterLink()
loadReactions()
