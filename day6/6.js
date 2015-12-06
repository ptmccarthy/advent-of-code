var fs = require('fs');
var lightMap = {};
var usePart1Rules = false;

fs.readFile('input.txt', 'utf8', function(error, contents) {
  var directions = contents.split('\n');
  
  readDirections(directions);
});

var readDirections = function(rawDirections) {
  var directions = [];

  rawDirections.forEach(function(rawDirection) {
    if (rawDirection.length > 0) {
      directions.push(parseDirection(rawDirection));
    }
  });

  directions.forEach(function(direction) {
    doActions(direction);
  });

  if (usePart1Rules) {
    countPartOne();
  } else {
    countPartTwo();
  }
};

var doActions = function(direction) {
  for (var x = direction.begin[0]; x <= direction.end[0]; x++) {
    for (var y = direction.begin[1]; y <= direction.end[1]; y++) {
      var mapKey = x.toString() + ',' + y.toString();

      if (usePart1Rules) {
        doActionPart1(mapKey, direction.action);
      } else {
        doActionPart2(mapKey, direction.action);
      }

    }
  }
};

var doActionPart1 = function(mapKey, action) {
  if (action === 'toggle') {
    lightMap[mapKey] = !lightMap[mapKey];
  } else {
    lightMap[mapKey] = (action === 'on');
  }
};

var doActionPart2 = function(mapKey, action) {
  // all lights start at brightness 0, so if we haven't acted on it yet it is 0
  if (lightMap[mapKey] === undefined) {
    lightMap[mapKey] = 0;
  }

  if (action === 'toggle') {
    lightMap[mapKey] += 2;
  } else if (action === 'on') {
    lightMap[mapKey] += 1;
  } else {
    if (lightMap[mapKey] > 0) {
      lightMap[mapKey] -= 1;
    }
  }
};

var countPartOne = function() {
  var on = 0;
  for (light in lightMap) {
    if (lightMap[light]) { on++ };
  }

  console.log('Lights on at end: ' + on);
};

var countPartTwo = function() {
  var brightness = 0;
  for (light in lightMap) {
    brightness += lightMap[light];
  }

  console.log('Total brightness at end: ' + brightness);
};

var parseDirection = function(rawDirection) {
  var direction = {};
  var split = rawDirection.split(' ');

  var splitCoords = function(coords) {
    var array = coords.split(',').map(function(coord) {
      return parseInt(coord);
    });
    return array;
  }

  switch (split[0]) {
    case 'turn':
      direction.action = split[1];
      direction.begin = splitCoords(split[2]);
      direction.end = splitCoords(split[4]);
      break;
    case 'toggle':
      direction.action = split[0];
      direction.begin = splitCoords(split[1]);
      direction.end = splitCoords(split[3]);
      break;
  }

  return direction;
};
