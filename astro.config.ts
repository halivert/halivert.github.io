import { defineConfig } from "astro/config"
import vue from "@astrojs/vue"
import tailwind from "@astrojs/tailwind"
import remarkToc from "remark-toc"

// https://astro.build/config
export default defineConfig({
  site: import.meta.env.PROD ? 'https://halivert.dev' : undefined,
  redirects: {
    "/blog": "/blog/1",
    "/en/blog": "/en/blog/1",

    "/blog/[category]": "/blog/[category]/1",
    "/[lang]/blog/[category]": "/[lang]/blog/[category]/1",
  },
  i18n: {
    locales: ["es-419", "en"],
    defaultLocale: "es-419",
  },
  markdown: {
    remarkPlugins: [
      [remarkToc, { heading: 'Índice|Index', maxDepth: 4 }]
    ],
    shikiConfig: {
      themes: {
        light: "vitesse-light",
        dark: "synthwave-84",
      },
      defaultColor: false,
    },
  },
  integrations: [
    vue({
      devtools: true,
    }),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
})
