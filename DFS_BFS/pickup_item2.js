class Position {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  getX() {
    return this.x;
  }
  getY() {
    return this.y;
  }
}

function solution(rectangle, startX, startY, endX, endY) {
  // up down left right
  const stepX = [0,0,-1,1];
  const stepY = [1,-1,0,0];
  let count = [-1,0];
  let stack = [], prev = null;
  stack.push(new Position(startX, startY));
  for(let i=0; i<count.length; i++) {

    while(stack.length) {
      let current = stack.pop();
      count[i]++;
      if(current.getX() == endX && current.getY() == endY) break;
      for(let j=0; j<4; j++) {
        let next = new Position(current.getX()+stepX[j], current.getY()+stepY[j]);
        const result = getResult(rectangle, prev, current, next);
        if(result == "goback" || result == "inside" || result == "through" || result == "cross") continue;
        else stack.push(next);
      }
      prev = current;
    }
    prev = new Position(startX, startY);

  }
  return Math.min.apply(null, count);
}

function getResult(rectangle, prev, me, next) {

  // 1. goback
  const goback = prev !== null && next.getX() == prev.getX() && next.getY() == prev.getY();
  if(goback) return "goback";

  let rect = [], cross = [];
  for(let i=0; i<rectangle.length; i++) {

    // 2. inside
    if(next.getX() > rectangle[i][0] && next.getX() < rectangle[i][2] && next.getY() > rectangle[i][1] && next.getY() < rectangle[i][3]) {
      return "inside";
    }
    // 3. through
    if(next.getY() > rectangle[i][1] && next.getY() < rectangle[i][3] && me.getY() > rectangle[i][1] && me.getY() < rectangle[i][3]) {
      if((next.getX() == rectangle[i][0] && me.getX() == rectangle[i][2]) || (next.getX() == rectangle[i][2] && me.getX() == rectangle[i][0]))
        return "through";
    } else if(next.getX() > rectangle[i][0] && next.getX() < rectangle[i][2] && me.getX() > rectangle[i][0] && me.getX() < rectangle[i][2]) {
      if((next.getY() == rectangle[i][1] && me.getY() == rectangle[i][3]) || (next.getY() == rectangle[i][3] && me.getY() == rectangle[i][1]))
        return "through";
    }
    // 4. cross
    if(me.getX() >= rectangle[i][0] && me.getX() <= rectangle[i][2] && next.getX() >= rectangle[i][0] && next.getX() <= rectangle[i][2] && me.getX() == next.getX()) {
      if(me.getY() >= rectangle[i][1] && me.getY() <= rectangle[i][3] && (next.getY() > rectangle[i][3] || next.getY() < rectangle[i][1])) {
        cross.push(i);
      }
    } else if(me.getY() >= rectangle[i][1] && me.getY() <= rectangle[i][3] && next.getY() >= rectangle[i][1] && next.getY() <= rectangle[i][3] && me.getY() == next.getY()) {
      if(me.getX() >= rectangle[i][0] && me.getX() <= rectangle[i][2] && (next.getX() < rectangle[i][0] || next.getX() > rectangle[i][2])) {
        cross.push(i);
      }
    }
  }

  for(let i=0; i<rectangle.length; i++) {
    if(rectangle[i][0] == next.getX() || rectangle[i][2] == next.getX()) {
      if(rectangle[i][1] <= next.getY() && next.getY() <= rectangle[i][3]) {
        rect.push(i);
        if(cross.length > 0) {
          if((rectangle[i][1] > me.getY() || rectangle[i][3] < me.getY()))
            cross.push(i);
          else
            cross.pop();
        }
      }
    }
    else if(rectangle[i][0] < next.getX() && next.getX() < rectangle[i][2]) {
      if(rectangle[i][1] == next.getY() || rectangle[i][3] == next.getY()) {
        rect.push(i);
        if(cross.length > 0) {
          if((rectangle[i][1] > me.getY() || rectangle[i][3] < me.getY()))
            cross.push(i);
          else
            cross.pop();
        }
      }
    }
  }

  if(cross.length == 1) {
    if(rect.length > 0) return rect;
    else  return "cross";
  } else if(cross.length == 2) {
    return "cross";
  }
  else if(cross.length == 0) {
    return rect;
  }
}
