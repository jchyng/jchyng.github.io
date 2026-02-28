---
title: "경기도 소방서 홈페이지 & 백오피스 리뉴얼"
category: "Legacy Modernization / Infra"
thumbnail: "TODO_IMAGE"
summary: "10만 건 이상 데이터에서 평균 50ms 이하 응답 속도를 달성하는 Meilisearch 통합 검색을 도입하고, tcpdump 패킷 분석으로 VM 세션 클러스터링 문제의 근본 원인을 해결한 실무 프로젝트입니다."
date: "2025-03-07"
period: "2024.08 - 2025.03 (7개월)"
affiliation: "㈜위니텍 (실무 프로젝트)"
draft: true
---

<!-- TODO: 대표 썸네일 이미지 추가 (예: /images/firestation-main.png) -->

# 경기도 소방서 홈페이지 & 백오피스 리뉴얼

경기도 소방서의 **대국민 홈페이지**와 **관리자용 백오피스(CMS)**를 리뉴얼하는 7개월간의 실무 프로젝트입니다.

단순 기능 구현을 넘어 **신기술 도입 제안(Meilisearch)**과 **온프레미스 인프라 안정화**까지 책임지며, 서비스의 성공적인 오픈에 핵심적으로 기여했습니다.

---

## 개요

| 항목 | 내용 |
|------|------|
| **역할** | 메인 개발자 (검색 엔진 도입, 서버 인프라 구축·안정화, CMS 핵심 기능 개발) |
| **팀 구성** | 8인 개발팀 |
| **기간** | 2024.08 – 2025.03 (7개월) |
| **환경** | 폐쇄망 온프레미스 VM (정부 표준 프레임워크 기반) |

---

## 기술 스택

| 분류 | 기술 |
|------|------|
| 언어/프레임워크 | Java 8, Spring eGov, JSP, MyBatis |
| 데이터베이스 | PostgreSQL |
| 검색 엔진 | Meilisearch |
| 서버/인프라 | Apache, Tomcat, AJP/mod_jk, VM Linux (폐쇄망) |
| 연동 | Firebase MQTT, NICE 본인인증 SDK, 법제처 API |
| 분석 도구 | tcpdump (네트워크 패킷 분석) |

---

## 주요 기능

1. **고성능 통합 검색** — Meilisearch 도입으로 10만 건 이상 데이터에서 평균 50ms 이하 응답 속도 달성
2. **VM 환경 세션 클러스터링 안정화** — tcpdump 패킷 분석으로 근본 원인을 파악하고 해결
3. **백오피스(CMS) 핵심 기능** — 콘텐츠·이력 관리, 권한 관리, 메뉴 인터셉터 기반 접근 제어 구현
4. **대외 시스템 연동** — NICE 휴대폰 본인인증, 법제처 API, MQTT 기반 STT 데이터 기록

---

## 구현 내용

### 1. Meilisearch 도입 — 검색 성능 확보 및 사내 기술 자산화

기존 RDBMS 기반의 `LIKE` 검색은 데이터가 누적될수록 성능이 급격히 저하되는 구조였습니다. 별도 검색 서버가 불필요한 단일 서버 환경의 특성과 구축 용이성을 고려하여 **Meilisearch**를 직접 제안하고 도입했습니다.

**성과**

| 항목 | 내용 |
|------|------|
| 검색 응답 속도 | 10만 건 이상 데이터에서 평균 **50ms 이하** |
| 검색 품질 | 오타 허용(Typo-tolerance), 한국어 형태소 분석 지원 |
| 조직 기여 | **도입 매뉴얼 작성 후 사내 기술 블로그 공유** → 타 사업 팀에서도 동일 기술 채택 |

> 기술 도입 과정을 문서화하여 팀의 학습 비용을 줄이고, **개인의 경험을 조직의 자산으로 전환**했습니다.

<!-- TODO: Meilisearch 검색 응답 속도 측정 결과 스크린샷 추가 -->

### 2. VM 환경 세션 클러스터링 문제 — tcpdump로 근본 원인 해결

Apache AJP + mod_jk를 활용한 All-to-All 세션 클러스터링 구성 중, **VM 환경에서만 세션이 공유되지 않는 문제**가 발생했습니다. 에러 로그는 전혀 출력되지 않아 원인 파악이 극히 어려웠습니다.

**문제 추적 과정**

로그가 없는 상황에서 **tcpdump**로 서버 간 패킷 흐름을 직접 분석했습니다.

```bash
# VM 환경 패킷 캡처 및 분석
tcpdump -i eth0 -n host [상대방 WAS IP] and port 8009
```

**원인 발견**

VM 환경에서 자기 자신의 IP를 조회하면 실제 사설 IP 외에 `127.0.0.1`과 `10.0.2.1`이 함께 감지됩니다. 클러스터링 라이브러리가 이 중 잘못된 IP를 송신 주소로 사용하면서, **세션 복제 메시지가 외부로 나가지 않고 자신에게 루프**되는 현상이 발생한 것이었습니다.

**해결**

```xml
<!-- server.xml 수정 전 -->
<Receiver className="..." address="auto" port="4000" />

<!-- server.xml 수정 후: VM 내부 IP로 명시 고정 -->
<Receiver className="..." address="10.0.2.1" port="4000" />
```

`Receiver` 주소를 `auto`에서 **VM 내부 IP인 `10.0.2.1`로 명시적으로 고정**하여 문제를 완전히 해결했습니다.

> 에러 로그가 없어도 **네트워크 지식(tcpdump)**을 활용해 문제의 근본 원인을 찾아낸 이 경험은, 인프라와 네트워크 레이어까지 사고하는 개발자로 성장하는 계기가 됐습니다.

<!-- TODO: 클러스터링 구성 다이어그램 이미지 추가 -->

### 3. CMS 백오피스 핵심 기능 구현

관리자의 실무 운영에 직결되는 기능들을 설계부터 구현까지 담당했습니다.

- **콘텐츠 이력 관리**: 모든 수정 이력을 기록하여 감사(Audit) 추적 가능
- **메뉴 인터셉터 기반 권한 제어**: URL 패턴별 접근 권한을 DB에서 관리하여 유연한 권한 설계
- **NICE 본인인증 연동**: SDK 기반 휴대폰 본인인증 흐름 구현

```java
// 메뉴별 권한 체크 인터셉터 (개념 코드)
@Component
public class MenuAuthInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, ...) {
        String requestUri = request.getRequestURI();
        String userRole   = (String) request.getSession().getAttribute("userRole");

        // DB에서 해당 URI에 허용된 권한 목록 조회 후 비교
        boolean hasPermission = menuService.hasPermission(requestUri, userRole);

        if (!hasPermission) {
            response.sendRedirect("/error/403");
            return false;
        }
        return true;
    }
}
```

---

## 회고

**실제 운영 환경**에서 발생하는 예측 불가한 인프라 이슈와 레거시 제약을 극복하며, **개발 범위를 넘어선 영역(네트워크·시스템 분석)까지 학습하고 적용하는 경험**을 했습니다.

특히, Meilisearch 도입 매뉴얼을 사내에 공유하여 동료들의 학습 비용을 줄인 것처럼, **개인의 문제 해결 경험을 팀과 조직의 자산으로 환원하는 것**이 개발자의 중요한 역할 중 하나임을 깨달았습니다. 이 프로젝트를 통해 단순히 주어진 기능을 구현하는 것을 넘어, **서비스의 안정성과 성능에 직접 책임지는 개발자**로서의 역량을 쌓았습니다.
