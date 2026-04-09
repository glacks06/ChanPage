---
title: "테트리스"
description: ""
category: "unity"
date: 2026-04-09
---
<br>


- 제작된 게임 플레이 링크  
-> https://play.unity.com/ko/games/20cb6512-7103-4a25-b22e-067d5afdd90a/tetris0


<br>

이전에 만든 오목과 오델로의 클래스 구조를 이용해서 테트리스를 만들어 보았다.  
해당 프로젝트의 목적은 기존에 만들어둔 구조의 재사용이다.  

<br>

## 만들기 전 구조 일부 수정

![일부 구조 수정 이미지](/src/content/projects/unity/imgs/tetris/tetris1.png)

대략적인 부분만 파악해두려고 수정에 많은 시간을 들이지 않았다.

<br>

## 블럭 프리팹 생성

![일부 구조 수정 이미지](/src/content/projects/unity/imgs/tetris/tetris2.png)

편의를 위해 유니티 좌표계 상에서 1 유닛 당 1블럭이 딱 들어가도록 세팅하였다.

<br>

## User 클래스

우선 난 유저측에서 떨어지는 테트리스 블록을 관리하는 것이 좋을 것 같다는 판단을 하여서 떨어지는 블록부터 구현하기 시작했다.

테트리스의 BoardManager의 currentBlock에 현재 떨어지고있는 블록을 참조시키고 user에서 이를 컨트롤한다.

추가로 좌우 키를 이용해 블록을 좌우로 움직이는 기능도 같이 구현했다.

물론 아직 충돌 판정은 구현하지 않았다.

<br>

## 블럭 좌우 이동
User에서 currentBlock을 BoardManager로부터 가져와서 블럭을 좌, 우로 이동하도록 메서드를 구성했다.(User에서 직접 오브젝트를 컨트롤하는 점은 이후에 BoardManager에게 이동을 요청하는 방식으로 변경했다.)  
이동하는 키는 키보드의 화살표키이다.  

<br>

## 블럭 회전
블럭을 회전하는 메서드도 같이 구현하였다.  
회전을 위해 블럭에 pivot 오브젝트를 자식오브젝트로 위치시켰다.
유저가 위쪽 화살표키를 누르면 해당 pivot을 기준으로 시계방향 회전한다.  
회전 시 오브젝트의 transform에 있는 Rotation을 건드는 방식은 사용하지 않았다.  
그 이유는 작은 단위의 블럭의 위치를 변경하는 방식을 사용하면 회전해보기 전에 작은 블럭들의 위치를 쉽게 파악한 후 회전시킬 수 있기 때문이다.  
충돌판정을 한 후 회전시키기 용이해진다.  
회전될 블럭의 예상 위치는 아래 공식으로 구할 수 있다.(pivot이 좌표계의 원점에 위치되도록 계산한 후 블럭을 계산하면 쉬워진다.)
```
x' = y
y' = -x
```

<br>

## tick 시스템 도입

테트리스를 해보면 블럭이 부드럽게 떨어지는 것이 아닌 일정 시간마다 한칸씩 떨어지는 것을 볼 수 있다.  
그러다가 더 떨어질 공간이 없다면 블럭의 설치가 결정된다.  
따라서 유니티 시간이 아닌 다른 시간 시스템이 필요해서 GameManager에 tick 변수를 추가했다.  
tick은 정수 변수로 1초당 1씩 값이 오른다.  
tick이 변경될 때 마다 블럭을 한칸 떨어뜨리는 등의 행동을 취하면 된다.

<br>

## 충돌 판정 구현
블럭이 벽과 다른 블럭을 무시하고 한없이 떨어지면 안된다.  
따라서 블럭이 이동 혹은 회전할 때 벽이나 블럭과 겹치는지 검사하는 메서드가 필요하다.  
```c#
private bool CanPutBlock(GameObject block, Vector2 moveDir) {}
private bool CanPutBlock(Vector2 pos) {}
```  
블럭과 블럭이 움직일 방향을 전달하면 블럭이 설치 가능한지(= 다른 벽이나 블럭과 충돌하지는 않는지)를 검사한 후 그 결과를 출력해준다.  
두번째에 CanPutBlock이 하나가 더 있는데, 특정 좌표를 넘기면 해당 부분에 블럭이나 벽이 있는지 확인한 후 설치 가능 여부를 출력해주는 메서드이다.  
Overload를 이용해서 메서드를 두개 만든 이유는 큰단위의 블럭덩어리 말고도 작은 단위의 블럭을 움직여야하는 경우가 생기기 때문이다.  

결과적으로 블럭이 떨어지다가 블럭이 벽이나 다른 블럭과 충돌한다면 그 자리에 블럭을 설치한다.

![일부 구조 수정 이미지](/src/content/projects/unity/imgs/tetris/tetris3.png)

<br>

## 다음 블럭 생성
블럭을 설치하면 다음 블럭이 내려와야 하기에 BoardManager에 블록을 스폰시키는 메서드를 추가하였다.  
블럭 설치가 완료되면 호출된다.
```c#
private void spawnBlock() {}
// 아래의 메서드로 스폰하려는 위치에 다른 블럭이 이미 자리잡고 있는지 사전에 검사
private bool CanSpawnBlock() {}
```

<br>

## 어디에 블럭이 설치될지 알려주는 hoverBlock 구현
테트리스 게임 중 이대로 블럭이 내려가면 어디에 설치될지 미리 보여주는 게임들이 있다.

![일부 구조 수정 이미지](/src/content/projects/unity/imgs/tetris/tetris5.png)

이를 구현하기 위해 BoardManager에 GameObject hoverBlock 변수를 만들고 currentBlock의 위치나 회전 상태에 변화가 생길 때마다 hoverBlock이 currentBlock의 위치로부터 아래로 내려가보며 설치가 불가능한 지점의 직전까지 내려가도록 만들었다.
```c#
// currentBlock의 위치에서 아래로 내려가며 충돌 직전까지 내려간 위치로 hoverBlock을 위치시키는 메서드
private void HoverBlockUpdate() {}
```
hoverBlock은 currentBlock이 생성될 때 같은 프리팹을 하나 더 생성함으로써 구현하며, currentBlock이 테트리스 보드에 설치되면 hoverBlock은 파괴된다.  
hoverBlock이 생성될때는 이미지의 투명도를 부여해서 약간 투명하게 만들었다.

![일부 구조 수정 이미지](/src/content/projects/unity/imgs/tetris/tetris6.png)

<br>

## 블럭 파괴
테트리스에서 가로줄이 블럭으로 전부 가득차면 해당 줄의 블럭이 파괴되고 위에있는 블럭들이 내려온다.  
테트리스에서 일종의 쾌감을 불러일으키는 중요한 요소이기에 테트리스 제작에 빠질 수 없는 요소이다.  
블럭 파괴를 구현하기 위해 BoardManager에 네가지 메서드를 만들었다.
```c#
// 해당 메서드 호출 시 아래의 메서드들을 이용하여 블럭을 파괴시키는 메서드
private coid DestroyBlockCheck(){}
// 가로로 꽉 찬 줄이 있는지 확인하고, 해당 행(y)의 인덱스들을 리스트로 반환하는 메서드
private List<int> GetFullRows(){}
// 전달받은 꽉 찬 행(들)의 블록 게임오브젝트를 파괴하고 배열을 비우는 메서드
private void destroyBlock(List<ing> fullRows){}
// 공중에 뜬 전체 블록들을 확인하여 빈 공간이 있으면 바닥에 닿을 때까지 내리는 메서드
private void DropBlocksToBottom(int destroyedIndexY){}
```
![일부 구조 수정 이미지](/src/content/projects/unity/imgs/tetris/tetris4.png)
![일부 구조 수정 이미지](/src/content/projects/unity/imgs/tetris/tetris4-2.png)

<br>

## 스페이스바로 블럭 즉각 설치
테트리스는 블럭이 내려올때까지 기다리거나 아래 방향키를 연타해서 내리는 방식 외에도 다른 버튼(예: 스페이스바)으로 바로 설치하는 기능이 있다.  
따라서 나도 스페이스바를 누르면 블럭이 바로 떨어져서 설치되는 메서드를 구성하였다.  
해당 메서드를 처음에는 User에 구성하였으나 나중에 이동 혹은 회전 메서드를 BoardManager에게 메서드를 옮겨준 후에 즉각 설치 기능도 BoardManager에게 넘겨서 User는 BoardManager에게 메서드를 통해 즉각 설치를 요청하는 방식으로 변경했다.
```c#
public void immediateBlockPlace(){}
```

<br>

## 구조 다듬기
User가 currentBlock을 직접 조종하는 형태에서 BoardManager의 메서드를 통해 간접적으로 조종하는 방식으로 변경했다.  
그 이유는 currentBlock을 BoardManager가 관리하는 것이 훨씬 안전하고 깔끔하기 때문이다.  
따라서 마치 테트리스 게임기의 이동키 버튼을 만들어두듯이 메서드들을 구성해놓았다.
```c#
public void BlockFalling() {} // 해당 메서드를 호출하면 블럭이 중력에 의해 한칸 내려옴
public void MoveBlock(Vector dir) {} // 좌, 우, 아래 이동
public void RotateBlock() {} // 블럭 회전
public void immediateBlockPlace() {} // 블럭 즉각 설치
```

<br>

## 간단히 꾸미기
현재 화면은 너무 밋밋한 것 같아서 인공지능에게 배경이미지를 그려달라고 요청한 후 색상들을 조금 조절해서 배치했다.
![일부 구조 수정 이미지](/src/content/projects/unity/imgs/tetris/tetris7.png)