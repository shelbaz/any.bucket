import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontSize: {
        tiny: ".625rem",
      },
      maxWidth: {
        "1/2": "50%",
      },
    },
  },
  plugins: [],
  variants: {
    extend: {
      textOpacity: ["group-hover"],
      opacity: ["group-hover"],
    },
  }
};
export default config;
