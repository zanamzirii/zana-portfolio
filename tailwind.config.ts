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
        background:  "#080808",
        surface:     "#0F0F0F",
        card:        "#141414",
        elevated:    "#1C1C1C",
        border:      "#222222",
        borderLight: "#2A2A2A",

        textPrimary:   "#F0F0F0",
        textSecondary: "#888888",
        textMuted:     "#444444",

        accent:       "#6366F1",
        accentHover:  "#4F46E5",
        accentMuted:  "#6366F114",
        accentBorder: "#6366F133",
      },
      fontFamily: {
        sans:  ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      fontSize: {
        "hero-sm": ["clamp(2.5rem, 12vw, 4rem)", { lineHeight: "1.05", letterSpacing: "-0.03em" }],
        "hero-lg": ["clamp(4rem, 10vw, 7rem)",   { lineHeight: "1.0",  letterSpacing: "-0.04em" }],
      },
      keyframes: {
        "pulse-slow": {
          "0%, 100%": { opacity: "1" },
          "50%":      { opacity: "0.4" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%":      { opacity: "0" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to:   { opacity: "1" },
        },
        "slide-down": {
          from: { opacity: "0", transform: "translateY(-8px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "pulse-slow": "pulse-slow 2.5s ease-in-out infinite",
        blink:        "blink 1s step-end infinite",
        "fade-in":    "fade-in 0.4s ease-out forwards",
        "slide-down": "slide-down 0.3s ease-out forwards",
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "48px 48px",
      },
    },
  },
  plugins: [],
};

export default config;
