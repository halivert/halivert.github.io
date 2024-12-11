import { defineCollection, z } from "astro:content"
import { glob } from "astro/loaders"

const authors = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/authors" }),
  schema: z.object({
    username: z.string(),
    first_name: z.string(),
    last_name: z.string(),
    description: z.string(),

    picture: z.string().optional(),
    kofi: z.string().optional(),
    sponsor: z.string().optional(),
    email: z.string().optional(),
    social: z
      .array(
        z.object({
          url: z.string(),
          type: z.string(),
          icon: z.string(),
          hidden: z.boolean().optional(),
        }),
      )
      .optional(),
  }),
})

const posts = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    author: z.string(),
    title: z.string(),
    date: z.coerce.date(),
    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
  })
})

export const collections = { authors, posts }
