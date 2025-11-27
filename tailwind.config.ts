import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./templates/**/*.{js,ts,jsx,tsx,mdx}",
    "./config/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        sans: [
          "Satoshi",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
      },
      keyframes: {
        blink: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
        ripple: {
          "0%": {
            boxShadow:
              "0 0 0 0 rgba(0, 255, 5, 0.4), 0 0 0 0 rgba(0, 255, 5, 0.4)",
          },
          "50%": {
            boxShadow:
              "0 0 0 4px rgba(0, 255, 5, 0.1), 0 0 0 8px rgba(0, 255, 5, 0.05)",
          },
          "100%": {
            boxShadow:
              "0 0 0 4px rgba(0, 255, 5, 0), 0 0 0 8px rgba(0, 255, 5, 0)",
          },
        },
      },
      animation: {
        blink: "blink 1s step-end infinite",
        ripple: "ripple 2s ease-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
