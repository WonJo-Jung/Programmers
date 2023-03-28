function solution(n, costs) {
  let parent = new Array(n).fill().map((v, index) => index);
  costs.sort((a,b) => a[2]-b[2]);

  let answer = [];
  for(let i=0; i<costs.length; i++) {
    if(findParent(costs[i][0], parent) != findParent(costs[i][1], parent)) {
      unionParent(costs[i], parent);
      answer.push(costs[i]);
      if(costs[i][0] < costs[i][1]) parent[costs[i][1]] = parent[costs[i][0]];
      else parent[costs[i][0]] = parent[costs[i][1]];
    }
    if(answer.length == n-1) break;
  }

  return answer.reduce((acc, curr) => acc + curr[2], 0);
  
  // let connected = new Array(n);
  // for(let i=0; i<n; i++) connected[i] = new Array();
  // for(let i=0; i<costs.length; i++) {
  //   connected[costs[i][0]].push(i);
  //   connected[costs[i][1]].push(i);
  // }

  // return DFS(n, costs, connected);
}

function findParent(node, parent) {
  if(node == parent[node]) return node;
  else return findParent(parent[node], parent);
}

function unionParent(cost, parent) {
  let parent0 = findParent(cost[0], parent);
  let parent1 = findParent(cost[1], parent);
  if(parent0 < parent1) parent[parent1] = parent0;
  else parent[parent0] = parent1;
}

// function DFS(n, costs, connected) {
//   let candid = [];
//   for(let i=0; i<n; i++) {
//     let used = new Array(costs.length).fill(false);
//     let visited = [];
//     let path = [];
//     DFS_node(i, n, costs, connected, used, visited, path, candid);
//   }
//   let array = [];
//   for(let i=0; i<candid.length; i++) {
//     let sum = candid[i].reduce((acc, curr) => acc + costs[curr][2], 0);
//     array.push(sum);
//   }
//   return Math.min.apply(null, array);
// }

// function DFS_node(node, n, costs, connected, used, visited, path, candid) {
//   for(let i=0; i<connected[node].length; i++) {
//     if(used[ connected[node][i] ]) continue;
//     if(costs[ connected[node][i] ][0] == node) {
//       used[ connected[node][i] ] = true;
//       let deepUsed = JSON.parse(JSON.stringify(used));
//       let deepVisited = JSON.parse(JSON.stringify(visited));
//       deepVisited.push(node);
//       path.push(connected[node][i]);
//       if(deepVisited.length == n) {
//         path.pop();
//         return JSON.parse(JSON.stringify(path));
//       }
//       else {
//         let shortest = DFS_node(costs[ connected[node][i] ][1], n, costs, connected, deepUsed, deepVisited, path, candid);
//         if(shortest !== undefined) {
//           candid.push(shortest);
//         }
//       }
//       used[ connected[node][i] ] = false;
//       path.pop();
//     } else if(costs[ connected[node][i] ][1] == node) {
//       used[ connected[node][i] ] = true;
//       let deepUsed = JSON.parse(JSON.stringify(used));
//       let deepVisited = JSON.parse(JSON.stringify(visited));
//       deepVisited.push(node);
//       path.push(connected[node][i]);
//       if(deepVisited.length == n) {
//         path.pop();
//         return JSON.parse(JSON.stringify(path));
//       }
//       else {
//         let shortest = DFS_node(costs[ connected[node][i] ][0], n, costs, connected, deepUsed, deepVisited, path, candid);
//         if(shortest !== undefined) {
//           candid.push(shortest);
//         }
//       }
//       used[ connected[node][i] ] = false;
//       path.pop();
//     }
//   }
// }
