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
      }
    }
  }
  return time;
}
