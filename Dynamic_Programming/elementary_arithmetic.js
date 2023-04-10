/*https://papercraft-blog.tistory.com/2*/

function solution(arr) {
  let dp_max = new Array(), dp_min = new Array();
  for(let i=0; i<200; i++) {
    dp_max.push(new Array(200).fill(-Infinity));
    dp_min.push(new Array(200).fill(Infinity));
  }

  let answer = 1;
  let num = ~~(arr.length / 2) + 1;
  // 초기화 ==> 연산을 0번한 결과
  for(let i=0; i<num; i++) {
    dp_max[i][i] = Number(arr[i*2]);
    dp_min[i][i] = Number(arr[i*2]);
  }

  // 연산 횟수가 1번부터 부호개수 횟수(최대 연산횟수)까지 결산
  for(let calc=1; calc<num; calc++) {
    // i번째 숫자, ... , j번째 숫자
    for(let i=0; i<num-calc; i++) {
      let j = calc + i;
      // i번째 숫자, ..., (k번째 숫자), ..., j번째 숫자
      // k번째 숫자를 기준으로 중간 결산된 양 계산 결과를 불러오기
      for(let k=i; k<j; k++) {
        if(arr[k*2+1] === "-") {
          dp_max[i][j] = Math.max(dp_max[i][j], dp_min[i][k] - dp_min[k+1][j]);
          dp_min[i][j] = Math.min(dp_min[i][j], dp_min[i][k] - dp_max[k+1][j]);
        } else if(arr[k*2+1] === "+") {
          dp_max[i][j] = Math.max(dp_max[i][j], dp_max[i][k] + dp_max[k+1][j]);
          dp_min[i][j] = Math.min(dp_min[i][j], dp_min[i][k] + dp_min[k+1][j]);
        }
      }
    }
  }

  answer = dp_max[0][num-1];
  return answer;
}
