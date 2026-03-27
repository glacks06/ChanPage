---
title: "[파이썬] venv"
description: ""
category: "language"
date: 2025-11-10
---

<br>

## venv란 무엇인가?

venv는 파이썬의 **"가상 환경(Virtual Environment)"**을 만들기 위한 모듈이다. 간단히 말해, **프로젝트별로 독립된 "파이썬 작업실"**을 만들어주는 도구이다.

<br>

## venv가 필요한 이유: 의존성 문제 해결

컴퓨터에 설치하는 모든 파이썬 라이브러리(패키지)는 기본적으로 시스템의 "공용 폴더" 한 곳에 저장된다.

<br>

**문제 상황 (의존성 지옥):**
* A 프로젝트는 pandas 1.5 버전이 필요하다.
* B 프로젝트는 pandas 2.0 버전이 필요하다.

**venv의 해결책:**
* venv를 사용하면 각 프로젝트 폴더 내에 독립된 파이썬 환경을 만들 수 있다.
* A 프로젝트 환경에는 pandas 1.5를, B 프로젝트 환경에는 pandas 2.0을 설치하여 서로 다른 버전이 충돌하지 않도록 완벽하게 분리한다.

<br>

## venv 핵심 사용법

<br>

**가상 환경 생성 (최초 1회):**
```bash
python -m venv .venv
```

<br>

**가상 환경 활성화 (작업 시작 시):**
* (Windows)
```bash
.\.venv\Scripts\activate
```
* (macOS/Linux)
```bash
source .venv/bin/activate
```

<br>

**라이브러리 설치 (활성화된 상태에서):**
```bash
pip install requests
```

<br>

**가상 환경 비활성화 (작업 종료 시):**
```bash
deactivate
```

<br>

## venv 약어의 의미

venv는 **"virtual environment"**의 약자이다.  
v (virtual, 가상의)와 env (environment, 환경) 두 부분이 합쳐진 단어이다.  