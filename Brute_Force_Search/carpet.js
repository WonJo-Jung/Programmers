/*https://school.programmers.co.kr/questions/27737*/

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
