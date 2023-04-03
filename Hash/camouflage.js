function solution(clothes) {
  let map = new Map();
  clothes.forEach(cloth => {
    map.has(cloth[1]) ? 
      map.set(cloth[1], map.get(cloth[1])+1) : 
      map.set(cloth[1], 1);
  });
  let count = Array.from(map.values());
  // 모든 종류에서 하나도 포함시키지 않는 경우는 제외
  let cases = count.reduce((acc, curr) => acc * (curr+1), 1) - 1;
  return cases;
}
