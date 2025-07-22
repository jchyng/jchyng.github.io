import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getAllPosts } from "@/lib/posts";

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  // slug 배열을 다시 경로로 조합
  const fullSlug = slug.join('/');
  const post = await getPostBySlug(fullSlug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container-custom py-8">
        {/* 뒤로가기 */}
        <div className="mb-8">
          <Link 
            href="/blog"
            className="inline-flex items-center text-neutral-600 hover:text-neutral-900 transition-colors duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            블로그로 돌아가기
          </Link>
        </div>

        <article className="max-w-4xl mx-auto">
          {/* 헤더 */}
          <header className="mb-12">
            <div className="flex items-center space-x-2 text-sm text-neutral-500 mb-4">
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                {post.frontmatter.category}
              </span>
              <span>·</span>
              <time>{new Date(post.frontmatter.date).toLocaleDateString('ko-KR')}</time>
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-6 leading-tight">
              {post.frontmatter.title}
            </h1>

            <p className="text-xl text-neutral-600 leading-relaxed">
              {post.frontmatter.excerpt}
            </p>
          </header>

          {/* 콘텐츠 */}
          <div className="prose prose-lg prose-neutral max-w-none">
            <div 
              className="markdown-content"
              dangerouslySetInnerHTML={{ 
                __html: post.content
              }} 
            />
          </div>

          {/* 태그 */}
          {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-neutral-200">
              <div className="flex flex-wrap gap-2">
                {post.frontmatter.tags.map((tag) => (
                  <span 
                    key={tag}
                    className="px-3 py-1 bg-neutral-100 text-neutral-700 text-sm rounded-full hover:bg-neutral-200 transition-colors duration-200"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* 네비게이션 */}
          <nav className="mt-16 pb-20">
            <div className="flex justify-center">
              <Link 
                href="/blog"
                className="inline-flex items-center px-6 py-3 bg-blue-500/80 text-white rounded-lg hover:bg-blue-600/90 transition-colors duration-200"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                블로그 목록으로 돌아가기
              </Link>
            </div>
          </nav>
        </article>
      </div>
    </div>
  );
}

// 정적 경로 생성
export async function generateStaticParams() {
  try {
    const posts = await getAllPosts();
    
    const params = posts.map((post) => ({
      slug: post.slug.split('/'), // slug를 배열로 분할
    }));
    
    console.log('Generating static params for posts:', params.map(p => p.slug));
    
    return params;
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}