/*https://velog.io/@sudago22/%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%A8%B8%EC%8A%A4-%EC%A1%B0%EC%9D%B4%EC%8A%A4%ED%8B%B1-JavaScript-22%EB%85%84-%EC%B6%94%EA%B0%80%EB%90%9C-%ED%85%8C%EC%8A%A4%ED%8A%B8-%EC%BC%80%EC%9D%B4%EC%8A%A4*/

function solution(name) {
    let changeAlphabet = 0;
    let minMoves = name.length - 1;
    
    for (let i = 0; i < name.length; i++) {
        let changeNum = name.charCodeAt(i);
        
        if (changeNum < 78) {
            changeAlphabet += changeNum - 65;
        } else { 
            changeAlphabet += 91 - changeNum;
        }
        
        
        let index = i + 1;
        while (index < name.length && name[index] == 'A') index++;
        
        minMoves = Math.min(minMoves, (i*2) + name.length - index);
        minMoves = Math.min(minMoves, (name.length - index) * 2 + i); // ✨ 바뀐 부분
    }

    return changeAlphabet + minMoves;
}
