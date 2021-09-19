import { createApp } from "petite-vue"

namespace Mentions {
  export interface Props {
    apiUrl: string
    postUrl: string
    filter?: string
  }

  export interface Object {
    count: number
    url: string
  }
}

namespace Reactions {
  export interface Props {
    postUrl: string
  }

  export interface Component {
    reactions: Array<Reaction | null>
    mentions: Mentions.Object
    fetchReactions: Function
  }
}

interface Reaction {
  className: string[]
  filter?: string
  count?: number
  name?: string
}

interface Reactions {
  count: number
  type: {
    [key: string]: number
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

function getMentionsUrl(props: Mentions.Props) {
  const mentionsUrl = new URL(`${props.apiUrl}/mentions.html`)

  const queryParameters = {
    target: props.postUrl,
    "wm-property": props?.filter,
  }

  Object.entries(queryParameters).forEach(([key, value]) => {
    if (value) mentionsUrl.searchParams.append(key, value)
  })

  return mentionsUrl.toString()
}

function Reactions(props: Reactions.Props) {
  const apiUrl = "https://webmention.io/api"

  const availableReactions: {
    [reaction: string]: Reaction
  } = {
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

  async function fetchReactions(this: Reactions.Component) {
    const fetchedReactions: Reactions = await (
      await fetch(`${apiUrl}/count.json?target=${props?.postUrl}`)
    ).json()

    this.reactions = Object.entries(availableReactions).map(
      ([type, reactionData]: [string, Reaction]): Reaction | null => {
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

const mountApp = () => {
  createApp({ twitterLink, Reactions }).mount("#reactions")
}

const event: string = window?.Turbo ? "turbo:load" : "DOMContentLoaded"
document.addEventListener(event, mountApp)
