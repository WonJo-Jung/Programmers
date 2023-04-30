function solution(numbers) {
  let max= -1;
  numbers = numbers.map(n => {
    let t = n + "";
    if(max < t.length) max = t.length;
    return t;
  });
  let buckets = new Array(10);
  for(let i=0; i<max; i++) {
    for(let i=0; i<10; i++) buckets[i] = new Array();
    numbers.forEach(n => {
      if(i < n.length) buckets[n[i]].push(n);
      else buckets[n[n.length-1]].push(n);
    });
    numbers = buckets.flat(1);
  }
  return numbers.reverse().join("");
}
