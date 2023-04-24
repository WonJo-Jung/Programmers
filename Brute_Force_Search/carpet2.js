function solution(brown, yellow) {
  let total = brown+yellow;
  let divisors = getDivisors(total);
  if(divisors.length % 2 == 0) return [divisors.pop(), divisors.pop()];
  else return new Array(2).fill(divisors.pop());
}

function getDivisors(number) {
  let divisors = [];
  for(let i=1; i<=Math.sqrt(number); i++) {
    if(number % i == 0) {
      divisors.push(i);
      if(i != number/i) divisors.push(number/i);
    }
  }
  return divisors;
}
