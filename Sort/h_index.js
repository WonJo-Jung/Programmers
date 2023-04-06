/*https://school.programmers.co.kr/learn/courses/14743/lessons/118838*/

function solution(citations) {
  citations = citations.sort((a,b) => b-a);
  for(i=0; i<citations.length; i++) {
    if((citations[i]>i+1 && citations[i+1]<i+1) || i+1 == citations[i] || i+1 == citations[i+1])
      return i+1;
  }
  if(citations[0] == 0) return 0; // 길이 불문 첫번째가 0이면 0리턴 [0,1,...] [0]
  if(citations.length == 1)  return citations[0]; // 길이가 1이면 첫번째 리턴 [5]
  else return citations.length; // 길이가 1보다 길다면 길이 리턴 [997,998,999,1000]
}
