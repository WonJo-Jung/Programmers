function solution(n, edges) {
  let edgeMap = new Map();
  for(const edge of edges) {
    if(Array.from(edgeMap.keys()).includes(edge[0])) {
      let arr = edgeMap.get(edge[0]);
      arr.push(edge[1]);
    } else {
      let arr = [edge[1]];
      edgeMap.set(edge[0], arr);
    }
    if(Array.from(edgeMap.keys()).includes(edge[1])) {
      let arr = edgeMap.get(edge[1]);
      arr.push(edge[0]);
    } else {
      let arr = [edge[0]];
      edgeMap.set(edge[1], arr);
    }
  }
  let visited = new Array(n+1).fill(false), distance = new Array(n+1).fill(Infinity);
  distance[1] = 0;
  let nodes = [1];
  while(nodes.length) {
    let node = nodes.shift();
    visited[node] = true;
    let others = edgeMap.get(node);
    for(let i=0; i<others.length; i++) {
      distance[others[i]] = Math.min(distance[others[i]], distance[node]+1);
      if(!visited[others[i]] && !nodes.includes(others[i])) nodes.push(others[i]);
    }
    edgeMap.delete(node);
  }
  distance.shift();
  let max = Math.max.apply(null, distance);
  return distance.filter(d => d == max).length;
}
