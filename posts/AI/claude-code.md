---
title: "요즘 핫한 Claude Code🔥 어떻게 사용하는 걸까?"
date: "2025-07-07"
excerpt: "Claude Code의 설치 과정부터 실무 활용까지 체계적으로 정리했습니다. WSL 환경 구성, 메모리 관리, 레퍼런스 첨부 기능 등 개발 생산성을 높이는 핵심 기능들을 다룹니다."
tags: ["Claude", "Claude Code", "VibeCoding"]
thumbnail: "/images/posts/AI/claude-code/thumbnail.png"
---

# 클로드 코드 설치하기

### Mac

```bash
# Install Claude Code
npm install -g @anthropic-ai/claude-code

# Navigate to your project
cd your-awesome-project

# Start coding with Claude
claude
```

### Windows
현재 작성일 기준으로 Claude Code는 Windows에 바로 설치할 수는 없고, 먼저 WSL을 활용해서 리눅스 환경을 구축해야한다.

1. wsl --install로 wsl 설치
2. 제어판 → 프로그램 → Windows 기능 켜기/끄기 
    - Linux용 Windows 하위 시스템 ✅
    - 가상 머신 플랫폼 ✅
3. 이후 wsl 실행 시 에러가 발생하면 PC에서 바이오스 모드로 진입하여 별도의 설정이 필요하다.


<br/><br/>

# 클로드 코드 사용 방법 및 주요 기능
설치가 완료되었다면 원하는 프로젝트 경로에서 `claude` 명령어를 입력하면 바로 아래와 같이 실행된다.
![img](/images/posts/AI/claude-code/thumbnail.png)

<br/><br/>  

## 설정 

### /config
`/config` 명령을 통해서 설정이 가능하다.  
`/compact` 명령을 통해 컨텍스트를 압축할 수 있는데, `Auth-compact`는 토큰 사용량을 줄이기 위해 컨텍스트 용량이 95%를 초과하게 되면 자동으로 압축을 진행하는 설정이다.   
 ![img](/images/posts/AI/claude-code/config.png)

### settings.json
claude를 사용하다 보면 .claude/settings.local.json이 생성되는 것을 볼 수 있다.
`settings.local.json`은 claude가 파일이나 디렉터리에 접근할 때 `permission check`를 하게되는데 이를 기억해두거나 `API Key`, `env` 등 다양한 설정을 정의해두는 파일이다.  
![img](/images/posts/AI/claude-code/settingsjson.png)

`/model`을 사용하면 claude의 모델을 선택할 수 있다.
현재 가장 강력한 모델인 `Opus 4` 같은 경우에는 `pro` 요금제에서는 사용할 수 없기 때문에 `max`인 사용자만 보면된다.  

<br/><br/>

## 메모리 관리 ⭐⭐

claude 대화를 끊고 다시 시작할 때 문맥을 유지하기 위해서 이전 내용을 설명할 필요 없도록 claude에서 `CLAUDE.md` 파일을 작성해두면 대화를 시작할 때 해당 문서를 읽고, 중요한 내용을 기억할 수 있다.  
> **/init** 명령을 통해 생성할 수 있으며, 본인이 원하는 내용을 작성해도 무방하다.   

CLAUDE.md는 프로젝트 경로에 생성하면 해당 프로젝트에서만 적용이 되고, `windows 기준 C:\Users\사용자\.claude` 경로에 생성하면 해당 유저가 사용하는 모든 프로젝트에 대해 적용된다.   


<br/><br/>

## 레퍼런스 첨부 ⭐⭐

대화 중에 파일이나 디렉터리, 이미지를 첨부하고 싶을 때 유용한 커맨드  

`@`: 파일이나 디렉터리를 불러올 수 있다.  
이미지: `shift` + 드래그 앤 드롭

커맨드를 사용하지 않는다면 클로드가 켜져있는 상태에서 원하는 파일을 열고, 해당 파일을 클릭하면 파일 전체가 첨부되고, 특정 영역을 드래그하면 해당 텍스트가 첨부된다.
![img](/images/posts/AI/claude-code/reference.png)  

<br/><br/>

## 대화 모드와  ⭐⭐
`Shift + Tab`으로 모드 전환이 가능하고, `Default`, `Plan`, `Auto Accept eits` 3가지 모드가 존재한다.  
- **Default**: 코드를 적용하기 전에 사용자에게 허락을 구하는 모드
- **Auto Accept**: 자동 허용 모드
- **Plan**: Claude가 무작성 코드를 작성하지 않고, 일단 문제를 분석 
 
 대화 중에 멈추고 싶을 때는 `ESC`를 사용하고, 종료하고 싶다면 `Ctrl + c`를 `2번` 입력하면 된다.  
 만약 대화가 길어지거나 작업을 마치고 다음 기능을 구현하러 넘어갈 때는 `/clear`를 사용하면 컨텍스트가 초기화된다.

 ### 대화 유지
 claude를 종료했다가 다시 실행할 때 이전 대화를 이어서 진행할 때 유용한 명령어  

 `claude --continue`: 가장 최근 대화를 자동으로 이어줌  
 `claude --resume`: 이전 대화를 선택해서 해당 시점에서 이어서 진행할 수 있음  


<br/><br/>

## 커스텀 커맨드 ⭐
`.claude/command` 경로에 주석을 달아달라는 프롬프트가 작성된 `document.md`를 작성하면 `/project:document` 명령어로 사용할 수 있다.  
이때 md 파일에서 **명령 시 입력하는 파라미터도 받도록 설정**할 수 있는데, `$ARGUMENTS`를 md 파일 내에서 사용하면 된다.  
예를 들어 내가 주석을 작성할 파일의 이름을 인자로 받으면 `/project:document 파일명` 이렇게 사용할 수 있다.  


<br/><br/>

## MCP 관리 방법
```bash
# Basic syntax
claude mcp add <name> <command> [args...]

# Example: Adding a local server
claude mcp add my-server -e API_KEY=123 -- /path/to/server arg1 arg2
# This creates: command="/path/to/server", args=["arg1", "arg2"]
```
```bash
# List all configured servers
claude mcp list

# Get details for a specific server
claude mcp get my-server

# Remove a server
claude mcp remove my-server
```

