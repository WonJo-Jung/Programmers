function solution(name) {
  let alphabet = [];
  let visited = new Array(name.length).fill(false);
  for(let i=0; i<name.length; i++) {
    const ascii = name[i].charCodeAt();
    if(ascii == 65) visited[i] = true;
    alphabet.push(Math.min(ascii-65, 91-ascii));
  }
  let position = 0;
  let answer = 0;
  while(!visited.every(v=>v)) {
    visited[position] = true;
    answer += alphabet[position];
    if(visited.every(v=>v)) break;

    let forward = -1, backward = -1, forward_position = -1, backward_position = -1;
    for(let i=1; i<name.length; i++) {
      let forw = (position+i)%name.length;
      let backw = position-i >= 0 ? position-i : name.length+(position-i);
      if(forward == -1 && !visited[forw]) {
        forward = i;
        forward_position = forw;
      }
      if(backward == -1 && !visited[backw]) {
        backward = i;
        backward_position = backw;
      }
      if(forward != -1 && backward != -1) break;
    }
    if(forward > backward) {
      answer += backward;
      position = backward_position;
    } else {
      answer += forward;
      position = forward_position;
    }
  }
  return answer;
}
