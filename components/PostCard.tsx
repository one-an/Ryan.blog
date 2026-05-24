"use client";

import Link from "next/link";
import { Post } from "@/lib/types";
import { motion } from "framer-motion";

export default function PostCard({
  post,
  index,
}: {
  post: Post;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.08 }}
    >
      <Link href={`/posts/${post.slug}`} className="block group">
        <article className="doodle-card">
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted mb-2">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("zh-CN", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <span>·</span>
            <span>{post.readingTime} min read</span>
          </div>
          <h2 className="text-lg font-bold mb-2 group-hover:text-teal dark:group-hover:text-teal transition-colors text-ink dark:text-dark-text">
            {post.title}
          </h2>
          <p className="text-sm text-muted mb-3 line-clamp-2">
            {post.description}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <span key={tag} className="doodle-tag">
                {tag}
              </span>
            ))}
          </div>
        </article>
      </Link>
    </motion.div>
  );
}
