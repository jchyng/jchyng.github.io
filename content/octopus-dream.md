---
title: "문어의 꿈: 자기관리 기반 캐릭터 육성 게임"
category: "Backend / MSA"
thumbnail: "TODO_IMAGE"
summary: "MSA 기반의 게임 백엔드 시스템 구축 프로젝트. Spring Security + JWT와 Redis를 활용한 보안 인증 체계, GitHub Actions CI/CD, JMeter 부하 테스트를 통해 동시 사용자 1,000명 환경에서 평균 1.5초 이내 응답 속도를 검증했습니다."
date: "2023-06-30"
period: "2023.03 - 2023.06 (4개월)"
affiliation: "경북대학교 캡스톤 디자인 (팀 프로젝트 5인)"
tags: ["Spring Boot", "MSA", "JWT", "Redis", "GitHub Actions", "JMeter"]
---

<!-- TODO: 대표 썸네일 이미지 추가 (예: /images/octopus-dream-main.png) -->

# 문어의 꿈 — 자기관리 기반 캐릭터 육성 게임

사용자의 수면, 운동, 일기 등 자기관리 활동을 기반으로 문어 캐릭터를 성장시키는 **다마고치형 모바일 앱**의 백엔드 시스템 구축 프로젝트입니다.

팀 내 유일한 백엔드 개발자로서, 개발 초기부터 **확장성**과 **보안**을 최우선에 두고 MSA 아키텍처를 설계·구현했습니다.

---

## 개요

| 항목        | 내용                                                            |
| ----------- | --------------------------------------------------------------- |
| **역할**    | 백엔드 개발 단독 담당 (MSA 설계, 인증/인가, CI/CD, 성능 테스트) |
| **팀 구성** | 5인 (프론트엔드 4명 + 백엔드 1명)                               |
| **기간**    | 2023.03 – 2023.06 (4개월)                                       |
| **성과**    | 교내 논문 경진대회 은상 수상                                    |

---

## 기술 스택

| 분류            | 기술                                                    |
| --------------- | ------------------------------------------------------- |
| 언어/프레임워크 | Java 17, Spring Boot 2.7, Spring Cloud (Netflix Eureka) |
| 인증/보안       | Spring Security 6, JWT, Redis (토큰 블랙리스트)         |
| 인프라          | AWS EC2·RDS·S3                                          |
| 자동화/테스트   | GitHub Actions (CI/CD), JMeter (부하 테스트)            |
| 문서화          | Spring REST Docs + Swagger UI 통합                      |

---

## 주요 기능

1. **MSA 기반 서비스 분리** — 활동 서비스, 주문/결제 서비스, 유저 서비스를 독립 배포 단위로 분리하여 확장성 확보
2. **JWT + Redis RTR 인증 체계** — Access Token 단기 발급 + 리프레시 토큰 로테이션(RTR)으로 보안성과 UX를 동시에 충족
3. **API Gateway 보안 집중화** — XSS/CSRF 방어 및 JWT 검증을 Gateway에서 선처리하여 마이크로 서비스 부하 경감
4. **통합 API 문서 자동화** — REST Docs 테스트와 Swagger UI를 연동, 항상 최신 상태의 API 명세 자동 생성

---

## 구현 내용

### 1. MSA 환경의 인증 문제 해결 — JWT + Redis RTR

모놀리식 서버에서 흔히 쓰는 세션 클러스터링은 MSA 환경에서 **서비스 간 메모리 공유 오버헤드**를 발생시킵니다. 이를 해결하기 위해 무상태(Stateless) JWT 방식을 채택했고, 토큰 탈취 위험에는 **리프레시 토큰 로테이션(RTR)** 전략으로 대응했습니다.

- **Access Token**: 만료 기간을 짧게 설정 → 탈취 시 피해 최소화
- **Refresh Token**: Redis에 저장 → 재로그인 없이 Access Token 자동 재발급
- **블랙리스트 처리**: 강제 갱신 또는 이상 감지 시 Redis에 토큰 등록 → 즉시 무효화

```java
// API Gateway의 인증 필터 (개념 코드)
@Component
public class AuthorizationFilter extends AbstractGatewayFilterFactory<Config> {

    @Override
    public GatewayFilter apply(Config config) {
        return (exchange, chain) -> {
            String token = extractToken(exchange.getRequest());

            // 1. JWT 서명·만료 검증
            // 2. Redis 블랙리스트 조회
            // 3. 검증 통과 시 User ID·권한을 헤더에 담아 마이크로 서비스로 라우팅
            // 4. 실패 시 401/403 Custom Error Response 반환

            return chain.filter(exchange);
        };
    }
}
```

### 2. Spring Security 공식 문서 기반 학습으로 코드 품질 향상

Spring Security 6의 변경된 API와 부족한 한국어 자료로 인해 초반에 트러블슈팅이 어려웠습니다.

- **해결**: 블로그 자료 대신 **Spring Security 공식 문서를 전독**하여 Filter Chain 동작 원리를 완전히 이해
- **결과**: 인증/인가 로직의 응집도를 높이고 코드 중복을 제거. 추상화된 기술도 원리를 이해하면 더 효율적으로 활용할 수 있다는 것을 체득

### 3. CI/CD 자동화 및 JMeter 부하 테스트 검증

수동 배포의 비효율을 제거하기 위해 **GitHub Actions CI/CD 파이프라인**을 구축했습니다. 코드 Push/Merge 시 자동 빌드 → 테스트 → 배포가 이루어지도록 구성했습니다.

안정성 검증을 위해 JMeter로 **AWS t2.small 인스턴스에서 1,000명 동시 접속 시나리오**를 실행한 결과, 평균 응답 속도 **1.5초 이내**를 정량적으로 확인했습니다.

<!-- TODO: JMeter 부하 테스트 결과 스크린샷 추가 -->

### 4. REST Docs + Swagger UI 통합으로 협업 효율화

프론트엔드 4명이 참고할 API 명세서를 수동으로 관리하면 코드와 문서 간 불일치가 발생합니다. 이를 방지하기 위해 **REST Docs 테스트 통과 시 Swagger 문서가 자동 생성**되도록 연동했습니다.

- 문서와 코드가 항상 동기화됨 → 프론트엔드와의 소통 비용 대폭 감소
- 빌드 실패 시 문서도 갱신 불가 → 잘못된 API 명세 배포 방지

---

## 회고

MSA, CI/CD, 보안 인증 등 백엔드 핵심 기술 전반을 혼자 설계하고 구현한 **기술적 몰입의 경험**이었습니다. 특히 Spring Security를 공식 문서로 깊이 이해한 뒤 코드를 개선한 과정은 **'왜?'라는 질문에서 출발하는 문제 해결 방식**의 중요성을 가르쳐 준 전환점이었습니다. 프론트엔드와의 협업 비용을 줄이기 위한 문서 자동화 도입 역시 개발 효율화와 팀 신뢰 향상에 직접 기여할 수 있었습니다.
