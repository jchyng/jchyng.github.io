---
title: "Super Claude로 편리하고, 똑똑하게 개발하기"
date: "2025-07-22"
excerpt: ""
tags: ["Super Claude", "Claude code", "VibeCoding"]
thumbnail: "/images/posts/AI/super-claude.png"
---

# Super Claude란?

Super Claude는 Claude Code를 잘 사용하기 위한 프롬프트를 미리 정의해두고 정의된 커맨드로 간편하게 사용하기 위한 툴이며, 기본적으로 많이 사용되는 MCP를 전부 세팅해주기도 한다.

<br/>

## 설치하기
Super Claude를 사용하기 위해서는 먼저 Claude Code가 설치되어 있어야 합니다.


### Option A: From PyPI (Recommended)
```bash
uv add SuperClaude
```
[uv 설치 방법](https://docs.astral.sh/uv/getting-started/installation)  


### Option B: From Source
```bash
git clone https://github.com/NomenAK/SuperClaude.git
cd SuperClaude
uv sync
```

<br/>

### Option A로 진행
```bash
uv venv
source .venv/bin/activate # windows라면 powershell에서 .venv\Scripts\Activate.ps1
uv pip install SuperClaude
```

```bash
uvx pip install SuperClaude

python3 -m SuperClaude install 
# python3 설치 
# mac: brew install python3
# windows: microsoft store에서 python3 검색 후 설치

SuperClaude install
# Quick Installation 선택
```  
 
<br/>

## 사용하기
claude를 실행한 다음 `/sc`(super claude)를 입력하면 다양한 sc 커맨드를 볼 수 있다.


커맨드 종류는 매우 많기 때문에 전부 기록할 수는 없고, 핵심 내용은 다음과 같다.

<br/>

### 목적 별 커맨드
예를 들어 문제를 해결하고싶다면 `sc:troubleshoot`, 디자인을 하고싶다면 `sc:design` 커맨드를 사용하면 목적에 최적화된 프롬프트가 자동으로 적용된다.

#### 프롬프트 목록
```bash
# 계획 및 프로젝트 관리
/workflow : ⭐
- PRD와 기능 요구사항을 분석하여 포괄적인 단계별 워크플로 생성 
- 로드맵 형식의 단계뼐 구현 계획과 스토리, 작업 등에 대한 내용을 얻을 수 있다.

/document : 
- README, Guide 등 문서화

/estimate : 
- 개발 작업에 필요한 시간, 노력, 복잡성을 추산
- 스프린트 계획

/task :
- 장기 프로젝트 관리
- 며칠, 몇 주가 걸리는 기능 계획
- 대규모 프로젝트 분해

/spawn :
- 복잡한 운영 오케스트레이션
- 복잡한 배포와 병렬 워크플로우 조정
```

```bash
# 개발
/implement :
- 구성 요소 및 기능을 구현
- API, 서비스 또는 모듈 구현 시 사용
- UI 구성 시 사용

/build :
- 프로젝트를 컴파일/번들링 할 때 사용

/design :
- 시스템 아키텍처, API 설계, 구성요소 사양을 작성
- API, 데이터베이스 등 설계가 필요할 때 사용
```

```bash
# 분석
/analyze : 
- 코드 품질, 보안, 성능 및 아키텍처에 대한 포괄적인 분석
- 코드 품질 평가 및 보안 취약점을 찾을 때
- 익숙하지 않은 코드베이스에 대한 이해가 필요할 때

/troubleshoot :
- 디버깅 및 문제 조사 시 사용

/explain :
- 교육적인 방식으로 코드, 개념, 기술을 설명

```

```bash
# 품질
/improve : 
- 코드 품질, 성능, 유지관리성 개선
- 리팩토링이나 성능 개선, 레거시 코드 개선 등에 활용

/cleanup : 
- 쓸모없는 코드와 사용되지 않는 import 제거 및 파일 구조 정리


/test
- 테스트를 실행하고, 적용 범위 보고서를 생성하고, 품질을 유지
```

```bash
# 버전 관리
/git :
- 깃 관리

/load :
- 프로젝트 컨텍스트를 로드하고 분석하여 더 나은 이해를 제공
```


<br/>

### 페르소나
프롬프팅을 하다보면 AI에게 역할을 부여하는데 반복되다 보면 굉장히 귀찮다.
이때 `--personar` 옵션을 사용하면 간단하게 역할을 부여할 수 있다.

#### 예시 
`--persona-architect`

#### 페르소나 목록
