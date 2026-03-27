---
title: "Native CSS: 컨테이너 쿼리(Container Queries)"
description: ""
category: "web"
date: 2025-08-22
---
<br>


## 컨테이너 쿼리

at-rule에 해당하는 컨테이너 쿼리는 요소의 컨테이너(부모 요소)의 크기나 상태에 따라 스타일을 적용하는 CSS 기능이다.  
미디어 쿼리가 “브라우저 전체 크기”를 기준으로 한다면, 컨테이너 쿼리는 “특정 부모 요소의 크기”를 기준으로 한다.

```css
/* 미디어 쿼리: 브라우저 전체 기준 */
@media (min-width: 768px) {
  .card { /* 모든 카드에 적용 */ }
}

/* 컨테이너 쿼리: 특정 컨테이너 기준 */
@container (min-width: 300px) {
  .card { /* 해당 컨테이너 안의 카드만 */ }
}
```

이렇게 하면 컴포넌트 단위로 더 세밀한 반응형 디자인이 가능하다.

<br>

## 컨테이너 쿼리 사용법

1단계: 컨테이너 지정  
먼저 부모 요소에 \`container-type\` 속성으로 “이 요소가 컨테이너다”라고 알려줘야 한다.

```css
.sidebar {
  container-type: inline-size; /* 가로 크기만 기준 */
}
```

<br>

2단계: 쿼리 작성  
그다음 \`@container\` 규칙으로 조건을 정의한다.

```css
@container (min-width: 300px) {
  .sidebar .card {
    display: flex; /* 넓어지면 가로 배치 */
  }
}

@container (max-width: 299px) {
  .sidebar .card {
    display: block; /* 좁아지면 세로 배치 */
  }
}
```

<br>

## container-type의 종류와 차이점

\`container-type\`에는 몇 가지 값이 있는데, 각각 동작 방식이 다르다.

inline-size vs size

| 속성값 | 기준 | 특징 |
| --- | --- | --- |
| inline-size | 가로 크기만 | 세로는 자식 콘텐츠 영향 받음 |
| size | 가로+세로 모두 | 자식 콘텐츠와 완전 독립 |

```css
/* inline-size: 가로만 독립적 */
.container-1 {
  container-type: inline-size;
  width: 500px; /* 가로는 고정 */
  /* 높이는 자식 콘텐츠에 맞춰 자동 조절 */
}

/* size: 가로+세로 모두 독립적 */
.container-2 {
  container-type: size;
  width: 500px;
  height: 300px; /* 높이도 반드시 지정해야 함 */
}
```

<br>

## 컨테이너 쿼리에서 사용할 수 있는 조건들

컨테이너 쿼리는 크기뿐만 아니라 다양한 조건을 지원한다.

<br>

크기 조건

```css
@container (min-width: 400px) { }
@container (height > 300px) { }
@container (inline-size < 500px) { }
```

<br>

스타일 조건

```css
@container style(background-color: blue) {
  .child { color: white; }
}
```

<br>

복합 조건

```css
@container style(background-color: blue) {
  .child { color: white; }
}
```

<br>

## 미디어 쿼리와 컨테이너 쿼리 비교

| 구분 | 미디어 쿼리 | 컨테이너 쿼리 |
| --- | --- | --- |
| 기준 | 브라우저 뷰포트 | 특정 컨테이너 |
| 범위 | 전체 페이지 | 해당 컨테이너 내부만 |
| 세밀도 | 거시적 | 미시적 (컴포넌트 단위) |

<br>

## 컨테이너 이름 지정하기

container-name을 지정하면 컨테이너의 이름을 설정하여 특정 컨테이너만 대상으로 컨테이너 쿼리 기능을 추가할 수 있다.

```css
.sidebar {
  container-type: inline-size;
  container-name: sidebar;
}

.main-content {
  container-type: inline-size;
  container-name: main;
}

/* 특정 컨테이너만 대상으로 */
@container sidebar (min-width: 300px) {
  .sidebar .widget { font-size: 14px; }
}

@container main (min-width: 600px) {
  .main-content .article { column-count: 2; }
}
```

<br>

## 마무리

이전에 컨테이너 쿼리에 대해 조사를 한 적이 있었는데, 그것이 Native CSS와 관련되어 있다는 것은 몰랐다.

컨테이너 쿼리 기능을 통해 반응형 디자인을 실현할 수 있다.

컨테이너로 지정된 요소는 container-type에 따라 레이아웃이 독립적으로 계산될 수 있으므로 주의해야 한다.

컨테이너 쿼리 이외의 at-rule도 조사해보아야 겠다.