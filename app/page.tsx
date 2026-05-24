import { getAllPosts } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import AnimatedHero from "@/components/AnimatedHero";

export const revalidate = 60;

export default function HomePage() {
  const posts = getAllPosts();

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <AnimatedHero />

      <h2 className="text-xl font-extrabold mb-6">
        📝 最新文章
        <span className="text-sm font-normal text-muted ml-2">
          共 {posts.length} 篇
        </span>
      </h2>

      {posts.length === 0 ? (
        <div className="text-center py-20 text-muted">
          <p className="text-4xl mb-4">📭</p>
          <p className="text-lg font-bold">还没有文章</p>
          <p className="text-sm">开始写第一篇吧！</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {posts.map((post, index) => (
            <PostCard key={post.slug} post={post} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}
