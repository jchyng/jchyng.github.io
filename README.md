# 포트폴리오 갤러리 — jchyng.github.io

**v2.0** 기준의 개인 포트폴리오 사이트입니다.
Next.js 15 + Tailwind CSS 4 기반의 정적 사이트로 GitHub Pages에 자동 배포됩니다.

---

## 개발 명령어

```bash
# 개발 서버 실행 (Turbopack)
npm run dev

# 프로덕션 빌드 (/out/ 폴더에 정적 파일 생성)
npm run build

# 린트 검사
npm run lint

# 로컬 프로덕션 서버 실행
npm start
```

---

## 프로젝트 구조

```
jchyng.github.io/
├── content/              # 프로젝트 마크다운 파일들
│   ├── my-project.md
│   └── ...
├── public/               # 정적 에셋 (이미지 등)
│   └── images/
├── src/
│   ├── app/
│   │   ├── page.tsx          # 홈 (Orb 배경 + 소개)
│   │   ├── gallery/          # 갤러리 페이지
│   │   └── projects/[slug]/  # 프로젝트 상세 페이지
│   ├── components/           # 재사용 컴포넌트
│   │   ├── IntroOverlay.tsx
│   │   ├── LightRays.tsx
│   │   └── ui/
│   └── lib/
│       ├── markdown.ts   # content/ 파싱 유틸
│       └── utils.ts
└── out/                  # 빌드 결과물 (자동 생성)
```

---

## 프로젝트 추가 방법

### 1. 마크다운 파일 생성

`content/` 폴더에 영문 kebab-case 파일명으로 생성합니다:

```
content/
├── my-awesome-project.md   ✅
├── used-price-calc.md      ✅
└── 내-프로젝트.md          ❌ (한글 파일명 금지)
```

### 2. Frontmatter 형식

```markdown
---
title: "프로젝트 제목"
category: "Web Development"
thumbnail: "/images/my-project.png"
summary: "갤러리에 표시되는 짧은 요약 (1~2문장)"
date: "2026-02-28"
period: "2026.01 - 2026.02"
affiliation: "개인 프로젝트"
---

# 프로젝트 제목

상세 내용을 마크다운으로 작성합니다...
```

### 3. Frontmatter 필드

| 필드 | 필수 | 설명 |
|------|------|------|
| `title` | ✅ | 프로젝트 제목 |
| `category` | ✅ | 카테고리 (예: `Web Development`, `Mobile`) |
| `summary` | ✅ | 갤러리 카드에 표시되는 요약 |
| `date` | ✅ | 날짜 (`YYYY-MM-DD`, 정렬 기준) |
| `thumbnail` | 선택 | 썸네일 이미지 경로 또는 외부 URL |
| `period` | 선택 | 작업 기간 (예: `2025.12 - 2026.01`) |
| `affiliation` | 선택 | 소속/유형 (예: `개인 프로젝트`, `팀 프로젝트`) |

### 4. 이미지 관리

- `public/images/` 폴더에 이미지 저장
- 마크다운에서 `/images/filename.png` 로 참조
- 외부 URL도 사용 가능

---

## 자동화 기능

- **정렬**: `date` 기준 최신순 자동 정렬
- **URL**: `/projects/파일명` 형태로 자동 생성
- **갤러리 카드**: 썸네일 미설정 시 기본 이미지 자동 적용
- **배포**: `main` 브랜치 푸시 시 GitHub Actions가 자동 빌드 및 배포

---

## 기술 스택

| 분류 | 기술 |
|------|------|
| 프레임워크 | Next.js 15.4 (App Router, Static Export) |
| UI | React 19, Tailwind CSS 4 |
| 애니메이션 | Framer Motion, WebGL(OGL) |
| 콘텐츠 | gray-matter, react-markdown |
| 배포 | GitHub Actions → GitHub Pages |

---

## 배포 구조

- **트리거**: `main` 브랜치 푸시
- **과정**: `npm ci` → `npm run build` → `/out/` 배포
- **설정**: `.github/workflows/deploy.yml`

---

## 주의사항

- **파일명은 반드시 영문**: 한글 경로는 GitHub Pages에서 404 오류 발생
- **날짜 형식 준수**: `YYYY-MM-DD` (예: `2026-02-28`)
- **빌드 확인**: 배포 전 `npm run build`로 정적 내보내기 검증 권장
