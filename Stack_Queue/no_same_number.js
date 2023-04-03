function solution(arr) {
  let answer = [];
  let num = arr[0];
  answer.push(num);
  for(let i=1; i<arr.length; i++) {
    if(arr[i] != num) {
      num = arr[i];
      answer.push(num);
    }
  }
  return answer;
}
