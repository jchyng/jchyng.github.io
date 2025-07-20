import fs from 'fs';
import path from 'path';
import { Post, Category, PostsByCategory, PostMetadata } from '@/types/post';
import { parseFrontmatter } from './markdown';
import markdownToHtml from './markdown';

const postsDirectory = path.join(process.cwd(), 'posts');

// 게시글 ID 생성 (카테고리/월/파일명에서 날짜 제거)
function generatePostId(filePath: string): string {
  const relativePath = path.relative(postsDirectory, filePath);
  const { dir, name } = path.parse(relativePath);
  
  // 파일명에서 날짜 prefix 제거 (예: "15-제목" -> "제목")
  const titleWithoutDate = name.replace(/^\d+-/, '');
  
  return `${dir}/${titleWithoutDate}`.replace(/\\/g, '/');
}

// 슬러그 생성 (URL에 사용할 형태)
function generateSlug(filePath: string): string {
  const id = generatePostId(filePath);
  return id.toLowerCase().replace(/\s+/g, '-');
}

// 모든 마크다운 파일 경로 가져오기
function getAllMarkdownFiles(dir: string = postsDirectory): string[] {
  const files: string[] = [];
  
  try {
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        files.push(...getAllMarkdownFiles(fullPath));
      } else if (item.endsWith('.md')) {
        files.push(fullPath);
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error);
  }
  
  return files;
}

// 단일 게시글 파싱
export async function parsePost(filePath: string): Promise<Post | null> {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { frontmatter, content } = parseFrontmatter(fileContent);
    
    // frontmatter 검증
    if (!frontmatter.title || !frontmatter.date || !frontmatter.category) {
      console.warn(`Invalid frontmatter in ${filePath}`);
      return null;
    }
    
    const htmlContent = await markdownToHtml(content);
    
    return {
      id: generatePostId(filePath),
      slug: generateSlug(filePath),
      frontmatter: {
        title: frontmatter.title,
        date: frontmatter.date,
        category: frontmatter.category,
        excerpt: frontmatter.excerpt || '',
        tags: frontmatter.tags || []
      },
      content: htmlContent,
      filePath
    };
  } catch (error) {
    console.error(`Error parsing post ${filePath}:`, error);
    return null;
  }
}

// 모든 게시글 가져오기
export async function getAllPosts(): Promise<Post[]> {
  const markdownFiles = getAllMarkdownFiles();
  const posts: Post[] = [];
  
  for (const filePath of markdownFiles) {
    const post = await parsePost(filePath);
    if (post) {
      posts.push(post);
    }
  }
  
  // 날짜별 내림차순 정렬
  return posts.sort((a, b) => {
    return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime();
  });
}

// 카테고리별 게시글 그룹화
export async function getPostsByCategory(): Promise<PostsByCategory> {
  const posts = await getAllPosts();
  const postsByCategory: PostsByCategory = {};
  
  posts.forEach(post => {
    const category = post.frontmatter.category;
    if (!postsByCategory[category]) {
      postsByCategory[category] = [];
    }
    postsByCategory[category].push(post);
  });
  
  return postsByCategory;
}

// 카테고리 정보 가져오기
export async function getCategories(): Promise<Category[]> {
  const postsByCategory = await getPostsByCategory();
  
  return Object.entries(postsByCategory).map(([name, posts]) => ({
    name,
    count: posts.length,
    posts
  }));
}

// 특정 카테고리의 게시글 가져오기
export async function getPostsByCategoryName(categoryName: string): Promise<Post[]> {
  const posts = await getAllPosts();
  return posts.filter(post => post.frontmatter.category === categoryName);
}

// ID로 특정 게시글 가져오기 (최적화된 버전)
export async function getPostById(id: string): Promise<Post | null> {
  const markdownFiles = getAllMarkdownFiles();
  
  // ID와 매칭되는 파일 찾기
  for (const filePath of markdownFiles) {
    const fileId = generatePostId(filePath);
    if (fileId === id) {
      return await parsePost(filePath);
    }
  }
  
  return null;
}

// 슬러그로 특정 게시글 가져오기 (최적화된 버전)
export async function getPostBySlug(slug: string): Promise<Post | null> {
  const markdownFiles = getAllMarkdownFiles();
  
  // 슬러그와 매칭되는 파일 찾기
  for (const filePath of markdownFiles) {
    const fileSlug = generateSlug(filePath);
    if (fileSlug === slug) {
      return await parsePost(filePath);
    }
  }
  
  return null;
}

// 블로그 메타데이터 가져오기
export async function getPostMetadata(): Promise<PostMetadata> {
  const posts = await getAllPosts();
  const categories = await getCategories();
  
  return {
    totalPosts: posts.length,
    categories,
    latestPosts: posts.slice(0, 5) // 최신 5개 게시글
  };
}

// 관련 게시글 가져오기 (같은 카테고리 또는 태그)
export async function getRelatedPosts(currentPost: Post, limit: number = 3): Promise<Post[]> {
  const allPosts = await getAllPosts();
  
  const relatedPosts = allPosts
    .filter(post => post.id !== currentPost.id)
    .filter(post => {
      // 같은 카테고리이거나 공통 태그가 있는 게시글
      const sameCategory = post.frontmatter.category === currentPost.frontmatter.category;
      const commonTags = post.frontmatter.tags.some(tag => 
        currentPost.frontmatter.tags.includes(tag)
      );
      return sameCategory || commonTags;
    })
    .slice(0, limit);
  
  return relatedPosts;
}