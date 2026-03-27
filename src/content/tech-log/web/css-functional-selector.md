---
title: "Native CSS: 함수형 셀렉터(Functional Selector)"
description: ""
category: "web"
date: 2025-08-21
---
<br>


## 함수형 셀렉터(Functional Selector)

함수형 셀렉터는 괄호 \`()\` 안에 여러 선택자나 조건을 인자로 받아서 동적으로 요소를 선택하는 고급 CSS 선택자다.

이름에서 알 수 있듯이 프로그래밍의 “함수” 개념과 비슷하다. 인자를 받아서 결과를 반환하는 형태 말이다.

```css
/* 기존 방식: 반복적이고 길다 */
h1 { color: red; }
h2 { color: red; }
.title { color: red; }

/* 함수형 셀렉터: 간결하고 직관적 */
:is(h1, h2, .title) {
  color: red;
}
```

확실히 코드가 간결해지고 의도도 명확해진다.

<br>

## 주요 함수형 셀렉터들

**:is()**  
\`:is()\`는 괄호 안에 나열된 선택자 중 하나라도 일치하면 해당 요소를 선택한다.

```css
:is(header, main, footer) h1 {
  font-size: 2rem;
}
```

→ header, main, footer 안에 있는 h1 요소들을 모두 선택

<br>

**:where()**  
\`:where()\`는 \`:is()\`와 동일하게 동작하지만, 구체성(Specificity) 값이 항상 0이다.

```css
:where(h1, h2, .title) {
  margin: 0; /* 기본 스타일 */
}

h1 {
  margin: 10px; /* 이게 우선 적용됨 */
}
```

주로 기본 스타일이나 리셋 CSS에서 유용하다. 나중에 다른 스타일이 쉽게 덮어쓸 수 있기 때문이다.

<br>

_※ 구체성(Specificity) 값이란?_

_구체성 값은 여러 CSS 스타일 규칙이 동일한 요소에 적용될 때, 어떤 규칙이 우선 적용될지 결정하는 수치적 기준이다._  
_선택자가 얼마나 명확하고 세부적으로 특정 요소를 지정했는지를 나타내며, 구체성 값이 높을수록 우선적으로 적용된다._

<br>

_구체성 값은 \*\*4가지 숫자(a, b, c, d)\*\*로 이루어진다._  
_• a: 인라인 스타일 (ex. \`<div style="color:red">\`)_  
_• b: ID 선택자 (ex. \`#my-id\`)_  
_• c: 클래스 선택자, 속성 선택자, 가상 클래스 (ex. \`.btn\`, \`type="text"\`, \`:hover\`)_  
_• d: 요소 선택자, 가상 요소 (ex. \`div\`, \`h1\`, \`::before\`)_  
_각 선택자별로 해당하는 숫자가 더해지고, 왼쪽 자리부터 크기를 비교해 우선순위를 결정한다._

<br>
  
**:has()**  
\`:has()\`는 특정 자식 요소가 있는지에 따라 부모 요소를 선택할 수 있다.

```css
div:has(> img) {
  border: 2px solid blue;
}
```

→ 직접 자식으로 img를 가진 div에 테두리 적용  
이전까지는 “부모 선택자”가 불가능했는데, \`:has()\`가 그 문제를 해결해줬다.

<br>

**:not()**  
\`:not()\`은 괄호 안의 선택자를 제외한 요소를 선택한다.

```css
p:not(.highlight) {
  color: gray;
}
```

→ \`.highlight\` 클래스가 없는 p 요소만 회색으로

<br>

## 함수형 셀렉터의 특징

<br>

**구체성 처리 방식이 다름**  
• \`:is()\`: 내부 선택자 중 가장 높은 구체성 적용  
• \`:where()\`: 항상 구체성 0

<br>

**표현력 대폭 향상**  
• 복잡한 조건을 간단하게 표현  
• 코드 중복 제거

<br>

**브라우저 호환성**  
• 내부적으로는 평면 CSS로 변환되어 처리  
• 기존 CSS 시스템과 완전 호환

<br>

## Pseudo-class 전체 체계에서의 위치

함수형 셀렉터들은 사실 \*\*Pseudo-class(의사 클래스)\*\*의 한 종류다.  
Pseudo-class는 콜론(\`:\`)으로 시작하는 선택자들로, 요소의 상태나 조건에 따라 스타일을 적용한다.

**Pseudo-class 분류**

| 범주 | 예시 | 용도 |
| --- | --- | --- |
| 상태 기반 | :hover | 사용자 상호작용 |
| 입력/폼 상태 | :checked | 폼 요소 상태 |
| 구조 기반 | :first-child | 문서 구조상 위치 |
| 관계 기반 | :is() | 조건부 및 관계형 선택 |
| 미디어/상태 | :fullscreen | 특수 상태 |

함수형 셀렉터들은 주로 “관계 기반” 카테고리에 속한다.

<br>

_※ Pseudo-class vs Pseudo-element_

_Pseudo-class (\`:\`): 요소의 상태나 조건으로 선택_  
_Pseudo-element (\`::\`): 요소 내의 특정 부분이나 가상 요소 생성_

```css
/* Pseudo-class: 상태 기반 선택 */
a:hover { color: red; }

/* Pseudo-element: 가상 요소 생성 */
p::before { content: "→"; }
```