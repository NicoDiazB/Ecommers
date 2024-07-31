import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
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
        primary: "#B5783D",
        secundary: "#7D452B",
        "soft-letter": "#E3CAA5",
        "input-bg": "#f9f5ed",
      },
      boxShadow: {
        "card-shadow": "2px 2px 4px rgba(0, 0, 0, 0.50)",
      },
    },
  },
  plugins: [],
};
export default config;
