class MinHeap {
  constructor() {
    this.heap = [];
  }
  getLeftChildIndex = parentIndex => parentIndex * 2 + 1;
  getRightChildIndex = parentIndex => parentIndex * 2 + 2;
  getParentIndex = childIndex => ~~((childIndex-1) / 2);

  peek = () => this.heap[0];

  insert = (key, value) => {
    const node = {key, value};
    this.heap.push(node);
    this.heapifyUp();
  };

  heapifyUp = () => {
    let index = this.heap.length - 1;
    const lastInsertNode = this.heap[index];

    while(index > 0) {
      const parentIndex = this.getParentIndex(index);

      if(this.heap[parentIndex].value > lastInsertNode.value) {
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
        rightChildIndex < count && this.heap[rightChildIndex].value < this.heap[leftChildIndex].value
        ? rightChildIndex : leftChildIndex;

      if(this.heap[smallerChildIndex].value <= rootNode.value) {
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

  enqueue = (node, priority) => this.insert(node, priority);
  dequeue = () => this.remove();
  isEmpty = () => this.heap.length <= 0;
}

function solution(n, edge) {
  let map = new Map();
  for(let i=0; i<n; i++) {
    map.set(i, new Array());
  }
  for(let i=0; i<edge.length; i++) {
    let node1 = edge[i][0]-1, node2 = edge[i][1]-1;
    let connected1 = map.get(node1);
    let connected2 = map.get(node2);
    connected1.push(node2);
    connected2.push(node1);
  }
  let shortest = new Array(n).fill(Infinity);
  shortest[0] = 0;

  let queue = new MinPriorityQueue(); // shortest가 priority
  queue.enqueue(0, 0); // node 번호, 거리
  let max = 0;
  
  while(!queue.isEmpty()) {
    let info = queue.dequeue(); // key : node 번호, value, 거리(우선순위)
    let nodes = map.get(info.key);
    for(let i=0; i<nodes.length; i++) {
      if(shortest[nodes[i]] > info.value+1) {
        shortest[nodes[i]] = info.value+1;
        queue.enqueue(nodes[i], shortest[nodes[i]]);
        if(max < shortest[nodes[i]]) max = shortest[nodes[i]];
      }
    }
  }
  return shortest.filter(dist => dist == max).length;
}
