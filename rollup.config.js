import { defineConfig } from "rollup"
import typescript from "@rollup/plugin-typescript"
import { terser } from "rollup-plugin-terser"

export default (args) => {
  return defineConfig([
    {
      input: ["src/js/post.ts", "src/js/search.ts", "src/js/themeSwitcher.ts"],
      output: {
        dir: "assets/js/",
        format: "esm",
      },
      plugins: [typescript(), args.configDev ? "" : terser()],
    },
    {
      input: "src/js/main.ts",
      output: {
        dir: "assets/js",
      },
      plugins: [typescript(), args.configDev ? "" : terser()],
    },
  ])
}
