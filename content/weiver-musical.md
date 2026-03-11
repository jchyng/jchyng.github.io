---
title: "Weiver: 7만 건의 대용량 데이터를 처리하는 초고속 뮤지컬 플랫폼"
category: "Backend Development"
thumbnail: "/images/weiver/musical-detail.png"
summary: "비동기 병렬 처리와 Batch Insert를 도입하여 데이터 수집 성능을 92% 개선(2시간 -> 10분)하고, JProfiler로 JVM 리소스를 최적화한 프로젝트입니다."
date: "2026-03-11"
period: "2026.01 - 2026.03"
affiliation: "Personal Project"
tags:
  [
    "Java",
    "Spring Boot",
    "Multi-threading",
    "Batch Insert",
    "JProfiler",
    "Oracle DB",
  ]
draft: false
---

# Weiver (Musical Community)

뮤지컬 팬들을 위한 정보 통합 플랫폼 **Weiver**는 방대한 공연 데이터를 효율적으로 수집하고 관리하는 백엔드 성능 최적화에 역량을 집중한 프로젝트입니다. 특히 7만 건 이상의 데이터를 실시간에 가깝게 동기화하기 위한 아키텍처 설계를 주도했습니다.

## 🚀 핵심 성과: 대용량 데이터 처리 및 성능 최적화

데이터 수집 프로세스에서 발생하는 네트워크 I/O 병목과 DB 쓰기 부하를 기술적으로 해결하여 혁신적인 성능 개선을 달성했습니다.

- **성능 개선:** 기존 동기식(Sequential) 로직 기준 **약 2시간(120분)** 소요되던 전수 조사 시간을 **10분대**로 단축 (**약 92% 성능 향상**).
- **비동기 병렬 처리(Multi-threading):** `CompletableFuture`와 전용 `ExecutorService`를 활용하여 수만 개의 상세 페이지 요청을 병렬화.
- **Batch Insert 도입:** 1,000건 단위의 청크(Chunk) 처리를 통해 DB 커넥션 비용과 트랜잭션 오버헤드를 최소화.
- **JVM 리소스 최적화:** **JProfiler**를 사용하여 힙 덤프(Heap Dump)를 분석, 크롤링 과정에서의 메모리 누수 지점을 포착하고 객체 생존 주기를 개선하여 안정성 확보.

---

## 🛠️ Deep Dive: 병렬 처리 엔진 설계 및 구현

이 프로젝트의 핵심은 "**어떻게 하면 제한된 하드웨어 자원에서 네트워크 I/O 병목을 최소화하고 처리량을 극대화할 것인가?**"에 대한 답을 찾는 것이었습니다.

### 1. 비동기 병렬 데이터 수집 아키텍처

![병렬 처리 시각화](/images/weiver/parallel-visualization.png)
*수만 건의 요청을 청크 단위로 분할하고, 다중 스레드 풀을 통해 비동기로 처리하는 엔진 구조*

단일 스레드 기반의 기존 로직은 하나의 상세 페이지를 크롤링하는 동안 다음 페이지의 요청을 보내지 못하는 **Blocking** 현상이 발생했습니다. 이를 해결하기 위해 다음과 같은 전략을 사용했습니다.

- **Thread Allocation:** 하드웨어 자원(CPU Core)과 네트워크 대역폭을 고려하여 20개의 스레드를 독립적으로 할당한 `FixedThreadPool`을 구성했습니다.
- **CompletableFuture Pipeline:** 각 요청을 비동기로 시작하고, 모든 작업이 완료될 때까지 Non-blocking 방식으로 대기한 후 결과를 집계(`join`)하는 파이프라인을 구축했습니다.
- **Chunk-based Processing:** 메모리 압박을 방지하기 위해 1,000건 단위로 데이터를 나누어 처리(Partitioning)하여 시스템 안정성을 확보했습니다.

```java
@Service
@Slf4j
@RequiredArgsConstructor
public class CrawlingService {

    private final MusicalRepository musicalRepository;
    private final ActorRepository actorRepository;
    private final CastingRepository castingRepository;

    // [핵심] 네트워크 I/O 부하를 고려하여 20개의 스레드를 고정 할당 (Thread Allocation)
    private final ExecutorService executor = Executors.newFixedThreadPool(20);

    public void task() {
        long startTime = System.currentTimeMillis();
        String[] genres = {Sub_category.LICENSE, Sub_category.ORIGINAL, Sub_category.CREATIVE, Sub_category.MUSICAL};

        for (String genre : genres) {
            int maxPage = setMaxPage(genre, Sub_category.ALL);
            // 페이지별 ID 수집 후 병렬 처리 호출
            List<String> allMusicalIds = fetchAllMusicalIds(genre, maxPage);
            processInParallel(allMusicalIds);
        }
        log.info("전체 크롤링 완료. 소요 시간: {}ms", (System.currentTimeMillis() - startTime));
    }

    /**
     * CompletableFuture를 활용한 상세 정보 비동기 병렬 수집
     */
    private void processInParallel(List<String> musicalIds) {
        // 1,000건 단위로 청크를 나누어 메모리 압박을 줄이고 Batch Insert 효율 증대
        Lists.partition(musicalIds, 1000).forEach(chunk -> {
            List<CompletableFuture<MusicalActorDto>> futures = chunk.stream()
                .map(id -> CompletableFuture.supplyAsync(() -> {
                    try {
                        return getMusicalActorDto(id); // 개별 상세 페이지 크롤링 (Network I/O)
                    } catch (Exception e) {
                        log.error("ID {} 수집 중 오류: {}", id, e.getMessage());
                        return null;
                    }
                }, executor))
                .collect(Collectors.toList());

            // 모든 비동기 작업이 완료될 때까지 Non-blocking 대기 후 결과 취합
            List<MusicalActorDto> results = futures.stream()
                .map(CompletableFuture::join)
                .filter(Objects::nonNull)
                .collect(Collectors.toList());

            // 수집된 대량의 데이터를 Batch 방식으로 DB에 반영
            saveAllBatch(results);
        });
    }

    /**
     * JPA Batch Insert를 통한 쓰기 성능 최적화
     */
    @Transactional
    public void saveAllBatch(List<MusicalActorDto> dtos) {
        List<Musical> musicals = new ArrayList<>();
        List<Actor> actors = new ArrayList<>();

        for (MusicalActorDto dto : dtos) {
            musicals.add(dto.getMusical());
            dto.getActorsByRoleDtoList().forEach(r -> actors.addAll(r.getActor()));
        }

        // Hibernate Batch 설정을 통해 단일 쿼리로 묶어 전송 (Network Round-trip 감소)
        musicalRepository.saveAll(musicals);
        actorRepository.saveAll(actors);
    }
}
```


### 2. JProfiler 기반 JVM 리소스 최적화

병렬 처리 시 수천 개의 객체가 동시에 생성되면서 `GC(Garbage Collection)` 부하가 급증하는 현상을 목격했습니다.

- **문제 탐색:** JProfiler의 힙 덤프 분석 결과, `Jsoup Document` 객체가 비동기 스레드 내에서 즉시 해제되지 않아 `Old Generation` 영역으로 넘어가며 `Full GC`를 유발함을 발견했습니다.
- **해결 방안:** 상세 정보 추출 후 `Document` 참조를 명시적으로 `null` 처리하고, 로컬 변수의 스코프를 최소화하여 객체의 생존 주기를 단축시켰습니다.
- **결과:** 메모리 점유율을 **약 60% 절감**하고, 서비스 중단 없이 대규모 크롤링을 수행할 수 있는 안정성을 확보했습니다.

---

## 🖥️ 주요 기능 및 관리 도구 (Screenshots)

### 1. 관리자 시스템 (Admin Console)

대용량 데이터를 효율적으로 모니터링하고 제어하기 위한 관리자 페이지입니다.

|                     데이터 관리                      |                   콘텐츠 모니터링                    |
| :--------------------------------------------------: | :--------------------------------------------------: |
| ![Admin Musicals](/images/weiver/admin-musicals.png) | ![Admin Contents](/images/weiver/admin-contents.png) |
|           수집된 7만 건의 뮤지컬 DB 인덱싱           |      실시간 커뮤니티 게시글 및 콘텐츠 상태 추적      |

### 2. 사용자 인터페이스 (Service View)

수집된 데이터를 기반으로 사용자에게 풍부한 경험을 제공합니다.

|             메인 대시보드             |                 뮤지컬 상세 정보                  |
| :-----------------------------------: | :-----------------------------------------------: |
| ![Main Page](/images/weiver/main.png) | ![Detail Page](/images/weiver/musical-detail.png) |
|      실시간 랭킹 및 추천 시스템       |       체계적으로 시각화된 공연/출연진 정보        |

### 3. 커뮤니티 (Community)

대규모 트래픽 상황에서도 안정적으로 동작하는 소통 공간입니다.

|                  커뮤니티 메인                  |                       게시글 상세                        |
| :---------------------------------------------: | :------------------------------------------------------: |
| ![Community Page](/images/weiver/community.png) | ![Community Detail](/images/weiver/community-detail.png) |

---

## 📝 회고

- **데이터 기반 의사결정:** 단순히 감에 의존하지 않고 JProfiler와 성능 테스트 결과라는 객체적인 데이터를 바탕으로 아키텍처를 개선하며 백엔드 엔지니어의 핵심 역량을 쌓았습니다.
- **확장성을 고려한 설계:** 현재의 청크 단위 처리와 스레드 풀 구조는 데이터가 수백만 건으로 늘어나더라도 하드웨어 자원의 확장(Scale-up/out)만으로 충분히 대응할 수 있는 견고함을 갖추고 있습니다.
- **엔지니어링의 본질:** "동작하는 것"을 넘어 "어떻게 더 효율적으로 동작하게 할 것인가"를 고민하며, Multi-threading 환경에서의 동시성 이슈와 리소스 관리의 중요성을 깊이 이해하게 되었습니다.
