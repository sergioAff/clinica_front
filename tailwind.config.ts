import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/ui/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/ui/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "white-primary": "#D8E8D8",
        "green-primary": "#449603",
        "green-secondary": "#21251F",
        "green-tertiary": "#2D6203",
        "gray-primary": "#4E515C",
        "gray-secondary": "#2D2D2D",
      },
    },
  },
  plugins: [],
};
export default config;
