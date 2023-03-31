/*https://velog.io/@soyeon207/%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98-%EC%88%9C%EC%97%B4-yaxs0hh7*/

function perm(numbers, stack, indexArr, visited, strArr) {
  let index = stack.at(0).shift();
  visited[index] = true;
  indexArr.push(index);
  let visit_nodes = [];
  visited.map((v, idx) => {
    if(!v) visit_nodes.push(idx);
  });
  stack.unshift(visit_nodes);
  while(stack.at(0).length > 0) {
    perm(numbers, stack, indexArr, visited, strArr);
    
    visited[indexArr.pop()] = false;
    if(stack.at(0).length == 0) {
      stack.shift();
      return;
    }
  }
  let tmp = [];
  indexArr.forEach(idx => {
    tmp.push(idx);
    strArr.push(JSON.parse(JSON.stringify(tmp)));
  });
  stack.shift();
}

function solution(numbers) {
  numbers = numbers.split("");
  let indexArr = [];
  let visited = new Array(numbers.length).fill(false);
  let strArr = [];
  for(let i=0; i<numbers.length; i++) {
    let stack = [];
    stack.push([i]);
    perm(numbers, stack, indexArr, visited, strArr);
    
    visited[i] = false;
    indexArr = [];    
  }
  let candid = strArr.map(index => Number(index.reduce((acc, curr) => acc + numbers[curr], "")));

  // let candid = [];
  // const len = numbers.length;
  // for(let count=1; count<=len; count++) {
  //     // 정방향
  //     let indexArr = new Array(count).fill().map((v, idx) => idx-1);
  //     for(let i=0; i<len; i++) {
  //         indexArr = indexArr.map(index => ++index%len);
  //         let num = indexArr.reduce((acc, indexValue) => acc + numbers.at(indexValue), "");
  //         candid.push(Number(num));
  //     }
  //     // 역방향
  //     indexArr = new Array(count).fill().map((v, idx) => (len-idx)%len);
  //     for(let i=0; i<len; i++) {
  //         indexArr = indexArr.map(index => (len-1+index)%len);
  //         let num = indexArr.reduce((acc, indexValue) => acc + numbers.at(indexValue), "");
  //         candid.push(Number(num));
  //     }
  // }
  candid = Array.from(new Set([...candid]));
  candid = candid.filter(number => isPrime(number));
  return candid.length;
}

function isPrime(num) {
  var cnt = 0;
  for(var i=1; i*i <= num; i++) {
      if(i*i === num) cnt++;
      else if(num %i ===0) cnt+=2;
  }
  if(cnt == 2) return true;
  return false;
}
