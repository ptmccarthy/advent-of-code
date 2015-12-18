'use strict';
const fs = require('fs');
const litersOfNog = 150;
let containers;

fs.readFile('input.txt', 'utf8', (error, contents) => {
  containers = contents.split('\n').map(Number);

  let combinations = powerSet(containers);
  let part1 = sumCombinations(combinations);
  console.log('Part 1: ' + part1.length);

  let minContainers = Math.min.apply(null, part1.map(set => set.length));
  let part2 = findCombinationsOfLength(part1, minContainers);
  console.log('Part 2: ' + part2.length);
});

// utility function for summing an array
let sum = array => array.reduce((curr, prev) => curr + prev, 0);

// use the power set algorithm to find all possible combinations
let powerSet = function(list) {
  let set = [];
  let combos = (1 << list.length);

  for (let i = 1; i < combos; ) {
    let combination = [];

    for (let j = 0; j < list.length; j++) {
      if ((i & (1 << j))) {
        combination.push(list[j]);
      }
    }

    i++;
    set.push(combination);
  }
  
  return set;
};

// filter input combinations for sets that have a sum equal to 'litersOfNog'
let sumCombinations = function(combinations) {
  return combinations.filter(combo => sum(combo) === litersOfNog);
};

// filters input combinations for sets that have a length equal to 'length'
let findCombinationsOfLength = function(combinations, length) {
  return combinations.filter(set => set.length === length);
}

