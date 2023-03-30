/*https://school.programmers.co.kr/questions/27737*/

/*
테스트 케이스가 (18,6) 이면 답은 (8,3)이어야 함
왜냐면 총합이 24일 때 답을 (6,4)라고 하면
테스트 케이스 (16, 8) 또한 답이 (6,4)이기 때문.
개인적으론 잘 이해되지 않는 측면.
*/

function solution(brown, yellow) {
  let divisors = getDivisors(brown+yellow);
  if(divisors.length % 2 == 0) {
    let position = [1,2];
    while( (divisors.at(divisors.length-position[0])-2) * (divisors.at(divisors.length-position[1])-2) != yellow ) {
      position = position.map(index => index+2);
    }
    return [divisors.at(divisors.length-position[0]), divisors.at(divisors.length-position[1])];
  }
  else return [divisors.at(divisors.length-1), divisors.at(divisors.length-1)];
}

function getDivisors(num) {
  let divisors = [];
  for(let i=1; i<=Math.sqrt(num); i++) {
    if(num%i == 0) {
      divisors.push(i);
      if(num/i != i) divisors.push(num/i);
    }
  }
  return divisors;
}
