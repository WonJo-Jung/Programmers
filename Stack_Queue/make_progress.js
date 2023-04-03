function solution(progresses, speeds) {
  var answer = [];
  answer = progess_speed(progresses, speeds);
  return answer;
}

function progess_speed(progresses, speeds) {
  var remainder_progress = progresses.map(p => 100-p);
  var remainder_day = [];
  for(var i=0; i<speeds.length; i++) {
    var day = Math.ceil(remainder_progress[i]/speeds[i]); //3
    if(remainder_day.length === 0) {
      remainder_day.push({day: day, count: 1}); //(7,2),(9,1)
    } else {
      if(remainder_day[remainder_day.length-1].day >= day) {
        remainder_day[remainder_day.length-1].count += 1;
      } else {
        remainder_day.push({day: day, count: 1});
        }
      }
  }
  return remainder_day.map(info => info.count);
}
