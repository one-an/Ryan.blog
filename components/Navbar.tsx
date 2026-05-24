"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import { useState } from "react";

const links = [
  { href: "/", label: "首页", icon: "🏠" },
  { href: "/projects", label: "项目", icon: "📂" },
  { href: "/about", label: "关于", icon: "👤" },
  { href: "/tags", label: "标签", icon: "🏷️" },
  { href: "/archive", label: "归档", icon: "📦" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/40 dark:bg-dark-bg/40 backdrop-blur-xl border-b border-white/40 dark:border-white/10">
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl group-hover:scale-110 transition-transform">🌸</span>
          <span className="font-bold text-lg hidden sm:block text-ink dark:text-dark-text">
            april.log
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-2 rounded-soft text-sm font-medium transition-all ${
                pathname === link.href
                  ? "bg-teal/40 dark:bg-teal/30 text-ink dark:text-dark-text"
                  : "text-muted hover:text-ink dark:hover:text-dark-text hover:bg-white/30"
              }`}
            >
              <span className="mr-1">{link.icon}</span>
              {link.label}
            </Link>
          ))}
          <div className="ml-2 pl-2 border-l border-white/40 dark:border-white/10">
            <ThemeToggle />
          </div>
        </div>

        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="border border-white/40 dark:border-white/10 rounded-soft w-10 h-10 flex items-center justify-center text-lg"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-white/40 dark:border-white/10 bg-white/60 dark:bg-dark-bg/60 backdrop-blur-xl">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`block px-4 py-3 text-sm font-medium border-b border-white/20 dark:border-white/5 ${
                pathname === link.href ? "bg-teal/30" : ""
              }`}
            >
              <span className="mr-2">{link.icon}</span>
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
