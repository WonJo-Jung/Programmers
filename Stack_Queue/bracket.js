function solution(s){
  // if(s[0] === ")") return false;
  // let open = 0;
  // for(let i=0; i<s.length; i++) {
  //     s[i] === "(" ? open++ : open--;
  // 여기서 open이 음수인지 체크하지 않으면 "())("을 true로 오판함
  // }
  // if(open == 0) return true;
  // else return false;
  
  // s = s.split("");
  // return s.filter(chr => chr == "(").length == s.filter(chr => chr == ")").length;
  
  // while(s.includes("()")) {
  //     // s = s.replace("()", "");
  //     s = s.replace(/\(\)/g,'');
  // }
  // if(s.length == 0) return true;
  // else return false;
  
  let stack = [];
  if(s[0] === ")") return false;
  else stack.push(s[0]);
  for(let i=1; i<s.length; i++) {
    if(s[i] == ")") stack.pop();
    else stack.push(s[i]);
  }
  if(stack.length == 0) return true;
  else return false;
}
