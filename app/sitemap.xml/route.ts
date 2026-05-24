import { getAllPosts, getAllTags } from "@/lib/posts";

export async function GET() {
  const posts = getAllPosts();
  const tags = getAllTags();
  const baseUrl = "https://wuyian.dev";

  const staticPages = [
    { loc: baseUrl, priority: "1.0" },
    { loc: `${baseUrl}/about`, priority: "0.8" },
    { loc: `${baseUrl}/projects`, priority: "0.8" },
    { loc: `${baseUrl}/tags`, priority: "0.6" },
    { loc: `${baseUrl}/archive`, priority: "0.6" },
    { loc: `${baseUrl}/search`, priority: "0.3" },
  ];

  const postPages = posts.map((post) => ({
    loc: `${baseUrl}/posts/${post.slug}`,
    lastmod: post.date,
    priority: "0.9",
  }));

  const tagPages = tags.map((t) => ({
    loc: `${baseUrl}/tags/${t.tag}`,
    priority: "0.5",
  }));

  const allUrls = [...staticPages, ...postPages, ...tagPages];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allUrls
    .map(
      (u) => `
  <url>
    <loc>${u.loc}</loc>
    ${"lastmod" in u ? `<lastmod>${u.lastmod}</lastmod>` : ""}
    <priority>${u.priority}</priority>
  </url>`
    )
    .join("")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}

export const revalidate = 3600;
