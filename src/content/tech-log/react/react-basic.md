---
title: "React에 대한 기본적인 개념"
description: ""
category: "react"
date: 2025-08-02
---
<br>

React의 기본적인 개념

## React란

React는 Meta(구 Facebook)에서 만든 사용자 인터페이스(UI) 라이브러리다.  
쉽게 말해서 웹사이트의 화면을 만들기 위한 도구라고 보면 된다.

```javascript
// React로 만든 간단한 버튼 컴포넌트
function Button() {
  const [count, setCount] = useState(0);
  
  return (
    <button onClick={() => setCount(count + 1)}>
      클릭 횟수: {count}
    </button>
  );
}
```  
<br>

```javascript
// 기존 방식: 직접 DOM 조작
let count = 0;
const button = document.getElementById('button');
button.addEventListener('click', function() {
  count++;
  button.textContent = `클릭 횟수: ${count}`;
});
```

React는 복잡한 웹 애플리케이션의 UI를 더 쉽고 효율적으로 만들기 위해 탄생했다.  
<br>

## React의 필요성

처음에는 이런 생각을 했다. “기존 JavaScript로도 웹사이트 만들 수 있는데 왜 굳이 React를 써야 하지?”  
하지만 조사해보니 기존 방식에는 꽤 심각한 문제들이 있다는 걸 알게 되었다.  
<br>

## 기존 방식의 문제점들

  
**1. DOM을 직접 건드려야 하는 번거로움**  
원래는 JavaScript로 \`document.getElementById\`나 \`querySelector\` 같은 메서드를 써서 HTML 요소를 직접 찾아 수정해야 했다.

```javascript
// 이런 식으로 일일이 찾아서 수정
const nameElement = document.getElementById('user-name');
const emailElement = document.getElementById('user-email');
nameElement.textContent = '홍길동';
emailElement.textContent = 'hong@example.com';
```  
<br>

**2. 데이터와 화면이 따로 놀기**  
가장 큰 문제가 이거였다.  
JavaScript 변수에는 데이터가 있는데, 화면(DOM)에는 예전 데이터가 그대로 남아있는 경우가 자주 생긴다.  
개발자가 직접 “아, 데이터가 바뀌었으니까 화면도 업데이트해야지”라고 일일이 챙겨야 한다.

```javascript
let userInfo = { name: '홍길동', age: 25 }; // 데이터 변경
// 하지만 화면은 자동으로 바뀌지 않음!
// 개발자가 직접 DOM을 찾아서 업데이트해야 함
document.getElementById('name').textContent = userInfo.name;
document.getElementById('age').textContent = userInfo.age;
```  
<br>

**3. 복잡해질수록 관리 지옥**  
웹사이트가 커지고 기능이 많아질수록 이런 수동 관리는 정말 힘들어진다.  
버그도 자주 생기고, 어디서 뭘 수정해야 하는지 찾기도 어려워진다.  
<br>

## React가 이 문제들을 해결한 방법

**1\. 선언형 프로그래밍**  
React의 가장 큰 특징 중 하나가 선언형 프로그래밍이다.  
기존 방식은 “이 버튼을 찾아서, 텍스트를 바꿔주고, 클래스를 추가해주고…” 이런 식으로 어떻게 할지를 일일이 명령해야 했다.  
하지만 React는 “이 상태일 때 화면이 이렇게 보여야 해”라고 결과만 선언하면 된다.

```javascript
// React: "count가 5일 때 이렇게 보여줘"라고 선언만 하면 됨
function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      {count >= 5 ? (
        <p style={{color: 'red'}}>5 이상이에요!</p>
      ) : (
        <p>현재 숫자: {count}</p>
      )}
    </div>
  );
}
```

어떻게 DOM을 조작할지는 React가 알아서 처리한다.

**2\. Virtual DOM**  
처음에 Virtual DOM이라는 용어를 들었을 때 “가상 DOM이 뭐지?“라는 생각이 들었다.  
알아보니 정말 똑똑한 방식이었다.  
실제 DOM은 브라우저에서 직접 조작하기 때문에 느리다.  
그래서 React는 메모리에 가짜 DOM(Virtual DOM)을 만들어두고, 변화가 생기면 거기서 먼저 계산한다.  
그 다음에 “아, 여기만 바뀌었네”라고 파악해서 실제 DOM에서는 꼭 필요한 부분만 수정한다.

```javascript
// 데이터가 바뀌면...
const [todos, setTodos] = useState([
  { id: 1, text: '공부하기', done: false },
  { id: 2, text: '운동하기', done: true }
]);

// React가 알아서 변경된 부분만 찾아서 업데이트
setTodos([
  { id: 1, text: '공부하기', done: true }, // 이 부분만 바뀜
  { id: 2, text: '운동하기', done: true }
]);
```

**3\. 컴포넌트**  
React의 또 다른 핵심이 컴포넌트다.  
웹페이지를 작은 조각들로 나눠서, 각각을 독립적으로 만들고 조립하는 방식이다.  
마치 레고 블록을 조립하는 것처럼 말이다.

```javascript
// Header 컴포넌트
function Header() {
  return <h1>내 블로그</h1>;
}

// TodoItem 컴포넌트  
function TodoItem({ text, done }) {
  return (
    <li style={{textDecoration: done ? 'line-through' : 'none'}}>
      {text}
    </li>
  );
}

// 이렇게 조립해서 사용
function App() {
  return (
    <div>
      <Header />
      <TodoItem text="React 공부" done={true} />
      <TodoItem text="블로그 쓰기" done={false} />
    </div>
  );
}
```

이렇게 하면 각 컴포넌트를 다른 곳에서도 재사용할 수 있고, 문제가 생겼을 때도 해당 컴포넌트만 수정하면 된다.

## 기존 방식과 React 방식 비교

정리하면 이런 차이가 있다.

| 구분 | 기존방식 | React 방식 |
| --- | --- | --- |
| DOM 조작 | 직접 찾아서 수정 | 자동으로 최적화해서 수정 |
| 데이터, 화면 연동 | 수동으로 동기화 | 자동으로 동기화 |
| 코드구조 | 절차적, 명령형 | 선언형, 컴포넌트 기반 |
| 성능 | 비효율적 DOM 조작 | Virtual DOM으로 최적화 |
| 유지보수 | 복잡해질수록 어려움 | 컴포넌트 단위로 관리 용이 |

## 마무리

더 조사해보고 탐구해보아야 할 키워드들을 찾을 수 있었다.

컴포넌트, virtual dom, 선언형 프로그래밍, 데이터와 UI

이 키워드들에 대해 자세히 탐구해보아야겠다.