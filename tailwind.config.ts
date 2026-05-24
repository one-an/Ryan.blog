import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        paper: "#E3EEF5",
        ink: "#0B3D5C",
        teal: "#20A4B8",
        cyan: "#5BC0D0",
        navy: "#0E6B8A",
        muted: "#5A8A9F",
        surface: "rgba(255,255,255,0.55)",
        dark: {
          bg: "#0A1A28",
          surface: "#0F2435",
          text: "#D8E8F0",
          accent: "#20A4B8",
        },
      },
      fontFamily: {
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      boxShadow: {
        soft: "0 4px 20px rgba(14, 107, 138, 0.12)",
        "soft-lg": "0 8px 32px rgba(14, 107, 138, 0.18)",
        glow: "0 0 20px rgba(32, 164, 184, 0.25)",
      },
      borderRadius: {
        soft: "16px",
        pill: "999px",
      },
    },
  },
  plugins: [],
};
export default config;
