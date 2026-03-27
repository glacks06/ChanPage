---
title: "리액트(React) 초기 구성"
description: ""
category: "react"
date: 2025-02-27
---
<br>

React를 시작하기 위해서는 우선 React프로젝트를 만들어야한다.
```
npx create-react-app my-app
```
'my-app' 부분에 원하는 이름을 적어주면 된다.



위의 명령어를 이용하면 React 프로젝트가 세팅되는 것을 볼 수 있다.


![리액트 초기 세팅](/images/tech/react/react-set1.png)


### .gitignore

git을 사용한다면 친숙할 수 있는 파일이다. git에 저장시키고 싶지 않은 파일이나 경로등을 명시하여서 원하는 파일들만 git을 통해 관리할 수 있도록 해준다.

node_modules의 경우 해당 프로젝트에 사용되는 모듈들이 설치되는 폴더인데, 어떤 모듈들이 사용되는지는 package.json에 명시되어있어 원할때 intall 가능하다. 따라서 설치된 모듈까지 저장하려면 시간이 꽤 걸리기 때문에 node_modules와 하위 경로들을 .gitignore에  명시하여 git에 저장되지 않게 하는 것이 좋다.

![리액트 초기 세팅](/images/tech/react/react-gitignore.png)


### package.json

해당 프로젝트에서 사용한 모듈을 json형식으로 명시한 파일이다.  다음과 같은 명령어를 통해  명시된 모듈들을 설치할 수 있다.
```
npm intall
```
혹은
```
npm i
```  
<br>

### package-lock.json

npm intall을 이용하여 모듈을 설치할 때, package.json에서 최신 모듈을 설치하도록  명시한다면 이전의 작업하던 버전 환경과 달라질 수 있다. 이 경우 잘못하면 오류가 발생할 수 있는데, 작업을 할 당시 사용한 모듈의 버전을 명시하여서 같은 환경에서 작업할 수 있게 보장하는 파일이 package-lock.json파일이다.

package-lock.json파일에 명시된 버전들을 설치하려면 다음과 같은 명령어를 이용하면 된다.
```
npm clean-install
```
혹은
```
npm ci
```  
<br>

### node_modules
프로젝트에서 사용되는 모듈들이 설치되는 폴더이다.  
.gitignore 부분에서 설명했듯 git에 저장 시 무시해도 된다.  
<br>

### public
앱 컴파일 시 사용하지 않는 파일들을 넣는 폴더이다.

절대경로를 이용할 수 있기 때문에 import가 필요 없다는 특징이 있으며, index.html파일이 구성되는 폴더이기도 하다.

절대경로 이용이 가능하기 때문에 경로가 바뀌더라도 일일이 다 수정해야할 필요가 없다. 그렇기에 경로를 동적으로 참조해야 할 때 퍼블릭 폴더를 이용한다.  
<br>


### src
개발하면서 작업하는 파일들을 넣는 폴더이다. 그렇기에 주로 이루어질 작업들도 해당 폴더에서 진행된다.

실질적인 source들이 구성되기에 이 폴더는 가장 큰 중요도를 가진다.


public폴더와는 다르게 상대경로로 import해와야 한다. 이미지도 require를 통해서 상대경로로 가져와야 한다.
```html
public에서는
<img src="/image.jpg" />

src에서는
<img src={require('../../image.jpg')} />
```  
<br>

### public/favicon.ico
한글로 파비콘이라고도 표기하며, 웹 페이지를 열었을 때 상단 탭에 보여지는 아이콘이다.
![파비콘이 포함된 이미지](/images/tech/react/react-favicon.png)
좌측 아이콘이 파비콘이다.  
<br>

### public/index.html
기본이 되는 HTML파일로 해당 파일의 root를 기반으로 가상 DOM Root가 생성된다.  
<br>

### public/manifest.json
웹 애플리케이션 정보가 담겨있는 파일이다.

이름, 저작자, 아이콘, 버전등이 담겨있다.  
<br>


### public/robots.txt
웹사이트에 웹 크롤러같은 로봇들의 접근을 제어하기 위한 규약으로 크롤링 로봇 프로그램이 웹 사이트를 방문하면 robots.txt의 파일에 적힌 규약대로 내용을 수집한다.  
<br>


### src/App.css
App.js에서 구성한 html 태그의 스타일을 설정하는 css파일이다.  
<br>


### src/App.js
웹 페이지를 구성하는 중요한 파일이다.

해당 파일 속 App 컨테이너가 export되어 최종적으로 화면에 보여지는 결과가 된다.  
<br>

### src/index.css, src/index.js
index.html 파일과 연결되는 css, js파일이다.

index.css는 App.css와 이름으로 인해 충돌하는 것을 방지하기 위해 분리해서 사용한다.

이 중 App.css가 더 우선시 되어서 적용된다.

(예를 들어 index.css와 App.css에 어떤 상자의 배경색이 각각 주황색, 노란색이 되도록 설정하면 App.css의 내용이 적용되어 노란색 상자가 된다.)

index.js에서는 index.html의 root를 이용해 React Dom을 생성한 후 App.js를 렌더링한다.  
<br>


### src/reportWebVitals.js
웹에서 사용자 경험에 영향을 미치는 값들(로딩속도, 다음 액션 가능 시간 등)을 측정하는 js파일이다.

사용자 편의를 위한 것이기 때문에 없어도 무방하다.  
<br>



### src/App.test.js, src/setupTests.js
웹 개발 시 테스트를 위한 파일들이다.  
<br>