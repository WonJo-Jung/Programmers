/*https://danminblog.tistory.com/40*/

// function solution(numbers) {
//   // numbers에 있는 숫자는 모두 문자열로 바꿈과 동시에
//   // 최대 길이(자리수)를 구한다.
//   let max_length = 0;
//   numbers = numbers.map(num => {
//     let str = String(num);
//     if(max_length < str.length) max_length = str.length;
//     return str;
//   });
//   // 가장 작은 자리수 부터 시작해서 radix sort한다.
//   for(let i=0; i<max_length; i++) {
//     let radix_queue = new Array();
//     for(let j=0; j<10; j++) radix_queue.push(new Array());
//     numbers.forEach(str => {
//       if(str.length-1-i >= 0) radix_queue.at(Number(str[str.length-1-i])).push(str);
//       else radix_queue.at(Number(str[0])).push(str);
//     });
//     numbers = radix_queue.flat(Infinity);
//   }
//   return numbers.reverse().join("");
// }

function solution(numbers) {
  numbers = numbers.map(num => String(num));
  numbers = numbers.sort((a,b) => Number(b+a)-Number(a+b));
  // console.log(numbers);
  numbers = numbers.join("");
  return numbers[0] === "0" ? "0" : numbers;
}
