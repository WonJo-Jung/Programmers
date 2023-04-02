function solution(pocket) {
  // 포켓몬 종류 당 개수
  let map = new Map();
  pocket.forEach(p => {
    map.has(p) ? map.set(p, map.get(p)+1) : map.set(p, 1);
  });
  map = new Map([...map.entries()].sort((a,b) => a[1]-b[1]));
  let max = pocket.length/2; // 선택 가능한 최대 종류 개수
  let answer = [];
  while(answer.length < max) {
    // max에 도달하지 못했지만 포켓몬 없으면 break
    if(map.size == 0) break;
    for(let key of map.keys()) {
      // 이미 max에 도달했으면 return
      if(answer.length == max) return Array.from(new Set([...answer])).length;
      answer.push(key);
      map.set(key, map.get(key)-1);
      if(map.get(key) == 0) map.delete(key);
    }
  }
  return Array.from(new Set([...answer])).length;
}
