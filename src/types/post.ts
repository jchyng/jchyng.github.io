export interface PostFrontmatter {
  title: string;
  date: string;
  category: string;
  excerpt: string;
  tags: string[];
  thumbnail?: string;
}

export interface Post {
  id: string;
  slug: string;
  encodedSlug: string;
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

// 계층 구조 카테고리 정보
export interface CategoryHierarchy {
  name: string;           // 전체 카테고리 경로 (예: 'AI/claude')
  displayName: string;    // 표시용 이름 (예: 'claude')
  level: number;          // 계층 레벨 (0부터 시작)
  parent: string | null;  // 부모 카테고리 경로
  children: string[];     // 자식 카테고리 경로들
  count: number;          // 해당 카테고리의 게시글 수
  posts: Post[];          // 해당 카테고리의 게시글들
}

// 계층 구조 카테고리 맵
export interface CategoryHierarchyMap {
  [categoryPath: string]: CategoryHierarchy;
}