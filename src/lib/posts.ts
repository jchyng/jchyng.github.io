import fs from 'fs';
import path from 'path';
import { Post, Category, PostsByCategory, PostMetadata } from '@/types/post';
import { parseFrontmatter } from './markdown';
import markdownToHtml from './markdown';
import { sortByDate } from '@/utils/date';

const postsDirectory = path.join(process.cwd(), 'posts');

// 파일 경로에서 카테고리 추출 (posts 하위 첫 번째 폴더명)
function extractCategoryFromPath(filePath: string): string {
  const relativePath = path.relative(postsDirectory, filePath);
  const pathParts = relativePath.split(path.sep);
  // posts/카테고리/년월/파일.md 구조에서 카테고리 부분 반환
  return pathParts[0] || 'uncategorized';
}

// 게시글 ID 생성 (카테고리/월/파일명)
function generatePostId(filePath: string): string {
  const relativePath = path.relative(postsDirectory, filePath);
  const { dir, name } = path.parse(relativePath);
  
  return `${dir}/${name}`.replace(/\\/g, '/');
}

// 슬러그 생성 (URL에 사용할 형태) - 원본 경로 (Next.js가 자동 인코딩)
function generateSlug(filePath: string): string {
  const id = generatePostId(filePath);
  // Next.js가 자동으로 인코딩하므로 원본 반환
  return id;
}

// 인코딩된 슬러그 생성 (내부 비교용)
function generateEncodedSlug(filePath: string): string {
  const id = generatePostId(filePath);
  return encodeURIComponent(id);
}

// 모든 마크다운 파일 경로 가져오기 (삭제된 파일 제외)
function getAllMarkdownFiles(dir: string = postsDirectory): string[] {
  const files: string[] = [];
  
  try {
    // 디렉토리가 존재하지 않으면 빈 배열 반환
    if (!fs.existsSync(dir)) {
      return files;
    }
    
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        files.push(...getAllMarkdownFiles(fullPath));
      } else if (item.endsWith('.md')) {
        // 파일명에 (삭제)가 포함된 파일은 제외
        if (!item.includes('(삭제)')) {
          files.push(fullPath);
        }
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
    
    // frontmatter 검증 (title, date만 필수)
    if (!frontmatter.title || !frontmatter.date) {
      console.warn(`Invalid frontmatter in ${filePath}`);
      return null;
    }
    
    const htmlContent = await markdownToHtml(content);
    
    // 폴더명에서 카테고리 자동 추출
    const categoryFromPath = extractCategoryFromPath(filePath);
    
    return {
      id: generatePostId(filePath),
      slug: generateSlug(filePath),
      encodedSlug: generateEncodedSlug(filePath),
      frontmatter: {
        title: frontmatter.title,
        date: frontmatter.date,
        category: categoryFromPath, // 폴더명을 카테고리로 사용
        excerpt: frontmatter.excerpt || '',
        tags: frontmatter.tags || [],
        thumbnail: frontmatter.thumbnail
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
  return sortByDate(posts);
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
    const fileName = path.basename(filePath);
    // 삭제된 파일은 제외
    if (fileName.includes('(삭제)')) continue;
    
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
    const fileName = path.basename(filePath);
    // 삭제된 파일은 제외
    if (fileName.includes('(삭제)')) continue;
    
    const fileSlug = generateSlug(filePath);
    const fileEncodedSlug = generateEncodedSlug(filePath);
    
    // 원본 slug 또는 인코딩된 slug와 매칭 확인
    if (fileSlug === slug || fileEncodedSlug === slug) {
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

// 최근 게시글 가져오기 (홈페이지용)
export async function getRecentPosts(limit: number = 2): Promise<Post[]> {
  const posts = await getAllPosts();
  return posts.slice(0, limit);
}