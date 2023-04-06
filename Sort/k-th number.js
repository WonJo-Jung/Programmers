function solution(array, commands) {
  //commands의 길이 만큼 반복.
  //자르고 정렬 : slice(시작점, 끝점).sort(오름차순 정렬)
  //answer에 n번째 숫자 push
  var answer = [];
    
  for(var i=0; i<commands.length;i++){
    var list = array.slice(commands[i][0]-1, commands[i][1]).sort((a,b)=>{return a-b});
    answer.push(list[commands[i][2]-1]);
  }

  return answer;
}
