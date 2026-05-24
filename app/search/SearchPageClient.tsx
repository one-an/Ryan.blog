"use client";

import { useState } from "react";
import SearchInput from "@/components/SearchInput";
import PostCard from "@/components/PostCard";
import { Post } from "@/lib/types";

function searchPosts(posts: Post[], query: string): Post[] {
  const lowerQuery = query.toLowerCase();
  return posts.filter(
    (p) =>
      p.title.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery) ||
      p.tags.some((t) => t.toLowerCase().includes(lowerQuery)) ||
      p.content.toLowerCase().includes(lowerQuery)
  );
}

export default function SearchPageClient({ allPosts }: { allPosts: Post[] }) {
  const [results, setResults] = useState<Post[]>([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = (query: string) => {
    if (query.trim().length === 0) {
      setResults([]);
      setSearched(false);
      return;
    }
    setResults(searchPosts(allPosts, query));
    setSearched(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-extrabold mb-6">🔍 搜索</h1>
      <SearchInput onSearch={handleSearch} />

      {searched && (
        <div className="mt-8">
          <p className="text-muted mb-4">
            {results.length === 0
              ? "没有找到相关文章 😅"
              : `找到 ${results.length} 篇相关文章`}
          </p>
          <div className="flex flex-col gap-4">
            {results.map((post, index) => (
              <PostCard key={post.slug} post={post} index={index} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
