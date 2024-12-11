import { defineConfig } from "astro/config"

import vue from "@astrojs/vue"

import tailwind from "@astrojs/tailwind"

// https://astro.build/config
export default defineConfig({
  redirects: {
    "/blog": "/blog/1",
    "/en/blog": "/en/blog/1",
  },
  i18n: {
    locales: ["es", "en"],
    defaultLocale: "es",
  },
  integrations: [
    vue(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
})
