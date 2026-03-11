---
title: "청년 정책 알림이: 지역 특화 정책 알림 서비스"
category: "Cloud / DevOps"
thumbnail: "/images/youth-policy-architecture.png"
summary: "Azure PaaS 환경의 기술적 제약을 Docker 컨테이너화로 극복하고, Selenium 크롤러와 Firebase FCM을 연동하여 구축한 실시간 맞춤형 정책 알림 서비스입니다."
date: "2023-06-23"
period: "2023.06 (3일 해커톤)"
affiliation: "2023 해커그라운드 — Microsoft × 경북대학교 공동 주최"
tags: ["Azure", "Docker", "Selenium", "Firebase FCM", "Spring Boot", "Azure SQL"]
---

# 📢 청년 정책 알림이
### 대구·경북 지역 특화 정책 맞춤형 푸시 알림 서비스

대구·경북 지역 청년들이 자신에게 꼭 필요한 혜택 정보를 놓치지 않도록 **동적 크롤링**으로 데이터를 수집하고, **맞춤형 푸시 알림**으로 정보를 전달하는 백엔드 시스템입니다.

---

## 🏆 프로젝트 성과 & 개요

| 항목 | 내용 |
| :--- | :--- |
| **핵심 성과** | 🏅 **해커그라운드 본선 진출** |
| **나의 역할** | 백엔드 개발 리드 (크롤링 엔진 설계, Azure 인프라 구축, FCM 연동) |
| **팀 구성** | 4인 (BE 2, FE 2) |
| **개발 기간** | 2023.06 (72시간 해커톤) |

---

## 🏗️ 서비스 아키텍처

Azure 클라우드 생태계를 기반으로 **데이터 수집-저장-발송**의 전 과정을 자동화했습니다.

1.  **🔍 데이터 수집 (Data Collection)**
    *   `Selenium` + `Headless Chrome` 기반 크롤러 구축
    *   Docker 컨테이너를 활용해 **Azure App Service** 환경에서 안정적인 구동
2.  **💾 데이터 관리 (Storage)**
    *   **Azure SQL Database**를 사용하여 정책 정보 및 사용자 구독 상태 관리
3.  **🔔 알림 발송 (Push Service)**
    *   **Firebase FCM** 연동, 신규 데이터 감지 시 즉시 타겟 푸시 알림 발송
4.  **🚀 자동화 (CI/CD)**
    *   **GitHub Actions**를 통해 코드 변경 시 즉시 배포되는 무중단 파이프라인 구축

---

## 🛠️ 기술 스택

- **Backend:** Java 11, Spring Boot 2.7
- **Database:** Azure SQL Database
- **Crawling:** Selenium, ChromeDriver
- **DevOps:** Docker, Azure App Service, GitHub Actions
- **Notification:** Firebase Cloud Messaging (FCM)

---

## 💡 핵심 기술적 도전 및 해결

### 1️⃣ Azure PaaS 환경의 Selenium 구동 제약 해결
**문제점:** 해커톤 규정상 IaaS 사용이 금지되어 Azure App Service(PaaS)를 사용해야 했으나, 이 환경은 OS 레벨의 Chrome/Driver 설치가 불가능하여 Selenium이 작동하지 않았습니다.

**해결책:** **Docker를 통한 환경 패키징**
*   단순 소스 배포가 아닌, **Chrome 브라우저와 Driver가 사전 설치된 OS 환경 전체를 컨테이너화**했습니다.
*   Azure App Service가 Docker 컨테이너 배포를 지원한다는 점을 활용하여 PaaS의 제약을 우회했습니다.

```dockerfile
# Dockerfile의 핵심 구조: 런타임 환경에 브라우저 강제 주입
FROM openjdk:11-jdk-slim

# OS 패키지 매니저를 통한 Chrome 및 WebDriver 설치 자동화
RUN apt-get update && apt-get install -y google-chrome-stable \
    && CHROME_DRIVER_VERSION=$(curl -sS chromedriver.storage.googleapis.com/LATEST_RELEASE) \
    && wget -O /tmp/chromedriver.zip "https://chromedriver.storage.googleapis.com/${CHROME_DRIVER_VERSION}/chromedriver_linux64.zip" \
    && unzip /tmp/chromedriver.zip -d /usr/bin/
```

### 2️⃣ 실시간 정책 매칭 및 알림 발송 로직
*   **Hash 기반 중복 체크:** 크롤링 시 기존 데이터와의 Hash 비교를 통해 신규 정책만 정밀하게 필터링하여 불필요한 알림 발송을 방지했습니다.
*   **비동기 알림 처리:** 정책 수집과 알림 발송 로직을 분리하여 시스템 부하를 최소화했습니다.

---

## 📝 회고: "제약 조건은 또 다른 기회"

3일이라는 짧은 시간 동안 **Azure PaaS 환경에서의 Selenium 구동**이라는 높은 기술적 벽을 만났습니다. 하지만 단순히 "안 된다"고 포기하는 대신, **클라우드 서비스의 작동 원리(PaaS vs Docker Support)**를 깊이 파고들어 해결책을 찾아냈습니다. 

이 과정을 통해 인프라 제약 속에서도 최적의 아키텍처를 설계하는 안목을 기를 수 있었으며, 본선 진출이라는 값진 결과를 얻을 수 있었습니다. 단순한 기능 구현을 넘어, **주어진 환경 내에서 기술적 돌파구를 찾아내는 개발자**로 한 단계 성장한 프로젝트였습니다.
