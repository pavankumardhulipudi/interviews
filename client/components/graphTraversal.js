(function(){
  var exBFSGraph = [
	[0, 1, 1, 1, 0], //0
  [0, 0, 1, 0, 0], //1
  [1, 1, 0, 0, 0], //2
  [0, 0, 0, 1, 0], //3
  [0, 1, 0, 0, 0], //4
];

var output = {
	0: 2,
  1: 0,
  2: 1,
  3: 3,
  4: Infinity
}


const calculateGraphDistances = function(graph, distanceFrom) {
	let output = {};
  for(let i=0; i< graph.length; i++) {
  	output[i] = Infinity;
  }
  output[distanceFrom] = 0;
  let readVertices = new Set();
  readVertices.add(distanceFrom);
  let queue = [distanceFrom];
  let distance = 0;
  while(queue.length > 0) {
  	++distance;
    let currentNode = queue.shift();
    for(let i=0; i<graph[currentNode].length; i++) {
      if(graph[currentNode][i] === 1 && !readVertices.has(i)) {
        output[i] = distance;
        queue.push(i);
        readVertices.add(i);
      }
    }
  }
  console.log("calculateGraphDistances Distance from ------", output);
}
calculateGraphDistances(exBFSGraph, 1);
})();
