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

export const collections = { authors }
