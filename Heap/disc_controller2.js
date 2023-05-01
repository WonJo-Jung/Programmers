function solution(jobs) {
  let len = jobs.length;
  jobs.sort((a,b) => a[0]-b[0] || a[1]-b[1]);
  let job = jobs.shift();
  let now = job[0] + job[1];
  let answer = job[1] - job[0];
  while(jobs.length) {
    let index = -1, min = Infinity;
    for(let i=0; i<jobs.length; i++) {
      if(now > jobs[i][0]) {
        if(min > jobs[i][1]) {
          index = i;
          min = jobs[i][1];
        }
      }
    }
    if(index != -1) {
      job = jobs.splice(index, 1)[0];
      answer += now - job[0] + job[1];
      now += job[1];
    } else {
      job = jobs.shift();
      answer += job[1];
      now += job[1] + job[0] - now;
    }
  }
  return Math.floor(answer / len);
}
