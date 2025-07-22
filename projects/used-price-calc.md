---
title: "중고가격 계산기 (Used Price Calculator)"
period: "2024.03 ~ 2024.06"
description: "AI를 활용한 정확한 중고 제품 가격 예측 서비스. Perplexity AI 기반 실시간 시장 분석 및 가격 범위 제공"
link: "https://used-price-calculator.pages.dev"
tech: ["HTML5/CSS3", "JavaScript ES6+", "Cloudflare Workers", "Cloudflare Pages", "Perplexity AI", "Google Analytics", "Google AdSense"]
team: "개인 프로젝트"
image: "/images/portfolio/used-price-calc/thumbnail.png"
type: "personal"
---

# 중고가격 계산기 (Used Price Calculator)

AI를 활용한 정확한 중고 제품 가격 예측 서비스

## 📝 프로젝트 개요

중고가격 계산기는 AI 기술을 활용하여 중고 제품의 적정 가격을 예측하는 웹 애플리케이션입니다. 사용자가 제품 정보를 입력하면, Perplexity AI를 통해 최신 중고 거래 데이터를 분석하여 정확한 시세 정보를 제공합니다.

## ✨ 주요 기능

- **AI 기반 가격 예측**: Perplexity AI를 활용한 정확한 중고가 산정
- **실시간 시장 분석**: 최근 1-3개월 거래 데이터 기반 분석
- **가격 범위 제공**: 최저가, 적정가, 최고가 범위 표시
- **판매 전략 가이드**: 빠른 판매 vs 좋은 가격 판매 옵션 제공
- **반응형 디자인**: 모바일, 태블릿, 데스크톱 최적화
- **SEO 최적화**: 검색 엔진 친화적 구조 및 FAQ 스키마

## 🛠 기술 스택

### Frontend
- **HTML5/CSS3**: 시맨틱 웹 구조 및 현대적 스타일링
- **JavaScript (ES6+)**: 순수 자바스크립트로 구현
- **Google Fonts**: 한국어 친화적 폰트 (Gaegu)

### Backend
- **Cloudflare Workers**: 서버리스 엣지 컴퓨팅
- **Cloudflare Pages**: 정적 사이트 호스팅

### AI & API
- **Perplexity AI**: 실시간 중고 시장 데이터 분석
- **Sonar Model**: 최신 웹 검색 기반 AI 모델

### Analytics & Monetization
- **Google Analytics 4**: 사용자 행동 분석
- **Google AdSense**: 광고 수익화
- **Kakao AdFit**: 한국 맞춤형 광고

## 📁 프로젝트 구조

```
usedPriceCalculator/
├── public/                 # 정적 웹 파일
│   ├── index.html         # 메인 페이지 (입력 폼)
│   ├── result.html        # 결과 페이지
│   ├── style.css          # 스타일시트
│   ├── script.js          # 메인 페이지 스크립트
│   ├── result.js          # 결과 페이지 스크립트
│   └── favicon.ico        # 파비콘
├── functions/             # Cloudflare Functions
│   └── api/
│       └── v1/
│           └── used-price.js  # AI 가격 분석 API
├── package.json           # 프로젝트 설정
├── wrangler.toml         # Cloudflare Workers 설정
└── README.md             # 프로젝트 문서
```

## 🔧 설치 및 실행

### 필요 조건
- Node.js 18+
- Cloudflare 계정
- Perplexity AI API 키

### 로컬 개발 환경 설정

1. 저장소 클론
```bash
git clone https://github.com/your-username/usedPriceCalculator.git
cd usedPriceCalculator
```

2. 의존성 설치
```bash
npm install
```

3. 환경변수 설정
```bash
# Cloudflare Workers 환경변수에 추가
wrangler secret put PERPLEXITY_API_KEY
```

4. 로컬 개발 서버 실행
```bash
npm start
# 또는
wrangler pages dev
```

### 배포

```bash
# Cloudflare Pages에 배포
wrangler pages deploy public
```

## 🎯 핵심 기능 상세

### 1. AI 가격 분석 시스템
- **Perplexity Sonar 모델** 활용으로 실시간 웹 검색 기반 분석
- **최근 1-3개월 거래 데이터** 기반 정확한 시세 예측
- **JSON 구조화된 응답**으로 일관된 데이터 처리

### 2. 사용자 경험 최적화
- **직관적인 입력 폼**: 제품명, 브랜드, 사용기간, 상태 등 단순화된 입력
- **시각적 가격 표시**: 게이지형 가격 범위 표시
- **판매 전략 가이드**: 상황별 맞춤 가격 제안

### 3. 반응형 웹 디자인
- **모바일 퍼스트**: 모바일 환경 우선 최적화
- **크로스 브라우저 지원**: 모든 주요 브라우저 호환
- **접근성 고려**: 시맨틱 HTML 및 ARIA 레이블 적용

## 📊 성능 및 최적화

### Frontend 최적화
- **CSS 최적화**: 효율적인 스타일 구조 및 미디어 쿼리
- **JavaScript 최적화**: 모듈화된 코드 구조
- **이미지 최적화**: 적절한 포맷 및 압축

### Backend 최적화
- **엣지 컴퓨팅**: Cloudflare Workers를 통한 글로벌 분산 처리
- **API 최적화**: 효율적인 에러 핸들링 및 응답 구조
- **캐싱 전략**: CDN을 통한 정적 자원 캐싱

## 🔒 보안 및 안정성

- **API 키 보안**: Cloudflare Workers 환경변수를 통한 안전한 키 관리
- **입력 검증**: 클라이언트 및 서버 측 이중 데이터 검증
- **에러 핸들링**: 포괄적인 예외 처리 및 사용자 친화적 오류 메시지

## 🎨 디자인 시스템

### 컬러 팔레트
- **Primary**: 모던하고 신뢰감 있는 블루 계열
- **Secondary**: 부드러운 그레이 계열
- **Accent**: 포인트 컬러로 활용되는 그린 계열

### 타이포그래피
- **한글 폰트**: Gaegu (Google Fonts)
- **가독성 최적화**: 적절한 행간 및 자간 설정

## 📈 향후 개발 계획

- [ ] 사용자 계정 시스템 도입
- [ ] 가격 히스토리 추적 기능
- [ ] 더 많은 제품 카테고리 지원
- [ ] 모바일 앱 개발
- [ ] 다국어 지원