export interface PostFrontmatter {
  title: string;
  date: string;
  tags: string[];
  description: string;
  slug: string;
}

export interface Post extends PostFrontmatter {
  readingTime: number;
  content: string;
}

export interface Project {
  name: string;
  description: string;
  tech: string[];
  link?: string;
  github?: string;
}

export interface TagCount {
  tag: string;
  count: number;
}
