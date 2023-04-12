/*https://cocook.tistory.com/84*/
// mid 보다 작은 간격이라면 바위를 제거한 후 처음 바위부터
// 다시 간격을 쟀어야 했는데 놓침
// 왜나면 이전 이분탐색 문제 생각(심사관 기준 처리)에 갇혔기 때문.
// 1~distance 생각은 해냄.

function solution(distance, rocks, n) {
  let left = 1, right = distance;
  rocks.sort((a,b) => a-b);
  let mid, answer;

  while(left <= right) {
    mid = ~~((left+right) / 2);
    let count = 0;
    let start = 0;
    for(const rock of rocks) {
      if(rock - start < mid) count++;
      else start = rock;
      // 이미 개수를 넘어 섰으니까 중단
      if(count > n) break;
    }
    if(count > n) right = mid - 1;
    // n과 동일해도 다시 진행하는 이유는 최대를 구해야 하기 때문.
    // 같은 n에 대해 더 큰 최소값을 얻을 수도 있기 때문.
    // 다음 결과가 n을 넘어설 수 있기 때문에 mid를 미리 답으로 저장.
    else {
      left = mid + 1;
      answer = mid;
    }
  }
  return answer;
}

/*
function solution(distance, rocks, n) {
  rocks.sort((a,b) => a-b);
  rocks.push(distance);
  let between = rocks.map((v, idx) => {
    if(idx == 0) return v;
    else return v-rocks[idx-1];
  });
  rocks.unshift(0);
  let selected = new Array(rocks.length).fill(false);
  selected[0] = true;
  selected[selected.length-1] = true;
  
  let count = 0;
  while(count < rocks.length-n-2) {
    let left = 0, right = rocks.length-1;
    let mid = Math.floor((left+right)/2);
    while(left < right) {
      mid = Math.floor((left+right)/2);
      if(left == mid) {
        left = right;
        between[left-1] = 0;
        if(selected[left]) selected[mid] = true;
        else selected[left] = true;
        continue;
      } else if(mid == right) {
        right = left;
        between[right-1] = 0;
        if(selected[right]) selected[mid] = true;
        else selected[right] = true;
        continue;
      }
      const left_max = Math.max.apply(null, between.slice(left, mid));
      const right_max = Math.max.apply(null, between.slice(mid, right));
      let go = left_max > right_max ? "left" : "right";
      if(go  === "left") right = mid;
      else if(go === "right") left = mid;
    }
    count++;
  }
  rocks.shift();
  rocks.pop();
  selected.shift();
  selected.pop();
  let answer = [];
    selected.forEach((v, idx) => {
    if(v) {
        answer.push(rocks[idx]);
    }
  });
    answer = answer.map((v, idx) => {
    if(idx == 0) return v;
    else return v-answer[idx-1];
  });
  return Math.min.apply(null, answer);
}
*/

/*
function solution(distance, rocks, n) {
  rocks.sort((a,b) => a-b);
  rocks.push(distance);
  let between = rocks.map((v, idx) => {
    if(idx == 0) return v;
    else return v-rocks[idx-1];
  });
  rocks.unshift(0);
  let left=1, right=distance;
  let mid = Math.max.apply(null, between);

  while(left <= right) {
    let remove = [];
    between.forEach((v, i) => {
      if(v < mid && i+1 != rocks.length-1) remove.push(i);
    });
    const count = remove.length;

    if(count > n) right = mid - 1;
    else if(count <= n) left = mid + 1;

    mid = Math.floor((left+right)/2);
  }
  return left;
}
*/

/*
function solution(distance, rocks, n) {
  rocks.sort((a,b) => a-b);
  rocks.push(distance);
  let between = rocks.map((v, idx) => {
    if(idx == 0) return v;
    else return v-rocks[idx-1];
  });
  rocks.unshift(0);
  let left=1, right=distance;
  let mid = Math.floor((left+right)/2);

  while(left <= right) {
    const remove = [];
    between.forEach((v, idx) => {
      if(v < mid) {
        if(remove[remove.length-1] != idx-1) {
          remove.push(idx);
        }
      }
    });
    let count = remove.length;
    if(remove.includes(0) && remove.includes(1)
      || remove.includes(between.length-2) && remove.includes(between.length-1)) {
      count -= 1;
    }

    if(count > n) right = mid - 1;
    else if(count <= n) left = mid + 1;

    mid = Math.floor((left+right)/2);
  }
  return left;
}
*/
