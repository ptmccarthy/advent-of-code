'use strict';
const fs = require('fs');
const _ = require('lodash');

fs.readFile('input.txt', 'utf8', (error, contents) => {
  let split = contents.split('\n');
  // pull out the substitutions by filtering on '=>'
  let subs = split.filter(s => s.indexOf('=>') > 0);
  // the last line of the input is the molecule
  let molecule = split[split.length - 1];

  // part 1
  let results = doSubstitutions(molecule, subs);
  console.log('Part 1: ' + results.length);

  // part 2
  countTransformations(molecule);
});

const doSubstitutions = function(molecule, subs) {
  let results = [];

  subs.forEach(sub => {
    sub = sub.split(' => ');
    let re = new RegExp(sub[0], 'g');
    let indices = [];
    let i = -1;

    while ((i = molecule.indexOf(sub[0], i+1)) >= 0) {
      indices.push(i);
    }

    for (let n = 0; n < indices.length; n++) {
      let begin = molecule.substr(0, indices[n]);
      let rest = molecule.substr(indices[n] + sub[0].length);

      results.push(begin + sub[1] + rest);
    }
  });

  return _.uniq(results);
};


/**
I unfortunately can not take credit for these insights about part 2, taken from
https://www.reddit.com/r/adventofcode/comments/3xflz8/day_19_solutions/cy4etju
*/
const countTransformations = function(molecule) {
  // Count of all total elements in the molecule
  let elements = molecule.match(/[A-Z]/g);
  // "Rn" and "Ar" are boundaries of multiple possible transformations,
  // can be thought of as "(" and ")". They are not "real" elements themselves.
  // "Y" is the separator within an "Rn" & "Ar" boundary, similar to a ",".
  let Rns = molecule.match(/Rn/g);
  let Ars = molecule.match(/Ar/g);
  let Ys = molecule.match(/Y/g);

  // So, the minimum possible transformations to create the molecule starting
  // from "e" can be described as: elements - Rns - Ars - 2*Ys - 1
  let transforms = elements.length - Rns.length - Ars.length - (2 * Ys.length) - 1;
  console.log('Minumum transformations required: ' + transforms);
}
