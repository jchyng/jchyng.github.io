import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Simple Intro Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-6">
                안녕하세요, 개발자 
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  김개발
                </span>
                입니다
              </h1>
              <p className="text-xl text-neutral-600 mb-8 leading-relaxed">
                웹 개발을 통해 배운 것들과 경험을 기록하고 공유하는 공간입니다.<br/>
                주로 프론트엔드와 백엔드 개발, 그리고 개발 과정에서 만난 문제들의 해결 과정을 다룹니다.
              </p>
            </div>

            {/* Recent Posts Preview */}
            <div className="mb-16">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-semibold text-neutral-900">최근 게시글</h2>
                <Link 
                  href="/blog" 
                  className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
                >
                  전체 보기 →
                </Link>
              </div>
              
              <div className="grid gap-6 md:grid-cols-2">
                {/* Sample Recent Posts */}
                <article className="card p-6">
                  <div className="flex items-center text-sm text-neutral-500 mb-3">
                    <span>개발 일지</span>
                    <span className="mx-2">·</span>
                    <time>2024.01.15</time>
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2 line-clamp-2">
                    Next.js 블로그 만들기 프로젝트 시작
                  </h3>
                  <p className="text-neutral-600 text-sm line-clamp-3">
                    GitHub Pages를 활용해서 개인 블로그를 만들어보기로 했다. 
                    Next.js와 Tailwind CSS를 사용해서 깔끔하고 모던한 디자인으로...
                  </p>
                </article>

                <article className="card p-6">
                  <div className="flex items-center text-sm text-neutral-500 mb-3">
                    <span>기술 정리</span>
                    <span className="mx-2">·</span>
                    <time>2024.01.10</time>
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2 line-clamp-2">
                    React Hook 사용 패턴 정리
                  </h3>
                  <p className="text-neutral-600 text-sm line-clamp-3">
                    useState, useEffect, useCallback 등 자주 사용하는 Hook들의 
                    올바른 사용법과 주의사항들을 정리해보았다...
                  </p>
                </article>
              </div>
            </div>

            {/* Navigation Cards */}
            <div className="grid md:grid-cols-2 gap-8">
              <Link 
                href="/blog" 
                className="group card p-8 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-blue-200 transition-colors duration-300">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-neutral-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                      개발 블로그
                    </h3>
                    <p className="text-neutral-600">
                      개발하면서 배운 것들, 문제 해결 과정, 새로운 기술 학습 기록
                    </p>
                    <div className="flex items-center mt-4 text-blue-600 group-hover:translate-x-1 transition-transform duration-300">
                      <span className="text-sm font-medium">게시글 보기</span>
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>

              <Link 
                href="/portfolio" 
                className="group card p-8 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-purple-200 transition-colors duration-300">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-neutral-900 mb-2 group-hover:text-purple-600 transition-colors duration-300">
                      포트폴리오
                    </h3>
                    <p className="text-neutral-600">
                      프로젝트 경험, 기술 스택, 경력 사항 및 연락처 정보
                    </p>
                    <div className="flex items-center mt-4 text-purple-600 group-hover:translate-x-1 transition-transform duration-300">
                      <span className="text-sm font-medium">자세히 보기</span>
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
