---
title: "CSS의 선택자들(Selectors)"
description: ""
category: "web"
date: 2025-03-14
---
<br>

선택자(Selector)는 CSS 규칙을 적용할 요소를 선택한다.

웹에서 HTML을 구성하고, 구성한 요소들을 꾸미는 과정에서 CSS를 이용하게 되는데, 이때 특정 요소(태그)를 특정지어서 속성을 바꾸기 위해 선택자를 사용한다.

Selector의 종류는 5가지이다.

-   Simple Selector
-   Combinator Selector
-   Pseudo-class Selector
-   Pseudo-element Selector
-   Attribute Selector

## Simple Selector

Simple Selector는 이름, id, class룰 기반으로 요소를 선택한다.

\- **Element 이름 기반**

HTML에는 div, p 등과 같은 태그들이 있다.

이러한 태그의 이름을 기반으로 요소를 선택할 수 있다.

```css
p {
  text-align: center;
  color: red;
}
```

\- **id 기반**

HTML에서는 태그에 id부여해서 요소를 특정지을 수 있다.

여기서 주의해야할 점은 페이지 내에서 id는 유니크하기 때문에 같은 id값을 여러 태그에 부여하면 안된다는 점이다.

태그에 id를 부여할 때는 다음과 같은 방법으로 부여한다.

```html
<div id="left_box"> </div>
```

css에서 특정 id를 선택할 때에는 다음과 같이 샾(#)기호를 id name 앞에 붙여 선택한다.

```css
#left_box{
    width: 10px;
    height: 10px;
}
```

\- **class 기반**

언뜻보면 id와 비슷해보이나 큰 차이점이 있다.

태그에 class name을 부여해서 해당 요소를 선택한다는 점은 같다.

그러나 하나의 태그에만 id name을 부여해야한다는 점과는 다르게 class는 여러 요소들을 선택하기 위한 Selector이다.

따라서 특정 속성을 지닌 어떠한 그룹을 만들고 싶을 때 사용할 수 있다.

class name은 다음과 같은 방식으로 부여할 수 있다.

```html
<div class="box"></div>
<div class="box"></div>
<div class="box"></div>
```

css에서 특정 class를 선택할 때에는 다음과 같이 온점 기호를 class name 앞에 붙여 선택한다.

```css
.box {
    width: 50px;
    height: 50px;
}
```

\- **그 외**

'\*' 기호를 사용하면 모든 태그를 선택할 수 있다. (Universal Selector)

```
* {
    color: red;
}
```

<br>

## Combinator Selector

combinate는 '결합된'을 의미하므로 combinator란 결합자를 뜻한다.

html의 여러 태그들은 형제, 부모, 자식 관계로 결합되어 있다. 이러한 관계를 기반으로 특정 Element를 선택하는 것이 combinator 결합자이다.

Combinator Selector의 종류는 다음과 같다.

-   Descendant Combinator
-   Child Combinator
-   Next-Sibling Combinator
-   Subsequent-Sibling Comvinator

\- **Descendant Combinator**

```css
div p{
    font-size: 40px;
}
```

두 태그를 공백으로 구분하면 앞의 태그의 '모든 자식들' 중 뒤의 태그에 해당하는 Element를 선택하게 된다.

즉, 위와 같은 예시의 경우 div 안에 있는 모든 p들의 폰트 크기가 40px이 되는 것이다.

\- **Child Combinator**

```css
div > p{
    font-size: 40px;
}
```

두 태그를 '>' 기호로 구분하면 앞의 태그의 '직계 자식들' 중 뒤의 태그에 해당하는 Element를 선택하게 된다.

즉, 위와 같은 예시의 경우 div의 직계 자식(쉽게말해 바로 아래 단계 태그들)에 해당하는 p들의 폰트 크기가 40px이 되는 것이다.

\- **Next-Sibling**

```css
div + section{
    width: 10px;
    height: 10px;
}
```

Sibling은 형제, 자매라는 뜻이다.

따라서 Next-Sibling은 다음 형제라는 뜻인데, 두 태그를 '+' 기호로 구분하면 앞의 태그의 바로 다음 형제에 해당하는 Element를 선택하게된다.

즉, 자신 바로 다음에 오는 태그를 선택하는 것이다.

위와 같은 예시의 경우 div의 바로 다음에 오는 section의 크기를 지정하게 되는 것이다.

\- **Subsequent-Sibling**

```css
div ~ section{
    width: 10px;
    height: 10px;
}
```

Subsequent는 '후속하는', '뒤따르는' 을 의미한다.

따라서 Subsequent-Sibling은 뒤따르는(후속하는) 형제라는 뜻인데, Next-Sibling이 바로 인접한 형제를 선택하는 것이였다면 Subsequent-Sibling은 모든 형제 중에서 선택한다.

따라서 두 태그를 '~' 기호로 구분하면 앞의 태그의 모든 형제 중 뒤의 태그에 해당하는 Element를 선택하게 된다.

위와 같은 예시의 경우 div의 모든 형제 중 section의 크기를 지정하게 된다.

_※ 참고_

```html
<div>
	<p> <!-- 부모인 div와 직계자손 관계 -->
    	<b></b> <!-- div와는 자손관계, p와는 직계자손관계 -->
    </p>
</div>

<article> <!-- 바로 위 div와 형제관계 -->
</article>

<section> <!-- div와는 형제관계, article과는 인접 형제 관계 -->
</section>
```

<br>

## Pseudo-class Selector

다음은 Pseudo의 사전적 의미이다.

> pretending to be something it is not

'무언가가 아니면서 그런 척 하는 것'

한마디로 '가짜의', '허위의'라는 뜻이다.

'의사'라고도 해석하며 이때의 의사는 '비교할 의', '비슷할 사'이다.

즉, 비교했을 때 비슷하다는 의미이다.

※ Pseudo를 '가상의'로 해석하여서 가상 클래스라고도 불린다.

왜 이러한 이름이 붙여졌을까?

그 이유는 Pseudo-Class가 Class와 비슷하지만 좀 다르기 때문이다.

Class가 특정한 Element를 직접적으로 선택한다면 Pseudo-Class는 Element의 구조나 상태를 기반으로 선택한다.

따라서 class는 html문서 상에서 확인해볼 수 있지만 Pseudo-Class는 구조나 상태에 따라 선택하기에 HTML 문서의 실제 구조에는 포함되어있지 않다.

마치 class를 사용하는 듯 한데 그렇지 않은 것이다. (존재하지 않는 Class를 사용한 느낌)

그래서 Class와 비슷하면서도 아니기에 'Pseudo'라는 표현이 붙었다.

Pseudo-Class 선택자들은 다음과 것들이 있다. (From ChatGPT)

#### **1\. 동적 상태 관련 선택자**

-   :hover → 요소 위에 마우스를 올렸을 때
-   :active → 요소가 클릭된 상태일 때
-   :focus → 요소가 포커스를 받을 때
-   :visited → 사용자가 방문한 링크

#### **2\. 구조적 선택자**

-   :first-child → 첫 번째 자식 요소
-   :last-child → 마지막 자식 요소
-   :nth-child(n) → n번째 자식 요소
-   :nth-last-child(n) → 뒤에서 n번째 자식 요소
-   :first-of-type → 특정 타입 중 첫 번째 요소
-   :last-of-type → 특정 타입 중 마지막 요소
-   :nth-of-type(n) → 특정 타입 중 n번째 요소
-   :only-child → 부모 안에 유일한 자식인 요소

#### **3\. 부정 및 특수 선택자**

-   :not(selector) → 지정된 선택자와 일치하지 않는 요소
-   :empty → 내부에 콘텐츠(텍스트, 자식 요소 등)가 없는 요소
-   :root → 문서의 최상위 요소 (<html> 요소)
-   :target → URL의 #id 값과 일치하는 요소

#### **4\. 폼 관련 선택자**

-   :checked → 체크박스 또는 라디오 버튼이 선택된 상태
-   :disabled → 비활성화된 폼 요소
-   :enabled → 활성화된 폼 요소
-   :required → required 속성이 적용된 입력 필드
-   :valid → 입력 값이 유효한 상태
-   :invalid → 입력 값이 유효하지 않은 상태

사용 예시는 다음과 같다.

```css
/* 마우스를 올렸을 때 배경색 변경 */
button:hover {
  background-color: lightblue;
}
/* 홀수 번째 리스트 아이템 선택 */
li:nth-child(odd) {
  background-color: lightgray;
}
/* 활성화되었을 때(마우스를 올렸을 때) 스타일 변경 */
input:focus {
  border: 2px solid blue;
}
/* 비활성화되었을 때(마우스를 올리지 않았을 때) 버튼 흐리게 표시 */
button:disabled {
  opacity: 0.5;
}
```

특히 위의 동적 상태 관련 선택자들과 같이 선택한 요소가 특정 상태(예: 마우스와 상호작용)를 충족했을 때 적용되는 선택자들을 'States'라고도 부른다.

<br>

## Pseudo-Element Selector

이번에는 Pseudo-Element 즉, 가상요소이다.

선택한 요소의 일부분에 스타일을 적용시킬 수 있는 선택자로, Element가 없는데 마치 Element를 선택한 것 처럼 보인다.

이 또한 Pseudo-Class처럼 HTML의 실제 구조에는 포함 되어있지 않다.

Pseudo-Element 선택자의 종류로는 다음과 같은 것들이 있다. (From ChatGPT)

-   ::before → 요소의 **앞쪽**에 가상의 콘텐츠를 추가
-   ::after → 요소의 **뒤쪽**에 가상의 콘텐츠를 추가
-   ::first-letter → 요소의 **첫 번째 글자**에 스타일 적용 (블록 요소만 가능)
-   ::first-line → 요소의 **첫 번째 줄**에 스타일 적용 (블록 요소만 가능)
-   ::selection → 사용자가 **드래그하여 선택한 텍스트**의 스타일 변경
-   ::placeholder → `<input>` 요소의 **placeholder(미리보기 텍스트)** 스타일 변경
-   ::file-selector-button → `<input type="file">` 요소의 **"파일 선택" 버튼** 스타일 변경
-   ::marker → 리스트 아이템(`<li>`)의 **불릿(•, 1. 등)** 스타일 변경
-   ::backdrop → `<dialog>`(모달) 요소의 **배경 스타일** 변경

사용 예시는 다음과 같다.

```css
button::before { /* 요소 앞에 content 추가 */
  content: "🚀 ";
}
button::after { /* 요소 뒤에 content 추가 */
  content: " ✅";
}
p::first-line { /* 요소 첫째 줄 폰트, 색상 지정 */
  font-weight: bold;
  color: blue;
}
```

<br>

## Attribute Selector

css에서 Attribute는 Element의 특정 속성 값을 기준으로 스타일 적용이 가능하게 하는 기능이다.

즉, HTML 문서에서 정의한 속성(id, class, type, target 등등)을 기반하여 선택한다.

```css
input[type="password"] {
  background-color: lightgray;
}
```

Attribute Selector의 사용은 위와 같이 태그명 옆에 대괄호(\[\]) 기호를 이용해서 해당 태그명을 가진 Element 중 대괄호 속 속성 혹은 속성값을 가진 Element를 선택한다.

이때 해당 속성을 지닌 Element 선택, 특정 속성 값을 지닌 Element 선택 등 다양한 선택자들이 존재한다.

Attribute 선택자의 종류로는 다음과 같은 것들이 있다. (From ChatGPT)

| \[속성\]  | 속성이 존재하는 요소 선택 |
| --- | --- |
| \[속성="값"\] | 특정 값과 정확히 일치하는 요소 선택 |
| \[속성~="값"\]  | 공백으로 구분된 값 중 하나와 일치하는 요소 선택 |
| \[속성\|="값"\] | 특정 값 또는 값-하이픈(-)으로 시작하는 요소 선택 |
| \[속성^="값"\] | 특정 값으로 시작하는 요소 선택 |
| \[속성$="값"\] | 특정 값으로 끝나는 요소 선택 |
| \[속성\*="값"\] | 특정 값을 포함하는 요소 선택 |

<br>

## 마무리

Pseudo-Class, Pseudo-Element가 왜 Pseudo(가상의)라는 이름이 붙었는지 잘 이해가 안갔었다.

이번 기회에 HTML상에서 Pseudo-Class, Pseudo-Element의 작용을 듣고 납득이 가게 되었다.

또한 다른 선택자들을 종류별로 분리해서 알아보고 정리하다 보니 전보다 정보가 정돈되게 들어온 느낌이다.

조사 과정에서 문득 내가 Attribute와 Property의 차이를 잘 모른다는 것을 깨달았다.

확실히 적으면서 공부하는게 나에게는 최고인 것 같다.