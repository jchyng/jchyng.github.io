export interface PostFrontmatter {
  title: string;
  date: string;
  category: string;
  excerpt: string;
  tags: string[];
}

export interface Post {
  id: string;
  slug: string;
  frontmatter: PostFrontmatter;
  content: string;
  filePath: string;
}

export interface Category {
  name: string;
  count: number;
  posts: Post[];
}

export interface PostsByCategory {
  [categoryName: string]: Post[];
}

export interface PostMetadata {
  totalPosts: number;
  categories: Category[];
  latestPosts: Post[];
}