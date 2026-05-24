"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { Post } from "@/lib/types";

interface ArchiveYear {
  year: number;
  posts: Post[];
}

export default function ArchivePageClient({
  archiveData,
}: {
  archiveData: ArchiveYear[];
}) {
  const [expanded, setExpanded] = useState<Set<number>>(
    new Set(archiveData.map((a) => a.year))
  );

  const toggleYear = (year: number) => {
    const next = new Set(expanded);
    if (next.has(year)) next.delete(year);
    else next.add(year);
    setExpanded(next);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-8 text-ink dark:text-dark-text"
      >
        📦 归档
      </motion.h1>

      {archiveData.map(({ year, posts }, yi) => (
        <motion.div
          key={year}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: yi * 0.1 }}
          className="mb-6"
        >
          <button
            onClick={() => toggleYear(year)}
            className="w-full flex items-center justify-between text-left font-bold text-xl mb-3 hover:text-teal transition-colors text-ink dark:text-dark-text"
          >
            <span>{year} 年</span>
            <span className="text-sm text-muted">
              {posts.length} 篇 {expanded.has(year) ? "▾" : "▸"}
            </span>
          </button>
          {expanded.has(year) && (
            <div className="space-y-2">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/posts/${post.slug}`}
                  className="flex items-center justify-between doodle-card py-3"
                >
                  <span className="font-medium text-sm text-ink dark:text-dark-text">{post.title}</span>
                  <span className="text-xs text-muted">
                    {new Date(post.date).toLocaleDateString("zh-CN", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
