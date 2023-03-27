/*https://velog.io/@euneun/%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%A8%B8%EC%8A%A4-%EA%B5%AC%EB%AA%85%EB%B3%B4%ED%8A%B8-%EA%B7%B8%EB%A6%AC%EB%94%94-javascript*/

function solution(people, limit) {
  let boat = 0;
  people.sort((a,b) => b-a); // 큰 것은 앞으로 -> 내림차순
  let last = people.length;
  // 가장 빽빽하게 모으는 방법은 가장 큰 것과
  // 가장 작은 것을 같이 모으는 것.
  for(let i=0; i<last; i++) {
    boat++;
    if(people[i] + people[last-1] <= limit) {
      last--;
    }
  }
  return boat;
}
