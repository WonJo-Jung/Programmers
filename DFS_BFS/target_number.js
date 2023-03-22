function solution(numbers, target) {
  let answer = 0;
  let tree = [0];
  for(let i=0; i<numbers.length; i++) {
    let array = new Array(2**(i+1)).fill(numbers[i]);
    tree = tree.concat(array);
  }
  
  // tree, stack, visited
  let stack = [];
  let visited = new Array(tree.length).fill(false);
  visited[0] = true;
  stack.push(0);
  let cal = [];

  while(visited.indexOf(false) !== -1) {
    const curr_indx = stack[stack.length-1];
    cal.push(curr_indx); // instead of pop
    if(!visited[Math.abs(curr_indx)]) {
      visited[Math.abs(curr_indx)] = true;
    }
    if(cal.length === numbers.length+1) {
      stack.pop();
      const sum = cal.reduce((sum, currVal) => {
        if(currVal < 0) {
          return sum - tree[-currVal];
        } else {
          return sum + tree[currVal];
        }
      }, 0);
      if(sum === target) {
        answer++;
      }
      cal.pop();
      while(cal[cal.length-1] === stack[stack.length-1]) {
        cal.pop();
        stack.pop();
        if(cal.length === 0 && stack.length === 0) {
          break;
        }
      }
      continue;
    }
    if(!visited[2*Math.abs(curr_indx)+1]) {
      stack.push(2*Math.abs(curr_indx)+1);
    }
    if(!visited[2*Math.abs(curr_indx)+2]) {
      stack.push(-(2*Math.abs(curr_indx)+2));
    }
  }

  return answer;
}
