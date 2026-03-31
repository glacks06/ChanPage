---
title: "class, 상속"
description: "Javascript"
category: "language"
date: 2025-11-10
---

<br>

## class의 개념과 constructor

ES6(ES2015)에 도입된 `class`는 객체(인스턴스)를 생성하기 위한 '설계도' 또는 '붕어빵 틀' 역할을 한다.  
이는 자바스크립트에 새로운 객체 지향 모델이 추가된 것이 아니라, 기존의 다소 복잡했던 프로토타입 기반 상속을 더 명료하고 다른 언어와 유사하게 사용할 수 있도록 문법적으로 다듬은 것이다.

※ constructor (생성자): `new` 키워드로 클래스의 새 인스턴스를 생성할 때 단 한 번 호출되는 특별한 메서드이다. 주로 `this` 키워드를 사용하여 인스턴스의 초기 속성(데이터)을 설정하는 역할을 한다.

<br>

## 상속 (extends와 super) 및 핵심 오류

`extends` 키워드를 사용하면 부모 클래스의 기능(속성과 메서드)을 그대로 물려받는 자식 클래스를 만들 수 있다.
이때 상속을 구현하면서 가장 빈번하게 발생하는 오류는 `super()` 호출의 위치와 관련이 있다.

`extends`로 상속받은 자식 클래스의 `constructor` 내부에서는, `this` 키워드를 사용하기 전에 **반드시 `super()`를 먼저 호출**해야 한다는 엄격한 규칙이 존재한다.

_※ super()를 먼저 호출해야 하는 이유: `super()`는 부모 클래스의 생성자를 호출하여 객체의 기본 구조(부모의 속성)를 먼저 설정하고 `this`를 초기화하는 역할을 담당한다. 이 과정을 거치지 않으면 `this` 자체가 아직 메모리에 존재하지 않아 참조 에러가 발생하게 된다._

<br>

## 올바른 구현 예시

```javascript
// [잘못된 코드]
class Child extends Parent {
    constructor() {
        this.name = "Child"; // ERROR! 'super()' 호출 전이라 'this'가 존재하지 않음
        super();
    }
}

// [올바른 코드]
class Child extends Parent {
    constructor() {
        super();             // 1. 부모 생성자 호출로 'this' 초기화 완료
        this.name = "Child"; // 2. 이제 'this'를 정상적으로 사용 가능
    }
}
```