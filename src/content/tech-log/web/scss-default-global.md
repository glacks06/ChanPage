---
title: "SCSS. 함수의 인수, !default, !global"
description: ""
category: "web"
date: 2025-08-16
---
<br>


## 필수 인수와 기본값

SCSS에서 함수나 믹스인 매개변수는 매개변수가 설정되어 있다면 필수로 인수를 주어야 한다.

인수를 안 주면 에러가 난다.  
하지만 기본값을 넣어주면 호출할 때 생략이 가능하다.

```scss
@function add300($size: 0) {
  @return $size + 300px;
}
```

→ \`$size\`를 안 넘겨도 기본값 \`0\`이 들어가서 \`300px\`이 반환된다.

<br>

## 가변 인수 (…)

세 점(\`...\`)을 붙이면 인수를 몇 개든 받을 수 있다.  
안 넘기면 빈 리스트가 된다.

```scss
@mixin test($args...) {
  @each $arg in $args {
    .item-#{$arg} { width: $arg * 1px; }
  }
}

@include test(100, 200, 300);
```

→ \`.item-100\`, \`.item-200\`, \`.item-300\`이 자동으로 생성된다.

<br>

## 키워드 인수

SCSS 함수나 믹스인 호출 시, 인수를 이름=값 방식으로 넘길 수도 있다.  
순서 상관없이 매개변수 이름만 맞으면 된다.

```scss
@mixin button($size, $color) {
  font-size: $size;
  color: $color;
}

@include button($color: red, $size: 16px);
```

→ 순서를 섞어도 문제없이 적용된다.  
단, SCSS는 가변 키워드 인수(\`...\` in kwargs)를 지원하지 않는다.  
즉, 정의되지 않은 이름을 쓰면 바로 에러가 난다.

<br>

## 리스트 vs 단일값 연산

숫자가 있는 값과 리스트를 직접 더할 수는 없다.

```scss
50px + (10px, 20px) // 에러
```

리스트 내 요소별로 계산하려면 반복문에서 하나씩 꺼내 써야 한다.

<br>

## 변수 스코프와 플래그

<br>

**!default**  
이미 값이 존재하는 변수를 덮어쓰지 않고, 값이 없을 때만 지정하는 플래그다.  
특히 라이브러리에서 자주 쓰인다. 기본 테마 색상을 설정해 두고, 필요할 때만 바꿀 수 있게 해주는 식이다.

즉, !default는 “이 값이 안 정해져 있으면 기본값을 세팅하되, 이미 값이 있으면 건드리지 마!”라는 역할을 한다.

<br>
  
**!global**  
현재 스코프에서 선언한 변수를 전역으로 확장할 때 사용한다.

```scss
$color: red;

.container {
  $color: blue !global;
}

.box { color: $color; } // blue
```

→ \`!global\`이 없다면 \`$color\`는 여전히 \`red\` 상태일 것이다.  
즉, 전역 변수를 무조건 선언하는 대신 필요할 때 스코프를 확장하는 방식이 더 유연하다.