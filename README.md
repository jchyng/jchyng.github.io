# 블로그 게시글 작성 방법

## 📁 1. 폴더 구조 기반 카테고리 시스템

블로그 게시글은 `posts/` 폴더에 **카테고리/년월/파일명** 구조로 작성합니다:

```
posts/
├── react/
│   ├── 2025-07/
│   │   ├── react-hooks-pattern.md
│   │   └── state-management.md
│   └── 2025-06/
│       └── component-design.md
├── javascript/
│   └── 2025-07/
│       ├── async-await-guide.md
│       └── es6-features.md
└── backend/
    └── 2025-07/
        └── node-express-tutorial.md
```

## 📝 2. 명명 규칙 (중요!)

### 📂 카테고리 폴더명
- **⚠️ 카테고리 폴더명도 영문 권장** (GitHub Pages 호환성 및 SEO 최적화)
- **형식**: `lowercase` 또는 `kebab-case`
- **권장 예시**:
  ```
  posts/
  ├── react/           ✅ 추천
  ├── javascript/      ✅ 추천  
  ├── typescript/      ✅ 추천
  ├── backend/         ✅ 추천
  ├── frontend/        ✅ 추천
  ├── devops/          ✅ 추천
  ├── data-science/    ✅ 추천 (하이픈 사용)
  └── mobile-dev/      ✅ 추천
  ```
- **비추천 예시**:
  ```
  posts/
  ├── 리액트/          ❌ 한글 폴더명
  ├── 자바스크립트/     ❌ 한글 폴더명
  └── 백엔드/          ❌ 한글 폴더명
  ```

### 📄 파일명 규칙
- **⚠️ 파일명은 반드시 영문으로 작성** (GitHub Pages 호환성)
- **형식**: `descriptive-filename.md`
- **권장**: `kebab-case` 형태 (소문자, 하이픈 구분)
- **예시**: 
  - ✅ `react-hooks-pattern.md`
  - ✅ `async-await-guide.md`
  - ✅ `typescript-generics.md`
  - ❌ `리액트-훅스-패턴.md` (한글 파일명)

## 🏷️ 3. Frontmatter 형식 (간소화됨)

**카테고리는 폴더명으로 자동 생성**되므로 frontmatter에서 제거되었습니다:

```markdown
---
title: "React Hook 사용 패턴 정리"
date: "2025-07-15"
excerpt: "useState, useEffect, useCallback 등 자주 사용하는 Hook들의 올바른 사용법과 주의사항들을 정리해보았다."
tags: ["React", "Hook", "useState", "useEffect", "최적화"]
thumbnail: "/images/react-hooks.png"
---

# React Hook 사용 패턴 정리

실제 게시글 내용을 마크다운으로 작성합니다...
```

## ✅ 4. 필수/선택 필드

### 필수 필드
- `title`: 게시글 제목
- `date`: 작성일 (YYYY-MM-DD 형식)
- `excerpt`: 게시글 요약 (목록 페이지에 표시)

### 선택 필드  
- `tags`: 태그 배열 (검색 및 분류용)
- `thumbnail`: 썸네일 이미지 경로

### ❌ 제거된 필드
- `category`: 폴더명으로 자동 생성

## 🎯 5. 실제 작성 예시

**파일 위치**: `posts/react/2025-07/react-hooks-pattern.md`

```markdown
---
title: "React Hook 사용 패턴 정리"
date: "2025-07-15"
excerpt: "실무에서 자주 사용하는 React Hook 패턴들과 주의사항을 정리했습니다. 성능 최적화 팁도 포함되어 있습니다."
tags: ["React", "Hook", "Performance", "Pattern"]
---

# React Hook 사용 패턴 정리

## 1. useState 최적화 패턴

함수형 업데이트를 사용하여 성능을 개선할 수 있습니다:

\`\`\`javascript
const [count, setCount] = useState(0);

// ❌ 비추천
setCount(count + 1);

// ✅ 추천  
setCount(prev => prev + 1);
\`\`\`

## 2. useEffect 의존성 관리

...계속 작성
```

## 🔄 6. 자동화된 기능들

- **📂 카테고리 자동 생성**: 폴더명(`react`, `javascript` 등)이 자동으로 카테고리가 됩니다
- **📅 날짜순 정렬**: 최신 게시글이 상단에 자동 배치
- **🔗 URL 생성**: `/blog/react/2025-07/react-hooks-pattern` 형태로 자동 생성
- **🏷️ 태그 시스템**: 게시글 목록과 상세 페이지에 태그 자동 표시
- **🔍 검색 기능**: 제목과 태그 기반 실시간 검색
- **📱 반응형 디자인**: 모든 디바이스에서 최적화된 레이아웃

## 🚀 7. 새 게시글 작성 순서

1. **카테고리 폴더 확인/생성**: `posts/카테고리명/`
2. **년월 폴더 생성**: `posts/카테고리명/2025-07/`
3. **영문 파일명으로 생성**: `posts/카테고리명/2025-07/filename.md`
4. **Frontmatter 작성**: 제목, 날짜, 요약, 태그
5. **마크다운 내용 작성**
6. **빌드 및 배포**: `npm run build` → GitHub Pages

## ⚠️ 주의사항

- **폴더명 & 파일명은 영문 권장**: 한글 사용 시 GitHub Pages에서 404 오류 발생 가능
- **날짜 형식 준수**: `YYYY-MM-DD` 형식 (예: `2025-07-15`)
- **카테고리 일관성**: 기존 카테고리 폴더명과 일치시키기
- **URL 구조**: `/blog/카테고리/년월/파일명` 형태로 자동 생성되므로 모든 경로가 영문일 때 가장 안정적


<br><br>  

# 디자인 시스템
- Inter & JetBrains Mono 폰트
- 일관된 색상 시스템 및 디자인 토큰
- 글래스모피즘 헤더
- 부드러운 애니메이션 및 마이크로 인터랙션
- 완벽한 반응형 디자인