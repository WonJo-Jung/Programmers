function solution(n, computers) {
  let answer = 1;
  let visited = new Array(n).fill(false);
  let queue = [];
  queue.push(0);
  while(queue.length >= 0) {
      if(queue.length === 0) {
          let not_visited = visited.indexOf(false);
          if(not_visited !== -1) {
              queue.push(not_visited);
              answer++;
              continue;
          } else {
              return answer;
          }
      }
      let idx = queue.shift();
      visited[idx] = true;
      for(let i=0; i<computers[idx].length; i++) {
          if(i === idx || visited[i]) {
              continue;
          }
          if(computers[idx][i] === 1) {
              queue.push(i);
          }
      }
  }
}
