import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Manrope'", "ui-sans-serif", "system-ui"]
      },
      boxShadow: {
        soft: "0 8px 30px rgba(0, 0, 0, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;
