/*https://born2bedeveloper.tistory.com/45*/

function solution(n, results) {
  let graph = new Array();
  for(let i=0; i<n+1; i++) {
    let arr = new Array(n+1).fill(Infinity);
    graph.push(arr);
  }

  for(let i=0; i<results.length; i++) {
    graph[results[i][0]][results[i][1]] = 1; // 이김
  }
  for(let i=0; i<=n; i++) {
    for(let j=0; j<=n; j++) {
      for(let k=0; k<=n; k++) {
        if(graph[j][i] == 1 && graph[i][k] == 1) graph[j][k] = 1;
      }
    }
  }
  let answer = 0;
  for(let i=1; i<=n; i++) {
    let game = 0;
    for(let j=1; j<=n; j++) {
      if(graph[i][j] == 1 || graph[j][i] == 1) game++;
    }
    if(game == n-1) answer++;
  }
  return answer;
}

/*
function solution(n, results) {
  let round = new Array(n).fill(0); // 0~n-1
  let remain = new Array(n).fill(n-1); // 0~n-1
  let ranks = new Array(n).fill(-1); // 0~n-1
  let victorys = new Map(), defeats = new Map(); // 0~n-1
  for(let i=0; i<n; i++) {
    victorys.set(i, new Array());
    defeats.set(i, new Array());
  }
  
  for(let i=0; i<results.length; i++) { // 1~n
    const result = results[i];
    // 이겼든 졌든 겨뤘으니까 1추가
    round[result[0]-1] += 1;
    round[result[1]-1] += 1;
    // 이겼으니까 승리할 남은 카운트 1감소
    remain[result[0]-1] -= 1;
    // 이겼거나 진 상대의 번호 저장
    let win = victorys.get(result[0]-1);
    let fail = defeats.get(result[1]-1);
    win.push(result[1]-1);
    fail.push(result[0]-1);
  }
  
  let players = [];
  round.forEach((r, idx) => {
    if(r == n-1) players.push(idx);
  });
  // 정확한 등수를 기준으로 유추할 수 있는 등수를 탐색
  for(let i=0; i<players.length; i++) {
    ranks[remain[players[i]]] = players[i];
  }
  for(let i=0; i<ranks.length; i++) {
    if(i > 0 && i < ranks.length - 1) {
      if(ranks[i-1] >= 0 && ranks[i] < 0 && ranks[i+1] >= 0) {
        let winner = ranks[i-1];
        let loser = ranks[i+1];
        // winner에게 졌지만 loser에게 이긴 사람 찾기
        let def_cands = victorys.get(winner);
        let win_cands = defeats.get(loser);
        let hero = def_cands.filter(cand => win_cands.includes(cand));
        round[hero[0]] = n-1;
        remain[hero[0]] = i;
        ranks[i] = hero[0];
        i++;
      }
    }
    else if(i == 0) {
      if(ranks[i+1] >= 0) {
        let loser = ranks[i+1];
        let win_cands = defeats.get(loser);
        round[win_cands[0]] = n-1;
        remain[win_cands[0]] = i;
        ranks[i] = win_cands[0];
        i++;
      }
    }
    else if(i == ranks.length - 1) {
      if(ranks[i-1] >= 0) {
        let winner = ranks[i-1];
        let def_cands = victorys.get(winner);
        round[def_cands[0]] = n-1;
        remain[def_cands[0]] = i;
        ranks[i] = def_cands[0];
      }
    }
  }
  return ranks.filter(r => r >= 0).length;
}
*/
