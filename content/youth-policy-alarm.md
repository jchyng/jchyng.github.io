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

# 청년 정책 알림이
### 대구·경북 지역 특화 정책 맞춤형 푸시 알림 서비스

대구·경북 지역 청년들이 자신에게 꼭 필요한 혜택 정보를 놓치지 않도록 **동적 크롤링**으로 데이터를 수집하고, **맞춤형 푸시 알림**으로 정보를 전달하는 백엔드 시스템입니다.

---

## 🏆 핵심 성과

| 항목 | 내용 |
| :--- | :--- |
| **성과** | 🏅 **해커그라운드 본선 진출** |
| **역할** | 백엔드 개발 리드 (크롤링 엔진 설계, Azure 인프라 구축, FCM 연동) |
| **팀 구성** | 4인 (BE 2, FE 2) |
| **개발 기간** | 2023.06 (72시간 해커톤) |

---

## 🏗️ 서비스 아키텍처

Azure 클라우드 생태계를 기반으로 **데이터 수집-저장-발송**의 전 과정을 자동화했습니다.

1. **데이터 수집** — `Selenium` + `Headless Chrome` 기반 크롤러, Docker 컨테이너로 Azure App Service에서 안정적으로 구동
2. **데이터 관리** — **Azure SQL Database**로 정책 정보 및 사용자 구독 상태 관리
3. **알림 발송** — **Firebase FCM** 연동, 신규 데이터 감지 시 즉시 타겟 푸시 발송
4. **자동화** — **GitHub Actions**로 코드 변경 시 즉시 배포되는 파이프라인 구축

---

## 🛠️ Deep Dive. PaaS 제약을 Docker로 돌파하다

**문제**: 해커톤 규정상 IaaS 사용이 금지되어 Azure App Service(PaaS)를 써야 했습니다. 그런데 PaaS 환경은 OS 레벨의 Chrome/Driver 설치가 불가능하여 Selenium이 작동하지 않았습니다.

"안 된다"고 포기하는 대신, **Azure App Service가 Docker 컨테이너 배포를 지원한다**는 점에 주목했습니다. 소스만 배포하는 것이 아니라, **Chrome 브라우저와 Driver가 사전 설치된 OS 환경 전체를 컨테이너화**하여 PaaS의 제약을 우회했습니다.

```dockerfile
# Dockerfile의 핵심 구조: 런타임 환경에 브라우저 강제 주입
FROM openjdk:11-jdk-slim

# OS 패키지 매니저를 통한 Chrome 및 WebDriver 설치 자동화
RUN apt-get update && apt-get install -y google-chrome-stable \
    && CHROME_DRIVER_VERSION=$(curl -sS chromedriver.storage.googleapis.com/LATEST_RELEASE) \
    && wget -O /tmp/chromedriver.zip \
       "https://chromedriver.storage.googleapis.com/${CHROME_DRIVER_VERSION}/chromedriver_linux64.zip" \
    && unzip /tmp/chromedriver.zip -d /usr/bin/
```

**Hash 기반 중복 체크**: 크롤링 시 기존 데이터와 Hash 비교로 신규 정책만 정밀 필터링하여 불필요한 알림 발송을 방지했습니다.

> "규정상 IaaS는 안 된다"는 제약을 마주했을 때, **클라우드 서비스의 작동 원리(PaaS의 Docker 지원)** 를 파고들어 돌파구를 찾아낸 경험이었습니다. 제약 조건이 오히려 더 깊이 탐구하게 만드는 동력이 됐습니다.

---

## 📝 회고

72시간이라는 극한의 시간 제약 속에서 기술적 벽을 만났지만, 포기 대신 **서비스의 작동 원리를 더 깊이 파고드는 선택**을 했습니다. 인프라 제약 속에서 최적의 우회로를 찾아내는 이 경험은, 이후 실무에서 온프레미스 VM 세션 문제를 tcpdump로 해결하는 사고방식의 출발점이 됐습니다.
