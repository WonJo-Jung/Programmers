function solution(number, k) {
  number = number.split("").map(n=>1*n);
  let str = number.splice(0, number.length - k);
  for(let i=0; i<number.length; i++) {
    for(let j=0; j<str.length-1; j++) {
      if(1*str[j] < 1*str[j+1]) {
        str.splice(j, 1);
        str.push(number[i]);
        break;
      }
    }
    /*let min = Math.min.apply(null, str), index = 0;
    let indexof = str.indexOf(min, index);
    while(indexof != -1) {
      if(str[indexof] < str[indexof+1]) {
        str.splice(indexof, 1);
        str.push(number[i]);
        break;
      }
      index = indexof + 1;
      indexof = str.indexOf(min, index);
    }*/
  }
  /*let str = [];
  for(let i=0; i<number.length-1; i++) {
    if(number[i] <= number[i+1]) str.push(number[i+1]);
    else str.push(number[i]);
  }*/
  return str.join("");
}
