import Link from "next/link";
import { getRecentPosts } from "@/lib/posts";
import { formatKoreanDate } from "@/utils/date";
import Icon from "@/components/ui/Icon";

export default async function Home() {
  const recentPosts = await getRecentPosts(2);
  return (
    <div className="min-h-screen bg-white">
      {/* Simple Intro Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-6">
                안녕하세요, 개발자
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  정찬영
                </span>
                입니다
              </h1>
              <p className="text-xl text-neutral-600 mb-8 leading-relaxed">
                개발을 통해 배운 것들과 경험을 기록하고 공유하는 공간입니다.
                <br />
                주로 웹 개발 과정에서 만난 문제들의 해결 과정을 다룹니다.
              </p>
            </div>

            {/* Recent Posts Preview */}
            <div className="mb-16">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-semibold text-neutral-900">
                  최근 게시글
                </h2>
                <Link
                  href="/blog"
                  className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
                >
                  전체 보기 →
                </Link>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {recentPosts.map((post) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="card p-6 hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="flex items-center text-sm text-neutral-500 mb-3">
                      <span>{post.frontmatter.category}</span>
                      <span className="mx-2">·</span>
                      <time>{formatKoreanDate(post.frontmatter.date)}</time>
                    </div>
                    <h3 className="text-lg font-semibold text-neutral-900 mb-2 line-clamp-2">
                      {post.frontmatter.title}
                    </h3>
                    <p className="text-neutral-600 text-sm line-clamp-3">
                      {post.frontmatter.excerpt}
                    </p>
                  </Link>
                ))}
              </div>
            </div>

            {/* Navigation Cards */}
            <div className="grid md:grid-cols-2 gap-8">
              <Link
                href="/portfolio"
                className="group card p-8 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-blue-200 transition-colors duration-300">
                    <Icon name="portfolio" className="text-blue-600" size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-neutral-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                      포트폴리오
                    </h3>
                    <p className="text-neutral-600">
                      프로젝트 경험, 기술 스택, 경력 사항 및 연락처 정보
                    </p>
                    <div className="flex items-center mt-4 text-blue-600 group-hover:translate-x-1 transition-transform duration-300">
                      <span className="text-sm font-medium">자세히 보기</span>
                      <Icon name="arrow" className="ml-1" size={16} />
                    </div>
                  </div>
                </div>
              </Link>

              <Link
                href="/blog"
                className="group card p-8 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-purple-200 transition-colors duration-300">
                    <Icon name="blog" className="text-purple-600" size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-neutral-900 mb-2 group-hover:text-purple-600 transition-colors duration-300">
                      개발 블로그
                    </h3>
                    <p className="text-neutral-600">
                      개발하면서 배운 것들, 문제 해결 과정, 새로운 기술 학습
                      기록
                    </p>
                    <div className="flex items-center mt-4 text-purple-600 group-hover:translate-x-1 transition-transform duration-300">
                      <span className="text-sm font-medium">게시글 보기</span>
                      <Icon name="arrow" className="ml-1" size={16} />
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
