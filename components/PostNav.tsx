"use client";

import Link from "next/link";
import { Post } from "@/lib/types";
import { motion } from "framer-motion";

export default function PostNav({
  prev,
  next,
}: {
  prev: Post | null;
  next: Post | null;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="mt-12 pt-8 border-t border-white/30 dark:border-white/10 grid grid-cols-2 gap-4"
    >
      {prev ? (
        <Link
          href={`/posts/${prev.slug}`}
          className="doodle-card group text-left"
        >
          <div className="text-xs text-muted mb-1">← 上一篇</div>
          <div className="font-semibold text-sm group-hover:text-teal transition-colors">
            {prev.title}
          </div>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          href={`/posts/${next.slug}`}
          className="doodle-card group text-right"
        >
          <div className="text-xs text-muted mb-1">下一篇 →</div>
          <div className="font-semibold text-sm group-hover:text-cyan transition-colors">
            {next.title}
          </div>
        </Link>
      ) : (
        <div />
      )}
    </motion.div>
  );
}
