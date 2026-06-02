import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "后台管理 | Ryan.log",
  robots: { index: false, follow: false },
};

const navItems = [
  { href: "/admin/posts", label: "📝 文章管理" },
  { href: "/admin/projects", label: "📂 项目管理" },
  { href: "/admin/about", label: "👤 关于页" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-[#E3EEF5] dark:bg-dark-bg">
      <aside className="w-56 bg-white/40 dark:bg-dark-surface/40 backdrop-blur-xl border-r border-white/30 dark:border-white/10 flex-shrink-0 flex flex-col">
        <div className="p-5 border-b border-white/30 dark:border-white/10">
          <Link
            href="/admin/posts"
            className="font-bold text-lg text-ink dark:text-dark-text"
          >
            ⚙️ 后台管理
          </Link>
        </div>
        <nav className="p-3 flex flex-col gap-1 flex-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-3 py-2 rounded-soft text-sm font-medium text-muted hover:text-ink dark:hover:text-dark-text hover:bg-white/30 transition-all"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-3 border-t border-white/30 dark:border-white/10">
          <a
            href="/"
            className="text-xs text-muted hover:text-ink dark:hover:text-dark-text"
          >
            ← 返回博客
          </a>
        </div>
      </aside>
      <main className="flex-1 p-6 overflow-auto">{children}</main>
    </div>
  );
}
