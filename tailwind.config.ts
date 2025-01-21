import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        appRed: "#ec2424",
        appDark: "#18191d",
        appBorderGray: "#323434",
        appGhost: "#dededf",
        appOffWhite: "#F6F6F6",
      },
    },
  },
  plugins: [],
} satisfies Config;
