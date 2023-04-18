class Position {
  constructor(y, x, count) {
    this.y = y;
    this.x = x;
    this.count = count;
  }
}

function solution(maps) {
  let stack = [];
  stack.push(new Position(0,0,1));
  return game_map(maps, stack);
}

function game_map(maps, stack) {
  let answer = -1;
  const row = maps.length;
  const col = maps[0].length;
  while(stack.length > 0) {
    let pos = stack.pop();
    if(!maps[pos.y][pos.x]) break;
    if(pos.y == row-1 && pos.x == col-1) {
      answer = pos.count;
      break;
    }
    maps[pos.y][pos.x] = 0;
    if(pos.x-1 > -1 && maps[pos.y][pos.x-1]) // left
      stack.push(new Position(pos.y, pos.x-1, pos.count+1));
    if(pos.y-1 > -1 && maps[pos.y-1][pos.x]) // up
      stack.push(new Position(pos.y-1, pos.x, pos.count+1));
    if(pos.y+1 < row && maps[pos.y+1][pos.x]) // down
      stack.push(new Position(pos.y+1, pos.x, pos.count+1));
    if(pos.x+1 < col && maps[pos.y][pos.x+1]) // right
      stack.push(new Position(pos.y, pos.x+1, pos.count+1));
  }
  return answer;
}
