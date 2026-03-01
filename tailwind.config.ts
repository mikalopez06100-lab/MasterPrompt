import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: "#F7F4EF",
        "ivory-2": "#EDE9E2",
        navy: "#0D1B2A",
        "navy-2": "#1A2F45",
        sand: "#C9B99A",
        primary: {
          DEFAULT: "#2563EB",
          hover: "#1D4ED8",
          light: "#DBEAFE",
        },
        muted: {
          DEFAULT: "#6B7280",
          light: "#9CA3AF",
        },
        border: "#E2DDD6",
      },
      fontFamily: {
        sans: ["var(--font-instrument-sans)", "system-ui", "sans-serif"],
        heading: ["var(--font-fraunces)", "Georgia", "serif"],
      },
      borderRadius: {
        card: "12px",
        "card-lg": "16px",
        "card-xl": "20px",
        button: "8px",
        "button-lg": "10px",
      },
      boxShadow: {
        card: "0 4px 6px -1px rgba(0,0,0,0.04), 0 20px 60px -10px rgba(13,27,42,0.1)",
        "card-hover": "0 8px 30px rgba(13,27,42,0.07)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease both",
        "fade-up": "fadeUp 0.6s ease both",
        shake: "shake 0.3s ease",
      },
      keyframes: {
        fadeIn: { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        fadeUp: { "0%": { opacity: "0", transform: "translateY(20px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        blink: { "0%,100%": { opacity: "1" }, "50%": { opacity: "0.3" } },
        shake: { "0%,100%": { transform: "translateX(0)" }, "25%": { transform: "translateX(-6px)" }, "75%": { transform: "translateX(6px)" } },
      },
    },
  },
  plugins: [],
};

export default config;
