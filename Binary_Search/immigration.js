/*https://ckd2806.tistory.com/entry/%ED%8C%8C%EC%9D%B4%EC%8D%AC-python-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%A8%B8%EC%8A%A4-%EC%9E%85%EA%B5%AD%EC%8B%AC%EC%82%AC
https://taesung1993.tistory.com/63*/

function solution(n, times) {
  times.sort((a,b) => a-b);
  let left=0, right=times[times.length-1]*n;
  let mid = Math.floor((left+right)/2);

  while(left <= right) {
    const count = times.reduce((result, cur) => result + Math.floor(mid/cur), 0);

    if(count >= n) right = mid - 1;
    else if(count < n) left = mid + 1;

    mid = Math.floor((left+right)/2);
  }
  return left;
}

/*
function solution(n, times) {
  let queue;
  if(n > times.length) queue = new Array(n-times.length).fill().map((v, idx) => idx+times.length);
  else return Math.max.apply(null, times);
  let remain_times = JSON.parse(JSON.stringify(times));
  let current_time = 0;
  while(queue.length > 0) {
    let least_time = Math.min.apply(null, remain_times);
    current_time += least_time;
    remain_times = remain_times.map(time => {
      if(time > 0) time -= least_time;
      return time;
    });
    
    let my_times = remain_times.map((time, idx) => {
      return [time + times[idx], idx];
    });
    let my_time = my_times.sort((a,b) => a[0]-b[0]);
    let officer = my_time[0][1];
    if(remain_times[officer] > 0) {
      current_time += remain_times[officer];
      remain_times = remain_times.map(time => {
        if(time > 0) time -= remain_times[officer];
        return time;
      });
    }
    remain_times[officer] = times[officer];
    queue.shift();
  }
  current_time += Math.max.apply(null, remain_times);
  return current_time;
}
*/
