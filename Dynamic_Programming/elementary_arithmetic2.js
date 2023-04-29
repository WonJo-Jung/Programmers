function solution(arr) {
  let answer = [];
  arithmetic_operations(arr, answer);
  return Math.max.apply(null, answer);
}

function arithmetic_operations(arr, answer) {
  for(let i=0; i<Math.floor(arr.length/2); i++) {
    let newArr = JSON.parse(JSON.stringify(arr));
    let cal = newArr.splice(2*i, 3);
    const operator = cal[1];
    if(operator === "+") newArr.splice(2*i, 0, String(1*cal[0] + 1*cal[2]));
    else if(operator === "-") newArr.splice(2*i, 0, String(1*cal[0] - 1*cal[2]));
    if(newArr.length == 1) answer.push(1*newArr[0]);
    else arithmetic_operations(newArr, answer);
  }
}
