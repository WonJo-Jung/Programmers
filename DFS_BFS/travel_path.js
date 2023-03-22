/*https://haerang94.tistory.com/339*/

// function solution(tickets) {
//     tickets.sort(); // 글자순 정렬
//     let vis=Array(tickets.length).fill(false);
//     var answer = [];
//     function dfs(cur,cnt,path){
//         if(cnt===tickets.length && answer.length===0){ //정렬했으므로 처음오는 경우의 수가 답
//             answer=path;
//             return;
//         }
//         for(let i=0;i<tickets.length;i+=1){
//             if(vis[i])continue;
//             if(tickets[i][0]===cur){ // 출발하는 공항이 같다.
//                 vis[i]=true;
//                 dfs(tickets[i][1],cnt+1,[...path,tickets[i][1]]);//배열 복사해서 넣어주기
//                 vis[i]=false;
//             }
//         }
//     }
//     dfs("ICN",0,["ICN"])
//     return answer;
// }

function solution(tickets) {
  let candid = [];
  let used = new Array(tickets.length).fill(false);
  let passed = [];
  
  // tickets, used, stack
  let stack = [];
  for(let i=0; i<tickets.length; i++) {
    if(tickets[i][0] === "ICN") {
      stack.push(i);
    }
  }

  // 역류가 일어날 횟수는 자식 노드 개수-1만큼 발생
  if(stack.length >= 2) {
    for(let i=0; i<stack.length-1; i++) {
      passed.push(0);
    }
  }
  
  DFS(used, tickets, passed, stack, candid);

  // 인덱스 배열 -> ticket 배열 -> 오름차순 정렬
  // -> 맨 앞 경로 반환
  let answer = [];
  for(let i=0; i<candid.length; i++) {
    const path = candid[i].split(",");
    let arr = [];
    arr.push("ICN");
    for(let j=0; j<path.length; j++) {
      arr.push(tickets[path[j]][1]);
    }
    answer.push(arr);
  }
  if(answer.length > 1) {
    answer = answer.sort((a, b) => {
      if(a<b) return -1;
      else if(a>b) return 1;
    });
  }
  return answer[0];
}

function DFS(used, tickets, passed, stack, candid) {
  let path = [];
  while(stack.length > 0) {
    let index = stack.pop();
    path.push(index);
    used[index] = true;
    const start = tickets[index][1]; // 도착지를 출발지로 설정
    let added = 0;
    for(let i=0; i<tickets.length; i++) {
      if(!used[i] && tickets[i][0] === start) {
        stack.push(i);
        added++;
      }
    }
    
    // 역류가 일어날 횟수는 자식 노드 개수-1만큼 발생
    if(added>=2) {
      for(let i=0; i<added-1; i++) {
        passed.push(path.length);
      }
    }

    // 사용되지 않은 것이 하나도 없는 것은
    // 순회 완성
    if(!used.includes(false)) {
      candid.push(path.toString());
      path = backtracking(stack[stack.length-1], passed, path, used)
    } else if(added === 0) {
      // 사용되지 않은 것이 아직 있는 데도 추가가 안된 것은
      // 더 이상 순회할 것이 없음을 암시
      path = backtracking(stack[stack.length-1], passed, path, used)
    }
  }
}

function backtracking(idx, passed, path, used) {
  if(idx === undefined) {
    return [];
  }
  const branch_idx = passed.pop();
  let reset = path.slice(branch_idx);
  for(let j=0; j<reset.length; j++) {
    used[reset[j]] = false;
  }
  path = path.slice(0, branch_idx);
  return path;
}
