import { NextRequest, NextResponse } from "next/server";
import { getPostBySlug, updatePost, deletePostBySlug } from "@/lib/posts";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(post);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const body = await req.json();
  const { title, date, tags, description, newSlug, content } = body;

  const post = getPostBySlug(slug);
  if (!post) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  updatePost(slug, {
    title: title || post.title,
    date: date || post.date,
    tags: tags || post.tags,
    description: description || post.description,
    slug: newSlug || slug,
    content: content !== undefined ? content : post.content,
  });

  return NextResponse.json({ success: true });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  deletePostBySlug(slug);
  return NextResponse.json({ success: true });
}
