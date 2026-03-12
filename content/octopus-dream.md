---
title: "문어의 꿈: 자기관리 기반 캐릭터 육성 게임"
category: "Backend / MSA"
thumbnail: "/images/octopus-dream/thumbnail.png"
summary: "MSA 기반의 게임 백엔드 시스템 구축 프로젝트. Spring Cloud Gateway에서 보안 로직을 집중 처리하고 JWT 인증, PortOne 결제, REST Docs 기반 API 문서 통합으로 5명의 프론트엔드와 협업. JMeter 부하 테스트로 동시 요청 5,000건에서 오류율 0%를 검증하여 한국정보기술학회 논문경진대회 은상을 수상했습니다."
date: "2023-06-30"
period: "2023.03 - 2023.06 (4개월)"
affiliation: "경북대학교 캡스톤 디자인 (팀 프로젝트 5인)"
tags: ["Spring Boot", "MSA", "Spring Cloud Gateway", "JWT", "Kakao OAuth", "PortOne", "AWS", "GitHub Actions", "JMeter", "REST Docs"]
---

# 문어의 꿈 — 자기관리 기반 캐릭터 육성 게임

수면·러닝·일기 등 자기관리 활동으로 문어 캐릭터를 성장시키는 **다마고치형 모바일 앱**의 백엔드입니다. 팀 내 유일한 백엔드 개발자로서 아키텍처 설계부터 AWS 환경 구축·배포까지 전담했습니다.

![앱 메인 화면](/images/octopus-dream/app-main.png)

---

## 🏆 핵심 성과

- **MSA 전환**: Spring Cloud Gateway + Netflix Eureka로 3개 독립 서비스 분리, 확장성 확보
- **안정성 검증**: JMeter 동시 요청 5,000건 오류율 **0%**, 평균 응답 **1.5초 이내**
- **논문 은상**: 성능 데이터를 바탕으로 한국정보기술학회 대학생 논문경진대회 은상 수상
- **협업 효율화**: REST Docs 기반 통합 API 문서로 5명의 프론트엔드와 소통 비용 절감

---

## 🏗️ 시스템 아키텍처

![시스템 아키텍처](/images/octopus-dream/architecture.png)

Flutter 클라이언트 → Reverse Proxy → **Spring Cloud Gateway(port 8000)** → 각 마이크로서비스 순으로 요청이 흐릅니다. Gateway가 모든 보안 처리를 담당하고, **Netflix Eureka(port 8761)**를 통해 동적으로 서비스를 탐색합니다.

| 서비스 | 역할 |
| --- | --- |
| **User Service** | Kakao OAuth2 로그인, JWT 발급/갱신, 캐릭터 관리 |
| **Activity Service** | 수면·러닝·일기·방명록 기록 및 월별 캘린더 집계 |
| **Order Service** | PortOne API 연동 결제·환불 처리 |

---

## 🛠️ Deep Dive 1. 보안 로직, 왜 Gateway에 몰아넣었나

MSA로 전환하면서 곧바로 고민이 생겼습니다. **XSS 필터링, CSRF 검사, JWT 인증은 모든 서비스에 공통으로 필요한데, 마이크로서비스마다 중복 구현하는 것이 맞는가?**

아니라고 판단했습니다. 보안 로직이 분산되면 하나를 수정할 때 모든 서비스를 건드려야 하고, 실수 하나가 전체 보안 허점이 됩니다. 그래서 **Spring Cloud Gateway 한 곳에서 모든 인증을 처리하고, 검증된 `userId`만 각 서비스로 전달**하는 구조를 설계했습니다. Gateway를 제외한 서비스들은 Gateway의 IP만 허용하여 직접 접근을 원천 차단했습니다.

```java
// AuthorizationHeaderFilter.java — JWT 검증 후 userId를 쿼리 파라미터로 전달
@Override
public GatewayFilter apply(Config config) {
    return ((exchange, chain) -> {
        ServerHttpRequest request = exchange.getRequest();

        if (!request.getHeaders().containsKey(HttpHeaders.AUTHORIZATION)) {
            return onError(exchange, "no authorization in header", HttpStatus.UNAUTHORIZED);
        }

        String jwt = request.getHeaders()
                .get(HttpHeaders.AUTHORIZATION).get(0)
                .replace("Bearer ", "");

        String userId = isJwtValid(jwt); // 서명·만료 검증, 실패 시 null 반환

        if (userId == null) {
            return onError(exchange, "JWT token is not valid", HttpStatus.UNAUTHORIZED);
        }

        // 검증된 userId를 쿼리 파라미터에 추가하여 마이크로서비스로 라우팅
        URI newUri = UriComponentsBuilder.fromUri(exchange.getRequest().getURI())
                .queryParam("id", userId)
                .build(true).toUri();

        ServerHttpRequest newRequest = request.mutate().uri(newUri).build();
        return chain.filter(exchange.mutate().request(newRequest).build());
    });
}
```

**JWT 발급 흐름** — Kakao OAuth2 로그인 후 서버에서 자체 JWT(Access + Refresh)를 발급합니다. Refresh Token은 DB(`REFRESH_TOKEN_TB`)에 저장하고, 만료일 기준으로 재발급 여부를 결정합니다. MSA 환경에서는 세션 클러스터링보다 메모리 낭비가 없고 서비스 간 공유가 자유로운 **Stateless Token 방식**이 적합했습니다.

```java
// TokenService.java — JWT 발급 및 Refresh Token DB 저장
public TokenSet createTokenSet(Long userId) {
    Date validity = Date.from(Instant.now().plus(Duration.ofDays(30)));

    String accessToken  = createToken(userId, validity);
    String refreshToken = createToken(userId, validity);

    repository.save(new RefreshTokenEntity(userId, validity, refreshToken));

    return new TokenSet(accessToken, refreshToken);
}

// 재발급: DB에 저장된 Refresh Token과 비교 후 새 Access Token 발급
public String renewalToken(String token) throws Exception {
    Long userId = Long.parseLong(
        Jwts.parserBuilder().setSigningKey(key).build()
            .parseClaimsJws(token).getBody().getSubject()
    );

    RefreshTokenEntity saved = repository.findByUserIdAndExpirationTimeAfter(userId, new Date());

    return saved.getToken().equals(token)
        ? createToken(userId, new Date(new Date().getTime() + expiration_time))
        : null;
}
```

> Gateway에서 보안을 집중 처리하고 나니, 각 마이크로서비스는 인증을 전혀 신경 쓰지 않고 자신의 도메인 로직에만 집중할 수 있었습니다. **책임 분리가 코드 품질로 직결된다는 것**을 직접 경험한 설계였습니다.

---

## 🛠️ Deep Dive 2. Swagger를 버리고 REST Docs를 선택한 이유

혼자 백엔드를 진행하면서 5명의 프론트엔드 개발자와 소통하는 것이 예상보다 훨씬 많은 시간을 잡아먹었습니다. API가 바뀔 때마다 일일이 알려야 했고, 문서와 실제 코드가 어긋나는 일도 생겼습니다.

Swagger는 편리하지만 **마이크로서비스 구조에서는 서비스마다 문서가 따로 생성**됩니다. 프론트엔드 입장에서는 서비스별로 문서 주소를 따로 찾아야 하는 불편함이 있었습니다. 이를 해결하기 위해 **Spring REST Docs로 각 서비스의 OpenAPI 3 스펙을 추출하고, 이를 하나로 병합하여 단일 Swagger UI로 통합**했습니다.

```java
// DiaryControllerTest.java — 테스트 통과 시 OpenAPI 3 스펙 자동 생성
@SpringBootTest
@AutoConfigureMockMvc
@AutoConfigureRestDocs
public class DiaryControllerTest {

    @Test
    @DisplayName("캘린더 조회")
    void 캘린더_조회() throws Exception {
        mockMvc.perform(RestDocumentationRequestBuilders
                .get("/calender/{month}", "2023-05-01")
                .param("id", "2713582482")
                .header("Authorization", "Bearer AccessToken"))
            .andExpect(status().isOk())
            .andDo(document("캘린더 기록 조회",
                ResourceSnippetParameters.builder()
                    .tag("캘린더 기록 조회")
                    .description("캘린더 조회 시 러닝·수면·다이어리의 날짜별 데이터"),
                responseFields(
                    fieldWithPath("diaryList[]").description("다이어리 기록"),
                    fieldWithPath("runningList[]").description("러닝 기록"),
                    fieldWithPath("sleepList[]").description("수면 기록")
                ).andWithPrefix("diaryList[].",
                    fieldWithPath("today").type(JsonFieldType.STRING).description("날짜"),
                    fieldWithPath("content").type(JsonFieldType.STRING).description("내용")
                )
            ));
    }
}
```

- **테스트가 곧 문서**: 테스트가 실패하면 문서도 갱신되지 않아, 코드와 명세가 항상 동기화
- **서비스별 OpenAPI YAML 병합 → 단일 Swagger UI**: 프론트엔드가 하나의 URL에서 전체 API 조회

> API를 수정할 때마다 별도로 알릴 필요가 없어졌고, 프론트엔드 팀은 항상 최신 명세를 직접 확인할 수 있었습니다. 이 경험 이후 **"좋은 협업 도구가 소통 비용 자체를 없앤다"** 는 것을 실감했습니다.

---

## 📊 서비스 안정성 검증 — AOP + JMeter

서비스를 배포하기 전, 실제 사용자 환경을 가정한 성능 검증이 필요했습니다. **AOP로 각 API의 실행 시간을 측정**하고, JMeter로 동시 접속 부하 테스트를 진행했습니다.

```java
// TimeTraceApp.java — user-service 전체 메서드 실행 시간 측정
@Aspect
@Component
public class TimeTraceApp {
    @Around("execution(* com.example.userservice..*(..))")
    public Object excute(ProceedingJoinPoint joinPoint) throws Throwable {
        long start = System.currentTimeMillis();
        System.out.println("Start: " + joinPoint.toString());
        try {
            return joinPoint.proceed();
        } finally {
            long timeMS = System.currentTimeMillis() - start;
            System.out.println("END: " + joinPoint.toString() + " " + timeMS + "ms");
        }
    }
}
```

**JMeter 실험 환경**: AWS EC2 t2.small, Ubuntu 22.04 LTS / 가정 사용자 1,000명 이상 / 동시 요청 1,000건 / 총 5회 반복 / 제한 시간 1분

![JMeter 부하 테스트 결과](/images/octopus-dream/jmeter-test-result.png)

| 라벨 | 요청 수 | 오류 | 오류 % |
| --- | --- | --- | --- |
| 총계 | 5,000 | 0 | **0.00%** |
| HTTP Request | 5,000 | 0 | **0.00%** |

5,000건 전체 오류율 **0%**, 평균 응답 속도 **1.5초 이내**를 확인했습니다. 사용자가 불편함을 느끼는 2초 기준을 충분히 만족하는 수치였습니다. 이 데이터를 바탕으로 논문의 '서비스 안정성' 파트를 작성하여 학회에서 은상을 수상했습니다.

---

## ☁️ AWS 인프라 및 CI/CD 자동화

처음에는 기능 개발 후 수동으로 JAR를 빌드하고 SSH로 서버에 전송하는 방식으로 배포했습니다. 기능이 업데이트될 때마다 이 과정을 반복하는 것이 비효율적이라 판단하여, **GitHub Actions + AWS CodeDeploy** 파이프라인을 구축했습니다.

```
코드 Push
→ GitHub Actions: 빌드 + 테스트
→ .jar를 Amazon S3에 업로드
→ AWS CodeDeploy가 EC2에 자동 배포
```

한 번 설정 후 코드를 Push하면 테스트→배포까지 자동으로 이루어져, 이후 개발에 온전히 집중할 수 있었습니다.

---

## 🏅 수상

![한국정보기술학회 우수논문상 은상](/images/octopus-dream/award.png)

**2023 한국정보기술학회 대학생 논문경진대회 은상** (제 23-070호)
논문 제목: 캐릭터 육성 게임을 통한 수면 건강관리 / 수상일: 2023년 6월 2일

---

## 📝 회고

- **설계의 중요성**: "보안 로직을 어디에 두어야 하는가"라는 질문 하나가 MSA 아키텍처 전체의 구조를 결정했습니다. 기능 구현 전에 **책임의 경계를 먼저 고민하는 습관**을 이 프로젝트에서 시작했습니다.
- **검증의 가치**: AOP와 JMeter로 수집한 성능 데이터를 논문으로 작성해 학회에서 인정받으면서, **개발 결과를 정량적으로 측정하고 문서화하는 것**이 단순한 부가 작업이 아니라 엔지니어링의 핵심 역량임을 깨달았습니다.
- **협업 도구의 힘**: REST Docs 통합 문서 하나가 5명과의 소통 방식을 바꿔 놓았습니다. 좋은 도구 설계가 곧 팀의 생산성이라는 것을 몸으로 배웠습니다.
