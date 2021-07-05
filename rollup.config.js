import { defineConfig } from "rollup"
import typescript from "@rollup/plugin-typescript"
import { terser } from "rollup-plugin-terser"
// import nodeResolve from "@rollup/plugin-node-resolve"

export default (args) => {
	return defineConfig([
		{
			input: [
				"src/js/main.ts",
				"src/js/post.ts",
				"src/js/search.ts",
				"src/js/themeSwitcher.ts",
			],
			output: {
				dir: "assets/js/",
				format: "esm",
			},
			plugins: [typescript(), args.configDev ? "" : terser()],
		},
	])
}
