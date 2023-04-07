/*https://gurumee92.tistory.com/164*/

function solution(N, number) {
  if(N == number) return 1;
  /*
  SET(N, C) = 
  {N을 C번 연속해서 붙인 숫자}
  U
  {SET(N, 1) AND SET(N, C-1)}
  U
  {SET(N, 2) AMD SET(N, C-2)}
  U ... U
  {SET(N, C-2) AND SET(N, 2)}
  U
  {SET(N, C-1) AND SET(N, 1)}
  */
  // SET(N, C)를 저장할 memoization
  let memos = new Array();
  memos.push(new Array());
  // SET(N, 1) = {N}
  memos[0].push(N);
  // N을 최대 8번까지 사용할 수 있음
  // 중간에 number가 발견되면
  // 바로 N 개수 리턴
  for(let c=2; c<=8; c++) {
    memos.push(new Array());
    // N을 연속해서 붙인 숫자
    memos[c-1].push(new Array(c).fill(N).join("")*1);
    // SET(N, I) AND SET(N, C-I)
    for(let i=1; i<=c-1; i++) {
      // SET(N, I)
      for(let tmp1=0; tmp1<memos[i-1].length; tmp1++) {
        // SET(N, C-I)
        for(let tmp2=0; tmp2<memos[c-i-1].length; tmp2++) {
          // memos[i] 원소와 memos[c-i] 원소를 사칙연산한다
          memos[c-1].push(memos[i-1][tmp1] + memos[c-i-1][tmp2]);
          memos[c-1].push(memos[i-1][tmp1] - memos[c-i-1][tmp2]);
          memos[c-1].push(memos[i-1][tmp1] * memos[c-i-1][tmp2]);
          if(memos[c-i-1][tmp2] != 0) memos[c-1].push(~~(memos[i-1][tmp1] / memos[c-i-1][tmp2]));
        }
      }
    }
    memos[c-1] = Array.from(new Set([...memos[c-1]])); // 중복 제거
    if(memos[c-1].includes(number)) return c; // 발견됬으니까 바로 리턴
  }
  return -1;
}
