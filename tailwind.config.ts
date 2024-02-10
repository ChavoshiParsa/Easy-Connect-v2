import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        purlue: { DEFAULT: "#6A4DFF", dark: "#9782ff" },
        fire: { DEFAULT: "#E45758", dark: "#e76869" },
        active: { DEFAULT: "#5bce90", dark: "#7cd8a6" },
      },
    },
  },
  plugins: [require("tailwind-children")],
};

export default config;
