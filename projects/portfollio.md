---
title: "개인 포트폴리오 & 기술 블로그"
period: "2025.01 ~ 현재"
description: "Next.js 15 기반 포트폴리오 겸 기술 블로그. 마크다운 CMS, 컴포넌트 아키텍처, GitHub Pages 자동 배포 구현"
link: "https://jchyng.github.io"
tech: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS", "GitHub Actions", "Gray-matter", "Remark"]
team: "개인 프로젝트"
image: "/images/portfolio/portfolio/thumbnail.png"
type: "personal"
---

# 개인 포트폴리오 & 기술 블로그

## 프로젝트 개요

개인 브랜딩과 기술 공유를 위한 포트폴리오 겸 기술 블로그입니다. 최신 웹 기술을 활용하여 성능과 사용자 경험을 최적화한 정적 사이트를 구축했으며, 마크다운 기반의 효율적인 콘텐츠 관리 시스템을 구현했습니다.

## 주요 특징

### 🎨 현대적인 디자인 시스템
- **글래스모피즘 UI**: 모던한 디자인 트렌드 적용
- **반응형 디자인**: 모바일, 태블릿, 데스크톱 완벽 대응
- **다크/라이트 테마**: 사용자 선호도에 맞는 테마 지원
- **마이크로 인터랙션**: 부드러운 애니메이션과 전환 효과

### 📝 듀얼 콘텐츠 시스템
- **포트폴리오 섹션**: 프로젝트, 기술 스택, 경력 정보 체계적 관리
- **기술 블로그**: 개발 경험과 학습 내용 공유 플랫폼
- **카테고리 기반 분류**: 주제별 콘텐츠 체계적 정리

## 기술적 구현

### 🚀 Next.js 15 최신 기술 스택
- **App Router**: 최신 라우팅 시스템 활용
- **React 19**: 최신 React 기능 및 성능 최적화
- **TypeScript**: 타입 안전성과 개발자 경험 향상
- **Static Site Generation (SSG)**: 빌드 타임 사전 렌더링으로 성능 최적화

### 📁 마크다운 기반 CMS 시스템
- **파일 기반 콘텐츠 관리**: 데이터베이스 없이 마크다운 파일로 콘텐츠 관리
- **Frontmatter 메타데이터**: YAML 형태의 구조화된 데이터 관리
- **동적 라우팅**: 파일 시스템 기반 자동 페이지 생성
- **카테고리 자동 분류**: 폴더 구조 기반 자동 카테고리 생성

### 🎯 컴포넌트 아키텍처
- **역할별 컴포넌트 분리**: 유지보수성과 재사용성 극대화
- **Props 인터페이스**: TypeScript 기반 컴포넌트 타입 정의
- **컴포지션 패턴**: 유연한 컴포넌트 조합 구조

### 🎨 Tailwind CSS 스타일링
- **유틸리티 우선 접근법**: 빠른 개발과 일관된 디자인
- **커스텀 디자인 토큰**: 프로젝트 고유의 디자인 시스템
- **반응형 그리드**: 다양한 화면 크기 대응

## 콘텐츠 관리 시스템

### 📋 블로그 포스트 관리
```markdown
---
title: "포스트 제목"
date: "2025-01-22"
excerpt: "포스트 요약"
tags: ["React", "Next.js", "TypeScript"]
thumbnail: "/images/post-thumbnail.png"
---

# 마크다운 콘텐츠
```

### 🗂️ 프로젝트 데이터 관리
```markdown
---
title: "프로젝트명"
period: "2025.01 ~ 현재"
description: "프로젝트 설명"
tech: ["기술스택"]
type: "프로젝트 유형"
---

# 상세 프로젝트 설명
```

### 🏷️ 자동화된 기능들
- **카테고리 생성**: 폴더 구조 기반 자동 카테고리 분류
- **태그 시스템**: 포스트별 태그 자동 수집 및 필터링
- **검색 기능**: 제목, 내용, 태그 기반 실시간 검색
- **정렬 및 페이지네이션**: 날짜순, 카테고리별 자동 정렬

## 배포 및 인프라

### 🚀 GitHub Pages 최적화
- **정적 사이트 생성**: `output: 'export'` 설정으로 완전한 정적 파일 생성
- **이미지 최적화**: `unoptimized: true` 설정으로 GitHub Pages 호환성 확보
- **경로 설정**: `trailingSlash: true`로 URL 호환성 보장

### ⚙️ GitHub Actions CI/CD
```yaml
# 자동 배포 파이프라인
- 코드 푸시 감지
- Node.js 환경 설정
- 의존성 설치 (npm ci)
- 프로덕션 빌드
- GitHub Pages 배포
```

### 🌿 브랜치 전략
- **`main` 브랜치**: 사이트 기능 및 코드 관리
- **`posts` 브랜치**: 블로그 콘텐츠 전용 관리
- **양방향 배포**: 두 브랜치 모두 자동 배포 지원

## 성능 최적화

### ⚡ 빌드 최적화
- **Turbopack**: Next.js 15의 고성능 번들러 활용
- **코드 스플리팅**: 페이지별 자동 코드 분할
- **이미지 최적화**: Next.js Image 컴포넌트 활용
- **CSS 최적화**: Tailwind CSS 빌드 타임 최적화

### 📊 성능 지표
- **Lighthouse 점수**: 95+ (Performance, Accessibility, SEO)
- **First Contentful Paint**: 1.5초 이내
- **Largest Contentful Paint**: 2.5초 이내
- **Cumulative Layout Shift**: 0.1 이하

### 🔍 SEO 최적화
- **메타데이터 관리**: 페이지별 동적 SEO 메타데이터
- **오픈 그래프**: 소셜 미디어 공유 최적화
- **구조화된 데이터**: JSON-LD 형태의 스키마 마크업
- **사이트맵**: 자동 생성되는 XML 사이트맵

## 개발 경험 개선

### 🛠️ 개발 도구
- **TypeScript**: 엄격한 타입 체크로 런타임 오류 방지
- **ESLint**: 코드 품질 및 일관성 유지
- **Prettier**: 자동 코드 포맷팅
- **Git Hooks**: 커밋 전 코드 검증

### 📖 문서화
- **CLAUDE.md**: Claude Code를 위한 프로젝트 가이드
- **README.md**: 프로젝트 설정 및 사용법
- **컴포넌트 문서**: 각 컴포넌트별 사용법 및 Props 정의

### 🔧 유지보수성
- **모듈화된 구조**: 기능별 파일 분리
- **재사용 가능한 컴포넌트**: DRY 원칙 적용
- **일관된 네이밍**: 직관적인 파일 및 변수 명명

## 확장 계획

### 🚀 예정된 기능
- **댓글 시스템**: GitHub Discussions 기반 댓글
- **다국어 지원**: i18n을 통한 한영 지원
- **PWA 구현**: 오프라인 지원 및 앱 설치
- **Analytics**: 방문자 통계 및 분석

### 🎯 기술적 도전
- **Incremental Static Regeneration**: 콘텐츠 업데이트 최적화
- **Edge Computing**: Vercel Edge Functions 활용
- **성능 모니터링**: Real User Monitoring 구현

## 프로젝트 링크

🔗 **[포트폴리오 사이트 방문하기](https://jchyng.github.io)**  
📚 **[GitHub 저장소](https://github.com/jchyng/jchyng.github.io)**

---

이 프로젝트는 단순한 포트폴리오를 넘어 최신 웹 기술의 실험장이자 지속적인 학습의 결과물입니다. 새로운 기술을 적용하고 사용자 경험을 개선하며 계속해서 발전시켜 나가고 있습니다.