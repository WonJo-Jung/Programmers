/*https://velog.io/@davidko/%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%A8%B8%EC%8A%A4-%EB%94%94%EC%8A%A4%ED%81%AC-%EC%BB%A8%ED%8A%B8%EB%A1%A4%EB%9F%ACjava*/

/*
function solution(jobs) {
  // 문제에 시간 오름차순 정렬된 채로 주어진다는 언급 없음
  jobs = jobs.sort((a,b) => a[0]-b[0]);
  // 초기 상태에서는 작업을 수행하지 않으므로 바로 시작
  let progress = [];
  let current = jobs[0][1];
  progress.push(jobs.shift());
  while(jobs.length > 0) {
    // 현재 시간으로 부터 종료 시간이 가장 짧은 작업 선택
    // let j = 0, min_terminate = Infinity;
    // for(let i=0; i<jobs.length; i++) {
    //   if(jobs[i][1]-current < min_terminate) {
    //     j = i;
    //     min_terminate = jobs[i][1]-current;
    //   }
    // }
    // 현재 시간으로 부터 대기 시간이 가장 짧은 작업 선택
    // let j = 0, min_delay = Infinity;
    // for(let i=0; i<jobs.length; i++) {
    //   if(current > jobs[i][0]) {
    //     if(min_delay > current-jobs[i][0]) {
    //       j = i;
    //       min_delay = current-jobs[i][0];
    //     }
    //   }
    // }
    // 소요 시간이 가장 짧은 작업 선택
    let j = 0, min = jobs[j][1];
    for(let i = 1; i < jobs.length; i++) {
      if(jobs[i][0] <= current) {
        if(min > jobs[i][1]) {
          j = i;
          min = jobs[j][1];
        }
      }
      else break;
    }

    let on_process = jobs.splice(j, 1)[0]; // 요청 시간

    let delay = current - on_process[0]; // 대기 시간
    if(delay > 0) {
      current += on_process[1];
      on_process.push(delay + on_process.pop()); // 종료 시간
    } else {
      current += on_process[1] - delay;
    }

    progress.push(on_process);
  }
    //console.log(progress)
    let sum = progress.reduce((acc, curr) => acc + curr[1], 0);
    return ~~(sum / progress.length);
}
*/

class MinHeap {
  constructor() {
    this.heap = [];
  }
  getLeftChildIndex = parentIndex => parentIndex * 2 + 1;
  getRightChildIndex = parentIndex => parentIndex * 2 + 2;
  getParentIndex = childIndex => ~~((childIndex-1) / 2);

  peek = () => this.heap[0];

  insert = (key, value) => {
    const node = [key, value];
    this.heap.push(node);
    this.heapifyUp();
  };

  heapifyUp = () => {
    let index = this.heap.length - 1;
    const lastInsertNode = this.heap[index];

    while(index > 0) {
      const parentIndex = this.getParentIndex(index);

      if(this.heap[parentIndex][0] > lastInsertNode[0]) {
        this.heap[index] = this.heap[parentIndex];
        index = parentIndex;
      } else break;
    }

    this.heap[index] = lastInsertNode;
  };

  remove = () => {
    const count = this.heap.length;
    const rootNode = this.heap[0];

    if(count <= 0) return undefined;
    if(count == 1) this.heap = [];
    else {
      this.heap[0] = this.heap.pop();
      this.heapifyDown();
    }

    return rootNode;
  };

  heapifyDown = () => {
    let index = 0;
    const count = this.heap.length;
    const rootNode = this.heap[index];

    while(this.getLeftChildIndex(index) < count) {
      const leftChildIndex = this.getLeftChildIndex(index);
      const rightChildIndex = this.getRightChildIndex(index);

      const smallerChildIndex = 
        rightChildIndex < count && this.heap[rightChildIndex][0] < this.heap[leftChildIndex][0]
        ? rightChildIndex : leftChildIndex;

      if(this.heap[smallerChildIndex][0] <= rootNode[0]) {
        this.heap[index] = this.heap[smallerChildIndex];
        index = smallerChildIndex;
      } else break;
    }

    this.heap[index] = rootNode;
  };
}

class MinPriorityQueue extends MinHeap {
  constructor() {
    super();
  }

  enqueue = (priority, value) => this.insert(priority, value);
  dequeue = () => this.remove();
  isEmpty = () => this.heap.length <= 0;
}

/*
function solution(jobs) {
  // 문제에 크기 오름차순 정렬된 채로 주어진다는 언급 없음
  jobs = jobs.sort((a,b) => a[1]-b[1]);
  // MinPriorityQueue에 하나씩 insert
  let pqueue = new MinPriorityQueue();
  jobs.forEach(job => {
    pqueue.enqueue(job[1], job[0]);
  });

  // 하나씩 dequeue하면서 요청시간 ~ 종료시간 저장
  let answer = [];
  let job = pqueue.dequeue();
  let current = job[0];
  answer.push(job);
  for(let i=1; i<jobs.length; i++) {
    job = pqueue.dequeue();
    if(current > job[1]) {
      let delay = current-job[1];
      current += job[0];
      job[0] += delay;
    }
    else if (current < job[1]) current += (job[1]-current);
    answer.push(job);
  }
  let sum = answer.reduce((acc, curr) => acc + curr[0], 0);
  return sum / answer.length;
}
*/

function solution(jobs) {
  jobs.sort((a,b) => a[0]-b[0]);
  let pqueue = new MinPriorityQueue();
  let count = 0;
  let index = 0;
  let end = 0;
  let total = 0;

  while(count < jobs.length) {
    while(index < jobs.length && jobs[index][0] <= end) {
      pqueue.enqueue(jobs[index][0], jobs[index][1]);
      index++;
    }
    pqueue.heap.sort((a,b) => a[1]-b[1]);

    if(pqueue.isEmpty()) {
      end = jobs[index][0];
    } else {
      let curr = pqueue.dequeue();
      total += curr[1] + end - curr[0];
      end += curr[1];
      count++;
    }
  }
  return ~~(total/jobs.length);
}
