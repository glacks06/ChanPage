---
title: "jQuery란? (javascript)"
description: ""
category: "web"
date: 2025-06-18
---
<br>

## jQuery란

jQuery(제이쿼리)는 오픈소스 자바스크립트 라이브러리 중 하나이다.

이 라이브러리는 HTML 문서의 요소를 쉽고 직관적으로 선택하고 조작할 수 있게 해준다.

-   간편한 요소 선택 및 조작: CSS 선택자와 유사한 문법으로 HTML 요소를 쉽게 선택하고, 속성, 스타일, 내용 등을 변경할 수 있다.
-   이벤트 처리: 클릭, 마우스 오버 등 다양한 사용자 이벤트를 간단하게 처리할 수 있다.
-   애니메이션 및 효과: 요소의 숨김/보이기, 페이드 인/아웃 등 다양한 애니메이션 효과를 쉽게 적용할 수 있다
-   AJAX 통신: 서버와 비동기적으로 데이터를 주고받을 수 있어, 페이지 전체를 새로고침하지 않고도 웹 페이지의 일부를 동적으로 변경할 수 있다.
-   폼 조작: 폼의 데이터 유효성 검사, 데이터 전송 등 폼 관련 작업을 쉽게 처리할 수 있다.

※ AJAX통신

AJAX(Asynchronous JavaScript and XML) 통신이란 웹페이지 전체를 새로고침하지 않고도 서버로부터 필요한 데이터만 받아와서 페이지의 일부를 동적으로 변경할 수 있게 해주는 기술이다. 원래 웹서버는 기본적으로 동기 통신 방식으로 통신한다. 따라서 서버에 어떠한 요청을 보내고 응답을 받을 때마다 페이지를 새로고침 해야한다. 하지만 AJAX 통신은 비동기적으로 JSON, XML 등의 데이터를 요청하고 응답받을 수 있는 기술이기 때문에 페이지를 새로고침하지 않고 DOM 트리를 변경해서 웹페이지의 일부만 바꿀 수 있다. 이 부분에서 React의 기술이 연상된다.

<br>

## 객체 랩핑(wrapping)을 통한 메서드 사용

jquery의 다양한 메서드를 사용하기 위해서는 이용하고자 하는 객체를 랩핑(wrapping)하는 과정이 필요하다.

객체를 랩핑한다는 것은 쉽게 말해 객체를 새로운 객체로 감싸는 것을 의미한다.

즉, 어떠한 객체 내부에 다른 객체가 포함되는 것인데 포함이 된 안쪽 객체는 자신을 감싸고 있는 객체와 연결된 클래스의 메서드에 접근이 가능하다.

예를 들어 Animal이라는 이름의 클래스가 있고, Animal을 통해 cat이라는 객체를 생성했다고 가정해 보자.

이때 Animal이라는 클래스에는 메서드가 하나 있는데, 이 메서드의 이름을 animal\_method라고 해보자.

그리고 여기 Baby라는 이름의 클래스가 있고, Baby를 통해 baby\_cat이라는 객체를 생성했다.

이제 baby\_cat 객체를 cat객체 안에 포함시키는 즉, 랩핑을 하면 cat 안에 baby\_cat이 들어가게 된다.

이때 cat은 이제 Baby의 메서드에 접근이 가능해진다.

따라서 랩핑을 하면 어떠한 객체를 랩핑한 객체는 자신 내부의 객체 그 객체의 메서드에도 접근 가능하고, 자신의 클래스 메서드에도 접근이 가능해져서 마치 기능이 확장된 듯한 효과를 얻을 수 있다.


아래 코드는 위의 예시를 코드화시킨 것이다.

```javascript
class Animal {
  constructor() {
    this.wrappedBaby = null;
  }
  animalMethod() {
    console.log("Animal의 메서드 호출");
  }
  wrapBaby(baby) {
    this.wrappedBaby = baby;
    baby.setParent(this);
  }
}
class Baby {
  constructor() {
    this.parent = null;
  }
  setParent(parent) {
    this.parent = parent;
  }
  // 부모 객체의 메서드 호출
  useAnimalMethod() {
    if (this.parent) {
      this.parent.animalMethod();
    }
  }
}
const cat = new Animal();
const babyCat = new Baby();
cat.wrapBaby(babyCat);
// 부모 객체인 cat의 메서드를 호출
babyCat.useAnimalMethod();
```

jquery도 마찬가지이다.

아래에 간단한 예시를 적어보았다.

```html
<!-- HTML -->
	<section id="jquery_element">
        <div class="jquery_box"></div>
        <div class="jquery_box"></div>
        <div class="jquery_box"></div>
        <div class="jquery_box"></div>
        <div class="jquery_box"></div>
    </section>
```

```javascript
// Javascript
var el = $('#jquery_element');
```

$는 jquery의 함수 이름으로 매개변수에 적은 선택자를 이용해서 element를 찾아낸 후 찾아낸 element를 wrapping 하여 반환한다.

```javascript
// Javascript
console.log($('#jquery_element'));
```

![콘솔창1](/images/tech/jquery/console1.png)

그래서 위처럼 $의 반환값을 출력해 보면 해당 element가 들어있는 객체를 반환한다.

```javascript
// Javascript
console.log($('.jquery_box'));
```

![콘솔창1](/images/tech/jquery/console2.png)

위와 같이 여러 개의 요소를 선택하게 될 경우 jquery객체 속에서 배열처럼 저장이 된다.

각 element의 인덱스값이 키값이 되기 때문이다.

```javascript
// Javascript
console.log($('.jquery_box'));
console.log($('.jquery_box')[0]);
```

![콘솔창1](/images/tech/jquery/console3.png)

<br>

## jQuery의 메서드

jquery의 메서드들로는 다음과 같은 것들이 있다. (ai 답변이다.)

* **`$(selector)`**
  * 설명: jQuery 객체를 생성하는 기본 메서드로, 선택자(selector)에 해당하는 DOM 요소를 선택합니다.
  * 예시: `$("div")`는 모든 `<div>` 요소를 선택합니다.

* **`.click()`**
  * 설명: 선택한 요소에 클릭 이벤트 핸들러를 등록합니다.
  * 예시: `$("button").click(function(){ ... });`

* **`.css()`**
  * 설명: 선택한 요소의 CSS 속성을 가져오거나 설정합니다.
  * 예시: `$("p").css("color", "red");`

* **`.hide()` / `.show()` / `.toggle()`**
  * 설명: 요소를 숨기거나 보이게 하거나, 상태를 토글합니다.
  * 예시: `$(".box").hide();`, `$(".box").show();`, `$(".box").toggle();`

* **`.val()`**
  * 설명: 폼 요소(input, select 등)의 값을 가져오거나 설정합니다.
  * 예시: `$("#input").val();`

* **`.attr()`**
  * 설명: 선택한 요소의 속성(attribute)을 가져오거나 설정합니다.
  * 예시: `$("img").attr("src", "img.jpg");`

* **`.addClass()` / `.removeClass()` / `.hasClass()`**
  * 설명: 클래스 추가, 제거, 포함 여부 확인을 합니다.
  * 예시: `$(".item").addClass("active")`, `$(".item").removeClass("active")`, `$(".item").hasClass("active")`

* **`.append()` / `.prepend()`**
  * 설명: 선택한 요소의 내부에 새로운 내용을 끝/처음에 추가합니다.
  * 예시: `$("ul").append("<li>Item</li>");`, `$("ul").prepend("<li>Item</li>");`

* **`.each()`**
  * 설명: 선택한 요소 집합을 순회하며 콜백 함수를 실행합니다.
  * 예시: `$("li").each(function(){ ... });`

* **`.find()`**
  * 설명: 선택한 요소의 자식 중에서 특정 요소를 찾습니다.
  * 예시: `$(".list").find("li.active");`

* **`.remove()` / `.empty()`**
  * 설명: `.remove()`는 요소 자체와 자식까지 삭제, `.empty()`는 자식만 삭제합니다.
  * 예시: `$(".box").remove();`, `$(".box").empty();`

* **`.html()` / `.text()`**
  * 설명: 선택한 요소의 HTML이나 텍스트를 가져오거나 설정합니다.
  * 예시: `$("div").html("<b>Hi</b>");`, `$("div").text("Hi");`

* **`.animate()`**
  * 설명: CSS 속성의 변화를 애니메이션 효과로 적용합니다.
  * 예시: `$("#box").animate({left: "100px"}, 500);`

* **`.on()`**
  * 설명: 여러 이벤트를 한 번에 바인딩하거나 동적으로 생성된 요소에 이벤트를 바인딩할 때 사용합니다.
  * 예시: `$("button").on("click", function(){ ... });`

* **`.ajax()`, `.get()`, `.post()`**
  * 설명: AJAX 통신을 위한 메서드로, 서버와 비동기적으로 데이터 송수신을 할 수 있습니다.
  * 예시: `$.ajax({...})`, `$.get("url")`, `$.post("url", data)`

이 외에도 굉장히 다양한 메서드들이 있기 때문에 필요한 기능이 있다면 찾아보는 것이 좋을 것 같다.


<br>

## jQuery의 플러그인

jquery는 기본적으로 제공하는 메서드 외에도 다양한 플러그인들이 있다. (ai 답변이다.)

-   jQuery UI  
    jQuery의 공식 UI 라이브러리로, 다양한 인터랙티브 위젯(탭, 드래그 앤 드롭, 대화상자 등)을 제공한다.  
      
    
-   FitVids.JS  
    다양한 디바이스에서 비디오(특히 iframe)를 반응형으로 표시해주는 플러그인이다.  
      
    
-   DataTables  
    표(테이블) 데이터를 정렬, 검색, 페이징 등으로 쉽게 관리할 수 있게 해주는 강력한 플러그인이다.  
      
    
-   bxSlider  
    이미지 슬라이드, 콘텐츠 캐러셀을 구현할 수 있는 가벼운 슬라이더 플러그인이다.  
      
    
-   FlexSlider  
    반응형 슬라이더로, 다양한 디바이스에 맞춰 슬라이드 효과를 제공한다.  
      
    
-   touchSwipe  
    터치 디바이스에서 스와이프 동작을 지원하는 이벤트 플러그인이다.  
      
    
-   Masked Input  
    입력 필드에 자동으로 마스크(예: 전화번호, 날짜 등)를 적용해주는 플러그인이다.  
      
    
-   Tooltipster  
    다양한 스타일과 애니메이션 효과를 가진 툴팁을 쉽게 구현할 수 있다.  
      
    
-   Infinite Scroll  
    페이지 하단에 도달하면 자동으로 새로운 콘텐츠를 불러오는 무한 스크롤 기능을 제공한다.  
      
    
-   pickadate.js  
    날짜 선택 기능을 제공하는 캘린더 플러그인이다.  
      
    
-   JCarousel  
    이미지 및 콘텐츠 캐러셀을 쉽게 구현할 수 있다.  
      
    
-   carouFredSel  
    다양한 옵션을 지원하는 슬라이더/캐러셀 플러그인이다.  
      
    
-   Backstretch  
    웹사이트 배경에 풀스크린 이미지를 쉽게 적용할 수 있다.  
      
    
-   Featherlight  
    가볍고 반응형인 모달(라이트박스) 플러그인이다.  
      
    
-   Stellar.js  
    스크롤 시 시차(패럴랙스) 효과를 제공한다.  
      
    
-   vTicker  
    수직(세로) 방향으로 자동으로 움직이는 뉴스 티커를 구현한다.  
      
    
-   Tablesorter  
    테이블 데이터를 정렬, 필터링할 수 있는 플러그인이다.  
      
    
-   perfect-scrollbar  
    커스텀 스크롤바를 제공하는 플러그인이다.  
      
    
-   Uniform  
    폼 요소(체크박스, 라디오버튼 등)의 디자인을 통일해준다.  
      
    
-   EasyZoom  
    이미지 확대/축소 기능을 쉽게 구현할 수 있다.