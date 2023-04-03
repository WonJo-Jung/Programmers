function solution(priorities, location) {
  let indexes = new Array(priorities.length).fill().map((v, idx) => idx);
  let answer = 1;
  while(true) {
    while(priorities.filter(p => p > priorities[0]).length > 0) {
      priorities.push(priorities.shift());
      indexes.push(indexes.shift());
    }
    if(indexes[0] == location) return answer;
    priorities.shift();
    indexes.shift();
    answer++;
  }

  // let indexes = new Array(priorities.length).fill().map((v,idx) => idx);
  // let max = Math.max.apply(null, priorities);
  // let max_index = priorities.indexOf(max);
  // indexes = indexes.map(idx => {
  //   if(idx-max_index < 0) idx = priorities.length - max_index + idx;
  //   else idx -= max_index;
  //   return idx;
  // });
  // return indexes.at(location) + 1;
}
