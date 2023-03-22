function solution(rectangle, characterX, characterY, itemX, itemY) {
  let answer = [];
  // rectangle 0: minX, 1: minY, 2: maxX, 3: maxY
  let stack = [];
  stack.push([characterX, characterY]);
  let visited = [];
  while(stack.length > 0) {
      const curr = stack.pop();
      visited.push(curr);
      if(curr[0] === itemX && curr[1] === itemY) {
          answer.push(visited.length-1);
          visited = visited.slice(0, 1);
          continue;
      }
      let rect_idx = [];
      // 현재 위치가 어느 사각형 위에 있는지 체크
      for(let i=0; i<rectangle.length; i++) {
          if( ((curr[0] === rectangle[i][0] || curr[0] === rectangle[i][2])
              && (curr[1] >= rectangle[i][1] && curr[1] <= rectangle[i][3])) // minX or maxX
              || ((curr[1] === rectangle[i][1] || curr[1] === rectangle[i][3])
              && (curr[0] >= rectangle[i][0] && curr[0] <= rectangle[i][2])) // minY, maxY
              ) {
              rect_idx.push(i);
          }
      }
      // 앞으로 이동할 정점을 이미 방문했거나
      // 어떤 사각형 면적 안에 들어가거나
      // 어떤 사각형 면적을 뚫고 지나간다면
      // 이동할 정점에서 제외
      let left = 0, right = 0, bottom = 0, top = 0;
      for(let i=0; i<rect_idx.length; i++) {
          const idx = rect_idx[i];
          if(curr[0] === rectangle[idx][0]) {
              if(curr[1] > rectangle[idx][1]
              && curr[1] < rectangle[idx][3]) {
                  bottom = 1;
                  top = 1;
              } else if(curr[1] === rectangle[idx][1]) {
                  right = 1;
                  top = 1;
              } else if(curr[1] === rectangle[idx][3]) {
                  right = 1;
                  bottom = 1;
              }
          } else if(curr[0] > rectangle[idx][0]
                  && curr[0] < rectangle[idx][2]) {
              left = 1;
              right = 1;
          } else if(curr[0] === rectangle[idx][2]) {
              if(curr[1] > rectangle[idx][1]
              && curr[1] < rectangle[idx][3]) {
                  bottom = 1;
                  top = 1;
              } else if(curr[1] === rectangle[idx][1]) {
                  left = 1;
                  top = 1;
              } else if(curr[1] === rectangle[idx][3]) {
                  left = 1;
                  bottom = 1;
              }
          }
      }
      let new_pos = [curr[0]-1, curr[1]];
      if(left && !notpass(rectangle, curr, [-1,0]) && !checkVisited(visited, new_pos))
          stack.push(new_pos);
      new_pos = [curr[0]+1, curr[1]];
      if(right && !notpass(rectangle, curr, [1,0]) && !checkVisited(visited, new_pos))
          stack.push(new_pos);
      new_pos = [curr[0], curr[1]-1];
      if(bottom && !notpass(rectangle, curr, [0,-1]) && !checkVisited(visited, new_pos))
          stack.push(new_pos);
      new_pos = [curr[0], curr[1]+1];
      if(top && !notpass(rectangle, curr, [0,1]) && !checkVisited(visited, new_pos))
          stack.push(new_pos);
  }
  return Math.min.apply(null, answer);
}

function notpass(rectangle, curr, direction) {
  const currX = curr[0];
  const currY = curr[1];
  for(let i=0; i<rectangle.length; i++) {
      const inbox = currX + direction[0] > rectangle[i][0]
      && currX + direction[0] < rectangle[i][2]
      && currY + direction[1] > rectangle[i][1]
      && currY + direction[1] < rectangle[i][3];
      const throughbox = 
              ( ((currX === rectangle[i][0] && currX + direction[0] === rectangle[i][2]) 
              || (currX === rectangle[i][2] && currX + direction[0] === rectangle[i][0]))
          && (currY > rectangle[i][1] && currY < rectangle[i][3]) )
          ||
          ( ((currY === rectangle[i][1] && currY + direction[1] === rectangle[i][3])
          || (currY === rectangle[i][3] && currY + direction[1] === rectangle[i][1]))
          && (currX > rectangle[i][0] && currX < rectangle[i][2]) );
      if(inbox || throughbox) {
          return true;
      }
  }
  return false;
}

function checkVisited(visited, new_pos) {
  for(let i=0; i<visited.length; i++) {
      const pos = visited[i];
      if(pos[0] === new_pos[0] && pos[1] === new_pos[1])
      return true;
  }
  return false;
}
