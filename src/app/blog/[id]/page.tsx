import Link from "next/link";
import { notFound } from "next/navigation";

// 임시 블로그 데이터
const mockPosts = {
  1: {
    id: 1,
    title: "Next.js 블로그 만들기 프로젝트 시작",
    excerpt: "GitHub Pages를 활용해서 개인 블로그를 만들어보기로 했다.",
    category: "개발 일지",
    date: "2024.01.15",
    readTime: "5분",
    content: `
# Next.js 블로그 만들기 프로젝트 시작

개인 블로그를 만들어보기로 결정했다. 기존에는 Tistory나 Velog 같은 플랫폼을 사용했는데, 이번에는 직접 만들어서 GitHub Pages에 배포해보려고 한다.

## 기술 스택 선택

여러 옵션을 고려했지만, 다음과 같은 이유로 Next.js를 선택했다:

- **Next.js**: React 기반으로 SSG(Static Site Generation) 지원
- **Tailwind CSS**: 빠른 스타일링과 일관된 디자인 시스템
- **TypeScript**: 타입 안정성과 개발 경험 향상
- **GitHub Pages**: 무료 호스팅과 자동 배포

## 주요 기능 계획

1. **블로그 시스템**
   - 마크다운 기반 게시글 작성
   - 카테고리별 분류
   - 검색 기능
   - 반응형 디자인

2. **포트폴리오 섹션**
   - 프로젝트 소개
   - 기술 스택 정리
   - 경력 사항

## 다음 단계

다음 포스트에서는 실제 구현 과정과 마주친 문제들을 다룰 예정이다. 특히 GitHub Pages 배포 설정과 마크다운 렌더링 부분이 흥미로울 것 같다.

---

*이 프로젝트의 전체 소스코드는 [GitHub](https://github.com)에서 확인할 수 있습니다.*
    `,
    tags: ["Next.js", "GitHub Pages", "블로그", "개발일지"]
  },
  2: {
    id: 2,
    title: "React Hook 사용 패턴 정리",
    excerpt: "useState, useEffect, useCallback 등 자주 사용하는 Hook들의 올바른 사용법과 주의사항들을 정리해보았다.",
    category: "기술 정리",
    date: "2024.01.10",
    readTime: "8분",
    content: `
# React Hook 사용 패턴 정리

React Hook을 사용하면서 자주 실수하거나 헷갈리는 부분들을 정리해보았다.

## useState

가장 기본적인 Hook이지만, 함수형 업데이트 패턴을 놓치기 쉽다.

\`\`\`javascript
// ❌ 잘못된 사용
const [count, setCount] = useState(0);
const increment = () => setCount(count + 1);

// ✅ 올바른 사용
const increment = () => setCount(prev => prev + 1);
\`\`\`

## useEffect

의존성 배열 관리가 가장 중요하다.

\`\`\`javascript
// ❌ 무한 렌더링 위험
useEffect(() => {
  setData(fetchData());
}, [data]);

// ✅ 적절한 의존성 관리
useEffect(() => {
  const fetchAndSetData = async () => {
    const result = await fetchData();
    setData(result);
  };
  fetchAndSetData();
}, []); // 빈 배열로 마운트 시에만 실행
\`\`\`

## useCallback과 useMemo

성능 최적화를 위해 사용하지만, 과도한 사용은 오히려 성능을 해칠 수 있다.

### 언제 사용해야 할까?

1. 자식 컴포넌트에 props로 전달되는 함수
2. 다른 Hook의 의존성 배열에 포함되는 함수
3. 비용이 큰 계산 결과

## 커스텀 Hook 만들기

로직을 재사용하기 위해 커스텀 Hook을 만들 때의 패턴:

\`\`\`javascript
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = useCallback((value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  }, [key]);

  return [storedValue, setValue];
}
\`\`\`

## 마무리

Hook을 제대로 이해하고 사용하면 React 개발이 훨씬 즐거워진다. 특히 의존성 배열과 함수형 업데이트 패턴은 반드시 숙지하자.
    `,
    tags: ["React", "Hook", "useState", "useEffect", "최적화"]
  }
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function BlogPostPage({ params }: PageProps) {
  const { id } = await params;
  const postId = parseInt(id);
  const post = mockPosts[postId as keyof typeof mockPosts];

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
                {post.category}
              </span>
              <span>·</span>
              <time>{post.date}</time>
              <span>·</span>
              <span>{post.readTime} 읽기</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-6 leading-tight">
              {post.title}
            </h1>

            <p className="text-xl text-neutral-600 leading-relaxed">
              {post.excerpt}
            </p>
          </header>

          {/* 콘텐츠 */}
          <div className="prose prose-lg prose-neutral max-w-none">
            <div 
              className="markdown-content"
              dangerouslySetInnerHTML={{ 
                __html: post.content.replace(/\n/g, '<br/>').replace(/```javascript/g, '<pre><code class="language-javascript">').replace(/```/g, '</code></pre>') 
              }} 
            />
          </div>

          {/* 태그 */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-neutral-200">
              <h3 className="text-sm font-medium text-neutral-700 mb-4">태그</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
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
          <nav className="mt-16 pt-8 border-t border-neutral-200">
            <div className="flex justify-between items-center">
              <div className="flex-1">
                {postId > 1 && (
                  <Link 
                    href={`/blog/${postId - 1}`}
                    className="group block p-4 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors duration-200"
                  >
                    <div className="text-sm text-neutral-500 mb-1">이전 글</div>
                    <div className="font-medium text-neutral-900 group-hover:text-blue-600 transition-colors duration-200">
                      이전 게시글 제목
                    </div>
                  </Link>
                )}
              </div>
              
              <div className="flex-1 ml-4">
                {mockPosts[postId + 1 as keyof typeof mockPosts] && (
                  <Link 
                    href={`/blog/${postId + 1}`}
                    className="group block p-4 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors duration-200 text-right"
                  >
                    <div className="text-sm text-neutral-500 mb-1">다음 글</div>
                    <div className="font-medium text-neutral-900 group-hover:text-blue-600 transition-colors duration-200">
                      다음 게시글 제목
                    </div>
                  </Link>
                )}
              </div>
            </div>
          </nav>
        </article>
      </div>
    </div>
  );
}

// 정적 경로 생성 (선택사항)
export async function generateStaticParams() {
  return Object.keys(mockPosts).map((id) => ({
    id: id,
  }));
}