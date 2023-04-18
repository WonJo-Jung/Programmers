class Position {
  constructor(y, x, count) {
    this.y = y;
    this.x = x;
    this.count = count;
  }
}

function solution(maps) {
  let queue = [];
  queue.push(new Position(0,0,1));
  return game_map(maps, queue);
}

function game_map(maps, queue) {
  let answer = -1;
  const row = maps.length;
  const col = maps[0].length;
  while(queue.length > 0) {
    let pos = queue.shift();
    maps[pos.y][pos.x] = 0;
    if(pos.y == row-1 && pos.x == col-1) {
      return pos.count;
    }
    // down
    if(pos.y+1 < row && maps[pos.y+1][pos.x]) queue.push(new Position(pos.y+1, pos.x, pos.count+1));
    // right
    if(pos.x+1 < col && maps[pos.y][pos.x+1]) queue.push(new Position(pos.y, pos.x+1, pos.count+1));
    // up
    if(pos.y-1 > -1 && maps[pos.y-1][pos.x]) queue.push(new Position(pos.y-1, pos.x, pos.count+1));
    // left
    if(pos.x-1 > -1 && maps[pos.y][pos.x-1]) queue.push(new Position(pos.y, pos.x-1, pos.count+1));
  }
  return answer;
}
