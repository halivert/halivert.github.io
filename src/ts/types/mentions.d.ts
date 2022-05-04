export namespace Mentions {
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

