---
title: "call by value, call by reference, call by address, call by sharing"
description: ""
category: "terms"
date: 2025-08-25
---
<br>

"call by value와 call by reference의 차이가 항상 헷갈려서 이번 기회에 정리하려고 한다.  
<br>

## call by value vs call by reference 기본 개념

**call by value - "값만 복사해서 줄게"**

call by value는 함수에 **값 자체를 복사**해서 전달하는 방식이다.

```c
#include <stdio.h>

void changeValue(int x) {
    x = 100;  // 복사된 값만 변경
    printf("함수 안: %d\n", x);
}

int main() {
    int a = 50;
    changeValue(a);
    printf("함수 밖: %d\n", a);  // 원본은 그대로 50
    return 0;
}
```

결과:

```
함수 안: 100
함수 밖: 50
```

함수 내에서 아무리 값을 바꿔도 **원본에는 영향이 없다**.  
<br>

**call by reference - "너와 나는 같은 공간을 쓴다"**

call by reference는 매개변수와 인자가 완전히 동일한 메모리 공간을 공유하는 방식이다.

```c
#include <iostream>
using namespace std;

void changeValue(int& x) {  // 참조 매개변수
    x = 100;  // 원본이 직접 변경됨
    cout << "함수 안: " << x << endl;
}

int main() {
    int a = 50;
    changeValue(a);
    cout << "함수 밖: " << a << endl;  // 원본도 100으로 변경
    return 0;
}
```

결과:

```
함수 안: 100
함수 밖: 100
```

참조는 원본 변수의 또 다른 이름(별명)이라고 보면 된다.  
<br>

## call by address - "주소를 복사해서 줄게"

C언어에서는 call by reference가 없는 대신 call by address 방식이 있다.

포인터를 통해 주소값을 복사해서 전달하는 방식이다.

```c
#include <stdio.h>

void changeValue(int* x) {  // 포인터 매개변수
    *x = 100;  // 포인터가 가리키는 값 변경
    printf("함수 안: %d\n", *x);
}

int main() {
    int a = 50;
    changeValue(&a);  // 주소값 전달
    printf("함수 밖: %d\n", a);  // 원본도 100으로 변경
    return 0;
}
```

결과:

```
함수 안: 100
함수 밖: 100
```  
<br>

## call by reference vs call by address 차이점

이 둘은 결과는 비슷하지만 내부 동작이 다르다.

| 구분 | call by reference | call by address |
| --- | --- | --- |
| 메모리 공간 | 원본과 완전히 동일 | 포인터는 별도 공간 차지 |
| 매개변수 재할당 | 원본도 함께 바뀜 | 포인터만 바뀜 (원본 무관) |
| 문법 | `int& x` (C++만) | `int* x` (C/C++) |

```c
// call by reference
void testRef(int& x) {
    x = 200;  // 원본 변수가 200이 됨
}

// call by address  
void testPtr(int* x) {
    x = nullptr;  // 포인터만 바뀜, 원본 무관
    // *x = 200;  // 이렇게 해야 원본 변경
}
```  
<br>

## call by sharing - "참조값을 복사해줄게"

JavaScript, Python, Java 같은 언어에서 객체를 전달할 때 사용되는 방식이다.

참조값(주소)이 복사되어 넘어간다.

```javascript
function changeObject(obj) {
    obj.name = "변경됨";    // 객체 속성 변경 → 원본 영향
    obj = { name: "새객체" };  // 매개변수 재할당 → 원본 무관
}

let person = { name: "원본" };
changeObject(person);
console.log(person.name);  // "변경됨"
```

-   객체의 속성을 바꾸면 원본도 바뀜
-   매개변수 자체를 새로운 객체로 바꾸면 원본은 무관

_※ 주소값 vs 참조값_

_주소값 (Address)은 메모리의 물리적 위치를 나타내는 값으로, 실제 메모리상의 주소를 의미한다. 포인터가 이 주소값을 저장한다._  
_참조값 (Reference)은 객체를 식별하기 위한 논리적 식별자로, 실제 메모리 주소와는 다를 수 있다. Java나 JavaScript에서 사용하는 참조가 대표적이다._  
<br>

## 각 언어별 특징 정리

**C/C++**

-   call by value: 기본형 변수 전달
-   call by address: 포인터 (`int*`)
-   call by reference: 참조 (`int&`, C++만)

**JavaScript/Python**

-   원시 타입: call by value
-   객체/배열: call by sharing (참조값 복사)

**Java**

-   기본형: call by value
-   객체: call by sharing  

<br>

## 성능과 안전성 비교

| 방식 | 장점 | 단점 |
| --- | --- | --- |
| call by value | 원본 안전, 부작용 없음 | 메모리 사용량 증가\[6\] |
| call by reference | 효율적, 직접 수정 가능 | 실수로 원본 변조 위험\[1\] |
| call by address | 유연함, 널 포인터 가능 | 포인터 오류 위험 |
| call by sharing | 객체 공유 편리 | 예상치 못한 변경 가능 |

## 언제 뭘 써야 할까?

**call by value**

-   원본 보호가 중요할 때
-   단순한 계산 함수
-   작은 크기 데이터

**call by reference/address**

-   대용량 데이터 전달
-   함수에서 원본을 수정해야 할 때
-   성능이 중요한 경우

**call by sharing**

-   객체 상태 변경이 필요할 때
-   깊은 복사가 비효율적일 때

<br>

## 마무리

항상 헷갈리던 개념이라 주기적으로 복습이 필요할 것 같다.

또한 언어별로 해당 주제에 대해 어떻게 다루는지도 조사가 더 필요할 것 같다.