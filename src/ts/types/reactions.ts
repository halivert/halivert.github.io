import type { Mentions } from "@/ts/types/mentions"

export namespace Reactions {
  export interface Props {
    postUrl: string
  }

  export interface Component {
    reactions: Array<Reaction | null>
    mentions: Mentions.Object
    fetchReactions: Function
  }

  export interface Reactions {
    some: string
  }
}

export interface Reactions {
  count: number
  type: Record<string, number>
}

export interface Reaction {
  className: string[]
  filter?: string
  count?: number
  name?: string
}

export const availableReactions = {
  like: {
    className: ["fa-star", "text-yellow-500"],
    filter: false,
  },
  repost: {
    className: ["fa-retweet", "text-green-500"],
    filter: false,
  },
  reply: {
    className: ["fa-comment-dots"],
    filter: false,
  },
  mention: {
    className: ["fa-quote-right"],
    filter: "mention-of",
  },
} as const
