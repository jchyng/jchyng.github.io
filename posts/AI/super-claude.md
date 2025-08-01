---
title: "🚀 SuperClaude로 Claude Code 생산성 높이기"
date: "2025-07-22"
excerpt: "Claude Code 프롬프팅을 간단하게 도와주는 SuperClaude의 설치와 사용 방법을 다룹니다."
tags: ["SuperClaude", "Claude Code", "Vibe Coding", "prompting"]
thumbnail: "/images/posts/AI/super-claude/thumbnail.png"
---

# Super Claude란?

Super Claude는 Claude Code를 잘 사용하기 위한 프롬프트를 미리 정의해두고 정의된 커맨드로 간편하게 사용하기 위한 툴이며, 기본적으로 많이 사용되는 MCP를 전부 세팅해주기도 한다.

[SuperClaude Github 바로가기](https://github.com/SuperClaude-Org/SuperClaude_Framework)

<br/>

## 설치하기

Super Claude를 사용하기 위해서는 먼저 Claude Code가 설치되어 있어야 한다.

### Option A: From PyPI (Recommended)

[uv 설치 방법](https://docs.astral.sh/uv/getting-started/installation)

```bash
uv add SuperClaude
```

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

## 사용 방법

### 🛠️ Command

설치를 끝냈다면 Claude Code를 실행하고 `/`를 입력하면 `/sc:`로 시작하는 무수한 명령어를 볼 수 있다.
`/sc:` 뒤에 원하는 요청의 종류를 선택할 수 있는데 이것을 커맨드라고 하고 아래 이미지와 같이 17개의 커맨드가 존재한다.

![image](/images/posts/AI/super-claude/command-table.png)

표는 외울 필요는 없고, 대충 한번 훑어본 다음 실제로 사용해보면서 자연스럽게 익히는 것이 좋다. [공식 문서](https://github.com/SuperClaude-Org/SuperClaude_Framework/blob/master/Docs/commands-guide.md)

<br/>

### 🎭 Persona

좋은 답변을 받기 위해서는 AI에게 역할을 부여하는 것이 좋다.
하지만 매번 반복적으로 "너는 세계 최고의 웹 디자이너야" 이런식으로 명령하는 것은 상당히 귀찮은 일인데, 이를 명령어로 간소화 할 수 있다. [공식 문서](https://github.com/SuperClaude-Org/SuperClaude_Framework/blob/master/Docs/personas-guide.md)

![image](/images/posts/AI/super-claude/persona-table.png)

<br/>

### 🏁 Flag

persona 처럼 `--`로 명령에 추가 옵션을 주는 것을 **Flag**라고 하는데 다양한 Flag들이 존재한다.
계획을 세울 땐 `--plan`, 깊게 생각할 땐 `--think` 등이 있다.
또한, 기본적으로 4가지의 **MCP**를 제공해주는데 `--c7`, `--seq`, `--magic`, `--play` 명령을 통해서 **context7**과 **Sequential**, **magic ui**, **playwright**를 손쉽게 적용할 수 있다.

![image](/images/posts/AI/super-claude/flag-table.png)

Flag는 종류가 많기 때문에 직접 [공식 문서](https://github.com/SuperClaude-Org/SuperClaude_Framework/blob/master/Docs/flags-guide.md)를 통해 원하는 명령을 찾아서 사용하는 것이 좋다.
