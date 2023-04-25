function solution(n, times) {
  times.sort((a,b) => a-b);
  let r = times[times.length-1] * n;
  let l = 1;
  let m;
  while(l<=r) {
    m = ~~((l+r)/2);
    let total = times.reduce((acc, curr) => acc += ~~(m/curr), 0);
    if(total < n) l = m+1;
    else r = m-1;
  }
  return l;
}
