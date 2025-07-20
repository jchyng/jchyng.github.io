"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { Post, Category } from "@/types/post";

interface BlogContentProps {
  posts: Post[];
  categories: Category[];
}

export default function BlogContent({ posts, categories }: BlogContentProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("전체");

  const filteredPosts = useMemo(() => {
    if (selectedCategory === "전체") {
      return posts;
    }
    return posts.filter(post => post.frontmatter.category === selectedCategory);
  }, [selectedCategory, posts]);

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
  };

  const allCategories = [
    { name: "전체", count: posts.length, posts: [] },
    ...categories
  ];

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
                  {allCategories.map((category) => (
                    <li key={category.name}>
                      <button 
                        onClick={() => handleCategoryClick(category.name)}
                        className={`flex items-center justify-between w-full px-3 py-2 text-left rounded-lg transition-colors duration-200 ${
                          selectedCategory === category.name
                            ? 'text-blue-600 bg-blue-50 font-medium'
                            : 'text-neutral-700 hover:text-blue-600 hover:bg-blue-50'
                        }`}
                      >
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

            {/* 선택된 카테고리 표시 */}
            {selectedCategory !== "전체" && (
              <div className="mb-6">
                <div className="flex items-center space-x-2 text-sm text-neutral-600">
                  <span>카테고리:</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">
                    {selectedCategory}
                  </span>
                  <span>({filteredPosts.length}개 게시글)</span>
                </div>
              </div>
            )}

            {/* 게시글 목록 */}
            <div className="space-y-6">
              {filteredPosts.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-neutral-500">해당 카테고리에 게시글이 없습니다.</div>
                </div>
              ) : (
                filteredPosts.map((post) => (
                <article key={post.id} className="card p-6 hover:shadow-lg transition-all duration-300">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* 썸네일 */}
                    <div className="md:w-48 md:flex-shrink-0 md:self-stretch">
                      <div className="h-full bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                        <svg className="w-12 h-12 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>

                    {/* 콘텐츠 */}
                    <div className="flex-1 relative">
                      {/* 메타 정보 */}
                      <div className="flex items-center space-x-2 text-sm text-neutral-500 mb-2 pr-20">
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                          {post.frontmatter.category}
                        </span>
                        <span>·</span>
                        <time>{new Date(post.frontmatter.date).toLocaleDateString('ko-KR')}</time>
                      </div>

                      {/* 더 읽기 - 우측 상단 */}
                      <Link 
                        href={`/blog/${encodeURIComponent(post.slug)}`}
                        className="absolute top-0 right-0 inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200 text-sm"
                      >
                        더 읽기
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>

                      {/* 제목 */}
                      <h2 className="text-xl font-semibold text-neutral-900 mb-3 hover:text-blue-600 transition-colors duration-200">
                        <Link href={`/blog/${encodeURIComponent(post.slug)}`}>
                          {post.frontmatter.title}
                        </Link>
                      </h2>

                      {/* 요약 */}
                      <p className="text-neutral-600 line-clamp-3 mb-4">
                        {post.frontmatter.excerpt}
                      </p>

                      {/* 태그 */}
                      {post.frontmatter.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {post.frontmatter.tags.slice(0, 3).map((tag) => (
                            <span 
                              key={tag}
                              className="px-2 py-1 bg-neutral-100 text-neutral-600 text-xs rounded-full"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </article>
                ))
              )}
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