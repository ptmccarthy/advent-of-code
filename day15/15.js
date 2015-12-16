'use strict';
var fs = require('fs');
var _ = require('lodash');

fs.readFile('input.txt', 'utf8', function(error, contents) {
  var rawIngredients = contents.split('\n');
  var ingredients = parseIngredients(rawIngredients);

  console.log(ingredients);
});

let sum = array => array.reduce((a,b) => a + b, 0);

function parseIngredients(rawIngredients) {
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
