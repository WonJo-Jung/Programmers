function solution(bridge_length, weight, truck_weights) {
  let doing =  [], done = [];
  let sum = 0, time = 0, count = truck_weights.length;
  while(done.length < count) {
    time++;
    doing.forEach(t => {
      t[1]++;
    });
    if(doing.length > 0 && doing[0][1] == bridge_length) {
      const t = doing.shift();
      sum -= t[0];
      done.push(t);
    }
    if(truck_weights.length > 0) {
      let truck = truck_weights.shift();
      if(sum+truck > weight) {
        truck_weights.unshift(truck); // like deque
      }
      else {
        doing.push([truck, 0]);
        sum += truck;
        /* *** 추가된 코드 ***
           *** 새로운 트럭을 삽입 후 다리가 꽉차서 시간만 흘러가거나
           *** 더 이상 삽입할 트럭이 없으면 최선입 트럭의 남은 시간을
           *** 더해 점프한다 */
        if(sum+truck_weights[0] > weight || truck_weights.length == 0) {
          const jump = bridge_length-doing[0][1]-1;
          doing.forEach(t => {
            t[1] += jump;
          });
          time += jump;
        }
        /* *** */
      }
    }
  }
  return time;
}

/* 아래는 점프 없이 time을 하나씩 증가시키는 방식 */
// function solution(bridge_length, weight, truck_weights) {
//   let doing =  [], done = [];
//   let sum = 0, time = 0, count = truck_weights.length;
//   while(done.length < count) {
//     time++;
//     doing.forEach(t => {
//       t[1]++;
//     });
//     if(doing.length > 0 && doing[0][1] == bridge_length) {
//       const t = doing.shift();
//       sum -= t[0];
//       done.push(t);
//     }
//     if(truck_weights.length > 0) {
//       let truck = truck_weights.shift();
//       if(sum+truck > weight) {
//         truck_weights.unshift(truck); // like deque
//       }
//       else {
//         doing.push([truck, 0]);
//         sum += truck;
//       }
//     }
//   }
//   return time;
// }
