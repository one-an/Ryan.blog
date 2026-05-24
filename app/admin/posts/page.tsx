"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Post } from "@/lib/types";

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch("/api/admin/posts")
      .then((r) => r.json())
      .then(setPosts);
  }, []);

  const handleDelete = async (slug: string, title: string) => {
    if (!confirm(`确定删除 "${title}"？`)) return;
    const res = await fetch(`/api/admin/posts/${slug}`, { method: "DELETE" });
    if (res.ok) {
      setPosts(posts.filter((p) => p.slug !== slug));
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-ink dark:text-dark-text">
          📝 文章管理
        </h1>
        <Link
          href="/admin/posts/new"
          className="bg-teal/20 hover:bg-teal/30 border border-teal/30 rounded-soft px-4 py-2 text-sm font-semibold text-ink dark:text-dark-text transition-all"
        >
          + 新建文章
        </Link>
      </div>

      <div className="bg-white/40 dark:bg-dark-surface/40 backdrop-blur-xl rounded-soft border border-white/30 dark:border-white/10 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/30 dark:border-white/10">
              <th className="text-left p-3 font-semibold text-muted">标题</th>
              <th className="text-left p-3 font-semibold text-muted hidden sm:table-cell">
                日期
              </th>
              <th className="text-left p-3 font-semibold text-muted hidden md:table-cell">
                标签
              </th>
              <th className="text-right p-3 font-semibold text-muted">操作</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr
                key={post.slug}
                className="border-b border-white/20 dark:border-white/5 hover:bg-white/20 transition-colors"
              >
                <td className="p-3 font-medium text-ink dark:text-dark-text">
                  {post.title}
                </td>
                <td className="p-3 text-muted hidden sm:table-cell">
                  {post.date}
                </td>
                <td className="p-3 hidden md:table-cell">
                  <div className="flex gap-1">
                    {post.tags.map((t) => (
                      <span key={t} className="doodle-tag text-xs">
                        {t}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="p-3 text-right">
                  <div className="flex gap-2 justify-end">
                    <Link
                      href={`/admin/posts/${post.slug}/edit`}
                      className="text-teal hover:underline text-xs font-semibold"
                    >
                      编辑
                    </Link>
                    <button
                      onClick={() => handleDelete(post.slug, post.title)}
                      className="text-red-400 hover:text-red-600 text-xs font-semibold"
                    >
                      删除
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {posts.length === 0 && (
              <tr>
                <td colSpan={4} className="p-8 text-center text-muted">
                  还没有文章
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
