---
title: "깃(git) stash"
description: ""
category: "git"
date: 2025-08-15
---
## Stash

dev라는 이름의 브랜치에서 작업을 하다가 main브랜치를 확인해보아야 하는 상황이라고 가정해보자.

작업 내용을 git add를 통해 staging area에 올리고 브랜치를 변경하기 위해 git checkout main 명령어를 사용하려고 한다.

이때 충돌이 발생하지 않는 범위에서의 수정이 이루어졌다면 문제가 없겠지만, 만약 충돌이 일어날 경우 오류 메시지와 함께 브랜치 이동이 되지 않는다.

아래는 오류 메시지의 예시이다.

```
error: Your local changes to the following files would be overwritten by checkout:
        .DS_Store
Please commit your changes or stash them before you switch branches.
```

오류 메시지를 살펴보면 커밋을 하거나 stash를 해야한다는 문구를 발견할 수 있다.

만약 지금 당장 커밋을 해야할 것이 아니라면 곤란할 것이다.

이때 필요한 것이 stash이다.  
<br>

## git stash는 뭐 하는 명령어일까?

간단히 말해서 \`git stash\`는 커밋하지 않은 변경사항을 스택(Stack) 형태로 임시 저장하는 기능이다.  
이 때 기본적으로는 tracked 파일만 저장하고, untracked(추적 안 되는) 파일은 제외된다.  
만약 새로 만든 파일까지 저장하려면 \`-u\` 옵션을 붙인다.  
이 기능이 좋은 이유는,  
• 브랜치 전환 전에 작업을 안전하게 저장 가능  
• 커밋 이력에 굳이 남기고 싶지 않은 내용을 잠깐 보관  
• 나중에 꺼내서 이어서 작업 가능

  
**stash 기본 사용법**

| 명령어 | 설명 | 예시 |
| --- | --- | --- |
| git stash | 변경사항 전체 저장 | git stash |
| git stash push -m "메시지" | 메시지와 함께 저장 | git stash push -m "UI 수정" |
| git stash list | 저장된 stash 목록 보기 | git stash list |
| git stash apply stash@{n} | 지정 stash 적용(삭제 안 함) | git stash apply stash@{2} |
| git stash pop stash@{n} | 지정 stash 적용 후 삭제 | git stash pop stash@{0} |
| git stash drop stash@{n} | 지정 stash만 삭제 | git stash drop stash@{1} |
| git stash clear | 모든 stash 삭제 | git stash clear |
| git stash push \[파일명\] | 특정 파일만 저장 | git stash push index.html |
| git stash -p | 변경 일부만 선택 저장 | git stash -p |

## stash와 브랜치 전환에서 생기는 문제

**1. untracked 파일 충돌**  
작업할 때 \`.DS\_Store\`나 빌드 결과물 같은 untracked 파일이 있으면, 브랜치를 옮길 때 이런 에러가 뜬다.

해결 방법

```
rm .DS_Store
# 또는 모든 .DS_Store 삭제
find . -name .DS_Store -delete
```

_※ .DS\_Store_

_맥OS에서 폴더의 사용자 정의 속성,메터데이터 등의 정보를 저장하는 파일이다._

_이는 프로젝트에서 불필요한 것이고, 노출되면 안되는 파일이기 때문에 삭제가 필요하다.  
매번 삭제하는 것은 귀찮으므로 터미널에서 아래와 같은 명령어로 DS\_Store가 생성되지 않게 하거나 .gitignore를 사용하여 무시하는 방법이 있다.  
```
com.apple.desktopservices DSDontWriteNetworkStores true
```
<br>

**2. modified 파일 충돌**  
\`stash apply\`나 \`stash pop\`을 하는데 현재 작업 트리에 이미 같은 파일이 수정돼 있다면 병합 충돌이 난다.  
이럴 땐 stash 적용 전에 커밋하거나 변경사항을 치워두는 게 안전하다.  
<br>

## 다른 브랜치에 stash 적용이 가능할까?

가능하다. 예를 들어 dev 브랜치에서 stash 저장 → main 브랜치에 적용 같은 경우.  
다만 주의할 점은 기반 코드가 다르면 충돌 확률이 높다는 것.  
항상 \`git status\`로 작업 트리가 깨끗한지 확인하고 적용하자.  
<br>

## stash 메시지를 써야 하는 이유

메시지를 안 쓰면 Git이 자동으로 이렇게 붙인다.

```
stash@{0}: WIP on dev: <마지막 커밋 메시지>
```

\`WIP\`(Work In Progress) 형태라 구분이 어렵다.  
반면 메시지를 지정하면 이렇게 된다.

```
stash@{0}: On dev: 로그인 버튼 UI
```

이렇게 하면 나중에 무슨 작업이었는지 바로 알아볼 수 있다.  
<br>

## \`git stash push -m\`이 권장된다.

예전에는 \`git stash save\`를 썼지만 이제는 deprecated됐다.  
\`git stash push -m "메시지"\`가 공식 권장 방식이다.  
• 내부적으로 “push to stash stack”이라는 동작과 맞음  
• Git 공식 문서에 표준으로 명시  
• 향후 버전 호환성 보장
