function solution(number, k) {
  let stack = [];
  for(let i=0; i<number.length; i++) {
    while(k > 0 && stack[stack.length-1] < number[i]) {
      stack.pop();
      k--;
    }
    stack.push(number[i]);
  }
  stack.splice(stack.length-k, k);
  
  return stack.join("");

  // const l = number.length - k; // 정답의 길이

  // let answer = number.slice(0, len);

  // outer : for(let i=len; i<number.length; i++) {
  //   let j=0;
  //   for(; j<answer.length-1; j++) {
  //     if(answer[j] < answer[j+1]) {
  //       answer = answer.slice(0, j) + answer.slice(j+1);
  //       answer += number[i];
  //       continue outer;
  //     }
  //   }
  //   if(answer[j] < number[i]) {
  //     answer = answer.slice(0, j);
  //     answer += number[i];
  //   }
  // }

  // return answer;
  
  // // 숫자마다 인덱스 배열
  // let map = new Map();
  // for(let i=0; i<number.length; i++) {
  //   if(map.has(number[i])) map.get(number[i]).push(i);
  //   else {
  //     let arr = [];
  //     arr.push(i);
  //     map.set(number[i], arr);
  //   }
  // }

  // // sort by key
  // map = new Map([...map].sort().reverse());

  // let mapValues = Array.from(map.values()).flat();

  // // 길이가 len인 것 만들기
  // let insert = mapValues.slice(0, len);
  // sortArray(insert);

  // // insert가 아닌 숫자가 등장하면
  // // insert 아닌 숫자를 포함해서 앞의 숫자들이 오름차순 정렬 되어 있으면 삽입 불가
  // outer : for(let i=Math.min.apply(null, insert); i<=number.length-1; i++) {
  //   if(!insert.includes(i)) {
  //     let j=0;
  //     for(; j<=insert.length-1; j++) {
  //       if(insert[j+1] > i) break; // 비교할 뒷 숫자 위치가 현재 위치를 벗어나면 안됨
  //       // 현재 insert 아닌 숫자 앞의 insert가 오름차순이 아니라면
  //       // 삽입
  //       if(number[insert[j]] < number[insert[j+1]]) {
  //         let k=j+2;
  //         for(; k<=insert.length-1; k++) {
  //           if(insert[k] > i) break;
  //         }
  //         insert.splice(k, 0, i); // [...,5,7,(8),...]
  //         insert.splice(j, 1); // [...,7,8,...]
  //         continue outer;
  //       }
  //     }
  //     if(number[insert[j]] < number[i]) {
  //       // insert의 마지막 숫자가 현재 insert 아닌 숫자보다 작으면
  //       // 바꾸기
  //       insert[j] = i; // [...,3,2,(3),...] [...,3,3,...]
  //     }
  //   }
  // }
  
  // let answer = insert.reduce((acc, index) => acc+number[index], "");
  // return answer;
}

// function sortArray(array) {
//   array.sort((a,b) => {
//     if(a<b) return -1;
//     else if(a>b) return 1;
//     else return 0;
//   });
// }
