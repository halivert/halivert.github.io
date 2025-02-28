import { defineConfig } from "astro/config"
import vue from "@astrojs/vue"
import tailwind from "@astrojs/tailwind"
import remarkToc from "remark-toc"

// https://astro.build/config
export default defineConfig({
  site: import.meta.env.PROD ? "https://halivert.dev" : undefined,
  i18n: { locales: ["es-419", "en"], defaultLocale: "es-419" },
  markdown: {
    remarkPlugins: [[remarkToc, { heading: "Índice|Index", maxDepth: 4 }]],
    shikiConfig: {
      themes: { light: "vitesse-light", dark: "synthwave-84" },
      defaultColor: false,
    },
  },
  integrations: [vue({ devtools: true }), tailwind({ applyBaseStyles: false })],
})
