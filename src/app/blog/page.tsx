import Link from "next/link";

// 임시 블로그 데이터 (추후 실제 데이터로 교체)
const mockPosts = [
  {
    id: 1,
    title: "Next.js 블로그 만들기 프로젝트 시작",
    excerpt: "GitHub Pages를 활용해서 개인 블로그를 만들어보기로 했다. Next.js와 Tailwind CSS를 사용해서 깔끔하고 모던한 디자인으로 구성할 예정이다.",
    category: "개발 일지",
    date: "2024.01.15",
    readTime: "5분",
    thumbnail: "/api/placeholder/400/250"
  },
  {
    id: 2,
    title: "React Hook 사용 패턴 정리",
    excerpt: "useState, useEffect, useCallback 등 자주 사용하는 Hook들의 올바른 사용법과 주의사항들을 정리해보았다. 특히 의존성 배열 관리가 중요하다.",
    category: "기술 정리",
    date: "2024.01.10",
    readTime: "8분",
    thumbnail: "/api/placeholder/400/250"
  },
  {
    id: 3,
    title: "TypeScript 타입 가드 완벽 가이드",
    excerpt: "런타임에서 타입을 안전하게 체크하는 방법들을 살펴보자. 사용자 정의 타입 가드부터 내장 타입 가드까지 다양한 패턴을 다룬다.",
    category: "TypeScript",
    date: "2024.01.05",
    readTime: "12분",
    thumbnail: "/api/placeholder/400/250"
  },
  {
    id: 4,
    title: "CSS Grid vs Flexbox 언제 뭘 써야 할까?",
    excerpt: "레이아웃을 구성할 때 항상 고민되는 CSS Grid와 Flexbox의 차이점과 각각의 사용 사례를 실제 예제와 함께 정리해보았다.",
    category: "CSS",
    date: "2024.01.01",
    readTime: "10분",
    thumbnail: "/api/placeholder/400/250"
  },
  {
    id: 5,
    title: "웹 성능 최적화 체크리스트",
    excerpt: "실제 프로젝트에서 적용할 수 있는 웹 성능 최적화 기법들을 정리했다. 이미지 최적화부터 코드 스플리팅까지 단계별로 설명한다.",
    category: "성능 최적화",
    date: "2023.12.28",
    readTime: "15분",
    thumbnail: "/api/placeholder/400/250"
  },
  {
    id: 6,
    title: "Git 브랜치 전략과 협업 워크플로우",
    excerpt: "팀 프로젝트에서 효율적인 Git 브랜치 관리 방법과 코드 리뷰 프로세스에 대해 경험을 바탕으로 정리해보았다.",
    category: "개발 도구",
    date: "2023.12.20",
    readTime: "7분",
    thumbnail: "/api/placeholder/400/250"
  }
];

const categories = [
  { name: "전체", count: 6 },
  { name: "개발 일지", count: 1 },
  { name: "기술 정리", count: 1 },
  { name: "TypeScript", count: 1 },
  { name: "CSS", count: 1 },
  { name: "성능 최적화", count: 1 },
  { name: "개발 도구", count: 1 }
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="container-custom py-8">
        <div className="flex gap-8">
          {/* 사이드바 */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              {/* 검색 */}
              <div className="card p-4 mb-6">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="게시글 검색..."
                    className="w-full pl-10 pr-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <svg 
                    className="absolute left-3 top-2.5 w-5 h-5 text-neutral-400" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>

              {/* 카테고리 */}
              <div className="card p-4">
                <h3 className="font-semibold text-neutral-900 mb-4">카테고리</h3>
                <ul className="space-y-2">
                  {categories.map((category) => (
                    <li key={category.name}>
                      <button className="flex items-center justify-between w-full px-3 py-2 text-left text-neutral-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200">
                        <span>{category.name}</span>
                        <span className="text-sm text-neutral-400">({category.count})</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>

          {/* 메인 콘텐츠 */}
          <main className="flex-1">
            {/* 헤더 */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-neutral-900 mb-2">개발 블로그</h1>
              <p className="text-neutral-600">개발하면서 배운 것들과 경험을 기록합니다</p>
            </div>

            {/* 모바일 필터 버튼 */}
            <div className="lg:hidden mb-6">
              <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors duration-200">
                <svg className="w-5 h-5 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                </svg>
                <span className="text-neutral-700">필터</span>
              </button>
            </div>

            {/* 게시글 목록 */}
            <div className="space-y-6">
              {mockPosts.map((post) => (
                <article key={post.id} className="card p-6 hover:shadow-lg transition-all duration-300">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* 썸네일 */}
                    <div className="md:w-48 md:flex-shrink-0">
                      <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                        <svg className="w-12 h-12 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>

                    {/* 콘텐츠 */}
                    <div className="flex-1">
                      {/* 메타 정보 */}
                      <div className="flex items-center space-x-2 text-sm text-neutral-500 mb-2">
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                          {post.category}
                        </span>
                        <span>·</span>
                        <time>{post.date}</time>
                        <span>·</span>
                        <span>{post.readTime} 읽기</span>
                      </div>

                      {/* 제목 */}
                      <h2 className="text-xl font-semibold text-neutral-900 mb-3 hover:text-blue-600 transition-colors duration-200">
                        <Link href={`/blog/${post.id}`}>
                          {post.title}
                        </Link>
                      </h2>

                      {/* 요약 */}
                      <p className="text-neutral-600 line-clamp-3 mb-4">
                        {post.excerpt}
                      </p>

                      {/* 더 읽기 */}
                      <Link 
                        href={`/blog/${post.id}`}
                        className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
                      >
                        더 읽기
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* 페이지네이션 */}
            <div className="flex justify-center mt-12">
              <nav className="flex items-center space-x-2">
                <button className="px-3 py-2 text-neutral-500 hover:text-neutral-700 transition-colors duration-200">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">1</button>
                <button className="px-4 py-2 text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors duration-200">2</button>
                <button className="px-4 py-2 text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors duration-200">3</button>
                <button className="px-3 py-2 text-neutral-500 hover:text-neutral-700 transition-colors duration-200">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </nav>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}