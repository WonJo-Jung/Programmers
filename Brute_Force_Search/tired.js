function solution(antitired, dungeons) {
  let visited = new Array(dungeons.length).fill(false);
  let stack = [];
  let answer = [];
  for(let i=0; i<dungeons.length; i++) {
    stack.push([i]);
    find(antitired, dungeons, visited, 0, answer, stack);
    stack = [];
  }
  return Math.max.apply(null, answer);
}

function find(antitired, dungeons, visited, local, answer, stack) {
  let index = stack.at(stack.length-1).shift();
  if(dungeons[index][0] > antitired) {
    answer.push(local);
    return;
  }
  antitired -= dungeons[index][1];
  visited[index] = true;

  let not_visited = [];
  visited.forEach((v, index) => {
    if(!v) not_visited.push(index);
  });
  stack.push(not_visited);
  local++;

  while(stack.at(stack.length-1).length > 0) {
    find(antitired, dungeons, visited, local, answer, stack);
  }
  if(visited.every(v => v)) answer.push(local);
  stack.pop();
  visited[index] = false;
  return;
}
