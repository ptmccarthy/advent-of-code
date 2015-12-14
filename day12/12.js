var input = require('./input');
var _ = require('lodash');

var sum = 0;


var countObject = function(obj) {
  if (_.isArray(obj)) {
    _.each(obj, countObject);
  } else if (_.isObject(obj) && _.every(obj, prop => prop !== 'red')) {
    // for part 1, remove the _.every condition looking for red
    _.forIn(obj, countObject);
  } else if (_.isNumber(obj)) {
    sum += obj;
  }
};

countObject(input);
console.log(sum);
