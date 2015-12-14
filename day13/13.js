var fs = require('fs');
var _ = require('lodash');

fs.readFile('input.txt', 'utf8', function(error, contents) {
  var links = buildLinkTable(contents.split('\n'));
  var solution = optimizeHappiness(links);

  console.log('Optimum arrangement: ' + JSON.stringify(solution));
});

// build a map of all possible one-way connections and how much
// happiness it adds/removes
// part 2: inject yourself into the table with no happiness deltas
var buildLinkTable = function(input) {
  var links = { 'you': {} };
  _.each(input, function(line) {
    var words = line.split(' ');

    var a = words[0];
    var b = words[10].slice(0, -1);
    var direction = words[2] === 'gain' ? 1 : -1;
    var happiness = direction * parseInt(words[3]);

    if (!links[a]) {
      links[a] = {};
    }

    links['you'][a] = 0;
    links[a][b] = happiness;
    links[a]['you'] = 0;
  });

  return links;
}

// iterate through all the permutations of seating arrangements,
// calculating the total happiness of each arrangement and tracking the best one.
var optimizeHappiness = function(links) {
  var nodes = Object.keys(links);
  var permutations = permutateNodes(nodes);
  var optimum = {
    arrangement: [],
    happiness: 0
  }

  _.each(permutations, function(seatingArrangement) {
    var totalHappiness = calculateHappiness(links, seatingArrangement);
    if (totalHappiness > optimum.happiness) {
      optimum.arrangement = seatingArrangement;
      optimum.happiness = totalHappiness;
    }
  });

  return optimum;
}

// calculate the total happiness of a seating arrangement by adding up
// the happiness value of each adjacent link
var calculateHappiness = function(links, arrangement) {
  var happiness = 0;
  var connections = arrangement.length - 1;

  for (var i = 0; i < connections; i++) {
    // if node zero, one of the 'adjacent' nodes is the last node
    if (i === 0) {
      happiness += links[arrangement[i]][arrangement[connections]];
      happiness += links[arrangement[connections]][arrangement[i]];
    }

    happiness += links[arrangement[i]][arrangement[i+1]];
    happiness += links[arrangement[i+1]][arrangement[i]];
  }

  return happiness;
};

// return all possible permutations of nodes in a list
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
