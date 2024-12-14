/** @type {import('tailwindcss').Config} */

import defaultTheme from "tailwindcss/defaultTheme"

export default {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
    "./src/content/**/*.json",
    "./src/content/**/*.yml",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          50: "#f8f8fa",
          100: "#f2f1f6",
          200: "#e7e6ee",
          300: "#dcdae7",
          400: "#bbb6cf",
          500: "#a098ba",
          600: "#8c7fa8",
          700: "#7a6d94",
          800: "#665b7c",
          900: "#554c66",
          950: "#373144",
        },
        text: {
          50: "#f5f5fa",
          100: "#ebebf3",
          200: "#d2d4e5",
          300: "#aaadcf",
          400: "#7c81b4",
          500: "#5c619b",
          600: "#484c81",
          700: "#3b3d69",
          800: "#343558",
          900: "#2f304b",
          950: "#0a0a10",
        },
        primary: {
          50: "#f4f7fb",
          100: "#e7eff7",
          200: "#cadded",
          300: "#9bc0de",
          400: "#65a0cb",
          500: "#4285b8",
          600: "#306899",
          700: "#28547c",
          800: "#244868",
          900: "#233e57",
          950: "#17283a",
        },
        accent: {
          50: "#fbf4f9",
          100: "#f8ebf4",
          200: "#f2d8ec",
          300: "#e8b9dc",
          400: "#d98dc4",
          500: "#ca6aab",
          600: "#b54a8e",
          700: "#9c3a76",
          800: "#813361",
          900: "#6d2e53",
          950: "#41162f",
        },
      },
      fontFamily: {
        title: ["Montserrat", ...defaultTheme.fontFamily.sans],
        body: ["Raleway", ...defaultTheme.fontFamily.serif],
        mono: ["Iosevka", ...defaultTheme.fontFamily.mono],
      },
    },
  },
  plugins: [],
}
