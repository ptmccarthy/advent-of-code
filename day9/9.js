var fs = require('fs');

fs.readFile('input.txt', 'utf8', function(err, contents) {
  var distances = contents.split('\n');
  var distanceMap = buildDistanceMap(distances);
  var solution = calculatePaths(distanceMap);

  console.log(solution);
});

// Build a map so that given any initial point a, it is easy
// to lookup the distance to any other point b.
var buildDistanceMap = function(distances) {
  var distanceMap = {};
  distances.forEach(function(distance) {
    var split = distance.split(' ');
    var a = split[0];
    var b = split[2];
    var dist = parseInt(split[4]);

    if (!distanceMap[a]) {
      distanceMap[a] = {};
    }

    if (!distanceMap[b]) {
      distanceMap[b] = {};
    }

    distanceMap[a][b] = dist;
    distanceMap[b][a] = dist;
  });

  return distanceMap;
};

var calculatePaths = function(distanceMap) {
  var nodes = Object.keys(distanceMap);
  var permutations = permutateNodes(nodes);
  var shortestPath = {};
  var longestPath = { distance: 0 };

  permutations.forEach(function(perm) {
    var totalDistance = 0;
    for (var i = 0; i < perm.length - 1; i++) {
      totalDistance += distanceMap[perm[i]][perm[i+1]];
    }

    if (totalDistance < shortestPath.distance || !shortestPath.distance) {
      shortestPath.distance = totalDistance;
      shortestPath.route = perm;
    }

    if (totalDistance > longestPath.distance) {
      longestPath.distance = totalDistance;
      longestPath.route = perm;
    }
  });

  return [shortestPath, longestPath];
};

var permutateNodes = function(nodes) {
  var permutations = [];

  if (nodes.length === 1) {
    return [nodes];
  }

  for (var i = 0; i < nodes.length; i++) {
    var subPermutations = permutateNodes(nodes.slice(0, i).concat(nodes.slice(i + 1)));
    for (var j = 0; j < subPermutations.length; j++) {
      subPermutations[j].unshift(nodes[i]);
      permutations.push(subPermutations[j]);
    }
  }

  return permutations;
}