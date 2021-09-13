import { debounce } from "lodash"

declare global {
  interface Window {
    idx: LunrIndex
    index: object
    lunr: Function
    siteUrl: String
    toggleSearchModal: Function
  }

  interface LunrIndex {
    field: Array<string>
    search: Function
  }

  interface LunrResult {
    ref: string
  }

  interface Post {
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
}

async function makeIdx(): Promise<LunrIndex> {
  if (!window.idx) {
    window.index = await fetch(
      `${window.siteUrl}/index.json`
    ).then((response) => response.json())

    window.idx = window.lunr(function() {
      this.field("id")
      this.field("title", { boost: 10 })
      this.field("categories")
      this.field("tags")
      this.field("author")
      Object.entries(window.index).forEach(([key, value]: [string, Post]) => {
        this.add({
          id: key,
          title: value.title,
          categories: value.categories,
          tags: value.tags,
          author: value.author,
        })
      })
    })
  }

  return window.idx
}

export function SearchResult(post: Post) {
  let sourceImages = []
  let imageUrl = ""

  if (post?.image_types) {
    const imageTypes = post.image_types.split(",")

    if (imageTypes.length > 0) {
      let lastImageExt = imageTypes.slice(-1)[0].split(":")[0]
      imageUrl = `${post.image}.${lastImageExt}`

      if (imageTypes.length > 1) {
        sourceImages = imageTypes.slice(0, -1).map((type) => {
          const [ext, mime] = type.split(":")
          return {
            ext,
            mime,
          }
        })
      }
    }
  }

  return {
    $template: "#post-template",
    post,
    sourceImages,
    imageUrl,
  }
}

export function SearchModal() {
  return {
    posts: [],
    inputValue: "",

    search: debounce(function(searchTerm: string) {
      makeIdx().then((idx: LunrIndex) => {
        const results: Array<LunrResult> = searchTerm
          ? idx.search(searchTerm)
          : []

        this.posts = results.map(({ ref }) => window.index?.[ref])
      })
    }, 200),
    handleClick(evt: MouseEvent) {
      const tagName = (<HTMLElement>evt.target).tagName.toLowerCase()
      if (tagName === "a") {
        this.inputValue = ""
        window.toggleSearchModal?.(false)
      }
    },
  }
}
