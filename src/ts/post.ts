import { createApp, reactive } from "petite-vue"

declare global {
  interface Window {
    Turbo: object
  }

  interface Reactions {
    count: number
    type: Object
  }

  interface ReactionsProps {
    postUrl: string
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

function getMentionsUrl(props: Object) {
  const mentionsUrl = new URL(`${props?.["apiUrl"]}/mentions.html`)

  const queryParameters = {
    target: props?.["postUrl"],
    "wm-property": props?.["filter"],
  }

  Object.entries(queryParameters).forEach(([key, value]) => {
    mentionsUrl.searchParams.append(key, value)
  })

  return mentionsUrl.toString()
}

function Reactions(props: ReactionsProps) {
  const apiUrl = "https://webmention.io/api"

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

  async function fetchReactions() {
    const fetchedReactions: Reactions = await (
      await fetch(`${apiUrl}/count.json?target=${props?.postUrl}`)
    ).json()

    this.reactions = Object.entries(availableReactions).map(
      ([type, reactionData]: [string, object]) => {
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

  return {
    reactions: [],
    mentions: {
      url: getMentionsUrl({
        apiUrl,
        postUrl: props?.postUrl,
        filter: availableReactions.mention.filter,
      }),
    },

    fetchReactions,
  }
}

const mountApp = () => {
  createApp({ twitterLink, Reactions }).mount("#reactions")
}

const event: string = window?.Turbo ? "turbo:load" : "DOMContentLoaded"
document.addEventListener(event, mountApp)
