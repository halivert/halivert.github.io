import { defineCollection, reference, z } from "astro:content"
import { glob, file } from "astro/loaders"
import { languages } from "./i18n/ui"

const authors = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/authors" }),
  schema: z.object({
    username: z.string(),
    firstName: z.string(),
    lastName: z.string(),
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
  schema: ({ image }) =>
    z.object({
      author: reference("authors"),
      title: z.string(),
      date: z.coerce.date(),

      hasInstantView: z.boolean().default(true),

      cannonicalUrl: z.string().optional(),
      lastModification: z.coerce.date().optional(),
      hasMath: z.boolean().optional(),
      category: z.string().optional(),
      image: image().optional(),
      imageAlt: z.string().optional(),
      tags: z.array(z.string()).optional(),
      translations: z
        .array(
          z.object({
            short: z.enum(languages),
            post: reference("posts"),
          }),
        )
        .optional(),
    }),
})

const tags = defineCollection({
  loader: file("./src/content/tags.yml"),
})

const categories = defineCollection({
  loader: file("./src/content/categories.yml"),
  schema: z.object({
    slug: z.string(),
    description: z.record(
      z.enum(languages),
      z.string().optional()
    ),
  }),
})

const projects = defineCollection({
  loader: file("./src/content/projects.yml"),
  schema: ({ image }) =>
    z.object({
      image: image(),
      repo: z.string(),
      live: z.string(),
      translations: z.record(
        z.enum(languages),
        z.object({
          title: z.string(),
          description: z.string(),
          imageAlt: z.string().optional(),
        }),
      ),
    }),
})

export const collections = { authors, posts, tags, categories, projects }
