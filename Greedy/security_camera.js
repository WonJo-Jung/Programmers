function solution(routes) {
    routes.sort((a,b) => a[0]-b[0]);
    let min=routes[0][0], max=routes[0][1], cctv=new Array(routes.length).fill().map((v,index)=>index);
    for(let i=1; i<routes.length; i++) {
        if( (routes[i][0] >= min && routes[i][0] <= max) || 
            (routes[i][1] >= min && routes[i][1] <= max) ) {
            cctv[i] = cctv[i-1];
            if(routes[i][0] > min) {
                min = routes[i][0];
            }
            if(routes[i][1] < max) {
                max = routes[i][1];
            }
        } else {
            min = routes[i][0];
            max = routes[i][1];
        }
    }
    cctv = Array.from(new Set([...cctv]));
    // console.log(cctv);
    return cctv.length;
}

// 0: [-20,-15] = 0
// 1: [-18,-13] = 0
// 2: [-14,-5] = 1
// 3: [-5,-3] = 1
