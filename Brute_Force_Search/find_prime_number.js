function perm(numbers, stack, strArr, visited, indexArr) {
  let index = stack.at(0).shift();
  visited[index] = true;
  strArr.push(index);
  let element = [];
  visited.map((v, idx) => {
    if(!v) element.push(idx);
  });
  stack.unshift(element);
  while(stack.at(0).length > 0) {
    perm(numbers, stack, strArr, visited, indexArr);
    
    visited[strArr.pop()] = false;
    if(stack.at(0).length == 0) {
      stack.shift();
      return;
    }
  }
  let tmp = [];
  strArr.forEach(idx => {
    tmp.push(idx);
    indexArr.push(JSON.parse(JSON.stringify(tmp)));
  });
  stack.shift();
}

function solution(numbers) {
  numbers = numbers.split("");
  let strArr = [];
  let visited = new Array(numbers.length).fill(false);
  let indexArr = [];
  for(let i=0; i<numbers.length; i++) {
    let stack = [];
    stack.push([i]);
    perm(numbers, stack, strArr, visited, indexArr);
    
    visited[i] = false;
    strArr = [];    
  }
  let candid = indexArr.map(index => Number(index.reduce((acc, curr) => acc + numbers[curr], "")));

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
