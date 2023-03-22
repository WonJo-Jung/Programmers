function solution(game_board, table) {
  let answer = 0;

  // 각 모양 찾기
  let rooms = getShapes(game_board, 0);
  let pieces = getShapes(table, 1);

  // 각 모양마다 인덱스 모으기
  rooms = getShapeArrays(rooms);
  pieces = getShapeArrays(pieces);

  // 각 모양마다 (0,0) 기준으로 변환
  rooms = getShapeOrigin(rooms);
  pieces = getShapeOrigin(pieces);

  let filled = new Array(rooms.length).fill(-1);
  for(let r=0; r<rooms.length; r++) {
    const room = rooms[r];
    for(let p=0; p<pieces.length; p++) {
      let piece = pieces[p];
      // room이 piece보다 크면 break
      // room보다 piece가 크면 continue
      // 같으면 비교
      if(room.length > piece.length) break;
      else if(room.length < piece.length) continue;
      // 1. 개수가 같음?
      else {
        // 2. 위상이 같음?
        if(JSON.stringify(room) === JSON.stringify(piece)) {
          filled[r] = p;
          pieces = pieces.filter(candid => candid !== piece);
          break;
        }
        // 3. 3번씩 90도 회전하면 같음?
        else {
          const success = getRotation(room, piece);
          if(success) {
            filled[r] = p;
            pieces = pieces.filter(candid => candid !== piece);
            break;
          }
        }
      }
    }
  }

  for(let i=0; i<filled.length; i++) {
    if(filled[i] !== -1) answer += rooms[i].length;
  }

  return answer;
}

function getRotation(room, piece) {
  // (y축, x축) = (+y, +x) -> (+x, -y)
  let rotate_piece = [];
  for(let n=0; n<3; n++) {
    let minY = Infinity;
    for(let p=0; p<piece.length; p++) {
      let rotate = [piece[p][1], -1 * piece[p][0]];
      rotate_piece.push(rotate);
      minY = minY > -1*piece[p][0] ? -1*piece[p][0] : minY;
    }
    rotate_piece = rotate_piece.map(rotate => [rotate[0], rotate[1]-minY]);
    // 회전 시 unit의 위치도 완전 동일할 순 없을 수 있으니까
    // room에 piece의 unit이 있는지만 확인
    let tmp = [...room];
    for(let rp=0; rp<rotate_piece.length; rp++) {
      for(let r=0; r<tmp.length; r++) {
        if(JSON.stringify(rotate_piece[rp]) === JSON.stringify(tmp[r])) {
          tmp.splice(r, 1);
          break;
        }
      }
    }
    if(tmp.length === 0) return true;
    else {
      piece = [...rotate_piece];
      rotate_piece = [];
    }
  }
  return false;
}

function getShapeOrigin(array) {
  for(let i=0; i<array.length; i++) {
    // 최소 y값은 무조건 array[i][0][0]
    // 최소 x값은 for문으로 찾아야 함
    let minX = Infinity;
    for(let j=0; j<array[i].length; j++) {
      if(minX > array[i][j][1]) minX = array[i][j][1]; 
    }
    let minY = array[i][0][0];
    array[i] = array[i].map(idx => {
      idx[0] -= minY;
      idx[1] -= minX;
      return idx;
    });
  }
  array = array.sort((a,b) => {
    if(a.length < b.length) return 1;
    else if(a.length > b.length) return -1;
  });
  return array;
}

function getShapeArrays(array) {
  let set = new Set(array[1]);
  let shapeArray = [];
  set.forEach(idt => {
    let indexes = [];
    for(let i=0; i<array[1].length; i++) {
      if(array[1][i] === idt) indexes.push(i);
    }
    let b = [];
    for(let i=0; i<indexes.length; i++) {
      b.push(array[0][indexes[i]]);
    }
    shapeArray.push(b);
  });
  return shapeArray;
}

function getShapes(array, target) {
  let shapes = []; // (y, x) 좌표값 저장
  let identity = []; // (y, x)의 id 저장
  let id = 0;
  for(let y=0; y<array.length; y++) {
    for(let x=0; x<array[y].length; x++) {
      if(array[y][x] === target) { // 수집할 숫자와 같음?
        // 단, 왼쪽과 위쪽에 인접한 모양이 있는지 확인
        if( (x-1 >= 0 && array[y][x-1] === target)
          || (y-1 >= 0 && array[y-1][x] === target) ) {
          let idx = Infinity;
          if(x-1 >= 0 && array[y][x-1] === target) { // 왼쪽에 인접한 모양
            shapes.forEach((unit, index) => {
              if(unit[0] === y && unit[1] === x-1) {
                idx = index;
              }
            });
          }
          if(y-1 >= 0 && array[y-1][x] === target) { // 위쪽에 인접한 모양
            shapes.forEach((unit, index) => {
              if(unit[0] === y-1 && unit[1] === x) {
                // 왼쪽, 위쪽 모두 인접해 있다면
                // 그 중 최소의 인덱스를 골라야 함
                // 왜냐면 위쪽의 인덱스가 먼저 매겨지기 때문
                if(idx !== Infinity) {
                  // 그 전에 왼쪽 모양의 인덱스를 위쪽 인덱스로
                  // 갱신해야 함
                  identity = identity.map(idt => idt !== identity[idx] ? idt : identity[index]);
                  idx = Math.min(idx, index);
                } else {
                  idx = index;
                }
              }
            });
          }
          shapes.push([y, x]);
          identity.push(identity[idx]);
        }
        // 인접한 모양이 없다면 인덱스 저장
        // 저장 시 id는 새로운 모양으로 가정하여 1증가
        else {
          shapes.push([y, x]);
          identity.push(id++);
        }
      }
    }
  }
  return [shapes, identity];
}
