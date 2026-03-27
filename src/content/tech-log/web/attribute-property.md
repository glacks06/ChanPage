---
title: "Attribute와 Property의 차이"
description: ""
category: "web"
date: 2025-03-19
---
<br>

Web 공부 중 Attribute와 Property가 헷갈려서 조사해보았다.

<br>

## Attribute

Attribute(속성)는 HTML에서 정의된 속성이다.

요소의 추가적인 정보들을 적을 때 사용한다.

```html
<div id="left_box" class="redBox"></div>  <!-- Attribute는 문자열 형태로 저장됨 -->
```

위의 id, class와 같이 태그명과 함께 적는 내용들이 Attribute이다.

이 외에도 type, value 등 다양한 Attribute들이 있다.

<br>

## Property

Property는 영어사전을 찾아보면 재산이라는 뜻이 있지만 더 자세히 들어가 영영사전의 설명을 보면 '누군가가 소유한 것'이라는 뜻이다.

css는 javascript에서 객체 속성을 저장할 때와 유사하게 스타일을 구성한다. ('key: vlaue' 형태)

```javascript
// JavaScript의 객체
let car = {
  color: "red",  // 객체 속성 (property)
  speed: 200,    // 객체 속성 (property)
};
```
<br>

```css
/* CSS에서의 스타일 정의 */
div {
    width: 10px;
    height: 10px;
}
```

javascript가 가지는 저러한 'key:value'형태의 데이터가 '객체가 소유한 것'이라 하여 property라는 명칭을 사용하고 있다.

이렇다보니 CSS에서의 스타일 지정도 JavaScript의 객체와 유사하여 똑같이 property라는 명칭을 사용하고 있는 것으로 보인다.

Attribute는 HTML 문서에서 설정이 되지만 Property는 DOM에서 설정된다.

HTML 문서의 Attribute도 DOM에 포함이 되지만 DOM에서는 Attribute가 아닌 Property로 표현된다.

그래서 JavaScript로 Attribute값을 바꿔도 Property만 바뀌고 HTML상에서의 Attribute값은 바뀌지 않는다.

_※ 예시_

```javascript
let checkbox = document.getElementById("test");

console.log(checkbox.getAttribute("checked")); // "checked" (문자열, Attribute)
console.log(checkbox.checked);  // true (불리언, Property)

checkbox.checked = false; // Property 변경
console.log(checkbox.getAttribute("checked")); // 여전히 "checked" (Attribute는 그대로)
```

<br>

## 마무리

정리하자면 Attribute는 초기 상태, Property는 현재 상태를 나타낸다는 차이점이 있었다.

이를 통해  같은 웹 관련 파일이라도 그 속에서 부르는 명칭, 특징들이 다름을 인지하게 되었다.