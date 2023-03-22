function solution(begin, target, words) {
  let answer = [];
  let visited = [];
  visited.push(begin);
  if(words.some(word => word === target)) {
    DFS(target, words, getDistance(visited, words), visited, answer);
  } else {
      return 0;
  }
  return Math.min.apply(null, answer);
}

function DFS(target, words, distance, visited, answer) {
  if(visited[visited.length-1] === target) {
    console.log(visited.toString());
    answer.push(visited.length-1);
    visited.pop();
    return;
  }
  let target_dist = [];
  for(let i=0; i<distance.length; i++) {
    if(distance[i] === 1) target_dist.push(i);
  }
  if(!distance.includes(1) && visited[visited.length-1] !== target) {
    visited.pop();
    return;
  }
  for(let i=0; i<target_dist.length; i++) {
    visited.push(words[target_dist[i]]);
    DFS(target, words, getDistance(visited, words), visited, answer);
    if(i === target_dist.length-1)
      visited.pop();
  }
}

function getDistance(visited, words) {
  let distance = [];
  words.reduce((acc, currWord) => {
    if(visited.includes(currWord)) distance.push(0);
    else {
      let sum = 0;
      for(let i=0; i<visited[visited.length-1].length; i++)
        sum += visited[visited.length-1].charAt(i) === currWord.charAt(i) ? 0 : 1;
      distance.push(sum);
    }
  }, 0);
  return distance;
}
