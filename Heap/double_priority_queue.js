class MinHeap {
  constructor() {
    this.heap = [];
  }
  getLeftChildIndex = parentIndex => parentIndex * 2 + 1;
  getRightChildIndex = parentIndex => parentIndex * 2 + 2;
  getParentIndex = childIndex => ~~((childIndex-1) / 2);

  peek = () => this.heap[0];

  insert = (value) => {
    const node = value;
    this.heap.push(node);
    this.heapifyUp();
  };

  heapifyUp = () => {
    let index = this.heap.length - 1;
    const lastInsertNode = this.heap[index];

    while(index > 0) {
      const parentIndex = this.getParentIndex(index);

      if(this.heap[parentIndex] > lastInsertNode) {
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
        rightChildIndex < count && this.heap[rightChildIndex] < this.heap[leftChildIndex]
        ? rightChildIndex : leftChildIndex;

      if(this.heap[smallerChildIndex] <= rootNode) {
        this.heap[index] = this.heap[smallerChildIndex];
        index = smallerChildIndex;
      } else break;
    }

    this.heap[index] = rootNode;
  };

  delete = () => {
    const terminalNode = this.heap.pop();
    return terminalNode;
  };

  take = () => {
    return this.heap[0];
  }

  bring = () => {
    return this.heap[this.heap.length-1];
  }
}

class MinPriorityQueue extends MinHeap {
  constructor() {
    super();
  }

  enqueue = value => this.insert(value);
  dequeueFront = () => this.remove();
  dequeueBack = () => this.delete();
  isEmpty = () => this.heap.length <= 0;
  getFront = () => this.take();
  getBack = () => this.bring();
}

function solution(operations) {
  // 최소 힙으로 구현하되 삭제 연산 직전 오름차순 정렬해야 함
  let pqueue = new MinPriorityQueue();
  for(let i=0; i<operations.length; i++) {
    const operation = operations[i].split(" ");
    const operator = operation[0]; // 연산자
    const operand = operation[1]; // 피연산자

    if(operator === "I") {
      pqueue.enqueue(Number(operand));
    } else if(operator === "D") {
      if(pqueue.isEmpty()) continue;
      pqueue.heap.sort((a,b) => a-b);
      if(operand === "-1") {
        pqueue.dequeueFront();
      } else if(operand === "1") {
        pqueue.dequeueBack();
      }
    }
  }
  if(pqueue.isEmpty()) return [0,0];
  else {
    pqueue.heap.sort((a,b) => a-b);  
    return [pqueue.getBack(), pqueue.getFront()];
  }
}
