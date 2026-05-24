import { getAllTags } from "@/lib/posts";
import TagCloud from "@/components/TagCloud";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "标签",
  description: "按标签浏览所有文章",
};

export default function TagsPage() {
  const tags = getAllTags();

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-extrabold mb-3">🏷️ 标签</h1>
      <p className="text-muted mb-8">共 {tags.length} 个标签</p>
      <TagCloud tags={tags} />
    </div>
  );
}
