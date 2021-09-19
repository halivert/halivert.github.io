import { debounce } from "lodash"
import lunr from "lunr"

namespace Post {
  export interface Image {
    ext: string
    mime: string
  }
}

interface SearchModalComponent {
  posts: Post[]
  inputValue: string
  searching: boolean
  empty: boolean
  search: Function
  handleClick: Function
}

async function makeIdx(): Promise<lunr.Index> {
  if (!window.idx) {
    window.index = await fetch(
      `${window.siteUrl}/index.json`
    ).then((response) => response.json())

    console.log(window.index)

    window.idx = lunr(function() {
      this.field("id")
      this.field("title", { boost: 10 })
      this.field("categories")
      this.field("tags")
      this.field("author")
      Object.entries(window.index).forEach(([key, post]: [string, Post]) => {
        this.add({
          id: key,
          title: post.title,
          categories: post.categories,
          tags: post.tags,
          author: post.author,
        })
      })
    })
  }

  return window.idx
}

export function SearchResult(post: Post) {
  let sourceImages: Array<Post.Image> = []
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
    searching: false,
    empty: false,

    search: debounce(function(this: SearchModalComponent, searchTerm: string) {
      this.searching = true
      this.empty = false

      if (!searchTerm.length) {
        this.posts = []
        this.searching = false
        return
      }

      makeIdx().then((idx: lunr.Index) => {
        const results: lunr.Index.Result[] = searchTerm
          ? idx.search(searchTerm)
          : []

        this.searching = false
        this.posts = results.map(({ ref }) => window.index?.[ref])

        if (this.posts.length < 1) {
          const index = Object.values(window.index)
          this.posts = [index[Math.floor(Math.random() * index.length)]]
          this.empty = true
        }
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
