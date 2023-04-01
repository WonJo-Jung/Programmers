function solution(n, wires) {
  wires = wires.map(wire => {
    wire[0] -= 1;
    wire[1] -= 1;
    return wire;
  });
  let answer = [];
  for(let i=0; i<wires.length; i++) {
    // except i's wire(or link)
    let newWires = wires.slice(0, i).concat(wires.slice(i+1));
    let queue = [newWires[0][0]];
    let visited = new Array(n).fill(false);

    let len = bfs(newWires, queue, visited);
    let otherLen = n-len;
    answer.push(Math.abs(len-otherLen));
  }
  return Math.min.apply(null, answer);
}

function bfs(wires, queue, visited) {
  while(queue.length > 0) {
    let node = queue.shift();
    visited[node] = true;
    for(let i=0; i<wires.length; i++) {
      if(wires[i].includes(node)) {
        if(wires[i][0] == node) {
          if(!visited[wires[i][1]]) queue.push(wires[i][1]);
        }
        else {
          if(!visited[wires[i][0]]) queue.push(wires[i][0]);
        }
      }
    }
  }
  return visited.filter(v => v).length;
}
