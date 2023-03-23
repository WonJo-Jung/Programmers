/*https://velog.io/@sudago22/%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%A8%B8%EC%8A%A4-%EC%A1%B0%EC%9D%B4%EC%8A%A4%ED%8B%B1-JavaScript-22%EB%85%84-%EC%B6%94%EA%B0%80%EB%90%9C-%ED%85%8C%EC%8A%A4%ED%8A%B8-%EC%BC%80%EC%9D%B4%EC%8A%A4*/

function solution(name) {
    let answer = 0;
    let length, reverseLength;

    answer = Array.from(name).reduce((count, char) => {
        if (char !== 'A') {
            if (char.charCodeAt(0) - 'A'.charCodeAt(0) < 'Z'.charCodeAt(0) - char.charCodeAt(0) + 1) {
                count += char.charCodeAt(0) - 'A'.charCodeAt(0);
            } else {
                count += 'Z'.charCodeAt(0) - char.charCodeAt(0) + 1;
            }
        }
        return count;
    }, 0);

    for (let i=1; i < name.length; i++) {
        if (name[i] !== 'A') {
            reverseLength = name.length - i;
            break;
        }
    }

    for (let i=name.length; i > 0; i--) {
        if (name[i] !== 'A') {
            length = i;
            break;
        }
    }

    console.log(length, reverseLength);

    return answer + (length < reverseLength ? length : reverseLength);
}
