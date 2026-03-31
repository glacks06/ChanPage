---
title: "Proxy"
description: "Javascript"
category: "language"
date: 2025-11-10
---

<br>


## Proxy의 기본 개념과 구조

Proxy는 원본 객체에 대한 '중개인' 또는 '게이트키퍼' 역할을 한다. 코드 자체가 다른 코드를 조작하는 메타프로그래밍(Metaprogramming)의 핵심 기능이라 할 수 있다.

Proxy는 `new Proxy(target, handler)` 생성자를 통해 만든다.
* **target:** 가로챌 대상이 되는 원본 객체 (비유: 아파트 빌딩)
* **handler:** '트랩(trap)' 함수들이 정의된 규칙서 객체 (비유: 도어맨의 매뉴얼)

<br>

## handler의 get 트랩과 반환값 문제

Proxy를 사용할 때 `get` 트랩에서 의도치 않게 `undefined`가 반환되는 오류를 자주 겪곤 한다.  
이는 `handler`의 `get` 트랩이 단순히 값을 '감시'만 하는 것이 아니라, 원본을 대신하여 값을 '반환'할 책임까지 지고 있기 때문이다. 

트랩 함수에서 `return` 키워드를 생략하면 자바스크립트 특성상 기본적으로 `undefined`를 반환하게 된다.  
따라서 `get` 트랩 안에서는 반드시 원본 객체의 값을 반환해야 하며, 안전성을 위해 `Reflect.get`을 사용하는 것이 가장 권장된다.

```javascript
const handler = {
    get(target, prop, receiver) {
        console.log(`[로그] ${prop} 접근`);
        
        // return; // (X) 이렇게 하면 undefined가 반환됨
        
        // (O) 반드시 값을 반환해야 함
        return Reflect.get(target, prop, receiver); 
    }
};
```

<br>

## Proxy의 핵심 사용 사례

Proxy를 활용하면 원본 객체를 전혀 수정하지 않고도 강력한 기능들을 덧붙일 수 있다.

| 활용 사례 | 설명 | 특징 |
|---|---|---|
| **반응형 (Reactivity)** | `set` 트랩을 사용해 객체의 속성 변경을 감지함 | 값이 변경될 때마다 UI 업데이트 함수 등을 자동 호출 (Vue.js의 핵심 원리) |
| **데이터 유효성 검사 (Validation)** | `set` 트랩에서 비즈니스 로직(예: 나이는 0 초과)을 강제함 | 잘못된 데이터가 객체에 할당되는 것을 원천적으로 차단 |
| **가상 속성 (Virtualization)** | `get` 트랩을 사용해 실제 존재하지 않는 속성을 동적으로 계산함 | `firstName`과 `lastName`만으로 `fullName`을 조합하여 반환 가능 |

<br>

## handler의 13가지 트랩

`handler`에는 객체의 속성을 읽고(`get`) 쓰는(`set`) 것 외에도, 객체의 거의 모든 내부 동작을 가로챌 수 있는 총 13개의 트랩(Trap)이 존재한다.

※ 주요 트랩 종류:
* `apply`: 함수가 호출될 때 가로챔 (`proxy(...)`)
* `construct`: `new` 키워드로 인스턴스가 생성될 때 가로챔 (`new proxy()`)
* `has`: `in` 연산자를 쓸 때 가로챔 (`'key' in proxy`)
* `deleteProperty`: `delete` 연산자를 쓸 때 가로챔
* `ownKeys`: `Object.keys()` 등으로 키 목록을 조회할 때 가로챔