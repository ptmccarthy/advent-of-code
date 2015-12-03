var fs = require('fs');

fs.readFile('input.txt', 'utf8', function(err, contents) {
  directions = contents.split('\n')[0];
  parseDirections(directions, true);
});

// parse the directions string.
// if part2 = true, then calculate using santa and robo-santa
var parseDirections = function(directions, part2) {
  var charAtIndex;
  var key;
  var santaCoords = [0,0];
  var roboCoords = [0,0];
  // start with delivering one present at beginning location 0,0
  var houseMap = { '0,0': 1 };

  for (var i = 0; i < directions.length; i++) {
    charAtIndex = directions.charAt(i);

    if (!part2) {
      // part 1: only give directions to santa
      translateDirections(charAtIndex, santaCoords);
      key = buildMapKey(santaCoords);

    } else {
      // part 2: alternate giving directions to santa or robo-santa.
      if (i % 2 === 0) {
        translateDirections(charAtIndex, santaCoords);
        key = buildMapKey(santaCoords);
      } else {
        translateDirections(charAtIndex, roboCoords);
        key = buildMapKey(roboCoords);
      }
    }

    // update map with delivery, creating a new entry if necessary
    houseMap[key] === undefined ? houseMap[key] = 1 : houseMap[key] += 1;
  }

  console.log('Gifts delivered to ' + Object.keys(houseMap).length + ' houses.');
};

// translate the direction character to an (x,y) movement.
// update the coordinates array and return it.
var translateDirections = function(direction, coords) {
  switch (direction) {
    case '>':
      coords[0]++;
      break;
    case '<':
      coords[0]--;
      break;
    case '^':
      coords[1]++;
      break;
    case 'v':
      coords[1]--;
      break;
  }

  return coords;
}

// build a composite key using the [x,y] coordinates array
var buildMapKey = function(coords) {
  return coords[0].toString() + ',' + coords[1].toString();
}
