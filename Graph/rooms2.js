function solution(arrows) {
  const dx = [0,1,1,1,0,-1,-1,-1];
  const dy = [1,1,0,-1,-1,-1,0,1];
  let nodeMap = new Map();
  nodeMap.set("0,0", []);
  let current = [0,0];
  let answer = 0;
  for(let i=0; i<arrows.length; i++) {
    const arrow = arrows[i];
    for(let j=0; j<2; j++) {
      let directions = nodeMap.get(current.toString());
      directions.push(arrow);
      current[0] += dx[arrow];
      current[1] += dy[arrow];
      if(!nodeMap.get(current.toString())) {
        if(arrow >= 4) nodeMap.set(current.toString(), [arrow-4]);
        else nodeMap.set(current.toString(), [arrow+4]);
      } else {
        let directions = nodeMap.get(current.toString());
        let direction = arrow >= 4 ? arrow-4 : arrow+4;
        if(!directions.includes(direction)) {
          answer++;
          directions.push(direction);
        }
      }
    }
  }
  return answer;
}
