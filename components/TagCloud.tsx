"use client";

import Link from "next/link";
import { TagCount } from "@/lib/types";
import { motion } from "framer-motion";

export default function TagCloud({ tags }: { tags: TagCount[] }) {
  return (
    <div className="flex flex-wrap gap-3">
      {tags.map(({ tag, count }, i) => {
        const size = Math.min(1.5, 0.9 + count * 0.1);
        return (
          <motion.div
            key={tag}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
          >
            <Link
              href={`/tags/${tag}`}
              className="doodle-tag hover:bg-yellow transition-colors inline-flex items-center gap-1"
              style={{ fontSize: `${size}rem` }}
            >
              {tag}
              <span className="text-xs opacity-60">({count})</span>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
