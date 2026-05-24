import { NextRequest, NextResponse } from "next/server";
import { getAllPosts, createPost } from "@/lib/posts";

export async function GET() {
  const posts = getAllPosts().map((p) => ({
    slug: p.slug,
    title: p.title,
    date: p.date,
    tags: p.tags,
    description: p.description,
    readingTime: p.readingTime,
  }));
  return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { title, date, tags, description, slug, content } = body;

  if (!title || !slug || !content) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  if (!/^[a-zA-Z0-9一-鿿-]+$/.test(slug)) {
    return NextResponse.json({ error: "Invalid slug format" }, { status: 400 });
  }

  const existing = getAllPosts().find((p) => p.slug === slug);
  if (existing) {
    return NextResponse.json(
      { error: "Slug already exists" },
      { status: 409 }
    );
  }

  createPost({
    title,
    date: date || new Date().toISOString().split("T")[0],
    tags: tags || [],
    description: description || "",
    slug,
    content,
  });

  return NextResponse.json({ success: true, slug });
}
