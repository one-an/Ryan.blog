import { getAllTags, getPostsByTag } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ tag: string }>;
}

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map((t) => ({ tag: t.tag }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params;
  return {
    title: `标签: ${tag}`,
    description: `查看所有关于 ${tag} 的文章`,
  };
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params;
  const posts = getPostsByTag(tag);

  if (posts.length === 0) notFound();

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-extrabold mb-2">🏷️ {tag}</h1>
      <p className="text-muted mb-8">共 {posts.length} 篇文章</p>
      <div className="flex flex-col gap-4">
        {posts.map((post, index) => (
          <PostCard key={post.slug} post={post} index={index} />
        ))}
      </div>
      <div className="mt-8">
        <Link
          href="/tags"
          className="text-sm font-bold hover:text-coral transition-colors"
        >
          ← 查看所有标签
        </Link>
      </div>
    </div>
  );
}
