"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "./ThemeProvider";

export default function Giscus() {
  const ref = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (!ref.current || ref.current.hasChildNodes()) return;

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.setAttribute("data-repo", "wuyian/wuyian.github.io");
    script.setAttribute("data-repo-id", "R_kgDO000000");
    script.setAttribute("data-category", "Announcements");
    script.setAttribute("data-category-id", "DIC_kwDO000000");
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "bottom");
    script.setAttribute("data-theme", theme === "dark" ? "dark" : "light");
    script.setAttribute("data-lang", "zh-CN");
    script.setAttribute("crossorigin", "anonymous");
    script.async = true;

    ref.current.appendChild(script);
  }, [theme]);

  return (
    <div className="mt-12 pt-8 border-t border-white/30 dark:border-white/10">
      <h3 className="text-lg font-bold mb-4 text-ink dark:text-dark-text">💬 评论</h3>
      <div ref={ref} />
    </div>
  );
}
