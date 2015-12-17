'use strict';
var fs = require('fs');
var _ = require('lodash');

var ingredients;

fs.readFile('input.txt', 'utf8', function(error, contents) {
  let rawIngredients = contents.split('\n');
  ingredients = parseIngredients(rawIngredients);

  let permutations = permutateSummationsOf(100);
  maximizeScore(ingredients, permutations);
});

// produce usable objects from input
let parseIngredients = function(rawIngredients) {
  var ingredients = [];
  _.each(rawIngredients, function(ingredient) {
    var split = ingredient.replace(/[,]/g,'').split(' ');
    ingredients.push({
      name: split[0].slice(0,-1),
      capacity: parseInt(split[2]),
      durability: parseInt(split[4]),
      flavor: parseInt(split[6]),
      texture: parseInt(split[8]),
      calories: parseInt(split[10])
    });
  });

  return ingredients;
};

// generate a list of combinations of 4 integers that sum to param teaspoons.
// damn this is ugly and horribly inefficient, but it works...
let permutateSummationsOf = function(teaspoons) {
  let permutations = [];
  for (let a = 0; a <= teaspoons; a++) {
    for (let b = 0; b <= teaspoons; b++) {
      for (let c = 0; c <= teaspoons; c++) {
        for (let d = 0; d <= teaspoons; d++) {
          if (a + b + c + d === teaspoons) {
            permutations.push([a,b,c,d]);
          }
        }
      }
    }
  }

  return permutations;
}

// score an ingredient property for a given list of amounts
let scoreProperty = function(property, amounts) {
  let score = 0;

  for (let i = 0; i < amounts.length; i++) {
    score += amounts[i] * ingredients[i][property];
  }

  return score >= 0 ? score : 0;
}

// iterate through the permutations of amounts and find the best
// scoring cookie.
let maximizeScore = function(ingredients, permutations) {
  let maxScore = 0;
  let bestCookie;

  _.each(permutations, function(p) {
    let score = scoreProperty('capacity', p);
    score *= scoreProperty('durability', p);
    score *= scoreProperty('flavor', p);
    score *= scoreProperty('texture', p);

    let cals = scoreProperty('calories', p);

    // if only part 1, remove cals === 500 condition
    if (score > maxScore && cals === 500) {
      maxScore = score;
      bestCookie = p;
    }
  });

  console.log('Best cookie score: ' + maxScore);
  console.log('Best cookie proportions: ' + bestCookie);
}
