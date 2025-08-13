---
title: "Vite 설치 시 Rollup 의존성 문제 해결기"
date: "2025-08-12"
excerpt: "Vite 설치 과정에서 발생한 Rollup 의존성 오류를 pnpm으로 해결한 과정을 기록합니다."
tags: ["Vite", "Rollup", "pnpm"]
thumbnail: "/images/vite-rollup-error.png"
---

## 문제

Vite를 사용해서 프로젝트를 생성하고 프로젝트를 실행하자마자 `Cannot find module '@rollup/rollup-win32-x64-msvc'` 에러가 발생하여 프로젝트를 실행할 수 없는 문제가 발생했다.

## 분석

Vite는 개발 서버와 빌드 도구를 결합한 개발 환경으로 빌드 번들러로 Rollup을 사용하고 있다.
개발 서버에서 실행하는 경우(npm run dev) 번들러 없이 빠르게 실행해볼 수 있는데, 왜 Rollup Module이 필요한 지 의문이었고, GPT에게 질문한 결과 Vite 개발 서버는 Rollup 코어 라이브러리를 내부적으로 사용한다고 한다.

## 해결 과정

문제를 해결하기 위해 에러를 구글링한 결과 `@rollup/rollup-win32-x64-msvc`를 직접 설치하라는 글이 많았고, 직접 설치를 해도 해결이 되지 않았다.
Vite의 버전을 바꾸거나 node의 버전을 바꾸는 것으로도 해결이 되지 않았고, 결국 의존성 설치 과정에서 문제가 발생한 것이니 더 안전한 패키지 도구를 사용해보기로 했다.
`pnpm`을 사용했을 때 문제가 해결이 되었고, `yarn`을 사용했을 때는 해결이 되지 않았다.
