function solution(genres, plays) {
  // 1. 장르의 횟수 합 ↑
  // 2. 장르 내 횟수 ↑
  // 3. 고유번호 ↓
  let genre_kind = Array.from(new Set([...genres]));
  // 장르의 횟수 합
  let genre_sum = new Map();
  // 장르 내 횟수
  let genre_play = new Map();
  for(kind of genre_kind) {
      genre_sum.set(kind, 0);
      genre_play.set(kind, new Array());
  }
  // 장르의 횟수 합과 장르 내 횟수 구하기
  genres.forEach((genre, idx) => { 
      genre_sum.set(genre, genre_sum.get(genre) + plays[idx])
      let play_index = [idx, plays[idx]];
      genre_play.get(genre).push(play_index);
  });
  // 오름차순 정렬
  genre_sum = new Map([...genre_sum.entries()].sort((a,b) => b[1]-a[1]));
  genre_play.forEach(arr => arr.sort((a,b) => b[1]-a[1]));
  
  let answer = [];
  for(let genre of genre_sum.keys()) {
    const playlist = genre_play.get(genre);
    for(let i=0; i<playlist.length; i++) {
      if(i == 2) break;
      answer.push(playlist[i][0]);
    }
  }
  return answer;
}
