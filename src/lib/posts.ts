import fs from 'fs';
import path from 'path';
import { Post, Category, PostsByCategory, PostMetadata, CategoryHierarchy, CategoryHierarchyMap } from '@/types/post';
import { parseFrontmatter } from './markdown';
import markdownToHtml from './markdown';
import { sortByDate } from '@/utils/date';

const postsDirectory = path.join(process.cwd(), 'posts');

// 파일 경로에서 카테고리 추출 (posts 하위 폴더 계층 구조 지원)
function extractCategoryFromPath(filePath: string): string {
  const relativePath = path.relative(postsDirectory, filePath);
  const pathParts = relativePath.split(path.sep);
  
  // 파일명 제거하고 폴더 계층만 추출
  const folderParts = pathParts.slice(0, -1);
  
  // 빈 배열이면 uncategorized
  if (folderParts.length === 0) {
    return 'uncategorized';
  }
  
  // 계층 구조를 '/' 구분자로 연결
  return folderParts.join('/');
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

// 특정 카테고리의 게시글 가져오기 (하위 카테고리 포함)
export async function getPostsByCategoryName(categoryName: string, includeSubcategories: boolean = false): Promise<Post[]> {
  const posts = await getAllPosts();
  
  if (!includeSubcategories) {
    return posts.filter(post => post.frontmatter.category === categoryName);
  }
  
  // 하위 카테고리 포함하여 검색
  return posts.filter(post => 
    post.frontmatter.category === categoryName || 
    post.frontmatter.category.startsWith(`${categoryName}/`)
  );
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

// 카테고리 계층 구조 분석
export function analyzeCategoryHierarchy(categories: string[]): CategoryHierarchyMap {
  const hierarchyMap: CategoryHierarchyMap = {};
  
  // 먼저 모든 경로와 중간 경로들을 생성하고 정렬
  const allPaths = new Set<string>();
  
  categories.forEach(categoryPath => {
    const parts = categoryPath.split('/');
    let currentPath = '';
    
    parts.forEach((part, index) => {
      currentPath = index === 0 ? part : `${currentPath}/${part}`;
      allPaths.add(currentPath);
    });
  });
  
  // 경로 길이순으로 정렬 (짧은 경로부터 처리)
  const sortedPaths = Array.from(allPaths).sort((a, b) => {
    const aLevel = a.split('/').length;
    const bLevel = b.split('/').length;
    if (aLevel !== bLevel) return aLevel - bLevel;
    return a.localeCompare(b);
  });
  
  // 모든 경로에 대해 카테고리 생성
  sortedPaths.forEach(categoryPath => {
    const parts = categoryPath.split('/');
    const level = parts.length - 1;
    const displayName = parts[parts.length - 1];
    const parent = level > 0 ? parts.slice(0, -1).join('/') : null;
    
    // 카테고리 생성
    if (!hierarchyMap[categoryPath]) {
      hierarchyMap[categoryPath] = {
        name: categoryPath,
        displayName,
        level,
        parent,
        children: [],
        count: 0,
        posts: []
      };
    }
    
    // 부모에 자식 추가 (부모가 이미 존재하므로 안전하게 추가 가능)
    if (parent && hierarchyMap[parent]) {
      if (!hierarchyMap[parent].children.includes(categoryPath)) {
        hierarchyMap[parent].children.push(categoryPath);
      }
    }
  });
  
  return hierarchyMap;
}

// 계층 구조 카테고리 정보 가져오기
export async function getCategoryHierarchy(): Promise<CategoryHierarchyMap> {
  const postsByCategory = await getPostsByCategory();
  const categoryPaths = Object.keys(postsByCategory);
  const hierarchyMap = analyzeCategoryHierarchy(categoryPaths);
  
  // 각 카테고리에 게시글 정보 추가
  Object.entries(postsByCategory).forEach(([categoryPath, posts]) => {
    if (hierarchyMap[categoryPath]) {
      hierarchyMap[categoryPath].posts = posts;
      hierarchyMap[categoryPath].count = posts.length;
    }
  });
  
  // 부모 카테고리에 자식 게시글 수 합산 (Optional: 부모가 직접 게시글을 가지지 않을때)
  Object.values(hierarchyMap).forEach(category => {
    if (category.children.length > 0 && category.count === 0) {
      // 자식들의 게시글 수를 합산하여 표시 (선택적)
      // 그러나 이번에는 직접 게시글이 없는 폴더는 0으로 유지
    }
  });
  
  return hierarchyMap;
}

// 루트 카테고리들 가져오기 (레벨 0)
export async function getRootCategories(): Promise<CategoryHierarchy[]> {
  const hierarchyMap = await getCategoryHierarchy();
  
  return Object.values(hierarchyMap)
    .filter(category => category.level === 0)
    .sort((a, b) => a.name.localeCompare(b.name));
}

// 특정 카테고리의 자식 카테고리들 가져오기
export async function getChildCategories(parentPath: string): Promise<CategoryHierarchy[]> {
  const hierarchyMap = await getCategoryHierarchy();
  const parent = hierarchyMap[parentPath];
  
  if (!parent) return [];
  
  return parent.children
    .map(childPath => hierarchyMap[childPath])
    .filter(Boolean)
    .sort((a, b) => a.name.localeCompare(b.name));
}

// 카테고리 경로가 유효한지 확인
export async function isCategoryPathValid(categoryPath: string): Promise<boolean> {
  const hierarchyMap = await getCategoryHierarchy();
  return categoryPath in hierarchyMap;
}

// 카테고리 경로의 브레드크럼 생성
export function getCategoryBreadcrumb(categoryPath: string): Array<{name: string, path: string}> {
  const parts = categoryPath.split('/');
  const breadcrumb: Array<{name: string, path: string}> = [];
  
  let currentPath = '';
  parts.forEach((part, index) => {
    currentPath = index === 0 ? part : `${currentPath}/${part}`;
    breadcrumb.push({
      name: part,
      path: currentPath
    });
  });
  
  return breadcrumb;
}