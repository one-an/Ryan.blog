import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/40 dark:border-white/10 mt-auto bg-white/20 dark:bg-dark-bg/20 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted">
        <div>
          <span className="font-bold text-ink dark:text-dark-text">🌸 april.log</span>{" "}
          © {new Date().getFullYear()}
        </div>
        <div className="flex gap-4">
          <Link
            href="/rss.xml"
            className="hover:text-ink dark:hover:text-dark-text font-medium transition-colors"
          >
            RSS
          </Link>
          <a
            href="https://github.com/wuyian"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-ink dark:hover:text-dark-text font-medium transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
