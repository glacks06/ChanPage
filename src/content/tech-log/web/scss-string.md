---
title: "SCSS의 string, 무한반복 @while, 모듈시스템"
description: ""
category: "web"
date: 2025-08-15
---
<br>


## Sass의 기본 데이터 타입과 문자열 다루기

Sass에는 여러 데이터 타입이 있는데, 그중에서도 \`string\` 타입은 따옴표 유무에 따라 CSS 출력이 달라진다.  
예를 들어 \`quote()\` 함수는 문자열에 따옴표를 붙여주고, \`unquote()\` 함수는 그걸 제거해 준다.

```scss
@debug quote(hello);   // "hello"
@debug unquote("hi");  // hi
```

그렇다면 실제 CSS에서는 언제 따옴표가 필요할까?  

<br>

**따옴표 필요한 경우**  
• \`font-family\`에 공백이나 특수문자가 있을 때 → \`"Times New Roman"\`  
• \`content\` 속성에서 글자 그대로 출력할 때  
• URL에 공백이 포함된 경우

  
**따옴표 불필요한 경우**  
• 색상명: \`red\`, \`blue\`  
• 공백 없는 글꼴명: \`Arial\`  
• 예약어 글꼴명: \`serif\`, \`sans-serif\`

<br>

## Sass 제어문과 디버그 출력

Sass도 반복문을 지원하는데, 그중 \`@while\`은 조건이 참일 동안 반복한다.  
다만 탈출 조건 없이 쓰면 컴파일이 무한 루프에 빠져서 CPU가 꽉 찰 수 있다.

```scss
$i: 0;
@while $i < 3 {
  @debug $i;
  $i: $i + 1;
}
```

<br>

## Sass 모듈 시스템: \`@use\`, \`@forward\`, \`\_index.scss\`

Sass는 예전의 \`@import\` 대신 \`@use\`와 \`@forward\`를 쓰는 모듈 시스템을 제공한다.

<br>
  
**• \`@use\`**  
불러온 모듈은 네임스페이스를 반드시 붙여서 사용해야 한다.  
같은 모듈을 여러 번 불러와도 한 번만 로드되고, 전역 변수 오염을 막아준다.

```scss
@use 'utils/colors';

body {
  color: colors.$primary;
}
```

<br>

**• \`@forward\`**  
다른 모듈의 내용을 재노출해서 한데 묶을 수 있다.  
\`as\`, \`hide\`, \`show\` 옵션으로 이름을 바꾸거나 일부만 노출 가능하다.



1. 기본 \`@forward\`  
여러 모듈(파일)의 내용을 한 곳으로 모으기

```scss
// _colors.scss
$main: #0099ff;
$accent: #ff0099;

// _fonts.scss
$heading: "Noto Sans";
$body: "Roboto";

// _index.scss
@forward "colors";
@forward "fonts";
```

<br>

2. \`as\` 옵션: 접두사 붙이기

```scss
// _shapes.scss
$circle-radius: 50%;
@mixin square { border-radius: 0; }

// _index.scss (폴더 entry point)
@forward "shapes" as shape-*;
```

사용할 때:

```scss
@use 'components/index';

.box {
  border-radius: components.shape-circle-radius;
  @include components.shape-square;
}
```

<br>

3. \`hide\` 옵션: 특정 항목 숨기기

```scss
// _utils.scss
@mixin clearfix { /* ... */ }
@mixin reset { /* ... */ }
$mixin-version: 1;

// _index.scss
@forward "utils" hide clearfix;
```

사용할 때:

```scss
@use 'index';

// @include index.clearfix; // 불가능(숨겨짐)
@include index.reset; // 가능
```

<br>

4. \`show\` 옵션: 일부만 선택적으로 노출

```scss
// _sizes.scss
$small: 12px;
$large: 32px;
$medium: 20px;

// _index.scss
@forward "sizes" show $small, $large;
```

사용할 때:

```scss
@use 'index';

.title { font-size: index.$small; }   // 가능
.text { font-size: index.$large; }    // 가능
// index.$medium; // 직접 접근 불가(노출 안 함)
```

<br>

**• \`\_index.scss\`**  
폴더 안에 \`\_index.scss\`가 있으면 \`@use '폴더명'\`만으로 해당 파일이 자동 로드된다.  
여기 안에서 \`@forward\`를 쓰면 폴더 단위로 모듈을 묶을 수 있다.

_※ @import 대신 @use가 권장되는 이유 중 하나_

<br>

_1. \`@import\`_  
_• 모든 변수, 믹스인, 함수가 전역(global)에 노출되어 이름 충돌·관리 어려움이 발생._  
_• 같은 파일을 여러 번 불러오면 중복 실행 및 불필요한 CSS 생성._  
_• 대규모 프로젝트에서 유지보수성이 낮고, 공식적으로 폐기(deprecated) 예정임._  

<br>

_2. \`@use\`_  
_• 네임스페이스 기반으로 변수·함수 충돌 없이 명확하게 관리._  
_• 여러 번 불러와도 한 번만 포함되어 효율적이고, 컴파일 결과가 깔끔함._  
_• 매번 모듈명(별칭)으로 접근해서 코드 출처와 의존성이 분명해짐._

<br>

## 마무리

프로그래밍적인 사고가 가능한 스타일링 언어다.  
• 문자열 처리, 타입 확인, 함수 참조 → 데이터 다루는 능력  
• 제어문과 디버그 → 로직 제어와 분석  
• 모듈 시스템 → 코드 구조화와 재사용성 극대화