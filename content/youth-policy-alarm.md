---
title: "청년 정책 알림이: 지역 특화 정책 알림 서비스"
category: "Cloud / DevOps"
thumbnail: "TODO_IMAGE"
summary: "Azure PaaS 환경에서 Selenium 크롤러를 운영하기 위해 Docker 컨테이너화로 OS 제약을 우회하고, Firebase FCM으로 맞춤형 청년 정책 푸시 알림을 구현한 3일 해커톤 프로젝트입니다."
date: "2023-06-23"
period: "2023.06 (3일 해커톤)"
affiliation: "2023 해커그라운드 — Microsoft × 경북대학교 공동 주최"
---

<!-- TODO: 대표 썸네일 이미지 추가 (예: /images/youth-policy-alarm-main.png) -->

# 청년 정책 알림이 — 지역 특화 정책 알림 서비스

대구·경북 지역 청년이 놓치기 쉬운 혜택 정보를 자동으로 수집하고, 사용자의 구독 카테고리에 맞춰 **맞춤형 푸시 알림을 실시간으로 발송**하는 백엔드 서버 개발 프로젝트입니다.

3일이라는 극도로 제한된 시간 안에, 해커톤 필수 조건인 **Azure PaaS 환경에서 Selenium을 구동해야 한다는 기술적 제약**을 해결하는 것이 핵심 과제였습니다.

---

## 개요

| 항목        | 내용                                                          |
| ----------- | ------------------------------------------------------------- |
| **역할**    | 백엔드 개발 (크롤링 기능, Azure 배포, Firebase FCM 연동 주도) |
| **팀 구성** | 4인 (프론트엔드 2명 + 백엔드 2명)                             |
| **기간**    | 2023.06 (3일 해커톤)                                          |
| **성과**    | 본선 진출                                                     |
| **주최**    | Microsoft & 경북대학교 — 2023 해커그라운드                    |

---

## 기술 스택

| 분류            | 기술                             |
| --------------- | -------------------------------- |
| 언어/프레임워크 | Java 11, Spring Boot 2.7         |
| 데이터베이스    | MS-SQL                           |
| 크롤링          | Selenium                         |
| 알림            | Firebase FCM (Push Notification) |
| 클라우드/배포   | Azure App Service (PaaS), Docker |

---

## 주요 기능

1. **청년 정책 크롤링** — Selenium으로 대구·경북 청년 정책 사이트의 동적 콘텐츠를 주기적으로 수집
2. **맞춤형 푸시 알림** — Firebase FCM을 통해 사용자 구독 카테고리별 신규 정책을 실시간 발송
3. **PaaS 환경 제약 우회** — Docker 이미지 기반 배포로 Azure App Service의 OS 제약 극복

---

## 구현 내용

### 1. Azure PaaS 환경 제약 — Docker 컨테이너화로 해결

해커톤 규정은 **IaaS를 제외한 Azure PaaS/SaaS 서비스만 허용**했습니다. Selenium은 Chrome/ChromeDriver를 OS에 직접 설치해야 작동하지만, PaaS 환경인 Azure App Service는 OS 레벨 제어를 허용하지 않습니다.

**문제 흐름**

```
Azure App Service (PaaS)
  └─ OS 제어 불가
       └─ ChromeDriver 설치 불가
            └─ Selenium 실행 불가
```

**해결 전략**: PaaS이지만 **Docker 컨테이너 배포는 허용**한다는 점에 착안.
ChromeDriver가 설치된 OS 환경 자체를 Docker 이미지에 패키징하여, App Service가 컨테이너를 통째로 실행하게 구성했습니다.

```dockerfile
# Selenium + Spring Boot를 하나의 이미지로 패키징
FROM openjdk:11-jdk-slim

# ChromeDriver 및 Headless Chrome 설치
RUN apt-get update && apt-get install -y wget unzip gnupg \
    && wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list \
    && apt-get update && apt-get install -y google-chrome-stable \
    && CHROME_DRIVER_VERSION=$(curl -sS chromedriver.storage.googleapis.com/LATEST_RELEASE) \
    && wget -O /tmp/chromedriver.zip "https://chromedriver.storage.googleapis.com/${CHROME_DRIVER_VERSION}/chromedriver_linux64.zip" \
    && unzip /tmp/chromedriver.zip -d /usr/bin/ && rm /tmp/chromedriver.zip

# Spring Boot 애플리케이션 추가 및 실행
ADD build/libs/app.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
```

> **핵심 인사이트**: IaaS와 PaaS의 경계를 정확히 이해하면, 제약을 제약으로 받아들이지 않고 **규칙 안에서의 우회로**를 찾을 수 있다는 것을 배웠습니다.

### 2. Firebase FCM을 활용한 맞춤형 푸시 알림

크롤링 서버가 새로운 정책을 감지하면, 해당 카테고리를 구독한 사용자에게만 FCM 푸시 알림을 발송하도록 구현했습니다.

- 구독 정보는 DB에 저장, 신규 데이터 감지 시 FCM 서버로 메시지 전송
- 디바이스 토큰 기반의 개인화 발송으로 불필요한 알림 최소화

<!-- TODO: 앱 실행 화면 또는 알림 수신 스크린샷 추가 -->

---

## 회고

**3일**이라는 극한의 제약과 **PaaS 기술적 한계**를 동시에 돌파한 경험입니다. 에러 메시지 하나 없이 막막했던 상황에서 문서를 정독하고 IaaS·PaaS 차이를 정확히 파악한 뒤 Docker 컨테이너화라는 돌파구를 찾아낸 과정은, 단순한 기능 구현을 넘어 **아키텍처 제약 자체를 분석하고 해결하는 능력**을 길러줬습니다. 새로운 기술 환경에서도 원리를 기반으로 답을 찾아낼 수 있다는 자신감을 얻은 프로젝트입니다.
