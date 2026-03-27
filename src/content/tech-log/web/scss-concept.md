---
title: "SCSS란?"
description: ""
category: "web"
date: 2025-06-29
---
<br>


css에 편리성을 더해주는 scss에 대해 알게 되었다.

이번 글에서는 scss에 대해 공부한 내용을 적을 것이다.

scss를 설명하기에 앞서 sass에 대해 알아야 한다.

<br>

## Sass

Sass(Syntactically Awesome Style Sheets)는 직역하면 '문법적으로 멋진 스타일 시트'로 기존의 CSS보다 더 강력하고 멋진 문법 구조를 가진 스타일 시트이다.

따라서 Sass는 CSS의 불편한 점들을 해결하고 변수, 중첩, 믹스인, 함수 등 다양한 기능들을 제공하는 스타일 시트이다.

전처리기 언어인 sass는 두 가지 문법(파일 형식)을 지원한다.

sass와 scss이다.

sass는 들여 쓰기 기반으로 중괄호나 세미콜론 없이 작성하며, 확장자는 .sass이다.

scss는 sass 3 버전에서 새롭게 도입된 문법으로 기존 css와 거의 동일하게 중괄호와 세미콜론을 사용하며, 확장자는 .scss이다.

_※ 전처리기 언어란?_

_전처리기 언어는 컴파일이나 실행 전에 소스 코드를 가공(처리)하기 위해 사용되는 특수한 언어 또는 언어 확장이다._

_예를 들어 sass로 작성된 코드는 일반적인 css로 변환하는 과정이 필요한데, 이때 사용되는 것이 sass 전처리기이다._

_sass 전처리기가 전처리기 역할과 컴파일러의 역할을 동시에 수행하는 것이다._

sass와 scss는 문법적인 차이만 존재할 뿐 기능들은 전부 같다.

<br>

## SCSS 적용법

scss만으로는 브라우저가 이용할 수 없다.

scss파일을 일반적인 css파일로 변환하는 컴파일 과정이 필요하다.

scss는 npm에 있기 때문에 터미널에서 명령어를 통해 scss 컴파일을 적용할 수 있다.

```
npx sass --watch css/style.scss css/style.css
```

\--watch 옵션을 사용하면 컨트롤+c로 종료하기 전까지 scss에 변경사항이 생길 때마다 바로바로 컴파일해준다.

_※ npm이 아닌 npx를 사용하는 이유는 sass 컴파일러가 배포 전 개발 단계에서 scss를 css로 변환할 때만 필요하기 때문이다._

<br>

## SCSS

SCSS(Sassy CSS)는 Sass의 문법 중 한 가지로 css와 매우 비슷한 모습을 보인다.

우선 scss의 핵심 기능적인 기능으로는 변수, 중첩, 믹스인, 함수가 있다.

각각의 설명과 사용 예시를 설명할 것이다.

#### 1\. 변수

$ 기호를 이용해서 변수를 생성할 수 있다.

```scss
$sections_background_color: lightcyan;
section{
    padding: 10px;
    background-color: $sections_background_color;
}
```

$ 기호가 필요한 이유는 변수명을 다른 property명 등과 구분하기 위해서이다.

이러한 방식으로 변수를 생성하면 같은 property 값을 공유해야 하는 element들의 property값에 변경이 생겼을 때, 일일이 하나씩 변경하는 것이 아닌 값을 한 번에 변경하는 것이 가능하다.

#### 2\. 중첩

```html
<section id="fonts">
    <div class="smalls">small font1</div>
    <div class="larges">larges font1</div>
    <div class="smalls">small font2</div>
    <div class="larges">larges font2</div>
    <div class="smalls">small font3</div>
    <div class="larges">larges font3</div>
</section>
```

위와 같은 HTML 구조가 있다고 하자.

그리고 아래는 위의 요소들에 대한 css이다.

```css
#fonts{
	background-color: lightcyan;
}
#fonts .smalls{
	font-size: small;
}
#fonts .larges{
	font-size: large;
}
```

지금은 자식 요소들이 그리 많지 않고, .samlls 혹은 .larges가 자식 요소를 가지지 않기 때문에  복잡하지 않지만 요소가 많아진다면 꽤나 복잡하고 누가 누구의 자식 요소인지 등의 정보를 볼 때 가독성이 떨어지게 된다.

그래서 scss는 중첩 기능을 지원한다.

```scss
#fonts{
    .smalls{font-size: small;}
    .larges{font-size: large;}
}
```

위와 같이 특정 요소의 property를 설정하는 중괄호 안에 자식 요소 선택자를 넣음으로써 더 가독성 있는 css 작성을 가능하게 한다.

이렇게 되면 #font의 자식 요소를 볼 때는 #fonts의 중괄호 내부만 확인하면 된다.

combinator selector를 이용하고 싶다면 어떻게 해야 할까?

일반적인 css에서 사용하는 것과 매우 유사하게 사용할 수 있다.

아래와 같은 HTML 구조가 있을 때

```html
<section id="fonts">
    <article><div class="smalls">small font1</div></article>
    <div class="larges">larges font1</div>
    <div class="smalls">small font2</div>
    <div class="larges">larges font2</div>
    <article><div class="smalls">small font4</div></article>
    <div class="larges">larges font3</div>
</section>
```

직계 자손을 선택하는 선택자인 '>'를 이용하려면 다음과 같이 사용이 가능하다.

```scss
#fonts{
    > .smalls{font-size: small; color: red;}
    .larges{font-size: large;}
}
```

#### 3\. 믹스인

믹스인(mixin) 기능은 반복적으로 쓰이는 스타일 블록을 한 번에 정의한 후 여러곳에 재사용할 수 있게 해주는 기능이다.

```html
<!-- index.html -->
<section id="box_multiple">
    <div class="basic">50px</div>
    <div class="double">50px</div>
    <div class="triple">50px</div>
</section>
```

<br>

```scss
// main.scss
section{
    padding: 10px;
    background-color: lightcyan;
}

$boxs_margin: 50px 0;
#boxs{
    .box1{
        width: 50px;
        height: 50px;
        position: relative;
        background-color: lightpink;
        margin: $boxs_margin;
        text-align: center;
        line-height: 50px;
        left: 50px;
    }
    .box2{
        width: 50px;
        height: 50px;
        position: relative;
        background-color: lightpink;
        margin: $boxs_margin;
        text-align: center;
        line-height: 50px;
        left: 100px;
    }
    .box3{
        width: 50px;
        height: 50px;
        position: relative;
        background-color: lightpink;
        margin: $boxs_margin;
        text-align: center;
        line-height: 50px;
        left: 150px;
    }
}
```

3개의 비슷한 스타일의 상자가 있다.

페이지에 나타나는 결과는 아래와 같다.

![믹스인 예시](/images/tech/scss/mixin-exam.png)

width, height, position, margin 등 3개의 상자에 적용된 스타일 중 겹치는 property들이 많다.

이때 믹스인을 이용하면 겹치는 스타일을 한번에 저장해서 이용할 수 있다.

```scss
// main.scss(mixin 적용)
$boxs_margin: 50px 0;
@mixin box_format($w, $h){
    width: $w;
    height: $h;
    position: relative;
    background-color: lightpink;
    margin: $boxs_margin;
    text-align: center;
    line-height: $h;
}
#boxs{
    .box1{
        @include box_format(50px, 50px);
        left: 50px;
    }
    .box2{
        @include box_format(50px, 50px);
        left: 100px;
    }
    .box3{
        @include box_format(50px, 50px);
        left: 150px;
    }
}
```

@mixin 키워드를 이용해서 믹스인 기능을 이용할 수 있다.

예시에서의 $w, $h와 같은 매개변수를 이용해서 마치 함수처럼 이용할 수 있다.

내부의 스타일들을 반환하는 함수 같다는 느낌이 든다.

또한 예시에서의 $boxs\_margin와 같이 믹스인 외부에서 선언된 변수도 내부에서 이용할 수 있다.

이렇게 믹스인 기능을 이용하면 코드의 가독성이 많이 올라가게 된다.

한번 만든 믹스인 기능은 @use를 이용해서 같은 파일뿐 아니라 다른 파일에서도 불러와서 사용이 가능하다.

일단 아까 본 예시(index.html, main.scss) 이외에 추가로 second.html과 side.css 두 파일을 만든 후 연결시켰다고 하자.

그리고 각 파일의 내용은 다음과 같다.

```html
<!-- second.html -->
<section id="second_page_boxs">
    <div class="second_page_box1">50px</div>
    <div class="second_page_box2">50px</div>
    <div class="second_page_box3">50px</div>
</section>
```

<br>

```scss
// side.scss
@use './main';

#second_page_boxs{
    width: 100%;
    height: 500px;
    .second_page_box1{
        @include main.box_format(50px, 50px);
        left: 10px;
    }
    .second_page_box2{
        @include main.box_format(50px, 50px);
        left: 20px;
    }
    .second_page_box3{
        @include main.box_format(50px, 50px);
        left: 30px;
    }
}
```

위와 같이 @use를 이용해서 파일을 불러오면 해당 파일의 믹스인, 함수, 변수들을 이용할 수 있다.

불러올 때는 경로를 적어야 하는데, 확장자를 적지 않아도 된다.

결과는 아래와 같다.

![믹스인 예시](/images/tech/scss/mixin-exam2.png)

근데 여기서 의문이 든다.

#second\_page\_boxs에 배경색을 지정한 적이 없는데 결과에서는 index.html에서와 똑같은 배경색이 지정되어 있다.

그 이유는 파일을 불러올 때 CSS규칙들도 가져오기 때문이다.

그래서 side.scss를 컴파일한 결과가 있는 side.css를 보면

![section 텍스트 이미지](/images/tech/scss/scss-side-section.png)

main.css에 작성되어 있는 내용들도 들어있게 된다.

믹스인, 함수, 변수들만 불러오고 싶다면 이들을 css 규칙이 없는 다른 scss 파일에 따로 두어야 한다.

즉, 모듈을 만드는 것이다.

이를 통해 더 효율적이고 편리한 css작성이 가능해진다.

_※ 별칭 지정_

_@use로 파일을 가져오면_ 

-   _파일명.가져올함수_
-   _@include 파일명.가져올믹스인_
-   _파일명.$가져올변수명_

_위와 같이 이용할 수 있다._

_이때 파일명 대신 별칭을 지정할 수도 있다._

```scss
@use './main' as m;
```

_위와 같이 작성하면 파일명 대신 'm'으로 작성해도 된다._

_※ @import와 @use의 차이_

_파일을 불러오는 방식으로는 @import와 @use 두 가지 방법이 있다._

```scss
@import 'main';

body {
  background: $primary-color;
}
```

<br>

```scss
@use 'main';

body {
  background: main.$primary-color;
}
```

_둘의 중요한 차이 중 하나는 @use가 변수, 믹스인, 함수를 사용할 때 네임스페이스(파일명 혹은 별칭)를 사용한다는 것이다._

_위 예시의 main이 네임스페이스에 해당한다._

_반면에 @import는 네임스페이스를 사용하지 않는다._

_그래서 여러 개의  파일을 불러왔을 때 같은 이름의 변수가 2개 이상의 파일에 존재할 때 충돌할 가능성이 생기는 것이다._

_@use는 네임스페이스로 명확히 구분하기 때문에 훨씬  안전하다._

_그래서 Sass에서도 @import보다는 @use를 권장하고 있으며, 점차 @import가 사라질 것이다._

_네임스페이스를 이용하기 때문에 별칭을 지정할 수 있다는 점도 차이점이 될 수 있겠다._

#### 4\. 함수

scss에도 함수기능이 있다.

특정 값을 파라미터를 통해 넣을 수 있고, 특정 단계를 거쳐 값을 반환받을 수 있다.

아래와 같은 index.html, main.css 파일이 있다고 하자.

```html
<!-- index.html -->
<section id="boxs">
    <div class="basic">50px</div>
    <div class="double">50px x 2</div>
    <div class="triple">50px x 3</div>
</section>
```

```scss
section{
    padding: 10px;
    background-color: lightcyan;
}

@function double($v){
    @return $v * 2;
}
@function triple($v){
    @return $v * 3;
}

$boxs_margin: 50px 0;
@mixin box_multiple_size($w, $h){
    width: $w;
    height: $h;
    position: relative;
    background-color: lightpink;
    margin: $boxs_margin;
    text-align: center;
    line-height: $h;
}

#boxs{
    .basic{
        @include box_multiple_size(50px, 50px);
    }
    .double{
        @include box_multiple_size(double(50px), 50px);
    }
    .triple{
        @include box_multiple_size(triple(50px), 50px);
    }
}
```

간단히 설명하자면 3개의 상자가 있고 각 상자의 가로 크기는 각각 50px, 100px, 150px로 두 번째, 세 번째 상자의 가로 크기는 첫 번째 상자의 2배, 3배 크기이다.

이때 가로 크기를 함수(double, triple)를 이용해 구하는 코드이다.

함수의 파라미터로 받는 값에는 따로 타입을 지정하지 않는다.

자동으로 타입을 판단하기 때문이다.

하지만 단위가 다른 값끼리 연산을 하면 오류가 발생하므로 주의해서 사용해야 한다.

<br>

## 마무리

scss에는 이번 글에서 설명한 4가지의 기능 이외에도 상위 선택자 참조, 조건문, 상속 등의 다양한 기능이 있지만 우선은 중요한 4가지만 다루어 보았다.

scss로 변수, 중첩, 믹스인, 함수를 이용할 수 있다.

위의 기능들은 다른 프로그래밍 언어에서 보이는 변수, 객체, 함수 등의 역할들과 거의 비슷했다.

여기서 코드를 가독성 있게 잘 짜고 메모리를 효율적으로 관리하는 방식이 비슷비슷하다는 느낌을 받았다.

확실히 일반적인 css를 작성하는 방식보다 scss로 작성하는 방식이 매우 편리하고 가독성도 굉장히 좋아서 매우 자주 사용할 것 같다.

가능하면 다른 기능들도 더 조사해서 글을 작성해보려고 한다.