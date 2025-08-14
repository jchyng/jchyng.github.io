---
title: "프로그래머스 택배 상자 꺼내기 문제 풀이"
date: "2025-08-14"
excerpt: "프로그래머스 문제 '택배 상자 꺼내기'를 구현하며  설계했는지 공유합니다."
tags: ["프로그래머스", "Java", "배열", "문제풀이"]
thumbnail: "/images/post-image.png"
---

# 프로그래머스 택배 상자 꺼내기 문제 풀이

이번 글에서는 프로그래머스의 **택배 상자 꺼내기** 문제를 Java로 해결한 방법을 공유합니다.  
문제의 핵심은 상자를 쌓은 뒤 **지그재그 순서**로 상자를 꺼낼 때 특정 상자를 꺼내는 순서를 계산하는 것입니다.

## 문제 접근 방법

문제를 분석해 보면, 다음과 같은 조건이 있습니다.

1. 상자를 **w개의 열**로 쌓는다.
2. 각 줄은 왼쪽에서 오른쪽, 다음 줄은 오른쪽에서 왼쪽으로 **지그재그**로 번호를 채운다.
3. 특정 상자를 꺼낼 때, 그 위에 있는 상자를 모두 먼저 제거해야 한다.

이를 구현하기 위해, 먼저 필요한 값들을 계산합니다.

- `h = ceil(n / w)` : 총 줄 수
- `boxs[h][w]` : 상자를 저장할 2차원 배열
- `isRight` : 현재 방향이 오른쪽인지 왼쪽인지

## 코드 설명

```java
class Solution {
    public int solution(int n, int w, int num) {
        int answer = 0;

        int h = (int) Math.ceil((double) n / w);
        int[][] boxs = new int[h][w];

        int y = 0, x = 0;
        int boxCnt = 1;
        int direction = 1; // -1: <-, 1: ->

        //박스 배열 채우기
        while (boxCnt <= n) {
            boxs[y][x] = boxCnt++;

            //오른쪽으로 가다가 끝에 닿은 경우
            if (direction > 0 && x == w - 1) {
                y++;
                direction = -1;
            } //왼쪽으로 가다가 끝에 닿은 경우
            else if (direction < 0 && x == 0) {
                y++;
                direction = 1;
            } else {
                x += direction;
            }
        }

        //박스 꺼내기
        int num_y = (num - 1) / w;
        for (int i = 0; i < w; i++) {
            if (boxs[num_y][i] == num) {
                int over = num_y;
                while (over < h && boxs[over][i] > 0) {
                    answer++;
                    over++;
                }
            }
        }
        return answer;
    }
}
```
