import { addClass } from "./functions"

declare global {
  interface Window {
    getReactions: Function
    mentionsUrl: string
  }

  interface Reactions {
    count: number
    type: Object
  }
}

const loadReactions = async () => {
  const reactions: Reactions = await window.getReactions()
  const reactionsSection: HTMLElement = document.getElementById("reactions")

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

    if (reactionCategory.filter) {
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

  reactionsSection
    .querySelector("div.flex")
    .appendChild(iconsDiv)
}

loadReactions()
