"use client";

import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";

const components = {
  h1: (props: any) => (
    <h1 className="text-2xl font-extrabold mt-8 mb-4" {...props} />
  ),
  h2: (props: any) => (
    <h2 className="text-xl font-bold mt-6 mb-3" {...props} />
  ),
  h3: (props: any) => (
    <h3 className="text-lg font-bold mt-5 mb-2" {...props} />
  ),
  a: (props: any) => (
    <a
      className="text-coral font-bold underline decoration-2 underline-offset-2"
      target={props.href?.startsWith("http") ? "_blank" : undefined}
      rel="noopener noreferrer"
      {...props}
    />
  ),
  pre: (props: any) => (
    <pre
      className="bg-ink text-white dark:bg-dark-surface border-2 border-ink rounded-doodle p-4 my-4 overflow-x-auto"
      {...props}
    />
  ),
  code: (props: any) => {
    const { className } = props;
    if (className) {
      return <code className={className} {...props} />;
    }
    return (
      <code
        className="bg-yellow/30 dark:bg-yellow/20 px-1.5 py-0.5 rounded text-sm font-mono"
        {...props}
      />
    );
  },
  table: (props: any) => (
    <table
      className="w-full border-collapse border-2 border-ink my-4"
      {...props}
    />
  ),
  th: (props: any) => (
    <th
      className="bg-yellow border-2 border-ink px-3 py-2 font-bold text-left"
      {...props}
    />
  ),
  td: (props: any) => (
    <td className="border-2 border-ink px-3 py-2" {...props} />
  ),
  blockquote: (props: any) => (
    <blockquote
      className="border-l-4 border-yellow pl-4 my-4 italic text-muted"
      {...props}
    />
  ),
};

export default function MdxRenderer({
  source,
}: {
  source: MDXRemoteSerializeResult;
}) {
  return (
    <div className="prose dark:text-dark-text">
      <MDXRemote {...source} components={components} />
    </div>
  );
}
