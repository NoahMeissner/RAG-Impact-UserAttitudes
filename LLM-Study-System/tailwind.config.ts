import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-text': '#050315',
        'custom-bg': 'rgb(251, 251, 254)',
        'custom-primary': '#2f27ce',
        'custom-secondary': '#7a333f',
        'custom-accent': '#ac8a9e',
        'custom-accent-text': '#374151',
        'chat-bg-user': 'rgb(30, 190, 165)',
        'chat-bg-system': 'rgb(39, 52, 67)',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
