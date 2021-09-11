import { defineConfig } from "rollup"

import typescript from "@rollup/plugin-typescript"
import { terser } from "rollup-plugin-terser"
import alias from "@rollup/plugin-alias"
import nodeResolve from "@rollup/plugin-node-resolve"

export default (args) => {
  const plugins = [
    alias({
      entries: {
        "petite-vue": "petite-vue/dist/petite-vue.es.js",
      },
    }),
    typescript(),
    nodeResolve(),
    args.configDev ? "" : terser(),
  ]

  return defineConfig([
    {
      input: ["src/ts/main.ts", "src/ts/post.ts", "src/ts/search.ts"],
      output: {
        dir: "assets/js/",
        format: "esm",
      },
      plugins: plugins,
    },
  ])
}
