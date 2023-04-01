function solution(word) {
  if(word.length < 5) {
    word += new Array(5-word.length).fill("_").join("");
  }

  let alphabet = ["A", "E", "I", "O", "U"];
  let answer = new Array();
  answer[0] = ["_", "_", "_", "_", "_"];
  answer[1] = 0;
  let index = 0;

  while(word !== answer[0].join("")) {
    // "A"부터 시작
    answer[0][index] = "A";
    answer[1]++;
    // word의 알파벳이 A가 아니면 jump 수행
    if(word[index] !== "A") {
      answer[0][index] = word[index];
      // word의 알파벳의 인덱스는 곧 jump의 횟수
      let step = alphabet.indexOf(word[index]);
      if(index == word.length-1) answer[1] += step;
      // start recursive function
      else answer[1] += step * recursive(word.length - (index+1), 1);
    }
    index++;
  }

  return answer[1];
}

function recursive(digit, initValue) {
  if(digit == 0) return initValue;
  else return 1 + recursive(digit-1, initValue) * 5;
}
