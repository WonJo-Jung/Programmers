/*https://papercraft-blog.tistory.com/2*/

function solution(arr) {
  let dp_max = new Array(), dp_min = new Array();
  for(let i=0; i<200; i++) {
    dp_max.push(new Array(200).fill(-Infinity));
    dp_min.push(new Array(200).fill(Infinity));
  }

  let answer = 1;
  let num = ~~(arr.length / 2) + 1;
  // 초기화 ==> 연산을 0번한 결과
  for(let i=0; i<num; i++) {
    dp_max[i][i] = Number(arr[i*2]);
    dp_min[i][i] = Number(arr[i*2]);
  }

  // 연산 횟수가 1번부터 부호개수 횟수(최대 연산횟수)까지 결산
  for(let calc=1; calc<num; calc++) {
    // i번째 숫자, ... , j번째 숫자
    for(let i=0; i<num-calc; i++) {
      let j = calc + i;
      // i번째 숫자, ..., (k번째 숫자), ..., j번째 숫자
      // k번째 숫자를 기준으로 중간 결산된 양 계산 결과를 불러오기
      for(let k=i; k<j; k++) {
        if(arr[k*2+1] === "-") {
          dp_max[i][j] = Math.max(dp_max[i][j], dp_min[i][k] - dp_min[k+1][j]);
          dp_min[i][j] = Math.min(dp_min[i][j], dp_min[i][k] - dp_max[k+1][j]);
        } else if(arr[k*2+1] === "+") {
          dp_max[i][j] = Math.max(dp_max[i][j], dp_max[i][k] + dp_max[k+1][j]);
          dp_min[i][j] = Math.min(dp_min[i][j], dp_min[i][k] + dp_min[k+1][j]);
        }
      }
    }
  }

  answer = dp_max[0][num-1];
  return answer;
}

// function solution(arr) {
//   // [0,1,2,3,4,5,...] -> [0, 2, 4,...]
//   // 숫자의 개수를 구한다
//   const numsLength = (arr.length+1) / 2; // 부호개수+1
//   let numIndexs = new Array(numsLength).fill().map((v, idx) => idx);
//   let calcMap = new Map(); // memoization
//   let answer = bracket(arr, numIndexs, [-1], calcMap);
//   answer = Array.from(new Set([...answer]));
//   return Math.max.apply(null, answer);
// }

// function bracket(arr, numIndexs, calcArrIndexs, calcMap) {
//   // 부분 결과 계산
//   if(calcArrIndexs[0] > -1) {
//     for(const calcArrIndex of calcArrIndexs) {
//       const leftOperandIndex = calcArrIndex*2, rightOperandIndex = calcArrIndex*2+2;
//       let partArr = arr.slice(leftOperandIndex, rightOperandIndex+1);
//       let partCalc = calculate(partArr);
//       if(partCalc < 0) {
//         if(arr[leftOperandIndex-1] === "+") arr[leftOperandIndex-1] = "-";
//         else if(arr[rightOperandIndex-1] === "-") arr[rightOperandIndex-1] = "+";
//       }
//       arr = arr.slice(0, leftOperandIndex).concat(arr.slice(rightOperandIndex+1));
//       arr.splice(leftOperandIndex, 0, String(Math.abs(partCalc)));
//     }
//   }
//   // 피연산자가 2개만 남았으면 결과 저장
//   if(arr.length == 3) {
//     let calc = calculate(arr);
//     calcMap.set(JSON.stringify(numIndexs), [calc]);
//     return calc;
//   }
//   // [0,1,2,3,4,5,...] -> [0, 2, 4,...]
//   // 숫자의 개수를 구한다
//   const numsLength = ~~(numIndexs.length / 2);
//   // 숫자 인덱스 2개짜리 배열이 1개부터 num_length/2까지의 모든 계산 결과를 구한다
//   // 전체 인덱스 길이가 2라면 계산 결과를 저장
//   // 인덱스 배열은 string으로 저장
//   // 스키마 : 인덱스 배열 문자열 : 계산 결과 배열
//   let calcs = []; // 부분 계산 결과 리턴받을 공간
//   for(let num_length=1; num_length<=numsLength; num_length++) {
//     let keyArr = [];
//     // 괄호칠 숫자 인덱스 배열의 왼쪽 성분
//     let startIndexs;
//     // 인덱스 배열 문자열 key
//     for(let idx = 0; idx < numIndexs.length-1; idx++) {
//       // 왼쪽 숫자 인덱스 배열 초기화
//       startIndexs = new Array(num_length).fill().map((v,i) => i*2+idx);
//       // 앞으로 괄호 칠 숫자의 인덱스가 총 인덱스 배열 길이를 넘어갈 수 없으니까
//       // 불필요한 반복 중단
//       if(startIndexs[0] + num_length*2 > numIndexs.length) break;
//       if(num_length == 1) {
//         // 숫자 인덱스 배열 깊은 복사
//         let numIndexsKey = JSON.parse(JSON.stringify(numIndexs));
//         // 배열 성분 보존
//         numIndexsKey = numIndexsKey.map(indexKey => indexKey = JSON.stringify(indexKey));
//         // 인덱스 합치기
//         numIndexsKey[idx] = '[' + numIndexsKey[idx];
//         numIndexsKey[idx+1] = numIndexsKey[idx+1] + ']';
//         keyArr.push("["+numIndexsKey.join(",")+"]");
//       } else {
//         // 숫자 인덱스 2개짜리 배열 개수만큼 한꺼번에 괄호친다
//         while(startIndexs.at(startIndexs.length-1) + 1 < numIndexs.length) {
//           // 숫자 인덱스 배열 깊은 복사
//           let numIndexsKey = JSON.parse(JSON.stringify(numIndexs));
//           // 배열 성분 보존
//           numIndexsKey = numIndexsKey.map(indexKey => indexKey = JSON.stringify(indexKey));
//           for(let indexsCount = 0; indexsCount < num_length; indexsCount++) {
//             // 인덱스 합치기
//             numIndexsKey[startIndexs[indexsCount]] = '[' + numIndexsKey[startIndexs[indexsCount]];
//             numIndexsKey[startIndexs[indexsCount]+1] = numIndexsKey[startIndexs[indexsCount]+1] + ']';
//             if(indexsCount > 0) startIndexs[indexsCount] += 1;
//           }
//           keyArr.push("["+numIndexsKey.join(",")+"]");
//         }
//       }
//     }
//     // 키 개수가 2개 이상이면 재귀
//     if(keyArr.length >= 2) {
//       let partCalcs = [];
//       for(let i=0; i<keyArr.length; i++) {
//         // 계산 결과가 저장되어 있지 않으면 재귀
//         if(!Array.from(calcMap.keys()).includes(keyArr[i])) {
//           partCalcs.push(bracket(JSON.parse(JSON.stringify(arr)), JSON.parse(keyArr[i]), [i], calcMap));
//         }
//         // 저장되어 있으면 그냥 저장
//         else {
//           partCalcs = partCalcs.concat(calcMap.get(keyArr[i]));
//         }
//       }
//       // 리턴할 부분 결과 계산
//       calcs = calcs.concat(partCalcs);
//       calcs = calcs.flat(Infinity);
//     }
//     // 키 개수가 1개라면 계산
//     else {
//       // 계산 결과가 저장되어 있지 않으면 계산
//       if(!Array.from(calcMap.keys()).includes(keyArr[0])) {
//         calcs.push(bracket(JSON.parse(JSON.stringify(arr)), JSON.parse(keyArr[0]), [0,1], calcMap));
//       }
//       // 저장되어 있으면 그냥 저장
//       else {
//         calcs = calcs.concat(calcMap.get(keyArr[0]));
//       }
//     }
//   }
//   calcMap.set("["+numIndexs.map(indexKey => indexKey = JSON.stringify(indexKey)).join(",")+"]", calcs);
//   return calcs;
// }

// calculate = (arr) => {
//   if(arr[1] === "+") return Number(arr[0]) + Number(arr[2]);
//   else if(arr[1] === "-") return Number(arr[0]) - Number(arr[2]);
// }
