---
title: "Swiper란? (javascript)"
description: ""
category: "web"
date: 2025-06-30
---
<br>


## Swiper

Swiper는 모바일 및 데스크톱 환경에서 반응형 슬라이드쇼와 스와이퍼 기능을 쉽게 구현할 수 있게 해주는 오픈소스 라이브러리이다.

Swiper는 터치 및 마우스 이벤트, 다양한 애니메이션 효과, 무한 루프, 자동 재생, 페이지네이션, 네비게이션 등 다양한 옵션을 제공하며, 접근성 기능도 내장되어 있다.

Swiper를 사용할려면 CDN을 사용하거나 NPM으로 설치해야 한다.

Swiper의 CDN 주소 사용법은 다음과 같다.

```html
<link rel="stylesheet" href="https://unpkg.com/swiper/swiper-bundle.min.css" />
<script src="https://unpkg.com/swiper/swiper-bundle.min.js"></script>
```

<br>

## Swiper 사용

```scss
const mySwiper = new Swiper('.swiper', {
  // 옵션
});
```

Swiper 객체를 만드려면 첫 번째 인자에 선택자를 이용해서 element를 선택해야 한다.

두 번째 인자로 옵션을 지정해주어야 하는데, 옵션의 종류는 다음과 같다. (ai 답변)

주요 Swiper 옵션

-   direction  
    슬라이드 방향 ('horizontal' 또는 'vertical')
-   loop  
    무한 루프 여부 (true/false)
-   slidesPerView  
    한 번에 보여줄 슬라이드 수 (숫자 또는 'auto')
-   spaceBetween  
    슬라이드 간 간격 (px 단위)
-   slidesPerGroup  
    한 번에 슬라이딩할 슬라이드 수
-   centeredSlides  
    활성 슬라이드를 가운데로 정렬 (true/false)
-   autoplay  
    자동 재생 (delay: 밀리초, disableOnInteraction: 상호작용 후 자동 재생 중지 여부)
-   speed  
    슬라이드 전환 속도 (ms)
-   pagination  
    페이지네이션 (el: 선택자, type: 'bullets', 'fraction', 'progressbar', clickable: 클릭 가능 여부)
-   navigation  
    네비게이션 버튼 (nextEl: 다음 버튼 선택자, prevEl: 이전 버튼 선택자)
-   scrollbar  
    스크롤바 (el: 선택자, draggable: 드래그 가능 여부, dragSize: 스크롤바 크기)
-   mousewheel  
    마우스 휠로 슬라이드 이동 (true/false 또는 옵션 객체)
-   autoHeight  
    활성 슬라이드 높이에 맞춰 높이 조정 (true/false)
-   effect  
    전환 효과 ('slide', 'fade', 'cube', 'coverflow', 'flip', 'creative', 'cards')
-   threshold  
    스와이프 민감도 (px)
-   resistance  
    슬라이드 터치 저항 여부 (true/false)
-   slideToClickedSlide  
    슬라이드 클릭 시 해당 슬라이드로 이동 (true/false)
-   allowTouchMove  
    터치로 슬라이드 이동 가능 여부 (true/false)
-   watchOverflow  
    슬라이드가 1개일 때 네비게이션, 페이지네이션 숨김 여부 (true/false)
-   slidesOffsetBefore / slidesOffsetAfter  
    슬라이드 시작/끝 부분 여백
-   breakpoints  
    반응형 설정 (예: 768: { slidesPerView: 2 }, ...)
-   a11y  
    접근성 관련 옵션 (enabled: true/false, prevSlideMessage, nextSlideMessage, slideLabelMessage)
-   observer / observeParents  
    DOM 변화 감지 및 자동 갱신 (true/false)
-   loopAdditionalSlides  
    루프 시 추가 슬라이드 수 (숫자)
-   freeMode  
    자유 이동 모드 (true/false)

사용하는 예시는 다음과 같다.

```html
<!-- index.html -->
<section id="swiper">
    <div class="swiper-container">
        <div class="swiper-wrapper">
            <div class="swiper-slide">
                <p>1</p>
            </div>
            <div class="swiper-slide">
                <p>2</p>
            </div>
            <div class="swiper-slide">
                <p>3</p>
            </div>
            <div class="swiper-slide">
                <p>4</p>
            </div>
            <div class="swiper-slide">
                <p>5</p>
            </div>
            <div class="swiper-slide">
                <p>6</p>
            </div>
            <div class="swiper-slide">
                <p>7</p>
            </div>
            <div class="swiper-slide">
                <p>8</p>
            </div>
        </div>
    </div>
</section>
```

<br>

```css
// main.css
section{
    width: 100%;
    margin: 100px 0px;
    background-color: brown;
}
#swiper .swiper-container{
    width: 1600px;
    height: 600px;
    background-color: brown;
    margin: 0 auto;
    overflow: hidden;
}
#swiper .swiper-slide{
    text-align: center;
    font-size: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: red;
}
#swiper .swiper-slide p{
    width: 100px;
    height: 100px;
    line-height: 100px;
    font-size: 50px;
    text-align: center;
    background-color: aqua;
}
```

<br>

```javascript
const swiper = new Swiper('.swiper-container', {
    loop: true,
    autoplay: {
        delay: 3000,
    },
    slidesPerView: 3,
    spaceBetween: 10
})
```

위 예시에 대한 결과는 아래와 같다.

![swiper example](/images/tech/swiper/swiper-exam.png)

설정한 delay 시간마다 슬라이드가 자동으로 넘어간다.

이때 중요한 점은 슬라이드를 넣을 태그인 .swiper-container의 클래스 명은 다른 이름으로 바꾸어도 된다.

하지만 내부의 swiper-wrapper, swiper-slide 등은 Swiper가 요구하는 클래스명이므로  바꾸지 말아야 한다.

이 외에도 navigation 옵션을 이용해서 슬라이드를 넘길 버튼으로 사용할 요소를 선택한다거나,

pagination 옵션을 사용해서 클릭을 통해 특정 슬라이드로 바로 이동할 수 있도록 구현하는 등 다양한 기능들을 사용할 수 있다.

```javascript
// navigation, pagination 예시
const swiper = new Swiper('.swiper-container', {
    loop: true,
    autoplay: {
        delay: 3000,
    },
    slidesPerView: 3,
    spaceBetween: 10,
    navigation: {
      nextEl: '.swiper-button-next',      // 다음 버튼 선택자
      prevEl: '.swiper-button-prev',      // 이전 버튼 선택자
    },
    pagination: {
      el: '.swiper-pagination',           // 페이지네이션 컨테이너 선택자
      clickable: true,                    // 클릭 가능 여부
      type: 'bullets',                    // 타입: bullets(점), fraction(분수), progressbar(진행바)
    }
})
```

<br>

## 마무리

슬라이드를 구현할 때 개인적으로 jQuery보다는 Swiper가 안정적이고 사용하기도 편했다.

웹페이지를 만들다 보면 슬라이드 요소를 만드는 것이 좋은 경우가 많은데 그럴 때 활용해야겠다.