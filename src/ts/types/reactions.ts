import { Mentions } from "@/ts/types/mentions"

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
  type: {
    [key: string]: number
  }
}

export interface Reaction {
  className: string[]
  filter?: string
  count?: number
  name?: string
}

export const availableReactions: Record<string, Reaction> = {
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
