'use strict';
const fs = require('fs');
const _ = require('lodash');

fs.readFile('input.txt', 'utf8', (error, contents) => {
  let split = contents.split('\n');
  // pull out the substitutions by filtering on '=>'
  let subs = split.filter(s => s.indexOf('=>') > 0);
  // the last line of the input is the molecule
  let molecule = split[split.length - 1];

  let results = doSubstitutions(molecule, subs);
  console.log(results.length);
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
