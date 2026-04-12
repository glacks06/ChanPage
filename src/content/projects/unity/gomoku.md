---
title: "오목"
description: ""
category: "unity"
date: 2026-04-09
---
<br>


- 제작된 게임 플레이 링크  (현재 오목과 오델로가 통합되어 있음)
-> https://play.unity.com/en/games/c1eac657-f0e2-4c79-8a92-948312b58db6/stonetatics0


<br>

클래스 설계에 대해 연구하고 경험해보고 싶어서 오목을 만들었다.

<br>

## 클래스 설계

![일부 구조 수정 이미지](/src/content/projects/unity/imgs/gomoku/gomoku1.png)

클래스 구조를 먼저 만들어두고 프로그램을 개발해보는건 사실상 처음이였다.  
그러다보니까 어떻게 얼마나 표현을 해야하고, 어떤 구조가 좋은 구조인지에 대한 감이 별로 없어서 만들어놓고도 부족함이 많을 것 같다는 생각이 들었다.  
그래도 나름 열심히 만들어보았다.

<br>

## 오목판 생성 및 기초작업

![일부 구조 수정 이미지](/src/content/projects/unity/imgs/gomoku/gomoku2.png)

우선 오목판과 배경 이미지를 생성해두었다.  

<br>

## 돌 착수 구현

돌을 착수할 때 오목판의 격자에 돌이 위치하도록 해야하기 때문에 마우스의 위치에 바로 착수하도록 하면 안된다.  
그래서 가장 가까운 격자의 위치를 계산하기 위해 Snap이 필요하다.  
```c#
public Vector2 SnapCalc(Vector2 mousePos) {}
```
<br>

BoardManager의 메서드인 SnapCalc를 이용하여 가장 가까운 격차의 위치를 반환받으면 User에서 마우스 클릭 감지 시 돌을 착수하도록 하는 BoardManager의 메서드를 호출하도록 했다.
```c#
public bool placeStone(int[] index, int userId, GameObject stone) {}
public bool placeStone(Vector2 pos, int userId, GameObject stone) {}
```
placeStone이 두개인 이유는 오목판의 정보를 저장하는 이차원 정수 배열인 boardArr에 저장할 때, Snap이 완료된 좌표를 주던 인덱스 번호로 주던 정상적으로 돌이 착수되도록 하기 위해서이다.  
User는 마우스 위치를 넘겨주기 때문에 이를 인덱스로 변환해서 placeStone(int[] index, int userId, GameObject stone)를 호출하고, 나중에 만들 오목봇은 인덱스를 기준으로 돌을 착수하기 때문에 바로 placeStone(int[] index, int userId, GameObject stone)를 호출한다.  

<br>

참고로 좌표계와 boardArr의 인덱스 두가지의 체계를 상호간에 변환할 수 있도록 함수를 만들어두었다.
```c#
int[] PosToIndex(Vector2 pos) {}
Vector2 IndexToPos(int[] index) {}
```

<br>

## 착수 흐름 구현

player1이 오목을 두면 그 다음 차례로 player2가 오목을 두어야 한다.  
그 다음 player2가 오목을 두면 player1이 다시 오목을 두는 흐름이 만들어져야 한다.  
그래서 turnId라는 정수 변수를 만들어두고 이를 기점으로 턴 시스템을 구현했다.  
- 선공이 player1이라면 turnId를 player1의 id로 저장해둔다.  
- turnId가 player1의 아이디와 일치하는 동안에 player1이 플레이어의 마우스 입력을 감지하고 플레이어가 클릭하면 해당 위치에 돌을 착수한다.  
- turnId는 player2의 id를 저장하게 된다.
- turnId가 player2의 아이디와 일치하는 동안에 player2가 플레이어의 마우스 입력을 감지하고 플레이어가 클릭하면 해당 위치에 돌을 착수한다.  
- 이를 반복한다.

<br>

## 오목봇 구현

싱글플레이로도 작동이 가능한 오목게임을 만들기 위해 오목봇을 만들었다.  
boardArr의 정보를 바탕으로 현재로써 가장 적합한 위치를 선정해야하기에 오목판의 각 위치마다 점수를 부여하도록 했다.  
점수의 기준은 여러가지 시도와 고민 끝에 아래와 같이 정했다.  

<br>

1. 특정 위치에서 8방을 검사. (이때 바로 주변에 자신의 돌이 없으면 0점으로 패스)
2. 특정 방향을 검사했을 때, n목이면 해당 위치의 기본 점수는 n*n (제곱을 한 이유는 같은 n목이더라도 상황에 따라 우선순위가 달라지기에 같은 n목끼리의 점수끼리의 차이를 둘 수 있게 여유를 줌(확통의 분산에서 아이디어를 얻음))
다음과 같은 사항이 있으면 기본 점수에서 가산점
3. 중간 공백 -> +2 (예시: oo o)
- 3-2 현재 탐색 지점에서 탐색 방향의 반대편이 1칸 뚫려있음 -> +1 
- 3-3 socre가 3일때 (한쪽 막히지x & 뒤에 둟려있음) -> +2 (중간 공백에도 +2)   (예시: oo o )
다음과 같은 사항이 있으면 기본 점수에서 감산점
4. 한쪽 막힘 -> -1  (예시: xooo )
- 4-1 socre < 4일때 한쪽이 막힌 상황에서 현재 위치의 뒤도 막힌 경우 0점 (단, score가 3일경우 중간 공백이 있으면 0 처리 안함)    (= 5목이 불가능한 공간과 방향을 탐색중인 상황)

<br>

물론 완벽한 오목봇은 아니라고 생각한다.  
그래도 나름대로 이기는 방향으로 돌을 착수하고, 내가 해당 오목봇과 오목을 두었을때 내가 패배하는 경우가 대부분이였다. (물론 난 오목을 잘 두는 편이 아니라서 오목봇이 얼마나 승률이 좋은지는 잘 판단하지 못한다...)  

<br>

GameManager는 현재 차례인 player의 isBot 값이 true이면 해당 플레이어는 오목봇임을 인지하고 Bot 클래스의 메서드로부터 봇의 착수 위치를 받아와서 착수한다.
```c#
public int[] getBotStoneIdx(BoardManager board, int botNum, int otherNum) {}
```
이때 점수판 생성은 BoardManager의 메서드를 통해 반환받기 때문에 매개변수로도 BoardManager의 객체를 넘겨준다.  

<br>

## 게임 승리 판정
플레이어가 착수를 마칠때마다 오목이 된 부분이 있는지 확인한 후 오목이 존재한다면 게임 승패여부를 UI로 띄울 수 있도록 하였다.  
게임이 이겼는지 여부를 반환하는 메서드를 BoardManager에 구성하였다.
```c#
// 매개변수로 들어온 값에 해당하는 id를 가진 플레이어가 이겼는지 체크
public bool gameWinCheck(int id)
```

<br>

## UI 혹은 다른 기능적인 부분 구현
승패화면이 나온 후 자신이 어떻게 졌는지 궁금하여서 오목판을 다시 보고싶을 수 있다.  
그래서 UI를 숨김처리할 수 있는 메서드를 구현하였다.
또한 다시하기 버튼을 누르면 씬이 다시 시작하도록하는 메서드도 구현하였고, 가장 처음에 UI를 통해 선공과 후공 중 선택하도록 하여 turnId를 세팅하는 메서드도 작성하였다.
(GameManager에 구성하였다.)
```c#
private void showGameResult(int result, User player) {} // 게임 결과를 출력하는 메서드. result가 0이면 매개인자로 들어온 User 객체(플레이어)가 승자이다.
public void minimalizeGameResultUI(){}
public void restartScene() {}
public void setPlayer1First(bool v) {}
```