import { getAllPosts, getPostBySlug, getAdjacentPosts } from "@/lib/posts";
import { MDXRemote } from "next-mdx-remote/rsc";
import Giscus from "@/components/Giscus";
import PostNav from "@/components/PostNav";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";

interface Props {
  params: Promise<{ slug: string }>;
}

const mdxComponents = {
  h1: (props: any) => (
    <h1 className="text-2xl font-bold mt-8 mb-4 text-ink dark:text-dark-text" {...props} />
  ),
  h2: (props: any) => (
    <h2 className="text-xl font-bold mt-6 mb-3 text-ink dark:text-dark-text" {...props} />
  ),
  h3: (props: any) => (
    <h3 className="text-lg font-semibold mt-5 mb-2 text-ink dark:text-dark-text" {...props} />
  ),
  a: (props: any) => (
    <a
      className="text-teal font-semibold underline decoration-1 underline-offset-2"
      target={props.href?.startsWith("http") ? "_blank" : undefined}
      rel="noopener noreferrer"
      {...props}
    />
  ),
  pre: (props: any) => (
    <pre
      className="bg-[#1E1030] dark:bg-dark-surface border border-white/10 rounded-soft p-4 my-4 overflow-x-auto text-[#E0D8F0] text-sm"
      {...props}
    />
  ),
  code: (props: any) => {
    const { className } = props;
    if (className) {
      return <code className={`${className} text-sm`} {...props} />;
    }
    return (
      <code
        className="bg-teal/20 dark:bg-teal/10 px-1.5 py-0.5 rounded text-sm font-mono text-ink dark:text-dark-text"
        {...props}
      />
    );
  },
  table: (props: any) => (
    <table
      className="w-full border-collapse border border-white/20 dark:border-white/10 my-4 rounded-soft overflow-hidden"
      {...props}
    />
  ),
  th: (props: any) => (
    <th
      className="bg-teal/20 border border-white/20 dark:border-white/10 px-3 py-2 font-semibold text-left text-ink dark:text-dark-text"
      {...props}
    />
  ),
  td: (props: any) => (
    <td className="border border-white/20 dark:border-white/10 px-3 py-2 text-sm text-muted" {...props} />
  ),
  blockquote: (props: any) => (
    <blockquote
      className="border-l-4 border-teal/40 pl-4 my-4 italic text-muted"
      {...props}
    />
  ),
};

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "文章未找到" };

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const { prev, next } = getAdjacentPosts(slug);

  const content = await MDXRemote({
    source: post.content,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeHighlight, rehypeSlug],
      },
    },
    components: mdxComponents,
  });

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <article>
        <header className="mb-8">
          <div className="flex flex-wrap gap-1.5 mb-3">
            {post.tags.map((tag) => (
              <a
                key={tag}
                href={`/tags/${tag}`}
                className="doodle-tag"
              >
                {tag}
              </a>
            ))}
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 text-ink dark:text-dark-text">
            {post.title}
          </h1>
          <div className="flex items-center gap-3 text-sm text-muted">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("zh-CN", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <span>·</span>
            <span>{post.readingTime} min read</span>
          </div>
        </header>

        <div className="prose dark:text-dark-text">{content}</div>
      </article>

      <PostNav prev={prev} next={next} />
      <Giscus />
    </div>
  );
}
