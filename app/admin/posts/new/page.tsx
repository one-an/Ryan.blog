"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import MDEditor from "@uiw/react-md-editor";
import { slugify } from "@/lib/slugify";

export default function NewPostPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [tags, setTags] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!slug) setSlug(slugify(val));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const res = await fetch("/api/admin/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        slug: slug || slugify(title),
        date,
        tags: tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        description,
        content,
      }),
    });
    if (res.ok) {
      const data = await res.json();
      router.push(`/admin/posts/${data.slug}/edit`);
    } else {
      const err = await res.json();
      alert(err.error || "保存失败");
    }
    setSaving(false);
  };

  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-bold text-ink dark:text-dark-text mb-6">
        新建文章
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <input
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="标题"
            required
            className="sm:col-span-3 bg-white/50 dark:bg-dark-surface/50 border border-white/30 dark:border-white/10 rounded-soft px-4 py-2 text-ink dark:text-dark-text placeholder:text-muted focus:outline-none focus:border-teal/50"
          />
          <input
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="slug（留空自动生成）"
            className="bg-white/50 dark:bg-dark-surface/50 border border-white/30 dark:border-white/10 rounded-soft px-4 py-2 text-ink dark:text-dark-text placeholder:text-muted focus:outline-none focus:border-teal/50"
          />
          <input
            value={date}
            onChange={(e) => setDate(e.target.value)}
            type="date"
            className="bg-white/50 dark:bg-dark-surface/50 border border-white/30 dark:border-white/10 rounded-soft px-4 py-2 text-ink dark:text-dark-text focus:outline-none focus:border-teal/50"
          />
          <input
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="标签（逗号分隔）"
            className="bg-white/50 dark:bg-dark-surface/50 border border-white/30 dark:border-white/10 rounded-soft px-4 py-2 text-ink dark:text-dark-text placeholder:text-muted focus:outline-none focus:border-teal/50"
          />
        </div>
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="文章摘要"
          className="w-full bg-white/50 dark:bg-dark-surface/50 border border-white/30 dark:border-white/10 rounded-soft px-4 py-2 text-ink dark:text-dark-text placeholder:text-muted focus:outline-none focus:border-teal/50"
        />
        <div data-color-mode="light">
          <MDEditor
            value={content}
            onChange={(val) => setContent(val || "")}
            height={400}
          />
        </div>
        <button
          type="submit"
          disabled={saving}
          className="bg-teal/20 hover:bg-teal/30 border border-teal/30 rounded-soft px-6 py-2 font-semibold text-ink dark:text-dark-text transition-all disabled:opacity-50"
        >
          {saving ? "保存中..." : "发布文章"}
        </button>
      </form>
    </div>
  );
}
