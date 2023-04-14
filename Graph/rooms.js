/*https://yabmoons.tistory.com/606*/

function solution(arrows) {
  const direction = [[-1,0],[-1,1],[0,1],[1,1],[1,0],[1,-1],[0,-1],[-1,-1]];
  let nodeMap = new Map(), edgeMap = new Map();

  let answer=0;
  let x=0, y=0;
  nodeMap.set(`[${x}, ${y}]`, true);
  for(let i=0; i<arrows.length; i++) {
    let dir = arrows[i];
    for(let j=0; j<2; j++) {
      let nx = x + direction[dir][0];
      let ny = y + direction[dir][1];

      if(nodeMap.get(`[${nx}, ${ny}]`) == true && edgeMap.get(`[[${x}, ${y}], [${nx}, ${ny}]]`) == undefined) {
        edgeMap.set(`[[${x}, ${y}], [${nx}, ${ny}]]`, true);
        edgeMap.set(`[[${nx}, ${ny}], [${x}, ${y}]]`, true);
        answer++;
        x = nx;
        y = ny;
        continue;
      }

      nodeMap.set(`[${nx}, ${ny}]`, true);
      edgeMap.set(`[[${x}, ${y}], [${nx}, ${ny}]]`, true);
      edgeMap.set(`[[${nx}, ${ny}], [${x}, ${y}]]`, true);
      x = nx;
      y = ny;
    }
  }
  return answer;
}

/*
function solution(arrows) {
  const direction = [[0,1],[1,1],[1,0],[1,-1],[0,-1],[-1,-1],[-1,0],[-1,1]];
  let nodes = [], map = new Map(), prev = "0,0";
  nodes.push("0,0");
  map.set("0,0", new Array());
    
  for(let i=0; i<arrows.length; i++) {
    const move = direction[arrows[i]];
    let next = prev.split(",").map(pos => Number(pos));
    next[0] += move[0]; next[1] += move[1];
    next = next.join(",");
    if(!nodes.includes(next)) {
      let connected = map.get(prev);
      connected.push(next);
      nodes.push(next);
      map.set(next, new Array());
    } else {
      let connected = map.get(next);
      connected.push(prev);
      connected = map.get(prev);
      connected.push(next);
    }
    prev = next;
  }
  return 0;
}
*/
