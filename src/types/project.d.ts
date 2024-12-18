import type { getCollection } from "astro:content"

export type Project = Awaited<ReturnType<typeof getCollection<'projects'>>>[number]
