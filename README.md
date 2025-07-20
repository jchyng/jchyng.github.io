# 블로그 게시글 작성 방법

## 1. 파일 위치
블로그 게시글은 `posts/` 폴더에 다음과 같은 구조로 작성합니다:

```
posts/
├── 카테고리명/
│   ├── 2025-07/
│   │   ├── 15-게시글제목.md
│   │   └── 14-다른게시글.md
│   └── 2025-06/
│       └── 30-월말회고.md
└── 다른카테고리/
    └── 2025-07/
        └── 10-새로운글.md
```

## 2. 파일명 규칙
- **형식**: `날짜-제목.md`
- **임시 삭제**: `날짜-제목(삭제).md`
- **예시**: `15-nextjs-블로그-만들기.md`
- **날짜**: 일(日) 단위 (01-31)
- **제목**: 한글, 영문, 숫자, 하이픈(-) 사용 가능

## 3. Frontmatter 형식
각 마크다운 파일의 상단에 다음과 같은 메타데이터를 작성합니다:

```markdown
---
title: "게시글의 제목"
date: "2025-07-15"
category: "카테고리명"
excerpt: "게시글 요약 (블로그 목록에 표시될 내용)"
tags: ["태그1", "태그2", "태그3"]
thumbnail: "/images/post-thumbnail.png"
---

# 실제 게시글 내용

여기서부터 마크다운으로 내용을 작성합니다...
```

## 4. 필수 필드
- `title`: 게시글 제목 (필수)
- `date`: 작성일 (YYYY-MM-DD 형식, 필수)  
- `category`: 카테고리명 (필수)
- `excerpt`: 게시글 요약 (필수)
- `tags`: 태그 배열 (선택)
- `thumbnail`: 썸네일 이미지 경로 (선택)

## 5. 작성 예시

```markdown
---
title: "React Hook 완벽 가이드"
date: "2025-07-15"
category: "기술정리"
excerpt: "React Hook의 올바른 사용법과 주의사항을 정리했습니다. useState, useEffect, useCallback 등을 다룹니다."
tags: ["React", "Hook", "Frontend"]
thumbnail: "/images/react-hooks-guide.png"
---

# React Hook 완벽 가이드

## useState 사용법

React의 가장 기본적인 Hook인 useState에 대해 알아보겠습니다.

const [count, setCount] = useState(0);

## useEffect 패턴

의존성 배열 관리가 중요합니다...
```

## 6. 자동 기능
- **카테고리 자동 생성**: 폴더명이 카테고리가 됩니다
- **정렬**: 날짜순 내림차순으로 자동 정렬  
- **URL 생성**: 슬러그 기반 URL 자동 생성
- **태그 표시**: 게시글 목록과 상세 페이지에 태그 표시


<br><br>  

# 디자인 시스템
- Inter & JetBrains Mono 폰트
- 일관된 색상 시스템 및 디자인 토큰
- 글래스모피즘 헤더
- 부드러운 애니메이션 및 마이크로 인터랙션
- 완벽한 반응형 디자인