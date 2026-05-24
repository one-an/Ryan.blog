import { getAllPosts } from "@/lib/posts";
import SearchPageClient from "./SearchPageClient";

export default function SearchPage() {
  const allPosts = getAllPosts();
  return <SearchPageClient allPosts={allPosts} />;
}
