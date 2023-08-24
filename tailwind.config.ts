import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        tcOrange: "#f15a24",
      },
    },
  },
  plugins: [],
} satisfies Config;
