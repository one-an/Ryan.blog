import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Post, TagCount, PostFrontmatter } from "./types";
import { writeTextFile, deleteFile } from "./file-store";

const postsDirectory = path.join(process.cwd(), "content/posts");

export function getAllPosts(): Post[] {
  if (!fs.existsSync(postsDirectory)) return [];

  const filenames = fs.readdirSync(postsDirectory);
  const posts = filenames
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map((filename) => {
      const filePath = path.join(postsDirectory, filename);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(fileContent);
      const readingTime = Math.ceil(content.split(/\s+/).length / 300);

      return {
        title: data.title || "Untitled",
        date: data.date || new Date().toISOString(),
        tags: data.tags || [],
        description: data.description || "",
        slug: data.slug || filename.replace(/\.mdx?$/, ""),
        readingTime: readingTime || 1,
        content,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

export function getPostBySlug(slug: string): Post | null {
  const posts = getAllPosts();
  return posts.find((p) => p.slug === slug) || null;
}

export function getPostsByTag(tag: string): Post[] {
  return getAllPosts().filter((p) => p.tags.includes(tag));
}

export function getAllTags(): TagCount[] {
  const posts = getAllPosts();
  const tagMap = new Map<string, number>();

  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
    });
  });

  return Array.from(tagMap.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

export function getArchive(): Map<number, Post[]> {
  const posts = getAllPosts();
  const archive = new Map<number, Post[]>();

  posts.forEach((post) => {
    const year = new Date(post.date).getFullYear();
    if (!archive.has(year)) archive.set(year, []);
    archive.get(year)!.push(post);
  });

  return archive;
}

export function getAdjacentPosts(
  slug: string
): { prev: Post | null; next: Post | null } {
  const posts = getAllPosts();
  const index = posts.findIndex((p) => p.slug === slug);

  if (index === -1) return { prev: null, next: null };

  return {
    prev: index > 0 ? posts[index - 1] : null,
    next: index < posts.length - 1 ? posts[index + 1] : null,
  };
}

export function searchPosts(query: string): Post[] {
  const lowerQuery = query.toLowerCase();
  return getAllPosts().filter(
    (p) =>
      p.title.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery) ||
      p.tags.some((t) => t.toLowerCase().includes(lowerQuery)) ||
      p.content.toLowerCase().includes(lowerQuery)
  );
}

// Write methods for admin

export function createPost(data: PostFrontmatter & { content: string }): void {
  const tagsStr = data.tags.join(", ");
  const frontmatter = `---
title: ${JSON.stringify(data.title)}
date: ${data.date || new Date().toISOString().split("T")[0]}
tags: [${tagsStr}]
description: ${JSON.stringify(data.description)}
slug: ${data.slug}
---
`;
  const fileContent = frontmatter + "\n" + data.content;
  writeTextFile(`content/posts/${data.slug}.mdx`, fileContent);
}

export function updatePost(
  slug: string,
  data: PostFrontmatter & { content: string }
): void {
  if (slug !== data.slug) {
    deleteFile(`content/posts/${slug}.mdx`);
  }
  createPost(data);
}

export function deletePostBySlug(slug: string): void {
  deleteFile(`content/posts/${slug}.mdx`);
}
