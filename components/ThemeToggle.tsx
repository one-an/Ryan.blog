"use client";

import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="border border-white/40 dark:border-white/20 rounded-full w-10 h-10 flex items-center justify-center text-lg transition-all hover:-translate-y-0.5 hover:shadow-glow hover:bg-white/30"
      aria-label="Toggle dark mode"
    >
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
}
